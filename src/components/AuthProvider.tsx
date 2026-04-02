"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

// Admin emails — add more as needed
const ADMIN_EMAILS = ["andrewoodley@gmail.com"];

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAdmin: false,
  loading: true,
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    const loadUser = async (authUser: User | null) => {
      if (!authUser) {
        if (mounted) {
          setUser(null);
          setProfile(null);
          setLoading(false);
        }
        return;
      }

      if (mounted) {
        setUser(authUser);

        // Build profile from auth user data + email-based admin check
        const isAdmin = ADMIN_EMAILS.includes(authUser.email ?? "");
        setProfile({
          id: authUser.id,
          email: authUser.email ?? "",
          full_name: authUser.user_metadata?.full_name ?? null,
          phone: authUser.user_metadata?.phone ?? null,
          role: isAdmin ? "admin" : "customer",
        });

        // Also try to fetch from DB in background (non-blocking)
        supabase
          .from("profiles")
          .select("id, email, full_name, phone, role")
          .eq("id", authUser.id)
          .single()
          .then(({ data }) => {
            if (mounted && data) {
              setProfile(data);
            }
          });

        setLoading(false);
      }
    };

    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      loadUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        loadUser(session?.user ?? null);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, isAdmin: profile?.role === "admin", loading, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
