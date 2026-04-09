"use client";
import React, { useContext, createContext, useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchProfile = async (userId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("avatar, fullname")
      .eq("id", userId)
      .single();
    if (error) {
      console.error(`Failed to fetch profile ${error}`);
      return;
    }
    setProfile(data ?? null);
  };

  useEffect(() => {
    const supabase = createClient();

    // Initialize session from cookies/localStorage
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
