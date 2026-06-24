"use client";

import { generateSKTMPDF } from "@/lib/pdf/generateSKTM";
import { getSKTMData } from "@/lib/pdf/getSKTMData";

export default function TestPDFPage() {
  const handleDownload = async () => {
    const data = await getSKTMData("1");

    const pdfBytes = await generateSKTMPDF({
      nama: data.nama,
      nik: data.nik,
      jenisKelamin: data.jenis_kelamin,
      tempatTanggalLahir: `${data.tempat_lahir}, ${new Date(data.tanggal_lahir).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`,
      alamat: data.alamat,
      keperluan: data.keperluan,
      tanggal: new Date().toLocaleDateString("id-ID", {  // ← ini yang kurang
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });

    const blob = new Blob(
      [new Uint8Array(pdfBytes)],
      {
        type: "application/pdf",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "SKTM.pdf";

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-10">
      <button
        onClick={handleDownload}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Generate SKTM
      </button>
    </div>
  );
}