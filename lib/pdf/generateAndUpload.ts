import { supabase } from '@/lib/supabase'
import { generateSKTMPDF } from './generateSKTM'
import { generateSKUPDF } from './generateSKU'
import { getSKTMData } from './getSKTMData'
import { getSKUData } from './getSKUData'

function formatTanggalIndonesia(isoString: string) {
  const bulan = [
    'Januari','Februari','Maret','April','Mei','Juni',
    'Juli','Agustus','September','Oktober','November','Desember'
  ]
  const d = new Date(isoString)
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`
}

export async function generateAndUploadPDF(
  pengajuanId: string,
  jenisSurat: string,
  tanggalPengajuan: string,
  nomorPengajuan: string
): Promise<string> {
  let pdfBytes: Uint8Array

  const tanggal = formatTanggalIndonesia(tanggalPengajuan)

  if (jenisSurat === 'sktm') {
    const raw = await getSKTMData(pengajuanId)
    pdfBytes = await generateSKTMPDF({
      nama: raw.nama,
      nik: raw.nik,
      jenisKelamin: raw.jenis_kelamin,
      tempatTanggalLahir: `${raw.tempat_lahir}, ${formatTanggalIndonesia(raw.tanggal_lahir)}`,
      alamat: raw.alamat,
      keperluan: raw.keperluan,
      tanggal,
    })
  } else if (jenisSurat === 'sku') {
    const raw = await getSKUData(pengajuanId)
    console.log('[SKU raw data]', raw)
    pdfBytes = await generateSKUPDF({
      nama: raw.nama,
      nik: raw.nik,
      jenisKelamin: raw.jenis_kelamin,
      tempatTanggalLahir: `${raw.tempat_lahir}, ${formatTanggalIndonesia(raw.tanggal_lahir)}`,
      agama: raw.agama,
      alamat: raw.alamat,
      bidang_usaha: raw.bidang_usaha,
      tanggal,
    })
  } else {
    throw new Error(`Jenis surat '${jenisSurat}' belum didukung`)
  }

  // Upload ke Supabase Storage
  const fileName = `${nomorPengajuan}.pdf`
  const { error: uploadError } = await supabase.storage
    .from('surat-pdf')
    .upload(fileName, pdfBytes, {
      contentType: 'application/pdf',
      upsert: true,
    })

  if (uploadError) throw new Error('Gagal upload PDF: ' + uploadError.message)

  const { data: urlData } = supabase.storage
    .from('surat-pdf')
    .getPublicUrl(fileName)

  // Simpan file_url ke pengajuan_surat
  await supabase
    .from('pengajuan_surat')
    .update({ file_url: urlData.publicUrl })
    .eq('id', pengajuanId)

  return urlData.publicUrl
}