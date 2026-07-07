import { useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from 'framer-motion'
import { Menu, X, Lightbulb, Heart } from 'lucide-react'
import { navLinks, profile } from '../data/portfolio'
import { fadeDown } from '../lib/motion'

const menuVariants = {
  hidden: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const menuItem = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0 },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const progressX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = (e) => {
    e.preventDefault()
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.header
      variants={fadeDown}
      initial="hidden"
      animate="show"
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressX }}
        className="absolute inset-x-0 top-0 h-1 origin-left rounded-full bg-gradient-to-r from-rose-400 via-lilac-400 to-butter-400"
      />

      <div
        className={
          'transition-all duration-300 ' +
          (scrolled
            ? 'border-b border-white/60 bg-white/70 shadow-soft backdrop-blur-md'
            : 'border-b border-transparent bg-transparent')
        }
      >
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          {/* Logo */}
          <a
            href="#top"
            onClick={scrollTop}
            aria-label="Back to top"
            className="group flex items-center gap-2.5"
          >
            <span className="relative grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-rose-400 via-rose-300 to-lilac-400 text-white shadow-cute transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6">
              <Lightbulb className="h-5 w-5" aria-hidden="true" />
              <Heart
                className="absolute -right-1 -top-1 h-3.5 w-3.5 fill-rose-400 text-rose-400 animate-twinkle"
                aria-hidden="true"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-sm font-semibold text-plum-900 sm:text-base">
                {profile.firstName} Sultana
              </span>
              <span className="font-display text-[10px] font-medium uppercase tracking-[0.22em] text-lilac-500">
                EEE · IoT
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={'#' + link.id}
                  className="group relative rounded-full px-3.5 py-2 text-sm font-medium text-plum-700 transition-colors hover:text-plum-900"
                >
                  <span className="pointer-events-none absolute inset-0 scale-90 rounded-full bg-rose-100/70 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                  <span className="relative">{link.label}</span>
                  <span className="pointer-events-none absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-rose-400 to-lilac-400 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="btn-primary hidden !px-5 !py-2.5 text-sm md:inline-flex"
            >
              Let&apos;s Chat 💬
            </a>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-2xl border-2 border-rose-200 bg-white/80 text-plum-700 backdrop-blur-md transition-colors hover:border-rose-300 hover:bg-rose-100 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mx-4 mt-2 rounded-3xl border-2 border-rose-100 bg-white/90 p-2 shadow-cute backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <motion.li key={link.id} variants={menuItem}>
                  <a
                    href={'#' + link.id}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-plum-700 transition-colors hover:bg-rose-100 hover:text-plum-900"
                  >
                    <span>{link.label}</span>
                    <Heart
                      className="h-4 w-4 fill-rose-300 text-rose-300"
                      aria-hidden="true"
                    />
                  </a>
                </motion.li>
              ))}
              <motion.li variants={menuItem} className="mt-1 px-1 pb-1">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  Let&apos;s Chat 💬
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
