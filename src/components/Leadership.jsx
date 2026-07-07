import { motion } from 'framer-motion'
import { Crown, Megaphone, GitBranch, Heart, Sparkles } from 'lucide-react'
import { leadership, accentMap } from '../data/portfolio'
import { fadeUp, staggerContainer, viewport } from '../lib/motion'
import SectionHeading from './ui/SectionHeading'

// Map a leadership.icon key -> concrete lucide icon.
const iconMap = {
  crown: Crown,
  megaphone: Megaphone,
  git: GitBranch,
}

// Tiny corner doodles, alternated per card for a hand-drawn sticker feel.
const cornerDoodles = [Heart, Sparkles, Heart]

export default function Leadership() {
  return (
    <section id="leadership" className="section">
      <SectionHeading
        eyebrow="Leadership & Ecosystem"
        title="Community Impact 💖"
        description="Leading teams, shaping communities, and giving back to open source — the people-side of engineering."
        accent="bg-lilac-400"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {leadership.map((item, i) => {
          const accent = accentMap[item.accent] || accentMap.rose
          const Icon = iconMap[item.icon] || Crown
          const Doodle = cornerDoodles[i % cornerDoodles.length]

          return (
            <motion.article
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -10, boxShadow: `0 26px 50px -20px ${accent.soft}` }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group sticker-card relative overflow-hidden p-6"
            >
              {/* Soft accent glow blooming from the corner on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-70"
                style={{ background: accent.soft }}
              />

              {/* Tiny corner doodle */}
              <Doodle
                aria-hidden="true"
                className={`pointer-events-none absolute right-4 top-4 h-5 w-5 ${accent.text} opacity-40 transition-all duration-300 group-hover:rotate-12 group-hover:opacity-80`}
                strokeWidth={2.2}
              />

              <div className="relative flex flex-col gap-4">
                {/* Icon badge */}
                <motion.div
                  className={`grid h-14 w-14 place-items-center rounded-2xl border-2 ${accent.border} ${accent.softBg} ${accent.text} group-hover:animate-wobble`}
                  whileHover={{
                    rotate: [0, -12, 10, -6, 0],
                    scale: 1.08,
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </motion.div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-lg font-bold text-plum-900">
                    {item.title}
                  </h3>
                  <p className={`text-sm font-semibold ${accent.text}`}>
                    {item.org}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-plum-600">
                  {item.blurb}
                </p>
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}
