import { Fragment, useEffect, useRef, useState } from 'react'

export interface ChatMessage {
  from?: 'them' | 'me'
  text?: string
  time?: string
  video?: string
  divider?: string
}
export interface Chat {
  caption: string
  clock: string
  messages: readonly ChatMessage[]
}

/** Ubah [[sensor]] menjadi blok buram seperti sensor di screenshot asli. */
function renderText(text: string) {
  const parts = text.split('[[sensor]]')
  return parts.map((p, i) => (
    <Fragment key={i}>
      {p}
      {i < parts.length - 1 && <span className="sensor" style={{ width: `${2.6 + ((i * 7 + p.length) % 3) * 0.7}em` }} aria-label="(disamarkan)" />}
    </Fragment>
  ))
}

const Ticks = () => (
  <svg viewBox="0 0 16 11" className="ml-0.5 inline h-[9px] w-[14px] text-[#53bdeb]" fill="currentColor" aria-label="dibaca">
    <path d="M11.07.65 10.4.13a.37.37 0 0 0-.52.06L4.8 6.7 2.4 4.45a.37.37 0 0 0-.52.02l-.47.5a.37.37 0 0 0 .02.53l3.13 2.92c.16.15.4.13.54-.04L11.13 1.2a.37.37 0 0 0-.06-.55Z" />
    <path d="M15.07.65 14.4.13a.37.37 0 0 0-.52.06L8.8 6.7l-.6-.56-.97 1.13 1.33 1.24c.16.15.4.13.54-.04L15.13 1.2a.37.37 0 0 0-.06-.55Z" />
  </svg>
)

const wallpaper =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23000' stroke-opacity='.05' stroke-width='1.3' stroke-linecap='round'%3E%3Ccircle cx='18' cy='20' r='7'/%3E%3Cpath d='M60 12c6 0 6 10 0 10s-6 10 0 10'/%3E%3Cpath d='M95 15l8 8m0-8l-8 8'/%3E%3Crect x='12' y='60' width='14' height='10' rx='3'/%3E%3Cpath d='M50 62q8-10 16 0t16 0'/%3E%3Cpath d='M98 58l6 12h-12z'/%3E%3Ccircle cx='30' cy='100' r='4'/%3E%3Cpath d='M64 96h14m-7-7v14'/%3E%3Cpath d='M100 98c4-6 12 0 4 6'/%3E%3C/g%3E%3C/svg%3E\")"

