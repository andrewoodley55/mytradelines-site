"use client";

import { useState, useEffect } from "react";
import { Calendar, CreditCard, Building2, ArrowUpDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface Tradeline {
  id: string;
  bank: string;
  credit_limit: number;
  age_years: number;
  age_months: number;
  price: number;
  type: string;
}

type SortKey = "price" | "age" | "limit";

export function Tradelines() {
  const supabase = createClient();
  const [tradelines, setTradelines] = useState<Tradeline[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("price");
  const [filterBank, setFilterBank] = useState("all");

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("tradelines")
        .select("id, bank, credit_limit, age_years, age_months, price, type")
        .eq("available", true);
      setTradelines(data ?? []);
    };
    load();
  }, [supabase]);

  const banks = ["all", ...Array.from(new Set(tradelines.map((t) => t.bank)))];

  const filtered = tradelines
    .filter((t) => filterBank === "all" || t.bank === filterBank)
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "age") return b.age_years * 12 + b.age_months - (a.age_years * 12 + a.age_months);
      return b.credit_limit - a.credit_limit;
    });

  return (
    <section id="tradelines" className="py-20 sm:py-28 bg-navy-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-blue text-sm font-semibold uppercase tracking-wider mb-3">
            Available Now
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Browse Tradelines
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            Select a tradeline that fits your goals and budget. All tradelines are actively managed
            with low utilization.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {banks.map((bank) => (
              <button
                key={bank}
                onClick={() => setFilterBank(bank)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterBank === bank
                    ? "bg-blue text-white"
                    : "bg-navy-card border border-navy-border text-slate-600 hover:text-slate-900 hover:border-blue/30"
                }`}
              >
                {bank === "all" ? "All Banks" : bank}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="bg-navy-card border border-navy-border text-slate-600 text-sm rounded-lg px-3 py-2 focus:border-blue focus:ring-blue"
            >
              <option value="price">Sort by Price</option>
              <option value="age">Sort by Age</option>
              <option value="limit">Sort by Credit Limit</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">No tradelines available right now. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-navy-card border border-navy-border hover:border-blue/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue" />
                    <span className="text-sm font-medium text-slate-900">{t.bank}</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-blue/10 text-blue font-medium">
                    {t.type}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                      <CreditCard className="h-3 w-3" />
                      Credit Limit
                    </div>
                    <p className="text-lg font-semibold text-slate-900">
                      ${t.credit_limit.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                      <Calendar className="h-3 w-3" />
                      Card Age
                    </div>
                    <p className="text-lg font-semibold text-slate-900">
                      {t.age_years}yr {t.age_months}mo
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-navy-border">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">${t.price}</p>
                    <p className="text-xs text-slate-500">one-time</p>
                  </div>
                  <Link
                    href={`/portal/orders/new?tradeline=${t.id}`}
                    className="px-5 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-slate-500 text-sm mt-8">
          Inventory changes frequently. Contact us for the latest availability and custom requests.
        </p>
      </div>
    </section>
  );
}
