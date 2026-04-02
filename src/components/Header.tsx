"use client";

import { useState, useEffect } from "react";
import { Menu, X, CreditCard } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#tradelines", label: "Tradelines" },
  { href: "#why-us", label: "Why Us" },
  { href: "#sell", label: "Sell Yours" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setLoggedIn(true);
    });
  }, []);

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid #d0dbe8" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <CreditCard className="h-7 w-7 text-blue" />
            <span className="text-xl font-bold text-slate-900">
              My<span className="text-blue">Tradelines</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {loggedIn ? (
              <a
                href="/portal/dashboard"
                className="px-5 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors"
              >
                Dashboard
              </a>
            ) : (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Log In
                </a>
                <a
                  href="/signup"
                  className="px-5 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-[#d0dbe8]">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              {loggedIn ? (
                <a
                  href="/portal/dashboard"
                  className="mt-2 px-5 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors text-center"
                >
                  Dashboard
                </a>
              ) : (
                <>
                  <a
                    href="/login"
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2"
                  >
                    Log In
                  </a>
                  <a
                    href="/signup"
                    className="mt-2 px-5 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors text-center"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
