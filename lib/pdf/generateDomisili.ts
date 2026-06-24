import { PDFDocument, StandardFonts } from "pdf-lib";
import { splitTextIntoLines } from "./utils";

interface DomisiliData {
  nama: string;
  tempatTanggalLahir: string;
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
  const existingPdfBytes = await fetch(
    "/template/domisili.pdf"
  ).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(
    existingPdfBytes
  );

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
    x: 223,
    y: 720,
    size: 12,
    font: timesRomanFont,
  });

  // Tempat Tanggal Lahir
  page.drawText(data.tempatTanggalLahir, {
    x: 223,
    y: 693,
    size: 12,
    font: timesRomanFont,
  });

  // NIK
  page.drawText(data.nik, {
    x: 223,
    y: 665,
    size: 12,
    font: timesRomanFont,
  });

  // Jenis Kelamin
  page.drawText(data.jenisKelamin, {
    x: 223,
    y: 637,
    size: 12,
    font: timesRomanFont,
  });

  // Agama
  page.drawText(data.agama, {
    x: 223,
    y: 609,
    size: 12,
    font: timesRomanFont,
  });

  // Alamat
  alamatLines.forEach((line, index) => {
    page.drawText(line, {
      x: 223,
      y: 581 - index * 18,
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
      55
    );

  keteranganLines.forEach((line, index) => {
    page.drawText(line, {
      x: 223,
      y: 520 - index * 18,
      size: 12,
      font: timesRomanFont,
    });
  });

  // Keperluan
  page.drawText(data.keperluan, {
    x: 223,
    y: 455,
    size: 12,
    font: timesRomanFont,
  });

  // Tanggal tanda tangan
  page.drawText(data.tanggal, {
    x: 418,
    y: 350,
    size: 12,
    font: timesRomanFont,
  });

  return await pdfDoc.save();
}