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
    no: String(no),
    nama: row.nama_warga,
    nik: row.nik,
    tgl: formatTgl(row.tanggal_pengajuan),
    status: row.status,
    tab: jenisToTab(row.jenis_surat),
    file_url: row.file_url ?? undefined,
    rejectNotes: row.catatan_revisi ?? undefined,
    nomorPengajuan: row.nomor_pengajuan ?? undefined,
  }
}

function formatWaktu(tgl: string): string {
  const now = new Date()
  const then = new Date(tgl)
  const diffMs = now.getTime() - then.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffJam = Math.floor(diffMin / 60)
  const diffHari = Math.floor(diffJam / 24)

  if (diffMin < 1)   return 'Baru saja'
  if (diffMin < 60)  return `${diffMin} menit lalu`
  if (diffJam < 24)  return `${diffJam} jam lalu`
  if (diffHari === 1) return 'Kemarin'
  return `${diffHari} hari lalu`
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AdminProvider({ children }: { children: ReactNode }) {
  console.log('[AdminProvider] mounted')
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
  // Kalau disetujui, generate & upload PDF dulu
  if (status === 'Disetujui') {
    const item = pengajuan.find(p => p.id === id)
    if (item) {
      try {
        const { generateAndUploadPDF } = await import('./pdf/generateAndUpload')
        
        // Ambil tanggal_pengajuan dari Supabase (raw ISO string)
        const { data: raw } = await supabase
          .from('pengajuan_surat')
          .select('tanggal_pengajuan, jenis_surat, nomor_pengajuan')
          .eq('id', id)
          .single()

        if (raw) {
          await generateAndUploadPDF(
            id,
            raw.jenis_surat,
            raw.tanggal_pengajuan,
            raw.nomor_pengajuan
          )
        }
      } catch (e) {
        console.error('Generate PDF gagal:', e)
        addToast('error', 'Gagal generate PDF surat.')
        return
      }
    }
  }

  const { error } = await supabase
    .from('pengajuan_surat')
    .update({ status, catatan_revisi: notes ?? null })
    .eq('id', id)

  if (error) {
    addToast('error', 'Gagal memperbarui status. Coba lagi.')
    return
  }

  if (status === 'Disetujui') {
  // Re-fetch row terbaru dari Supabase (sudah ada file_url)
  const { data: updated } = await supabase
    .from('pengajuan_surat')
    .select('*')
    .eq('id', id)
    .single()

  if (updated) {
    setPengajuan(prev =>
      prev.map(p => p.id === id ? {
        ...p,
        status,
        file_url: updated.file_url ?? p.file_url,
        rejectNotes: notes ?? p.rejectNotes,
      } : p)
    )
  }
} else {
  setPengajuan(prev =>
    prev.map(p => p.id === id ? { ...p, status, rejectNotes: notes ?? p.rejectNotes } : p)
  )
}

  addToast('success',
    status === 'Disetujui' ? 'Pengajuan disetujui & PDF berhasil dibuat.' :
    status === 'Ditolak'   ? 'Pengajuan ditolak & catatan dikirim.' :
                             'Status diperbarui.'
  )
}, [addToast, pengajuan])
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

  console.log('[AdminContext] data:', data, 'error:', error) // ← debug

  if (!error && data && data.length > 0) {
    const mapped = (data as PengajuanRow[]).map((row, i) => mapRow(row, i + 1))
    setPengajuan(mapped)

    const notifBaru: Notifikasi[] = (data as PengajuanRow[])
  .filter((r: PengajuanRow) => r.status === 'Menunggu')
  .map((r: PengajuanRow) => ({
    id: r.id,
    nama: r.nama_warga,
    jenis: jenisToTab(r.jenis_surat),
    waktu: formatWaktu(r.tanggal_pengajuan),
    dibaca: false,
  }))
    setNotifikasi(prev => {
      const prevIds = new Set(prev.map(n => n.id))
      const updated = notifBaru.map(n => ({
        ...n,
        dibaca: prev.find(p => p.id === n.id)?.dibaca ?? false,
      }))
      const hasNew = notifBaru.some(n => !prevIds.has(n.id))
      return hasNew ? updated : updated
    })
  } else {
    setPengajuan(MOCK_PENGAJUAN)
  }

  setLoading(false)
}, [])

useEffect(() => {
  fetchData()

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