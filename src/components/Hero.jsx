import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, ArrowRight, Sparkles, Heart, ChevronDown, Zap } from 'lucide-react'
import { profile, accentMap } from '../data/portfolio'
import { fadeUp, fadeDown, staggerContainer, springHover, springTap } from '../lib/motion'
import Particles from './ui/Particles'
import Mascot from './ui/Mascot'

// Split the full name so the last word wraps onto its own line nicely.
const nameParts = profile.name.trim().split(' ')
const nameHead = nameParts.slice(0, -1).join(' ')
const nameTail = nameParts.slice(-1)[0]

// Local hero-only variants (kept in the shared feel, but this is above the fold
// so we play on mount with `animate` rather than whileInView).
const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.roles.length)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-mesh-cute"
    >
      {/* ---- Background layers (back to front) ---- */}
      <div aria-hidden="true" className="doodle-bg absolute inset-0 opacity-50" />

      <div
        aria-hidden="true"
        className="halo left-[-6rem] top-[-3rem] h-72 w-72 animate-float-slow bg-rose-300/40"
      />
      <div
        aria-hidden="true"
        className="halo bottom-[-6rem] right-[4rem] h-80 w-80 animate-float bg-lilac-300/40"
      />
      <div
        aria-hidden="true"
        className="halo bottom-10 left-1/3 h-56 w-56 bg-butter-300/30"
      />

      <Particles count={18} />

      {/* ---- Content ---- */}
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-8">
        {/* LEFT: copy */}
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6"
        >
          <motion.span variants={fadeDown} className="eyebrow">
            <Sparkles className="h-4 w-4 animate-twinkle" aria-hidden="true" />
            Available for internships
            <span aria-hidden="true">✨</span>
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient-anim">{nameHead}</span>{' '}
            <span className="block text-gradient-anim">{nameTail}</span>
          </motion.h1>

          {/* Rotating role line — cute pill, fixed height to avoid layout shift */}
          <motion.div
            variants={fadeUp}
            className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-white bg-white/80 px-4 shadow-cute backdrop-blur-sm"
          >
            <Zap
              className="h-4 w-4 shrink-0 text-butter-500"
              aria-hidden="true"
            />
            <span className="relative min-w-0">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="inline-block whitespace-nowrap text-sm font-semibold text-plum-700 sm:text-base"
                >
                  {profile.roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 rounded-full bg-rose-400 animate-blink" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base leading-relaxed text-plum-600 sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
            <motion.a
              href="#projects"
              whileHover={springHover}
              whileTap={springTap}
              className="btn-primary"
            >
              <Rocket className="h-4 w-4" aria-hidden="true" />
              Explore My Lab
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={springHover}
              whileTap={springTap}
              className="btn-ghost"
            >
              <Heart className="h-4 w-4 text-rose-400" aria-hidden="true" />
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.ul
            variants={staggerContainer}
            className="mt-2 grid w-full max-w-xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {profile.highlights.map((h) => {
              const accent = accentMap[h.accent] || accentMap.rose
              return (
                <motion.li
                  key={h.label}
                  variants={fadeUp}
                  whileHover={springHover}
                  className={`sticker-card flex flex-col gap-0.5 px-3 py-3 ${accent.shadow}`}
                >
                  <span className="mb-0.5 text-lg leading-none" aria-hidden="true">
                    {accent.emoji}
                  </span>
                  <span
                    className={`text-2xl font-bold leading-none ${accent.text} font-display`}
                  >
                    {h.value}
                  </span>
                  <span className="text-xs leading-tight text-plum-500">
                    {h.label}
                  </span>
                </motion.li>
              )
            })}
          </motion.ul>
        </motion.div>

        {/* RIGHT: cute mascot graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-lg"
        >
          {/* soft glow behind mascot */}
          <div
            aria-hidden="true"
            className="halo inset-8 bg-rose-300/40"
          />
          <Mascot className="mx-auto w-[280px] sm:w-[340px] lg:w-[440px]" />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-plum-400 transition hover:text-rose-500 sm:flex"
      >
        <span className="font-hand text-sm font-bold">scroll</span>
        <motion.span
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-rose-300 bg-white shadow-cute"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4 text-rose-400" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  )
}
