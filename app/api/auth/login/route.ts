import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const validEmail    = process.env.ADMIN_EMAIL
    const validPassword = process.env.ADMIN_PASSWORD

    if (!validEmail || !validPassword) {
      return NextResponse.json(
        { message: 'Konfigurasi server belum lengkap.' },
        { status: 500 }
      )
    }

    if (email !== validEmail || password !== validPassword) {
      // Delay kecil biar tidak mudah di-brute force
      await new Promise(r => setTimeout(r, 800))
      return NextResponse.json(
        { message: 'Email atau password salah.' },
        { status: 401 }
      )
    }

    // Set session cookie (httpOnly — tidak bisa dibaca JS browser)
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 jam
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    )
  }
}
