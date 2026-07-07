import { useMemo } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#ff87ab', '#b49df0', '#ffce54', '#78cda3', '#ff9a78']

// Cute little shapes that float around: hearts, stars, sparkles, dots.
function Shape({ kind, color, size }) {
  if (kind === 'heart') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 21s-7.5-4.9-10-9.3C.4 8.9 1.9 5.5 5.2 5.5c2 0 3.3 1.2 3.8 2.2h.9C10.5 6.7 11.8 5.5 13.8 5.5c3.3 0 4.8 3.4 3.2 6.2C19.5 16.1 12 21 12 21z" />
      </svg>
    )
  }
  if (kind === 'star') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2l2.6 6.5L21 9.2l-5 4.3 1.6 6.5L12 16.8 6.4 20l1.6-6.5-5-4.3 6.4-.7z" />
      </svg>
    )
  }
  if (kind === 'sparkle') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 0c.6 5.6 2.4 7.4 8 8-5.6.6-7.4 2.4-8 8-.6-5.6-2.4-7.4-8-8 5.6-.6 7.4-2.4 8-8z" />
      </svg>
    )
  }
  // dot
  return (
    <span
      style={{
        width: size,
        height: size,
        background: color,
        display: 'block',
        borderRadius: '9999px',
      }}
    />
  )
}

/**
 * Lightweight floating "cute confetti" field — hearts, stars, sparkles & dots.
 * Purely decorative + pointer-events-none. Positions generated once (useMemo)
 * so they stay stable across re-renders. Kept modest for smooth mobile perf.
 */
export default function Particles({ count = 16, className = '' }) {
  const kinds = ['heart', 'star', 'sparkle', 'dot']
  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 10 + Math.random() * 12,
        color: COLORS[i % COLORS.length],
        kind: kinds[i % kinds.length],
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 4,
        drift: (Math.random() - 0.5) * 26,
        rotate: (Math.random() - 0.5) * 40,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count],
  )

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {bits.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{ left: `${b.left}%`, top: `${b.top}%` }}
          animate={{
            y: [0, -24, 0],
            x: [0, b.drift, 0],
            rotate: [0, b.rotate, 0],
            opacity: [0.25, 0.85, 0.25],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Shape kind={b.kind} color={b.color} size={b.size} />
        </motion.div>
      ))}
    </div>
  )
}
