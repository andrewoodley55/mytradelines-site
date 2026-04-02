import { CreditCard } from "lucide-react";

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: April 2, 2026</p>

        <div className="bg-white rounded-2xl border border-[#d0dbe8] p-8 space-y-8 text-sm text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">1. Introduction</h2>
            <p>MyTradelines (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website and services.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect the following types of information:</p>
            <h3 className="font-semibold text-slate-900 mb-2">Account Information</h3>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Full legal name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Password (encrypted)</li>
            </ul>
            <h3 className="font-semibold text-slate-900 mb-2">Order Information (Buyers)</h3>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Date of birth</li>
              <li>Last 4 digits of Social Security Number</li>
              <li>Current mailing address</li>
              <li>Government-issued ID (uploaded document)</li>
              <li>Social Security card (uploaded document)</li>
            </ul>
            <h3 className="font-semibold text-slate-900 mb-2">Seller Application Information</h3>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Contact information (name, phone, city/state)</li>
              <li>Date of birth and last 4 digits of SSN</li>
              <li>Credit card account details (bank, limits, balances, account age)</li>
              <li>Account screenshots (uploaded documents)</li>
            </ul>
            <h3 className="font-semibold text-slate-900 mb-2">Automatically Collected Information</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Browser type and version</li>
              <li>IP address</li>
              <li>Pages visited and time spent on our website</li>
              <li>Device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>To provide our services:</strong> Processing tradeline orders, adding authorized users, and managing seller accounts.</li>
              <li><strong>To verify identity:</strong> Confirming your identity to prevent fraud and comply with applicable regulations.</li>
              <li><strong>To communicate with you:</strong> Sending order updates, account notifications, and responding to inquiries.</li>
              <li><strong>To improve our services:</strong> Analyzing usage patterns to enhance our website and user experience.</li>
              <li><strong>To comply with legal obligations:</strong> Meeting any applicable legal or regulatory requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">4. How We Share Your Information</h2>
            <p className="mb-3">We do not sell, rent, or trade your personal information to third parties. We may share limited information in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Tradeline processing:</strong> We share only the minimum information necessary (name and SSN) with tradeline sellers to facilitate the authorized user addition. No other personal details are shared.</li>
              <li><strong>Service providers:</strong> We use trusted third-party services (such as Supabase for data storage and authentication) that may process your data on our behalf, subject to strict confidentiality agreements.</li>
              <li><strong>Legal requirements:</strong> We may disclose information if required by law, court order, or government regulation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">5. Data Storage and Security</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All data is stored on secure, encrypted servers.</li>
              <li>Uploaded documents (IDs, SSN cards, screenshots) are stored in private, access-controlled storage buckets.</li>
              <li>Sensitive data such as SSN digits are encrypted in our database.</li>
              <li>We use SSL/TLS encryption for all data transmitted between your browser and our servers.</li>
              <li>Access to personal information is restricted to authorized personnel only.</li>
              <li>We use authentication and role-based access controls to protect your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">6. Data Retention</h2>
            <p>We retain your personal information for as long as your account is active or as needed to provide our services. Order-related data (including uploaded documents) is retained for a reasonable period after order completion for record-keeping and dispute resolution purposes. You may request deletion of your account and associated data at any time by contacting us.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">7. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of any inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal retention requirements.</li>
              <li><strong>Portability:</strong> Request your data in a commonly used, machine-readable format.</li>
              <li><strong>Opt-out:</strong> Opt out of marketing communications at any time.</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, please contact us using the information provided below.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">8. Cookies</h2>
            <p>We use essential cookies to maintain your login session and ensure our website functions properly. We do not use tracking cookies or share cookie data with advertisers.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">9. Children&apos;s Privacy</h2>
            <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that we have collected information from a minor, we will take steps to delete it promptly.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">10. California Privacy Rights</h2>
            <p>If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to request deletion, and the right to opt out of the sale of personal information. As stated above, we do not sell your personal information.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">11. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">12. Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy or how your data is handled, please contact us through the information provided on our website.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
