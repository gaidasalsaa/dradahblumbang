// lib/pdf/generateSKCKPDF.ts

import { PDFDocument, StandardFonts } from "pdf-lib";
import { splitTextIntoLines } from "./utils";

interface SKCKData {
  nama: string;
  nik: string;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
  agama: string;
  pekerjaan: string;
  alamat: string;
  keperluan: string;
  tanggal: string;
}

export async function generateSKCKPDF(data: SKCKData) {
  const existingPdfBytes = await fetch(
    "/template/skck.pdf"
  ).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const timesRomanFont = await pdfDoc.embedFont(
    StandardFonts.TimesRoman
  );

  const page = pdfDoc.getPages()[0];

  const alamatLines = splitTextIntoLines(data.alamat, 45);

  // Nama
  page.drawText(data.nama, {
    x: 210,
    y: 727,
    size: 12,
    font: timesRomanFont,
  });

  // Jenis Kelamin
  page.drawText(data.jenisKelamin, {
    x: 210,
    y: 713,
    size: 12,
    font: timesRomanFont,
  });

  // Tempat, Tanggal Lahir
  page.drawText(`${data.tempatLahir}, ${data.tanggalLahir}`, {
    x: 210,
    y: 699,
    size: 12,
    font: timesRomanFont,
  });

  // Agama
  page.drawText(data.agama, {
    x: 210,
    y: 686,
    size: 12,
    font: timesRomanFont,
  });

  // Pekerjaan
  page.drawText(data.pekerjaan, {
    x: 210,
    y: 672,
    size: 12,
    font: timesRomanFont,
  });

  // Alamat (multi-line)
  alamatLines.forEach((line, index) => {
    page.drawText(line, {
      x: 210,
      y: 658 - index * 14,
      size: 12,
      font: timesRomanFont,
    });
  });

  // NIK
  page.drawText(data.nik, {
    x: 210,
    y: 617,
    size: 12,
    font: timesRomanFont,
  });

  // Keperluan (setelah "Surat keterangan ini digunakan untuk :")
  page.drawText(data.keperluan, {
    x: 280,
    y: 478,
    size: 12,
    font: timesRomanFont,
  });

  // Tanggal (di samping "Dradahblumbang,")
  page.drawText(data.tanggal, {
    x: 413,
    y: 398,
    size: 12,
    font: timesRomanFont,
  });

  return await pdfDoc.save();
}