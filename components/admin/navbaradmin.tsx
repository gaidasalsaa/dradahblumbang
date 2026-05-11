'use client'

import { useState, useRef, useEffect } from 'react'
import { useAdmin } from '../../lib/adminContext'
import AdminNotifPanel from './notifpanel'
import Image from 'next/image'

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

export default function AdminTopbar() {
  const { unreadCount } = useAdmin()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const notifRef   = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-7 h-[72px] bg-[#33691E] border-b-[3px] border-[#FFA726] shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/25 shrink-0">
          <Image src="/logo-dradah.png" alt="Logo Desa Dradahblumbang" width={48} height={48} className="object-contain" />
        </div>
        <div className="min-w-0">
          <p className="text-white font-bold text-lg leading-tight tracking-wide truncate">
            Desa Dradahblumbang
          </p>
          <p className="text-white/55 text-[13px] font-normal hidden sm:block">
            Kedungpring, Lamongan
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Notif Button — panel drop-down */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setNotifOpen(v => !v); setProfileOpen(false) }}
            className="relative w-10 h-10 rounded-[10px] bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            title="Notifikasi"
          >
            <BellIcon />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#FFA726] text-[#33691E] text-[9px] font-bold flex items-center justify-center border-2 border-[#33691E]">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)]">
              <AdminNotifPanel onClose={() => setNotifOpen(false)} />
            </div>
          )}
        </div>

        {/* Profile Button — hanya Keluar */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setProfileOpen(v => !v); setNotifOpen(false) }}
            className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-[10px] px-3 py-1.5 text-white hover:bg-white/20 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFA726] text-[#33691E] text-xs font-bold flex items-center justify-center shrink-0">
              A
            </div>
            <span className="text-[15px] font-medium hidden sm:inline">Admin</span>
            <ChevronDownIcon />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] bg-white border border-[#E5E7EB] rounded-xl shadow-xl min-w-[150px] overflow-hidden z-50">
              <button
                onClick={() => alert('Keluar dari sistem...')}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-[#C62828] hover:bg-[#FFEBEE] transition-colors"
              >
                <LogoutIcon />
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}