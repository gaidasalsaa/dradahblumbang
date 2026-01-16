export default function Administrasi() {
  return (
    <section id="administrasi" className="w-full py-24 bg-[#FFF9EB]">
      <div className="max-w-5xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-3xl font-bold text-green-700 text-center">
          Administrasi
        </h2>
        <div className="w-16 h-1 bg-[#FFA726] mx-auto mt-2 mb-8 rounded-full" />

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
          Fitur Administrasi Desa memudahkan warga mengurus berbagai keperluan administrasi secara online.
          Warga cukup memilih jenis layanan, kemudian mengisi formulir digital yang telah disediakan.
        </p>

        <p className="text-sm text-gray-700 font-semibold text-center mt-6 mb-4">
          Jenis layanan yang tersedia:
        </p>

        {/* ============== CARD GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">

          {[
            "Surat Keterangan Tidak Mampu (SKTM)",
            "Surat Keterangan Domisili",
            "Surat Keterangan Usaha (SKU)",
            "Surat Pengantar SKCK",
          ].map((item, i) => (
            <div
              key={i}
              className="
                bg-white
                rounded-2xl
                shadow-md
                border
                border-orange-100
                p-5
                flex
                flex-col
                items-center
                text-center
                hover:shadow-lg
                transition
              "
            >
              <div className="w-8 h-8 rounded-full bg-[#FFA726]/20 flex items-center justify-center mb-3">
                <span className="text-[#FB8C00] font-bold text-lg">
                  {i + 1}
                </span>
              </div>

              <p className="text-sm font-medium text-gray-700 leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div className="flex justify-center mt-10">
          <a
            href="https://forms.gle/45Krbz6FYC9Y3MGS6"
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-[#FFA726]
              hover:bg-[#FB8C00]
              text-white
              px-10
              py-3.5
              rounded-full
              shadow-md
              transition
              font-medium
            "
          >
            Klik di sini untuk mengajukan permohonan
          </a>
        </div>

      </div>
    </section>
  );
}
