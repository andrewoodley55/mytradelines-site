"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Customer {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
}

export default function AdminCustomers() {
  const supabase = createClient();
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, email, full_name, phone, created_at")
        .eq("role", "customer")
        .order("created_at", { ascending: false });
      setCustomers(data ?? []);
    };
    load();
  }, [supabase]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Customers</h1>

      <div className="bg-white rounded-xl border border-[#d0dbe8] overflow-hidden">
        {customers.length === 0 ? (
          <p className="p-8 text-center text-slate-500">No customers yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#d0dbe8] bg-[#f8fafc]">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Email</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Phone</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Signed Up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d0dbe8]">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-[#f8fafc]">
                  <td className="px-4 py-3 font-medium text-slate-900">{c.full_name || "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{c.email}</td>
                  <td className="px-4 py-3 text-slate-600">{c.phone || "—"}</td>
                  <td className="px-4 py-3 text-slate-500">{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
