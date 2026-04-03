"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CreditCard, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const supabase = createClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    // Save to DB
    const { error: insertErr } = await supabase
      .from("contact_messages")
      .insert({ name, email, phone: phone || null, message });

    if (insertErr) {
      setError(insertErr.message);
      setSubmitting(false);
      return;
    }

    // Send email notification
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message }),
    });

    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h1>
          <p className="text-slate-600 mb-6">
            Thank you for reaching out. We&apos;ll get back to you as soon as possible.
          </p>
          <a href="/" className="px-6 py-3 rounded-xl bg-blue hover:bg-blue-dark text-white font-semibold transition-colors inline-block">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-[#d0dbe8] text-slate-900 focus:border-blue focus:ring-1 focus:ring-blue outline-none";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <header style={{ backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid #d0dbe8" }}>
        <div className="max-w-3xl mx-auto px-4 py-4">
          <a href="/" className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue" />
            <span className="text-lg font-bold text-slate-900">
              My<span className="text-blue">Tradelines</span>
            </span>
          </a>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Contact Us</h1>
        <p className="text-slate-600 mb-8">Have a question or need help? Fill out the form below and we&apos;ll get back to you.</p>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm mb-6">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#d0dbe8] p-6 space-y-5">
          <div>
            <label className={labelClass}>Name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Your name" />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" />
          </div>
          <div>
            <label className={labelClass}>Phone (optional)</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="(555) 123-4567" />
          </div>
          <div>
            <label className={labelClass}>How can we help you?</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className={inputClass + " resize-none"}
              placeholder="Tell us what you need..."
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-blue hover:bg-blue-dark text-white font-semibold transition-colors disabled:opacity-50"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
