# LossStack Billing System — Wiring Reference

## 1. Referral Signup Integration

### Where the code lives
- **Client-side detection**: `app/signup/page.tsx`
  - `useEffect` reads `?ref=CODE` from the URL on mount
  - Code is persisted to `sessionStorage("ls_ref_code")` to survive redirects
  - `processReferralIfPresent()` is called fire-and-forget after `handleFinish()` succeeds (all paths: free plan, paid plan, 409 existing org)
  - Calls `POST /api/billing/referrals` with `{ action: "process_signup", referralCode }`

- **Server-side fallback**: `app/api/webhooks/clerk/route.ts`
  - Triggered by Clerk `user.created` webhook event
  - Calls `ensureUserBillingRows(userId)` to provision wallet + subscription_state
  - Reads `ref_code` from Clerk `public_metadata` or `unsafe_metadata` if present
  - Calls `processReferralSignup()` if a code is found
  - **Setup required**: In Clerk Dashboard → Webhooks, add endpoint `https://lossstack.com/api/webhooks/clerk`, subscribe to `user.created`, copy signing secret to `CLERK_WEBHOOK_SECRET` env var

### For satellite apps (Appraisly, ImageLablr, RestoreCam)
When a user signs up via a satellite app's own signup form:
1. Capture `?ref=CODE` from the URL during their signup flow
2. Store it in Clerk `public_metadata.ref_code` using the Clerk frontend SDK:
   ```js
   await user.update({ publicMetadata: { ref_code: "LS-XXXXX" } });
   ```
3. The `user.created` Clerk webhook will pick it up automatically.

---

## 2. Stripe Webhook Mapping

### File: `lib/billing/stripePlanMap.ts`
Maps Stripe price IDs (from env vars) to plan codes:

| Env Var | Plan Code | Monthly Credits | Overage |
|---|---|---|---|
| `STRIPE_PRICE_CORE` | `core` | 0 | $14.99 |
| `STRIPE_PRICE_PRO` | `pro` | 10 | $12.99 |
| `STRIPE_PRICE_FIRM` | `firm` | 25 | $9.99 |

These are kept in sync with `data/pricing.ts` (`unifiedStripePriceIds` + `reportPrice`).

### File: `app/api/webhooks/stripe/route.ts`
Handles these Stripe events:
- `customer.subscription.created` → `handleSubscriptionActivated()` + referral activation
- `invoice.paid` → `handleSubscriptionRenewed()` + monthly credit allocation
- `customer.subscription.updated` → `handlePlanChange()`
- `customer.subscription.deleted` → `handleSubscriptionCanceled()`
- `invoice.payment_failed` → `handlePaymentFailed()`

`resolveUserId()` prefers `clerk_user_id` from subscription metadata, falls back to DB lookup by customer ID. **When creating Stripe checkout sessions, always pass `metadata: { clerk_user_id: userId }` on the subscription.**

### Monthly credit allocation (idempotent)
- `free`: 0 credits
- `core`: 0 credits
- `pro`: 10 credits/month
- `firm`: 25 credits/month
- Keyed by `monthly_alloc:{subscription_id}:{YYYY-MM-DD}` — safe to re-process

---

## 3. Referral Qualification Cron

### File: `app/api/billing/cron/referral-qualification/route.ts`
- Runs daily at 06:00 UTC (configured in `vercel.json`)
- Protected by `x-cron-secret` header or `?secret=` query param
- Required env var: `CRON_SECRET` (set in Vercel dashboard)
- Finds all referrals with `status = 'active_paid_period'` and `delayed_credit_awarded = false`
- Awards credits if 30+ days have passed since `subscription_started_at`
- Marks them `completed` — fully idempotent, safe to run repeatedly

### vercel.json
```json
{
  "crons": [
    {
      "path": "/api/billing/cron/referral-qualification",
      "schedule": "0 6 * * *"
    }
  ]
}
```

Note: Vercel Cron does **not** send the `CRON_SECRET` automatically. You can either:
- Remove the secret check for Vercel's built-in cron (Vercel signs cron requests with its own mechanism on Pro plans)
- Or use an external cron service (e.g. cron-job.org) that sends `x-cron-secret: YOUR_SECRET`

