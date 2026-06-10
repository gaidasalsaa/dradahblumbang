"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect} from "react";

import {
  CheckIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  PlusIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

export default function SuksesPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const idPengajuan = searchParams.get("id");
  const jenisSurat = searchParams.get("jenis");

  const [nomorPengajuan, setNomorPengajuan] = useState("");
  const [tanggalPengajuan, setTanggalPengajuan] = useState("");
  const [jenisDokumen, setJenisDokumen] = useState("");
  const [status, setStatus] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!idPengajuan) return;

    // Fetch initial data
    const fetchPengajuan = async () => {
      try {
        const { data, error } = await supabase
          .from("pengajuan_surat")
          .select("*")
          .eq("id", idPengajuan)
          .single();

        if (error) {
          console.error("Fetch error:", error);
          return;
        }

        setNomorPengajuan(data.nomor_pengajuan);
        setJenisDokumen(data.jenis_surat);
        setStatus(data.status);
        setIsApproved(data.status === "Disetujui");
        setFileUrl(data.file_url ?? null)
        setTanggalPengajuan(
          new Date(data.tanggal_pengajuan).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        );
      } catch (e) {
        console.error("Fetch error:", e);
      }
    };

    fetchPengajuan();

    // Aggressive polling every 1 second while waiting for approval
    const pollInterval = setInterval(async () => {
      try {
        const { data } = await supabase
          .from("pengajuan_surat")
          .select('status, file_url')
          .eq("id", idPengajuan)
          .single();

        if (data?.status) {
          console.log("Poll detected status:", data.status);
          setStatus(data.status);
          setIsApproved(data.status === "Disetujui");
          setFileUrl(data.file_url ?? null) 
        }
      } catch (e) {
        console.error("Poll error:", e);
      }
    }, 1000);

    return () => {
      clearInterval(pollInterval);
    };
  }, [idPengajuan]);

  const handleDownload = async () => {
  try {
    setIsDownloading(true)

    if (!idPengajuan) {
      alert("ID pengajuan tidak ditemukan")
      return
    }

    // Pakai file_url dari Storage kalau sudah ada
    if (fileUrl) {
      const a = document.createElement('a')
      a.href = fileUrl
      a.download = `${nomorPengajuan}.pdf`
      a.target = '_blank'
      document.body.appendChild(a)
      a.click()
      a.remove()
      return
    }

    alert('PDF belum tersedia, tunggu persetujuan admin.')
  } catch (error) {
    console.error(error)
    alert('Gagal download PDF')
  } finally {
    setIsDownloading(false)
  }
}
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full text-center">

        {/* Icon Centang */}
        <div className="flex items-center justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-green-400 flex items-center justify-center">
            <CheckIcon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Judul */}
        <h1 className="text-2xl font-bold text-green-800 mb-2">
          Pengajuan Berhasil Terkirim
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed mb-7">
          Permohonan Anda telah kami terima dan
          <br />
          sedang diproses.
        </p>

        {/* Info Box */}
        <div className="bg-amber-50 rounded-xl p-5 text-left mb-7">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Nomor Pengajuan</p>
              <p className="text-sm font-bold text-green-700">
                {nomorPengajuan}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Tanggal Pengajuan</p>
              <p className="text-sm font-bold text-green-700">
                {tanggalPengajuan}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Jenis Dokumen</p>
              <p className="text-sm font-bold text-green-700">{jenisDokumen}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Status</p>
              <p className={`text-sm font-bold ${
                isApproved ? "text-green-700" : "text-amber-600"
              }`}>
                {status || "Memuat..."}
              </p>
            </div>
          </div>
        </div>

        {/* Tombol Download PDF */}
        <button
          onClick={handleDownload}
          disabled={!isApproved || isDownloading}
          className={`w-full rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 mb-3 transition-colors shadow-sm ${
            isApproved && !isDownloading
              ? "bg-amber-400 hover:bg-amber-500 text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          {isDownloading ? "Membuat PDF..." : !isApproved ? "Menunggu Persetujuan Admin" : "Download PDF"}
        </button>

        {/* Tombol Cek Status */}
        <button
          onClick={() => router.push(`/administrasi/status?nomor=${nomorPengajuan}`)}
          className="w-full bg-white border-2 border-amber-400 text-amber-500 hover:bg-amber-50 rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 mb-5 transition-colors"
        >
          <MagnifyingGlassIcon className="w-4 h-4" />
          Cek Status Pengajuan
        </button>

        {/* Nav Links */}
        <div className="flex justify-between items-center border-t border-b border-gray-100 py-4 mb-5">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeftIcon className="w-3 h-3" />
            Kembali ke Beranda
          </button>
          <button
            onClick={() => router.push("/#administrasi")}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <PlusIcon className="w-3 h-3" />
            Pengajuan Baru
          </button>
        </div>

        {/* Bantuan */}
        <p className="text-xs text-gray-400 mb-3">Butuh bantuan?</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
              <PhoneIcon className="w-2.5 h-2.5 text-white" />
            </span>
            (0341) 123-4567
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
              <ClockIcon className="w-2.5 h-2.5 text-white" />
            </span>
            08:00 - 12:00 WIB
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
              <EnvelopeIcon className="w-2.5 h-2.5 text-white" />
            </span>
            pemerintahdesadradahblumbang@gmail.com
          </div>
        </div>

      </div>
    </div>
  );
}