// lib/pdf/generateSKTM.ts

import { PDFDocument, StandardFonts } from "pdf-lib";
import { splitTextIntoLines } from "./utils";

interface SKTMData {
  nama: string;
  nik: string;
  jenisKelamin: string;
  tempatTanggalLahir: string;
  alamat: string;
  keperluan: string;
}

export async function generateSKTMPDF(data: SKTMData) {
  const existingPdfBytes = await fetch(
    "/template/sktm.pdf"
  ).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const timesRomanFont = await pdfDoc.embedFont(
    StandardFonts.TimesRoman
  );

  const page = pdfDoc.getPages()[0];

  const alamatLines = splitTextIntoLines(
    data.alamat,
    45
    );
    

  page.drawText(data.nama, {
    x: 223,
    y: 720,
    size: 12,
    font: timesRomanFont,
  });

  page.drawText(data.nik, {
    x: 223,
    y: 693,
    size: 12,
    font: timesRomanFont,
  });

  page.drawText(data.jenisKelamin, {
    x: 223,
    y: 665,
    size: 12,
    font: timesRomanFont,
  });

  page.drawText(data.tempatTanggalLahir, {
    x: 223,
    y: 637,
    size: 12,
    font: timesRomanFont,
  });

  alamatLines.forEach((line, index) => {
  page.drawText(line, {
    x: 223,
    y: 610 - index * 18,
    size: 12,
    font: timesRomanFont,
    });
    });

  page.drawText(data.keperluan, {
    x: 223,
    y: 527,
    size: 12,
    font: timesRomanFont,
  });

  return await pdfDoc.save();
}