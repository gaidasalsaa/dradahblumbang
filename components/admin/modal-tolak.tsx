'use client'

import { useEffect, useState } from 'react'
import { Pengajuan } from '../../lib/adminTypes'

interface Props {
  item: Pengajuan | null
  onSend: (notes: string) => void
  onClose: () => void
}

export default function AdminModalTolak({ item, onSend, onClose }: Props) {
  const [notes, setNotes] = useState('')
  const [error, setError] = useState(false)

  // Reset when item changes
  useEffect(() => {
    setNotes(item?.rejectNotes ?? '')
    setError(false)
  }, [item])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSend = () => {
    if (!notes.trim()) {
      setError(true)
      return
    }
    onSend(notes.trim())
  }

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center bg-black/45 backdrop-blur-[2px]"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="bg-white rounded-2xl border border-[#E5E7EB] w-[450px] shadow-2xl overflow-hidden"
        style={{ animation: 'fadeUp 0.2s ease' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 bg-[#FFEBEE] border-b border-[#E5E7EB]">
          <div className="w-9 h-9 rounded-[9px] bg-[#EF9A9A] flex items-center justify-center text-[18px]">
            📝
          </div>
          <h2 className="text-[15px] font-bold text-[#1A2E1A]">
            Tolak &amp; Kirim Catatan Revisi
          </h2>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <p className="text-[13px] text-[#6B7280] mb-4">
            Pengajuan atas nama:{' '}
            <strong className="text-[#33691E] font-semibold">{item.nama}</strong>
          </p>

          <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4">
            Tuliskan catatan revisi yang perlu dilengkapi warga. Catatan ini akan dikirim ke halaman warga.
          </p>

          <label
            className="block text-[12.5px] font-semibold text-[#1A2E1A] mb-2"
          >
            Catatan Revisi untuk Warga
          </label>
          <textarea
            value={notes}
            onChange={e => { setNotes(e.target.value); setError(false) }}
            placeholder="Contoh: Foto KTP kurang jelas, mohon upload ulang. Nomor KK tidak sesuai data RT setempat..."
            rows={4}
            className={`w-full resize-y rounded-xl border px-3.5 py-2.5 text-[13px] text-[#1A2E1A] outline-none transition-colors leading-relaxed
              ${error
                ? 'border-[#C62828] focus:border-[#C62828]'
                : 'border-[#E5E7EB] focus:border-[#558B2F]'
              }`}
          />
          {error && (
            <p className="text-[11.5px] text-[#C62828] mt-1.5">
              ⚠ Catatan revisi wajib diisi sebelum mengirim.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-2 justify-end px-5 py-3.5 bg-[#FAFAFA] border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-[9px] border border-[#E5E7EB] text-[#6B7280] text-[13px] font-medium hover:bg-[#F7F8FA] transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSend}
            className="flex items-center gap-1.5 px-5 py-2 rounded-[9px] bg-[#C62828] text-white text-[13px] font-semibold hover:opacity-85 transition-opacity"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Kirim Catatan
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