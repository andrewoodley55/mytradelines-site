"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is a tradeline?",
    answer:
      "A tradeline is any account that appears on your credit report. When you're added as an authorized user (AU) on someone else's credit card, that card's history — including its age, credit limit, and payment record — appears on your credit report, potentially boosting your score.",
  },
  {
    question: "Is buying tradelines legal?",
    answer:
      "Yes. Adding authorized users to credit cards is a standard banking practice. There is no law against being added as an authorized user on another person's account. Banks allow it, and credit bureaus report it.",
  },
  {
    question: "How much will my credit score increase?",
    answer:
      "Results vary depending on your current credit profile, but most buyers see an increase of 50–100+ points within one to two billing cycles. The older the tradeline and the higher the credit limit, the greater the potential impact.",
  },
  {
    question: "How long does a tradeline stay on my credit report?",
    answer:
      "Tradelines remain on your credit report for 60 days or two billing cycles. After removal, the positive history may continue to benefit your report for some time, though results vary.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Absolutely. We only share the minimum information required to add you as an authorized user (name and SSN). Your data is never shared with third parties.",
  },
  {
    question: "How do I get paid as a seller?",
    answer:
      "Sellers are paid via Zelle or ACH after the authorized user has been successfully added and the tradeline posts to the buyer's credit report. Payouts typically arrive within a few business days of posting confirmation.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Zelle and ACH. Payment is due before the tradeline is added. Once we confirm receipt, we proceed with adding you as an authorized user.",
  },
  {
    question: "What if the tradeline doesn't post?",
    answer:
      "We offer a posting guarantee. If a tradeline fails to appear on your credit report, we'll either replace it with an equivalent tradeline or issue a full refund — your choice.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-8 sm:py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-blue text-sm font-semibold uppercase tracking-wider mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Common Questions
          </h2>
          <p className="mt-4 text-slate-600">
            Everything you need to know about buying and selling tradelines.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-navy-border bg-navy-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-slate-900 font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
