"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, AuthProvider } from "@/components/AuthProvider";
import { useState } from "react";
import {
  LayoutDashboard,
  CreditCard,
  ShoppingCart,
  User,
  ArrowLeft,
  LogOut,
  Shield,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/tradelines", label: "Browse Tradelines", icon: CreditCard },
  { href: "/portal/orders", label: "My Orders", icon: ShoppingCart },
  { href: "/portal/profile", label: "Profile", icon: User },
];

function PortalInner({ children }: { children: React.ReactNode }) {
  const { user, profile, isAdmin, loading, signOut } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Please sign in</h1>
          <a href="/login" className="text-blue hover:underline">Go to login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex">
      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-[#d0dbe8] flex items-center justify-between px-4 py-3 md:hidden">
        <a href="/" className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue" />
          <span className="text-lg font-bold text-slate-900">MyTradelines</span>
        </a>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 text-slate-600">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-[#d0dbe8] flex flex-col shrink-0 transform transition-transform duration-200 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-[#d0dbe8] hidden md:block">
          <a href="/" className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue" />
            <span className="text-lg font-bold text-slate-900">MyTradelines</span>
          </a>
          {profile?.full_name && (
            <p className="text-sm text-slate-500 mt-2">Hi, {profile.full_name}</p>
          )}
        </div>
        <div className="p-5 border-b border-[#d0dbe8] md:hidden pt-16">
          {profile?.full_name && (
            <p className="text-sm text-slate-500">Hi, {profile.full_name}</p>
          )}
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue text-white"
                    : "text-slate-600 hover:bg-[#f0f4f8] hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          {isAdmin && (
            <a
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-[#f0f4f8] hover:text-slate-900 transition-colors mt-3 border-t border-[#d0dbe8] pt-3"
            >
              <Shield className="h-4 w-4" />
              Admin Panel
            </a>
          )}
        </nav>
        <div className="p-3 border-t border-[#d0dbe8] space-y-1">
          <a
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </a>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-slate-700 w-full"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-auto pt-16 md:pt-8">{children}</main>
    </div>
  );
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PortalInner>{children}</PortalInner>
    </AuthProvider>
  );
}
