import Image from "next/image"
import { Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#3F6F1D] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Profil Desa */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* Logo Desa */}
              <div className="w-10 h-10 relative">
                <Image
                  src="/logo-dradah.png"
                  alt="Logo Desa"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Desa Dradah Blumbang</h3>
                <p className="text-sm text-white/80">
                  Kedungpring, Lamongan
                </p>
              </div>
            </div>

            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              Desa yang maju, mandiri, dan berbudaya dengan komitmen
              untuk kesejahteraan masyarakat.
            </p>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#profil" className="hover:text-white">Profil Desa</a></li>
              <li><a href="#struktur" className="hover:text-white">Struktur Desa</a></li>
              <li><a href="#data" className="hover:text-white">Data Wilayah</a></li>
              <li><a href="#administrasi" className="hover:text-white">Administrasi</a></li>
            </ul>
          </div>

          {/* Kontak & Sosial Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Kontak & Media Sosial
            </h3>

            <div className="space-y-3 text-sm text-white/80 mb-4">
              {/* <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>(0322) 123-456</span>
              </div> */}
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>pemerintahdesadradahblumbang@gmail.com</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/share/16k66EnisL/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-400 hover:bg-orange-500 transition"
              >
                <Image src="/facebook.svg" alt="Facebook" width={10} height={10} />
              </a>
              <a
                href="https://www.instagram.com/pemdesdradahblumbang?igsh=NzQxMzZoNzEybndo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-400 hover:bg-orange-500 transition"
              >
                <Image src="/instagram-dradah.svg" alt="Instagram" width={16} height={16} />
              </a>
              <a
                href="https://x.com/PemdesD90879?t=Xr5N3DT1l6614A5LHJcI2g&s=08"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-400 hover:bg-orange-500 transition"
              >
                <Image src="/X.svg" alt="Twitter" width={18} height={18} />
              </a>
              <a
                href="https://www.facebook.com/share/16k66EnisL/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-400 hover:bg-orange-500 transition"
              >
                <Image src="/tiktok.png" alt="Facebook" width={18} height={18} />
              </a>

            </div>
          </div>

        </div>

        {/* Garis & Copyright */}
        <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-white/70">
          © 2026 BBK 7 Dradah Blumbang Universitas Airlangga. All rights reserved.
        </div>
      </div>
    </footer>
  )
}