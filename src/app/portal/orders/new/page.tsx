"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, Upload, FileCheck } from "lucide-react";

interface Tradeline {
  id: string;
  bank: string;
  credit_limit: number;
  age_years: number;
  age_months: number;
  price: number;
  type: string;
}

function OrderForm() {
  const supabase = createClient();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tradelineId = searchParams.get("tradeline");

  const [tradeline, setTradeline] = useState<Tradeline | null>(null);
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [ssn4, setSsn4] = useState("");
  const [address, setAddress] = useState("");
  const [idFile, setIdFile] = useState<File | null>(null);
  const [ssnFile, setSsnFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tradelineId) return;
    const load = async () => {
      const { data } = await supabase.from("tradelines").select("*").eq("id", tradelineId).single();
      setTradeline(data);
    };
    load();
  }, [supabase, tradelineId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !tradeline) return;

    if (!idFile || !ssnFile) {
      setError("Please upload both your ID and SSN card.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      // 1. Create the order first
      const { data: orderData, error: insertError } = await supabase
        .from("orders")
        .insert({
          customer_id: user.id,
          tradeline_id: tradeline.id,
          customer_full_name: fullName,
          customer_dob: dob,
          customer_ssn_last4: ssn4,
          customer_address: address,
        })
        .select("id")
        .single();

      if (insertError) {
        setError(insertError.message);
        setSubmitting(false);
        return;
      }

      const newOrderId = orderData.id;

      // 2. Upload ID document
      const idExt = idFile.name.split(".").pop();
      const idPath = `${user.id}/${newOrderId}/id.${idExt}`;
      const { error: idUploadErr } = await supabase.storage
        .from("order-documents")
        .upload(idPath, idFile);

      if (idUploadErr) {
        setError("Failed to upload ID: " + idUploadErr.message);
        setSubmitting(false);
        return;
      }

      // 3. Upload SSN card
      const ssnExt = ssnFile.name.split(".").pop();
      const ssnPath = `${user.id}/${newOrderId}/ssn.${ssnExt}`;
      const { error: ssnUploadErr } = await supabase.storage
        .from("order-documents")
        .upload(ssnPath, ssnFile);

      if (ssnUploadErr) {
        setError("Failed to upload SSN card: " + ssnUploadErr.message);
        setSubmitting(false);
        return;
      }

      // 4. Update order with file paths
      await supabase
        .from("orders")
        .update({ id_document_path: idPath, ssn_document_path: ssnPath })
        .eq("id", newOrderId);

      setOrderId(newOrderId);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setSubmitting(false);
  };

  if (!tradelineId) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 mb-3">No tradeline selected.</p>
        <Link href="/portal/tradelines" className="text-blue hover:underline">Browse tradelines</Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Order Placed!</h2>
        <p className="text-slate-600 mb-6">Your order for the {tradeline?.bank} tradeline has been submitted.</p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-left mb-6">
          <p className="text-amber-800 font-semibold mb-3">Payment Instructions:</p>

          <div className="space-y-3 text-sm text-amber-700">
            <div>
              <p className="font-medium text-amber-800">Zelle:</p>
              <p>Send <strong>${tradeline?.price}</strong> to <strong>pay@mytradelines.com</strong></p>
            </div>
            <div>
              <p className="font-medium text-amber-800">Wire Transfer:</p>
              <p>Contact us for wire transfer details</p>
            </div>
            <div>
              <p className="font-medium text-amber-800">ACH:</p>
              <p>Contact us for ACH details</p>
            </div>
          </div>

          <p className="text-sm text-amber-700 mt-3">Include this in the memo: <strong>{orderId.slice(0, 8)}</strong></p>
        </div>

        <div className="flex gap-3 justify-center">
          <Link href="/portal/orders" className="px-5 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors">
            View My Orders
          </Link>
          <button onClick={() => router.push("/portal/tradelines")} className="px-5 py-2.5 rounded-lg border border-[#d0dbe8] text-slate-600 text-sm font-medium hover:bg-[#f0f4f8]">
            Order Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Place Your Order</h1>

      {tradeline && (
        <div className="bg-white rounded-xl border border-[#d0dbe8] p-5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">{tradeline.bank}</p>
              <p className="text-sm text-slate-500">
                ${tradeline.credit_limit.toLocaleString()} limit — {tradeline.age_years}yr {tradeline.age_months}mo old
              </p>
            </div>
            <p className="text-2xl font-bold text-blue">${tradeline.price}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#d0dbe8] p-6 space-y-5">
        <p className="text-sm text-slate-600">
          We need a few details to add you as an authorized user. This information is kept confidential and only used for the tradeline addition.
        </p>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Legal Name</label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#d0dbe8] text-slate-900 focus:border-blue focus:ring-1 focus:ring-blue outline-none"
            placeholder="As it appears on your ID"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
            <input
              required
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#d0dbe8] text-slate-900 focus:border-blue focus:ring-1 focus:ring-blue outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Last 4 of SSN</label>
            <input
              required
              maxLength={4}
              pattern="[0-9]{4}"
              value={ssn4}
              onChange={(e) => setSsn4(e.target.value.replace(/\D/g, "").slice(0, 4))}
              className="w-full px-4 py-3 rounded-xl border border-[#d0dbe8] text-slate-900 focus:border-blue focus:ring-1 focus:ring-blue outline-none"
              placeholder="1234"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Current Address</label>
          <input
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#d0dbe8] text-slate-900 focus:border-blue focus:ring-1 focus:ring-blue outline-none"
            placeholder="123 Main St, City, State ZIP"
          />
        </div>

        {/* Document uploads */}
        <div className="border-t border-[#d0dbe8] pt-5">
          <p className="text-sm font-medium text-slate-700 mb-3">Upload Documents</p>
          <p className="text-xs text-slate-500 mb-4">Please upload a clear photo or scan of both documents. Accepted formats: JPG, PNG, PDF.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* ID Upload */}
            <label className={`flex flex-col items-center justify-center p-5 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
              idFile ? "border-emerald-300 bg-emerald-50" : "border-[#d0dbe8] hover:border-blue hover:bg-blue/5"
            }`}>
              {idFile ? (
                <>
                  <FileCheck className="h-8 w-8 text-emerald-500 mb-2" />
                  <span className="text-sm font-medium text-emerald-700">ID Uploaded</span>
                  <span className="text-xs text-emerald-600 mt-1 truncate max-w-full">{idFile.name}</span>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="text-sm font-medium text-slate-600">Government ID</span>
                  <span className="text-xs text-slate-400 mt-1">Driver&apos;s license or passport</span>
                </>
              )}
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => setIdFile(e.target.files?.[0] ?? null)}
              />
            </label>

            {/* SSN Card Upload */}
            <label className={`flex flex-col items-center justify-center p-5 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
              ssnFile ? "border-emerald-300 bg-emerald-50" : "border-[#d0dbe8] hover:border-blue hover:bg-blue/5"
            }`}>
              {ssnFile ? (
                <>
                  <FileCheck className="h-8 w-8 text-emerald-500 mb-2" />
                  <span className="text-sm font-medium text-emerald-700">SSN Card Uploaded</span>
                  <span className="text-xs text-emerald-600 mt-1 truncate max-w-full">{ssnFile.name}</span>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="text-sm font-medium text-slate-600">Social Security Card</span>
                  <span className="text-xs text-slate-400 mt-1">Front of SSN card</span>
                </>
              )}
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => setSsnFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting || !tradeline}
          className="w-full py-3 rounded-xl bg-blue hover:bg-blue-dark text-white font-semibold transition-colors disabled:opacity-50"
        >
          {submitting ? "Placing order..." : `Place Order — $${tradeline?.price ?? ""}`}
        </button>

        <p className="text-xs text-slate-400 text-center">
          By placing this order you agree to our terms. Your documents are stored securely and only used for tradeline processing. Payment instructions will be shown after submission.
        </p>
      </form>
    </div>
  );
}

export default function NewOrderPage() {
  return (
    <Suspense fallback={<p className="text-slate-500">Loading...</p>}>
      <OrderForm />
    </Suspense>
  );
}
