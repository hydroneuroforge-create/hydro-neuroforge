import { PoolCanvas } from '../three/PoolCanvas'
import { Logo } from '../components/Logo'
import { WaIcon, WaLink } from '../components/WaLink'

export function NotFoundPage() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#21a9bd] px-6 text-center text-white">
      <div className="absolute inset-0">
        <PoolCanvas />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-navy/45" aria-hidden="true" />
      <div className="relative">
        <Logo tone="light" />
        <p className="mt-10 font-display text-8xl font-bold">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Ups, halaman ini tenggelam 🫧</h1>
        <p className="mx-auto mt-3 max-w-sm text-white/85">Halaman yang Anda cari tidak ditemukan. Yuk kembali ke permukaan.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="/" className="btn bg-white text-navy">Kembali ke Beranda</a>
          <WaLink place="404" className="btn-wa"><WaIcon /> Chat WhatsApp</WaLink>
        </div>
      </div>
    </main>
  )
}
