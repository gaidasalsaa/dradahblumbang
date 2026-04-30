'use client'

import { Pengajuan, StatusType, LayananTab } from '../../lib/adminTypes'
import { useAdmin } from '../../lib/adminContext'

// ─── Icons ────────────────────────────────────────────────────────────────────

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

const statusConfig: Record<StatusType, { classes: string; dot: string; label: string }> = {
  Menunggu:  { classes: 'bg-[#FFF8E1] text-[#E65100] border border-[#FFE082]',   dot: '●', label: 'Menunggu'  },
  Disetujui: { classes: 'bg-[#F1F8E9] text-[#33691E] border border-[#C5E1A5]',   dot: '✓', label: 'Disetujui' },
  Ditolak:   { classes: 'bg-[#FFEBEE] text-[#C62828] border border-[#EF9A9A]',   dot: '✕', label: 'Ditolak'   },
}

function StatusBadge({ status }: { status: StatusType }) {
  const cfg = statusConfig[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${cfg.classes}`}
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
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
    <tr className="hover:bg-[#FAFDF7] transition-colors">
      {/* No */}
      <td className="px-3.5 py-3 text-[12px] text-[#6B7280]" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {item.no}
      </td>

      {/* Nama */}
      <td className="px-3.5 py-3">
        <p className="text-[13px] font-semibold text-[#1A2E1A]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {item.nama}
        </p>
        <p className="text-[11px] text-[#6B7280] mt-0.5 font-normal" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {item.rt}
        </p>
      </td>

      {/* Tanggal */}
      <td className="px-3.5 py-3 text-[12px] text-[#6B7280]" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {item.tgl}
      </td>

      {/* Download PDF */}
      <td className="px-3.5 py-3">
        <button
          onClick={() => alert(`Membuka PDF pengajuan ${item.nama}...`)}
          className="flex items-center justify-center gap-1.5 w-full border border-[#33691E] text-[#33691E] rounded-lg px-3 py-1.5 text-[11.5px] font-semibold hover:bg-[#F1F8E9] transition-colors"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <DownloadIcon />
          Download PDF
        </button>
      </td>

      {/* Status */}
      <td className="px-3.5 py-3">
        <StatusBadge status={item.status} />
      </td>

      {/* Aksi */}
      <td className="px-3.5 py-3">
        {item.status === 'Menunggu' && (
          <div className="flex gap-1.5">
            <button
              onClick={() => onSetuju(item)}
              className="flex-1 flex items-center justify-center gap-1 bg-[#33691E] text-white rounded-lg py-1.5 text-[11px] font-semibold hover:opacity-85 transition-opacity whitespace-nowrap"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <CheckIcon /> Setujui
            </button>
            <button
              onClick={() => onTolak(item)}
              className="flex-1 flex items-center justify-center gap-1 bg-[#FFEBEE] text-[#C62828] border border-[#EF9A9A] rounded-lg py-1.5 text-[11px] font-semibold hover:bg-[#FFCDD2] transition-colors whitespace-nowrap"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <XIcon /> Tolak
            </button>
          </div>
        )}
        {item.status === 'Ditolak' && (
          <button
            onClick={() => onTolak(item)}
            className="w-full flex items-center justify-center gap-1.5 bg-[#E8EAF6] text-[#283593] border border-[#C5CAE9] rounded-lg py-1.5 text-[11px] font-semibold hover:bg-[#C5CAE9] transition-colors"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <EditIcon /> Kirim Revisi
          </button>
        )}
        {item.status === 'Disetujui' && (
          <span className="text-[12px] text-[#6B7280]" style={{ fontFamily: 'Poppins, sans-serif' }}>—</span>
        )}
      </td>
    </tr>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Props {
  activeTab: LayananTab
  search: string
  filterStatus: string
  onSetuju: (item: Pengajuan) => void
  onTolak: (item: Pengajuan) => void
}

export default function AdminTable({ activeTab, search, filterStatus, onSetuju, onTolak }: Props) {
  const { pengajuan } = useAdmin()

  const filtered = pengajuan.filter(p => {
    const matchTab    = p.tab === activeTab
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === '' || p.status === filterStatus
    return matchTab && matchSearch && matchStatus
  })

  return (
    <div className="bg-white border border-[#E5E7EB] border-t-0 rounded-b-xl overflow-hidden">
      <table className="w-full border-collapse text-[13px]" style={{ tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '48px' }} />
          <col style={{ width: '185px' }} />
          <col style={{ width: '130px' }} />
          <col style={{ width: '130px' }} />
          <col style={{ width: '115px' }} />
          <col style={{ width: '160px' }} />
        </colgroup>
        <thead>
          <tr className="bg-[#F1F8E9] border-b border-[#C5E1A5]">
            {['#', 'Nama Warga', 'Tanggal Pengajuan', 'Download PDF', 'Status', 'Aksi'].map(h => (
              <th
                key={h}
                className="px-3.5 py-2.5 text-left text-[#33691E] font-semibold text-[12px] whitespace-nowrap"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="text-center py-10 text-[13px] text-[#6B7280] italic"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Tidak ada data pengajuan untuk layanan ini.
              </td>
            </tr>
          ) : (
            filtered.map(item => (
              <TableRow
                key={item.id}
                item={item}
                onSetuju={onSetuju}
                onTolak={onTolak}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}