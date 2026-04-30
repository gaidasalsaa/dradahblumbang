'use client'

import { useEffect } from 'react'
import { Pengajuan } from '../../lib/adminTypes'

interface Props {
  item: Pengajuan | null
  onConfirm: () => void
  onClose: () => void
}

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

export default function AdminModalSetuju({ item, onConfirm, onClose }: Props) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center bg-black/45 backdrop-blur-[2px]"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="bg-white rounded-2xl border border-[#E5E7EB] w-[430px] shadow-2xl overflow-hidden"
        style={{ animation: 'fadeUp 0.2s ease' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 bg-[#F1F8E9] border-b border-[#E5E7EB]">
          <div className="w-9 h-9 rounded-[9px] bg-[#C5E1A5] flex items-center justify-center text-[#33691E]">
            <CheckCircleIcon />
          </div>
          <h2 className="text-[15px] font-bold text-[#1A2E1A]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Konfirmasi Persetujuan
          </h2>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <p className="text-[13px] text-[#6B7280] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Pengajuan atas nama:{' '}
            <strong className="text-[#33691E] font-semibold">{item.nama}</strong>
          </p>

          {/* Warning Box */}
          <div className="flex gap-2.5 bg-[#FFF8E1] border border-[#FFE082] rounded-xl p-3.5 mb-4">
            <span className="text-base mt-0.5 shrink-0">⚠️</span>
            <p className="text-[12.5px] text-[#BF360C] leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Jika Anda menyetujui formulir ini, warga dapat mengambil dokumen di balai desa.
            </p>
          </div>

          <p className="text-[13px] text-[#6B7280] leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Pastikan data yang diajukan sudah sesuai dan dokumen dapat diproses lebih lanjut.
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-2 justify-end px-5 py-3.5 bg-[#FAFAFA] border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-[9px] border border-[#E5E7EB] text-[#6B7280] text-[13px] font-medium hover:bg-[#F7F8FA] transition-colors"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-1.5 px-5 py-2 rounded-[9px] bg-[#33691E] text-white text-[13px] font-semibold hover:opacity-85 transition-opacity"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Setujui
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}