'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { Pengajuan, Notifikasi, StatusType, PengajuanRow } from '../lib/adminTypes'
import { supabase } from '../lib/supabase'
import { MOCK_PENGAJUAN } from '../lib/adminTypes'

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
  loading: boolean
  updateStatus: (id: string, status: StatusType, notes?: string) => Promise<void>
  markNotifRead: (id: string) => void
  addToast: (type: ToastState['type'], message: string) => void
  removeToast: (id: string) => void
  unreadCount: number
}

const AdminContext = createContext<AdminContextValue | null>(null)

// ─── Helper ───────────────────────────────────────────────────────────────────

function jenisToTab(jenis: string): 0 | 1 | 2 | 3 {
  const map: Record<string, 0 | 1 | 2 | 3> = {
    sktm: 0, domisili: 1, sku: 2, skck: 3
  }
  return map[jenis] ?? 0
}

function formatTgl(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

function mapRow(row: PengajuanRow, no: number): Pengajuan {
  return {
    id: row.id,
    no,
    nama: row.nama_warga,
    nik: row.nik,
    tgl: formatTgl(row.tanggal_pengajuan),
    status: row.status,
    tab: jenisToTab(row.jenis_surat),
    file_url: row.file_url ?? undefined,
    rejectNotes: row.catatan_revisi ?? undefined,
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AdminProvider({ children }: { children: ReactNode }) {
  const [pengajuan, setPengajuan]   = useState<Pengajuan[]>([])
  const [notifikasi, setNotifikasi] = useState<Notifikasi[]>([])
  const [toasts, setToasts]         = useState<ToastState[]>([])
  const [loading, setLoading]       = useState(true)

  // ── Toast ────────────────────────────────────────────────────────────────
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

  // ── Update Status ke Supabase ────────────────────────────────────────────
  const updateStatus = useCallback(async (id: string, status: StatusType, notes?: string) => {
    const { error } = await supabase
      .from('pengajuan_surat')
      .update({
        status,
        catatan_revisi: notes ?? null,
      })
      .eq('id', id)

    if (error) {
      addToast('error', 'Gagal memperbarui status. Coba lagi.')
      return
    }

    // Update local state langsung (optimistic) tanpa nunggu refetch
    setPengajuan(prev =>
      prev.map(p => p.id === id ? { ...p, status, rejectNotes: notes ?? p.rejectNotes } : p)
    )

    addToast('success',
      status === 'Disetujui' ? 'Pengajuan berhasil disetujui.' :
      status === 'Ditolak'   ? 'Pengajuan ditolak & catatan dikirim.' :
                               'Status diperbarui.'
    )
  }, [addToast])

  // ── Notifikasi ───────────────────────────────────────────────────────────
  const markNotifRead = useCallback((id: string) => {
    setNotifikasi(prev =>
      prev.map(n => n.id === id ? { ...n, dibaca: true } : n)
    )
  }, [])

  // ── Fetch dari Supabase ──────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('pengajuan_surat')
      .select('*')
      .order('tanggal_pengajuan', { ascending: false })

    if (!error && data && data.length > 0) {
      const mapped = (data as PengajuanRow[]).map((row, i) => mapRow(row, i + 1))
      setPengajuan(mapped)

      // Auto-generate notifikasi dari data yang statusnya Menunggu
      const notifBaru: Notifikasi[] = mapped
        .filter(p => p.status === 'Menunggu')
        .map(p => ({
          id: p.id,
          nama: p.nama,
          jenis: p.tab,
          waktu: p.tgl,
          dibaca: false,
        }))
      setNotifikasi(notifBaru)
    }

    setLoading(false)
  }, [])

  if (pengajuan.length === 0) setPengajuan(MOCK_PENGAJUAN)

  useEffect(() => {
    fetchData()

    // Realtime: auto-refresh kalau ada pengajuan baru dari warga
    const channel = supabase
      .channel('pengajuan_realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'pengajuan_surat',
      }, () => fetchData())
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [fetchData])

  const unreadCount = notifikasi.filter(n => !n.dibaca).length

  return (
    <AdminContext.Provider value={{
      pengajuan, notifikasi, toasts, loading,
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