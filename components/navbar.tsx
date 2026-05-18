"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [aboutOpen, setAboutOpen] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);

  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileLetterOpen, setMobileLetterOpen] = useState(false);

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
            <Image
              src="/logo-dradah.png"
              alt="Logo Desa"
              width={40}
              height={40}
            />

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
            <a href="#beranda" className="hover:text-[#FFA726]">
              Beranda
            </a>

            {/* Dropdown Tentang */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[#FFA726] transition">
                Tentang
                <ChevronDown size={16} />
              </button>

              <div className="absolute top-full left-0 pt-2 hidden group-hover:block">
                <div className="w-64 bg-white rounded-xl shadow-lg py-3 text-[#333333]">
                  <a
                    href="#profil"
                    className="block px-4 py-2 hover:bg-[#FFF3E0]"
                  >
                    Profil Desa
                  </a>

                  <a
                    href="#struktur"
                    className="block px-4 py-2 hover:bg-[#FFF3E0]"
                  >
                    Struktur Desa
                  </a>

                  <a
                    href="#data"
                    className="block px-4 py-2 hover:bg-[#FFF3E0]"
                  >
                    Data Wilayah & Kependudukan
                  </a>

                  <a
                    href="#galeri"
                    className="block px-4 py-2 hover:bg-[#FFF3E0]"
                  >
                    Galeri Kegiatan
                  </a>
                </div>
              </div>
            </div>

            {/* Dropdown Pengajuan Surat */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[#FFA726] transition">
                Pengajuan Surat
                <ChevronDown size={16} />
              </button>

              <div className="absolute top-full left-0 pt-2 hidden group-hover:block">
                <div className="w-64 bg-white rounded-xl shadow-lg py-3 text-[#333333]">
                  <a
                    href="/administrasi/sktm"
                    className="block px-4 py-2 hover:bg-[#FFF3E0]"
                  >
                    SKTM
                  </a>

                  <a
                    href="/administrasi/domisili"
                    className="block px-4 py-2 hover:bg-[#FFF3E0]"
                  >
                    Surat Keterangan Domisili
                  </a>

                  <a
                    href="/administrasi/sku"
                    className="block px-4 py-2 hover:bg-[#FFF3E0]"
                  >
                    SKU
                  </a>

                  <a
                    href="/administrasi/skck"
                    className="block px-4 py-2 hover:bg-[#FFF3E0]"
                  >
                    Surat Pengantar SKCK
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a href="/auth/login">
              <Button className="bg-[#FFA726] hover:bg-[#fb8c00] text-white font-semibold rounded-full flex items-center gap-2">
                <LogIn size={18} />
                Login Admin
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
              <a
                onClick={() => setOpen(false)}
                href="#beranda"
                className="hover:text-[#FFA726]"
              >
                Beranda
              </a>

              {/* Mobile Tentang */}
              <div>
                <button
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className="flex items-center justify-between w-full hover:text-[#FFA726]"
                >
                  Tentang
                  <ChevronDown size={18} />
                </button>

                {mobileAboutOpen && (
                  <div className="flex flex-col mt-2 ml-4 space-y-2 text-sm">
                    <a
                      onClick={() => setOpen(false)}
                      href="#profil"
                      className="hover:text-[#FFA726]"
                    >
                      Profil Desa
                    </a>

                    <a
                      onClick={() => setOpen(false)}
                      href="#struktur"
                      className="hover:text-[#FFA726]"
                    >
                      Struktur Desa
                    </a>

                    <a
                      onClick={() => setOpen(false)}
                      href="#data"
                      className="hover:text-[#FFA726]"
                    >
                      Data Wilayah & Kependudukan
                    </a>

                    <a
                      onClick={() => setOpen(false)}
                      href="#galeri"
                      className="hover:text-[#FFA726]"
                    >
                      Galeri Kegiatan
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile Pengajuan Surat */}
              <div>
                <button
                  onClick={() => setMobileLetterOpen(!mobileLetterOpen)}
                  className="flex items-center justify-between w-full hover:text-[#FFA726]"
                >
                  Pengajuan Surat
                  <ChevronDown size={18} />
                </button>

                {mobileLetterOpen && (
                  <div className="flex flex-col mt-2 ml-4 space-y-2 text-sm">
                    <a
                      onClick={() => setOpen(false)}
                      href="#sktm"
                      className="hover:text-[#FFA726]"
                    >
                      SKTM
                    </a>

                    <a
                      onClick={() => setOpen(false)}
                      href="#domisili"
                      className="hover:text-[#FFA726]"
                    >
                      Surat Keterangan Domisili
                    </a>

                    <a
                      onClick={() => setOpen(false)}
                      href="#sku"
                      className="hover:text-[#FFA726]"
                    >
                      SKU
                    </a>

                    <a
                      onClick={() => setOpen(false)}
                      href="#skck"
                      className="hover:text-[#FFA726]"
                    >
                      Surat Pengantar SKCK
                    </a>
                  </div>
                )}
              </div>

              <a href="/auth/login">
                <Button className="mt-3 bg-[#FFA726] hover:bg-[#fb8c00] text-white font-semibold rounded-full w-full flex items-center justify-center gap-2">
                  <LogIn size={18} />
                  Login Admin
                </Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
