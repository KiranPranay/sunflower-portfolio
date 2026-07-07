import { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion'
import {
  Mail,
  Linkedin,
  MapPin,
  Send,
  Plane,
  CheckCircle2,
  Heart,
  Sparkles,
} from 'lucide-react'
import { contact, accentMap } from '../data/portfolio'
import SectionHeading from './ui/SectionHeading'
import {
  fadeUp,
  staggerContainer,
  viewport,
  scaleIn,
  springHover,
  springTap,
} from '../lib/motion'

// Submissions are delivered straight to the inbox via FormSubmit (no backend).
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${contact.email}`

const connectLinks = [
  {
    label: 'Email',
    value: contact.email,
    href: 'mailto:' + contact.email,
    icon: Mail,
    accent: 'rose',
    external: false,
  },
  {
    label: 'LinkedIn',
    value: contact.linkedinLabel,
    href: contact.linkedin,
    icon: Linkedin,
    accent: 'lilac',
    external: true,
  },
]

function ConnectCard({ item }) {
  const Icon = item.icon
  const accent = accentMap[item.accent]
  const anchorProps = item.external
    ? { target: '_blank', rel: 'noreferrer' }
    : {}

  return (
    <motion.a
      href={item.href}
      {...anchorProps}
      variants={fadeUp}
      whileHover={{
        x: 6,
        y: -3,
        transition: { type: 'spring', stiffness: 320, damping: 16 },
      }}
      whileTap={springTap}
      className="soft-card group flex items-center gap-4 p-4 sm:p-5"
    >
      <motion.span
        whileHover={{ rotate: -8, scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
        className={
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-white ' +
          accent.softBg +
          ' ' +
          accent.shadow
        }
      >
        <Icon className={'h-5 w-5 ' + accent.text} strokeWidth={2.4} aria-hidden="true" />
      </motion.span>

      <span className="min-w-0 flex-1">
        <span className="block font-hand text-lg font-bold text-plum-500">
          {item.label}
        </span>
        <span className="block truncate text-sm font-semibold text-plum-800 sm:text-base">
          {item.value}
        </span>
      </span>

      <Send
        className={
          'h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ' +
          accent.text
        }
        aria-hidden="true"
      />
    </motion.a>
  )
}

export default function Contact() {
  const reduceMotion = useReducedMotion()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [flying, setFlying] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  const isEmpty =
    !form.name.trim() || !form.email.trim() || !form.message.trim()

  const mailtoHref =
    'mailto:' +
    contact.email +
    '?subject=' +
    encodeURIComponent(
      `Portfolio hello from ${form.name || 'a friend'}`
    ) +
    '&body=' +
    encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`
    )

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (isEmpty || sending) return
    setError(false)
    setSending(true)
    setFlying(!reduceMotion)

    // Let the paper airplane finish its flight even if the network is fast.
    const minFlight = new Promise((resolve) =>
      window.setTimeout(resolve, reduceMotion ? 250 : 1500)
    )

    // Deliver the message straight to the inbox via FormSubmit (no backend).
    const deliver = fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
        _subject: `New portfolio message from ${form.name}`,
        _template: 'table',
        _captcha: 'false',
      }),
    })
      .then((res) => res.ok)
      .catch(() => false)

    const [, ok] = await Promise.all([minFlight, deliver])

    setFlying(false)
    setSending(false)

    if (ok) {
      setSent(true)
      // Auto-reset back to the form so it can be reused.
      window.setTimeout(
        () => {
          setSent(false)
          setForm({ name: '', email: '', message: '' })
        },
        reduceMotion ? 4000 : 7000
      )
    } else {
      // Network / service hiccup — nudge the visitor to their mail app.
      setError(true)
    }
  }

  // Pastel confetti burst on the success card.
  const sparkles = [
    { x: -70, y: -50, d: 0, Icon: Heart, cls: 'text-rose-400' },
    { x: 74, y: -40, d: 0.12, Icon: Sparkles, cls: 'text-lilac-400' },
    { x: -58, y: 46, d: 0.24, Icon: Sparkles, cls: 'text-butter-500' },
    { x: 66, y: 54, d: 0.36, Icon: Heart, cls: 'text-peach-400' },
    { x: 0, y: -80, d: 0.18, Icon: Sparkles, cls: 'text-sage-500' },
    { x: 4, y: 82, d: 0.3, Icon: Heart, cls: 'text-lilac-400' },
  ]

  // Trailing hearts/sparkles that chase the flying paper airplane.
  const planeTrail = [
    { Icon: Heart, cls: 'text-rose-400', d: 0.05, size: 'h-4 w-4' },
    { Icon: Sparkles, cls: 'text-lilac-400', d: 0.18, size: 'h-3.5 w-3.5' },
    { Icon: Heart, cls: 'text-peach-400', d: 0.32, size: 'h-3 w-3' },
    { Icon: Sparkles, cls: 'text-butter-500', d: 0.46, size: 'h-3.5 w-3.5' },
  ]

  return (
    <section id="contact" className="section">
      {/* Flying paper airplane overlay + trailing hearts */}
      <AnimatePresence>
        {flying && !reduceMotion && (
          <motion.div
            key="plane"
            className="pointer-events-none fixed inset-0 z-50 flex items-center"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ x: '-15vw', y: '18vh', rotate: -8, scale: 0.7, opacity: 0 }}
              animate={{
                x: ['-15vw', '30vw', '75vw', '115vw'],
                y: ['18vh', '-4vh', '6vh', '-14vh'],
                rotate: [-8, 8, -6, 14],
                scale: [0.7, 1.05, 1, 0.8],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-lilac-400"
              style={{ filter: 'drop-shadow(0 8px 24px rgba(180,157,240,0.55))' }}
            >
              <Plane className="h-10 w-10" fill="currentColor" />
            </motion.div>

            {planeTrail.map((t, i) => {
              const T = t.Icon
              return (
                <motion.div
                  key={i}
                  className={'absolute ' + t.cls}
                  initial={{ x: '-15vw', y: '18vh', scale: 0, opacity: 0 }}
                  animate={{
                    x: ['-15vw', '30vw', '75vw', '115vw'],
                    y: ['20vh', '-1vh', '9vh', '-11vh'],
                    scale: [0, 1, 0.9, 0],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: t.d,
                  }}
                >
                  <T className={t.size} fill="currentColor" />
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* soft decorative halos */}
      <div
        className="halo left-[-4rem] top-16 h-56 w-56 bg-lilac-200/50"
        aria-hidden="true"
      />
      <div
        className="halo bottom-8 right-[-3rem] h-64 w-64 bg-rose-200/50"
        aria-hidden="true"
      />

      <SectionHeading
        eyebrow="Get in Touch"
        emoji="💌"
        title={
          <>
            Let&apos;s Build{' '}
            <span className="text-gradient-anim">Something</span> 💌
          </>
        }
        description="Have an idea, a project, or just want to say hi? My inbox is always open — let's turn a little spark into a whole circuit."
        accent="bg-rose-400"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-5 lg:gap-8">
        {/* LEFT — quick connect */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="flex flex-col gap-4 lg:col-span-2"
        >
          {connectLinks.map((item) => (
            <ConnectCard key={item.label} item={item} />
          ))}

          <motion.div
            variants={fadeUp}
            className="mt-1 flex items-center gap-3 px-2 text-sm text-plum-500"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-sage-100 shadow-cute-sage"
              aria-hidden="true"
            >
              <MapPin className="h-4 w-4 text-sage-600" strokeWidth={2.4} />
            </span>
            <span>
              Based in{' '}
              <span className="font-semibold text-plum-700">
                {contact.location}
              </span>
            </span>
          </motion.div>
        </motion.div>

        {/* RIGHT — playful form */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="soft-card relative overflow-hidden p-6 sm:p-8 lg:col-span-3"
        >
          <div
            className="halo -right-16 -top-16 h-40 w-40 bg-lilac-200/60"
            aria-hidden="true"
          />
          <div
            className="halo -bottom-20 -left-10 h-44 w-44 bg-butter-200/50"
            aria-hidden="true"
          />

          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="relative flex flex-col gap-5"
              >
                <div className="flex items-center gap-2 font-hand text-xl font-bold text-rose-500">
                  <Sparkles className="h-5 w-5 animate-twinkle" aria-hidden="true" />
                  Say hello!
                </div>

                <Field
                  id="contact-name"
                  label="Your name"
                  type="text"
                  placeholder="Ada Lovelace"
                  value={form.name}
                  onChange={update('name')}
                />
                <Field
                  id="contact-email"
                  label="Your email"
                  type="email"
                  placeholder="ada@circuit.dev"
                  value={form.email}
                  onChange={update('email')}
                />

                <label htmlFor="contact-message" className="flex flex-col gap-2">
                  <span className="font-hand text-lg font-bold text-plum-500">
                    Message
                  </span>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Let's build something delightful together…"
                    className="w-full resize-none rounded-2xl border-2 border-rose-200 bg-cream-100 px-4 py-3 text-sm text-plum-800 outline-none transition placeholder:text-plum-400 focus:border-lilac-400 focus:bg-white focus:ring-4 focus:ring-lilac-200/60"
                  />
                </label>

                <motion.button
                  type="submit"
                  disabled={isEmpty || sending}
                  whileHover={isEmpty || sending ? undefined : springHover}
                  whileTap={isEmpty || sending ? undefined : springTap}
                  className="btn-primary group mt-1 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Send message"
                >
                  {sending ? 'Sending…' : 'Send it!'}
                  <Send
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </motion.button>

                {error ? (
                  <p className="text-center text-xs font-semibold text-rose-500">
                    Oops, that didn&apos;t go through.{' '}
                    <a
                      href={mailtoHref}
                      className="underline underline-offset-2"
                    >
                      Email me directly instead
                    </a>
                    .
                  </p>
                ) : (
                  <p className="text-center text-xs text-plum-400">
                    Prefer your own mail app?{' '}
                    <a
                      href={mailtoHref}
                      className="font-semibold text-lilac-500 underline-offset-2 hover:underline"
                    >
                      Open it here
                    </a>
                    .
                  </p>
                )}
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="relative flex min-h-[320px] flex-col items-center justify-center gap-4 text-center"
              >
                {/* pastel confetti burst */}
                {sparkles.map((s, i) => {
                  const S = s.Icon
                  return (
                    <motion.span
                      key={i}
                      className={'absolute ' + s.cls}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0.6],
                        x: s.x,
                        y: s.y,
                      }}
                      transition={{
                        duration: 1.4,
                        delay: s.d,
                        repeat: Infinity,
                        repeatDelay: 0.6,
                      }}
                      aria-hidden="true"
                    >
                      <S className="h-4 w-4" fill="currentColor" />
                    </motion.span>
                  )
                })}

                <motion.span
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                  className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-rose-300 to-lilac-400 text-white shadow-cute"
                >
                  <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
                  <span
                    className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-butter-300 text-butter-600 animate-bob"
                    aria-hidden="true"
                  >
                    <Heart className="h-3.5 w-3.5" fill="currentColor" />
                  </span>
                </motion.span>

                <h3 className="font-display text-2xl font-bold text-plum-900">
                  Message Sent! 💌
                </h3>
                <p className="max-w-xs text-sm text-plum-500">
                  Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}! Your
                  note is on its way. I&apos;ll get back to you super soon.
                </p>

                <a
                  href={mailtoHref}
                  className="btn-ghost mt-2"
                  aria-label="Also send via your email app"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Also send via email app
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function Field({ id, label, type, placeholder, value, onChange }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="font-hand text-lg font-bold text-plum-500">
        {label}
      </span>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border-2 border-rose-200 bg-cream-100 px-4 py-3 text-sm text-plum-800 outline-none transition placeholder:text-plum-400 focus:border-lilac-400 focus:bg-white focus:ring-4 focus:ring-lilac-200/60"
      />
    </label>
  )
}
