import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from 'framer-motion'
import { data } from '../data'

/* ---------------- Loader: counts to 100, then the curtain lifts ---------------- */
export function Loader({ onDone }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let v = 0
    const id = setInterval(() => {
      v = Math.min(100, v + Math.ceil(Math.random() * 9))
      setN(v)
      if (v >= 100) { clearInterval(id); setTimeout(onDone, 350) }
    }, 45)
    return () => clearInterval(id)
  }, [onDone])
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 text-snow md:p-10"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.8, ease: [0.8, 0, 0.2, 1] }}
    >
      <div className="flex justify-between font-mono text-xs uppercase tracking-[0.2em] text-snow/60">
        <span>Karthickraja · Portfolio</span>
        <span>Bengaluru, IN</span>
      </div>
      <div>
        <div className="display text-[22vw] leading-none text-lime md:text-[16vw]">
          {String(n).padStart(3, '0')}
        </div>
        <div className="mt-4 h-[3px] w-full bg-snow/10">
          <div className="h-full bg-lime transition-[width] duration-100" style={{ width: `${n}%` }} />
        </div>
        <div className="mt-3 flex justify-between font-mono text-xs uppercase tracking-[0.2em] text-snow/60">
          <span>Loading the good stuff</span>
          <span>UI/UX · AI products</span>
        </div>
      </div>
    </motion.div>
  )
}

/* ---------------- Custom cursor: dot + ring that grows on links ---------------- */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 300, damping: 28 })
  const ry = useSpring(y, { stiffness: 300, damping: 28 })
  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    setEnabled(fine)
    if (!fine) return
    document.body.classList.add('has-cursor')
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => {
      const el = e.target.closest('a,button,[data-cursor]')
      setHover(!!el)
      setLabel(el?.dataset?.cursor || '')
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.body.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null
  const size = label ? 92 : hover ? 56 : 34
  return (
    <>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[90] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime mix-blend-difference" style={{ x, y }} />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[89] flex items-center justify-center rounded-full border-2 border-lime font-mono text-[10px] font-bold uppercase tracking-widest text-ink"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: size, height: size, backgroundColor: label ? '#D6FF3D' : 'rgba(214,255,61,0)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {label}
      </motion.div>
    </>
  )
}

/* ---------------- Scroll progress bar ---------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return <motion.div className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left bg-lime" style={{ scaleX }} />
}

/* ---------------- Navigation ---------------- */
const links = [
  ['Work', '#work'],
  ['About', '#about'],
  ['Process', '#process'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    let last = 0
    const on = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > last && y > 400 && !open)
      last = y
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [open])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[75] px-4 pt-3 md:px-8"
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border-[3px] border-ink px-3 py-2 transition-all md:px-4 ${
            scrolled ? 'bg-snow text-ink shadow-[5px_5px_0_0_#0B1020]' : 'bg-snow/95 text-ink'
          }`}
        >
          <a href="#top" className="flex items-center gap-2" data-cursor="Top">
            <span className="display flex h-9 w-9 items-center justify-center rounded-full bg-cobalt text-lg text-lime">KV</span>
            <span className="hidden font-bold sm:block">Karthickraja</span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map(([t, h]) => (
              <li key={t}>
                <a href={h} className="group relative block overflow-hidden rounded-full px-4 py-2 text-sm font-semibold">
                  <span className="block transition-transform duration-300 group-hover:-translate-y-[150%]">{t}</span>
                  <span className="absolute inset-0 flex translate-y-[150%] items-center justify-center rounded-full bg-cobalt text-lime transition-transform duration-300 group-hover:translate-y-0">
                    {t}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href="resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition hover:bg-ink hover:text-lime sm:block"
            >
              Résumé ↓
            </a>
            <a href="#contact" className="hidden rounded-full bg-lime px-4 py-2 text-sm font-bold text-ink ring-2 ring-ink md:block">
              Hire me
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink md:hidden"
              aria-label="Menu"
            >
              <span className={`absolute h-[2px] w-5 bg-lime transition ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
              <span className={`absolute h-[2px] w-5 bg-lime transition ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[74] flex flex-col justify-between bg-ink px-6 pb-10 pt-28 md:hidden"
            initial={{ clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
          >
            <ul className="space-y-1">
              {links.map(([t, h], i) => (
                <motion.li key={t} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.06 }}>
                  <a href={h} onClick={() => setOpen(false)} className="display flex items-baseline gap-3 text-6xl text-snow">
                    <span className="font-mono text-sm text-lime">0{i + 1}</span>
                    {t}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="space-y-2 text-sm text-snow/70">
              <a className="block text-lime" href={`mailto:${data.person.email}`}>{data.person.email}</a>
              <a className="block" href="resume.pdf" target="_blank" rel="noreferrer">Résumé (PDF) ↓</a>
              <a className="block" href="portfolio.pdf" target="_blank" rel="noreferrer">Portfolio (PDF) ↓</a>
              <a className="block" href="designer-resume.pdf" target="_blank" rel="noreferrer">Designer résumé (PDF) ↓</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
