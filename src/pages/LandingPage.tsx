import { Check, Clock, MapPin, MessageCircle, Star } from 'lucide-react'
import type { ReactNode } from 'react'
import { site } from '../content/site'
import { useReveal } from '../lib/reveal'
import { BenefitIcon } from '../components/BenefitIcon'
import { Faq } from '../components/Faq'
import { FloatingCta } from '../components/FloatingCta'
import { Footer } from '../components/Footer'
import { Location } from '../components/Location'
import { Logo } from '../components/Logo'
import { Partners } from '../components/Partners'
import { Testimonials } from '../components/Testimonials'
import { WaForm } from '../components/WaForm'
import { WaIcon, WaLink } from '../components/WaLink'
import { PoolCanvas } from '../three/PoolCanvas'

/**
 * LANDING PAGE IKLAN (/hydrotherapy)
 * Satu tujuan: chat WhatsApp. Tanpa menu navigasi. Ringan (tanpa Three.js).
 */
function Title({ eyebrow, children, sub }: { eyebrow: string; children: ReactNode; sub?: string }) {
  return (
    <div className="mx-auto mb-9 max-w-2xl text-center" data-reveal>
      <span className="eyebrow bg-aqua/15 text-deep">{eyebrow}</span>
      <h2 className="mt-3 text-[30px] leading-[1.1] font-semibold text-navy sm:text-[44px]">{children}</h2>
      {sub && <p className="mt-3 text-[16px] leading-relaxed text-slate">{sub}</p>}
    </div>
  )
}

const Wave = ({ className = '', fill = '#f5f8f9' }: { className?: string; fill?: string }) => (
  <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={`block h-10 w-full sm:h-16 ${className}`} aria-hidden="true">
    <path d="M0 40c120-30 240-30 360 0s240 30 360 0 240-30 360 0 240 30 360 0v40H0z" fill={fill} />
  </svg>
)

