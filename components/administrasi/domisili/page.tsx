"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type AnggotaKeluarga = {
  nama: string;
  nik: string;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
  pekerjaan: string;
  statusPerkawinan: string;
  alamat: string;
};

type FormData = {
  nama: string;
  nik: string;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
  pekerjaan: string;
  statusPerkawinan: string;
  alamat: string;
  anggota: AnggotaKeluarga[];
};

export default function FormDomisili() {
  const router = useRouter();

  const initialAnggota = {
    nama: "",
    nik: "",
    jenisKelamin: "",
    tempatLahir: "",
    tanggalLahir: "",
    pekerjaan: "",
    statusPerkawinan: "",
    alamat: "",
  };

  const [form, setForm] = useState<FormData>({
    nama: "",
    nik: "",
    jenisKelamin: "",
    tempatLahir: "",
    tanggalLahir: "",
    pekerjaan: "",
    statusPerkawinan: "",
    alamat: "",
    anggota: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAnggotaChange = (
    index: number,
    field: keyof AnggotaKeluarga,
    value: string
  ) => {
    const newAnggota = [...form.anggota];
    newAnggota[index][field] = value;

    setForm({
      ...form,
      anggota: newAnggota,
    });
  };

  const addAnggota = () => {
    setForm({
      ...form,
      anggota: [...form.anggota, { ...initialAnggota }],
    });
  };

  const removeAnggota = (index: number) => {
    const newAnggota = form.anggota.filter((_, i) => i !== index);
    setForm({ ...form, anggota: newAnggota });
  };

  const handleReset = () => {
    setForm({
      nama: "",
      nik: "",
      jenisKelamin: "",
      tempatLahir: "",
      tanggalLahir: "",
      pekerjaan: "",
      statusPerkawinan: "",
      alamat: "",
      anggota: [],
    });
  };

  // KE
const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!isFormValid) {
    alert("Mohon lengkapi seluruh data terlebih dahulu.");
    return;
  }

  setLoading(true);
  const { error } = await supabase.from("pengajuan_surat").insert({
    nama_warga: form.nama,
    nik: form.nik,
    jenis_surat: "domisili",
    status: "Menunggu",
    // simpan detail tambahan sebagai catatan (opsional)
    catatan_revisi: null,
    file_url: null,
  });

  setLoading(false);

  if (error) {
    alert("Gagal mengirim pengajuan. Coba lagi.");
    console.error(error);
    return;
  }

  router.push("/administrasi/sukses");
};

  const inputClass =
    "w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400";

  const selectClass =
    "w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-400 bg-gray-50 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 appearance-none";

  const labelClass = "block text-xs font-semibold text-green-700 mb-1";

  const isFormValid =
  form.nama.trim() !== "" &&
  form.nik.trim() !== "" &&
  form.jenisKelamin.trim() !== "" &&
  form.tempatLahir.trim() !== "" &&
  form.tanggalLahir.trim() !== "" &&
  form.pekerjaan.trim() !== "" &&
  form.statusPerkawinan.trim() !== "" &&
  form.alamat.trim() !== "";

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

          {/* Pekerjaan & Status Perkawinan */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass}>Pekerjaan *</label>

              <div className="relative">
                <select
                  name="pekerjaan"
                  value={form.pekerjaan}
                  onChange={handleChange}
                  className={selectClass}
                  required
                >
                  <option value="" disabled></option>
                  <option value="Petani">Petani</option>
                  <option value="PNS">PNS</option>
                  <option value="TNI/Polri">TNI/Polri</option>
                  <option value="Swasta">Swasta</option>
                  <option value="Wiraswasta">Wiraswasta</option>
                  <option value="Pelajar/Mahasiswa">Pelajar/Mahasiswa</option>
                  <option value="Ibu Rumah Tangga">Ibu Rumah Tangga</option>
                  <option value="Lainnya">Lainnya</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  ▼
                </span>
              </div>
            </div>

            <div>
              <label className={labelClass}>Status *</label>

              <div className="relative">
                <select
                  name="statusPerkawinan"
                  value={form.statusPerkawinan}
                  onChange={handleChange}
                  className={selectClass}
                  required
                >
                  <option value="" disabled></option>
                  <option value="Kepala Keluarga">Kepala Keluarga</option>
                  <option value="Istri">Istri</option>
                  <option value="Anak">Anak</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  ▼
                </span>
              </div>
            </div>
          </div>

          {/* Alamat Lengkap */}
          <div className="mb-6">
            <label className={labelClass}>Alamat Lengkap *</label>

            <input
              type="text"
              name="alamat"
              value={form.alamat}
              placeholder="Masukkan alamat lengkap sesuai KTP (RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten)"
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Section: Data Anggota Keluarga */}
          <div className="mt-2 mb-4">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-green-700">
                Data Anggota Keluarga
              </h2>

              <button
                type="button"
                onClick={addAnggota}
                className="text-xs border border-amber-400 text-amber-500 hover:bg-amber-50 rounded-md px-3 py-1.5 font-medium transition-colors"
              >
                + Tambah Anggota
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Tambahkan anggota keluarga yang tinggal satu rumah (opsional)
            </p>
          </div>

          {/* Daftar Anggota */}
          {form.anggota.map((a, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold text-green-700">
                  Anggota {i + 1}
                </span>

                <button
                  type="button"
                  onClick={() => removeAnggota(i)}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  Hapus
                </button>
              </div>

              {/* Nama Lengkap */}
              <div className="mb-4">
                <label className={labelClass}>Nama Lengkap *</label>

                <input
                  type="text"
                  placeholder="Masukkan nama lengkap sesuai KTP"
                  value={a.nama}
                  onChange={(e) =>
                    handleAnggotaChange(i, "nama", e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              {/* NIK & Jenis Kelamin */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>NIK *</label>

                  <input
                    type="text"
                    placeholder="16 digit NIK"
                    maxLength={16}
                    value={a.nik}
                    onChange={(e) =>
                      handleAnggotaChange(i, "nik", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Jenis Kelamin *</label>

                  <div className="flex items-center gap-5 py-2">
                    <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
                      <input
                        type="radio"
                        name={`jenisKelamin-${i}`}
                        value="Laki-laki"
                        checked={a.jenisKelamin === "Laki-laki"}
                        onChange={(e) =>
                          handleAnggotaChange(
                            i,
                            "jenisKelamin",
                            e.target.value
                          )
                        }
                        className="accent-green-600"
                      />
                      Laki-laki
                    </label>

                    <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
                      <input
                        type="radio"
                        name={`jenisKelamin-${i}`}
                        value="Perempuan"
                        checked={a.jenisKelamin === "Perempuan"}
                        onChange={(e) =>
                          handleAnggotaChange(
                            i,
                            "jenisKelamin",
                            e.target.value
                          )
                        }
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
                    placeholder="Kota/Kabupaten tempat lahir"
                    value={a.tempatLahir}
                    onChange={(e) =>
                      handleAnggotaChange(
                        i,
                        "tempatLahir",
                        e.target.value
                      )
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Tanggal Lahir *</label>

                  <input
                    type="date"
                    value={a.tanggalLahir}
                    onChange={(e) =>
                      handleAnggotaChange(
                        i,
                        "tanggalLahir",
                        e.target.value
                      )
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Pekerjaan & Status */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Pekerjaan *</label>

                  <div className="relative">
                    <select
                      value={a.pekerjaan}
                      onChange={(e) =>
                        handleAnggotaChange(i, "pekerjaan", e.target.value)
                      }
                      className={selectClass}
                    >
                      <option value="" disabled></option>
                      <option value="Petani">Petani</option>
                      <option value="PNS">PNS</option>
                      <option value="TNI/Polri">TNI/Polri</option>
                      <option value="Swasta">Swasta</option>
                      <option value="Wiraswasta">Wiraswasta</option>
                      <option value="Pelajar/Mahasiswa">
                        Pelajar/Mahasiswa
                      </option>
                      <option value="Ibu Rumah Tangga">
                        Ibu Rumah Tangga
                      </option>
                      <option value="Lainnya">Lainnya</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                      ▼
                    </span>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Status *</label>

                  <div className="relative">
                    <select
                      value={a.statusPerkawinan}
                      onChange={(e) =>
                        handleAnggotaChange(
                          i,
                          "statusPerkawinan",
                          e.target.value
                        )
                      }
                      className={selectClass}
                    >
                      <option value="" disabled></option>
                      <option value="Kepala Keluarga">
                        Kepala Keluarga
                      </option>
                      <option value="Istri">Istri</option>
                      <option value="Anak">Anak</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                      ▼
                    </span>
                  </div>
                </div>
              </div>

              {/* Alamat */}
              <div>
                <label className={labelClass}>Alamat Lengkap *</label>

                <input
                  type="text"
                  placeholder="Masukkan alamat lengkap sesuai KTP"
                  value={a.alamat}
                  onChange={(e) =>
                    handleAnggotaChange(i, "alamat", e.target.value)
                  }
                  className={inputClass}
                />
              </div>
            </div>
          ))}

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