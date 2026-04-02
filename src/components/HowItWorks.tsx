import { Search, CreditCard, TrendingUp, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Browse Tradelines",
    description:
      "Explore our inventory of seasoned tradelines. Filter by credit limit, card age, bank, and price to find the perfect fit.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Place Your Order",
    description:
      "Select your tradeline and complete the order form. We'll send you payment instructions via Zelle or wire transfer.",
  },
  {
    icon: CheckCircle2,
    step: "03",
    title: "Get Added",
    description:
      "Once payment is confirmed, you'll be added as an authorized user. The tradeline posts to your credit report.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Watch Your Score Rise",
    description:
      "The tradeline's positive history reflects on your credit profile, boosting your score in as little as one billing cycle.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue text-sm font-semibold uppercase tracking-wider mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Four Simple Steps
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            Getting started is easy. Here&apos;s how you can boost your credit score with tradelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-navy-card border border-navy-border hover:border-blue/30 transition-all group"
              >
                <div className="absolute top-4 right-4 text-4xl font-bold text-navy-border group-hover:text-blue/10 transition-colors">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
