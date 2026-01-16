"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <Image src="/logo-dradah.png" alt="Logo Desa" width={40} height={40} />
            <div>
                <p
                className={`font-bold text-sm md:text-base ${
                    scrolled ? "text-[#33691E]" : "text-white"
                }`}
                >
                DESA DRADAHBLUMBANG
                </p>
                <p
                className={`text-xs ${
                    scrolled ? "text-gray-700" : "text-white/80"
                }`}
                >
                Kedungpring, Lamongan
                </p>
            </div>
            </div>

          {/* Desktop Menu */}
          <nav
            className={`hidden md:flex items-center gap-6 font-medium ${
                scrolled ? "text-[#333333]" : "text-white"
            }`}
            >
            <a href="#beranda" className="hover:text-[#FFA726]">Beranda</a>
            <a href="#profil" className="hover:text-[#FFA726]">Profil Desa</a>
            <a href="#struktur" className="hover:text-[#FFA726]">Struktur Desa</a>
            <a href="#data" className="hover:text-[#FFA726]">Data Wilayah & Kependudukan</a>
            <a href="#galeri" className="hover:text-[#FFA726]">Galeri Kegiatan</a>
            </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a href="#administrasi">
              <Button className="bg-[#FFA726] hover:bg-[#fb8c00] text-white font-semibold rounded-full">
              Administrasi
            </Button>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden transition ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {open && (
          <div className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/10">
            <nav className="flex flex-col px-6 py-4 text-white font-medium space-y-3">
              <a onClick={() => setOpen(false)} href="#beranda" className="hover:text-[#FFA726]">Beranda</a>
              <a onClick={() => setOpen(false)} href="#profil" className="hover:text-[#FFA726]">Profil Desa</a>
              <a onClick={() => setOpen(false)} href="#struktur" className="hover:text-[#FFA726]">Struktur Desa</a>
              <a onClick={() => setOpen(false)} href="#data" className="hover:text-[#FFA726]">Data Wilayah & Kependudukan</a>
              <a onClick={() => setOpen(false)} href="#galeri" className="hover:text-[#FFA726]">Galeri Kegiatan</a>

              <a href="#administrasi">
              <Button className="mt-3 bg-[#FFA726] hover:bg-[#fb8c00] text-white font-semibold rounded-full w-full">
                Administrasi
              </Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}