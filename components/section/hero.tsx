"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative h-[90vh] w-full flex items-center justify-center text-center"
    >
      {/* Background Image */}
      <Image
        src="/bg-dradah.png"
        alt="Hero Background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(113,117,116,0.55), rgba(153,153,153,0.08))",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          Selamat Datang di
          <br />
          <span className="text-[#FFA726] drop-shadow-[0_4px_8px_rgba(0,0,0.2,0.2)]">
            Desa Dradahblumbang
          </span>
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          Desa yang maju, mandiri, dan berbudaya di Kecamatan Kedungpring,
          Kabupaten Lamongan, Jawa Timur
        </p>

        <div className="mt-8">
          <a href="#profil">
            <Button className="bg-[#FFA726] hover:bg-[#fb8c00] text-white font-semibold px-8 py-6 text-lg shadow-lg rounded-full">
              Jelajahi Profil Desa
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
