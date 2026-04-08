"use server";
import { createClient } from "./supabase/server";

export const fetchHomeListingsAction = async (): Promise<Listing[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("listings").select("*");

  if (error) throw error;

  return data;
};
