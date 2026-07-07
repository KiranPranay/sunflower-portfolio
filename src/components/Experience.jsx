import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
} from 'framer-motion'
import {
  BatteryCharging,
  Zap,
  Factory,
  CheckCircle2,
  Cpu,
  Heart,
  Sparkles,
} from 'lucide-react'
import { experience } from '../data/portfolio'
import SectionHeading from './ui/SectionHeading'
import { fadeUp, staggerContainer, staggerFast, viewport, scaleIn } from '../lib/motion'

/**
 * A single industrial-experience card — cute & pillowy. Robust for N roles.
 */
function ExperienceCard({ exp }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 320, damping: 20 } }}
      className="soft-card relative overflow-hidden p-6 sm:p-8"
    >
      {/* soft accent halo */}
      <span
        aria-hidden="true"
        className="halo -right-10 -top-10 h-40 w-40 bg-sage-200/60"
      />

      <div className="relative flex flex-col gap-4">
        {/* header row */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-2 border-white bg-gradient-to-br from-sage-200 to-sage-300 text-sage-600 shadow-cute-sage">
              <Factory className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-bold leading-snug text-plum-900 sm:text-xl">
                {exp.role}
              </h3>
              <p className="text-sm text-plum-500">{exp.org}</p>
            </div>
          </div>

          {exp.period && (
            <span className="chip whitespace-nowrap border-sage-200 bg-sage-100 text-xs text-sage-600">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              {exp.period}
            </span>
          )}
        </div>

        {/* division badge */}
        {exp.division && (
          <span className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-lilac-200 bg-lilac-100 px-3 py-1.5 text-xs font-semibold text-lilac-600">
            <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
            {exp.division}
          </span>
        )}

        {/* bullet points */}
        {exp.points?.length > 0 && (
          <motion.ul
            variants={staggerFast}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-1 flex flex-col gap-2.5"
          >
            {exp.points.map((point, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-plum-700"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-rose-400"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}

        {/* tags */}
        {exp.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {exp.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.06, rotate: -2 }}
                transition={{ type: 'spring', stiffness: 320, damping: 16 }}
                className="chip hover:border-rose-300 hover:bg-rose-100 hover:text-rose-500"
              >
                <Heart className="h-3 w-3 text-rose-400" aria-hidden="true" />
                {tag}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}

/**
 * Scroll-driven CUTE smiley battery that charges from sage -> butter as the
 * section passes. The `progress` MotionValue (0 -> 100) is derived from scroll.
 */
function ScrollBattery({ progress }) {
  const [pct, setPct] = useState(0)

  useMotionValueEvent(progress, 'change', (v) => setPct(Math.round(v)))

  const width = useMotionTemplate`${progress}%`
  const glow = useTransform(progress, [0, 100], [0.25, 1])
  const cheeks = useTransform(progress, [30, 60], [0, 1])
  const bolts = [0, 1, 2, 3]
  const cells = [0, 1, 2, 3, 4, 5]

  return (
    <motion.div
      variants={scaleIn}
      className="soft-card relative flex flex-col items-center gap-6 overflow-hidden p-6 sm:p-8 lg:h-full lg:justify-center"
    >
      <span aria-hidden="true" className="halo -bottom-12 left-1/2 h-40 w-40 -translate-x-1/2 bg-butter-200/70" />

      {/* label */}
      <div className="relative flex items-center gap-2 text-sage-600">
        <BatteryCharging className="h-5 w-5 animate-bob" aria-hidden="true" />
        <span className="font-hand text-lg font-bold text-rose-500">
          Charge Log
        </span>
      </div>

      {/* the cute smiley battery */}
      <div className="relative flex items-center">
        <div className="relative h-28 w-44 rounded-[1.4rem] border-[3px] border-plum-900/10 bg-cream-200 p-2.5 shadow-soft sm:h-32 sm:w-52">
          {/* fill */}
          <motion.div
            style={{ width }}
            className="relative h-full overflow-hidden rounded-[1rem]"
          >
            <div
              className="absolute inset-0 rounded-[1rem]"
              style={{
                backgroundImage:
                  'linear-gradient(120deg, #9fdcbf, #78cda3 42%, #ffce54)',
              }}
            />
            {/* brightening glow overlay */}
            <motion.div
              aria-hidden="true"
              style={{ opacity: glow, boxShadow: '0 0 24px 4px rgba(255,206,84,0.65) inset' }}
              className="absolute inset-0 rounded-[1rem]"
            />
            {/* sparkly energy bits skimming along the fill */}
            {bolts.map((b) => (
              <motion.span
                key={b}
                aria-hidden="true"
                className="absolute top-1/2 h-1.5 w-1.5 rounded-full bg-white"
                style={{ boxShadow: '0 0 8px #fff, 0 0 14px #ffce54' }}
                animate={{ x: ['-10%', '260%'], opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.8,
                  delay: b * 0.45,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>

          {/* cute little face + blush cheeks */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-plum-900 animate-blink" />
                <span className="h-1.5 w-1.5 rounded-full bg-plum-900 animate-blink" />
              </div>
              {/* smiley mouth */}
              <svg width="18" height="9" viewBox="0 0 18 9" fill="none" aria-hidden="true">
                <path
                  d="M2 2 Q 9 9 16 2"
                  stroke="#2c2038"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            {/* blush cheeks fade in as it charges */}
            <motion.span
              style={{ opacity: cheeks }}
              className="absolute left-[24%] top-[52%] h-2 w-3 -translate-y-1/2 rounded-full bg-rose-400/70 blur-[1px]"
            />
            <motion.span
              style={{ opacity: cheeks }}
              className="absolute right-[24%] top-[52%] h-2 w-3 -translate-y-1/2 rounded-full bg-rose-400/70 blur-[1px]"
            />
          </div>

          {/* live percentage pill + lightning */}
          <div className="pointer-events-none absolute -bottom-3.5 left-1/2 -translate-x-1/2">
            <span className="flex items-center gap-1 rounded-full border-2 border-white bg-gradient-to-r from-rose-400 to-lilac-400 px-2.5 py-1 text-sm font-bold text-white shadow-cute">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              {pct}%
            </span>
          </div>
        </div>

        {/* terminal nub */}
        <span
          aria-hidden="true"
          className="ml-1 h-9 w-3 rounded-r-lg border-[3px] border-l-0 border-plum-900/10 bg-cream-200 sm:h-11"
        />
      </div>

      <p className="relative mt-2 max-w-[15rem] text-center text-xs leading-relaxed text-plum-500">
        Every shift on the line topped up hands-on, aerospace-grade
        manufacturing experience.
      </p>

      {/* row of little battery cells that light up in sequence */}
      <div className="relative flex items-end gap-2" aria-hidden="true">
        {cells.map((c) => (
          <motion.span
            key={c}
            className="h-7 w-3 rounded-full border-2 border-plum-900/5 bg-cream-300"
            animate={{
              backgroundColor: ['#ffece0', '#78cda3', '#ffce54', '#ffece0'],
              boxShadow: [
                '0 0 0px rgba(120,205,163,0)',
                '0 0 10px rgba(120,205,163,0.7)',
                '0 0 10px rgba(255,206,84,0.7)',
                '0 0 0px rgba(255,206,84,0)',
              ],
            }}
            transition={{
              duration: 2,
              delay: c * 0.18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* a couple of floating sparkles for extra cute */}
      <Sparkles
        aria-hidden="true"
        className="absolute right-5 top-5 h-5 w-5 text-butter-400 animate-twinkle"
      />
    </motion.div>
  )
}

export default function Experience() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Charge up while the section travels through the viewport, then hold full.
  const progress = useTransform(scrollYProgress, [0.05, 0.7], [0, 100], {
    clamp: true,
  })

  return (
    <section id="experience" ref={sectionRef} className="section">
      <SectionHeading
        eyebrow="Industrial Experience"
        emoji="🔋"
        title={
          <>
            Charged Up on the{' '}
            <span className="text-gradient-anim">Production Line</span>
          </>
        }
        description="Real hands-on time inside an aerospace-grade thermal battery plant — assembly, inspection, and high-reliability workflows."
        accent="bg-sage-400"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1fr_20rem]"
      >
        {/* experience cards (robust for N roles) */}
        <div className="flex flex-col gap-6">
          {experience.map((exp, i) => (
            <ExperienceCard key={`${exp.org}-${i}`} exp={exp} />
          ))}
        </div>

        {/* battery companion panel */}
        <ScrollBattery progress={progress} />
      </motion.div>
    </section>
  )
}
