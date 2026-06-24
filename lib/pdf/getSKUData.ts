// lib/data/getSKUData.ts
import { supabase } from "@/lib/supabase";

export async function getSKUData(pengajuanId: string) {
  const { data, error } = await supabase
    .from("sku")
    .select("*")
    .eq("pengajuan_id", pengajuanId)
    .single();

  if (error) throw error;

  return {
    nama:                data.nama                 ?? "",
    nik:                 data.nik                  ?? "",
    jenisKelamin:        data.jenis_kelamin         ?? "",
    tempatLahir:         data.tempat_lahir          ?? "",
    tanggalLahir:        data.tanggal_lahir         ?? "",
    agama:               data.agama                 ?? "",
    alamat:              data.alamat                ?? "",
    bidang_usaha:        data.bidang_usaha          ?? "",
    tanggal:             data.tanggal               ?? "",
  };
}