export function ChatPhone({ chat, animate = true }: { chat: Chat; animate?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const total = chat.messages.length
  // Saat render server semua pesan tampil (SEO); di browser dianimasikan.
  const [shown, setShown] = useState(total)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (!animate || document.documentElement.classList.contains('calm')) return
    setShown(0)
    const el = ref.current
    if (!el) return
    const timers: number[] = []
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        let t = 250
        chat.messages.forEach((m, i) => {
          const isThem = m.from === 'them'
          if (isThem) {
            timers.push(window.setTimeout(() => setTyping(true), t))
            t += 650
          }
          timers.push(
            window.setTimeout(() => {
              setTyping(false)
              setShown(i + 1)
            }, t),
          )
          t += m.divider ? 250 : 450
        })
      },
      { threshold: 0.45 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [animate, chat.messages])

  useEffect(() => {
    const b = bodyRef.current
    if (b) b.scrollTo({ top: b.scrollHeight, behavior: 'smooth' })
  }, [shown, typing])

  return (
    <figure ref={ref} className="w-[min(82vw,300px)] shrink-0 snap-center">
      <div className="relative overflow-hidden rounded-[38px] border-[7px] border-[#111] bg-[#111] shadow-[0_30px_60px_-25px_rgb(0_0_0/0.7)]">
        {/* Status bar */}
        <div className="flex items-center justify-between bg-[#f6f6f6] px-5 pt-2 pb-1 text-[11px] font-semibold text-black">
          <span>{chat.clock}</span>
          <span className="h-4 w-16 rounded-full bg-[#111]" aria-hidden="true" />
          <span className="flex items-center gap-1" aria-hidden="true">
            <svg viewBox="0 0 18 12" className="h-2.5 w-3.5" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx=".5" /><rect x="5" y="5" width="3" height="7" rx=".5" /><rect x="10" y="2.5" width="3" height="9.5" rx=".5" /><rect x="15" y="0" width="3" height="12" rx=".5" opacity=".35" /></svg>
            <svg viewBox="0 0 16 12" className="h-2.5 w-3.5" fill="currentColor"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.1-1.2A10.2 10.2 0 0 0 8 .5C5.3.5 2.8 1.5.9 3.4L2 4.6a8.5 8.5 0 0 1 6-2.4Zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.1-1.2A7 7 0 0 0 8 3.9a7 7 0 0 0-4.7 1.9l1.1 1.2c1-.9 2.2-1.4 3.6-1.4Zm0 3.3c-.6 0-1.2.2-1.6.6L8 11.5l1.6-2c-.4-.4-1-.6-1.6-.6Z" /></svg>
            <span className="relative inline-flex h-[11px] w-[22px] items-center rounded-[3px] border border-black/40 p-[1px]"><span className="h-full w-[70%] rounded-[1.5px] bg-black" /></span>
          </span>
        </div>
        {/* Header WA */}
        <div className="flex items-center gap-2 border-b border-black/5 bg-[#f6f6f6] px-3 py-2 text-[#007aff]">
          <svg viewBox="0 0 10 18" className="h-4 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M8.5 1.5 1.5 9l7 7.5" /></svg>
          <span className="size-8 shrink-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,#d9c3a5,#7a8f6a_60%,#3d4f3a)] blur-[3px]" aria-hidden="true" />
          <span className="flex-1">
            <span className="block h-3 w-28 rounded bg-black/70 blur-[4px]" aria-label="Nama kontak disamarkan" />
            <span className="mt-1 block h-2 w-14 rounded bg-black/30 blur-[3px]" aria-hidden="true" />
          </span>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="6" width="14" height="12" rx="3" /><path d="m16 10 6-3v10l-6-3" /></svg>
          <svg viewBox="0 0 24 24" className="ml-2 size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 7 7L16 14l5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" /></svg>
        </div>
        {/* Isi chat */}
        <div
          ref={bodyRef}
          className="no-scrollbar flex h-[360px] flex-col gap-1.5 overflow-y-auto bg-[#efeae2] px-2.5 py-3 font-[system-ui,-apple-system,'Segoe_UI',Roboto,sans-serif] text-[13.5px] leading-snug text-[#111b21]"
          style={{ backgroundImage: wallpaper }}
        >
          <div className="mt-auto" />
          {chat.messages.slice(0, shown).map((m, i) =>
            m.divider ? (
              <div key={i} className="my-1 self-center rounded-lg bg-white/90 px-2.5 py-1 text-[11.5px] font-medium text-[#54656f] shadow-sm">
                {m.divider}
              </div>
            ) : (
              <div
                key={i}
                className={`relative max-w-[85%] rounded-lg px-2 pt-1.5 pb-1 shadow-[0_1px_0.5px_rgb(11_20_26/0.13)] motion-safe:animate-[bubble_.35s_ease-out] ${m.from === 'me' ? 'self-end bg-[#d9fdd3]' : 'self-start bg-white'}`}
              >
                {m.video ? (
                  <div className="relative mb-1 h-36 w-52 overflow-hidden rounded-md bg-[linear-gradient(135deg,#f3eee4,#d8cdb8_40%,#c9a98a_70%,#8f9fb4)]">
                    <div className="absolute inset-0 backdrop-blur-[6px]" />
                    <span className="absolute inset-0 m-auto flex size-11 items-center justify-center rounded-full bg-black/45 text-white">
                      <svg viewBox="0 0 24 24" className="ml-0.5 size-5" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                    <span className="absolute bottom-1 left-1.5 text-[11px] font-medium text-white drop-shadow">🎥 {m.video}</span>
                    <span className="sr-only">Video anak sedang membaca buku (disamarkan)</span>
                  </div>
                ) : (
                  <span className="pr-14">{renderText(m.text ?? '')}</span>
                )}
                <span className="float-right -mb-0.5 ml-2 translate-y-1 text-[10.5px] text-[#667781]">
                  {m.time}
                  {m.from === 'me' && <Ticks />}
                </span>
              </div>
            ),
          )}
          {typing && (
            <div className="self-start rounded-lg bg-white px-3 py-2.5 shadow-sm" aria-label="sedang mengetik">
              {[0, 1, 2].map((i) => (
                <span key={i} className="mx-[2px] inline-block size-1.5 rounded-full bg-[#8696a0]" style={{ animation: `typing 1s ${i * 0.15}s infinite` }} />
              ))}
            </div>
          )}
        </div>
        {/* Kolom ketik */}
        <div className="flex items-center gap-2 bg-[#f6f6f6] px-3 py-2 text-[#007aff]" aria-hidden="true">
          <span className="text-xl leading-none">+</span>
          <span className="h-7 flex-1 rounded-full border border-black/10 bg-white" />
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm font-semibold opacity-80">{chat.caption}</figcaption>
    </figure>
  )
}
