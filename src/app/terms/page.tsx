import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f0f4f8] min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-slate-500 mb-8">Last updated: April 3, 2026</p>

          <div className="bg-white rounded-2xl border border-[#d0dbe8] p-6 sm:p-8 space-y-8 text-sm leading-relaxed text-slate-700">
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">1. Overview</h2>
              <p>
                MyTradelines (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) operates a tradeline brokerage platform that connects buyers seeking authorized user (AU) tradelines with cardholders willing to add authorized users. By creating an account or placing an order, you agree to these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">2. Service Description</h2>
              <p>
                We facilitate the addition of customers as authorized users on existing credit card accounts. Being added as an authorized user may cause the account&apos;s history to appear on your credit report. All tradelines remain on your credit report for approximately two (2) statement cycles.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">3. No Guarantees</h2>
              <p>
                We do not guarantee any specific credit score improvement, credit report change, or lending outcome. Results vary based on individual credit profiles, bureau reporting, and other factors beyond our control. Tradelines are not a substitute for responsible credit management.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">4. Eligibility</h2>
              <p>
                You must be at least 18 years of age and a U.S. resident to use our services. By placing an order, you represent that the personal information you provide is accurate and belongs to you.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">5. Payment Terms</h2>
              <p>
                All prices are listed in U.S. dollars. Payment is due at the time of order via Zelle, wire transfer, or ACH. Orders are not processed until full payment is confirmed. We reserve the right to change pricing at any time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">6. Refund Policy</h2>
              <p>
                Once a tradeline has been added to your credit report, no refunds will be issued. If we are unable to add the tradeline within a reasonable timeframe, you may request a full refund. Refund requests must be made by contacting us directly.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">7. Account Responsibilities</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials. You agree not to share your account with others or use the platform for any fraudulent or illegal purpose. We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">8. Document Handling</h2>
              <p>
                To process your order, we require a government-issued photo ID and Social Security card. These documents are stored securely and used solely for the purpose of adding you as an authorized user. We do not sell or share your documents with any third party except as necessary to complete the tradeline addition.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, MyTradelines shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services, including but not limited to credit score changes, loan denials, or any other financial outcome.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">10. Termination</h2>
              <p>
                We may suspend or terminate your access to the platform at our sole discretion, with or without cause. You may close your account at any time by contacting us. Termination does not affect any orders already in progress.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">11. Changes to Terms</h2>
              <p>
                We may update these Terms of Service from time to time. Continued use of the platform after changes are posted constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">12. Contact</h2>
              <p>
                If you have questions about these terms, contact us at{" "}
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
