// Shared Framer Motion variants & helpers.
// Import these everywhere so every section animates with one consistent feel.

export const easeOut = [0.22, 1, 0.36, 1]
export const easeSoft = [0.16, 1, 0.3, 1]

/** Standard viewport config for whileInView — plays once, a little early. */
export const viewport = { once: true, amount: 0.2 }
export const viewportSoft = { once: true, amount: 0.35 }

/** Fade + slide up. Use as the child of a stagger container, or standalone. */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

export const fadeDown = {
  hidden: { opacity: 0, y: -22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: easeOut } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
}

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
}

/** Parent container that reveals children one after another. */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}

export const staggerFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
}

/** Springy pop used for hover states on cards / badges. */
export const springHover = {
  scale: 1.045,
  transition: { type: 'spring', stiffness: 320, damping: 18 },
}

export const springTap = {
  scale: 0.96,
  transition: { type: 'spring', stiffness: 400, damping: 22 },
}
