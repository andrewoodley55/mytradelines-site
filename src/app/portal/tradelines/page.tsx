"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Calendar, CreditCard, Building2, ArrowUpDown } from "lucide-react";
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

export default function PortalTradelines() {
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
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Browse Tradelines</h1>
      <p className="text-slate-500 mb-2">Select a tradeline to place an order.</p>
      <p className="text-slate-900 font-bold mb-6">All tradelines remain on your credit report for 2 months.</p>

      <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {banks.map((bank) => (
            <button
              key={bank}
              onClick={() => setFilterBank(bank)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterBank === bank
                  ? "bg-blue text-white"
                  : "bg-white border border-[#d0dbe8] text-slate-600 hover:text-slate-900"
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
            className="bg-white border border-[#d0dbe8] text-slate-600 text-sm rounded-lg px-3 py-2 focus:border-blue focus:ring-blue"
          >
            <option value="price">Sort by Price</option>
            <option value="age">Sort by Age</option>
            <option value="limit">Sort by Credit Limit</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#d0dbe8] p-12 text-center">
          <p className="text-slate-500">No tradelines available right now. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white border border-[#d0dbe8] hover:border-blue/30 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue" />
                  <span className="text-sm font-medium text-slate-900">{t.bank}</span>
                </div>
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

              <div className="flex items-center justify-between pt-4 border-t border-[#d0dbe8]">
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
    </div>
  );
}
