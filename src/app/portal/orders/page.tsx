"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface Order {
  id: string;
  status: string;
  created_at: string;
  tradelines: { bank: string; type: string; credit_limit: number; price: number } | null;
}

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  complete: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusMessage: Record<string, string> = {
  pending: "Awaiting payment — see instructions below",
  paid: "Payment received — we're getting started",
  processing: "Being added to your credit report",
  complete: "Done! Check your credit report",
  cancelled: "This order was cancelled",
};

export default function PortalOrders() {
  const supabase = createClient();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("orders")
        .select("id, status, created_at, tradelines(bank, type, credit_limit, price)")
        .order("created_at", { ascending: false });
      setOrders((data as unknown as Order[]) ?? []);
    };
    load();
  }, [supabase]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">My Orders</h1>
      <p className="text-slate-500 mb-6">Track the status of your tradeline orders.</p>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#d0dbe8] p-12 text-center">
          <p className="text-slate-500 mb-3">No orders yet.</p>
          <Link href="/portal/tradelines" className="text-blue font-medium hover:underline">
            Browse tradelines
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-white rounded-xl border border-[#d0dbe8] p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-slate-900">
                    {o.tradelines?.bank} {o.tradelines?.type}
                  </p>
                  <p className="text-sm text-slate-500">
                    ${o.tradelines?.credit_limit?.toLocaleString()} limit — ${o.tradelines?.price}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[o.status]}`}>
                  {o.status}
                </span>
              </div>
              <p className="text-sm text-slate-600">{statusMessage[o.status]}</p>
              {o.status === "pending" && (
                <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <p className="text-sm text-amber-800 font-medium">Payment Instructions:</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Send <strong>${o.tradelines?.price}</strong> via Zelle to <strong>pay@mytradelines.com</strong> or contact us for wire transfer details. Include your order ID in the memo.
                  </p>
                  <p className="text-xs text-amber-600 mt-2">Order ID: {o.id.slice(0, 8)}</p>
                </div>
              )}
              <p className="text-xs text-slate-400 mt-3">
                Ordered {new Date(o.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
