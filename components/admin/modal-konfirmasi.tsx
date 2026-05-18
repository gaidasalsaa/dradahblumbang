'use client'

import { useEffect, useState } from 'react'
import { Pengajuan } from '../../lib/adminTypes'

interface Props {
  type: 'setuju' | 'tolak'
  item: Pengajuan | null
  onConfirm: (notes?: string) => void
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

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
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

export default function ModalKonfirmasi({ type, item, onConfirm, onClose }: Props) {
  const [notes, setNotes] = useState('')
  const [error, setError] = useState(false)

  const isTolak = type === 'tolak'

  useEffect(() => {
    setNotes(item?.rejectNotes ?? '')
    setError(false)
  }, [item])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSubmit = () => {
    if (isTolak && !notes.trim()) {
      setError(true)
      return
    }
    onConfirm(isTolak ? notes.trim() : undefined)
  }

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center bg-black/45 backdrop-blur-[2px]"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="bg-white rounded-2xl border border-[#E5E7EB] w-[480px] shadow-2xl overflow-hidden"
        style={{ animation: 'fadeUp 0.2s ease' }}
      >
        {/* Header */}
        <div className={`flex items-center gap-3 px-6 py-4 border-b border-[#E5E7EB] ${isTolak ? 'bg-[#FFEBEE]' : 'bg-[#F1F8E9]'}`}>
          <div className={`w-9 h-9 rounded-[9px] flex items-center justify-center ${isTolak ? 'bg-[#EF9A9A] text-[#C62828]' : 'bg-[#C5E1A5] text-[#33691E]'}`}>
            {isTolak ? <span className="text-[18px]">📝</span> : <CheckCircleIcon />}
          </div>
          <h2 className="text-[15px] font-bold text-[#1A2E1A]">
            {isTolak ? 'Tolak & Kirim Catatan Revisi' : 'Konfirmasi Persetujuan'}
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-[13px] text-[#6B7280] mb-4">
            Pengajuan atas nama:{' '}
            <strong className="text-[#33691E] font-semibold">{item.nama}</strong>
          </p>

          {isTolak ? (
            <>
              <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4">
                Tuliskan catatan revisi yang perlu dilengkapi warga. Catatan ini akan dikirim ke halaman warga.
              </p>
              <label className="block text-[12.5px] font-semibold text-[#1A2E1A] mb-2">
                Catatan Revisi untuk Warga
              </label>
              <textarea
                value={notes}
                onChange={e => { setNotes(e.target.value); setError(false) }}
                placeholder="Contoh: Foto KTP kurang jelas, mohon upload ulang..."
                rows={4}
                className={`w-full resize-y rounded-xl border px-3.5 py-2.5 text-[13px] text-[#1A2E1A] outline-none transition-colors leading-relaxed
                  ${error ? 'border-[#C62828] focus:border-[#C62828]' : 'border-[#E5E7EB] focus:border-[#558B2F]'}`}
              />
              {error && (
                <p className="text-[11.5px] text-[#C62828] mt-1.5">
                  ⚠ Catatan revisi wajib diisi sebelum mengirim.
                </p>
              )}
            </>
          ) : (
            <>
              <div className="flex gap-2.5 bg-[#FFF8E1] border border-[#FFE082] rounded-xl p-3.5 mb-4">
                <span className="text-base mt-0.5 shrink-0">⚠️</span>
                <p className="text-[12.5px] text-[#BF360C] leading-relaxed">
                  Jika Anda menyetujui formulir ini, warga dapat mengambil dokumen di balai desa.
                </p>
              </div>
              <p className="text-[13px] text-[#6B7280] leading-relaxed">
                Pastikan data yang diajukan sudah sesuai dan dokumen dapat diproses lebih lanjut.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-2 justify-end px-6 py-4 bg-[#FAFAFA] border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-[9px] border border-[#E5E7EB] text-[#6B7280] text-[13px] font-medium hover:bg-[#F7F8FA] transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-[9px] text-white text-[13px] font-semibold hover:opacity-85 transition-opacity ${isTolak ? 'bg-[#C62828]' : 'bg-[#33691E]'}`}
          >
            {isTolak ? <><SendIcon /> Kirim Catatan</> : <><CheckIcon /> Setujui</>}
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