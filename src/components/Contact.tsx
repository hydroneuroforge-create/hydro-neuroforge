import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageCircle } from 'lucide-react'
import Section from './Section'
import InstagramIcon from './icons/InstagramIcon'
import {
  WHATSAPP_NUMBER,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  buildWhatsAppLink,
} from '../config'

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [childAge, setChildAge] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text =
      `Halo Hydro Neuroforge Center, saya ingin mendaftarkan anak saya.\n\n` +
      `Nama orang tua: ${name || '-'}\n` +
      `No. HP: ${phone || '-'}\n` +
      `Usia anak: ${childAge || '-'}\n` +
      `Pesan: ${message || '-'}`
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank',
    )
  }

  const inputCls =
    'w-full rounded-xl border border-sky-200 bg-white px-4 py-3 text-[#0f3b57] placeholder-[#9bbdd0] outline-none transition-colors focus:border-sky-brand focus:ring-2 focus:ring-sky-brand/30'

  return (
    <Section
      id="kontak"
      eyebrow="Daftar / Kontak"
      title="Mulai Perjalanan Anak Anda"
      subtitle="Isi formulir di bawah dan kami akan menghubungi Anda, atau langsung chat via WhatsApp."
      className="bg-gradient-to-b from-sky-cloud to-white"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl bg-white p-7 shadow-lg ring-1 ring-sky-100 lg:col-span-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0f3b57]">
                Nama Orang Tua
              </label>
              <input
                className={inputCls}
                placeholder="Nama lengkap Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0f3b57]">
                Nomor HP / WhatsApp
              </label>
              <input
                className={inputCls}
                placeholder="08xxxxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                required
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#0f3b57]">
              Usia Anak
            </label>
            <input
              className={inputCls}
              placeholder="Contoh: 5 tahun"
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#0f3b57]">
              Pesan
            </label>
            <textarea
              className={`${inputCls} min-h-28 resize-y`}
              placeholder="Ceritakan singkat kondisi/kebutuhan anak Anda..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-brand to-sky-ocean px-6 py-3.5 font-bold text-white shadow-md shadow-sky-400/40 transition-transform hover:scale-[1.02]"
          >
            <Send className="h-5 w-5" />
            Kirim via WhatsApp
          </button>
          <p className="text-center text-xs text-[#7aa0b7]">
            Dengan menekan tombol, Anda akan diarahkan ke WhatsApp kami dengan
            pesan yang sudah terisi otomatis.
          </p>
        </motion.form>

        <motion.div
          className="flex flex-col gap-4 lg:col-span-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-3xl bg-[#25D366] p-6 text-white shadow-md transition-transform hover:scale-[1.02]"
          >
            <MessageCircle className="h-10 w-10" />
            <div>
              <p className="font-display text-lg font-bold">Chat WhatsApp</p>
              <p className="text-sm text-white/90">Respon cepat & ramah</p>
            </div>
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-3xl bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] p-6 text-white shadow-md transition-transform hover:scale-[1.02]"
          >
            <InstagramIcon className="h-10 w-10" />
            <div>
              <p className="font-display text-lg font-bold">@{INSTAGRAM_HANDLE}</p>
              <p className="text-sm text-white/90">Lihat keseharian kami</p>
            </div>
          </a>
          <div className="flex-1 rounded-3xl bg-gradient-to-br from-sky-brand to-sky-ocean p-6 text-white">
            <p className="font-display text-xl font-extrabold">
              Menempa Potensi, Merawat Harapan 💙
            </p>
            <p className="mt-2 text-sm text-white/90">
              Setiap anak berhak berkembang. Kami hadir dengan dedikasi,
              profesionalisme, dan hati yang tulus untuk ananda.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
