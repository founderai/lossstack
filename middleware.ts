import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/referrals(.*)',
  '/admin/billing(.*)',
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Strip external redirect_url params from sign-in/sign-up pages.
  // Satellite apps (appraislyai.com, imagelablr.com, restorecam.com) send
  // users here with ?redirect_url=https://external-domain/... which causes
  // an auth loop. We intercept and replace with /dashboard.
  const url = req.nextUrl;
  if (
    (url.pathname === '/sign-in' || url.pathname === '/sign-up') &&
    url.searchParams.has('redirect_url')
  ) {
    const redirectTarget = url.searchParams.get('redirect_url') ?? '';
    const isExternal =
      redirectTarget.startsWith('http') &&
      !redirectTarget.startsWith('https://lossstack.com') &&
      !redirectTarget.startsWith('https://www.lossstack.com');

    // Allow redirects back to known satellite apps — they use lossstack.com
    // as the primary Clerk auth domain (NEXT_PUBLIC_CLERK_IS_SATELLITE=true).
    const ALLOWED_SATELLITE_ORIGINS = [
      'https://appraislyai.com',
      'https://www.appraislyai.com',
      'https://imagelablr.com',
      'https://www.imagelablr.com',
      'https://restorecam.com',
      'https://www.restorecam.com',
    ];
    const isSatellite = ALLOWED_SATELLITE_ORIGINS.some((origin) =>
      redirectTarget.startsWith(origin)
    );

    if (isExternal && !isSatellite) {
      const clean = url.clone();
      clean.searchParams.delete('redirect_url');
      return NextResponse.redirect(clean);
    }
  }

  // Protect routes that require auth
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
