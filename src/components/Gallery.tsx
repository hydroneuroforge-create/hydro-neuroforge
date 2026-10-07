import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Section from './Section'
import InstagramIcon from './icons/InstagramIcon'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../config'

// Placeholder visual bernuansa air. Ganti dengan foto asli / embed Instagram nanti.
const TILES = [
  { label: 'Sesi Hidroterapi', emoji: '🌊', grad: 'from-sky-brand to-sky-ocean' },
  { label: 'Fun Swimming', emoji: '🏊', grad: 'from-mint to-sky-brand' },
  { label: 'Senyum Ceria', emoji: '😊', grad: 'from-sunny to-mint' },
  { label: 'Terapis Kami', emoji: '🤝', grad: 'from-sky-soft to-sky-deep' },
  { label: 'Momen Bahagia', emoji: '💙', grad: 'from-sky-ocean to-sky-brand' },
  { label: 'Kolam Terapi', emoji: '💧', grad: 'from-sky-deep to-mint' },
]

export default function Gallery() {
  return (
    <Section
      id="galeri"
      eyebrow="Gallery"
      title="Momen di Hydro Neuroforge"
      subtitle={
        <>
          Lihat keseharian dan kebahagiaan anak-anak kami di Instagram{' '}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-sky-ocean hover:underline"
          >
            @{INSTAGRAM_HANDLE}
          </a>
          .
        </>
      }
      className="bg-gradient-to-b from-white to-sky-cloud"
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {TILES.map((t, i) => (
          <motion.a
            key={t.label}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${t.grad} p-4 text-white shadow-md`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
          >
            <span className="text-4xl transition-transform duration-300 group-hover:scale-125 sm:text-5xl">
              {t.emoji}
            </span>
            <span className="mt-2 text-center text-sm font-bold drop-shadow">
              {t.label}
            </span>
            <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <InstagramIcon className="h-8 w-8" />
            </span>
          </motion.a>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] px-7 py-3.5 font-bold text-white shadow-lg transition-transform hover:scale-105"
        >
          <InstagramIcon className="h-5 w-5" />
          Lihat Selengkapnya di Instagram
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </Section>
  )
}
