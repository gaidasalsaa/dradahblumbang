import { PDFDocument, StandardFonts } from "pdf-lib";
import { splitTextIntoLines } from "./utils";

interface DomisiliData {
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  nik: string;
  jenisKelamin: string;
  agama: string;
  alamat: string;
  rt: string;
  rw: string;
  dusun: string;
  keperluan: string;
  tanggal: string;
}

export async function generateDomisiliPDF(
  data: DomisiliData
) {
  const templateUrl =
    typeof window !== "undefined"
      ? new URL("/template/domisili.pdf", window.location.origin).toString()
      : "/template/domisili.pdf";

  const res = await fetch(templateUrl);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch template PDF: ${res.status} ${res.statusText} - ${text.slice(0, 200)}`
    );
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("pdf")) {
    const snippet = await res.text().catch(() => "");
    throw new Error(
      `Template is not a PDF (content-type: ${contentType}). Response snippet: ${snippet.slice(0,200)}`
    );
  }

  const existingPdfBytes = await res.arrayBuffer();

  let pdfDoc;
  try {
    pdfDoc = await PDFDocument.load(existingPdfBytes);
  } catch (err) {
    throw new Error(
      `Failed to parse template PDF: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  const timesRomanFont =
    await pdfDoc.embedFont(
      StandardFonts.TimesRoman
    );

  const page = pdfDoc.getPages()[0];

  // alamat multi-line
  const alamatLines = splitTextIntoLines(
    data.alamat,
    45
  );

  // Nama
  page.drawText(data.nama, {
    x: 240,
    y: 706,
    size: 12,
    font: timesRomanFont,
  });

  // Tempat Tanggal Lahir
  const tempatTanggalLahir = `${data.tempatLahir}, ${new Date(
    data.tanggalLahir
  ).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;

  page.drawText(tempatTanggalLahir, {
    x: 240,
    y: 678,
    size: 12,
    font: timesRomanFont,
  });

  // NIK
  page.drawText(data.nik, {
    x: 240,
    y: 650,
    size: 12,
    font: timesRomanFont,
  });

  // Jenis Kelamin
  page.drawText(data.jenisKelamin, {
    x: 240,
    y: 622,
    size: 12,
    font: timesRomanFont,
  });

  // Agama
  page.drawText(data.agama, {
    x: 240,
    y: 595,
    size: 12,
    font: timesRomanFont,
  });

  // Alamat
  alamatLines.forEach((line, index) => {
    page.drawText(line, {
      x: 240,
      y: 568 - index * 18,
      size: 12,
      font: timesRomanFont,
    });
  });

  // Keterangan Domisili
  const keterangan =
    `Orang tersebut benar-benar berdomisili di RT ${data.rt}/RW ${data.rw} Dusun ${data.dusun}, Desa Dradahblumbang, Kecamatan Kedungpring, Kabupaten Lamongan, Jawa Timur`;

  const keteranganLines =
    splitTextIntoLines(
      keterangan,
      60
    );

  keteranganLines.forEach((line, index) => {
    page.drawText(line, {
      x: 240,
      y: 526 - index * 18,
      size: 12,
      font: timesRomanFont,
    });
  });

  // Keperluan
  page.drawText(data.keperluan, {
    x: 240,
    y: 472,
    size: 12,
    font: timesRomanFont,
  });

  // Tanggal tanda tangan
  page.drawText(data.tanggal, {
    x: 418,
    y: 360,
    size: 12,
    font: timesRomanFont,
  });

  return await pdfDoc.save();
}