import { DollarSign, Shield, Clock, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Earn $200–$1,000+ Per Card",
    description: "Get paid for each tradeline sold from your credit cards. Higher limits and older cards earn more.",
  },
  {
    icon: Shield,
    title: "Zero Risk to Your Credit",
    description: "Authorized users don't have access to your account. Your credit and finances are completely protected.",
  },
  {
    icon: Clock,
    title: "Passive Income",
    description: "Once your cards are listed, we handle everything — matching, coordination, and payments. You just get paid.",
  },
];

export function SellCTA() {
  return (
    <section id="sell" className="py-20 sm:py-28 bg-navy-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <p className="text-cyan text-sm font-semibold uppercase tracking-wider mb-3">
              Earn Money
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Have Good Credit?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue">
                Get Paid For It.
              </span>
            </h2>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              If you have credit cards with high limits and long history, you can earn serious money
              by allowing us to add authorized users. It&apos;s safe, legal, and completely hands-off.
            </p>

            <div className="mt-8 space-y-5">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-cyan" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-semibold">{b.title}</h3>
                      <p className="text-sm text-slate-600 mt-0.5">{b.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
              href="mailto:sell@mytradelines.com?subject=I want to sell my tradelines"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan to-blue hover:opacity-90 text-white font-semibold text-lg transition-all"
            >
              Apply to Sell
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          {/* Right: Example earnings card */}
          <div className="bg-navy-card border border-navy-border rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Example Earnings</h3>
            <div className="space-y-4">
              {[
                { card: "Visa — $15,000 limit, 5 years", payout: "$250–$400" },
                { card: "Mastercard — $25,000 limit, 8 years", payout: "$500–$700" },
                { card: "Amex — $35,000 limit, 12 years", payout: "$800–$1,200" },
              ].map((example) => (
                <div
                  key={example.card}
                  className="flex items-center justify-between p-4 rounded-xl bg-navy/60 border border-navy-border"
                >
                  <div>
                    <p className="text-sm text-slate-900 font-medium">{example.card}</p>
                  </div>
                  <p className="text-lg font-bold text-cyan whitespace-nowrap ml-4">{example.payout}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Payouts vary based on card age, credit limit, and bank. These are typical ranges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
