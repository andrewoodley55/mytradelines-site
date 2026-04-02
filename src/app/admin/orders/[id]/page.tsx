"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface OrderDetail {
  id: string;
  status: string;
  customer_full_name: string | null;
  customer_ssn_last4: string | null;
  customer_dob: string | null;
  customer_address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  profiles: { full_name: string | null; email: string; phone: string | null } | null;
  tradelines: { bank: string; type: string; credit_limit: number; age_years: number; age_months: number; price: number } | null;
}

const statusFlow = ["pending", "paid", "processing", "complete"];

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  complete: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("orders")
      .select("*, profiles(full_name, email, phone), tradelines(bank, type, credit_limit, age_years, age_months, price)")
      .eq("id", id)
      .single();
    const o = data as unknown as OrderDetail;
    setOrder(o);
    setNotes(o?.notes ?? "");
  }, [supabase, id]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (status: string) => {
    setSaving(true);
    await supabase.from("orders").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    setSaving(false);
    load();
  };

  const saveNotes = async () => {
    setSaving(true);
    await supabase.from("orders").update({ notes, updated_at: new Date().toISOString() }).eq("id", id);
    setSaving(false);
  };

  if (!order) {
    return <p className="text-slate-500">Loading...</p>;
  }

  return (
    <div>
      <Link href="/admin/orders" className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to orders
      </Link>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Order Details</h1>
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${statusColor[order.status] ?? ""}`}>
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Info */}
        <div className="bg-white rounded-xl border border-[#d0dbe8] p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Customer Information</h2>
          <div className="space-y-3 text-sm">
            <div><span className="text-slate-500">Name:</span> <span className="text-slate-900 font-medium ml-2">{order.customer_full_name || order.profiles?.full_name || "—"}</span></div>
            <div><span className="text-slate-500">Email:</span> <span className="text-slate-900 ml-2">{order.profiles?.email || "—"}</span></div>
            <div><span className="text-slate-500">Phone:</span> <span className="text-slate-900 ml-2">{order.profiles?.phone || "—"}</span></div>
            <div><span className="text-slate-500">DOB:</span> <span className="text-slate-900 ml-2">{order.customer_dob || "—"}</span></div>
            <div><span className="text-slate-500">SSN Last 4:</span> <span className="text-slate-900 ml-2">{order.customer_ssn_last4 || "—"}</span></div>
            <div><span className="text-slate-500">Address:</span> <span className="text-slate-900 ml-2">{order.customer_address || "—"}</span></div>
          </div>
        </div>

        {/* Tradeline Info */}
        <div className="bg-white rounded-xl border border-[#d0dbe8] p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Tradeline</h2>
          <div className="space-y-3 text-sm">
            <div><span className="text-slate-500">Bank:</span> <span className="text-slate-900 font-medium ml-2">{order.tradelines?.bank}</span></div>
            <div><span className="text-slate-500">Type:</span> <span className="text-slate-900 ml-2">{order.tradelines?.type}</span></div>
            <div><span className="text-slate-500">Credit Limit:</span> <span className="text-slate-900 ml-2">${order.tradelines?.credit_limit.toLocaleString()}</span></div>
            <div><span className="text-slate-500">Age:</span> <span className="text-slate-900 ml-2">{order.tradelines?.age_years}yr {order.tradelines?.age_months}mo</span></div>
            <div><span className="text-slate-500">Price:</span> <span className="text-slate-900 font-bold text-lg ml-2">${order.tradelines?.price}</span></div>
          </div>
        </div>

        {/* Status Actions */}
        <div className="bg-white rounded-xl border border-[#d0dbe8] p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Update Status</h2>
          <div className="flex flex-wrap gap-2">
            {statusFlow.map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(s)}
                disabled={saving || order.status === s}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors disabled:opacity-40 ${
                  order.status === s
                    ? "bg-blue text-white"
                    : "bg-white border border-[#d0dbe8] text-slate-600 hover:bg-[#f0f4f8]"
                }`}
              >
                {s}
              </button>
            ))}
            <button
              onClick={() => updateStatus("cancelled")}
              disabled={saving || order.status === "cancelled"}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-40"
            >
              Cancel Order
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Last updated: {new Date(order.updated_at).toLocaleString()}
          </p>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl border border-[#d0dbe8] p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Admin Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-3 py-2.5 rounded-lg border border-[#d0dbe8] text-slate-900 text-sm focus:border-blue focus:ring-1 focus:ring-blue outline-none resize-none"
            placeholder="Add internal notes about this order..."
          />
          <button
            onClick={saveNotes}
            disabled={saving}
            className="mt-3 px-4 py-2 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Notes"}
          </button>
        </div>
      </div>

      <div className="mt-4 text-xs text-slate-400">
        Order placed: {new Date(order.created_at).toLocaleString()} | Order ID: {order.id}
      </div>
    </div>
  );
}
