'use client'

import { useState } from 'react'
import { LayananTab, LAYANAN_TABS_SHORT } from '../../lib/adminTypes'
import { useAdmin } from '../../lib/adminContext'

interface Props {
  activeTab: LayananTab
  onTabChange: (tab: LayananTab) => void
  search: string
  onSearchChange: (v: string) => void
  filterStatus: string
  onFilterChange: (v: string) => void
}

function SearchIcon() {
  return (
    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export default function AdminTabs({
  activeTab, onTabChange,
  search, onSearchChange,
  filterStatus, onFilterChange,
}: Props) {
  const { pengajuan } = useAdmin()

  const countByTab = (tab: LayananTab) => pengajuan.filter(p => p.tab === tab).length

  return (
    <div>
      {/* Tab Row */}
      <div className="flex bg-white border border-[#E5E7EB] rounded-t-xl overflow-hidden">
        {LAYANAN_TABS_SHORT.map((label, i) => {
          const isActive = activeTab === i
          const count = countByTab(i as LayananTab)
          return (
            <button
              key={i}
              onClick={() => onTabChange(i as LayananTab)}
              className={`
                flex-1 flex flex-col items-center gap-1.5 px-2 py-3
                text-[12px] font-medium border-r border-[#E5E7EB] last:border-r-0
                border-b-[3px] transition-all duration-150
                ${isActive
                  ? 'bg-[#F1F8E9] text-[#33691E] font-bold border-b-[#33691E]'
                  : 'text-[#6B7280] border-b-transparent hover:bg-[#F1F8E9] hover:text-[#33691E]'
                }
              `}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <span className="leading-tight text-center">{label}</span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-[#33691E] text-white'
                    : 'bg-[#E5E7EB] text-[#6B7280]'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-2.5 px-4 py-3 bg-white border-x border-b border-[#E5E7EB]">
        <span className="text-[12px] font-medium text-[#6B7280] shrink-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Cari:
        </span>
        <div className="relative">
          <SearchIcon />
          <input
            type="text"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Nama warga..."
            className="pl-8 pr-3 py-1.5 text-[12.5px] bg-[#F7F8FA] border border-[#E5E7EB] rounded-lg outline-none focus:border-[#558B2F] focus:bg-white transition-colors w-[200px]"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          />
        </div>
        <span className="text-[12px] font-medium text-[#6B7280] shrink-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Status:
        </span>
        <select
          value={filterStatus}
          onChange={e => onFilterChange(e.target.value)}
          className="px-3 py-1.5 text-[12.5px] bg-[#F7F8FA] border border-[#E5E7EB] rounded-lg outline-none focus:border-[#558B2F] focus:bg-white transition-colors cursor-pointer"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <option value="">Semua Status</option>
          <option value="Menunggu">Menunggu</option>
          <option value="Disetujui">Disetujui</option>
          <option value="Ditolak">Ditolak</option>
        </select>
      </div>
    </div>
  )
}