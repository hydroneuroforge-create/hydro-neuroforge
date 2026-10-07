import { motion } from 'framer-motion'
import { Waves, Baby } from 'lucide-react'
import Section from './Section'
import { buildWhatsAppLink } from '../config'

const SERVICES = [
  {
    icon: Waves,
    name: 'Hidroterapi',
    en: 'Hydrotherapy',
    desc: 'Terapi di dalam air hangat yang dirancang khusus untuk menenangkan sistem saraf, memperkuat otot, serta meningkatkan koordinasi dan motorik anak secara bertahap bersama terapis berpengalaman.',
    points: [
      'Menenangkan sistem saraf',
      'Memperkuat otot & motorik',
      'Didampingi terapis profesional',
    ],
    color: 'from-sky-brand to-sky-ocean',
  },
  {
    icon: Baby,
    name: 'Fun Swimming',
    en: 'Fun Swimming',
    desc: 'Sesi berenang menyenangkan yang membangun kepercayaan diri, kemampuan sosial, dan kegembiraan anak di air — tempat belajar sambil bermain dengan rasa aman dan penuh cinta.',
    points: [
      'Membangun kepercayaan diri',
      'Belajar sambil bermain',
      'Suasana aman & ceria',
    ],
    color: 'from-mint to-sky-brand',
  },
]

export default function Services() {
  return (
    <Section
      id="layanan"
      eyebrow="Our Services"
      title="Layanan Kami"
      subtitle="Dua layanan utama yang dirancang dengan hati untuk tumbuh kembang anak."
      className="bg-gradient-to-b from-white to-sky-cloud"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.name}
            className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg shadow-sky-200/40 ring-1 ring-sky-100"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <div
              className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${s.color} opacity-10 transition-transform duration-500 group-hover:scale-150`}
            />
            <span
              className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-md`}
            >
              <s.icon className="h-8 w-8" />
            </span>
            <h3 className="relative mt-5 font-display text-2xl font-extrabold text-[#0f3b57]">
              {s.name}
            </h3>
            <p className="relative text-sm font-semibold uppercase tracking-wider text-sky-brand">
              {s.en}
            </p>
            <p className="relative mt-3 leading-relaxed text-[#3b6b8a]">
              {s.desc}
            </p>
            <ul className="relative mt-5 space-y-2">
              {s.points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2 text-sm font-semibold text-[#0f3b57]"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint/40 text-[11px] text-sky-ocean">
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <a
              href={buildWhatsAppLink(
                `Halo, saya tertarik dengan layanan ${s.name} di Hydro Neuroforge Center.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-6 inline-block font-bold text-sky-ocean hover:underline"
            >
              Tanya layanan ini →
            </a>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
