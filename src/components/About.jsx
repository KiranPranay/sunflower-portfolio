import { motion } from 'framer-motion'
import {
  GraduationCap,
  ShieldCheck,
  BatteryCharging,
  Sparkles,
  Heart,
  Star,
} from 'lucide-react'
import { profile, education, accentMap } from '../data/portfolio'
import SectionHeading from './ui/SectionHeading'
import {
  fadeUp,
  slideInRight,
  staggerContainer,
  viewport,
  springHover,
} from '../lib/motion'

const highlights = [
  {
    accent: 'rose',
    icon: ShieldCheck,
    title: 'Patent Co-Inventor',
    detail: 'Named on a published Indian patent for an adaptive IoT device.',
  },
  {
    accent: 'sage',
    icon: BatteryCharging,
    title: 'Aerospace-grade Thermal Battery Exposure',
    detail: 'Hands-on time on a live AS9001 thermal battery production line.',
  },
]

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading
        eyebrow="About Me"
        emoji="🌸"
        title={
          <>
            Curious engineer, <span className="text-gradient">calm builder</span>
          </>
        }
        description="Where embedded hardware meets renewable energy — a quick look at who I am and the path that got me here."
        accent="bg-lilac-400"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {/* LEFT — profile panel */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="soft-card relative overflow-hidden p-6 sm:p-8"
        >
          <div className="halo -right-16 -top-16 h-52 w-52 bg-lilac-300/40" aria-hidden="true" />
          <Sparkles
            className="absolute right-6 top-6 h-5 w-5 text-butter-400 animate-twinkle"
            aria-hidden="true"
          />

          {/* avatar mark */}
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <motion.div
              whileHover={springHover}
              className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose-300 via-rose-400 to-lilac-400 font-display text-lg font-bold text-white shadow-cute"
            >
              MS
              <Heart
                className="absolute -bottom-1 -right-1 h-5 w-5 fill-butter-300 text-butter-400 animate-bob"
                aria-hidden="true"
              />
            </motion.div>
            <div>
              <p className="font-display text-lg font-semibold text-plum-900">
                {profile.firstName}&apos;s story
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 font-hand text-lg font-bold text-rose-500">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                EEE · IoT · Patents
              </p>
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-base leading-relaxed text-plum-700"
          >
            {profile.summary}
          </motion.p>

          {/* highlight callouts */}
          <div className="mt-7 flex flex-col gap-3">
            {highlights.map((h) => {
              const a = accentMap[h.accent]
              const Icon = h.icon
              return (
                <motion.div
                  key={h.title}
                  variants={fadeUp}
                  whileHover={springHover}
                  className={`group flex items-start gap-3 rounded-3xl border-2 ${a.border} ${a.softBg} p-4`}
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-plum-700 shadow-soft"
                    style={{ color: a.hex }}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display font-semibold text-plum-900">
                      {h.title}
                    </span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-plum-500">
                      {h.detail}
                    </span>
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* RIGHT — education timeline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative"
        >
          <motion.div variants={fadeUp} className="mb-6 flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-lilac-100 text-lilac-500">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="font-display text-lg font-semibold text-plum-900">
              Education Timeline
            </h3>
            <Star
              className="h-4 w-4 fill-butter-300 text-butter-400 animate-twinkle"
              aria-hidden="true"
            />
          </motion.div>

          <div className="relative pl-9">
            {/* pastel gradient spine */}
            <span
              className="absolute left-[11px] top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-lilac-300 via-sage-300 to-rose-300"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-5">
              {education.map((edu) => {
                const a = accentMap[edu.accent]
                const isCurrent = edu.status === 'current'
                const NodeIcon = isCurrent ? Heart : Star
                return (
                  <motion.div
                    key={edu.degree}
                    variants={slideInRight}
                    whileHover={springHover}
                    className="group relative"
                  >
                    {/* cute heart / star node */}
                    <span
                      className="absolute -left-9 top-4 grid h-6 w-6 place-items-center"
                      aria-hidden="true"
                    >
                      {isCurrent && (
                        <span className="absolute h-6 w-6 rounded-full bg-rose-300 animate-pulse-ring" />
                      )}
                      <NodeIcon
                        className="relative h-[22px] w-[22px] drop-shadow-sm transition-transform duration-300 group-hover:scale-125"
                        style={{ color: a.hex, fill: a.hex }}
                      />
                    </span>

                    <div className={`soft-card border-2 ${a.border} p-5`}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`chip ${a.softBg} ${a.text}`}>
                          {edu.period}
                        </span>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-400 px-2.5 py-1 text-xs font-bold text-white shadow-cute">
                            <span className="h-1.5 w-1.5 rounded-full bg-white animate-twinkle" />
                            Now
                          </span>
                        )}
                      </div>

                      <h4 className="mt-3 font-display text-base font-semibold leading-snug text-plum-900">
                        {edu.degree}
                      </h4>
                      <p className="mt-1 text-sm text-plum-500">{edu.org}</p>
                      <p className={`mt-2 text-sm font-semibold ${a.text}`}>
                        {edu.detail}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
