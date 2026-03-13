import Footer from "@/components/sections/Footer";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | LossStack",
  description: "LossStack Privacy Policy covering Appraisly, ImageLablr, and RestoreCam.",
};

export default function PrivacyPage() {
  const effective = "March 13, 2026";

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="bg-[#0f1e3c] px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-blue-300/70 text-xs font-semibold uppercase tracking-wide mb-2">Legal</div>
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-blue-200/60 text-sm">Effective date: {effective}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">1. Overview</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            LossStack LLC ("LossStack," "we," "us," or "our") operates the LossStack platform and its applications: <strong>Appraisly</strong>, <strong>ImageLablr</strong>, and <strong>RestoreCam</strong>. This Privacy Policy explains how we collect, use, store, and protect information when you use our Services. By using any LossStack application, you consent to the practices described in this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">2. Information We Collect</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">We collect the following categories of information:</p>

          <h3 className="text-base font-bold text-[#0f1e3c] mb-2">Account Information</h3>
          <ul className="text-slate-600 text-sm space-y-1.5 list-disc pl-5 mb-4">
            <li>Name, email address, and password when you register</li>
            <li>Billing information (processed and stored by Stripe — we do not store full card numbers)</li>
            <li>Business name, role, and team members you add to your account</li>
          </ul>

          <h3 className="text-base font-bold text-[#0f1e3c] mb-2">Usage Data</h3>
          <ul className="text-slate-600 text-sm space-y-1.5 list-disc pl-5 mb-4">
            <li>Pages visited, features used, and interactions within the Services</li>
            <li>Device type, browser, operating system, and IP address</li>
            <li>Log data, error reports, and performance metrics</li>
          </ul>

          <h3 className="text-base font-bold text-[#0f1e3c] mb-2">Content You Upload</h3>
          <ul className="text-slate-600 text-sm space-y-1.5 list-disc pl-5 mb-4">
            <li><strong>Appraisly:</strong> Claim data, estimate documents, narrative drafts, and report content</li>
            <li><strong>ImageLablr:</strong> Photos, images, and associated metadata you upload for labeling and documentation</li>
            <li><strong>RestoreCam:</strong> Job records, moisture readings, GPS data, voice notes, and field documentation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">3. How We Use Your Information</h2>
          <ul className="text-slate-600 text-sm space-y-2 list-disc pl-5">
            <li>To provide, operate, and improve the Services</li>
            <li>To process AI analysis and generate content on your behalf</li>
            <li>To manage your account, billing, and subscription</li>
            <li>To send transactional emails (receipts, account notices, product updates)</li>
            <li>To respond to support requests and inquiries</li>
            <li>To detect and prevent fraud, abuse, and security incidents</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">4. AI Processing and Your Data</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            LossStack uses third-party AI providers to power features across its applications. When you submit content for AI processing (e.g., generating a narrative in Appraisly, labeling photos in ImageLablr, or transcribing voice notes in RestoreCam), that content is transmitted to our AI providers for processing.
          </p>
          <ul className="text-slate-600 text-sm space-y-2 list-disc pl-5">
            <li>We do not use your proprietary data to train our AI models without your explicit written consent.</li>
            <li>AI providers are contractually prohibited from using your data to train their general models.</li>
            <li>AI-generated outputs are stored in your account and are accessible only to you and your authorized team members.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">5. Data Sharing</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">We do not sell your personal information. We may share data with:</p>
          <ul className="text-slate-600 text-sm space-y-2 list-disc pl-5">
            <li><strong>Service providers</strong> — hosting, payment processing (Stripe), email delivery, and AI processing vendors, under confidentiality agreements</li>
            <li><strong>Legal authorities</strong> — when required by law, subpoena, or to protect the rights and safety of LossStack or others</li>
            <li><strong>Business transfers</strong> — in the event of a merger, acquisition, or sale of assets, your data may be transferred to the successor entity</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">6. Data Retention</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We retain your account data and uploaded content for as long as your account is active or as needed to provide the Services. Upon cancellation, your data will be retained for 90 days to allow for reactivation, after which it will be permanently deleted from our systems unless we are legally required to retain it longer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">7. Security</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            LossStack implements industry-standard security measures including encryption in transit (TLS), encrypted storage, access controls, and regular security reviews. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security of your data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">8. Cookies and Tracking</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We use cookies and similar tracking technologies to maintain sessions, remember preferences, and analyze usage patterns. You may disable cookies in your browser settings, though some features of the Services may not function properly without them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">9. Your Rights</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">Depending on your location, you may have rights including:</p>
          <ul className="text-slate-600 text-sm space-y-2 list-disc pl-5">
            <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
            <li><strong>Correction</strong> — request correction of inaccurate data</li>
            <li><strong>Deletion</strong> — request deletion of your data (subject to legal retention obligations)</li>
            <li><strong>Portability</strong> — request your data in a portable format</li>
            <li><strong>Opt-out</strong> — opt out of marketing communications at any time</li>
          </ul>
          <p className="text-slate-600 text-sm leading-relaxed mt-3">
            To exercise any of these rights, contact us at <a href="mailto:founderai@pm.me" className="text-blue-600 hover:underline">founderai@pm.me</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">10. Children's Privacy</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            The Services are intended for professional use and are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that a minor has provided us with personal information, we will delete it promptly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">11. Changes to This Policy</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of material changes by email at least 14 days before they take effect. Your continued use of the Services after the effective date constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">12. Contact</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            For privacy-related questions or requests, contact us at:{" "}
            <a href="mailto:founderai@pm.me" className="text-blue-600 hover:underline">founderai@pm.me</a>
          </p>
        </section>

        <div className="border-t border-slate-200 pt-6 mt-8 flex gap-6 text-sm">
          <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
          <Link href="/" className="text-slate-500 hover:underline">Back to LossStack</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
