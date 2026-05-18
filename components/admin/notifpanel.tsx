'use client'

import { useAdmin } from '../../lib/adminContext'
import { Notifikasi } from '../../lib/adminTypes'

interface Props {
  onClose: () => void
}

function NotifItem({ item, onMark }: { item: Notifikasi; onMark: (id: string) => void }) {
  return (
    <button
      onClick={() => onMark(item.id)}
      className="w-full flex gap-3 items-start px-4 py-3 border-b border-[#E5E7EB] last:border-none hover:bg-[#F7F8FA] transition-colors text-left"
    >
      <span
        className={`mt-[5px] w-2 h-2 rounded-full shrink-0 ${item.dibaca ? 'bg-[#D1D5DB]' : 'bg-[#FFA726]'}`}
      />
      <div>
        <p className="text-[13px] font-semibold text-[#1A2E1A]">
          {item.nama}
        </p>
        <p className="text-[11.5px] text-[#6B7280] mt-0.5">
          {['Surat Tdk Mampu', 'Surat Domisili', 'Surat Usaha', 'Surat SKCK'][item.jenis]}
        </p>
        <p className="text-[11px] text-[#9CA3AF] mt-0.5">
          {item.waktu}
        </p>
      </div>
    </button>
  )
}

export default function AdminNotifPanel({ onClose }: Props) {
  const { notifikasi, markNotifRead, unreadCount } = useAdmin()

  return (
    <div className="w-[310px] bg-white border border-[#E5E7EB] rounded-xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#F1F8E9] border-b border-[#C5E1A5]">
        <span className="text-[13px] font-semibold text-[#33691E]">
          Pengajuan Masuk
        </span>
        {unreadCount > 0 && (
          <span className="text-[10px] font-bold bg-[#FFA726] text-[#33691E] px-2 py-0.5 rounded-full">
            {unreadCount} baru
          </span>
        )}
      </div>

      {/* Items */}
      <div>
        {notifikasi.map(n => (
          <NotifItem key={n.id} item={n} onMark={markNotifRead} />
        ))}
      </div>
    </div>
  )
}