import type { ReactNode } from 'react'
import { AdminProvider } from '../../lib/adminContext'
import notifikasi from '../../components/admin/notifikasi'
import AdminTopbar from '../../components/admin/navbaradmin'
import AdminToast from '../../components/admin/notifikasi'

export const metadata = {
  title: 'Dashboard Admin — Desa Dradah Blumbang',
  description: 'Panel administrasi digital Desa Dradah Blumbang',
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-[#F7F8FA]" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <AdminTopbar />
        {children}
        <AdminToast />
      </div>
    </AdminProvider>
  )
}