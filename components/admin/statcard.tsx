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
        <p className={`text-[26px] font-bold leading-none ${numColor}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
          {num}
        </p>
        <p className="text-[11.5px] text-[#6B7280] mt-1 font-normal" style={{ fontFamily: 'Poppins, sans-serif' }}>
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
        numColor="text-[#E65100]"
        bgColor="bg-[#FFF8E1]"
      />
      <StatCard
        icon="✅"
        num={disetujui}
        label="Disetujui"
        numColor="text-[#33691E]"
        bgColor="bg-[#F1F8E9]"
      />
      <StatCard
        icon="❌"
        num={ditolak}
        label="Ditolak / Revisi"
        numColor="text-[#C62828]"
        bgColor="bg-[#FFEBEE]"
      />
      <StatCard
        icon="📋"
        num={total}
        label="Total Pengajuan"
        numColor="text-[#5E35B1]"
        bgColor="bg-[#EDE7F6]"
      />
    </div>
  )
}