"use client";

import { useState } from "react";
import { MapPinIcon , ClockIcon } from "@heroicons/react/24/solid";
import { MOCK_PENGAJUAN, LAYANAN_TABS_SHORT } from "@/lib/adminTypes";
import { supabase } from "@/lib/supabase";
import { getSKTMData } from "@/lib/pdf/getSKTMData";
import { generateSKTMPDF } from "@/lib/pdf/generateSKTM";

import { getSKUData } from "@/lib/pdf/getSKUData";
import { generateSKUPDF } from "@/lib/pdf/generateSKU";


export default function StatusPage() {
  const [nomor, setNomor] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<{
    nama: string;
    nomorPengajuan: string;
    tanggalPengajuan: string;
    jenisLayanan: string;
    status: string;
    catatanRevisi: string;
    tempatPengambilan: string;
    jamPengambilan: string;
    kontak: string;
  } | null>(null);

  const normalizeNomor = (value: string) =>
    value.trim().toUpperCase().replace(/\s+/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const submitted = normalizeNomor(nomor);

  if (!submitted) {
    setError("Masukkan nomor pengajuan terlebih dahulu.");
    setData(null);
    return;
  }

  const { data: found, error } = await supabase
    .from("pengajuan_surat")
    .select("*")
    .eq("nomor_pengajuan", submitted)
    .single();

  if (error || !found) {
    setError("Nomor pengajuan tidak ditemukan. Periksa kembali nomor Anda.");
    setData(null);
    return;
  }

  setError("");

  const statusMap: any = {
    Menunggu: "Menunggu Persetujuan",
    Disetujui: "Disetujui",
    Ditolak: "Ditolak",
  };

  setData({
    nama: found.nama_warga,
    nomorPengajuan: found.nomor_pengajuan,
    tanggalPengajuan: new Date(found.tanggal_pengajuan).toLocaleDateString("id-ID"),
    jenisLayanan: found.jenis_surat,
    status: statusMap[found.status] || found.status,
    catatanRevisi: found.catatan_revisi || "-",
    tempatPengambilan: "Kantor Desa Dradah Blumbang",
    jamPengambilan: "09:00 - 15:00 WIB",
    kontak: "pemerintahdesadradahblumbang@gmail.com",
  });
};

    
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <nav className="text-xs text-gray-400 mb-5">
        <span>Beranda</span>
        <span className="mx-1">&gt;</span>
        <span>Administrasi</span>
        <span className="mx-1">&gt;</span>
        <span className="text-green-700 font-semibold">Cek Status</span>
      </nav>

      <h1 className="text-2xl font-bold text-center text-green-800 mb-2">
        Cek Status Pengajuan Administrasi
      </h1>
      <p className="text-sm text-gray-600 text-justify leading-relaxed mb-4">
        Masukkan nomor pengajuan Anda untuk melihat status proses, catatan revisi, dan informasi pengambilan dokumen.

      </p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-green-700">Masukkan Nomor Pengajuan</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-green-700 mb-1">
                Nomor Pengajuan
              </label>
              <input
                type="text"
                value={nomor}
                onChange={(event) => setNomor(event.target.value)}
                placeholder="Contoh: 001"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:border-green-400 focus:ring-1 focus:ring-green-400"
              />
            </div>

            {error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-full bg-[#FFA726] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#fb8c00]"
            >
              Cek Status
            </button>
          </form>

          <div className="mt-8 rounded-2xl bg-amber-50 p-5 text-sm text-gray-700">
            <p className="font-semibold text-green-700 mb-2">Petunjuk</p>
            <p className="leading-relaxed">
              Pastikan nomor pengajuan diisi sama seperti yang diberikan oleh sistem saat Anda mengajukan.
              Jika nomor tidak ditemukan, silakan cek kembali nomor pengajuan atau hubungi admin desa.
            </p>
          </div>
        </div>

      {data ? (
        <div className="mt-10 rounded-3xl border border-green-100 bg-white p-8 shadow-sm">
          <h2 className="text-sm font-bold text-green-700 mb-4">Informasi Detail Pengajuan</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#F7FAF2] p-5 border border-green-100">
              <p className="text-xs font-semibold text-green-700 mb-1">Nama</p>
              <p className="text-sm text-gray-700">{data.nama}</p>
            </div>
            <div className="rounded-2xl bg-[#F7FAF2] p-5 border border-green-100">
              <p className="text-xs font-semibold text-green-700 mb-1">Nomor Pengajuan</p>
              <p className="text-sm text-gray-700">{data.nomorPengajuan}</p>
            </div>
            <div className="rounded-2xl bg-[#F7FAF2] p-5 border border-green-100">
              <p className="text-xs font-semibold text-green-700 mb-1">Tanggal Pengajuan</p>
              <p className="text-sm text-gray-700">{data.tanggalPengajuan}</p>
            </div>
            <div className="rounded-2xl bg-[#F7FAF2] p-5 border border-green-100">
              <p className="text-xs font-semibold text-green-700 mb-1">Status</p>
              <p className="text-sm text-gray-700">{data.status}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-[#FEF7E1] p-5 border border-amber-200">
            <p className="text-xs font-semibold text-green-700 mb-1">Catatan Revisi</p>
            <p className="mt-2 text-sm text-gray-700">{data.catatanRevisi}</p>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={async () => {
  try {
    if (!data) {
      alert("Data belum tersedia");
      return;
    }

    // ambil data mentah dari DB (biar konsisten)
    const { data: pengajuan } = await supabase
      .from("pengajuan_surat")
      .select("*")
      .eq("nomor_pengajuan", data.nomorPengajuan)
      .single();

    if (!pengajuan) {
      alert("Data tidak ditemukan di database");
      return;
    }

    switch (pengajuan.jenis_surat) {
      case "sktm": {
        const detail = await supabase
          .from("sktm")
          .select("*")
          .eq("pengajuan_id", pengajuan.id)
          .single();

        const pdfBytes = await generateSKTMPDF({
          nama: detail.data.nama,
          nik: detail.data.nik,
          jenisKelamin: detail.data.jenis_kelamin,
          tempatTanggalLahir: `${detail.data.tempat_lahir}, ${detail.data.tanggal_lahir}`,
          alamat: detail.data.alamat,
          keperluan: detail.data.keperluan,
        });

        const blob = new Blob([new Uint8Array(pdfBytes)], {
          type: "application/pdf",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = `${pengajuan.nomor_pengajuan}.pdf`;

        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(url);

        break;
      }

      case "sku": {
        const detail = await supabase
          .from("sku")
          .select("*")
          .eq("pengajuan_id", pengajuan.id)
          .single();

        const pdfBytes = await generateSKUPDF({
          nama: detail.data.nama,
          nik: detail.data.nik,
          jenisKelamin: detail.data.jenis_kelamin,
          tempatTanggalLahir: `${detail.data.tempat_lahir}, ${detail.data.tanggal_lahir}`,
          agama: detail.data.agama,
          alamat: detail.data.alamat,
          bidang_usaha: detail.data.bidang_usaha,
        });

        const blob = new Blob([new Uint8Array(pdfBytes)], {
          type: "application/pdf",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = `${pengajuan.nomor_pengajuan}.pdf`;

        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(url);

        break;
      }

      default:
        alert("PDF untuk jenis surat ini belum tersedia");
    }
  } catch (err) {
    console.error(err);
    alert("Gagal generate PDF");
  }
}}
              className="inline-flex items-center justify-center rounded-full bg-[#FFA726] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#fb8c00]"
            >
              Download PDF
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400 mb-3">Informasi Pengambilan</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shrink-0">
                  <ClockIcon className="w-2.5 h-2.5 text-white" />
                </span>
                Waktu= 08:00 - 12:00 WIB
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shrink-0">
                  <MapPinIcon  className="w-2.5 h-2.5 text-white" />
                </span>
                Tempat= Kantor Desa Dradah Blumbang
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
