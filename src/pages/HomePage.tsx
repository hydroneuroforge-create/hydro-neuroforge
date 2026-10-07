import { BookOpenCheck, Check, ChevronDown, MessageCircle, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { site } from '../content/site'
import { useReveal } from '../lib/reveal'
import { BenefitIcon } from '../components/BenefitIcon'
import { Faq } from '../components/Faq'
import { FloatingCta } from '../components/FloatingCta'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Location } from '../components/Location'
import { Partners } from '../components/Partners'
import { Picture } from '../components/Picture'
import { Testimonials } from '../components/Testimonials'
import { WaForm } from '../components/WaForm'
import { WaIcon, WaLink } from '../components/WaLink'
import { OceanBackground } from '../three/OceanBackground'
import type { ImageName } from '../content/images.generated'
import type { ReactNode } from 'react'

/**
 * BERANDA — perjalanan "menyelam".
 * Atribut data-depth / data-pitch / data-brain / data-assemble pada setiap section
 * mengatur posisi kamera 3D (lihat src/three/DiveScene.tsx).
 */
function SectionTitle({ eyebrow, title, sub, center = true }: { eyebrow: string; title: ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={`mb-10 ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}`} data-reveal>
      <span className="eyebrow bg-navy/60 text-aqua-soft ring-1 ring-aqua/25">{eyebrow}</span>
      <h2 className="mt-4 text-[34px] leading-[1.08] font-semibold [text-shadow:0_2px_22px_rgb(15_32_40/0.75)] sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-[16.5px] leading-relaxed text-white/75">{sub}</p>}
    </div>
  )
}

const blobs = [
  'rounded-[46%_54%_42%_58%/55%_45%_55%_45%]',
  'rounded-[60%_40%_55%_45%/45%_60%_40%_55%]',
  'rounded-[40%_60%_60%_40%/60%_40%_60%_40%]',
]