---

## 4. Desktop/Web Report Action Coverage

### lossstack.com surface
This site is a **marketing + launcher** — it does not directly generate reports. No consume wiring is needed on any page here. All report generation happens inside the satellite apps.

### Satellite apps — required integration points
Each satellite app must call these two endpoints before executing any value-creating action:

#### Step 1: Check entitlement
```
GET /api/billing/entitlement?action=<ACTION_KEY>&surface=desktop&app=<APP>
Authorization: Bearer <clerk_session_token>
```

#### Step 2: Consume credit (only after confirming user intends to proceed)
```
POST /api/billing/consume
Authorization: Bearer <clerk_session_token>
Content-Type: application/json

{
  "actionKey": "appraisly.generate_report",
  "sourceSurface": "desktop",
  "sourceApp": "appraisly",
  "reportType": "property_appraisal",
  "idempotencyKey": "<uuid-generated-per-action-attempt>"
}
```

### Action keys per app

| App | Action Key | Trigger Point |
|---|---|---|
| Appraisly | `appraisly.generate_report` | Before final report PDF generation |
| ImageLablr | `imagelablr.export_package` | Before export/download of labeled package |
| RestoreCam | `restorecam.job_completion_report` | Before job completion report is finalized |
| SkyMeasure | `skymeasure.generate_report` | Before measurement report is generated |

### What NOT to gate
- App login / session creation
- Project / job / case creation
- Photo uploads or file imports
- Dashboard browsing
- Draft saving

---

## 5. Required Env Vars Checklist

| Env Var | Where Used | Status |
|---|---|---|
| `STRIPE_PRICE_CORE` | `stripePlanMap.ts`, `data/pricing.ts` | ⚠️ Needs real price ID |
| `STRIPE_PRICE_PRO` | `stripePlanMap.ts`, `data/pricing.ts` | ⚠️ Needs real price ID |
| `STRIPE_PRICE_FIRM` | `stripePlanMap.ts`, `data/pricing.ts` | ⚠️ Needs real price ID |
| `STRIPE_PRICE_STORAGE_ADDON` | `data/pricing.ts` | ⚠️ Needs real price ID |
| `STRIPE_WEBHOOK_SECRET` | `app/api/webhooks/stripe/route.ts` | ⚠️ Needs webhook secret |
| `CLERK_WEBHOOK_SECRET` | `app/api/webhooks/clerk/route.ts` | ⚠️ Needs webhook secret |
| `CRON_SECRET` | `app/api/billing/cron/referral-qualification/route.ts` | ⚠️ Set any random string |
| `NEXT_PUBLIC_SUPABASE_URL` | `lib/supabase.ts` | ✅ Already set |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `lib/supabase.ts` | ✅ Already set |
| `SUPABASE_SERVICE_ROLE_KEY` | `lib/supabase.ts` | ✅ Already set |
| `STRIPE_SECRET_KEY` | Stripe API calls | ✅ Already set |
| `NEXT_PUBLIC_SITE_URL` | Referral URL generation | ✅ Already set |
| `ADMIN_PASSWORD` | `app/api/billing/admin/route.ts` | ✅ Already set |

---

## 6. Remaining Gaps (requires action outside this codebase)

1. **Create Stripe products** — Create Core/Pro/Firm products in Stripe dashboard and paste the price IDs into `.env.local` + Vercel env vars
2. **Register Stripe webhook** — In Stripe Dashboard → Webhooks, add `https://lossstack.com/api/webhooks/stripe` and subscribe to the 5 events listed above
3. **Register Clerk webhook** — In Clerk Dashboard → Webhooks, add `https://lossstack.com/api/webhooks/clerk`, subscribe to `user.created`
4. **Pass `clerk_user_id` in checkout** — When creating Stripe checkout sessions (`app/api/checkout/route.ts`), pass `metadata: { clerk_user_id: userId }` on the subscription so the webhook can resolve the user
5. **Satellite app integration** — Each satellite app repo needs to call `/api/billing/entitlement` and `/api/billing/consume` at the action points listed in section 4
6. **`npm install`** — Run locally to install `svix` and jest packages added to `package.json`
