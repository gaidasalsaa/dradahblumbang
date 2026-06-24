"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from '@/lib/supabase'

type FormData = {
  nama: string;
  nik: string;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
  agama: string;
  alamat: string;
  rt: string;
  rw: string;
  dusun: string;
  keperluan: string;
};

export default function FormDomisili() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormData>({
    nama: "",
    nik: "",
    jenisKelamin: "",
    tempatLahir: "",
    tanggalLahir: "",
    agama: "",
    alamat: "",
    rt: "",
    rw: "",
    dusun: "",
    keperluan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({
      nama: "",
      nik: "",
      jenisKelamin: "",
      tempatLahir: "",
      tanggalLahir: "",
      agama: "",
      alamat: "",
      rt: "",
      rw: "",
      dusun: "",
      keperluan: "",
    });
  };

  const isFormValid =
    form.nama.trim() !== "" &&
    form.nik.trim() !== "" &&
    form.jenisKelamin.trim() !== "" &&
    form.tempatLahir.trim() !== "" &&
    form.tanggalLahir.trim() !== "" &&
    form.agama.trim() !== "" &&
    form.alamat.trim() !== "" &&
    form.rt.trim() !== "" &&
    form.rw.trim() !== "" &&
    form.dusun.trim() !== "" &&
    form.keperluan.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Mohon lengkapi seluruh data terlebih dahulu.");
      return;
    }

    setLoading(true);

    const today = new Date();

    const tanggal =
      today.getFullYear().toString() +
      String(today.getMonth() + 1).padStart(2, "0") +
      String(today.getDate()).padStart(2, "0");

    const nomorPengajuan =
    `DOM-${tanggal}-${Date.now().toString().slice(-4)}`;

    // 1. Insert ke tabel pengajuan_surat dulu untuk mendapat pengajuan_id
    const { data: pengajuan, error: pengajuanError } = await supabase
      .from("pengajuan_surat")
      .insert({
        nama_warga: form.nama,
        nik: form.nik,
        jenis_surat: "domisili",
        nomor_pengajuan: nomorPengajuan,
        status: "Menunggu",
        catatan_revisi: null,
        file_url: null,
      })
      .select("id")
      .single();

    if (pengajuanError || !pengajuan) {
      setLoading(false);
      console.log("PENGAJUAN ERROR:", pengajuanError);
      alert(
        JSON.stringify(
          pengajuanError,
          null,
          2
        )
      );
      return;
    }

    // 2. Insert detail ke tabel domisili
    const { error: domisiliError } = await supabase.from("domisili").insert({
      pengajuan_id: pengajuan.id,
      nama: form.nama,
      nik: form.nik,
      jenis_kelamin: form.jenisKelamin,
      tempat_lahir: form.tempatLahir,
      tanggal_lahir: form.tanggalLahir,
      agama: form.agama,
      alamat: form.alamat,
      rt: form.rt,
      rw: form.rw,
      dusun: form.dusun,
      keperluan: form.keperluan,
    });

    setLoading(false);

    if (domisiliError) {
      console.error("SUPABASE ERROR:", domisiliError);
      alert(JSON.stringify(domisiliError));
      return;
    }

    router.push(
      `/administrasi/sukses?id=${pengajuan.id}&jenis=domisili`
    );
  };

  const inputClass =
    "w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400";

  const selectClass =
    "w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-400 bg-gray-50 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 appearance-none";

  const labelClass = "block text-xs font-semibold text-green-700 mb-1";

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-5">
        <span>Beranda</span>
        <span className="mx-1">&gt;</span>
        <span>Administrasi</span>
        <span className="mx-1">&gt;</span>
        <span className="text-green-700 font-semibold">Surat Domisili</span>
      </nav>

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-center text-green-800 mb-2">
        Form Pengajuan Surat Domisili
      </h1>

      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Lengkapi formulir berikut untuk mengajukan permohonan surat keterangan
        domisili. Pastikan semua data yang dimasukkan sesuai dengan dokumen
        resmi.
      </p>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-0">

          {/* Section: Data Pemohon */}
          <div className="bg-amber-50 rounded-lg px-4 py-3 mb-6">
            <h2 className="text-sm font-bold text-green-700">Data Pemohon</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Masukkan informasi pribadi dengan lengkap dan benar
            </p>
          </div>

          {/* Nama Lengkap */}
          <div className="mb-4">
            <label className={labelClass}>Nama Lengkap *</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              placeholder="Masukkan nama lengkap sesuai KTP"
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* NIK & Jenis Kelamin */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass}>NIK *</label>
              <input
                type="text"
                name="nik"
                value={form.nik}
                placeholder="16 digit NIK"
                maxLength={16}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Jenis Kelamin *</label>
              <div className="flex items-center gap-5 py-2">
                <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="radio"
                    name="jenisKelamin"
                    value="Laki-laki"
                    checked={form.jenisKelamin === "Laki-laki"}
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  Laki-laki
                </label>
                <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="radio"
                    name="jenisKelamin"
                    value="Perempuan"
                    checked={form.jenisKelamin === "Perempuan"}
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  Perempuan
                </label>
              </div>
            </div>
          </div>

          {/* Tempat & Tanggal Lahir */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass}>Tempat Lahir *</label>
              <input
                type="text"
                name="tempatLahir"
                value={form.tempatLahir}
                placeholder="Kota/Kabupaten tempat lahir"
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Tanggal Lahir *</label>
              <input
                type="date"
                name="tanggalLahir"
                value={form.tanggalLahir}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Agama */}
          <div className="mb-4">
            <label className={labelClass}>Agama *</label>
            <div className="relative">
              <select
                name="agama"
                value={form.agama}
                onChange={handleChange}
                className={selectClass}
                required
              >
                <option value="" disabled>Pilih agama</option>
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
            </div>
          </div>

          {/* Section: Alamat */}
          <div className="bg-amber-50 rounded-lg px-4 py-3 mb-6 mt-2">
            <h2 className="text-sm font-bold text-green-700">Alamat Domisili</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Masukkan alamat sesuai tempat tinggal saat ini
            </p>
          </div>

          {/* Alamat Lengkap */}
          <div className="mb-4">
            <label className={labelClass}>Alamat Lengkap *</label>
            <input
              type="text"
              name="alamat"
              value={form.alamat}
              placeholder="Nama jalan, nomor rumah, dll."
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* RT, RW, Dusun */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className={labelClass}>RT *</label>
              <input
                type="text"
                name="rt"
                value={form.rt}
                placeholder="001"
                maxLength={3}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>RW *</label>
              <input
                type="text"
                name="rw"
                value={form.rw}
                placeholder="001"
                maxLength={3}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Dusun *</label>
              <input
                type="text"
                name="dusun"
                value={form.dusun}
                placeholder="Nama dusun"
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Section: Keperluan */}
          <div className="bg-amber-50 rounded-lg px-4 py-3 mb-6 mt-2">
            <h2 className="text-sm font-bold text-green-700">Keperluan</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Jelaskan tujuan pengajuan surat domisili ini
            </p>
          </div>

          <div className="mb-6">
            <label className={labelClass}>Keperluan Surat *</label>
            <textarea
              name="keperluan"
              value={form.keperluan}
              placeholder="Contoh: Untuk keperluan melamar pekerjaan, membuka rekening bank, dll."
              onChange={handleChange}
              rows={3}
              className={`${inputClass} resize-none`}
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="border border-gray-300 text-gray-600 bg-white hover:bg-gray-50 rounded-md px-4 py-2.5 text-sm font-medium transition-colors"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`flex-1 rounded-md px-4 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm ${
                isFormValid && !loading
                  ? "bg-amber-400 hover:bg-amber-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
              {loading ? "Mengirim..." : "Kirim Pengajuan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}