export function LandingPage() {
  useReveal()
  return (
    <>
      <main className="overflow-x-clip bg-foam text-navy">
        {/* ============ HERO ============ */}
        <section className="relative flex min-h-[92svh] flex-col bg-[#21a9bd] text-white">
          <div className="absolute inset-0">
            <PoolCanvas />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(15_32_40/0.55),transparent_22%,transparent_38%,rgb(15_32_40/0.9))]" aria-hidden="true" />
          <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-4">
            <Logo tone="light" size="sm" />
            <WaLink place="lp-header" className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white/95 px-4 text-sm font-bold text-navy shadow">
              <WaIcon className="size-4 text-wa-dark" /> Chat
            </WaLink>
          </header>
          <div className="relative mx-auto mt-auto w-full max-w-6xl px-5 pt-16 pb-12">
            <div className="max-w-2xl">
              <p className="inline-flex animate-[fade-up_.8s_.1s_both] items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold backdrop-blur-sm">
                <span className="flex text-sun" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-3.5 fill-current" />)}
                </span>
                Dipercaya orang tua ABK di Bogor
              </p>
              <h1 className="mt-4 animate-[fade-up_.9s_.2s_both] text-[40px] leading-[1.02] font-semibold sm:text-6xl">
                Anak Lebih <span className="text-sun">Tenang</span>, Fokus & Percaya Diri Lewat Terapi Air
              </h1>
              <p className="mt-4 animate-[fade-up_.9s_.35s_both] text-[17px] leading-relaxed text-white/90">
                Hydrotherapy 1-on-1 untuk anak berkebutuhan khusus usia 2–17 tahun di Sportclub Danau Bogor Raya.
              </p>
              <WaLink place="lp-hero" className="btn-wa mt-6 w-full animate-[fade-up_.9s_.5s_both] text-[16.5px] sm:w-auto">
                <WaIcon /> Konsultasi Gratis via WhatsApp
              </WaLink>
              <p className="mt-3 animate-[fade-up_.9s_.6s_both] text-center text-xs text-white/75 sm:text-left">Gratis · Tanpa kewajiban · Dibalas di jam {site.hours.time}</p>
            </div>
          </div>
        </section>

        {/* ============ BUKTI CEPAT ============ */}
        <section className="px-5 py-12">
          <div className="mx-auto max-w-6xl">
            <Partners tone="light" />
          </div>
        </section>

        {/* ============ MANFAAT ============ */}
        <section className="px-5 py-12">
          <Title eyebrow="Manfaat" sub="Hydrotherapy for Special Needs — berlandaskan riset Center on the Developing Child, Harvard University.">
            Apa yang dilatih di dalam air?
          </Title>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {site.benefits.map((b, i) => (
              <article key={b.title} className="rounded-[26px] bg-white p-5 shadow-[0_14px_40px_-20px_rgb(15_32_40/0.3)]" data-reveal="zoom" data-delay={String(i * 0.06)}>
                <span className={`flex size-12 items-center justify-center rounded-2xl text-white ${['bg-deep', 'bg-[#f2994a]', 'bg-aqua', 'bg-[#6c8cff]'][i]}`}>
                  <BenefitIcon name={b.icon} className="size-6" />
                </span>
                <h3 className="mt-4 text-[17px] leading-tight font-semibold sm:text-xl">{b.title}</h3>
                <p className="mt-2 hidden text-sm leading-relaxed text-slate sm:block">{b.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ============ TESTIMONI ============ */}
        <Wave fill="#dff6f9" />
        <section className="bg-[#dff6f9] py-14">
          <div className="px-5">
            <Title eyebrow="Testimoni asli" sub="Cuplikan percakapan WhatsApp orang tua murid kami.">
              Kata Ayah & Bunda
            </Title>
          </div>
          <div className="px-5 text-navy">
            <Testimonials tone="light" />
          </div>
        </section>
        <Wave fill="#dff6f9" className="rotate-180" />

        {/* ============ ALUR ============ */}
        <section className="px-5 py-14">
          <Title eyebrow="Cara mulai">3 langkah mudah</Title>
          <ol className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
            {site.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-[26px] bg-white p-5 shadow-[0_14px_40px_-20px_rgb(15_32_40/0.3)] md:flex-col" data-reveal data-delay={String(i * 0.1)}>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-sun font-display text-xl font-bold text-navy">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-slate">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ============ HARGA ============ */}
        <section className="px-5 py-14">
          <Title eyebrow="Biaya">Transparan, tanpa biaya tersembunyi</Title>
          <div className="mx-auto max-w-md overflow-hidden rounded-[32px] bg-navy text-white shadow-[0_40px_80px_-30px_rgb(15_32_40/0.6)]" data-reveal="zoom">
            <div className="relative p-7">
              <span className="absolute -top-16 -right-16 size-48 rounded-full bg-aqua/30 blur-3xl" aria-hidden="true" />
              <p className="relative text-sm font-bold tracking-wider text-aqua-soft uppercase">{site.program.name}</p>
              <p className="relative mt-3 flex items-end gap-2">
                <span className="font-display text-5xl font-bold">{site.program.price}</span>
                <span className="pb-1 text-white/70">{site.program.period}</span>
              </p>
              <p className="relative mt-1 text-sm font-semibold text-sun">{site.program.perSession}</p>
              <ul className="relative mt-5 grid gap-2.5">
                {site.program.includes.map((x) => (
                  <li key={x} className="flex items-start gap-2.5 text-[15px]">
                    <Check className="mt-0.5 size-5 shrink-0 text-wa" aria-hidden="true" /> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 p-6">
              <p className="flex gap-2 text-sm leading-relaxed text-white/80">
                <MessageCircle className="mt-0.5 size-5 shrink-0 text-aqua" aria-hidden="true" />
                {site.program.note}
              </p>
              <WaLink place="lp-harga" className="btn-wa mt-5 w-full" message={`${site.waDefaultMessage}\nSaya tertarik dengan ${site.program.name}.`}>
                <WaIcon /> Tanya Jadwal Observasi
              </WaLink>
            </div>
          </div>
        </section>

        {/* ============ FORM ============ */}
        <section id="daftar" className="bg-gradient-to-b from-foam to-[#dff6f9] px-5 py-14">
          <Title eyebrow="Daftar" sub="Isi singkat, lalu WhatsApp terbuka dengan pesan yang sudah tersusun.">
            Ceritakan tentang si kecil
          </Title>
          <div className="mx-auto max-w-2xl" data-reveal>
            <WaForm place="landing" />
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="px-5 py-14">
          <Title eyebrow="FAQ">Masih ragu?</Title>
          <Faq limit={4} tone="light" />
        </section>

        {/* ============ LOKASI ============ */}
        <section className="px-5 py-14">
          <Title eyebrow="Lokasi">
            <span className="inline-flex items-center gap-2"><MapPin className="size-7 text-aqua" aria-hidden="true" /> Danau Bogor Raya</span>
          </Title>
          <div className="mx-auto max-w-5xl">
            <Location tone="light" />
          </div>
        </section>

        {/* ============ CTA AKHIR ============ */}
        <section className="relative overflow-hidden bg-deep px-5 py-16 text-center text-white">
          <span className="absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-aqua/30 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl" data-reveal>
            <h2 className="text-[34px] leading-tight font-semibold sm:text-5xl">Mulai perjalanan si kecil minggu ini</h2>
            <p className="mt-3 flex items-center justify-center gap-2 text-white/80">
              <Clock className="size-4" aria-hidden="true" /> {site.hours.days}, {site.hours.time}
            </p>
            <WaLink place="lp-akhir" className="btn-wa mt-7 w-full px-8 text-[17px] sm:w-auto">
              <WaIcon /> Konsultasi Gratis Sekarang
            </WaLink>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCta tone="light" />
    </>
  )
}
