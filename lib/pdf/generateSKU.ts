import { PDFDocument, StandardFonts } from "pdf-lib";
import { splitTextIntoLines } from "./utils";

interface SKUData {
  nama: string;
  nik: string;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
  agama: string;
  alamat: string;
  bidang_usaha: string; 
  tanggal: string
}

export async function generateSKUPDF(data: SKUData) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL || 'https://dradahblumbang.vercel.app';
  const existingPdfBytes = await fetch(`${baseUrl}/template/sku.pdf`).then((res) =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const page = pdfDoc.getPages()[0];
  const alamatLines = splitTextIntoLines(data.alamat, 45);

  page.drawText(data.nama,              { x: 213, y: 698, size: 12, font });
  page.drawText(data.nik,               { x: 213, y: 666, size: 12, font });
  page.drawText(data.jenisKelamin,      { x: 213, y: 633, size: 12, font });
  const tempatTanggalLahir = `${data.tempatLahir}, ${new Date(
      data.tanggalLahir
    ).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`;

    page.drawText(tempatTanggalLahir, {
      x: 213,
      y: 600,
      size: 12,
      font,
    });
  page.drawText(data.agama,             { x: 213, y: 568, size: 12, font });
  alamatLines.forEach((line, i) => {
    page.drawText(line, { x: 213, y: 535 - i * 18, size: 12, font });
  });
  page.drawText(data.bidang_usaha,        { x: 213, y: 395, size: 12, font });
  page.drawText(data.tanggal, { x: 429, y: 301, size: 12, font });

  return await pdfDoc.save();
}
