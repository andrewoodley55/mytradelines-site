import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue/10 border border-blue/20 text-blue text-sm font-medium mb-8">
            <Zap className="h-3.5 w-3.5" />
            Trusted Tradeline Broker
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            Boost Your Credit Score{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue to-cyan">
              Fast
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Purchase seasoned authorized user tradelines to increase your credit score — or earn money
            by selling yours. Safe, simple, and backed by a dedicated broker.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#tradelines"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue hover:bg-blue-dark text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-blue/25"
            >
              Browse Tradelines
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#sell"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-navy-card border border-navy-border text-white font-semibold text-lg transition-all hover:bg-navy-light hover:border-blue/30"
            >
              Sell Your Tradelines
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { icon: TrendingUp, stat: "50-100+", label: "Point Increase" },
              { icon: Shield, stat: "100%", label: "Confidential" },
              { icon: Zap, stat: "Fast", label: "Posting Time" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="text-center">
                  <Icon className="h-5 w-5 text-blue mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{item.stat}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
