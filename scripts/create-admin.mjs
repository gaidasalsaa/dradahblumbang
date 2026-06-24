import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://uevdmuwjcrntvbmemvvq.supabase.co'
const SUPABASE_KEY = 'sb_publishable_wUea46zvBfaIBSGegNXLwg_a6biZTKP'

const EMAIL    = 'admin@dradahblumbang.com'
const PASSWORD = 'Dradah@2026'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

console.log('⏳ Membuat user admin...')

const { data, error } = await supabase.auth.signUp({ email: EMAIL, password: PASSWORD })

if (error) {
  console.error('❌ Gagal:', error.message)
  process.exit(1)
}

if (data.user) {
  console.log('✅ User berhasil dibuat!')
  console.log('   Email   :', EMAIL)
  console.log('   Password:', PASSWORD)
  console.log('   Status  :', data.user.email_confirmed_at ? 'Confirmed ✓' : 'Menunggu konfirmasi email (cek inbox atau matikan email confirm di Supabase)')
} else {
  console.log('⚠️  Tidak ada error tapi user null — mungkin sudah ada atau perlu konfirmasi email.')
}
