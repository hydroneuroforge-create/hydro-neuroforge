import { motion } from 'framer-motion'
import { Sparkles, Target, HandHeart } from 'lucide-react'
import Section from './Section'
import { BRAND } from '../config'

const STORY = [
  'Semua berawal dari satu keyakinan: setiap anak berhak berkembang, sekecil apa pun kemajuannya.',
  'Berangkat dari keresahan melihat banyak orang tua kesulitan menemukan terapi yang tepat, Pak Syaif mempelajari hidroterapi — terapi di air yang menenangkan sistem saraf, memperkuat otot, dan membangun kepercayaan diri anak.',
  'Pada 2025, Hydro Neuroforge Center lahir. Nama "Neuroforge" berarti menempa kembali jalur saraf anak, membangun koneksi baru agar mereka bisa bergerak, berbicara, dan berinteraksi lebih baik.',
  'Dimulai dari satu kolam dan segelintir terapis, kini kami dipercaya ratusan keluarga — bukti bahwa ketulusan dan kerja keras membuahkan hasil.',
]

const PILLARS = [
  {
    icon: Target,
    title: 'Visi Kami',
    text: 'Menjadi rumah kedua bagi anak-anak hebat — tempat mereka merasa aman, dicintai, dan didorong untuk maju.',
  },
  {
    icon: HandHeart,
    title: 'Janji Kami',
    text: 'Kami tidak menjanjikan keajaiban. Kami menjanjikan dedikasi, profesionalisme, dan hati yang tulus.',
  },
  {
    icon: Sparkles,
    title: 'Makna Neuroforge',
    text: 'Menempa kembali jalur saraf anak, membangun koneksi baru untuk bergerak, berbicara, dan berinteraksi lebih baik.',
  },
]

export default function About() {
  return (
    <Section
      id="tentang"
      eyebrow="Tentang Kami"
      title="Cerita di Balik Hydro Neuroforge"
      className="bg-white"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          {STORY.map((p, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-[#3b6b8a] sm:text-lg"
            >
              {p}
            </p>
          ))}
          <div className="mt-6 rounded-2xl border-l-4 border-sky-brand bg-sky-50 p-5">
            <p className="font-display text-lg font-bold text-[#0f3b57]">
              “{BRAND.tagline}.”
            </p>
            <p className="mt-1 text-sm text-[#3b6b8a]">
              — {BRAND.founder}, Pendiri {BRAND.name}
            </p>
          </div>
        </motion.div>

        <div className="space-y-5">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="flex gap-4 rounded-2xl bg-gradient-to-br from-sky-cloud to-white p-6 shadow-sm shadow-sky-200/50 ring-1 ring-sky-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-brand to-sky-ocean text-white">
                <pillar.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-[#0f3b57]">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#3b6b8a]">
                  {pillar.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
