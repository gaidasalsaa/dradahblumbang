"use client";

import Image from "next/image";

export default function StrukturOrganisasi() {
  return (
    <section id="struktur" className="w-full py-12 bg-white">

      {/* Judul */}
      <h2 className="text-3xl font-bold text-green-700 text-center">
        Struktur Organisasi Desa
      </h2>

      <div className="w-16 h-1 bg-[#FFA726] mx-auto mt-2 mb-8 rounded-full" />

      {/* =================== GAMBAR FULL WIDTH =================== */}
      <div className="w-full flex justify-center">

        {/* Wrapper besar */}
        <div className="w-full lg:w-[90%] xl:w-[85%] 2xl:w-[80%]">

          <div className="relative w-full">

            <Image
              src="/struktur-desa-fix (2).svg"
              alt="Struktur Organisasi Desa"

              /* ukuran asli – supaya tajam */
              width={1440}
              height={797}

              /* BESAR DI LAPTOP */
              className="
                w-full
                h-auto
                object-contain
                mx-auto
                block
              "
              priority
            />
          </div>

        </div>
      </div>

    </section>
  );
}
