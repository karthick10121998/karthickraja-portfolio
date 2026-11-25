import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { data } from '../data'
import { Glitch, Magnetic, Ring, Scramble, Star, Arrow } from './ui'

const roles = ['UI/UX DESIGNER', 'PRODUCT DESIGNER', 'AI PRODUCT DESIGNER', 'DESIGN SYSTEMS']

export default function Hero({ ready }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 80, damping: 20 })
  const py = useSpring(my, { stiffness: 80, damping: 20 })
  const photoX = useTransform(px, (v) => v * 18)
  const photoY = useTransform(py, (v) => v * 12)
  const textX = useTransform(px, (v) => v * -10)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.2])
  const sink = useTransform(scrollYProgress, [0, 1], [0, 160])

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const show = (d = 0) => ({
    initial: { opacity: 0, y: 60 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay: d, ease: [0.2, 0.8, 0.2, 1] },
  })

  return (
    <section id="top" ref={ref} onMouseMove={onMove} className="relative min-h-[100svh] overflow-hidden bg-cobalt pt-24 md:pt-28">
      <div className="halftone absolute inset-0 opacity-60" />
      {/* soft glows */}
      <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-cobalt-deep blur-3xl" />
      <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#3D5CFF] opacity-60 blur-3xl" />

      <motion.div style={{ opacity: fade }} className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* top meta row */}
        <motion.div {...show(0.05)} className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-snow/80">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
            </span>
            Available now · Immediate joiner
          </span>
          <span>{data.person.location} · Open to relocate</span>
        </motion.div>

        {/* big poster name */}
        <motion.div style={{ x: textX }} className="relative mt-6 md:mt-4">
          <motion.p
            initial={{ opacity: 0, rotate: -12, scale: 0.6 }}
            animate={ready ? { opacity: 1, rotate: -5, scale: 1 } : {}}
            transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 12 }}
            className="font-hand relative z-10 mb-1 ml-[1vw] w-fit text-3xl text-lime md:text-5xl"
          >
            hey there, I'm
          </motion.p>
          <motion.h1 {...show(0.12)} className="display text-[19vw] text-snow md:text-[13.5vw]">
            <Glitch text="KARTHICK" />
          </motion.h1>
          <motion.div {...show(0.22)} className="-mt-[1vw] flex items-end gap-4 md:gap-6">
            <span className="display outline-lime text-[19vw] md:text-[13.5vw]">RAJA</span>
            <span className="mb-[2vw] hidden font-mono text-xs uppercase leading-relaxed tracking-[0.2em] text-snow/80 sm:block">
              Velmurugan
              <br />
              <span className="text-lime">UI/UX · Product · AI</span>
            </span>
          </motion.div>
        </motion.div>

        {/* photo */}
        <motion.div
          style={{ x: photoX, y: photoY }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="pointer-events-none absolute right-[-8%] top-[150px] z-10 w-[78%] max-w-[560px] sm:right-0 sm:w-[56%] md:right-[2%] md:top-[110px] md:w-[42%]"
        >
          <motion.div style={{ y: sink }} className="relative">
            <div className="absolute inset-x-[10%] bottom-0 top-[12%] rounded-t-full bg-lime" />
            <div className="absolute inset-x-[10%] bottom-0 top-[12%] rounded-t-full border-[3px] border-ink" style={{ transform: 'translate(10px,10px)' }} />
            <img src="img/karthick.webp" alt="Portrait of Karthickraja Velmurugan" className="relative w-full [filter:contrast(1.05)_saturate(1.05)]" />
          </motion.div>
        </motion.div>

        {/* stickers */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={ready ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.7, type: 'spring', stiffness: 160, damping: 10 }}
          className="absolute right-[4%] top-[110px] z-20 md:right-[38%] md:top-[150px]"
        >
          <Star spin className="h-28 w-28 md:h-40 md:w-40">
            <span className="display block text-lg leading-[0.95] md:text-2xl">
              OPEN
              <br />
              TO WORK!
            </span>
          </Star>
        </motion.div>

        {/* bottom row */}
        <div className="relative z-20 mt-[62vw] grid gap-8 pb-28 sm:mt-[30vw] md:mt-10 md:grid-cols-[1.1fr_1fr] md:pb-36">
          <motion.div {...show(0.45)}>
            <div className="display mb-4 text-3xl text-lime md:text-5xl">
              <Scramble words={roles} />
            </div>
            <p className="max-w-lg text-lg leading-relaxed text-snow/90 md:text-xl">
              I design <b className="text-snow">AI products people actually understand.</b> Seven AI applications for the Indian Navy, 150+ screens and 3 design systems, built to work even when there is no internet.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a href="#work" data-cursor="Go" className="btn-pop inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-lime px-7 py-4 text-base font-extrabold text-ink">
                  See my work <span className="text-xl">↘</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="Karthickraja_Velmurugan_Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-[3px] border-snow px-7 py-4 text-base font-bold text-snow transition hover:bg-snow hover:text-cobalt">
                  Résumé ↓
                </a>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div {...show(0.6)} className="relative hidden self-end md:block">
            <div className="relative ml-auto w-fit">
              <span className="relative z-10 inline-block px-6 py-3 font-hand text-4xl text-snow">Immediate joiner</span>
              <Ring className="-inset-x-4 -inset-y-3 h-[calc(100%+24px)] w-[calc(100%+32px)]" />
              <Arrow className="absolute -left-28 top-6 h-14 w-24 -scale-x-100 rotate-12" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll hint */}
      <motion.a
        href="#stats"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
        className="absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-snow/70 md:flex"
      >
        Scroll
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-snow/60 pt-1.5">
          <motion.span className="h-2 w-1 rounded-full bg-lime" animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} />
        </span>
      </motion.a>
    </section>
  )
}
