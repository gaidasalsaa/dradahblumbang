export default function GeografisSection() {
  return (
    <section
      id="geografis"
      className="w-full py-16 bg-[#FFF9EB]"
    >
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-md p-10">
          
          {/* Title */}
          <h2 className="text-3xl font-bold text-green-700 text-center">
            Letak Geografis
          </h2>

          {/* Orange underline */}
          <div className="w-16 h-1 bg-[#FFA726] mx-auto mt-2 mb-10 rounded-full" />

          {/* 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

            {/* Lokasi */}
            <div>
              <div className="text-[#FFA726] text-4xl mb-2">📍</div>
              <p className="font-semibold text-green-700">Lokasi</p>
              <p className="text-gray-600 mt-1">
                Kecamatan Kedungpring<br />
                Kabupaten Lamongan<br />
                Jawa Timur
              </p>
            </div>

            {/* Topografi */}
            <div>
              <div className="text-[#FFA726] text-4xl mb-2">⚠️</div>
              <p className="font-semibold text-green-700">Topografi</p>
              <p className="text-gray-600 mt-1">
                Dataran rendah dengan<br />
                area persawahan yang<br />
                subur dan produktif
              </p>
            </div>

            {/* Iklim */}
            <div>
              <div className="text-[#FFA726] text-4xl mb-2">🌡️</div>
              <p className="font-semibold text-green-700">Iklim</p>
              <p className="text-gray-600 mt-1">
                Iklim tropis dengan<br />
                dua musim yang<br />
                mendukung pertanian
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
