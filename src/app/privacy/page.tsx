import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f0f4f8] min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-500 mb-8">Last updated: April 3, 2026</p>

          <div className="bg-white rounded-2xl border border-[#d0dbe8] p-6 sm:p-8 space-y-8 text-sm leading-relaxed text-slate-700">
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">1. Information We Collect</h2>
              <p className="mb-3">When you use MyTradelines, we may collect the following information:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Account information:</strong> Full name, email address, phone number, and password</li>
                <li><strong>Order information:</strong> Full legal name, date of birth, last four digits of your Social Security Number, and current address</li>
                <li><strong>Identity documents:</strong> Government-issued photo ID and Social Security card</li>
                <li><strong>Contact form submissions:</strong> Name, email, phone, and message content</li>
                <li><strong>Usage data:</strong> Pages visited, browser type, and device information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>To process and fulfill your tradeline orders</li>
                <li>To add you as an authorized user on credit card accounts</li>
                <li>To communicate with you about your orders and account</li>
                <li>To respond to your inquiries and support requests</li>
                <li>To improve our platform and services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">3. Document Storage &amp; Security</h2>
              <p>
                Your identity documents (government ID and SSN card) are stored using encrypted cloud storage with access restricted to authorized personnel only. Documents are used solely for the purpose of processing your tradeline order and are not shared with any third party except as described in Section 4.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">4. Information Sharing</h2>
              <p className="mb-3">We do not sell your personal information. We only share your information in the following limited circumstances:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Tradeline processing:</strong> Your name, date of birth, SSN last 4, and address are shared with cardholders or credit card issuers solely to add you as an authorized user</li>
                <li><strong>Legal requirements:</strong> When required by law, subpoena, or court order</li>
                <li><strong>Service providers:</strong> With trusted third-party services (hosting, email delivery) that help us operate the platform, under strict confidentiality agreements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">5. Data Retention</h2>
              <p>
                We retain your account information for as long as your account is active. Order records and associated documents are retained for a reasonable period after order completion for record-keeping and dispute resolution purposes. You may request deletion of your account and personal data by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">6. Cookies</h2>
              <p>
                We use essential cookies to maintain your login session and remember your preferences. We do not use third-party advertising or tracking cookies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">7. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Withdraw consent for data processing</li>
              </ul>
              <p className="mt-3">To exercise these rights, please contact us using the information below.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">8. Children&apos;s Privacy</h2>
              <p>
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on our website. Continued use of our services after changes are posted constitutes acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or how we handle your data, contact us at{" "}
                <a href="mailto:no-reply@mytradelines.com" className="text-blue hover:underline">no-reply@mytradelines.com</a>{" "}
                or call <a href="tel:+18883444211" className="text-blue hover:underline">(888) 344-4211</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
