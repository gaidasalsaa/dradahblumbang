import { generateSKTMPDF } from './generateSKTM'
import { generateSKUPDF } from './generateSKU'
import { generateDomisiliPDF } from './generateDomisili'
import { generateSKCKPDF } from './generateSKCK'
import { getSKTMData } from './getSKTMData'
import { getSKUData } from './getSKUData'
import { getDomisiliData } from './getDomisiliData'
import { getSKCKData } from './getSKCKData'

function formatTanggalIndonesia(isoString: string) {
  const bulan = [
    'Januari','Februari','Maret','April','Mei','Juni',
    'Juli','Agustus','September','Oktober','November','Desember'
  ]
  const d = new Date(isoString)
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`
}

/**
 * Generate PDF preview di sisi client TANPA upload ke Supabase Storage
 * dan TANPA update file_url. Dipakai admin buat ngecek isi surat
 * sebelum pengajuan disetujui/ditolak. Isinya sama persis dengan PDF
 * resmi (generateAndUploadPDF), cuma beda di langkah penyimpanan.
 */
export async function generatePreviewPDF(
  pengajuanId: string,
  jenisSurat: string,
  tanggalPengajuan: string
): Promise<Blob> {
  let pdfBytes: Uint8Array

  const tanggal = formatTanggalIndonesia(tanggalPengajuan)

  if (jenisSurat === 'sktm') {
    const raw = await getSKTMData(pengajuanId)
    pdfBytes = await generateSKTMPDF({
      nama: raw.nama,
      nik: raw.nik,
      jenisKelamin: raw.jenisKelamin,
      tempatLahir: raw.tempatLahir,
      tanggalLahir: raw.tanggalLahir,
      alamat: raw.alamat,
      keperluan: raw.keperluan,
      tanggal,
    })
  } else if (jenisSurat === 'sku') {
    const raw = await getSKUData(pengajuanId)
    pdfBytes = await generateSKUPDF({
      nama: raw.nama,
      nik: raw.nik,
      jenisKelamin: raw.jenisKelamin,
      tempatLahir: raw.tempatLahir,
      tanggalLahir: raw.tanggalLahir,
      agama: raw.agama,
      alamat: raw.alamat,
      bidang_usaha: raw.bidang_usaha,
      tanggal,
    })
  } else if (jenisSurat === 'domisili') {
    const raw = await getDomisiliData(pengajuanId)
    pdfBytes = await generateDomisiliPDF({
      nama: raw.nama,
      tempatLahir: raw.tempatLahir,
      tanggalLahir: raw.tanggalLahir,
      nik: raw.nik,
      jenisKelamin: raw.jenisKelamin,
      agama: raw.agama,
      alamat: raw.alamat,
      rt: raw.rt,
      rw: raw.rw,
      dusun: raw.dusun,
      keperluan: raw.keperluan,
      tanggal,
    })
  } else if (jenisSurat === 'skck') {
    const raw = await getSKCKData(pengajuanId)
    pdfBytes = await generateSKCKPDF({
      nama: raw.nama,
      nik: raw.nik,
      jenisKelamin: raw.jenisKelamin,
      tempatLahir: raw.tempatLahir,
      tanggalLahir: raw.tanggalLahir,
      agama: raw.agama,
      pekerjaan: raw.pekerjaan,
      alamat: raw.alamat,
      keperluan: raw.keperluan,
      tanggal,
    })
  } else {
    throw new Error(`Preview untuk jenis surat '${jenisSurat}' belum didukung`)
  }

  return new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' })
}