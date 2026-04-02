"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, AuthProvider } from "@/components/AuthProvider";
import {
  LayoutDashboard,
  CreditCard,
  ShoppingCart,
  Users,
  ArrowLeft,
  HandCoins,
  MessageSquare,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/tradelines", label: "Tradelines", icon: CreditCard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/sellers", label: "Sellers", icon: HandCoins },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

function AdminInner({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-600 mb-4">You don&apos;t have admin privileges.</p>
          <a href="/" className="text-blue hover:underline">Go home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex">
      <aside className="w-64 bg-white border-r border-[#d0dbe8] flex flex-col shrink-0">
        <div className="p-5 border-b border-[#d0dbe8]">
          <a href="/" className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue" />
            <span className="text-lg font-bold text-slate-900">Admin Panel</span>
          </a>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
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
        </nav>
        <div className="p-3 border-t border-[#d0dbe8]">
          <a
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </a>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminInner>{children}</AdminInner>
    </AuthProvider>
  );
}
