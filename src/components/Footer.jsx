import { motion } from 'framer-motion'
import { ArrowUp, Heart, Mail, Linkedin } from 'lucide-react'
import { profile, contact, navLinks } from '../data/portfolio'
import { fadeUp, staggerContainer, viewport, springHover, springTap } from '../lib/motion'

const socials = [
  {
    label: 'Email Muskan',
    href: `mailto:${contact.email}`,
    icon: Mail,
    color: 'text-rose-500 border-rose-200 hover:border-rose-300 hover:bg-rose-100',
  },
  {
    label: 'LinkedIn profile',
    href: contact.linkedin,
    icon: Linkedin,
    color: 'text-lilac-500 border-lilac-200 hover:border-lilac-300 hover:bg-lilac-100',
  },
]

function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden border-t-2 border-cream-300 bg-cream">
      {/* Pastel gradient hairline across the very top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-300 via-lilac-300 to-butter-300"
      />
      {/* Soft doodle glows */}
      <div
        aria-hidden="true"
        className="halo -top-20 left-1/4 h-44 w-80 bg-rose-200/40"
      />
      <div
        aria-hidden="true"
        className="halo -bottom-24 right-1/4 h-44 w-80 bg-lilac-200/40"
      />
      {/* Cute floating sparkles */}
      <span aria-hidden="true" className="pointer-events-none absolute left-8 top-14 text-xl animate-float-slow">
        ✨
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute right-10 top-20 text-lg animate-float">
        💕
      </span>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative mx-auto w-full max-w-6xl px-5 pb-10 pt-16 sm:px-8"
      >
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Left: logo + tagline */}
          <motion.div variants={fadeUp} className="max-w-sm">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                scrollToTop()
              }}
              className="inline-flex items-center gap-2.5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-rose-400 to-lilac-400 font-display text-lg font-bold text-white shadow-cute">
                M
              </span>
              <span className="font-display text-xl font-bold text-gradient">
                {profile.firstName}
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-plum-600">
              {profile.roles.join(' · ')}
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-plum-400">
              <span aria-hidden="true">⚡</span>
              Built with love using React, Tailwind &amp; Framer Motion.
            </p>
          </motion.div>

          {/* Middle: quick nav */}
          <motion.nav variants={fadeUp} aria-label="Footer">
            <h3 className="eyebrow mb-4">Explore</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="group inline-flex items-center gap-2 text-sm text-plum-600 transition hover:text-rose-500"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-300 transition-all group-hover:w-4 group-hover:bg-lilac-400" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Right: socials + back to top */}
          <motion.div variants={fadeUp}>
            <h3 className="eyebrow mb-4">Say hi</h3>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ label, href, icon: Icon, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  whileHover={springHover}
                  whileTap={springTap}
                  className={`grid h-11 w-11 place-items-center rounded-full border-2 bg-white shadow-soft transition-colors ${color}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </motion.a>
              ))}
            </div>

            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={springHover}
              whileTap={springTap}
              className="group mt-6 inline-flex items-center gap-2 rounded-full border-2 border-rose-200 bg-white px-5 py-2.5 text-sm font-semibold text-plum-700 shadow-soft transition hover:border-rose-300 hover:bg-rose-100"
            >
              Back to top
              <ArrowUp className="h-4 w-4 text-rose-500 animate-bob" aria-hidden="true" />
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t-2 border-cream-300 pt-6 text-center sm:flex-row sm:text-left"
        >
          <p className="text-xs text-plum-500">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-plum-500">
            Made with
            <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-500 animate-wobble" aria-hidden="true" />
            in {contact.location.split(',')[0]}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer
