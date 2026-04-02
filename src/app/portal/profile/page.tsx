"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? "");
      setPhone(profile.phone ?? "");
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaved(false);

    await supabase
      .from("profiles")
      .update({ full_name: fullName, phone })
      .eq("id", user.id);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Profile</h1>

      <form onSubmit={handleSave} className="bg-white rounded-xl border border-[#d0dbe8] p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            disabled
            value={profile?.email ?? ""}
            className="w-full px-4 py-3 rounded-xl border border-[#d0dbe8] bg-[#f8fafc] text-slate-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#d0dbe8] text-slate-900 focus:border-blue focus:ring-1 focus:ring-blue outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#d0dbe8] text-slate-900 focus:border-blue focus:ring-1 focus:ring-blue outline-none"
            placeholder="(555) 555-5555"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`w-full py-3 rounded-xl font-semibold transition-colors ${
            saved
              ? "bg-emerald-500 text-white"
              : "bg-blue hover:bg-blue-dark text-white disabled:opacity-50"
          }`}
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
