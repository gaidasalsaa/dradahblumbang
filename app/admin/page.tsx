'use client'

import { useState, useCallback } from 'react'
import { LayananTab, Pengajuan } from '../../lib/adminTypes'
import { useAdmin } from '../../lib/adminContext'
import AdminStatCards from '../../components/admin/statcard'
import AdminTabs from '../../components/admin/statistik'
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
    <main className="max-w-[1020px] mx-auto px-6 py-7 pb-12">
      {/* Page Header */}
      <div className="mb-6">
        <h1
          className="text-[22px] font-bold text-[#33691E] leading-tight"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Dashboard Admin
        </h1>
        <p
          className="text-[13px] text-[#6B7280] mt-1 font-normal"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Kelola pengajuan layanan surat warga Desa Dradah Blumbang
        </p>
      </div>

      {/* Stat Cards */}
      <AdminStatCards />

      {/* Tabs + Filter + Table */}
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