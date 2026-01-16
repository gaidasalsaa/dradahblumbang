import Image from "next/image";

export default function DataWilayah() {
  return (
    <section id="data" className="w-full py-16 bg-[#FFF9EB]">
      <div className="max-w-6xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-3xl font-bold text-green-700 text-center">
          Data Wilayah & Kependudukan
        </h2>
        <div className="w-16 h-1 bg-[#FFA726] mx-auto mt-2 mb-10 rounded-full" />

        {/* Statistik Utama */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">

          <StatCard
            img="/pend-dradah.svg"
            value="5.381"
            label="Total Penduduk"
          />

          <StatCard
            img="/maps-dradah.svg"
            value="1.119"
            label="Luas Wilayah (Ha)"
          />

          <StatCard
            img="/rt-dradah.svg"
            value="40 RT"
            label="Rukun Tetangga"
          />

          <StatCard
            img="/rw-dradah.svg"
            value="13 RW"
            label="Rukun Warga"
          />

        </div>

        {/* Detail Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Komposisi Penduduk */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-green-700 mb-4">
              Komposisi Penduduk
            </h3>

            <div className="space-y-3 text-sm">
              <Row label="Laki-laki" value="2.662 orang" />
              <Row label="Perempuan" value="2.719 orang" />
              <Row label="Kepala Keluarga" value="2139 KK" />
            </div>
          </div>

          {/* Mata Pencaharian */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-green-700 mb-4">
              Mata Pencaharian
            </h3>

            <div className="space-y-3 text-sm">
              <Row label="Petani" value="22,18%" />
              <Row label="Buruh Tani/Buruh Nelayan" value="18,02%" />
              <Row label="Buruh Pabrik" value="7,65%" />
              <Row label="Pegawai Swasta" value="6,8%" />
              <Row label="Lainnya" value="45,35%" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ===== Reusable Components ===== */

function StatCard({
  img,
  value,
  label,
}: {
  img: string;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center">
      <div className="w-12 h-12 bg-[#FFE0B2] rounded-full flex items-center justify-center mx-auto mb-4">
        <Image
          src={img}
          alt={label}
          width={24}
          height={24}
          className="object-contain"
        />
      </div>
      <p className="text-2xl font-bold text-green-700">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b border-gray-200 pb-2 last:border-none">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-green-700">{value}</span>
    </div>
  );
}