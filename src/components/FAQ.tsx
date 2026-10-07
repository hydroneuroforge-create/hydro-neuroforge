import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Section from './Section'

const FAQS = [
  {
    q: 'Apa itu hidroterapi dan apakah aman untuk anak saya?',
    a: 'Hidroterapi adalah terapi yang dilakukan di dalam air hangat. Air membuat tubuh terasa ringan sehingga anak dapat bergerak lebih nyaman. Setiap sesi didampingi terapis berpengalaman dengan prosedur keamanan yang kami jaga dengan serius.',
  },
  {
    q: 'Untuk usia dan kondisi apa saja layanan ini?',
    a: 'Kami melayani anak berkebutuhan khusus dengan berbagai kondisi tumbuh kembang. Program disesuaikan secara individual. Silakan konsultasikan kondisi anak Anda dengan kami melalui WhatsApp untuk penilaian awal.',
  },
  {
    q: 'Berapa lama satu sesi dan seberapa sering disarankan?',
    a: 'Durasi dan frekuensi sesi disesuaikan dengan kebutuhan dan respons anak. Setelah konsultasi awal, tim kami akan menyusun rekomendasi program yang paling sesuai.',
  },
  {
    q: 'Apakah orang tua boleh mendampingi?',
    a: 'Tentu. Kami memahami pentingnya rasa aman bagi anak. Kebijakan pendampingan akan dijelaskan saat konsultasi agar sesi berjalan nyaman dan efektif.',
  },
  {
    q: 'Apa yang perlu dibawa saat sesi pertama?',
    a: 'Umumnya baju renang, handuk, dan perlengkapan pribadi anak. Detail lengkap akan kami informasikan setelah pendaftaran dan penjadwalan sesi pertama.',
  },
  {
    q: 'Bagaimana cara mendaftar?',
    a: 'Sangat mudah — klik tombol WhatsApp atau isi formulir kontak di halaman ini. Tim kami akan menghubungi Anda untuk konsultasi awal dan penjadwalan.',
  },
]

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sky-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base font-bold text-[#0f3b57] sm:text-lg">
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-sky-ocean transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-6 pb-5 leading-relaxed text-[#3b6b8a]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Pertanyaan yang Sering Diajukan"
      subtitle="Hal-hal yang biasa ditanyakan orang tua sebelum bergabung bersama kami."
      className="bg-sky-cloud"
    >
      <div className="mx-auto grid max-w-3xl gap-3">
        {FAQS.map((f, i) => (
          <Item key={f.q} q={f.q} a={f.a} index={i} />
        ))}
      </div>
    </Section>
  )
}
