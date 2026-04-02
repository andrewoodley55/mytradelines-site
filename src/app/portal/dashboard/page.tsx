"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { ShoppingCart, CreditCard, Clock } from "lucide-react";
import Link from "next/link";

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  complete: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function PortalDashboard() {
  const { profile } = useAuth();
  const supabase = createClient();
  const [orderCount, setOrderCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState<Array<{
    id: string;
    status: string;
    created_at: string;
    tradelines: { bank: string; type: string; price: number } | null;
  }>>([]);

  useEffect(() => {
    const load = async () => {
      const [total, pending, recent] = await Promise.all([
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase
          .from("orders")
          .select("id, status, created_at, tradelines(bank, type, price)")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);
      setOrderCount(total.count ?? 0);
      setPendingCount(pending.count ?? 0);
      setRecentOrders((recent.data as unknown as typeof recentOrders) ?? []);
    };
    load();
  }, [supabase]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">
        Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}
      </h1>
      <p className="text-slate-500 mb-8">Here&apos;s your account overview.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-[#d0dbe8] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500">Total Orders</span>
            <ShoppingCart className="h-5 w-5 text-blue" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{orderCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-[#d0dbe8] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500">Pending</span>
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{pendingCount}</p>
        </div>
        <Link href="/portal/tradelines" className="bg-white rounded-xl border border-[#d0dbe8] p-5 hover:border-blue/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500">Browse</span>
            <CreditCard className="h-5 w-5 text-emerald-500" />
          </div>
          <p className="text-lg font-bold text-blue">Shop Tradelines →</p>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-[#d0dbe8]">
        <div className="p-5 border-b border-[#d0dbe8] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
          <Link href="/portal/orders" className="text-sm text-blue hover:underline">View all</Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-500 mb-3">You haven&apos;t placed any orders yet.</p>
            <Link href="/portal/tradelines" className="text-blue font-medium hover:underline">
              Browse tradelines to get started
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#d0dbe8]">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {o.tradelines?.bank} {o.tradelines?.type}
                  </p>
                  <p className="text-xs text-slate-500">${o.tradelines?.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[o.status]}`}>
                    {o.status}
                  </span>
                  <span className="text-xs text-slate-400">{new Date(o.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
