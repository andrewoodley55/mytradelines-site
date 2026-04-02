"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ShoppingCart, CreditCard, Users, Clock } from "lucide-react";
import Link from "next/link";

interface OrderWithDetails {
  id: string;
  status: string;
  created_at: string;
  customer_full_name: string | null;
  profiles: { full_name: string | null; email: string } | null;
  tradelines: { bank: string; price: number } | null;
}

export default function AdminDashboard() {
  const supabase = createClient();
  const [stats, setStats] = useState({ orders: 0, pending: 0, tradelines: 0, customers: 0 });
  const [recentOrders, setRecentOrders] = useState<OrderWithDetails[]>([]);

  useEffect(() => {
    const load = async () => {
      const [ordersRes, pendingRes, tradelinesRes, customersRes, recentRes] = await Promise.all([
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("tradelines").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "customer"),
        supabase
          .from("orders")
          .select("id, status, created_at, customer_full_name, profiles(full_name, email), tradelines(bank, price)")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      setStats({
        orders: ordersRes.count ?? 0,
        pending: pendingRes.count ?? 0,
        tradelines: tradelinesRes.count ?? 0,
        customers: customersRes.count ?? 0,
      });
      setRecentOrders((recentRes.data as unknown as OrderWithDetails[]) ?? []);
    };
    load();
  }, [supabase]);

  const statCards = [
    { label: "Total Orders", value: stats.orders, icon: ShoppingCart, color: "text-blue" },
    { label: "Pending Orders", value: stats.pending, icon: Clock, color: "text-amber-500" },
    { label: "Active Tradelines", value: stats.tradelines, icon: CreditCard, color: "text-emerald-500" },
    { label: "Customers", value: stats.customers, icon: Users, color: "text-purple-500" },
  ];

  const statusColor: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    paid: "bg-blue-100 text-blue-700",
    processing: "bg-purple-100 text-purple-700",
    complete: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-xl border border-[#d0dbe8] p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-500">{s.label}</span>
                <Icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <p className="text-3xl font-bold text-slate-900">{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-[#d0dbe8]">
        <div className="p-5 border-b border-[#d0dbe8] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-blue hover:underline">View all</Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="p-5 text-slate-500 text-sm">No orders yet.</p>
        ) : (
          <div className="divide-y divide-[#d0dbe8]">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="flex items-center justify-between p-4 hover:bg-[#f8fafc] transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {order.customer_full_name || order.profiles?.full_name || order.profiles?.email || "Unknown"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {order.tradelines?.bank} — ${order.tradelines?.price}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[order.status] ?? ""}`}>
                    {order.status}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
