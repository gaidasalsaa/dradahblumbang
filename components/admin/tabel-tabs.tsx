'use client'

import { LayananTab } from '../../lib/adminTypes'
import { useAdmin } from '../../lib/adminContext'

const LAYANAN_TABS_SHORT = ['Surat Keterangan Tidak Mampu', 'Surat Keterangan Domisili', 'Surat Keterangan Usaha', 'Surat Pengantar SKSK']

function SearchIcon() {
  return (
    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

interface Props {
  activeTab: LayananTab
  onTabChange: (tab: LayananTab) => void
  search: string
  onSearchChange: (v: string) => void
  filterStatus: string
  onFilterChange: (v: string) => void
}

export default function AdminTabs({
  activeTab, onTabChange,
  search, onSearchChange,
  filterStatus, onFilterChange,
}: Props) {
  const { pengajuan } = useAdmin()

  return (
    <div>
      {/* Tab Row — scrollable di mobile */}
      <div className="flex bg-white border border-[#E5E7EB] rounded-t-xl overflow-x-auto">
        {LAYANAN_TABS_SHORT.map((label, i) => {
          const isActive = activeTab === i

          return (
            <button
              key={i}
              onClick={() => onTabChange(i as LayananTab)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
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

      {/* Filter Row */}
      <div className="flex gap-3 bg-white border border-t-0 border-[#E5E7EB] rounded-b-xl px-4 py-3.5 justify-between items-center">
        {/* Search */}
        <div className="flex-1 max-w-xs relative">
          <SearchIcon />
          <input
            type="text"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Cari nama warga..."
            className="w-full pl-9 pr-3.5 py-2 text-sm border border-[#E5E7EB] rounded-lg outline-none focus:border-[#558B2F] transition-colors"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={e => onFilterChange(e.target.value)}
          className="px-3.5 py-2 text-sm border border-[#E5E7EB] rounded-lg outline-none focus:border-[#558B2F] bg-white cursor-pointer transition-colors"
        >
          <option value="">Semua Status</option>
          <option value="Menunggu">Menunggu Review</option>
          <option value="Disetujui">Disetujui</option>
          <option value="Ditolak">Ditolak / Revisi</option>
        </select>
      </div>
    </div>
  )
}
