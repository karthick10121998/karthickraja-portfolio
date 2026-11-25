import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'

/* Fade + rise when the element scrolls into view */
export function Reveal({ children, delay = 0, y = 40, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </M>
  )
}

/* Big poster headline: each word slides up from a mask */
export function SplitHeading({ text, className = '', wordClass = '', delay = 0 }) {
  const words = text.split(' ')
  return (
    <h2 className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom" aria-hidden>
          <motion.span
            className={`inline-block ${wordClass}`}
            initial={{ y: '105%', rotate: 4 }}
            whileInView={{ y: '0%', rotate: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: delay + i * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </h2>
  )
}

/* RGB-split glitch text, glitches on hover and every few seconds by itself */
export function Glitch({ text, className = '', auto = true }) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!auto) return
    let t1, t2
    const loop = () => {
      t1 = setTimeout(() => {
        setOn(true)
        t2 = setTimeout(() => { setOn(false); loop() }, 380)
      }, 2600 + Math.random() * 2600)
    }
    loop()
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [auto])
  return (
    <span className={`glitch ${on ? 'is-glitching' : ''} ${className}`} data-text={text}>
      {text}
    </span>
  )
}

/* Scrambles letters before settling on the final word */
export function Scramble({ words, className = '' }) {
  const [i, setI] = useState(0)
  const [out, setOut] = useState(words[0])
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*/'
    const id = setInterval(() => {
      const next = (i + 1) % words.length
      const target = words[next]
      let frame = 0
      const total = 14
      const run = setInterval(() => {
        frame++
        setOut(
          target
            .split('')
            .map((c, k) => (c === ' ' ? ' ' : k < (frame / total) * target.length ? c : chars[Math.floor(Math.random() * chars.length)]))
            .join('')
        )
        if (frame >= total) { clearInterval(run); setOut(target) }
      }, 38)
      setI(next)
    }, 2600)
    return () => clearInterval(id)
  }, [i, words])
  return <span className={className}>{out}</span>
}

/* Button/link that leans toward the pointer */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 15 })
  const sy = useSpring(y, { stiffness: 220, damping: 15 })
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}

/* 3D tilt on hover */
export function Tilt({ children, className = '', max = 8 }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 18 })
  const sry = useSpring(ry, { stiffness: 200, damping: 18 })
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * max * 2)
    rx.set(-py * max * 2)
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => { rx.set(0); ry.set(0) }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* Number that counts up when visible; keeps "+" suffix */
export function CountUp({ value, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const num = parseInt(value, 10)
  const suffix = value.replace(/^[0-9]+/, '')
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, num, { duration: 1.6, ease: [0.2, 0.7, 0.2, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, num])
  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  )
}

/* Lime starburst sticker */
export function Star({ children, className = '', spin = false, color = 'bg-lime text-ink' }) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <div className={`star-shape ${color} flex h-full w-full items-center justify-center text-center ${spin ? 'animate-spin-slow' : ''}`}>
        <div className={spin ? 'animate-[spinslow_14s_linear_infinite_reverse]' : ''}>{children}</div>
      </div>
    </div>
  )
}

/* Hand-drawn ellipse that draws itself */
export function Ring({ className = '', color = '#D6FF3D', width = 4 }) {
  return (
    <svg className={`pointer-events-none absolute overflow-visible ${className}`} viewBox="0 0 200 80" fill="none" preserveAspectRatio="none">
      <motion.path
        d="M16 50 C 4 8, 180 -10, 194 34 C 206 74, 40 86, 12 53 C 4 36, 40 14, 84 8"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
      />
    </svg>
  )
}

/* Hand-drawn arrow */
export function Arrow({ className = '', color = '#D6FF3D' }) {
  return (
    <svg className={`pointer-events-none overflow-visible ${className}`} viewBox="0 0 120 70" fill="none">
      <motion.path
        d="M4 8 C 30 60, 80 64, 108 30 M 96 26 L 109 29 L 106 43"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
      />
    </svg>
  )
}

/* Rotated marquee tape, like festival-poster barrier tape */
export function Tape({ items, rotate = -2.5, tone = 'lime', speed = 'animate-marquee', reverse = false, className = '' }) {
  const tones = {
    lime: 'bg-lime text-ink',
    ink: 'bg-ink text-lime',
    snow: 'bg-snow text-cobalt',
    cobalt: 'bg-cobalt text-snow',
  }
  const row = [...items, ...items, ...items, ...items]
  return (
    <div className={`relative z-20 -mx-[6vw] overflow-hidden border-y-[3px] border-ink py-3 ${tones[tone]} ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      <div className={`flex w-max ${speed}`} style={reverse ? { animationDirection: 'reverse' } : undefined}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {row.map((t, i) => (
              <span key={i} className="display flex items-center whitespace-nowrap px-5 text-2xl md:text-4xl">
                {t}
                <span className="ml-10 text-xl md:text-3xl">✱</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* Section label like "( 02 ) — SELECTED WORK" */
export function Label({ n, children, className = '' }) {
  return (
    <Reveal y={16} className={`mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] ${className}`}>
      <span className="rounded-full border-2 border-current px-2.5 py-0.5">{n}</span>
      <span className="h-[2px] w-10 bg-current" />
      <span>{children}</span>
    </Reveal>
  )
}

/* Browser + phone frames for concept screens */
export function BrowserFrame({ src, alt, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-xl border-[3px] border-ink bg-ink ${className}`}>
      <div className="flex h-7 items-center gap-1.5 bg-[#161C2A] px-3">
        <i className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 h-3.5 flex-1 rounded-full bg-white/5" />
      </div>
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </div>
  )
}

export function PhoneFrame({ src, alt, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-[34px] border-[7px] border-ink bg-ink shadow-2xl ${className}`}>
      <span className="absolute left-1/2 top-1.5 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </div>
  )
}

/* Parallax helper: maps scroll progress to y offset */
export function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance])
}
