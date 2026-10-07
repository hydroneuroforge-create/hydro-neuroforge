import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Heart } from 'lucide-react'
import { buildWhatsAppLink, BRAND } from '../config'

// Lazy-load scene 3D agar halaman cepat tampil (penting untuk mobile).
const WaterScene = lazy(() => import('../three/WaterScene'))

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-[#e8f6ff] via-[#d4edff] to-[#bae6fd]"
    >
      {/* Scene 3D sebagai latar */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="h-full w-full bg-gradient-to-br from-sky-soft via-[#d4edff] to-sky-brand" />
          }
        >
          <WaterScene />
        </Suspense>
      </div>

      {/* Overlay lembut agar teks terbaca */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-white/70 via-white/30 to-transparent" />

      <div className="relative z-20 mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 pt-28 pb-20 sm:px-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-sky-ocean shadow-sm backdrop-blur">
            <Heart className="h-4 w-4 fill-sky-brand text-sky-brand" />
            Hidroterapi untuk Anak Berkebutuhan Khusus
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-[#0f3b57] sm:text-5xl lg:text-6xl">
            Menempa Potensi,{' '}
            <span className="bg-gradient-to-r from-sky-brand to-sky-ocean bg-clip-text text-transparent">
              Merawat Harapan
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#3b6b8a] sm:text-lg">
            Di <strong>{BRAND.name}</strong>, setiap anak berhak berkembang —
            sekecil apa pun kemajuannya. Melalui hidroterapi &amp; fun swimming,
            kami membantu menenangkan sistem saraf, memperkuat otot, dan
            membangun kepercayaan diri anak.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-sky-brand to-sky-ocean px-7 py-3.5 font-bold text-white shadow-lg shadow-sky-400/40 transition-transform hover:scale-105"
            >
              Daftarkan Anak Anda
            </a>
            <a
              href="#tentang"
              className="rounded-full border-2 border-sky-brand/40 bg-white/60 px-7 py-3.5 font-bold text-sky-ocean backdrop-blur transition-colors hover:bg-white"
            >
              Kenali Kami
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div>
              <p className="font-display text-2xl font-extrabold text-sky-ocean">
                Ratusan
              </p>
              <p className="text-sm text-[#3b6b8a]">Keluarga percaya</p>
            </div>
            <div className="h-10 w-px bg-sky-300/60" />
            <div>
              <p className="font-display text-2xl font-extrabold text-sky-ocean">
                {BRAND.foundedYear}
              </p>
              <p className="text-sm text-[#3b6b8a]">Berdiri sejak</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indikator scroll */}
      <motion.a
        href="#tentang"
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-sky-ocean"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        aria-label="Gulir ke bawah"
      >
        <ArrowDown className="h-7 w-7" />
      </motion.a>

      {/* Gelombang pemisah */}
      <div className="absolute bottom-0 left-0 right-0 z-10 leading-[0]">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="h-16 w-full sm:h-24"
        >
          <path
            d="M0,40 C240,100 480,0 720,40 C960,80 1200,10 1440,50 L1440,100 L0,100 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  )
}
