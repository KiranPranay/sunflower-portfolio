import { motion } from 'framer-motion'
import {
  Cpu,
  BatteryCharging,
  BrainCircuit,
  Terminal,
  BadgeCheck,
  Star,
  Sparkles,
} from 'lucide-react'
import { certifications, accentMap } from '../data/portfolio'
import { fadeUp, staggerContainer, viewport, springHover } from '../lib/motion'
import SectionHeading from './ui/SectionHeading'

const iconMap = {
  chip: Cpu,
  battery: BatteryCharging,
  brain: BrainCircuit,
  terminal: Terminal,
}

// Rounded hexagon medallion silhouette.
const hexClip =
  'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'

function Badge({ cert }) {
  const accent = accentMap[cert.accent] || accentMap.rose
  const Icon = iconMap[cert.icon] || Cpu

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{
        y: -8,
        rotate: -1.5,
        transition: { type: 'spring', stiffness: 300, damping: 16 },
      }}
      className="group flex flex-col items-center text-center"
    >
      {/* Medallion */}
      <div className="relative mb-5">
        {/* soft pastel glow halo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full opacity-40 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
          style={{ backgroundColor: accent.hex }}
        />

        {/* gradient ring frame (hexagon) */}
        <motion.div
          whileHover={springHover}
          className="relative grid h-28 w-28 place-items-center p-[4px] sm:h-32 sm:w-32"
          style={{
            clipPath: hexClip,
            backgroundImage: `linear-gradient(140deg, ${accent.hex}, rgba(255,255,255,0.85), ${accent.hex})`,
          }}
        >
          {/* inner cream/white face */}
          <div
            className="relative grid h-full w-full place-items-center overflow-hidden bg-cream-100"
            style={{ clipPath: hexClip }}
          >
            {/* accent tint wash */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: `radial-gradient(72% 72% at 50% 22%, ${accent.soft}, transparent 72%)`,
              }}
            />

            {/* moving shimmer sheen */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />

            {/* center icon */}
            <Icon
              className={`relative h-11 w-11 ${accent.text} drop-shadow-[0_2px_6px_rgba(44,32,56,0.14)] transition-transform duration-300 group-hover:scale-110`}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* verified check pip */}
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={viewport}
          transition={{ type: 'spring', stiffness: 380, damping: 14, delay: 0.25 }}
          className="absolute -right-1 -top-1 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-white shadow-cute-sage"
        >
          <BadgeCheck className="h-5 w-5 text-sage-500" strokeWidth={2.2} aria-hidden="true" />
        </motion.span>

        {/* little sparkle + star sprinkles on hover */}
        <Sparkles
          className={`absolute -left-2 top-1 h-4 w-4 ${accent.text} opacity-0 animate-twinkle transition-opacity duration-300 group-hover:opacity-100`}
          fill="currentColor"
          aria-hidden="true"
        />
        <Star
          className="absolute -left-1 bottom-1 h-4 w-4 text-butter-400 opacity-0 animate-twinkle transition-opacity duration-300 group-hover:opacity-100"
          fill="currentColor"
          aria-hidden="true"
        />
      </div>

      {/* Title + issuer */}
      <h3 className="max-w-[14rem] font-display text-base font-semibold leading-snug text-plum-900">
        {cert.title}
      </h3>
      <p className="mt-1 max-w-[14rem] text-sm text-plum-500">{cert.issuer}</p>
    </motion.article>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <SectionHeading
        eyebrow="Certifications"
        emoji="🏅"
        title="Collectible Badges"
        description="Skills leveled up and unlocked — a growing set of earned badges across semiconductors, energy, AI, and code."
        accent="bg-butter-400"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-14 grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4"
      >
        {certifications.map((cert) => (
          <Badge key={cert.title} cert={cert} />
        ))}
      </motion.div>
    </section>
  )
}
