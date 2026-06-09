// lib/pdf/getSKUData.ts
import { supabase } from "@/lib/supabase";

export async function getSKUData(pengajuanId: string) {
  const { data, error } = await supabase
    .from("sku")
    .select("*")
    .eq("pengajuan_id", pengajuanId)
    .single();

  if (error) throw error;
  return data;
}