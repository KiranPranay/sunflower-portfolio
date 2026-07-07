import { motion } from 'framer-motion'
import { Code2, Cpu, Wrench, Sparkles } from 'lucide-react'
import { skills, accentMap } from '../data/portfolio'
import SectionHeading from './ui/SectionHeading'
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  staggerFast,
  viewport,
} from '../lib/motion'

const iconMap = {
  code: Code2,
  cpu: Cpu,
  wrench: Wrench,
  sparkles: Sparkles,
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      {/* soft decorative halos */}
      <div
        className="halo left-[-4rem] top-10 h-56 w-56 bg-lilac-200/60"
        aria-hidden="true"
      />
      <div
        className="halo bottom-0 right-[-3rem] h-64 w-64 bg-rose-200/50"
        aria-hidden="true"
      />

      <SectionHeading
        eyebrow="things I love making"
        emoji="🧰"
        title={
          <>
            My little <span className="text-gradient">toolbox</span>
          </>
        }
        description="A cozy collection of the languages, boards and tools I reach for when I bring ideas to life."
        accent="bg-lilac-400"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-14 grid gap-6 sm:grid-cols-2"
      >
        {skills.map((group) => {
          const accent = accentMap[group.accent]
          const Icon = iconMap[group.icon] || Sparkles

          return (
            <motion.div
              key={group.group}
              variants={fadeUp}
              whileHover={{
                y: -6,
                transition: { type: 'spring', stiffness: 300, damping: 18 },
              }}
              className="group/card relative"
            >
              {/* accent glow behind the card */}
              <div
                className={
                  'absolute inset-0 -z-10 translate-y-3 scale-95 rounded-[1.75rem] opacity-0 blur-2xl transition duration-500 group-hover/card:opacity-100 ' +
                  accent.softBg
                }
                aria-hidden="true"
              />

              <div className="soft-card h-full p-6 sm:p-7">
                <div className="flex items-center gap-4">
                  {/* accent-tinted icon badge */}
                  <motion.span
                    whileHover={{ rotate: -8, scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                    className={
                      'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-white ' +
                      accent.softBg +
                      ' ' +
                      accent.shadow
                    }
                  >
                    <Icon className={'h-7 w-7 ' + accent.text} strokeWidth={2.4} />
                  </motion.span>

                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-bold text-plum-900">
                      {group.group}
                    </h3>
                    <p className="text-sm font-medium text-plum-500">
                      {group.items.length} favourites {accent.emoji}
                    </p>
                  </div>
                </div>

                {/* floating interactive tags */}
                <motion.ul
                  variants={staggerFast}
                  className="mt-6 flex flex-wrap gap-2.5"
                >
                  {group.items.map((item) => (
                    <motion.li key={item} variants={scaleIn}>
                      <motion.span
                        whileHover={{
                          y: -6,
                          scale: 1.08,
                          rotate: -2,
                          transition: {
                            type: 'spring',
                            stiffness: 380,
                            damping: 14,
                          },
                        }}
                        className={
                          'chip group/chip cursor-default border-2 ' +
                          accent.border +
                          ' ' +
                          accent.softBg +
                          ' ' +
                          accent.text
                        }
                      >
                        {item}
                        <span
                          className="opacity-0 transition duration-200 group-hover/chip:opacity-100"
                          aria-hidden="true"
                        >
                          ✨
                        </span>
                      </motion.span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
