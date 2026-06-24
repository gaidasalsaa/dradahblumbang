"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  CheckIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  PlusIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";

export default function SuksesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idPengajuan = searchParams.get("id");

  const [nomorPengajuan, setNomorPengajuan] = useState("");
  const [tanggalPengajuan, setTanggalPengajuan] = useState("");
  const [jenisDokumen, setJenisDokumen] = useState("");
  const [status, setStatus] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!idPengajuan) return;

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
        setFileUrl(data.file_url ?? null);
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

    const pollInterval = setInterval(async () => {
      try {
        const { data } = await supabase
          .from("pengajuan_surat")
          .select("status, file_url")
          .eq("id", idPengajuan)
          .single();

        if (data?.status) {
          setStatus(data.status);
          setFileUrl(data.file_url ?? null);
        }
      } catch (e) {
        console.error("Poll error:", e);
      }
    }, 1000);

    return () => clearInterval(pollInterval);
  }, [idPengajuan]);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      if (!idPengajuan) {
        alert("ID pengajuan tidak ditemukan");
        return;
      }

      if (fileUrl) {
        const a = document.createElement("a");
        a.href = fileUrl;
        a.download = `${nomorPengajuan}.pdf`;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        a.remove();
        return;
      }

      const { data, error } = await supabase
        .from("pengajuan_surat")
        .select("*")
        .eq("id", idPengajuan)
        .single();

      if (error || !data) {
        alert("Gagal mengambil data pengajuan.");
        return;
      }

      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        alert("Popup diblokir browser. Izinkan popup untuk mengunduh PDF.");
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Surat Keterangan - ${nomorPengajuan}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; color: #111; }
              h2 { text-align: center; margin-bottom: 4px; }
              p.center { text-align: center; margin-bottom: 24px; }
              table { width: 100%; border-collapse: collapse; margin-top: 16px; }
              td { padding: 6px 8px; font-size: 14px; vertical-align: top; }
              td:first-child { width: 200px; font-weight: bold; }
              .divider { border-top: 1px solid #ccc; margin: 24px 0; }
              .footer { margin-top: 48px; text-align: right; }
            </style>
          </head>
          <body>
            <h2>TANDA TERIMA PENGAJUAN SURAT</h2>
            <p class="center">Desa Dradah Blumbang</p>
            <div class="divider"></div>
            <table>
              <tr><td>Nomor Pengajuan</td><td>: ${data.nomor_pengajuan}</td></tr>
              <tr><td>Nama Warga</td><td>: ${data.nama_warga}</td></tr>
              <tr><td>NIK</td><td>: ${data.nik}</td></tr>
              <tr><td>Jenis Surat</td><td>: ${data.jenis_surat}</td></tr>
              <tr><td>Status</td><td>: ${data.status}</td></tr>
              <tr><td>Tanggal Pengajuan</td><td>: ${new Date(data.tanggal_pengajuan).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</td></tr>
            </table>
            <div class="divider"></div>
            <p style="font-size:13px; color:#555;">
              Simpan dokumen ini sebagai bukti pengajuan. Surat resmi akan diterbitkan setelah diverifikasi oleh admin desa.
            </p>
            <div class="footer">
              <p style="font-size:13px;">Dradah Blumbang, ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
              <p style="font-size:13px;">Petugas Administrasi Desa</p>
              <br/><br/>
              <p style="font-size:13px;">(__________________________)</p>
            </div>
            <script>window.onload = () => { window.print(); }</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (error) {
      console.error(error);
      alert("Gagal mengunduh dokumen.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyNomor = async () => {
    try {
      await navigator.clipboard.writeText(nomorPengajuan);
      alert(`Nomor pengajuan berhasil disalin:\n${nomorPengajuan}`);
    } catch (error) {
      console.error(error);
      alert("Gagal menyalin nomor pengajuan");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full text-center">

        <div className="flex items-center justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-green-400 flex items-center justify-center">
            <CheckIcon className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-green-800 mb-2">
          Pengajuan Berhasil Terkirim
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed mb-7">
          Permohonan Anda telah kami terima dan
          <br />
          sedang diproses.
        </p>

        <div className="bg-amber-50 rounded-xl p-5 text-left mb-7">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Nomor Pengajuan</p>
              <p className="text-sm font-bold text-green-700">{nomorPengajuan}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Tanggal Pengajuan</p>
              <p className="text-sm font-bold text-green-700">{tanggalPengajuan}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Jenis Dokumen</p>
              <p className="text-sm font-bold text-green-700">{jenisDokumen}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Status</p>
              <p className="text-sm font-bold text-amber-600">
                {status || "Memuat..."}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm font-semibold text-red-800 mb-2">
            ⚠️ Simpan Nomor Pengajuan Anda
          </p>
          <p className="text-xs text-red-700 leading-relaxed mb-2">
            Nomor pengajuan digunakan untuk memeriksa status surat dan
            mengunduh dokumen.
          </p>
          <button
            onClick={handleCopyNomor}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-2 rounded-md transition-colors"
          >
            <ClipboardDocumentIcon className="w-4 h-4" />
            Salin Nomor Pengajuan
          </button>
        </div>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`w-full rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 mb-3 transition-colors shadow-sm ${
            !isDownloading
              ? "bg-amber-400 hover:bg-amber-500 text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          {isDownloading ? "Memproses..." : "Download Tanda Terima"}
        </button>

        <button
          onClick={() => router.push(`/administrasi/status?nomor=${nomorPengajuan}`)}
          className="w-full bg-white border-2 border-amber-400 text-amber-500 hover:bg-amber-50 rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 mb-5 transition-colors"
        >
          <MagnifyingGlassIcon className="w-4 h-4" />
          Cek Status Pengajuan
        </button>

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