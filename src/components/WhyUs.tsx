import {
  Shield,
  Clock,
  Users,
  HeadphonesIcon,
  Lock,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Fully Vetted Tradelines",
    description:
      "Every tradeline is verified for low utilization, perfect payment history, and active status before listing.",
  },
  {
    icon: Clock,
    title: "Fast Posting",
    description:
      "Most tradelines post to your credit report within 1-2 billing cycles. We keep you updated every step.",
  },
  {
    icon: Lock,
    title: "Secure & Confidential",
    description:
      "Your personal information is handled with strict privacy protocols. We never share your data.",
  },
  {
    icon: Users,
    title: "Dedicated Broker",
    description:
      "You're not dealing with a faceless platform. You work directly with a real person who manages your order.",
  },
  {
    icon: BadgeCheck,
    title: "Guaranteed Posting",
    description:
      "If a tradeline doesn't post to your credit report, we'll replace it or refund your money.",
  },
  {
    icon: HeadphonesIcon,
    title: "Ongoing Support",
    description:
      "Questions before, during, or after? We're here to help you make the best decisions for your credit goals.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue text-sm font-semibold uppercase tracking-wider mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            A Broker You Can Trust
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            We&apos;re not a marketplace — we&apos;re your dedicated partner in building credit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-navy-card border border-navy-border hover:border-blue/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
