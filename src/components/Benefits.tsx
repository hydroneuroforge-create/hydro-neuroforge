import { motion } from 'framer-motion'
import { Brain, Dumbbell, Smile, Users, HeartPulse, Moon } from 'lucide-react'
import Section from './Section'

const BENEFITS = [
  {
    icon: Brain,
    title: 'Menenangkan Sistem Saraf',
    desc: 'Kehangatan dan tekanan air membantu meregulasi sensorik serta menenangkan sistem saraf anak.',
  },
  {
    icon: Dumbbell,
    title: 'Memperkuat Otot',
    desc: 'Resistensi air melatih otot dan koordinasi tanpa membebani sendi anak.',
  },
  {
    icon: Smile,
    title: 'Kepercayaan Diri',
    desc: 'Keberhasilan kecil di air menumbuhkan rasa percaya diri dan kemandirian.',
  },
  {
    icon: Users,
    title: 'Kemampuan Sosial',
    desc: 'Interaksi dalam sesi membangun komunikasi dan keterampilan sosial anak.',
  },
  {
    icon: HeartPulse,
    title: 'Motorik & Keseimbangan',
    desc: 'Gerakan di air meningkatkan motorik kasar, halus, dan keseimbangan tubuh.',
  },
  {
    icon: Moon,
    title: 'Tidur Lebih Nyenyak',
    desc: 'Aktivitas air yang menenangkan membantu pola tidur anak menjadi lebih baik.',
  },
]

export default function Benefits() {
  return (
    <Section
      id="manfaat"
      eyebrow="Manfaat"
      title="Mengapa Hidroterapi?"
      subtitle="Air adalah lingkungan yang aman dan lembut untuk anak bertumbuh — berikut manfaat yang kami rawat setiap sesi."
      className="bg-white"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((b, i) => (
          <motion.div
            key={b.title}
            className="rounded-2xl bg-gradient-to-br from-sky-cloud to-white p-6 shadow-sm ring-1 ring-sky-100 transition-transform hover:-translate-y-1"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-brand to-sky-ocean text-white">
              <b.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-[#0f3b57]">
              {b.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#3b6b8a]">
              {b.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
