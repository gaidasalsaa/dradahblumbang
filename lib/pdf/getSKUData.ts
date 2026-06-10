// lib/pdf/getSKUData.ts
import { supabase } from "@/lib/supabase";

export async function getSKUData(pengajuanId: string) {
  console.log('[getSKUData] mencari pengajuan_id:', pengajuanId) 
  const { data, error } = await supabase
    .from("sku")
    .select("*")
    .eq("pengajuan_id", pengajuanId)
    .single();

   console.log('[getSKUData] result:', data, 'error:', error)

  if (error) throw error;
  return data;
}