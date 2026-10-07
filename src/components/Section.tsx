import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type SectionProps = {
  id?: string
  eyebrow?: string
  title?: ReactNode
  subtitle?: ReactNode
  children: ReactNode
  className?: string
}

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
}: SectionProps) {
  return (
    <section id={id} className={`relative px-5 py-20 sm:px-8 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || subtitle) && (
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            {eyebrow && (
              <span className="mb-3 inline-block rounded-full bg-sky-brand/15 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-sky-ocean">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-3xl font-extrabold text-[#0f3b57] sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-base text-[#3b6b8a] sm:text-lg">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}
