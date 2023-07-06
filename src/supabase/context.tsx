"use client";

import { createContext, useContext } from "react";

import { SupabaseClient } from "@supabase/supabase-js";

import { supabase } from "./client";

export const SupabaseContext = createContext<SupabaseClient | null>(null);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
);

export const useSupabase = () => {
	const supabase = useContext(SupabaseContext);
	if (supabase === null) {
		throw new Error("useSupabase must be used within a SupabaseProvider");
	}
	return supabase;
};
