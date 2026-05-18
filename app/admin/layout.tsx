import type { ReactNode } from 'react'
import { AdminProvider } from '../../lib/adminContext'
import AdminTopbar from '../../components/admin/navbar'
import AdminToast from '../../components/admin/toast'

export const metadata = {
  title: 'Dashboard Admin — Desa Dradah Blumbang',
  description: 'Panel administrasi digital Desa Dradah Blumbang',
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-[#F7F8FA]">
        <AdminTopbar />
          {children}
        <AdminToast />
      </div>
    </AdminProvider>
  )
}