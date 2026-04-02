"use client";

import { useState } from "react";
import { Menu, X, CreditCard, LogOut } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#tradelines", label: "Tradelines" },
  { href: "#why-us", label: "Why Us" },
  { href: "#sell", label: "Sell Yours" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAdmin, loading, signOut } = useAuth();

  const goTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-navy-border">
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
            {loading ? (
              <>
                <button
                  onClick={() => goTo("/login")}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => goTo("/signup")}
                  className="px-5 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors"
                >
                  Sign Up
                </button>
              </>
            ) : user ? (
              <>
                {isAdmin && (
                  <button
                    onClick={() => goTo("/admin")}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Admin
                  </button>
                )}
                <button
                  onClick={() => goTo("/portal/dashboard")}
                  className="px-5 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={signOut}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => goTo("/login")}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => goTo("/signup")}
                  className="px-5 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors"
                >
                  Sign Up
                </button>
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
          <div className="md:hidden py-4 border-t border-navy-border">
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
              {loading ? (
                <>
                  <button onClick={() => goTo("/login")} className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2 text-left">
                    Log In
                  </button>
                  <button onClick={() => goTo("/signup")} className="mt-2 px-5 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors text-center">
                    Sign Up
                  </button>
                </>
              ) : user ? (
                <>
                  {isAdmin && (
                    <button onClick={() => { goTo("/admin"); setMobileOpen(false); }} className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2 text-left">
                      Admin Panel
                    </button>
                  )}
                  <button onClick={() => { goTo("/portal/dashboard"); setMobileOpen(false); }} className="mt-2 px-5 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors text-center">
                    Dashboard
                  </button>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2 text-left">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => goTo("/login")} className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2 text-left">
                    Log In
                  </button>
                  <button onClick={() => goTo("/signup")} className="mt-2 px-5 py-2.5 rounded-lg bg-blue hover:bg-blue-dark text-white text-sm font-semibold transition-colors text-center">
                    Sign Up
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
