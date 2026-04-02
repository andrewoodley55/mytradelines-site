import { CreditCard } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <header style={{ backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid #d0dbe8" }}>
        <div className="max-w-3xl mx-auto px-4 py-4">
          <a href="/" className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue" />
            <span className="text-lg font-bold text-slate-900">
              My<span className="text-blue">Tradelines</span>
            </span>
          </a>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: April 2, 2026</p>

        <div className="bg-white rounded-2xl border border-[#d0dbe8] p-8 space-y-8 text-sm text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the MyTradelines website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">2. Services Overview</h2>
            <p>MyTradelines acts as a broker facilitating the addition of authorized users to credit card tradelines. We connect buyers seeking to improve their credit profiles with sellers who have established credit card accounts. We do not guarantee specific credit score increases, as results vary based on individual credit profiles.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">3. Eligibility</h2>
            <p>You must be at least 18 years old and a legal resident of the United States to use our services. By creating an account, you represent that all information you provide is accurate and complete.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">4. Buyer Terms</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Payment is required in full before any tradeline is added to your credit report.</li>
              <li>We accept ACH, Wire Transfer, and Zelle as payment methods.</li>
              <li>Tradelines remain on your credit report for a minimum of 60 days (two billing cycles).</li>
              <li>We provide a posting guarantee: if a tradeline fails to post to your credit report, we will either replace it with an equivalent tradeline or issue a full refund at your choice.</li>
              <li>Credit score increases are not guaranteed. Results depend on your individual credit profile and other factors outside our control.</li>
              <li>You agree to provide accurate personal information (legal name, date of birth, SSN last 4 digits, and address) necessary for the authorized user addition.</li>
              <li>Refunds are only available if a tradeline fails to post. Once a tradeline has posted to your credit report, no refund will be issued.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">5. Seller Terms</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You must be the primary account holder on all accounts submitted for tradeline sales.</li>
              <li>You must be authorized to add and remove authorized users from your accounts.</li>
              <li>You agree to add assigned authorized users within the agreed-upon timeframe (typically 24-72 hours).</li>
              <li>Authorized users must remain on the account for a minimum of 60 days.</li>
              <li>You agree to maintain account utilization below 7% during the tradeline period.</li>
              <li>Payment to sellers is issued after the tradeline has been confirmed as posted to the buyer&apos;s credit report.</li>
              <li>Failure to perform (adding users on time, maintaining account quality, or premature removal) may result in reduced payment or removal from the platform.</li>
              <li>All information provided in your seller application must be accurate. Providing false information is grounds for immediate removal.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">6. Payment Terms</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All prices listed on the website are in US dollars.</li>
              <li>Payment must be received and confirmed before any tradeline work begins.</li>
              <li>We are not responsible for delays caused by banking institutions in processing payments.</li>
              <li>Include your order ID in the payment memo for faster processing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">7. Account Security</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. We are not liable for any loss or damage arising from your failure to protect your login information.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">8. Prohibited Conduct</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Using our services for any illegal purpose or in violation of any applicable laws.</li>
              <li>Providing false, misleading, or inaccurate information.</li>
              <li>Attempting to manipulate or interfere with our platform or services.</li>
              <li>Sharing your account credentials with third parties.</li>
              <li>Using our services to commit identity theft or fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">9. Limitation of Liability</h2>
            <p>MyTradelines is a brokerage service and does not directly control credit reporting agencies, banks, or credit scoring models. We are not liable for any indirect, incidental, or consequential damages arising from the use of our services, including but not limited to changes (or lack thereof) in credit scores. Our total liability shall not exceed the amount paid by you for the specific service in question.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">10. Disclaimer</h2>
            <p>Our services are provided &quot;as is&quot; without warranties of any kind, either express or implied. We do not guarantee that our services will result in any specific credit score improvement. Past results do not guarantee future performance.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">11. Termination</h2>
            <p>We reserve the right to suspend or terminate your account at any time, with or without cause, and with or without notice. Upon termination, your right to use our services ceases immediately. Any pending orders at the time of termination will be handled on a case-by-case basis.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">12. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated revision date. Your continued use of our services after changes are posted constitutes your acceptance of the modified terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">13. Contact</h2>
            <p>If you have questions about these Terms of Service, please contact us through the information provided on our website.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
