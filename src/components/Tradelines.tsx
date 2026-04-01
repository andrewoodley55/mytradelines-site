"use client";

import { useState } from "react";
import { Calendar, CreditCard, Building2, ArrowUpDown } from "lucide-react";

interface Tradeline {
  id: string;
  bank: string;
  creditLimit: number;
  ageYears: number;
  ageMonths: number;
  price: number;
  type: string;
}

const sampleTradelines: Tradeline[] = [
  { id: "1", bank: "Chase", creditLimit: 15000, ageYears: 5, ageMonths: 3, price: 600, type: "Visa" },
  { id: "2", bank: "Capital One", creditLimit: 10000, ageYears: 3, ageMonths: 7, price: 400, type: "Mastercard" },
  { id: "3", bank: "Bank of America", creditLimit: 25000, ageYears: 8, ageMonths: 1, price: 950, type: "Visa" },
  { id: "4", bank: "Citi", creditLimit: 20000, ageYears: 6, ageMonths: 10, price: 750, type: "Mastercard" },
  { id: "5", bank: "Discover", creditLimit: 12000, ageYears: 4, ageMonths: 5, price: 500, type: "Discover" },
  { id: "6", bank: "Wells Fargo", creditLimit: 30000, ageYears: 10, ageMonths: 2, price: 1200, type: "Visa" },
  { id: "7", bank: "US Bank", creditLimit: 18000, ageYears: 7, ageMonths: 0, price: 800, type: "Visa" },
  { id: "8", bank: "American Express", creditLimit: 35000, ageYears: 12, ageMonths: 6, price: 1500, type: "Amex" },
  { id: "9", bank: "Chase", creditLimit: 8000, ageYears: 2, ageMonths: 8, price: 300, type: "Visa" },
];

type SortKey = "price" | "age" | "limit";

export function Tradelines() {
  const [sortBy, setSortBy] = useState<SortKey>("price");
  const [filterBank, setFilterBank] = useState("all");

  const banks = ["all", ...Array.from(new Set(sampleTradelines.map((t) => t.bank)))];

  const filtered = sampleTradelines
    .filter((t) => filterBank === "all" || t.bank === filterBank)
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "age") return b.ageYears * 12 + b.ageMonths - (a.ageYears * 12 + a.ageMonths);
      return b.creditLimit - a.creditLimit;
    });

  return (
    <section id="tradelines" className="py-20 sm:py-28 bg-navy-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-blue text-sm font-semibold uppercase tracking-wider mb-3">
            Available Now
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Browse Tradelines
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
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
                    : "bg-navy-card border border-navy-border text-slate-400 hover:text-white hover:border-blue/30"
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
              className="bg-navy-card border border-navy-border text-slate-300 text-sm rounded-lg px-3 py-2 focus:border-blue focus:ring-blue"
            >
              <option value="price">Sort by Price</option>
              <option value="age">Sort by Age</option>
              <option value="limit">Sort by Credit Limit</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-navy-card border border-navy-border hover:border-blue/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue" />
                  <span className="text-sm font-medium text-white">{t.bank}</span>
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
                  <p className="text-lg font-semibold text-white">
                    ${t.creditLimit.toLocaleString()}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                    <Calendar className="h-3 w-3" />
                    Card Age
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {t.ageYears}yr {t.ageMonths}mo
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-navy-border">
                <div>
                  <p className="text-2xl font-bold text-white">${t.price}</p>
                  <p className="text-xs text-slate-500">one-time</p>
                </div>
                <a
                  href={`#contact?tradeline=${t.id}`}
                  className="px-5 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors"
                >
                  Order Now
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          Inventory changes frequently. Contact us for the latest availability and custom requests.
        </p>
      </div>
    </section>
  );
}
