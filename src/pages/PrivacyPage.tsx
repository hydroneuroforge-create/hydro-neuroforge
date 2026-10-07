import { ArrowLeft } from 'lucide-react'
import { site } from '../content/site'
import { Footer } from '../components/Footer'
import { Logo } from '../components/Logo'

export function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen bg-foam text-navy">
        <header className="bg-navy">
          <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5">
            <a href="/" aria-label="Beranda"><Logo tone="light" size="sm" /></a>
            <a href="/" className="inline-flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white"><ArrowLeft className="size-4" aria-hidden="true" /> Beranda</a>
          </div>
        </header>
        <article className="mx-auto max-w-3xl px-5 py-12 leading-relaxed [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_p]:text-slate [&_ul]:text-slate">
          <h1 className="text-4xl font-semibold">Kebijakan Privasi</h1>
          <p className="mt-2 text-sm">Berlaku sejak 7 Oktober 2026</p>

          <h2>Data yang kami terima</h2>
          <p>
            Formulir pendaftaran di website ini <strong>tidak menyimpan data apa pun di server</strong>. Saat Ayah/Bunda menekan “Kirim via WhatsApp”, isi formulir (nama orang tua, nama anak, usia, diagnosa, dan kekhawatiran) disusun menjadi pesan dan dikirim melalui aplikasi WhatsApp Anda sendiri ke nomor resmi kami ({site.contact.whatsappDisplay}).
          </p>

          <h2>Penggunaan data</h2>
          <ul>
            <li>Memberikan konsultasi dan menjadwalkan observasi.</li>
            <li>Menyusun materi terapi yang sesuai dengan kebutuhan anak.</li>
            <li>Kami tidak menjual atau membagikan data anak kepada pihak lain.</li>
          </ul>

          <h2>Data kesehatan anak</h2>
          <p>
            Informasi diagnosa termasuk data pribadi yang bersifat spesifik menurut UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi. Kami hanya menggunakannya untuk keperluan layanan dan menjaganya secara rahasia.
          </p>

          <h2>Foto & testimoni</h2>
          <p>Foto kegiatan dan testimoni di website ini telah disamarkan (wajah anak dan nama diburamkan) untuk melindungi privasi anak dan keluarga.</p>

          <h2>Analitik</h2>
          <p>
            Website ini dapat menggunakan Google Analytics dan Meta Pixel untuk memahami jumlah kunjungan dan efektivitas iklan (misalnya jumlah klik tombol WhatsApp). Data ini bersifat agregat dan tidak berisi isi formulir.
          </p>

          <h2>Hak Anda</h2>
          <p>Ayah/Bunda dapat meminta kami menghapus percakapan dan data anak kapan saja dengan menghubungi WhatsApp kami.</p>

          <h2>Kontak</h2>
          <p>
            {site.name} — {site.location.name}, {site.location.city}. WhatsApp {site.contact.whatsappDisplay}, Instagram @{site.contact.instagram}.
          </p>
        </article>
      </main>
      <Footer showCalm={false} />
    </>
  )
}
