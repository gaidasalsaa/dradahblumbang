// components/administrasi/sukses/page.tsx

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { generateSKTMPDF } from "@/lib/pdf/generateSKTM";
import { getSKTMData } from "@/lib/pdf/getSKTMData";
import { getSKUData } from "@/lib/pdf/getSKUData";
import { generateSKUPDF } from "@/lib/pdf/generateSKU";

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
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    const fetchPengajuan = async () => {
      if (!idPengajuan) return;

      const { data, error } = await supabase
        .from("pengajuan_surat")
        .select("*")
        .eq("id", idPengajuan)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setNomorPengajuan(data.nomor_pengajuan);
      setJenisDokumen(data.jenis_surat);
      setTanggalPengajuan(
        new Date(data.tanggal_pengajuan).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );

      setIsDataReady(true); 
    };

    fetchPengajuan();
  }, [idPengajuan]);

  const handleDownload = async () => {
    try {
      if (!idPengajuan) {
        alert("ID pengajuan tidak ditemukan");
        return;
      }

      switch (jenisSurat) {
        case "sktm": {
          const data = await getSKTMData(idPengajuan);

          const pdfBytes = await generateSKTMPDF({
            nama: data.nama,
            nik: data.nik,
            jenisKelamin: data.jenis_kelamin,
            tempatTanggalLahir: `${data.tempat_lahir}, ${data.tanggal_lahir}`,
            alamat: data.alamat,
            keperluan: data.keperluan,
          });

          const blob = new Blob(
            [new Uint8Array(pdfBytes)],
            {
              type: "application/pdf",
            }
          );

          const url = URL.createObjectURL(blob);

          const a = document.createElement("a");

          a.href = url;
          a.download = `${nomorPengajuan}.pdf`;

          document.body.appendChild(a);

          a.click();

          a.remove();

          URL.revokeObjectURL(url);

          break;
        }

        case "sku": {
        const data = await getSKUData(idPengajuan);
        const pdfBytes = await generateSKUPDF({
          nama: data.nama,
          nik: data.nik,
          jenisKelamin: data.jenis_kelamin,
          tempatTanggalLahir: `${data.tempat_lahir}, ${data.tanggal_lahir}`,
          agama: data.agama,
          alamat: data.alamat,
          bidang_usaha: data.bidang_usaha,
        });
        // download blob sama seperti sktm...
        break;
      }

      // case "domisili": {
      //   const data = await getDomisiliData(idPengajuan);
      //   const pdfBytes = await generateDomisiliPDF({
      //     nama: data.nama,
      //     nik: data.nik,
      //     jenisKelamin: data.jenis_kelamin,
      //     tempatTanggalLahir: `${data.tempat_lahir}, ${data.tanggal_lahir}`,
      //     pekerjaan: data.pekerjaan,
      //     status: data.status,
      //     alamat: data.alamat,
      //     keperluan: data.keperluan,
      //   });
      //   // download blob...
      //   break;
      // }

      // case "skck": {
      //   const data = await getSKCKData(idPengajuan);
      //   const pdfBytes = await generateSKCKPDF({
      //     nama: data.nama,
      //     nik: data.nik,
      //     jenisKelamin: data.jenis_kelamin,
      //     tempatTanggalLahir: `${data.tempat_lahir}, ${data.tanggal_lahir}`,
      //     agama: data.agama,
      //     alamat: data.alamat,
      //     keperluan: data.keperluan,
      //   });
      //   // download blob...
      //   break;
      // }

        default:
          alert("Generate PDF untuk surat ini belum tersedia");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal generate PDF");
    }
  };

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
          <div>
            <p className="text-xs text-gray-400 mb-1">Jenis Dokumen</p>
            <p className="text-sm font-bold text-green-700">{jenisDokumen}</p>
          </div>
        </div>

        {/* Tombol Download PDF */}
        <button
          onClick={handleDownload}
          disabled={!isDataReady}  // ← disable sampai data siap
          className={`w-full rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 mb-3 transition-colors shadow-sm ${
            isDataReady
              ? "bg-amber-400 hover:bg-amber-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          {isDataReady ? "Download PDF" : "Memuat data..."}
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