'use client'

import { useAdmin } from '../../lib/adminContext'
import { ToastState } from '../../lib/adminContext'

function ToastItem({ toast, onRemove }: { toast: ToastState; onRemove: (id: string) => void }) {
  const isSuccess = toast.type === 'success'
  return (
    <div
      className={`flex items-center gap-3 bg-white border rounded-xl px-4 py-3.5 shadow-xl max-w-[320px]
        ${isSuccess ? 'border-l-4 border-l-[#33691E]' : 'border-l-4 border-l-[#C62828]'}
        border-[#E5E7EB]`}
      style={{ animation: 'slideIn 0.25s ease', fontFamily: 'Poppins, sans-serif' }}
    >
      <span className="text-lg shrink-0">{isSuccess ? '✅' : '📨'}</span>
      <p className="text-[13.5px] font-medium text-[#1A2E1A] leading-snug flex-1">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-[#9CA3AF] hover:text-[#6B7280] text-lg leading-none ml-1 shrink-0"
      >
        ×
      </button>
    </div>
  )
}

export default function AdminToast() {
  const { toasts, removeToast } = useAdmin()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-7 right-7 z-[999] flex flex-col gap-2.5">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onRemove={removeToast} />
      ))}
      <style jsx global>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}