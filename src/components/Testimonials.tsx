import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import Section from './Section'

// Testimoni contoh — mohon diganti dengan testimoni asli orang tua.
const ITEMS = [
  {
    name: 'Bunda A.',
    role: 'Orang tua ananda, 5 th',
    text: 'Anak saya yang tadinya takut air kini tersenyum setiap sesi. Terapisnya sabar dan penuh kasih. Terima kasih Hydro Neuroforge.',
  },
  {
    name: 'Ayah R.',
    role: 'Orang tua ananda, 7 th',
    text: 'Perkembangan motorik anak kami terlihat nyata setelah rutin hidroterapi. Lingkungannya aman dan menyenangkan untuk anak.',
  },
  {
    name: 'Bunda S.',
    role: 'Orang tua ananda, 4 th',
    text: 'Yang paling saya rasakan: anak jadi lebih tenang dan percaya diri. Benar-benar seperti rumah kedua bagi anak kami.',
  },
]

export default function Testimonials() {
  return (
    <Section
      eyebrow="Kata Orang Tua"
      title="Dipercaya Ratusan Keluarga"
      subtitle="Bukti bahwa ketulusan dan kerja keras membuahkan hasil."
      className="bg-white"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {ITEMS.map((t, i) => (
          <motion.figure
            key={t.name}
            className="flex flex-col rounded-3xl bg-gradient-to-br from-sky-cloud to-white p-7 shadow-md ring-1 ring-sky-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <Quote className="h-8 w-8 text-sky-brand/50" />
            <blockquote className="mt-3 flex-1 leading-relaxed text-[#3b6b8a]">
              “{t.text}”
            </blockquote>
            <div className="mt-4 flex gap-1 text-sunny">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <figcaption className="mt-3">
              <p className="font-display font-bold text-[#0f3b57]">{t.name}</p>
              <p className="text-sm text-sky-ocean">{t.role}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-[#7aa0b7]">
        *Testimoni di atas adalah contoh dan akan diperbarui dengan testimoni asli orang tua.
      </p>
    </Section>
  )
}
