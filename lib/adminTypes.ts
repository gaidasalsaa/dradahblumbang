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

export const MOCK_PENGAJUAN: Pengajuan[] = [
  // Tab 0 — Tidak Mampu
  { id: 'p001', tab: 0, no: '001', nama: 'Budi Santoso',  nik: '19999999999', tgl: '01 Mei 2026', status: 'Menunggu' },
  { id: 'p002', tab: 0, no: '002', nama: 'Dewi Kartika',  nik: '19999999', tgl: '30 Apr 2026', status: 'Ditolak',  rejectNotes: 'Foto KTP kurang jelas.' },
  { id: 'p003', tab: 0, no: '003', nama: 'Hendra Jaya',   nik: '19999999998', tgl: '28 Apr 2026', status: 'Disetujui' },
  // Tab 1 — Domisili
  { id: 'p004', tab: 1, no: '004', nama: 'Siti Aminah',   nik: '19999999997', tgl: '01 Mei 2026', status: 'Menunggu' },
  { id: 'p005', tab: 1, no: '005', nama: 'Roni Prasetyo', nik: '19999999996', tgl: '29 Apr 2026', status: 'Disetujui' },
  // Tab 2 — Usaha
  { id: 'p006', tab: 2, no: '006', nama: 'Eko Budiarto',  nik: '19999999995', tgl: '01 Mei 2026', status: 'Menunggu' },
  { id: 'p007', tab: 2, no: '007', nama: 'Sri Wahyuni',   nik: '19999999994', tgl: '27 Apr 2026', status: 'Disetujui' },
  // Tab 3 — SKCK
  { id: 'p008', tab: 3, no: '008', nama: 'Rina Wijaya',   nik: '19999999993', tgl: '01 Mei 2026', status: 'Menunggu' },
]

export const MOCK_NOTIFIKASI: Notifikasi[] = [
  { id: 'n1', nama: 'Siti Aminah',  jenis: 1, waktu: '5 menit lalu',  dibaca: false },
  { id: 'n2', nama: 'Budi Santoso', jenis: 0, waktu: '23 menit lalu', dibaca: false },
  { id: 'n3', nama: 'Rina Wijaya',  jenis: 3, waktu: '1 jam lalu',    dibaca: false },
  { id: 'n4', nama: 'Ahmad Fauzi',  jenis: 2, waktu: 'Kemarin',       dibaca: true  },
]