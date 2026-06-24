// lib/data/getDomisiliData.ts
import { supabase } from "@/lib/supabase";

export async function getDomisiliData(pengajuanId: string) {
  const { data, error } = await supabase
    .from("domisili")
    .select("*")
    .eq("pengajuan_id", pengajuanId)
    .single();

  if (error) throw error;

  return {
    nama:                data.nama                 ?? "",
    nik:                 data.nik                  ?? "",
    tempatLahir:         data.tempat_lahir          ?? "",
    tanggalLahir:        data.tanggal_lahir         ?? "",
    jenisKelamin:        data.jenis_kelamin         ?? "",
    agama:               data.agama                 ?? "",
    pekerjaan:           data.pekerjaan             ?? "",
    alamat:              data.alamat                ?? "",
    rt:                  data.rt                   ?? "",
    rw:                  data.rw                   ?? "",
    dusun:               data.dusun                ?? "",
    keperluan:           data.keperluan             ?? "",
    tanggal:             data.tanggal               ?? "",
  };
}