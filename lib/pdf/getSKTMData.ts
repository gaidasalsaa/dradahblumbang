// lib/pdf/getSKTMData.ts
import { supabase } from "@/lib/supabase";

export async function getSKTMData(pengajuanId: string) {
  const { data, error } = await supabase
    .from("sktm")
    .select("*")
    .eq("pengajuan_id", pengajuanId) 
    .single();

  if (error) throw error;
  return data;
}