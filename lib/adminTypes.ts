// ─── Types ───────────────────────────────────────────────────────────────────

export type StatusType = 'Menunggu' | 'Disetujui' | 'Ditolak'

export type LayananTab = 0 | 1 | 2 | 3

export interface Pengajuan {
  id: string
  tab: LayananTab
  no: string
  nama: string
  rt: string
  tgl: string
  status: StatusType
  rejectNotes?: string
}

export interface Notifikasi {
  id: string
  nama: string
  layanan: string
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
  { id: 'p001', tab: 0, no: '001', nama: 'Budi Santoso',  rt: 'RT 04 / RW 02', tgl: '01 Mei 2026', status: 'Menunggu' },
  { id: 'p002', tab: 0, no: '002', nama: 'Dewi Kartika',  rt: 'RT 05 / RW 02', tgl: '30 Apr 2026', status: 'Ditolak',  rejectNotes: 'Foto KTP kurang jelas.' },
  { id: 'p003', tab: 0, no: '003', nama: 'Hendra Jaya',   rt: 'RT 02 / RW 01', tgl: '28 Apr 2026', status: 'Disetujui' },
  // Tab 1 — Domisili
  { id: 'p004', tab: 1, no: '004', nama: 'Siti Aminah',   rt: 'RT 02 / RW 01', tgl: '01 Mei 2026', status: 'Menunggu' },
  { id: 'p005', tab: 1, no: '005', nama: 'Roni Prasetyo', rt: 'RT 01 / RW 03', tgl: '29 Apr 2026', status: 'Disetujui' },
  // Tab 2 — Usaha
  { id: 'p006', tab: 2, no: '006', nama: 'Eko Budiarto',  rt: 'RT 03 / RW 01', tgl: '01 Mei 2026', status: 'Menunggu' },
  { id: 'p007', tab: 2, no: '007', nama: 'Sri Wahyuni',   rt: 'RT 06 / RW 03', tgl: '27 Apr 2026', status: 'Disetujui' },
  // Tab 3 — SKCK
  { id: 'p008', tab: 3, no: '008', nama: 'Rina Wijaya',   rt: 'RT 01 / RW 03', tgl: '01 Mei 2026', status: 'Menunggu' },
]

export const MOCK_NOTIFIKASI: Notifikasi[] = [
  { id: 'n1', nama: 'Siti Aminah',   layanan: 'Surat Keterangan Domisili',    waktu: '5 menit lalu',  dibaca: false },
  { id: 'n2', nama: 'Budi Santoso',  layanan: 'Surat Keterangan Tidak Mampu', waktu: '23 menit lalu', dibaca: false },
  { id: 'n3', nama: 'Rina Wijaya',   layanan: 'Surat Pengantar SKCK',          waktu: '1 jam lalu',    dibaca: false },
  { id: 'n4', nama: 'Ahmad Fauzi',   layanan: 'Surat Keterangan Usaha — sudah diproses', waktu: 'Kemarin', dibaca: true },
]