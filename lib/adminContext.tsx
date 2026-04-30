'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Pengajuan, Notifikasi, StatusType, MOCK_PENGAJUAN, MOCK_NOTIFIKASI } from '../lib/adminTypes'

// ─── Toast State ──────────────────────────────────────────────────────────────

export interface ToastState {
  id: string
  type: 'success' | 'error'
  message: string
}

// ─── Context Shape ────────────────────────────────────────────────────────────

interface AdminContextValue {
  pengajuan: Pengajuan[]
  notifikasi: Notifikasi[]
  toasts: ToastState[]
  updateStatus: (id: string, status: StatusType, notes?: string) => void
  markNotifRead: (id: string) => void
  addToast: (type: ToastState['type'], message: string) => void
  removeToast: (id: string) => void
  unreadCount: number
}

const AdminContext = createContext<AdminContextValue | null>(null)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [pengajuan, setPengajuan] = useState<Pengajuan[]>(MOCK_PENGAJUAN)
  const [notifikasi, setNotifikasi] = useState<Notifikasi[]>(MOCK_NOTIFIKASI)
  const [toasts, setToasts] = useState<ToastState[]>([])

  const updateStatus = useCallback((id: string, status: StatusType, notes?: string) => {
    setPengajuan(prev =>
      prev.map(p => p.id === id ? { ...p, status, rejectNotes: notes ?? p.rejectNotes } : p)
    )
  }, [])

  const markNotifRead = useCallback((id: string) => {
    setNotifikasi(prev =>
      prev.map(n => n.id === id ? { ...n, dibaca: true } : n)
    )
  }, [])

  const addToast = useCallback((type: ToastState['type'], message: string) => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3500)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const unreadCount = notifikasi.filter(n => !n.dibaca).length

  return (
    <AdminContext.Provider value={{
      pengajuan, notifikasi, toasts,
      updateStatus, markNotifRead, addToast, removeToast,
      unreadCount,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}