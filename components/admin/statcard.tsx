'use client'

import { useAdmin } from '../../lib/adminContext'

interface StatCardProps {
  icon: string
  num: number
  label: string
  numColor: string
  bgColor: string
}

function StatCard({ icon, num, label, numColor, bgColor }: StatCardProps) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center text-xl shrink-0 ${bgColor}`}>
        {icon}
      </div>
      <div>
        <p className={`text-3xl font-bold leading-none ${numColor}`}>
          {num}
        </p>
        <p className="text-xs text-[#6B7280] mt-1 font-normal">
          {label}
        </p>
      </div>
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-7">
      <StatCard
        icon="⏳"
        num={menunggu}
        label="Menunggu Review"
        numColor="text-[#F57F17]"
        bgColor="bg-[#FFFDE7]"
      />
      <StatCard
        icon="✅"
        num={disetujui}
        label="Disetujui"
        numColor="text-[#2E7D32]"
        bgColor="bg-[#E8F5E9]"
      />
      <StatCard
        icon="❌"
        num={ditolak}
        label="Ditolak / Revisi"
        numColor="text-[#F9A825]"
        bgColor="bg-[#FFF9C4]"
      />
      <StatCard
        icon="📋"
        num={total}
        label="Total Pengajuan"
        numColor="text-[#1B5E20]"
        bgColor="bg-[#C8E6C9]"
      />
    </div>
  )
}