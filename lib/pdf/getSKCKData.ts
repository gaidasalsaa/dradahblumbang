// lib/data/getSKCKData.ts
import { supabase } from "@/lib/supabase";

export async function getSKCKData(pengajuanId: string) {
  const { data, error } = await supabase
    .from("skck")
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
    pekerjaan:           data.pekerjaan             ?? "",
    alamat:              data.alamat                ?? "",
    keperluan:           data.keperluan             ?? "",
    tanggal:             data.tanggal               ?? "",
  };
}