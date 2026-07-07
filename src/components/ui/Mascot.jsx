import { motion } from 'framer-motion'

/**
 * The site mascot: a cute illustrated girl (soft pastel headscarf, blinking eyes,
 * waving hand) with her little electrical sidekick "Volt" — a smiley battery that
 * bobs and sparks. Fully self-contained SVG + Framer Motion, decorative.
 *
 * Easy to customise: the headscarf is the rose <g id="scarf"> group — swap its
 * fills for a hair style if preferred. Skin/scarf/top colors are the constants below.
 *
 * Props:
 *  - className: sizing/positioning for the wrapper
 */
const SKIN = '#ffd8bd'
const SCARF = '#ffa9c6'
const SCARF_DK = '#ff87ab'
const TOP = '#c9b8f7'
const TOP_DK = '#b49df0'
const INK = '#4e3f5a'

export default function Mascot({ className = '' }) {
  return (
    <motion.div
      className={`relative select-none ${className}`}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 340 360" className="h-full w-full overflow-visible">
        {/* soft glow */}
        <circle cx="160" cy="150" r="120" fill="#ffe1ec" opacity="0.5" />

        {/* ---------------- GIRL ---------------- */}
        {/* body / cute top */}
        <path
          d="M86 214 Q150 184 214 214 L232 330 Q150 348 68 330 Z"
          fill={TOP}
        />
        <path d="M86 214 Q150 184 214 214 L214 232 Q150 210 86 232 Z" fill={TOP_DK} />
        {/* collar heart */}
        <path
          d="M150 226 c-4-6-14-4-14 3 c0 6 9 10 14 15 c5-5 14-9 14-15 c0-7-10-9-14-3z"
          fill="#fff"
          opacity="0.9"
        />

        {/* neck */}
        <rect x="138" y="176" width="24" height="26" rx="10" fill={SKIN} />

        {/* scarf drape behind head */}
        <g id="scarf-back">
          <path
            d="M70 128 Q70 42 150 42 Q230 42 230 128 Q232 178 206 214 L94 214 Q68 178 70 128 Z"
            fill={SCARF}
          />
          <path d="M84 150 Q150 132 216 150 L206 214 L94 214 Z" fill={SCARF_DK} opacity="0.55" />
        </g>

        {/* face */}
        <ellipse cx="150" cy="132" rx="50" ry="54" fill={SKIN} />
        {/* ears */}
        <circle cx="100" cy="136" r="9" fill={SKIN} />
        <circle cx="200" cy="136" r="9" fill={SKIN} />

        {/* scarf front frame (covers forehead + sides, leaves face open) */}
        <g id="scarf">
          <path
            d="M150 40 Q66 40 78 138 Q80 156 92 168 L104 150 Q96 96 150 92 Q204 96 196 150 L208 168 Q220 156 222 138 Q234 40 150 40 Z"
            fill={SCARF}
          />
          {/* little fold + pin */}
          <path d="M104 150 Q100 176 118 196" stroke={SCARF_DK} strokeWidth="6" fill="none" strokeLinecap="round" />
          <circle cx="108" cy="150" r="4" fill="#fff" opacity="0.9" />
        </g>

        {/* eyebrows */}
        <path d="M124 116 q8 -5 16 -1" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M160 115 q8 -4 16 1" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* eyes (blink) */}
        <motion.g
          style={{ transformBox: 'view-box', transformOrigin: '150px 132px' }}
          animate={{ scaleY: [1, 1, 1, 0.12, 1] }}
          transition={{ duration: 4.5, times: [0, 0.9, 0.94, 0.97, 1], repeat: Infinity }}
        >
          <ellipse cx="132" cy="132" rx="6.5" ry="9" fill={INK} />
          <ellipse cx="168" cy="132" rx="6.5" ry="9" fill={INK} />
          <circle cx="134" cy="129" r="2.2" fill="#fff" />
          <circle cx="170" cy="129" r="2.2" fill="#fff" />
        </motion.g>

        {/* blush */}
        <circle cx="120" cy="150" r="9" fill="#ff87ab" opacity="0.45" />
        <circle cx="180" cy="150" r="9" fill="#ff87ab" opacity="0.45" />

        {/* nose + smile */}
        <path d="M148 146 q2 4 4 0" stroke="#eaa98a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M136 156 q14 14 28 0" stroke="#ee5589" strokeWidth="3.5" fill="none" strokeLinecap="round" />

        {/* resting arm (screen-left) */}
        <path d="M92 220 q-16 30 -6 74" stroke={TOP_DK} strokeWidth="20" fill="none" strokeLinecap="round" />
        <circle cx="88" cy="298" r="12" fill={SKIN} />

        {/* waving arm (screen-right) */}
        <motion.g
          style={{ transformBox: 'view-box', transformOrigin: '206px 214px' }}
          animate={{ rotate: [0, 14, -6, 14, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M206 214 q40 -6 52 -60" stroke={TOP_DK} strokeWidth="20" fill="none" strokeLinecap="round" />
          <circle cx="260" cy="150" r="14" fill={SKIN} />
          {/* little sparkle by the hand */}
          <path d="M284 132 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="#ffce54" />
        </motion.g>

        {/* ---------------- VOLT (battery sidekick) ---------------- */}
        <motion.g
          animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformBox: 'view-box', transformOrigin: '262px 288px' }}
        >
          {/* terminal cap */}
          <rect x="250" y="238" width="24" height="12" rx="4" fill="#f7be3f" />
          {/* body */}
          <rect x="234" y="248" width="56" height="66" rx="18" fill="#9fdcbf" stroke="#54bd89" strokeWidth="3" />
          {/* charge fill */}
          <rect x="238" y="286" width="48" height="24" rx="10" fill="#78cda3" />
          {/* bolt on belly */}
          <path d="M266 258 l-10 18 h8 l-4 16 14 -20 h-8 z" fill="#fff" opacity="0.95" />
          {/* face */}
          <circle cx="252" cy="272" r="3" fill={INK} />
          <circle cx="272" cy="272" r="3" fill={INK} />
          <path d="M250 280 q12 8 24 0" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <circle cx="246" cy="280" r="4" fill="#ff87ab" opacity="0.5" />
          <circle cx="278" cy="280" r="4" fill="#ff87ab" opacity="0.5" />
          {/* stubby arms */}
          <path d="M234 280 q-10 2 -12 12" stroke="#54bd89" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M290 280 q10 2 12 12" stroke="#54bd89" strokeWidth="5" fill="none" strokeLinecap="round" />

          {/* twinkle above Volt */}
          <motion.path
            d="M262 220 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z"
            fill="#fb6f9e"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={{ scale: [0.6, 1.1, 0.6], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>
      </svg>
    </motion.div>
  )
}
