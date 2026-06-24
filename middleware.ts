import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = request.cookies.get('admin_session')?.value

  // Proteksi /admin — redirect ke login kalau belum ada sesi
  if (pathname.startsWith('/admin') && session !== 'authenticated') {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/auth/login'
    return NextResponse.redirect(loginUrl)
  }

  // Kalau sudah login dan akses /auth/login → redirect ke dashboard
  if (pathname.startsWith('/auth/login') && session === 'authenticated') {
    const adminUrl = request.nextUrl.clone()
    adminUrl.pathname = '/admin'
    return NextResponse.redirect(adminUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/auth/login'],
}
