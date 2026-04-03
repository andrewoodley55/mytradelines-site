"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Calendar, CreditCard, Building2, ArrowUpDown, ShoppingCart, X, Check } from "lucide-react";
import Link from "next/link";

interface Tradeline {
  id: string;
  sku: string;
  bank: string;
  credit_limit: number;
  age_years: number;
  age_months: number;
  price: number;
  type: string;
  sale_by_date: string | null;
  report_date: string | null;
}

type SortKey = "price" | "age" | "limit";

export default function PortalTradelines() {
  const supabase = createClient();
  const [tradelines, setTradelines] = useState<Tradeline[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("limit");
  const [filterBank, setFilterBank] = useState("all");
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("tradelines")
        .select("id, sku, bank, credit_limit, age_years, age_months, price, type, sale_by_date, report_date")
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

  const toggleCart = (id: string) => {
    setCart((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const cartItems = tradelines.filter((t) => cart.includes(t.id));
  const cartTotal = cartItems.reduce((sum, t) => sum + t.price, 0);

  return (
    <div className={cart.length > 0 ? "pb-28" : ""}>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Browse Tradelines</h1>
      <p className="text-slate-500 mb-2">Select one or more tradelines to place an order.</p>
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
          {filtered.map((t) => {
            const inCart = cart.includes(t.id);
            return (
              <div
                key={t.id}
                className={`p-6 rounded-2xl bg-white border transition-all ${
                  inCart ? "border-blue ring-2 ring-blue/20" : "border-[#d0dbe8] hover:border-blue/30"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue" />
                    <span className="text-sm font-medium text-slate-900">{t.bank}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {inCart && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue/10 text-blue font-medium flex items-center gap-1">
                        <Check className="h-3 w-3" /> In Cart
                      </span>
                    )}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-mono">
                      {t.sku}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
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

                {(t.sale_by_date || t.report_date) && (
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    {t.sale_by_date && (
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Sale By</p>
                        <p className="text-sm font-semibold text-slate-900">{t.sale_by_date}</p>
                      </div>
                    )}
                    {t.report_date && (
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Report Date</p>
                        <p className="text-sm font-semibold text-slate-900">{t.report_date}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-[#d0dbe8]">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">${t.price}</p>
                    <p className="text-xs text-slate-500">one-time</p>
                  </div>
                  <button
                    onClick={() => toggleCart(t.id)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      inCart
                        ? "bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600"
                        : "bg-blue hover:bg-blue-dark text-white"
                    }`}
                  >
                    {inCart ? "Remove" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sticky cart bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#d0dbe8] shadow-lg md:left-64">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-blue" />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {cart.length} tradeline{cart.length > 1 ? "s" : ""} selected
                </p>
                <p className="text-xs text-slate-500">
                  {cartItems.map((t) => t.bank).join(", ")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-xl font-bold text-slate-900">${cartTotal.toLocaleString()}</p>
              <button
                onClick={() => setCart([])}
                className="p-2 text-slate-400 hover:text-slate-600"
                title="Clear cart"
              >
                <X className="h-5 w-5" />
              </button>
              <Link
                href={`/portal/orders/new?tradelines=${cart.join(",")}`}
                className="px-6 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
