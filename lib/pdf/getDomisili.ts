import { supabase } from "@/lib/supabase";

export async function getDomisiliData(
  id: string
) {
  const { data, error } = await supabase
    .from("domisili")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}