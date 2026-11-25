import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { data } from '../data'
import { CountUp, Glitch, Label, Magnetic, Reveal, SplitHeading, Star, Tape } from './ui'

const P = data.person

/* ---------------- Stats ---------------- */
export function Stats() {
  return (
    <section id="stats" className="relative bg-snow px-5 py-20 text-ink md:px-8 md:py-28">
      <div className="halftone-ink absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {data.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -8, rotate: i % 2 ? 2 : -2 }}
              className={`card-pop h-full rounded-3xl border-[3px] border-ink p-5 md:p-7 ${i === 0 ? 'bg-cobalt text-snow' : i === 2 ? 'bg-lime' : 'bg-snow'}`}
            >
              <CountUp value={s.n} className={`display block text-7xl md:text-8xl ${i === 0 ? 'text-lime' : 'text-cobalt'}`} />
              <p className="mt-3 text-sm font-semibold leading-snug md:text-base">{s.label}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------- About ---------------- */
export function About() {
  const [open, setOpen] = useState(0)
  return (
    <section id="about" className="relative overflow-hidden bg-snow px-5 pb-24 text-ink md:px-8 md:pb-32">
      <div className="relative mx-auto max-w-7xl">
        <Label n="01" className="text-cobalt">About me</Label>
        <div className="grid gap-14 md:grid-cols-[1.15fr_1fr]">
          <div>
            <SplitHeading text="A DESIGNER WHO THINKS LIKE AN ENGINEER." className="display text-6xl leading-[0.9] md:text-8xl" />
            <Reveal delay={0.2} className="mt-8 space-y-4 text-lg leading-relaxed text-ink/80">
              <p>
                I'm <b className="text-ink">Karthickraja</b>, a UI/UX and AI product designer in Bengaluru. For the last 18 months I designed{' '}
                <mark className="bg-lime px-1">seven AI applications for the Indian Navy</mark> at INICAI: AI chat, dashboards and document tools, several of them
                running fully offline.
              </p>
              <p>
                Before design, I spent almost two years as a software engineer. So I design with the build in mind, hand off clean specs, and I'm happy to jump into
                React.js when the team needs it.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-2">
              {['Immediate joiner', 'Open to relocate', 'Tamil · English', 'Designer who codes'].map((t, i) => (
                <span key={t} className={`rounded-full border-2 border-ink px-4 py-2 text-sm font-bold ${i === 0 ? 'bg-lime' : ''}`}>
                  {t}
                </span>
              ))}
            </Reveal>
          </div>

          <div className="relative">
            <Reveal className="relative mx-auto max-w-sm">
              <motion.div whileHover={{ rotate: 0 }} initial={{ rotate: -4 }} className="relative rounded-[28px] border-[3px] border-ink bg-cobalt p-4 card-pop">
                <div className="halftone absolute inset-0 rounded-[26px]" />
                <img src="img/karthick.webp" alt="Karthickraja" className="relative mx-auto w-[88%]" loading="lazy" />
                <div className="relative -mt-2 rounded-2xl bg-snow p-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-cobalt">Currently</div>
                  <div className="font-bold">Open to UI/UX & product design roles</div>
                </div>
              </motion.div>
              <Star className="absolute -right-6 -top-8 h-28 w-28 rotate-12">
                <span className="display text-base leading-tight">4+ YRS<br />IN TECH</span>
              </Star>
              <span className="font-hand absolute -bottom-10 -left-4 -rotate-6 text-3xl text-cobalt">that's me ↑</span>
            </Reveal>
          </div>
        </div>

        {/* principles accordion */}
        <div className="mt-24">
          <Reveal className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-cobalt">How I think</Reveal>
          {data.principles.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.05}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="group flex w-full items-center justify-between gap-6 border-t-[3px] border-ink py-6 text-left"
              >
                <span className="flex items-baseline gap-5">
                  <span className="font-mono text-sm text-cobalt">0{i + 1}</span>
                  <span className="display text-3xl transition group-hover:text-cobalt md:text-5xl">{p.t}</span>
                </span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-ink text-2xl group-hover:bg-lime">
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pb-6 pl-10 text-lg text-ink/75 md:max-w-3xl md:pl-14"
                  >
                    {p.d}
                  </motion.p>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
          <div className="border-t-[3px] border-ink" />
        </div>

        {/* services */}
        <div className="mt-24">
          <Reveal className="mb-8 flex items-end justify-between">
            <h3 className="display text-5xl md:text-7xl">WHAT I DO</h3>
            <span className="font-hand hidden text-3xl text-cobalt md:block">six things, done properly</span>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.services.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.06}>
                <motion.div
                  whileHover="hover"
                  className="group relative h-full overflow-hidden rounded-3xl border-[3px] border-ink bg-snow p-6"
                >
                  <motion.div
                    variants={{ hover: { scale: 1 } }}
                    initial={{ scale: 0 }}
                    className="absolute -bottom-1/2 -right-1/2 h-[220%] w-[220%] origin-bottom-right rounded-full bg-cobalt"
                    transition={{ duration: 0.5 }}
                  />
                  <div className="relative transition-colors duration-300 group-hover:text-snow">
                    <div className="flex items-center justify-between">
                      <span className="display text-5xl text-cobalt transition-colors group-hover:text-lime">0{i + 1}</span>
                      <span className="text-2xl transition-transform group-hover:-rotate-45">→</span>
                    </div>
                    <h4 className="mt-6 text-2xl font-extrabold">{s.t}</h4>
                    <p className="mt-2 opacity-75">{s.d}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Process (sticky stacking cards) ---------------- */
export function Process() {
  const colors = ['bg-snow', 'bg-cobalt text-snow', 'bg-ink text-snow', 'bg-snow']
  return (
    <section id="process" className="relative bg-lime px-5 py-24 text-ink md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Label n="04">Process</Label>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div className="md:sticky md:top-28 md:h-fit">
            <SplitHeading text="FROM MESSY BRIEF TO SHIPPED PRODUCT." className="display text-6xl leading-[0.9] md:text-7xl" />
            <Reveal className="mt-6 max-w-sm text-lg">
              Four steps I follow on every project, whether it's one landing page or seven AI applications.
            </Reveal>
          </div>
          <div className="space-y-6">
            {data.process.map((s, i) => (
              <div key={s.step} className="md:sticky" style={{ top: 110 + i * 26 }}>
                <Reveal>
                  <div className={`card-pop rounded-[28px] border-[3px] border-ink p-7 md:p-9 ${colors[i]}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-mono text-xs uppercase tracking-[0.2em] opacity-70">Step 0{i + 1}</div>
                        <h3 className="display mt-2 text-5xl md:text-6xl">{s.step}</h3>
                      </div>
                      <span className={`display flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[3px] border-current text-3xl`}>{i + 1}</span>
                    </div>
                    <div className="mt-4 text-xl font-bold">{s.t}</div>
                    <p className="mt-2 max-w-xl opacity-80">{s.d}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.out.map((o) => (
                        <span key={o} className="rounded-full border-2 border-current px-3 py-1 text-xs font-bold">
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Skills & tools ---------------- */
export function Skills() {
  const [g, setG] = useState(0)
  const allTools = data.tools.flatMap((t) => t.items)
  const half = Math.ceil(allTools.length / 2)
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-snow md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Label n="05" className="text-lime">Skills & tools</Label>
        <SplitHeading text="THE TOOLKIT." className="display mb-12 text-6xl md:text-9xl" />
        <div className="grid gap-10 md:grid-cols-[280px_1fr]">
          <div className="flex gap-2 overflow-x-auto no-scrollbar md:flex-col">
            {data.skills.map((s, i) => (
              <button
                key={s.group}
                onClick={() => setG(i)}
                className={`shrink-0 rounded-2xl border-2 px-5 py-4 text-left font-bold transition ${
                  g === i ? 'border-lime bg-lime text-ink' : 'border-snow/20 hover:border-snow/60'
                }`}
              >
                <span className="mr-3 font-mono text-xs opacity-60">0{i + 1}</span>
                {s.group}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={g}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap content-start gap-3"
            >
              {data.skills[g].items.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, type: 'spring', stiffness: 300, damping: 18 }}
                  whileHover={{ scale: 1.08, rotate: -2 }}
                  className="rounded-full border-2 border-snow/30 bg-snow/5 px-5 py-3 text-lg font-semibold hover:border-lime hover:text-lime"
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-20 space-y-6">
        <Tape items={allTools.slice(0, half)} rotate={0} tone="lime" />
        <Tape items={allTools.slice(half)} rotate={0} tone="cobalt" reverse />
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl gap-4 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
        {data.tools.map((t) => (
          <Reveal key={t.group} className="rounded-2xl border-2 border-snow/15 p-5">
            <div className="font-mono text-[11px] uppercase tracking-widest text-lime">{t.group}</div>
            <div className="mt-2 text-snow/85">{t.items.join(' · ')}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Experience timeline ---------------- */
export function Experience({ onOpenCase }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return (
    <section id="experience" className="relative bg-snow px-5 py-24 text-ink md:px-8 md:py-32">
      <div className="halftone-ink absolute inset-0" />
      <div className="relative mx-auto max-w-6xl">
        <Label n="06" className="text-cobalt">Experience</Label>
        <SplitHeading text="WHERE I'VE BEEN." className="display mb-16 text-6xl md:text-9xl" />
        <div ref={ref} className="relative">
          <div className="absolute bottom-0 left-[11px] top-0 w-[3px] bg-ink/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div style={{ height: h }} className="absolute left-[11px] top-0 w-[3px] origin-top bg-cobalt md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-12">
            {data.experience.map((e, i) => (
              <div key={e.when} className={`relative grid gap-4 pl-10 md:grid-cols-2 md:gap-16 md:pl-0`}>
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-40%' }}
                  className="absolute left-0 top-2 h-[26px] w-[26px] rounded-full border-[3px] border-ink bg-lime md:left-1/2 md:-translate-x-1/2"
                />
                <Reveal className={`${i % 2 ? 'md:order-2' : 'md:text-right'}`}>
                  <div className="font-mono text-sm font-bold text-cobalt">{e.when}</div>
                  <div className="display mt-1 text-3xl md:text-4xl">{e.org}</div>
                  {e.sub && <div className="mt-1 text-sm text-ink/60">{e.sub}</div>}
                </Reveal>
                <Reveal delay={0.1} className={i % 2 ? 'md:order-1' : ''}>
                  <div className="card-pop rounded-3xl border-[3px] border-ink bg-snow p-6">
                    <div className="text-xl font-extrabold">{e.title}</div>
                    <ul className="mt-3 space-y-2">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-3 text-ink/80">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cobalt" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    {e.case && (
                      <button onClick={() => onOpenCase(e.case)} className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-lime transition hover:bg-cobalt">
                        View related case study →
                      </button>
                    )}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        {/* education + certs */}
        <div className="mt-24 grid gap-6 md:grid-cols-3">
          <Reveal className="rounded-3xl border-[3px] border-ink bg-cobalt p-6 text-snow md:col-span-2">
            <div className="font-mono text-xs uppercase tracking-widest text-lime">Education</div>
            {data.education.map((ed) => (
              <div key={ed.t} className="mt-4 flex flex-col justify-between gap-1 border-t border-snow/20 pt-4 sm:flex-row">
                <div>
                  <b className="text-lg">{ed.t}</b>
                  <div className="text-snow/70">{ed.org}</div>
                </div>
                <span className="font-mono text-sm text-lime">{ed.when}</span>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl border-[3px] border-ink bg-lime p-6">
            <div className="font-mono text-xs uppercase tracking-widest">Certifications</div>
            {data.certs.map((c) => (
              <div key={c.t} className="mt-3 border-t-2 border-ink/20 pt-3">
                <b>{c.t}</b>
                <div className="text-sm opacity-70">{c.by}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Recognition ---------------- */
export function Recognition() {
  const r = data.recognition
  return (
    <section className="relative overflow-hidden bg-cobalt px-5 py-24 text-snow md:px-8 md:py-32">
      <div className="halftone absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl">
        <Label n="07" className="text-lime">Recognition</Label>
        <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="font-mono text-sm uppercase tracking-[0.2em] text-lime">{r.where}</div>
            <h2 className="display mt-4 text-6xl leading-[0.9] md:text-8xl">
              <Glitch text="INDIA AI" /> <br />
              <span className="outline-lime">IMPACT SUMMIT</span> 2026
            </h2>
            <Reveal className="mt-6 max-w-xl text-lg text-snow/85">{r.d}</Reveal>
          </div>
          <div className="relative flex justify-center">
            <motion.div
              initial={{ rotate: -20, scale: 0.6, opacity: 0 }}
              whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 12 }}
            >
              <Star className="h-64 w-64 md:h-80 md:w-80" spin>
                <span className="display block text-center">
                  <span className="block text-8xl leading-none md:text-9xl">4</span>
                  <span className="block text-xl leading-tight md:text-2xl">PROJECTS DEMOED<br />NATIONALLY</span>
                </span>
              </Star>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Testimonials ---------------- */
export function Testimonials() {
  const tones = ['bg-lime', 'bg-snow', 'bg-cobalt text-snow']
  const rot = [-3, 2, -1.5]
  return (
    <section className="relative bg-snow px-5 py-24 text-ink md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Label n="08" className="text-cobalt">Kind words</Label>
        <SplitHeading text="PEOPLE I'VE WORKED WITH." className="display mb-16 text-5xl md:text-8xl" />
        <div className="grid gap-8 md:grid-cols-3">
          {data.quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 60, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: rot[i] }}
              whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 14, delay: i * 0.1 }}
              className={`card-pop relative rounded-3xl border-[3px] border-ink p-7 ${tones[i]}`}
            >
              <span className="display absolute -top-8 left-6 text-8xl leading-none text-cobalt [text-shadow:3px_3px_0_#0B1020]">“</span>
              <blockquote className="mt-6 text-xl font-semibold leading-snug">{q.q}</blockquote>
              <figcaption className="mt-6 border-t-2 border-current/20 pt-4">
                <b>{q.name}</b>
                <div className="text-sm opacity-70">{q.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Contact ---------------- */
export function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', msg: '' })
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(P.email)
    } catch {
      /* clipboard may be blocked; the mailto link still works */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  const send = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Hello from ${form.name || 'your portfolio'}`)
    const body = encodeURIComponent(`${form.msg}\n\n— ${form.name}\n${form.email}`)
    window.location.href = `mailto:${P.email}?subject=${subject}&body=${body}`
  }
  const socials = [
    ['LinkedIn', P.linkedin],
    ['Behance', P.behance],
    ['Email', `mailto:${P.email}`],
    ['Call', `tel:${P.phone.replace(/\s/g, '')}`],
  ]
  return (
    <section id="contact" className="relative overflow-hidden bg-cobalt px-5 pt-24 text-snow md:px-8 md:pt-32">
      <div className="halftone absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl">
        <Label n="09" className="text-lime">Contact</Label>
        <div className="relative">
          <h2 className="display text-[22vw] leading-[0.82] md:text-[15vw]">
            <Glitch text="LET'S" />
            <br />
            <span className="relative inline-block">
              <span className="text-lime">TALK.</span>
              <span className="font-hand absolute -bottom-2 left-full ml-4 hidden w-max -rotate-6 text-3xl normal-case text-snow md:block md:text-5xl">(seriously, say hi)</span>
            </span>
          </h2>
          <motion.div
            initial={{ scale: 0, rotate: -60 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 160, damping: 10, delay: 0.3 }}
            className="absolute right-0 top-0 md:right-[6%] md:top-[10%]"
          >
            <Star spin className="h-28 w-28 md:h-44 md:w-44">
              <span className="display text-lg leading-tight md:text-2xl">AVAILABLE<br />NOW!</span>
            </Star>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-10 pb-24 md:grid-cols-2">
          <div>
            <p className="max-w-md text-xl text-snow/85">
              Hiring a UI/UX or product designer? I can start immediately and I'm open to relocating. Let's talk about your product.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <button onClick={copy} data-cursor={copied ? 'Copied' : 'Copy'} className="btn-pop flex items-center gap-3 rounded-full border-[3px] border-ink bg-lime px-6 py-4 text-left font-extrabold text-ink">
                  <span className="break-all text-sm md:text-base">{P.email}</span>
                  <span className="rounded-full bg-ink px-3 py-1 text-xs text-lime">{copied ? 'Copied ✓' : 'Copy'}</span>
                </button>
              </Magnetic>
            </div>
            <a href={`tel:${P.phone.replace(/\s/g, '')}`} className="mt-5 block text-2xl font-bold hover:text-lime">
              {P.phone}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              {socials.map(([t, h]) => (
                <a key={t} href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group flex items-center gap-2 rounded-full border-2 border-snow/40 px-5 py-2.5 font-semibold transition hover:border-lime hover:bg-lime hover:text-ink">
                  {t} <span className="transition-transform group-hover:-rotate-45">↗</span>
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={send} className="card-pop space-y-4 rounded-[28px] border-[3px] border-ink bg-snow p-6 text-ink md:p-8">
            <div className="display text-3xl">Drop a message</div>
            {[
              ['name', 'Your name', 'text'],
              ['email', 'Your email', 'email'],
            ].map(([k, l, t]) => (
              <label key={k} className="block">
                <span className="font-mono text-[11px] uppercase tracking-widest text-cobalt">{l}</span>
                <input
                  required
                  type={t}
                  value={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  className="mt-1 w-full border-b-[3px] border-ink bg-transparent py-2 text-lg outline-none transition focus:border-cobalt"
                />
              </label>
            ))}
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-widest text-cobalt">Message</span>
              <textarea
                required
                rows={4}
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
                className="mt-1 w-full resize-none border-b-[3px] border-ink bg-transparent py-2 text-lg outline-none transition focus:border-cobalt"
              />
            </label>
            <button type="submit" className="btn-pop w-full rounded-full border-[3px] border-ink bg-cobalt py-4 text-lg font-extrabold text-snow">
              Send message →
            </button>
            <p className="text-center text-xs text-ink/50">Opens your email app with the message ready to send.</p>
          </form>
        </div>
      </div>
      <Tape items={['OPEN TO WORK', 'IMMEDIATE JOINER', 'OPEN TO RELOCATE', 'UI/UX', 'AI PRODUCTS']} rotate={-2} tone="lime" className="mb-[-10px]" />
    </section>
  )
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink px-5 pb-8 pt-20 text-snow md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-lime">Karthickraja Velmurugan</div>
            <p className="mt-2 max-w-xs text-snow/60">UI/UX · Product · AI product designer. Designed in Figma, built with React & Tailwind.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <a href="#work" className="hover:text-lime">Work</a>
            <a href="#about" className="hover:text-lime">About</a>
            <a href="#process" className="hover:text-lime">Process</a>
            <a href="#experience" className="hover:text-lime">Experience</a>
            <a href="Karthickraja_Velmurugan_Resume.pdf" target="_blank" rel="noreferrer" className="hover:text-lime">Résumé</a>
          </div>
        </div>
        <div className="display mt-16 select-none text-center text-[17vw] leading-[0.8] text-snow/[0.07]">KARTHICKRAJA</div>
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-snow/10 pt-6 text-xs text-snow/50 md:flex-row">
          <span>© {new Date().getFullYear()} Karthickraja Velmurugan · Bengaluru, India</span>
          <a href="#top" className="rounded-full border border-snow/30 px-4 py-2 hover:border-lime hover:text-lime">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
