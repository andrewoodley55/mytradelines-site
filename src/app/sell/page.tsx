"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CreditCard, CheckCircle2, Upload, FileCheck, Plus, Trash2 } from "lucide-react";

interface CardEntry {
  bankName: string;
  cardType: string;
  creditLimit: string;
  currentBalance: string;
  dateOpened: string;
  latePayments: string;
  statementCloseDate: string;
  experian: boolean;
  equifax: boolean;
  transunion: boolean;
  auSpots: string;
  screenshot: File | null;
}

const emptyCard = (): CardEntry => ({
  bankName: "",
  cardType: "",
  creditLimit: "",
  currentBalance: "",
  dateOpened: "",
  latePayments: "",
  statementCloseDate: "",
  experian: false,
  equifax: false,
  transunion: false,
  auSpots: "",
  screenshot: null,
});

export default function SellPage() {
  const supabase = createClient();

  // Section 1
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [cityState, setCityState] = useState("");

  // Section 2
  const [isPrimaryHolder, setIsPrimaryHolder] = useState("");
  const [isAuthorized, setIsAuthorized] = useState("");
  const [dob, setDob] = useState("");
  const [ssn4, setSsn4] = useState("");

  // Section 3 - multiple cards
  const [cards, setCards] = useState<CardEntry[]>([emptyCard()]);

  // Section 4
  const [utilizationUnder7, setUtilizationUnder7] = useState("");
  const [accountIssues, setAccountIssues] = useState("");
  const [soldBefore, setSoldBefore] = useState("");

  // Section 5
  const [desiredPrice, setDesiredPrice] = useState("");
  const [usersPerCycle, setUsersPerCycle] = useState("");
  const [turnaroundTime, setTurnaroundTime] = useState("");

  // Section 7
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateCard = (index: number, field: keyof CardEntry, value: string | boolean | File | null) => {
    setCards(cards.map((c, i) => (i === index ? { ...c, [field]: value } : c)));
  };

  const addCard = () => {
    setCards([...cards, emptyCard()]);
  };

  const removeCard = (index: number) => {
    if (cards.length <= 1) return;
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agreedToTerms) {
      setError("You must agree to the terms before submitting.");
      return;
    }

    if (isPrimaryHolder !== "yes" || isAuthorized !== "yes") {
      setError("You must be the primary account holder and authorized to manage users.");
      return;
    }

    setSubmitting(true);

    try {
      // Submit one application row per card
      for (const card of cards) {
        let screenshotPath: string | null = null;
        if (card.screenshot) {
          const ext = card.screenshot.name.split(".").pop();
          const path = `seller-apps/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
          const { error: uploadErr } = await supabase.storage
            .from("order-documents")
            .upload(path, card.screenshot);
          if (!uploadErr) {
            screenshotPath = path;
          }
        }

        const { error: insertErr } = await supabase
          .from("seller_applications")
          .insert({
            full_name: fullName,
            phone,
            city_state: cityState,
            is_primary_holder: isPrimaryHolder === "yes",
            is_authorized_to_manage: isAuthorized === "yes",
            dob,
            ssn_last4: ssn4,
            bank_name: card.bankName,
            card_type: card.cardType,
            credit_limit: parseInt(card.creditLimit) || 0,
            current_balance: parseInt(card.currentBalance) || 0,
            date_opened: card.dateOpened,
            late_payments: card.latePayments === "yes",
            statement_close_date: card.statementCloseDate,
            reports_experian: card.experian,
            reports_equifax: card.equifax,
            reports_transunion: card.transunion,
            au_spots_available: parseInt(card.auSpots) || 0,
            utilization_under_30: utilizationUnder7 === "yes",
            account_issues: accountIssues === "yes",
            sold_before: soldBefore === "yes",
            desired_price: parseInt(desiredPrice) || null,
            users_per_cycle: parseInt(usersPerCycle) || null,
            turnaround_time: turnaroundTime,
            duration_on_account: "60 days minimum",
            screenshot_path: screenshotPath,
            agreed_to_terms: true,
          });

        if (insertErr) {
          setError(insertErr.message);
          setSubmitting(false);
          return;
        }
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h1>
          <p className="text-slate-600 mb-6">
            Thank you for your interest in selling tradelines. We&apos;ll review your application and get back to you shortly.
          </p>
          <a href="/" className="px-6 py-3 rounded-xl bg-blue hover:bg-blue-dark text-white font-semibold transition-colors inline-block">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const radioClass = "flex items-center gap-3 px-4 py-3 rounded-xl border border-[#d0dbe8] cursor-pointer transition-colors hover:border-blue/30";
  const radioActiveClass = "flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-blue bg-blue/5 cursor-pointer";
  const inputClass = "w-full px-4 py-3 rounded-xl border border-[#d0dbe8] text-slate-900 focus:border-blue focus:ring-1 focus:ring-blue outline-none";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";
  const sectionTitleClass = "text-lg font-bold text-slate-900 mb-1";
  const sectionDescClass = "text-sm text-slate-500 mb-5";

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* Header */}
      <header style={{ backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid #d0dbe8" }}>
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue" />
            <span className="text-lg font-bold text-slate-900">
              My<span className="text-blue">Tradelines</span>
            </span>
          </a>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Sell Your Tradelines</h1>
        <p className="text-slate-600 mb-8">
          Complete the application below. We review every submission and will reach out if your account qualifies.
        </p>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm mb-6">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* SECTION 1: Contact Information */}
          <div className="bg-white rounded-2xl border border-[#d0dbe8] p-6">
            <h2 className={sectionTitleClass}>Contact Information</h2>
            <p className={sectionDescClass}>How we&apos;ll reach you about your application.</p>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} placeholder="Your full legal name" />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="(555) 123-4567" />
              </div>
              <div>
                <label className={labelClass}>City & State</label>
                <input required value={cityState} onChange={(e) => setCityState(e.target.value)} className={inputClass} placeholder="Los Angeles, CA" />
              </div>
            </div>
          </div>

          {/* SECTION 2: Account Ownership Verification */}
          <div className="bg-white rounded-2xl border border-[#d0dbe8] p-6">
            <h2 className={sectionTitleClass}>Account Ownership Verification</h2>
            <p className={sectionDescClass}>Required to prevent fraud and ensure compliance.</p>
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Are you the primary account holder on all accounts you are submitting?</label>
                <div className="flex gap-3 mt-2">
                  <label className={isPrimaryHolder === "yes" ? radioActiveClass : radioClass}>
                    <input type="radio" name="primaryHolder" value="yes" checked={isPrimaryHolder === "yes"} onChange={() => setIsPrimaryHolder("yes")} className="accent-blue" />
                    <span className="text-sm text-slate-700">Yes</span>
                  </label>
                  <label className={isPrimaryHolder === "no" ? radioActiveClass : radioClass}>
                    <input type="radio" name="primaryHolder" value="no" checked={isPrimaryHolder === "no"} onChange={() => setIsPrimaryHolder("no")} className="accent-blue" />
                    <span className="text-sm text-slate-700">No</span>
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>Are you authorized to add/remove users from these accounts?</label>
                <div className="flex gap-3 mt-2">
                  <label className={isAuthorized === "yes" ? radioActiveClass : radioClass}>
                    <input type="radio" name="authorized" value="yes" checked={isAuthorized === "yes"} onChange={() => setIsAuthorized("yes")} className="accent-blue" />
                    <span className="text-sm text-slate-700">Yes</span>
                  </label>
                  <label className={isAuthorized === "no" ? radioActiveClass : radioClass}>
                    <input type="radio" name="authorized" value="no" checked={isAuthorized === "no"} onChange={() => setIsAuthorized("no")} className="accent-blue" />
                    <span className="text-sm text-slate-700">No</span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input required type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Last 4 of SSN</label>
                  <input required maxLength={4} pattern="[0-9]{4}" value={ssn4} onChange={(e) => setSsn4(e.target.value.replace(/\D/g, "").slice(0, 4))} className={inputClass} placeholder="1234" />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Tradeline Details - Multiple Cards */}
          <div className="bg-white rounded-2xl border border-[#d0dbe8] p-6">
            <h2 className={sectionTitleClass}>Tradeline Details</h2>
            <p className={sectionDescClass}>Complete for each account you want to submit. Add more cards using the button below.</p>

            <div className="space-y-6">
              {cards.map((card, idx) => (
                <div key={idx} className={`space-y-4 ${idx > 0 ? "pt-6 border-t border-[#d0dbe8]" : ""}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-blue">Card {idx + 1}</h3>
                    {cards.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCard(idx)}
                        className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Bank Name</label>
                      <input required value={card.bankName} onChange={(e) => updateCard(idx, "bankName", e.target.value)} className={inputClass} placeholder="Chase, Amex, etc." />
                    </div>
                    <div>
                      <label className={labelClass}>Card Type</label>
                      <select required value={card.cardType} onChange={(e) => updateCard(idx, "cardType", e.target.value)} className={inputClass}>
                        <option value="">Select...</option>
                        <option value="Personal">Personal</option>
                        <option value="Business">Business</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Credit Limit ($)</label>
                      <input required type="number" value={card.creditLimit} onChange={(e) => updateCard(idx, "creditLimit", e.target.value)} className={inputClass} placeholder="25000" />
                    </div>
                    <div>
                      <label className={labelClass}>Current Balance ($)</label>
                      <input required type="number" value={card.currentBalance} onChange={(e) => updateCard(idx, "currentBalance", e.target.value)} className={inputClass} placeholder="2500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Date Opened (MM/YYYY)</label>
                      <input required value={card.dateOpened} onChange={(e) => updateCard(idx, "dateOpened", e.target.value)} className={inputClass} placeholder="03/2018" />
                    </div>
                    <div>
                      <label className={labelClass}>Statement Closing Date</label>
                      <input value={card.statementCloseDate} onChange={(e) => updateCard(idx, "statementCloseDate", e.target.value)} className={inputClass} placeholder="15th of each month" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Any late payments in the past 24 months?</label>
                    <div className="flex gap-3 mt-2">
                      <label className={card.latePayments === "yes" ? radioActiveClass : radioClass}>
                        <input type="radio" name={`latePayments-${idx}`} value="yes" checked={card.latePayments === "yes"} onChange={() => updateCard(idx, "latePayments", "yes")} className="accent-blue" />
                        <span className="text-sm text-slate-700">Yes</span>
                      </label>
                      <label className={card.latePayments === "no" ? radioActiveClass : radioClass}>
                        <input type="radio" name={`latePayments-${idx}`} value="no" checked={card.latePayments === "no"} onChange={() => updateCard(idx, "latePayments", "no")} className="accent-blue" />
                        <span className="text-sm text-slate-700">No</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Which bureaus does this report to?</label>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <label className={card.experian ? radioActiveClass : radioClass}>
                        <input type="checkbox" checked={card.experian} onChange={(e) => updateCard(idx, "experian", e.target.checked)} className="accent-blue" />
                        <span className="text-sm text-slate-700">Experian</span>
                      </label>
                      <label className={card.equifax ? radioActiveClass : radioClass}>
                        <input type="checkbox" checked={card.equifax} onChange={(e) => updateCard(idx, "equifax", e.target.checked)} className="accent-blue" />
                        <span className="text-sm text-slate-700">Equifax</span>
                      </label>
                      <label className={card.transunion ? radioActiveClass : radioClass}>
                        <input type="checkbox" checked={card.transunion} onChange={(e) => updateCard(idx, "transunion", e.target.checked)} className="accent-blue" />
                        <span className="text-sm text-slate-700">TransUnion</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Number of authorized user spots available</label>
                    <input required type="number" value={card.auSpots} onChange={(e) => updateCard(idx, "auSpots", e.target.value)} className={inputClass} placeholder="2" />
                  </div>

                  {/* Screenshot upload per card */}
                  <div>
                    <label className={labelClass}>Account Screenshot (Recommended)</label>
                    <p className="text-xs text-slate-500 mb-2">Show credit limit & age visible, sensitive info hidden.</p>
                    <label className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
                      card.screenshot ? "border-emerald-300 bg-emerald-50" : "border-[#d0dbe8] hover:border-blue hover:bg-blue/5"
                    }`}>
                      {card.screenshot ? (
                        <>
                          <FileCheck className="h-6 w-6 text-emerald-500 mb-1" />
                          <span className="text-xs font-medium text-emerald-700 truncate max-w-full">{card.screenshot.name}</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-6 w-6 text-slate-400 mb-1" />
                          <span className="text-xs text-slate-400">Click to upload (JPG, PNG, or PDF)</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => updateCard(idx, "screenshot", e.target.files?.[0] ?? null)}
                      />
                    </label>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addCard}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-[#d0dbe8] text-slate-500 hover:border-blue hover:text-blue transition-colors text-sm font-medium"
              >
                <Plus className="h-4 w-4" />
                Add Another Card
              </button>
            </div>
          </div>

          {/* SECTION 4: Account Quality Check */}
          <div className="bg-white rounded-2xl border border-[#d0dbe8] p-6">
            <h2 className={sectionTitleClass}>Account Quality Check</h2>
            <p className={sectionDescClass}>We only accept high-quality tradelines.</p>
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Do you maintain utilization under 7%?</label>
                <div className="flex gap-3 mt-2">
                  <label className={utilizationUnder7 === "yes" ? radioActiveClass : radioClass}>
                    <input type="radio" name="utilization" value="yes" checked={utilizationUnder7 === "yes"} onChange={() => setUtilizationUnder7("yes")} className="accent-blue" />
                    <span className="text-sm text-slate-700">Yes</span>
                  </label>
                  <label className={utilizationUnder7 === "no" ? radioActiveClass : radioClass}>
                    <input type="radio" name="utilization" value="no" checked={utilizationUnder7 === "no"} onChange={() => setUtilizationUnder7("no")} className="accent-blue" />
                    <span className="text-sm text-slate-700">No</span>
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>Have any accounts been closed, restricted, or flagged recently?</label>
                <div className="flex gap-3 mt-2">
                  <label className={accountIssues === "yes" ? radioActiveClass : radioClass}>
                    <input type="radio" name="accountIssues" value="yes" checked={accountIssues === "yes"} onChange={() => setAccountIssues("yes")} className="accent-blue" />
                    <span className="text-sm text-slate-700">Yes</span>
                  </label>
                  <label className={accountIssues === "no" ? radioActiveClass : radioClass}>
                    <input type="radio" name="accountIssues" value="no" checked={accountIssues === "no"} onChange={() => setAccountIssues("no")} className="accent-blue" />
                    <span className="text-sm text-slate-700">No</span>
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>Have you ever sold tradelines before?</label>
                <div className="flex gap-3 mt-2">
                  <label className={soldBefore === "yes" ? radioActiveClass : radioClass}>
                    <input type="radio" name="soldBefore" value="yes" checked={soldBefore === "yes"} onChange={() => setSoldBefore("yes")} className="accent-blue" />
                    <span className="text-sm text-slate-700">Yes</span>
                  </label>
                  <label className={soldBefore === "no" ? radioActiveClass : radioClass}>
                    <input type="radio" name="soldBefore" value="no" checked={soldBefore === "no"} onChange={() => setSoldBefore("no")} className="accent-blue" />
                    <span className="text-sm text-slate-700">No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: Pricing & Availability */}
          <div className="bg-white rounded-2xl border border-[#d0dbe8] p-6">
            <h2 className={sectionTitleClass}>Pricing & Availability</h2>
            <p className={sectionDescClass}>Help us understand your expectations and availability.</p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Desired price per authorized user spot ($)</label>
                  <input type="number" value={desiredPrice} onChange={(e) => setDesiredPrice(e.target.value)} className={inputClass} placeholder="500" />
                </div>
                <div>
                  <label className={labelClass}>How many users can you add per cycle?</label>
                  <input type="number" value={usersPerCycle} onChange={(e) => setUsersPerCycle(e.target.value)} className={inputClass} placeholder="2" />
                </div>
              </div>
              <div>
                <label className={labelClass}>How quickly can you add a user after assignment?</label>
                <select value={turnaroundTime} onChange={(e) => setTurnaroundTime(e.target.value)} className={inputClass}>
                  <option value="">Select...</option>
                  <option value="24 hours">24 hours</option>
                  <option value="48 hours">48 hours</option>
                  <option value="72 hours">72 hours</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="p-4 rounded-xl bg-blue/5 border border-blue/20">
                <p className="text-sm text-slate-700">
                  <strong>Note:</strong> All tradelines customers stay on for at least 60 days.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 6: Agreement */}
          <div className="bg-white rounded-2xl border border-[#d0dbe8] p-6">
            <h2 className={sectionTitleClass}>Agreement</h2>
            <p className={sectionDescClass}>Please read and confirm before submitting.</p>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="accent-blue mt-1 h-4 w-4"
              />
              <span className="text-sm text-slate-700 leading-relaxed">
                I confirm that: I am the primary account holder. All information provided is accurate.
                I agree to add and remove authorized users as assigned. I understand that all customers
                will remain on the account for a minimum of 60 days. I understand failure to perform
                may result in removal from the platform. I understand approval is not guaranteed.
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || !agreedToTerms}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan to-blue hover:opacity-90 text-white font-bold text-lg transition-all disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit for Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
