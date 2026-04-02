import { CreditCard, Shield, TrendingUp } from "lucide-react";

export function Tradelines() {
  return (
    <section id="tradelines" className="py-12 sm:py-16 bg-navy-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-blue text-sm font-semibold uppercase tracking-wider mb-3">
            Available Now
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            40+ Tradelines Available
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            Premium authorized user tradelines from top banks including AMEX, Chase, Citi, Discover, Barclays, and Fidelity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-white border border-[#d0dbe8] text-center">
            <CreditCard className="h-8 w-8 text-blue mx-auto mb-3" />
            <p className="text-2xl font-bold text-slate-900">$2K – $60K</p>
            <p className="text-sm text-slate-500 mt-1">Credit Limits</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#d0dbe8] text-center">
            <TrendingUp className="h-8 w-8 text-blue mx-auto mb-3" />
            <p className="text-2xl font-bold text-slate-900">2 – 9+ Years</p>
            <p className="text-sm text-slate-500 mt-1">Account Ages</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#d0dbe8] text-center">
            <Shield className="h-8 w-8 text-blue mx-auto mb-3" />
            <p className="text-2xl font-bold text-slate-900">2 Months</p>
            <p className="text-sm text-slate-500 mt-1">On Your Credit Report</p>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/signup"
            className="inline-block px-8 py-3.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-base font-semibold transition-colors"
          >
            Sign Up to View Tradelines
          </a>
          <p className="text-slate-500 text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
