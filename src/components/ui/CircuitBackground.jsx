import { motion } from 'framer-motion'

/**
 * Cute pastel "doodle wires" background layer — soft dotted circuit traces whose
 * dots gently flow, with pulsing heart nodes. Absolutely positioned +
 * non-interactive. Keeps the electrical theme, but adorable & robust.
 *
 * Props:
 *  - className: positioning / sizing utilities
 *  - opacity:   overall opacity (default 0.7)
 */
export default function CircuitBackground({ className = '', opacity = 0.7 }) {
  const traces = [
    'M18 60 H120 V132 H236',
    'M372 34 V104 H300 V196',
    'M60 250 H176 V196 H316',
    'M356 288 H262 V236',
  ]
  const colors = ['#ffa9c6', '#c9b8f7', '#9fdcbf', '#ffce54']
  const nodes = [
    [120, 60],
    [236, 132],
    [300, 104],
    [176, 196],
  ]

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 400 320"
        fill="none"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* dotted wires whose dots flow along the path */}
        {traces.map((d, i) => (
          <motion.path
            key={`t-${i}`}
            d={d}
            stroke={colors[i % colors.length]}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2 14"
            animate={{ strokeDashoffset: [0, -160] }}
            transition={{
              duration: 6,
              delay: i * 0.6,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* pulsing heart nodes (translate on outer <g>, scale on inner path) */}
        {nodes.map(([cx, cy], i) => (
          <g key={`h-${i}`} transform={`translate(${cx} ${cy})`}>
            <motion.path
              d="M0 -3 C -3 -6 -8 -4 -8 0 C -8 4 -2 6 0 9 C 2 6 8 4 8 0 C 8 -4 3 -6 0 -3 Z"
              fill={colors[i % colors.length]}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              animate={{ scale: [0.85, 1.15, 0.85] }}
              transition={{
                duration: 2.4,
                delay: i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
