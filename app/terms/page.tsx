import Footer from "@/components/sections/Footer";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | LossStack",
  description: "LossStack Terms of Service covering Appraisly, ImageLablr, and RestoreCam.",
};

export default function TermsPage() {
  const effective = "March 13, 2026";

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="bg-[#0f1e3c] px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-blue-300/70 text-xs font-semibold uppercase tracking-wide mb-2">Legal</div>
          <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-blue-200/60 text-sm">Effective date: {effective}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-amber-800 text-sm">
          <strong>AI Disclosure:</strong> LossStack products use artificial intelligence to generate content, narratives, labels, and reports. All AI-generated output must be reviewed and verified by a qualified professional before use. LossStack does not guarantee the accuracy, completeness, or fitness of AI-generated content for any specific purpose.
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">1. Agreement to Terms</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and LossStack LLC ("LossStack," "we," "us," or "our") governing your access to and use of the LossStack platform and its suite of applications, including <strong>Appraisly</strong>, <strong>ImageLablr</strong>, and <strong>RestoreCam</strong> (collectively, the "Services"). By accessing or using any Service, you agree to be bound by these Terms. If you do not agree, do not use the Services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">2. Description of Services</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">LossStack provides the following AI-powered applications:</p>
          <ul className="text-slate-600 text-sm space-y-2 list-disc pl-5">
            <li><strong>Appraisly</strong> — AI-assisted claims intelligence, appraisal narrative generation, and estimate comparison for insurance professionals.</li>
            <li><strong>ImageLablr</strong> — Photo labeling, categorization, and documentation for claims and restoration teams.</li>
            <li><strong>RestoreCam</strong> — Field operations platform for restoration contractors, including job documentation, GPS tracking, moisture readings, and report generation.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">3. AI-Generated Content — Important Disclaimer</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            The Services utilize artificial intelligence and machine learning technologies to generate narratives, labels, reports, estimates, and other content. You acknowledge and agree that:
          </p>
          <ul className="text-slate-600 text-sm space-y-2 list-disc pl-5">
            <li>All AI-generated content is provided as a <strong>starting point and drafting aid only</strong>. It is not a substitute for professional judgment.</li>
            <li>You are solely responsible for <strong>reviewing, verifying, and approving</strong> all AI-generated content before submitting it to any carrier, client, court, or regulatory body.</li>
            <li>AI outputs may contain errors, omissions, or inaccuracies. LossStack makes no warranty that any AI-generated content is accurate, complete, or legally sufficient.</li>
            <li>Use of AI-generated content in professional reports, insurance claims, or legal proceedings is done entirely at your own risk.</li>
            <li>LossStack is not liable for any decisions made, losses incurred, or damages arising from reliance on AI-generated content.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">4. Subscriptions and Billing</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            Access to paid features of the Services requires a subscription. By subscribing, you authorize LossStack to charge your payment method on a recurring monthly basis at the rates displayed at time of purchase.
          </p>
          <ul className="text-slate-600 text-sm space-y-2 list-disc pl-5">
            <li>Subscription fees are billed in advance on a monthly cycle.</li>
            <li>Plans are available at the Free, Core ($99/mo), Pro ($249/mo, 10 credits/mo), Firm ($499/mo, 25 credits/mo), and Enterprise tiers. Paid plans are billed monthly. Report credits are consumed before per-report charges apply.</li>
            <li>Prices are subject to change with 30 days written notice to your registered email.</li>
            <li>You are responsible for all applicable taxes.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">5. No Refund Policy</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            <strong>All subscription payments are non-refundable.</strong> LossStack does not provide refunds, credits, or prorations for any partial subscription periods, unused credits, or early cancellations. If you cancel your subscription, you will retain access to the Services through the end of your current paid billing period, after which your access will terminate. This no-refund policy applies to all subscription tiers across all LossStack applications.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">6. Cancellation</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            You may cancel your subscription at any time through your account settings or by contacting us at <a href="mailto:founderai@pm.me" className="text-blue-600 hover:underline">founderai@pm.me</a>. Cancellation takes effect at the end of the current billing cycle. No partial refunds will be issued for the remaining period.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">7. Acceptable Use</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">You agree not to:</p>
          <ul className="text-slate-600 text-sm space-y-2 list-disc pl-5">
            <li>Use the Services for any unlawful purpose or in violation of any applicable regulations, including insurance fraud or misrepresentation.</li>
            <li>Submit false, misleading, or fraudulent data to any LossStack application.</li>
            <li>Reverse engineer, decompile, or attempt to extract source code from the Services.</li>
            <li>Share account credentials or allow unauthorized third parties to access your account.</li>
            <li>Use the Services to train competing AI models or products.</li>
            <li>Attempt to circumvent any security, access control, or usage limit of the Services.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">8. Intellectual Property</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            All software, interfaces, AI models, brand assets, and technology underlying the Services are owned by LossStack LLC and protected by applicable intellectual property laws. You retain ownership of data and content you upload to the Services. By uploading content, you grant LossStack a limited license to process that content solely for the purpose of delivering the Services to you. LossStack will not use your proprietary data to train AI models without your explicit written consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">9. Limitation of Liability</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            To the maximum extent permitted by applicable law, LossStack LLC, its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business, or goodwill, arising from your use of or inability to use the Services, even if LossStack has been advised of the possibility of such damages. LossStack's total liability to you for any claims arising under these Terms shall not exceed the amount you paid to LossStack in the 12 months preceding the claim.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">10. Disclaimer of Warranties</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            The Services are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or uninterrupted availability. LossStack does not warrant that the Services will be error-free, secure, or available at all times.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">11. Indemnification</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            You agree to indemnify, defend, and hold harmless LossStack LLC and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or in any way connected with your use of the Services, your violation of these Terms, or your violation of any applicable law or third-party rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">12. Governing Law</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            These Terms are governed by and construed in accordance with the laws of the United States and the state in which LossStack LLC is incorporated, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved through binding arbitration in accordance with the American Arbitration Association rules, waiving any right to a jury trial or class action.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">13. Changes to Terms</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            LossStack reserves the right to modify these Terms at any time. We will provide at least 14 days' notice via email before material changes take effect. Your continued use of the Services after the effective date of changes constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">14. Contact</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            For questions regarding these Terms, contact us at:{" "}
            <a href="mailto:founderai@pm.me" className="text-blue-600 hover:underline">founderai@pm.me</a>
          </p>
        </section>

        <div className="border-t border-slate-200 pt-6 mt-8 flex gap-6 text-sm">
          <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          <Link href="/" className="text-slate-500 hover:underline">Back to LossStack</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
