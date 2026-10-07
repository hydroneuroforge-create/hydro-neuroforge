import { motion } from 'framer-motion'
import { MapPin, Navigation, Clock } from 'lucide-react'
import Section from './Section'
import InstagramIcon from './icons/InstagramIcon'
import {
  LOCATION_NAME,
  LOCATION_FULL,
  MAPS_EMBED_URL,
  MAPS_LINK,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
} from '../config'

export default function Location() {
  return (
    <Section
      id="lokasi"
      eyebrow="Lokasi"
      title="Kunjungi Kami"
      subtitle={`Kami berlokasi di ${LOCATION_NAME}. Kami tunggu kedatangan Anda dan ananda.`}
      className="bg-white"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div
          className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-sky-100"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <iframe
            title="Peta Lokasi Hydro Neuroforge Center"
            src={MAPS_EMBED_URL}
            className="h-80 w-full border-0 lg:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>

        <motion.div
          className="flex flex-col justify-center space-y-5"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex gap-4 rounded-2xl bg-sky-cloud p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-brand to-sky-ocean text-white">
              <MapPin className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-[#0f3b57]">
                Alamat
              </h3>
              <p className="mt-1 text-[#3b6b8a]">{LOCATION_FULL}</p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl bg-sky-cloud p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-mint to-sky-brand text-white">
              <Clock className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-[#0f3b57]">
                Jam Operasional
              </h3>
              <p className="mt-1 text-[#3b6b8a]">
                Berdasarkan janji temu. Hubungi kami untuk penjadwalan sesi.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-brand to-sky-ocean px-6 py-3 font-bold text-white shadow-md transition-transform hover:scale-105"
            >
              <Navigation className="h-5 w-5" />
              Buka di Google Maps
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-sky-brand/40 px-6 py-3 font-bold text-sky-ocean transition-colors hover:bg-sky-50"
            >
              <InstagramIcon className="h-5 w-5" />
              @{INSTAGRAM_HANDLE}
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
