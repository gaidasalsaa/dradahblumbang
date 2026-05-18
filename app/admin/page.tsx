'use client'

import { useState, useCallback } from 'react'
import { LayananTab, Pengajuan } from '../../lib/adminTypes'
import { useAdmin } from '../../lib/adminContext'
import AdminStatCards from '../../components/admin/statcard'
import AdminTableSection from '../../components/admin/table-section'
import ModalKonfirmasi from '../../components/admin/modal-konfirmasi'

export default function AdminDashboardPage() {
  const { updateStatus, addToast } = useAdmin()

  // Tab & filter state
  const [activeTab, setActiveTab]       = useState<LayananTab>(0)
  const [search, setSearch]             = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  // Modal state
  const [modalSetujuItem, setModalSetujuItem] = useState<Pengajuan | null>(null)
  const [modalTolakItem, setModalTolakItem]   = useState<Pengajuan | null>(null)

  // Tab switch — reset search & filter
  const handleTabChange = useCallback((tab: LayananTab) => {
    setActiveTab(tab)
    setSearch('')
    setFilterStatus('')
  }, [])

  // Approve flow
  const handleConfirmSetuju = useCallback(() => {
    if (!modalSetujuItem) return
    updateStatus(modalSetujuItem.id, 'Disetujui')
    addToast('success', `Pengajuan ${modalSetujuItem.nama} telah disetujui.`)
    setModalSetujuItem(null)
  }, [modalSetujuItem, updateStatus, addToast])

  // Reject flow
  const handleSendTolak = useCallback((notes: string) => {
    if (!modalTolakItem) return
    updateStatus(modalTolakItem.id, 'Ditolak', notes)
    addToast('error', `Catatan revisi berhasil dikirim ke ${modalTolakItem.nama}.`)
    setModalTolakItem(null)
  }, [modalTolakItem, updateStatus, addToast])

  return (
    <main className="w-full px-6 py-7 pb-16 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-[#33691E] leading-tight">
          Dashboard Admin
        </h1>
        <p className="text-[14px] text-[#6B7280] mt-2 font-normal">
          Kelola pengajuan layanan surat warga Desa Dradahblumbang
        </p>
      </div>

      {/* Stat Cards */}
      <div className="mb-7">
        <AdminStatCards />
      </div>

      {/* Tabs + Filter + Table — sekarang 1 komponen */}
      <AdminTableSection                      // ← ganti 2 komponen jadi 1
        activeTab={activeTab}
        onTabChange={handleTabChange}
        search={search}
        onSearchChange={setSearch}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        onSetuju={setModalSetujuItem}
        onTolak={setModalTolakItem}
      />

      {/* Modals */}
      <ModalKonfirmasi
        type="setuju"
        item={modalSetujuItem}
        onConfirm={handleConfirmSetuju}
        onClose={() => setModalSetujuItem(null)}
      />
      <ModalKonfirmasi
        type="tolak"
        item={modalTolakItem}
        onConfirm={(notes) => handleSendTolak(notes!)}
        onClose={() => setModalTolakItem(null)}
      />
    </main>
  )
}