"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryItem = {
  img: string;
  title: string;
  desc: string;
};

export default function GaleriKegiatan() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <section id="galeri" className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-3xl font-bold text-green-700 text-center">
          Galeri Kegiatan
        </h2>
        <div className="w-16 h-1 bg-[#FFA726] mx-auto mt-2 mb-12 rounded-full" />

        {/* Grid Galeri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <GalleryCard
            img="/apel-pagi.jpeg"
            title="Apel Pagi"
            desc="Kegiatan apel pagi di Balai Desa Dradahblumbang"
            onOpen={setSelected}
          />

          <GalleryCard
            img="/pertemuan-pkk.jpeg"
            title="Pertemuan PKK"
            desc="Pertemuan rutin tim penggerak PKK dan Dharma Wanita Persatuan"
            onOpen={setSelected}
          />

          <GalleryCard
            img="/pelatihan-umkm.jpeg"
            title="Pelatihan Skala UMKM"
            desc="Pelatihan pembuatan nugget ayam sayur with bubble crumb dana desa tahun 2025 Bidang Pemberdayaan Masyarakat"
            onOpen={setSelected}
          />

          <GalleryCard
            img="/dana-blt.jpeg"
            title="Pembagian BLT-DD"
            desc="Penyaluran Bantuan Langsung Tunai Dana Desa (BLT-DD) setiap 3 bulan sekali"
            onOpen={setSelected}
          />

          <GalleryCard
            img="/sd-dradah.jpeg"
            title="Sosialisasi Pendidikan Karakter: Anti Bullying"
            desc="Tim KKN-BBK Universitas Airlangga melakukan kegiatan edukasi mengenai anti-bullying di SDN 1 dan SDN 2 Dradahblumbang. Kegiatan ini bertujuan untuk meningkatkan pemahaman siswa tentang pentingnya saling menghargai dan membangun lingkungan sekolah yang aman serta ramah.
                  Dalam sesi pemaparan, siswa dikenalkan pada pengertian bullying, bentuk-bentuknya, contoh kasus, serta tindakan baik yang harus dilakukan jika mereka melihat atau mengalami bullying. 
                  Penyampaian dibuat interaktif agar materi mudah dipahami oleh siswa. Setelah penyampaian materi, siswa mengikuti permainan Memory Run untuk melatih kerja sama dan fokus. Kegiatan ditutup dengan post-test guna mengukur pemahaman mereka mengenai anti-bullying. 
                  Harapannya, siswa mampu mengenali perilaku bullying dan memilih tindakan yang tepat untuk mencegahnya."
            onOpen={setSelected}
          />

          <GalleryCard
            img="/posyandu.jpg"
            title="Posyandu"
            desc={`Pada 15 Januari 2026, Tim KKN-BBK 7 Dradah Blumbang Universitas Airlangga berpartisipasi dalam kegiatan Posyandu di PAUD Al-Ma’ruf dengan membantu penimbangan balita, pencatatan perkembangan, dan administrasi bersama kader setempat. Kegiatan dilanjutkan dengan pemeriksaan kesehatan gratis bagi lansia di Dusun Dradah, meliputi pengecekan tensi dan gula darah, konsultasi kesehatan, serta pemberian obat dan vitamin. Seluruh rangkaian kegiatan terlaksana berkat kerja sama dengan Puskesmas Desa Dradahblumbang.`}
            onOpen={setSelected}
          />
        </div>
      </div>

      {/* ===== POPUP MODAL ===== */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative w-full h-[300px] md:h-[420px] rounded-xl overflow-hidden mb-4">
              <Image
                src={selected.img}
                alt={selected.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Text */}
            <h3 className="text-xl font-bold text-green-700 mb-2">
              {selected.title}
            </h3>

            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {selected.desc}
            </p>

            <button
              className="mt-6 px-5 py-2 rounded-full bg-[#FFA726] text-white mx-auto block"
              onClick={() => setSelected(null)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ===== Card Component ===== */

function GalleryCard({
  img,
  title,
  desc,
  onOpen,
}: {
  img: string;
  title: string;
  desc: string;
  onOpen: (item: GalleryItem) => void;
}) {
  return (
    <div
      className="cursor-pointer group"
      onClick={() => onOpen({ img, title, desc })}
    >
      {/* Image */}
      <div className="relative w-full h-52 rounded-xl overflow-hidden shadow-md">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Text */}
      <div className="mt-4">
        <h3 className="font-semibold text-green-700">
          {title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {desc}
        </p>

        <span className="text-sm text-[#FFA726] font-medium mt-1 inline-block">
          Selengkapnya →
        </span>
      </div>
    </div>
  );
}
