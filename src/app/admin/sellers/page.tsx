"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Application {
  id: string;
  full_name: string;
  phone: string;
  city_state: string;
  bank_name: string;
  card_type: string;
  credit_limit: number;
  current_balance: number;
  date_opened: string;
  au_spots_available: number;
  desired_price: number | null;
  utilization_under_30: boolean;
  late_payments: boolean;
  account_issues: boolean;
  sold_before: boolean;
  reports_experian: boolean;
  reports_equifax: boolean;
  reports_transunion: boolean;
  statement_close_date: string | null;
  dob: string;
  ssn_last4: string;
  is_primary_holder: boolean;
  is_authorized_to_manage: boolean;
  users_per_cycle: number | null;
  turnaround_time: string | null;
  duration_on_account: string | null;
  screenshot_path: string | null;
  status: string;
  created_at: string;
}

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminSellers() {
  const supabase = createClient();
  const [apps, setApps] = useState<Application[]>([]);
  const [selected, setSelected] = useState<Application | null>(null);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("seller_applications")
        .select("*")
        .order("created_at", { ascending: false });
      setApps(data ?? []);
    };
    load();
  }, [supabase]);

  const viewApp = async (app: Application) => {
    setSelected(app);
    setScreenshotUrl(null);
    if (app.screenshot_path) {
      const { data } = await supabase.storage
        .from("order-documents")
        .createSignedUrl(app.screenshot_path, 3600);
      if (data) setScreenshotUrl(data.signedUrl);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setSaving(true);
    await supabase
      .from("seller_applications")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    setApps(apps.map((a) => (a.id === id ? { ...a, status } : a)));
    if (selected?.id === id) setSelected({ ...selected, status });
    setSaving(false);
  };

  if (selected) {
    const a = selected;
    const bureaus = [
      a.reports_experian && "Experian",
      a.reports_equifax && "Equifax",
      a.reports_transunion && "TransUnion",
    ].filter(Boolean).join(", ") || "Not specified";

    return (
      <div>
        <button onClick={() => setSelected(null)} className="text-sm text-slate-500 hover:text-slate-700 mb-4">
          &larr; Back to applications
        </button>

        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-900">{a.full_name}</h1>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[a.status]}`}>{a.status}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact */}
          <div className="bg-white rounded-xl border border-[#d0dbe8] p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact Info</h2>
            <div className="space-y-2 text-sm">
              <div><span className="text-slate-500">Phone:</span> <span className="text-slate-900 ml-2">{a.phone}</span></div>
              <div><span className="text-slate-500">Location:</span> <span className="text-slate-900 ml-2">{a.city_state}</span></div>
              <div><span className="text-slate-500">DOB:</span> <span className="text-slate-900 ml-2">{a.dob}</span></div>
              <div><span className="text-slate-500">SSN Last 4:</span> <span className="text-slate-900 ml-2">{a.ssn_last4}</span></div>
            </div>
          </div>

          {/* Tradeline */}
          <div className="bg-white rounded-xl border border-[#d0dbe8] p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Tradeline Details</h2>
            <div className="space-y-2 text-sm">
              <div><span className="text-slate-500">Bank:</span> <span className="text-slate-900 font-medium ml-2">{a.bank_name}</span></div>
              <div><span className="text-slate-500">Type:</span> <span className="text-slate-900 ml-2">{a.card_type}</span></div>
              <div><span className="text-slate-500">Credit Limit:</span> <span className="text-slate-900 ml-2">${a.credit_limit.toLocaleString()}</span></div>
              <div><span className="text-slate-500">Current Balance:</span> <span className="text-slate-900 ml-2">${a.current_balance.toLocaleString()}</span></div>
              <div><span className="text-slate-500">Date Opened:</span> <span className="text-slate-900 ml-2">{a.date_opened}</span></div>
              <div><span className="text-slate-500">Statement Close:</span> <span className="text-slate-900 ml-2">{a.statement_close_date || "—"}</span></div>
              <div><span className="text-slate-500">Bureaus:</span> <span className="text-slate-900 ml-2">{bureaus}</span></div>
              <div><span className="text-slate-500">AU Spots:</span> <span className="text-slate-900 ml-2">{a.au_spots_available}</span></div>
            </div>
          </div>

          {/* Quality */}
          <div className="bg-white rounded-xl border border-[#d0dbe8] p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quality & Verification</h2>
            <div className="space-y-2 text-sm">
              <div><span className="text-slate-500">Primary Holder:</span> <span className={`ml-2 font-medium ${a.is_primary_holder ? "text-emerald-600" : "text-red-600"}`}>{a.is_primary_holder ? "Yes" : "No"}</span></div>
              <div><span className="text-slate-500">Authorized to Manage:</span> <span className={`ml-2 font-medium ${a.is_authorized_to_manage ? "text-emerald-600" : "text-red-600"}`}>{a.is_authorized_to_manage ? "Yes" : "No"}</span></div>
              <div><span className="text-slate-500">Utilization Under 30%:</span> <span className={`ml-2 font-medium ${a.utilization_under_30 ? "text-emerald-600" : "text-red-600"}`}>{a.utilization_under_30 ? "Yes" : "No"}</span></div>
              <div><span className="text-slate-500">Late Payments (24mo):</span> <span className={`ml-2 font-medium ${!a.late_payments ? "text-emerald-600" : "text-red-600"}`}>{a.late_payments ? "Yes" : "No"}</span></div>
              <div><span className="text-slate-500">Account Issues:</span> <span className={`ml-2 font-medium ${!a.account_issues ? "text-emerald-600" : "text-red-600"}`}>{a.account_issues ? "Yes" : "No"}</span></div>
              <div><span className="text-slate-500">Sold Before:</span> <span className="text-slate-900 ml-2">{a.sold_before ? "Yes" : "No"}</span></div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl border border-[#d0dbe8] p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Pricing & Availability</h2>
            <div className="space-y-2 text-sm">
              <div><span className="text-slate-500">Desired Price/Spot:</span> <span className="text-slate-900 ml-2">{a.desired_price ? `$${a.desired_price}` : "—"}</span></div>
              <div><span className="text-slate-500">Users Per Cycle:</span> <span className="text-slate-900 ml-2">{a.users_per_cycle ?? "—"}</span></div>
              <div><span className="text-slate-500">Turnaround:</span> <span className="text-slate-900 ml-2">{a.turnaround_time || "—"}</span></div>
              <div><span className="text-slate-500">Duration:</span> <span className="text-slate-900 ml-2">{a.duration_on_account || "—"}</span></div>
            </div>
          </div>

          {/* Screenshot */}
          {a.screenshot_path && (
            <div className="bg-white rounded-xl border border-[#d0dbe8] p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Account Screenshot</h2>
              {screenshotUrl ? (
                <a href={screenshotUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-blue text-white text-sm font-medium hover:bg-blue-dark transition-colors inline-block">
                  View Screenshot
                </a>
              ) : (
                <p className="text-sm text-slate-400">Loading...</p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="bg-white rounded-xl border border-[#d0dbe8] p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Actions</h2>
            <div className="flex gap-3">
              <button
                onClick={() => updateStatus(a.id, "approved")}
                disabled={saving || a.status === "approved"}
                className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors disabled:opacity-40"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(a.id, "rejected")}
                disabled={saving || a.status === "rejected"}
                className="px-5 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-40"
              >
                Reject
              </button>
              <button
                onClick={() => updateStatus(a.id, "pending")}
                disabled={saving || a.status === "pending"}
                className="px-5 py-2.5 rounded-lg border border-[#d0dbe8] text-slate-600 text-sm font-medium hover:bg-[#f0f4f8] transition-colors disabled:opacity-40"
              >
                Reset to Pending
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-3">Applied: {new Date(a.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Seller Applications</h1>
      <p className="text-slate-500 mb-6">Review applications from people who want to sell tradelines.</p>

      {apps.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#d0dbe8] p-12 text-center">
          <p className="text-slate-500">No applications yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {apps.map((a) => (
            <button
              key={a.id}
              onClick={() => viewApp(a)}
              className="w-full text-left bg-white rounded-xl border border-[#d0dbe8] p-5 hover:border-blue/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{a.full_name}</p>
                  <p className="text-sm text-slate-500">
                    {a.bank_name} — ${a.credit_limit.toLocaleString()} limit — {a.card_type} — Opened {a.date_opened}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[a.status]}`}>{a.status}</span>
                  <span className="text-xs text-slate-400">{new Date(a.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
