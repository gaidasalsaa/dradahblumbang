'use client'

import { useAdmin } from '../../lib/adminContext'

interface StatCardProps {
  num: number
  label: string
  accent: string
  borderColor: string
}

function StatCard({ num, label, accent, borderColor }: StatCardProps) {
  return (
    <div
      className="bg-white rounded-xl p-5 flex flex-col gap-1 border-t-4 shadow-sm hover:shadow-md transition-shadow"
      style={{ borderTopColor: borderColor }}
    >
      <p className="text-[32px] font-extrabold leading-none" style={{ color: accent }}>
        {num}
      </p>
      <p className="text-[12px] text-[#6B7280] font-medium mt-1">
        {label}
      </p>
    </div>
  )
}

export default function AdminStatCards() {
  const { pengajuan } = useAdmin()

  const menunggu  = pengajuan.filter(p => p.status === 'Menunggu').length
  const disetujui = pengajuan.filter(p => p.status === 'Disetujui').length
  const ditolak   = pengajuan.filter(p => p.status === 'Ditolak').length
  const total     = pengajuan.length

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard num={menunggu}  label="Menunggu Review"  accent="#F57F17" borderColor="#FFA726" />
      <StatCard num={disetujui} label="Disetujui"        accent="#2E7D32" borderColor="#7CB342" />
      <StatCard num={ditolak}   label="Ditolak / Revisi" accent="#F57F17" borderColor="#FFA726" />
      <StatCard num={total}     label="Total Pengajuan"  accent="#2E7D32" borderColor="#7CB342" />
    </div>
  )
}