// ─── Types ───────────────────────────────────────────────────────────────────

export type StatusType = 'Menunggu' | 'Disetujui' | 'Ditolak'

export type LayananTab = 0 | 1 | 2 | 3

export interface Pengajuan {
  id: string
  tab: LayananTab
  no: string
  nama: string
  nik: string
  tgl: string
  status: StatusType
  file_url?: string
  rejectNotes?: string
  nomorPengajuan?: string
}

export interface PengajuanRow {
  id: string
  nama_warga: string
  nik: string
  jenis_surat: string
  tanggal_pengajuan: string
  status: StatusType
  catatan_revisi: string | null
  file_url: string | null
  nomor_pengajuan: string
}

export interface Notifikasi {
  id: string
  nama: string
  jenis: LayananTab
  waktu: string
  dibaca: boolean
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const LAYANAN_TABS = [
  'Surat Keterangan Tidak Mampu',
  'Surat Keterangan Domisili',
  'Surat Keterangan Usaha',
  'Surat Pengantar SKCK',
] as const

export const LAYANAN_TABS_SHORT = [
  'Surat Keterangan Tidak Mampu',
  'Surat Keterangan Domisili',
  'Surat Keterangan Usaha',
  'Surat Pengantar SKCK',
] as const
// ─── Mock Data ────────────────────────────────────────────────────────────────

export const MOCK_PENGAJUAN: Pengajuan[] = []

export const MOCK_NOTIFIKASI: Notifikasi[] = []