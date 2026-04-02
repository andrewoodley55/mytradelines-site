"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Tradeline {
  id: string;
  bank: string;
  credit_limit: number;
  age_years: number;
  age_months: number;
  price: number;
  type: string;
  available: boolean;
}

const emptyForm = {
  bank: "",
  credit_limit: "",
  age_years: "",
  age_months: "",
  price: "",
  type: "Visa",
  available: true,
};

export default function AdminTradelines() {
  const supabase = createClient();
  const [tradelines, setTradelines] = useState<Tradeline[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("tradelines")
      .select("*")
      .order("created_at", { ascending: false });
    setTradelines(data ?? []);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (t: Tradeline) => {
    setEditingId(t.id);
    setForm({
      bank: t.bank,
      credit_limit: String(t.credit_limit),
      age_years: String(t.age_years),
      age_months: String(t.age_months),
      price: String(t.price),
      type: t.type,
      available: t.available,
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      bank: form.bank,
      credit_limit: Number(form.credit_limit),
      age_years: Number(form.age_years),
      age_months: Number(form.age_months),
      price: Number(form.price),
      type: form.type,
      available: form.available,
    };

    if (editingId) {
      await supabase.from("tradelines").update(data).eq("id", editingId);
    } else {
      await supabase.from("tradelines").insert(data);
    }

    setSaving(false);
    setShowForm(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this tradeline?")) return;
    await supabase.from("tradelines").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Tradelines</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Tradeline
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl border border-[#d0dbe8] p-6 w-full max-w-lg space-y-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingId ? "Edit Tradeline" : "Add Tradeline"}
              </h2>
              <button type="button" onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Bank</label>
                <input
                  required
                  value={form.bank}
                  onChange={(e) => setForm({ ...form, bank: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#d0dbe8] text-slate-900 focus:border-blue focus:ring-1 focus:ring-blue outline-none"
                  placeholder="e.g. Chase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Credit Limit ($)</label>
                <input
                  required
                  type="number"
                  value={form.credit_limit}
                  onChange={(e) => setForm({ ...form, credit_limit: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#d0dbe8] text-slate-900 focus:border-blue focus:ring-1 focus:ring-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
                <input
                  required
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#d0dbe8] text-slate-900 focus:border-blue focus:ring-1 focus:ring-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Age (Years)</label>
                <input
                  required
                  type="number"
                  value={form.age_years}
                  onChange={(e) => setForm({ ...form, age_years: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#d0dbe8] text-slate-900 focus:border-blue focus:ring-1 focus:ring-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Age (Months)</label>
                <input
                  required
                  type="number"
                  min="0"
                  max="11"
                  value={form.age_months}
                  onChange={(e) => setForm({ ...form, age_months: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#d0dbe8] text-slate-900 focus:border-blue focus:ring-1 focus:ring-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Card Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#d0dbe8] text-slate-900 focus:border-blue focus:ring-1 focus:ring-blue outline-none"
                >
                  <option>Visa</option>
                  <option>Mastercard</option>
                  <option>Amex</option>
                  <option>Discover</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={form.available}
                  onChange={(e) => setForm({ ...form, available: e.target.checked })}
                  className="rounded border-[#d0dbe8]"
                />
                <label htmlFor="available" className="text-sm text-slate-700">Available</label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white font-semibold text-sm transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : editingId ? "Update" : "Add Tradeline"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 rounded-lg border border-[#d0dbe8] text-slate-600 text-sm font-medium hover:bg-[#f0f4f8]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#d0dbe8] overflow-hidden">
        {tradelines.length === 0 ? (
          <p className="p-8 text-center text-slate-500">No tradelines yet. Click &quot;Add Tradeline&quot; to get started.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#d0dbe8] bg-[#f8fafc]">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Bank</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Type</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Limit</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Age</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Price</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d0dbe8]">
              {tradelines.map((t) => (
                <tr key={t.id} className="hover:bg-[#f8fafc]">
                  <td className="px-4 py-3 font-medium text-slate-900">{t.bank}</td>
                  <td className="px-4 py-3 text-slate-600">{t.type}</td>
                  <td className="px-4 py-3 text-slate-600">${t.credit_limit.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600">{t.age_years}yr {t.age_months}mo</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">${t.price}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${t.available ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                      {t.available ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(t)} className="p-1.5 text-slate-400 hover:text-blue transition-colors">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(t.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors ml-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