export function HomePage() {
  useReveal()
  return (
    <>
      <OceanBackground />
      <Header />
      <main className="relative z-10 overflow-x-clip">
        {/* ============ HERO (permukaan) ============ */}
        <section data-depth="5.5" data-pitch="-70" data-brain="1" data-assemble="1" className="relative flex min-h-[100svh] flex-col justify-end">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-navy via-navy/80 to-transparent md:h-[75%]" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-6xl px-5 pt-24 pb-8 md:pb-28">
            <div className="max-w-2xl">
              <p className="eyebrow animate-[fade-up_.8s_.1s_both] bg-white/15 text-white backdrop-blur-sm">
                <Sparkles className="size-3.5 text-sun" aria-hidden="true" /> Terapi air 1-on-1 · Usia 2–17 tahun
              </p>
              <h1 className="mt-4 animate-[fade-up_.9s_.2s_both] text-[42px] leading-[0.98] font-semibold sm:mt-5 sm:text-7xl">
                <span className="text-gradient">Hydrotherapy</span>
                <br />
                for Special Needs
              </h1>
              <p className="mt-4 max-w-xl animate-[fade-up_.9s_.35s_both] text-[16px] leading-relaxed text-white/85 sm:mt-5 sm:text-lg">
                Terapi air 1-on-1 untuk membantu perkembangan otak, emosi, dan motorik anak berkebutuhan khusus di Sportclub Danau Bogor Raya.
              </p>
              <div className="mt-5 flex animate-[fade-up_.9s_.5s_both] flex-col items-start gap-3 sm:mt-7 sm:flex-row sm:items-center">
                <WaLink place="hero" className="btn-wa w-full text-[16px] sm:w-auto">
                  <WaIcon /> Konsultasi Gratis via WhatsApp
                </WaLink>
                <a href="#program" className="btn-ghost hidden sm:inline-flex">
                  Lihat Program & Biaya
                </a>
                <a href="#program" className="text-sm font-semibold text-white/80 underline underline-offset-4 sm:hidden">
                  Lihat program & biaya ↓
                </a>
              </div>
              <ul className="mt-5 flex animate-[fade-up_.9s_.65s_both] flex-wrap gap-x-4 gap-y-1.5 text-[12px] font-medium text-white/75 sm:mt-7 sm:grid sm:grid-cols-3 sm:gap-4 sm:text-[13px]">
                <li className="flex items-center gap-2"><BookOpenCheck className="size-4 shrink-0 text-sun" aria-hidden="true" /> Riset Harvard Center on the Developing Child</li>
                <li className="flex items-center gap-2"><ShieldCheck className="size-4 shrink-0 text-aqua" aria-hidden="true" /> Naungan AASM</li>
                <li className="flex items-center gap-2"><Users className="size-4 shrink-0 text-wa" aria-hidden="true" /> Partner Yayasan Anak Spesial Indonesia</li>
              </ul>
            </div>
          </div>
          <a href="#empati" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center text-xs font-semibold tracking-widest text-white/70 uppercase md:flex">
            Menyelam
            <ChevronDown className="mt-1 size-5 animate-bounce" aria-hidden="true" />
          </a>
        </section>

        {/* ============ EMPATI ============ */}
        <section id="empati" data-depth="-2.5" data-pitch="12" data-brain="0.35" data-assemble="0.15" className="px-5 py-28 sm:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-[34px] leading-[1.12] font-semibold sm:text-6xl" data-reveal>
              Setiap anak punya caranya sendiri untuk <span className="text-sun">tumbuh</span>.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/80" data-reveal data-delay="0.1">
              Di dalam air, tubuh terasa ringan, gerak terasa aman, dan setiap sentuhan air menjadi stimulasi. Di sinilah si kecil belajar — dengan caranya, dalam ritmenya.
            </p>
          </div>
        </section>

        {/* ============ MANFAAT ============ */}
        <section id="manfaat" data-depth="-7" data-pitch="6" data-brain="0.25" data-assemble="0.15" className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle eyebrow="Manfaat Hydrotherapy" title={<>Empat hal yang <span className="text-aqua-soft">kami latih</span> di setiap sesi</>} />
            <div className="grid gap-4 sm:grid-cols-2">
              {site.benefits.map((b, i) => (
                <article key={b.title} className="glass group relative overflow-hidden rounded-[28px] p-6 sm:p-8" data-reveal="zoom" data-delay={String(i * 0.08)}>
                  <span className="absolute -top-10 -right-10 size-36 rounded-full bg-aqua/10 blur-2xl transition group-hover:bg-aqua/20" aria-hidden="true" />
                  <span className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-aqua to-deep text-white shadow-lg shadow-aqua/20">
                    <BenefitIcon name={b.icon} />
                  </span>
                  <h3 className="relative mt-5 text-[22px] leading-tight font-semibold">{b.title}</h3>
                  <p className="relative mt-2 leading-relaxed text-white/75">{b.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ UNTUK SIAPA ============ */}
        <section data-depth="-11" data-pitch="4" data-brain="0.45" data-assemble="0.45" className="px-5 py-20">
          <div className="glass mx-auto max-w-4xl rounded-[32px] p-7 text-center sm:p-12" data-reveal>
            <span className="eyebrow bg-sun/15 text-sun">Untuk siapa?</span>
            <h2 className="mt-4 text-[30px] leading-tight font-semibold sm:text-4xl">Anak berkebutuhan khusus usia 2–17 tahun</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/75">Kami mendampingi anak dengan berbagai kondisi perkembangan, di antaranya:</p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {site.conditions.map((c) => (
                <li key={c} className="rounded-full border border-aqua/30 bg-aqua/10 px-4 py-2 text-sm font-semibold text-aqua-soft">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/60">Kesesuaian program untuk setiap anak ditentukan saat observasi.</p>
          </div>
        </section>

        {/* ============ METODE ============ */}
        <section id="metode" data-depth="-15" data-pitch="2" data-brain="1" data-assemble="1" className="px-5 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-xl">
              <SectionTitle center={false} eyebrow="Dasar ilmiah" title={site.method.title} />
              {site.method.paragraphs.map((p, i) => (
                <p key={i} className="glass mb-4 rounded-3xl p-5 text-[16px] leading-relaxed text-white/85" data-reveal data-delay={String(i * 0.1)}>
                  {p}
                </p>
              ))}
              <div className="mt-6 grid grid-cols-3 gap-3" data-reveal>
                {site.method.pillars.map((p) => (
                  <div key={p.k} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
                    <div className="font-display text-3xl font-semibold text-sun">{p.k}</div>
                    <div className="mt-1 text-xs leading-snug text-white/70">{p.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ ALUR ============ */}
        <section data-depth="-20" data-pitch="0" data-brain="0.4" data-assemble="1" className="px-5 py-20">
          <div className="mx-auto max-w-5xl">
            <SectionTitle eyebrow="Cara memulai" title="Tiga langkah sederhana" />
            <ol className="relative grid gap-5 md:grid-cols-3">
              <span className="absolute top-0 bottom-0 left-[27px] w-px bg-gradient-to-b from-aqua via-aqua/40 to-transparent md:top-[27px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-full md:bg-gradient-to-r" aria-hidden="true" />
              {site.steps.map((s, i) => (
                <li key={s.title} className="relative flex gap-4 md:flex-col" data-reveal data-delay={String(i * 0.12)}>
                  <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sun to-[#ffb347] font-display text-2xl font-bold text-navy shadow-[0_0_0_6px_rgb(15_32_40/0.6)]">
                    {i + 1}
                  </span>
                  <div className="glass flex-1 rounded-3xl p-5">
                    <h3 className="text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/75">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ PROGRAM & HARGA (dasar kolam) ============ */}
        <section id="program" data-depth="-27" data-pitch="-12" data-brain="0" data-assemble="0.6" className="px-5 py-24">
          <div className="mx-auto max-w-5xl">
            <SectionTitle eyebrow="Program & biaya" title="Satu program, sepenuhnya personal" />
            <div className="mx-auto grid max-w-4xl overflow-hidden rounded-[32px] bg-white text-navy shadow-[0_40px_100px_-30px_rgb(0_0_0/0.7)] md:grid-cols-[1.1fr_1fr]" data-reveal="zoom">
              <div className="relative p-7 sm:p-10">
                <span className="eyebrow bg-aqua/15 text-deep">{site.program.name}</span>
                <div className="mt-6 flex items-end gap-2">
                  <span className="font-display text-[46px] leading-none font-bold sm:text-6xl">{site.program.price}</span>
                  <span className="pb-1.5 font-semibold text-slate">{site.program.period}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-deep">{site.program.perSession}</p>
                <ul className="mt-6 grid gap-3">
                  {site.program.includes.map((x) => (
                    <li key={x} className="flex items-start gap-3 text-[15.5px]">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-wa/15 text-wa-dark">
                        <Check className="size-4" aria-hidden="true" />
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-between gap-6 bg-gradient-to-br from-aqua/15 via-foam to-sun/15 p-7 sm:p-10">
                <div>
                  <MessageCircle className="size-9 text-deep" aria-hidden="true" />
                  <p className="mt-3 font-display text-2xl leading-snug font-semibold">Konsultasi via WhatsApp gratis</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate">{site.program.note}</p>
                </div>
                <WaLink place="harga" className="btn-wa w-full" message={`${site.waDefaultMessage}\nSaya tertarik dengan ${site.program.name}.`}>
                  <WaIcon /> Tanya Jadwal Observasi
                </WaLink>
              </div>
            </div>
          </div>
        </section>

        {/* ============ TESTIMONI (naik) ============ */}
        <section id="testimoni" data-depth="-21" data-pitch="12" data-brain="0" className="py-24">
          <div className="px-5">
            <SectionTitle eyebrow="Cerita orang tua" title={<>Perubahan kecil yang <span className="text-sun">berarti besar</span></>} sub="Langsung dari percakapan WhatsApp orang tua murid kami." />
          </div>
          <div className="px-5">
            <Testimonials />
          </div>
        </section>

        {/* ============ GALERI ============ */}
        <section data-depth="-15" data-pitch="16" data-brain="0" className="py-20">
          <div className="px-5">
            <SectionTitle eyebrow="Suasana" title="Kolam yang asri & menenangkan" sub={`${site.location.name} — dikelilingi pepohonan, teduh, dan jauh dari bising kota.`} />
          </div>
          <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-auto md:grid md:max-w-6xl md:grid-cols-3 md:overflow-visible">
            {site.gallery.map((g, i) => (
              <figure key={g.img} className={`relative w-[78vw] shrink-0 snap-center overflow-hidden md:w-auto ${blobs[i % 3]} shadow-[0_25px_60px_-25px_rgb(0_0_0/0.6)]`} data-reveal="zoom" data-delay={String((i % 3) * 0.08)}>
                <Picture name={g.img as ImageName} alt={g.alt} sizes="(min-width: 768px) 33vw, 78vw" imgClassName="aspect-[4/3.4] w-full object-cover" />
              </figure>
            ))}
          </div>
          <p className="mt-3 px-5 text-center text-xs text-white/55">Wajah anak diburamkan untuk menjaga privasi.</p>
        </section>

        {/* ============ PARTNER ============ */}
        <section data-depth="-11" data-pitch="20" data-brain="0" className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <SectionTitle eyebrow="Kredibilitas" title="Didukung lembaga tepercaya" />
            <Partners />
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" data-depth="-8" data-pitch="22" data-brain="0" className="px-5 py-20">
          <SectionTitle eyebrow="Tanya jawab" title="Pertanyaan yang sering diajukan" />
          <Faq />
        </section>

        {/* ============ FORM ============ */}
        <section id="daftar" data-depth="-7" data-pitch="10" data-brain="0" className="px-5 py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.2fr]">
            <div data-reveal="left">
              <span className="eyebrow bg-navy/60 text-wa ring-1 ring-wa/30">Daftar sekarang</span>
              <h2 className="mt-4 text-[34px] leading-[1.08] font-semibold sm:text-5xl">Ceritakan tentang si kecil</h2>
              <p className="mt-4 text-[16.5px] leading-relaxed text-white/75">
                Isi formulir singkat ini — WhatsApp akan terbuka dengan pesan yang sudah tersusun rapi. Tim kami akan membalas untuk konsultasi gratis & menjadwalkan observasi.
              </p>
              <ul className="mt-6 grid gap-2 text-sm text-white/80">
                <li className="flex items-center gap-2"><Check className="size-4 text-wa" aria-hidden="true" /> Gratis konsultasi via WhatsApp</li>
                <li className="flex items-center gap-2"><Check className="size-4 text-wa" aria-hidden="true" /> Balasan di jam operasional {site.hours.time}</li>
                <li className="flex items-center gap-2"><Check className="size-4 text-wa" aria-hidden="true" /> Tanpa kewajiban mendaftar</li>
              </ul>
            </div>
            <div data-reveal="right">
              <WaForm place="beranda" />
            </div>
          </div>
        </section>

        {/* ============ LOKASI ============ */}
        <section id="lokasi" data-depth="-5" data-pitch="16" data-brain="0" className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle eyebrow="Lokasi" title="Temui kami di Danau Bogor Raya" />
            <Location />
          </div>
        </section>

        {/* ============ CTA AKHIR (kembali ke permukaan) ============ */}
        <section data-depth="-2" data-pitch="30" data-brain="0" className="px-5 pt-16 pb-28 text-center">
          <div className="mx-auto max-w-3xl" data-reveal>
            <h2 className="text-[38px] leading-[1.05] font-semibold [text-shadow:0_2px_24px_rgb(15_32_40/0.6)] sm:text-6xl">
              Langkah kecil hari ini,
              <br />
              <span className="text-gradient">lompatan besar</span> untuk si kecil.
            </h2>
            <WaLink place="cta-akhir" className="btn-wa mt-8 px-8 text-[17px]">
              <WaIcon /> Konsultasi Gratis Sekarang
            </WaLink>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCta />
    </>
  )
}
