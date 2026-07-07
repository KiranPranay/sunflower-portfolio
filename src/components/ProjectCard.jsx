import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useAnimation,
} from 'framer-motion'
import { ShieldCheck, Leaf, Zap, Crown, Sparkles } from 'lucide-react'
import { accentMap } from '../data/portfolio'
import { fadeUp } from '../lib/motion'

/* --------------------------------------------------------------
   Icon lookup for the project "kind" badge.
   -------------------------------------------------------------- */
const ICONS = { shield: ShieldCheck, leaf: Leaf, zap: Zap }
function iconFor(name) {
  return ICONS[name] || Sparkles
}

/* ==============================================================
   BESPOKE ILLUSTRATIONS
   Each is fully self-contained, cute + lightweight, and reacts
   to hover/click. Accent color flows in via `hex` / `soft`.
   All artwork is LIGHT + pastel to match the cute theme.
   ============================================================== */

/* --- 1. Pet feeder: click/hover dispenses bouncing kibble ------ */
function FeederArt({ hovered, hex }) {
  const [pellets, setPellets] = useState([])
  const idRef = useRef(0)

  const dispense = () => {
    const batch = Array.from({ length: 3 }, (_, k) => ({
      id: idRef.current++,
      x: (k - 1) * 9 + (Math.random() - 0.5) * 6,
      delay: k * 0.08,
    }))
    setPellets((p) => [...p, ...batch])
  }
  const remove = (id) => setPellets((p) => p.filter((x) => x.id !== id))

  // Auto-serve a treat the moment the card is hovered.
  useEffect(() => {
    if (hovered) dispense()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered])

  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 200 130" className="h-full w-full" aria-hidden="true">
        {/* dispenser hopper */}
        <motion.g
          animate={hovered ? { y: [0, -2, 0] } : { y: 0 }}
          transition={{ duration: 1.1, repeat: hovered ? Infinity : 0 }}
        >
          <rect x="74" y="8" width="52" height="34" rx="11" fill={hex} />
          <rect x="82" y="15" width="36" height="7" rx="3.5" fill="#fff" opacity="0.6" />
          <path d="M80 42 L120 42 L108 58 L92 58 Z" fill={hex} opacity="0.75" />
          {/* mouth glow when active */}
          <motion.circle
            cx="100"
            cy="58"
            r="4"
            fill="#fff"
            animate={{ opacity: hovered ? [0.35, 0.95, 0.35] : 0.4 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.g>

        {/* falling kibble — warm pellets */}
        <AnimatePresence>
          {pellets.map((p) => (
            <motion.circle
              key={p.id}
              cx={100 + p.x}
              r="3.6"
              fill="#f7be3f"
              stroke="#eaa92a"
              strokeWidth="0.8"
              initial={{ cy: 58, opacity: 0 }}
              animate={{ cy: [58, 74, 94, 89, 94], opacity: [0, 1, 1, 1, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.72, ease: 'easeIn', delay: p.delay }}
              onAnimationComplete={() => remove(p.id)}
            />
          ))}
        </AnimatePresence>

        {/* bowl — pastel rose */}
        <ellipse cx="100" cy="96" rx="46" ry="15" fill={hex} />
        <ellipse cx="100" cy="93" rx="42" ry="12" fill="#fff" opacity="0.8" />
        <path d="M62 96 Q100 118 138 96 Q100 108 62 96 Z" fill={hex} opacity="0.85" />
        {/* little kibble pile in the bowl */}
        <circle cx="92" cy="94" r="3" fill="#f7be3f" />
        <circle cx="100" cy="96" r="3" fill="#eaa92a" />
        <circle cx="108" cy="94" r="3" fill="#f7be3f" />

        {/* IR sensor + blinking dashed beam */}
        <circle cx="52" cy="90" r="3.6" fill={hex} />
        <circle cx="148" cy="90" r="3.6" fill={hex} />
        <line
          x1="56"
          y1="90"
          x2="144"
          y2="90"
          stroke={hex}
          strokeWidth="1.6"
          strokeDasharray="2 4"
          strokeLinecap="round"
          className="animate-blink"
        />
      </svg>

      <button
        type="button"
        onClick={dispense}
        aria-label="Dispense pet food"
        className="absolute inset-0 cursor-pointer"
      />
    </div>
  )
}

/* --- 2. Greenhouse: sprout grows + leaves rustle on hover ------ */
function GreenhouseArt({ hovered, hex }) {
  const [tapped, setTapped] = useState(false)
  const grown = hovered || tapped

  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 200 130" className="h-full w-full" aria-hidden="true">
        {/* glass dome frame */}
        <path
          d="M40 108 L40 60 Q100 14 160 60 L160 108"
          fill="none"
          stroke={hex}
          strokeWidth="1.8"
          strokeOpacity="0.55"
        />
        <line x1="100" y1="20" x2="100" y2="108" stroke={hex} strokeWidth="1" strokeOpacity="0.3" />
        <line x1="40" y1="72" x2="160" y2="72" stroke={hex} strokeWidth="1" strokeOpacity="0.3" />

        {/* sun / light indicator */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '150px 34px' }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="150"
              y1="24"
              x2="150"
              y2="18"
              stroke="#ffce54"
              strokeWidth="1.8"
              strokeLinecap="round"
              transform={`rotate(${i * 45} 150 34)`}
            />
          ))}
        </motion.g>
        <motion.circle
          cx="150"
          cy="34"
          r="7"
          fill="#ffce54"
          animate={{ opacity: grown ? [0.75, 1, 0.75] : 0.7 }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />

        {/* humidity drop */}
        <motion.path
          d="M52 30 q6 8 0 13 q-6 -5 0 -13 Z"
          fill="#7fc7ec"
          animate={{ y: grown ? [0, 2, 0] : 0, opacity: [0.5, 0.95, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* soil — soft pastel mound */}
        <ellipse cx="100" cy="110" rx="34" ry="8" fill="#e0c3a3" />
        <path d="M70 110 Q100 100 130 110 Z" fill="#c99f74" opacity="0.7" />

        {/* growing plant — sage tones */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
          animate={{ scaleY: grown ? 1 : 0.5, scaleX: grown ? 1 : 0.8 }}
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
        >
          <path
            d="M100 108 C99 92 100 80 100 66"
            fill="none"
            stroke="#54bd89"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          {/* left leaf */}
          <motion.path
            d="M100 84 C86 82 78 74 78 66 C90 66 100 72 100 84 Z"
            fill="#9fdcbf"
            style={{ transformBox: 'fill-box', transformOrigin: '100% 100%' }}
            animate={{ rotate: grown ? [-4, 4, -4] : 0 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* right leaf */}
          <motion.path
            d="M100 78 C114 76 122 68 122 60 C110 60 100 66 100 78 Z"
            fill="#78cda3"
            style={{ transformBox: 'fill-box', transformOrigin: '0% 100%' }}
            animate={{ rotate: grown ? [4, -4, 4] : 0 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* sprout bud */}
          <circle cx="100" cy="63" r="4.5" fill="#d8f4e8" stroke="#78cda3" strokeWidth="1" />
        </motion.g>
      </svg>

      <button
        type="button"
        onClick={() => setTapped((t) => !t)}
        aria-label="Grow the plant"
        className="absolute inset-0 cursor-pointer"
      />
    </div>
  )
}

/* --- 3. Solar + piezo tiles: click ripples light -------------- */
function SolarArt({ hovered, hex }) {
  const controls = useAnimation()
  const [burst, setBurst] = useState(0)
  const dim = 'rgba(124,108,136,0.10)'

  const fire = () => {
    setBurst((b) => b + 1)
    controls.start((i) => ({
      fill: [dim, hex, dim],
      transition: { delay: i * 0.1, duration: 0.7, ease: 'easeInOut' },
    }))
  }

  useEffect(() => {
    if (hovered) fire()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered])

  const tiles = [0, 1, 2, 3, 4]

  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 200 130" className="h-full w-full" aria-hidden="true">
        {/* sun */}
        <circle cx="158" cy="26" r="9" fill="#ffce54" />
        {/* light rays on click */}
        <AnimatePresence>
          {burst > 0 && (
            <motion.g
              key={burst}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.9 }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.line
                  key={i}
                  x1="158"
                  y1="26"
                  x2="158"
                  y2="8"
                  stroke="#ffce54"
                  strokeWidth="2"
                  strokeLinecap="round"
                  transform={`rotate(${-40 + i * 20} 158 26)`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                />
              ))}
            </motion.g>
          )}
        </AnimatePresence>

        {/* solar panel (tilted) — pastel butter */}
        <g>
          <path d="M40 58 L120 46 L132 66 L52 78 Z" fill="#fff3cc" stroke={hex} strokeWidth="1.8" />
          {Array.from({ length: 3 }).map((_, r) => (
            <line
              key={`h${r}`}
              x1="44"
              y1={58 + r * 6.5}
              x2="128"
              y2={46 + r * 6.5}
              stroke={hex}
              strokeWidth="0.8"
              strokeOpacity="0.7"
            />
          ))}
          {Array.from({ length: 3 }).map((_, c) => (
            <line
              key={`v${c}`}
              x1={60 + c * 24}
              y1={54 + c * 1}
              x2={68 + c * 24}
              y2={74 + c * 1}
              stroke={hex}
              strokeWidth="0.8"
              strokeOpacity="0.7"
            />
          ))}
          {/* stand */}
          <line x1="86" y1="62" x2="86" y2="92" stroke={hex} strokeWidth="2.4" strokeLinecap="round" />
        </g>

        {/* concentric ripple on click */}
        <AnimatePresence>
          {burst > 0 && (
            <motion.circle
              key={`ring-${burst}`}
              cx="100"
              cy="108"
              r="10"
              fill="none"
              stroke={hex}
              strokeWidth="2"
              initial={{ scale: 0.4, opacity: 0.7 }}
              animate={{ scale: 3.4, opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
            />
          )}
        </AnimatePresence>

        {/* piezo floor tiles */}
        {tiles.map((i) => (
          <motion.rect
            key={i}
            custom={i}
            animate={controls}
            x={40 + i * 25}
            y="100"
            width="20"
            height="14"
            rx="4"
            fill={dim}
            stroke={hex}
            strokeWidth="1.4"
            strokeOpacity="0.7"
          />
        ))}
      </svg>

      <button
        type="button"
        onClick={fire}
        aria-label="Activate piezoelectric tiles"
        className="absolute inset-0 cursor-pointer"
      />
    </div>
  )
}

function Illustration({ type, hovered, hex }) {
  if (type === 'feeder') return <FeederArt hovered={hovered} hex={hex} />
  if (type === 'greenhouse') return <GreenhouseArt hovered={hovered} hex={hex} />
  if (type === 'solar') return <SolarArt hovered={hovered} hex={hex} />
  return null
}

/* ==============================================================
   PROJECT CARD
   ============================================================== */
export default function ProjectCard({ project, index = 0 }) {
  const a = accentMap[project.accent] || accentMap.rose
  const [hovered, setHovered] = useState(false)
  const KindIcon = iconFor(project.icon)
  const isPatent = project.kind === 'Patent'

  return (
    <motion.article
      variants={fadeUp}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className="group relative flex h-full flex-col overflow-hidden soft-card p-5 sm:p-6"
      style={{
        boxShadow: hovered
          ? `0 26px 55px -20px ${a.hex}, 0 0 0 2px ${a.soft}`
          : undefined,
      }}
    >
      {/* soft accent wash + halo */}
      <span
        className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full blur-3xl transition-opacity duration-300"
        style={{ background: a.soft, opacity: hovered ? 1 : 0.6 }}
        aria-hidden="true"
      />

      {/* illustration stage — light pastel */}
      <div
        className={`relative mb-5 h-40 w-full overflow-hidden rounded-[1.35rem] border-2 border-white doodle-bg ${a.softBg}`}
      >
        <Illustration type={project.illustration} hovered={hovered} hex={a.hex} />
      </div>

      {/* badges row */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border-2 border-white px-3 py-1 text-xs font-bold ${a.text} ${a.softBg}`}
        >
          <KindIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {project.kind}
        </span>

        {isPatent && project.published && (
          <span className="inline-flex items-center gap-1 rounded-full border-2 border-white bg-sage-100 px-3 py-1 text-xs font-bold text-sage-600">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {project.published}
          </span>
        )}

        {project.role && (
          <span className="inline-flex items-center gap-1 rounded-full border-2 border-white bg-butter-100 px-3 py-1 text-xs font-bold text-butter-600">
            <Crown className="h-3.5 w-3.5" aria-hidden="true" />
            {project.role}
          </span>
        )}
      </div>

      {/* title + subtitle */}
      <h3 className="font-display text-xl font-bold leading-snug text-plum-900 sm:text-2xl">
        {project.title}
      </h3>
      <p className={`mt-1 text-sm font-semibold ${a.text}`}>{project.subtitle}</p>

      {/* patent number */}
      {project.patentNo && (
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-plum-400">
          {project.patentNo}
        </p>
      )}

      {/* description */}
      <p className="mt-3 text-sm leading-relaxed text-plum-600">
        {project.description}
      </p>

      {/* stack chips */}
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {project.stack.map((tech) => (
          <motion.span
            key={tech}
            whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 320, damping: 18 } }}
            className="chip text-xs"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${a.bg}`} aria-hidden="true" />
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.article>
  )
}
