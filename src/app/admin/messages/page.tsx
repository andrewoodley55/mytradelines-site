"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
}

const statusColor: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  read: "bg-slate-100 text-slate-600",
  replied: "bg-emerald-100 text-emerald-700",
};

export default function AdminMessages() {
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      setMessages(data ?? []);
    };
    load();
  }, [supabase]);

  const updateStatus = async (id: string, status: string) => {
    setSaving(true);
    await supabase.from("contact_messages").update({ status }).eq("id", id);
    setMessages(messages.map((m) => (m.id === id ? { ...m, status } : m)));
    if (selected?.id === id) setSelected({ ...selected, status });
    setSaving(false);
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    setMessages(messages.filter((m) => m.id !== id));
    setSelected(null);
  };

  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)} className="text-sm text-slate-500 hover:text-slate-700 mb-4">
          &larr; Back to messages
        </button>

        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Message from {selected.name}</h1>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[selected.status]}`}>{selected.status}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-[#d0dbe8] p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact Info</h2>
            <div className="space-y-2 text-sm">
              <div><span className="text-slate-500">Name:</span> <span className="text-slate-900 font-medium ml-2">{selected.name}</span></div>
              <div><span className="text-slate-500">Email:</span> <a href={`mailto:${selected.email}`} className="text-blue hover:underline ml-2">{selected.email}</a></div>
              <div><span className="text-slate-500">Phone:</span> <span className="text-slate-900 ml-2">{selected.phone || "—"}</span></div>
              <div><span className="text-slate-500">Received:</span> <span className="text-slate-900 ml-2">{new Date(selected.created_at).toLocaleString()}</span></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#d0dbe8] p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Actions</h2>
            <div className="flex gap-3">
              <button
                onClick={() => updateStatus(selected.id, "read")}
                disabled={saving || selected.status === "read"}
                className="px-4 py-2 rounded-lg border border-[#d0dbe8] text-slate-600 text-sm font-medium hover:bg-[#f0f4f8] transition-colors disabled:opacity-40"
              >
                Mark as Read
              </button>
              <button
                onClick={() => updateStatus(selected.id, "replied")}
                disabled={saving || selected.status === "replied"}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors disabled:opacity-40"
              >
                Mark as Replied
              </button>
              <button
                onClick={() => deleteMessage(selected.id)}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#d0dbe8] p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Message</h2>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const newCount = messages.filter((m) => m.status === "new").length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Messages</h1>
      <p className="text-slate-500 mb-6">
        Contact form submissions.{newCount > 0 && <span className="text-blue font-medium"> {newCount} new</span>}
      </p>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#d0dbe8] p-12 text-center">
          <p className="text-slate-500">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m)}
              className="w-full text-left bg-white rounded-xl border border-[#d0dbe8] p-5 hover:border-blue/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{m.name}</p>
                  <p className="text-sm text-slate-500 line-clamp-1">{m.message}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[m.status]}`}>{m.status}</span>
                  <span className="text-xs text-slate-400">{new Date(m.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
