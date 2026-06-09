import { PDFDocument, StandardFonts } from "pdf-lib";
import { splitTextIntoLines } from "./utils";

interface SKUData {
  nama: string;
  nik: string;
  jenisKelamin: string;
  tempatTanggalLahir: string;
  agama: string;
  alamat: string;
  bidang_usaha: string; // bidang usaha
}

export async function generateSKUPDF(data: SKUData) {
  const existingPdfBytes = await fetch("/template/sku.pdf").then((res) =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const page = pdfDoc.getPages()[0];
  const alamatLines = splitTextIntoLines(data.alamat, 45);

  page.drawText(data.nama,              { x: 223, y: 720, size: 12, font });
  page.drawText(data.nik,               { x: 223, y: 693, size: 12, font });
  page.drawText(data.jenisKelamin,      { x: 223, y: 665, size: 12, font });
  page.drawText(data.tempatTanggalLahir,{ x: 223, y: 637, size: 12, font });
  page.drawText(data.agama,             { x: 223, y: 610, size: 12, font });
  alamatLines.forEach((line, i) => {
    page.drawText(line, { x: 223, y: 582 - i * 18, size: 12, font });
  });
  page.drawText(data.bidang_usaha,        { x: 223, y: 527, size: 12, font });

  return await pdfDoc.save();
}
