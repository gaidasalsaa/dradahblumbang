"use client";

export default function StrukturOrganisasi() {
  return (
    <section id="struktur" className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 relative">

        {/* Judul */}
        <h2 className="text-3xl font-bold text-green-700 text-center">
          Struktur Organisasi Desa
        </h2>
        <div className="w-16 h-1 bg-[#FFA726] mx-auto mt-2 mb-12 rounded-full" />

        {/* ================== LEVEL 1 : KEPALA DESA ================== */}
        <div className="flex justify-center relative">

          {/* Kotak Kepala Desa */}
          <div className="bg-gradient-to-r from-green-700 to-green-500 text-white rounded-2xl shadow-lg px-10 py-4 text-center w-[300px]">
            <p className="text-xs uppercase tracking-wide">Kepala Desa</p>
            <p className="font-semibold text-lg">Kari Muji Santoso</p>
          </div>

          {/* Garis turun */}
          <div className="absolute top-[77px] left-1/2 -translate-x-1/2 w-[2px] h-[380px] bg-green-300" />
        </div>

        {/* ================== LEVEL 2 : SEKRETARIS ================== */}
        <div className="relative mt-16 flex justify-center">

          {/* Garis horizontal utama */}
          <div className="absolute top-0 left-80 right-10 mx-auto w-[25%] h-[2px] bg-green-300" />

          {/* Kotak Sekretaris di kanan */}
          <div className="absolute right-[13.5%] -top-10">
            <div className="bg-[#FFA726] text-white rounded-2xl shadow-lg px-10 py-4 text-center w-[260px]">
              <p className="text-xs uppercase tracking-wide">Sekretaris Desa</p>
              <p className="font-semibold text-lg">Mat Juri</p>
            </div>

            {/* Garis turun */}
            <div className="mx-auto w-[2px] h-[84px] bg-green-300" />
            <div className="absolute top-[116px] right-[120%] -translate-x-1/2 w-[2px] h-[69px] bg-green-300" />
            <div className="absolute top-[116px] left-[125%] -translate-x-1/2 w-[2px] h-[70px] bg-green-300" />
          </div>
        </div>

      <div className="mt-16 relative pt-4">

        {/* GARIS HORIZONTAL YANG MENYATUKAN URUSAN + SEKSI */}
        <div className="absolute top-2 left-[29%] -translate-x-1/2 w-[42%] h-[2px] bg-green-300" />
        <div className="absolute top-3 left-[75.3%] -translate-x-1/2 w-[33.8%] h-[2px] bg-green-300" />

        {/* WRAPPER GRID 6 ITEM (3 urusan + 3 seksi) */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-6 gap-4 justify-items-center">

          {/* ===== URUSAN ===== */}
          {[
            { t: "URUSAN TATA USAHA DAN UMUM", n: "M. Galih Fasya D. S." },
            { t: "URUSAN KEUANGAN", n: "Andi Suhendro" },
            { t: "URUSAN PERENCANAAN", n: "Mutmainnah" },
          ].map((i, k) => (
            <div
              key={k}
              className="bg-[#FFF3D8] rounded-2xl shadow-md w-[175px] h-[90px] flex flex-col items-center justify-center text-center"
            >
              <p className="text-[11px] uppercase text-gray-600">{i.t}</p>
              <p className="font-semibold text-green-700 mt-1 text-sm">{i.n}</p>
            </div>
          ))}

          {/* ===== SEKSI ===== */}
          {[
            { t: "SEKSI PEMERINTAHAN", n: "Juniar Dwi Setyoko" },
            { t: "SEKSI KESEJAHTERAAN", n: "Hendri Susilo" },
            { t: "SEKSI PELAYANAN", n: "Budi Saputro" },
          ].map((i, k) => (
            <div
              key={k}
              className="bg-[#FFF3D8] rounded-2xl shadow-md w-[175px] h-[90px] flex flex-col items-center justify-center text-center"
            >
              <p className="text-[11px] uppercase text-gray-600">{i.t}</p>
              <p className="font-semibold text-green-700 mt-1 text-sm">{i.n}</p>
            </div>
          ))}
        </div>
      </div>


        {/* ================== LEVEL 5 : KEPALA DUSUN ================== */}
        <div className="mt-16 relative pt-1">

          {/* garis horizontal dusun */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[82%] h-[2px] bg-green-300" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 justify-items-center mt-10">
            {[
              { t: "Kepala Dusun Blumbang", n: "Muhammad Romli" },
              { t: "Kepala Dusun Carangbang", n: "Marno" },
              { t: "Kepala Dusun Dradah", n: "Tukinem" },
              { t: "Kepala Dusun Tarik", n: "Suryanto" },
              { t: "Kepala Dusun Sempu", n: "Untung Sujatmiko" },
            ].map((i, k) => (
              <div
                key={k}
                className="bg-green-50 border border-green-200 rounded-xl shadow px-4 py-3 text-center w-[200px]"
              >
                <p className="text-[11px] uppercase text-gray-700">{i.t}</p>
                <p className="font-semibold text-green-700 text-sm">{i.n}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}