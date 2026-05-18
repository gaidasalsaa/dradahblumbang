'use client'

import { useState, useCallback } from 'react'
import { LayananTab, Pengajuan } from '../../lib/adminTypes'
import { useAdmin } from '../../lib/adminContext'
import AdminStatCards from '../../components/admin/statistik'
import AdminTabs from '../../components/admin/tabel-tabs'
import AdminTable from '../../components/admin/tabel'
import AdminModalSetuju from '../../components/admin/modal-setuju'
import AdminModalTolak from '../../components/admin/modal-tolak'

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
    <main className="w-full px-7 py-8 pb-16 min-h-screen">
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

      {/* Tabs + Filter + Table */}
      <div>
        <AdminTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          search={search}
          onSearchChange={setSearch}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />
        <AdminTable
          activeTab={activeTab}
          search={search}
          filterStatus={filterStatus}
          onSetuju={setModalSetujuItem}
          onTolak={setModalTolakItem}
        />
      </div>

      {/* Modals */}
      <AdminModalSetuju
        item={modalSetujuItem}
        onConfirm={handleConfirmSetuju}
        onClose={() => setModalSetujuItem(null)}
      />
      <AdminModalTolak
        item={modalTolakItem}
        onSend={handleSendTolak}
        onClose={() => setModalTolakItem(null)}
      />
    </main>
  )
}