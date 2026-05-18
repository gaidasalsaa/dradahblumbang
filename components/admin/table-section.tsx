'use client'

import { Pengajuan, StatusType, LayananTab } from '../../lib/adminTypes'
import { useAdmin } from '../../lib/adminContext'

// ─── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LAYANAN_TABS: string[] = [
  'Surat Keterangan Tidak Mampu',
  'Surat Keterangan Domisili',
  'Surat Keterangan Usaha',
  'Surat Pengantar SKSK',
]

const statusConfig: Record<StatusType, { classes: string; dot: string; label: string }> = {
  Menunggu:  { classes: 'bg-[#FFF8E1] text-[#E65100] border border-[#FFE082]',   dot: '●', label: 'Menunggu'  },
  Disetujui: { classes: 'bg-[#F1F8E9] text-[#33691E] border border-[#C5E1A5]',   dot: '✓', label: 'Disetujui' },
  Ditolak:   { classes: 'bg-[#FFEBEE] text-[#C62828] border border-[#EF9A9A]',   dot: '✕', label: 'Ditolak'   },
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: StatusType }) {
  const cfg = statusConfig[status]
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${cfg.classes}`}>
      {cfg.dot} {cfg.label}
    </span>
  )
}

// ─── Table Row ────────────────────────────────────────────────────────────────

interface RowProps {
  item: Pengajuan
  onSetuju: (item: Pengajuan) => void
  onTolak: (item: Pengajuan) => void
}

function TableRow({ item, onSetuju, onTolak }: RowProps) {
  return (
    <tr className="hover:bg-[#FAFDF7] transition-colors border-b border-[#F3F4F6] last:border-b-0">
      {/* ID Pengajuan */}
      <td className="px-5 py-5 text-base text-[#6B7280] font-mono whitespace-nowrap text-center align-middle">
        {item.id}
      </td>

      {/* Nama */}
      <td className="px-5 py-5 text-center align-middle">
        <p className="text-base font-semibold text-[#1A2E1A]">{item.nama}</p>
        <p className="text-sm text-[#6B7280] mt-0.5">NIK: {item.nik}</p>
      </td>

      {/* Tanggal */}
      <td className="px-5 py-5 text-base text-[#6B7280] whitespace-nowrap text-center align-middle">
        {item.tgl}
      </td>

      {/* Download PDF */}
      <td className="px-5 py-5 text-center align-middle">
        <button
          onClick={() => alert(`Membuka PDF pengajuan ${item.nama}...`)}
          className="flex items-center justify-center gap-2 w-full border border-[#33691E] text-[#33691E] rounded-lg px-4 py-2 text-base font-semibold hover:bg-[#F1F8E9] transition-colors whitespace-nowrap"
        >
          <DownloadIcon />
          Download PDF
        </button>
      </td>

      {/* Status */}
      <td className="px-5 py-5 text-center align-middle">
        <StatusBadge status={item.status} />
      </td>

      {/* Aksi */}
      <td className="px-5 py-5 text-center align-middle">
        {item.status === 'Menunggu' && (
          <div className="flex gap-2">
            <button
              onClick={() => onSetuju(item)}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#33691E] text-white rounded-lg py-2 text-base font-semibold hover:opacity-85 transition-opacity whitespace-nowrap"
            >
              <CheckIcon /> Setujui
            </button>
            <button
              onClick={() => onTolak(item)}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#FFEBEE] text-[#C62828] border border-[#EF9A9A] rounded-lg py-2 text-base font-semibold hover:bg-[#FFCDD2] transition-colors whitespace-nowrap"
            >
              <XIcon /> Tolak
            </button>
          </div>
        )}
        {item.status === 'Ditolak' && (
          <button
            onClick={() => onTolak(item)}
            className="w-full flex items-center justify-center gap-2 bg-[#E8EAF6] text-[#283593] border border-[#C5CAE9] rounded-lg py-2 text-base font-semibold hover:bg-[#C5CAE9] transition-colors"
          >
            <EditIcon /> Kirim Revisi
          </button>
        )}
        {item.status === 'Disetujui' && (
          <span className="text-base text-[#6B7280]">—</span>
        )}
      </td>
    </tr>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

interface Props {
  activeTab: LayananTab
  onTabChange: (tab: LayananTab) => void
  search: string
  onSearchChange: (v: string) => void
  filterStatus: string
  onFilterChange: (v: string) => void
  onSetuju: (item: Pengajuan) => void
  onTolak: (item: Pengajuan) => void
}

export default function AdminTableSection({
  activeTab, onTabChange,
  search, onSearchChange,
  filterStatus, onFilterChange,
  onSetuju, onTolak,
}: Props) {
  const { pengajuan } = useAdmin()

  const filtered = pengajuan.filter(p => {
    const matchTab    = p.tab === activeTab
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === '' || p.status === filterStatus
    return matchTab && matchSearch && matchStatus
  })

  return (
    <div>
      {/* ── Tab Row ── */}
      <div className="flex bg-white border border-[#E5E7EB] rounded-t-xl overflow-x-auto">
        {LAYANAN_TABS.map((label, i) => {
          const isActive = activeTab === i
          return (
            <button
              key={i}
              onClick={() => onTabChange(i as LayananTab)}
              className={`flex items-center gap-2 px-6 py-4 text-base font-semibold whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? 'border-b-[#33691E] text-[#33691E]'
                  : 'border-b-transparent text-[#6B7280] hover:text-[#33691E]'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* ── Filter Row ── */}
      <div className="flex gap-3 bg-white border border-t-0 border-[#E5E7EB] px-5 py-4 justify-between items-center">
        {/* Search */}
        <div className="flex-1 max-w-sm relative">
          <SearchIcon />
          <input
            type="text"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Cari nama warga..."
            className="w-full pl-10 pr-4 py-3 text-base border border-[#E5E7EB] rounded-lg outline-none focus:border-[#558B2F] transition-colors"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={e => onFilterChange(e.target.value)}
          className="px-4 py-3 text-base border border-[#E5E7EB] rounded-lg outline-none focus:border-[#558B2F] bg-white cursor-pointer transition-colors"
        >
          <option value="">Semua Status</option>
          <option value="Menunggu">Menunggu Review</option>
          <option value="Disetujui">Disetujui</option>
          <option value="Ditolak">Ditolak / Revisi</option>
        </select>
      </div>

      {/* ── Table ── */}
      <div className="bg-white border border-[#E5E7EB] border-t-0 rounded-b-xl overflow-x-auto px-4">
        <table className="w-full border-collapse min-w-[760px] table-auto">
          <thead>
            <tr className="bg-[#F1F8E9] border-b border-[#C5E1A5]">
              {['ID Pengajuan', 'Nama Warga', 'Tanggal Pengajuan', 'Download PDF', 'Status', 'Aksi'].map(h => (
                <th
                  key={h}
                  className="px-5 py-4 text-center text-[#33691E] font-semibold text-sm uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-base text-[#6B7280] italic">
                  Tidak ada data pengajuan untuk layanan ini.
                </td>
              </tr>
            ) : (
              filtered.map(item => (
                <TableRow key={item.id} item={item} onSetuju={onSetuju} onTolak={onTolak} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}