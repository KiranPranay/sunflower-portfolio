import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../../lib/motion'

/**
 * Cute, consistent section header.
 *
 * Props:
 *  - eyebrow:     handwritten kicker label
 *  - emoji:       optional emoji shown before the eyebrow (default ✨)
 *  - title:       main heading (string or node)
 *  - description: optional supporting paragraph
 *  - align:       'center' | 'left'  (default 'center')
 *  - accent:      squiggle/dot color class, e.g. 'bg-rose-400' (default 'bg-rose-400')
 */
// Map the accent's bg-* class to a concrete hex for the squiggle stroke
// (avoids runtime-built Tailwind classes the JIT can't detect).
const SQUIGGLE_HEX = {
  'bg-rose-400': '#ff87ab',
  'bg-lilac-400': '#b49df0',
  'bg-butter-400': '#ffce54',
  'bg-sage-400': '#78cda3',
  'bg-peach-400': '#ff9a78',
}

export default function SectionHeading({
  eyebrow,
  emoji = '✨',
  title,
  description,
  align = 'center',
  accent = 'bg-rose-400',
}) {
  const centered = align === 'center'
  const squiggleColor = SQUIGGLE_HEX[accent] || '#ff87ab'
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={
        'flex flex-col gap-3 ' +
        (centered ? 'items-center text-center' : 'items-start text-left')
      }
    >
      {eyebrow && (
        <motion.span variants={fadeUp} className="eyebrow">
          <span className="animate-twinkle text-lg not-italic">{emoji}</span>
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        variants={fadeUp}
        className="max-w-3xl text-3xl font-bold leading-[1.1] sm:text-4xl md:text-[2.9rem]"
      >
        {title}
      </motion.h2>

      {/* cute hand-drawn squiggle underline */}
      <motion.svg
        variants={fadeUp}
        width="120"
        height="12"
        viewBox="0 0 120 12"
        fill="none"
        aria-hidden="true"
        className={centered ? 'mx-auto' : ''}
      >
        <path
          d="M2 7 Q 16 1, 30 7 T 58 7 T 86 7 T 118 6"
          stroke={squiggleColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </motion.svg>

      {description && (
        <motion.p
          variants={fadeUp}
          className={
            'max-w-2xl text-base leading-relaxed text-plum-500 sm:text-lg ' +
            (centered ? 'mx-auto' : '')
          }
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
