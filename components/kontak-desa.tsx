import Image from "next/image";

export default function KontakDesa() {
  return (
    <section id="kontak" className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-3xl font-bold text-green-700 text-center">
          Kontak Desa
        </h2>
        <div className="w-16 h-1 bg-[#FFA726] mx-auto mt-2 mb-4 rounded-full" />
        <p className="text-center text-gray-500 mb-14">
          Hubungi kami untuk informasi lebih lanjut
        </p>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left - Contact Info */}
          <div className="space-y-8">

            {/* Alamat */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF3E0] flex items-center justify-center">
                <Image
                  src="/alamat.svg"
                  alt="Alamat"
                  width={18}
                  height={18}
                />
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-1">
                  Alamat
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Jl. Raya Babat, Dradah, Dradah Blumbang,<br />
                  Kecamatan Kedungpring<br />
                  Kabupaten Lamongan, Jawa Timur 62272
                </p>
              </div>
            </div>

            {/* Telepon */}
            {/* <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center">
                <Image
                  src="/telepon.svg"
                  alt="Telepon"
                  width={18}
                  height={18}
                />
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-1">
                  Telepon
                </h4>
                <p className="text-sm text-gray-500">
                  (0322) 123-4567
                </p>
              </div>
            </div> */}

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF3E0] flex items-center justify-center">
                <Image
                  src="/email-dradah.svg"
                  alt="Email"
                  width={18}
                  height={18}
                />
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-1">
                  Email
                </h4>
                <p className="text-sm text-gray-500">
                  pemerintahdesadradahblumbang@gmail.com
                </p>
              </div>
            </div>

          </div>

          {/* Right - Google Maps */}
          <div className="w-full h-[250px] rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps?q=Desa+Dradah+Blumbang+Kedungpring+Lamongan+Jawa+Timur&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

        </div>

      </div>
    </section>
  );
}