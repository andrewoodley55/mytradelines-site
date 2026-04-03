"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface Order {
  id: string;
  status: string;
  created_at: string;
  customer_full_name: string | null;
  profiles: { full_name: string | null; email: string } | null;
  tradelines: { bank: string; type: string; credit_limit: number; price: number; sku: string } | null;
}

const statuses = ["all", "pending", "paid", "processing", "complete", "cancelled"];

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  complete: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const supabase = createClient();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    let query = supabase
      .from("orders")
      .select("id, status, created_at, customer_full_name, profiles(full_name, email), tradelines(bank, type, credit_limit, price, sku)")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data } = await query;
    setOrders((data as unknown as Order[]) ?? []);
  }, [supabase, filter]);

  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Orders</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              filter === s
                ? "bg-blue text-white"
                : "bg-white border border-[#d0dbe8] text-slate-600 hover:text-slate-900"
            }`}
          >
            {s === "all" ? "All Orders" : s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#d0dbe8] overflow-hidden">
        {orders.length === 0 ? (
          <p className="p-8 text-center text-slate-500">No orders found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#d0dbe8] bg-[#f8fafc]">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Customer</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Tradeline</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Amount</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d0dbe8]">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-[#f8fafc]">
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${o.id}`} className="font-medium text-slate-900 hover:text-blue">
                      {o.customer_full_name || o.profiles?.full_name || o.profiles?.email || "Unknown"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <span className="font-mono text-xs text-slate-400 mr-2">{o.tradelines?.sku}</span>
                    {o.tradelines?.bank} {o.tradelines?.type} — ${o.tradelines?.credit_limit?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900">${o.tradelines?.price}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[o.status] ?? ""}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{new Date(o.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
