"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, CreditCard } from "lucide-react";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#tradelines", label: "Tradelines" },
  { href: "#why-us", label: "Why Us" },
  { href: "#sell", label: "Sell Yours" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-xl border-b border-navy-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <CreditCard className="h-7 w-7 text-blue" />
            <span className="text-xl font-bold text-white">
              My<span className="text-blue">Tradelines</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#tradelines"
              className="px-5 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-navy-border">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-slate-400 hover:text-white transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#tradelines"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors text-center"
              >
                Get Started
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
