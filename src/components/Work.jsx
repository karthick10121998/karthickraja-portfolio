import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { data } from '../data'
import { BrowserFrame, Label, PhoneFrame, Reveal, SplitHeading, Star, Tilt } from './ui'

const filters = [
  ['all', 'All work'],
  ['ai', 'AI products'],
  ['product', 'Product & web'],
  ['personal', 'Personal'],
]

function Visual({ p, big = false }) {
  if (p.device === 'phone')
    return (
      <div className="flex justify-center gap-4">
        <PhoneFrame src={p.image} alt={`${p.title} concept screen`} className={big ? 'w-[230px]' : 'w-[160px] md:w-[180px]'} />
      </div>
    )
  if (p.device === 'image')
    return <img src={p.image} alt={`${p.title} design`} loading="lazy" className="w-full rounded-xl border-[3px] border-ink" />
  return <BrowserFrame src={p.image} alt={`${p.title} concept screen`} />
}

function Card({ p, i, onOpen }) {
  const bg = ['bg-snow text-ink', 'bg-lime text-ink', 'bg-ink text-snow'][i % 3]
  const stage = ['bg-cobalt', 'bg-cobalt', 'bg-cobalt-deep'][i % 3]
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.45 }}
    >
      <Tilt max={5}>
        <button
          onClick={() => onOpen(p)}
          data-cursor="Open"
          className={`card-pop group block w-full overflow-hidden rounded-3xl border-[3px] border-ink text-left ${bg}`}
        >
          <div className={`relative flex h-[300px] items-start justify-center overflow-hidden ${stage} px-6 pt-12 md:h-[340px] md:px-10`}>
            <div className="halftone absolute inset-0 opacity-50" />
            <div className="relative w-full transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-[1.04]">
              <Visual p={p} />
            </div>
            <span className="absolute left-4 top-4 rounded-full border-2 border-ink bg-lime px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
              {p.year}
            </span>
            {p.device !== 'image' && (
              <span className="absolute bottom-3 right-4 z-10 rounded-full bg-ink/80 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-snow/70">Illustrative concept</span>
            )}
          </div>
          <div className="flex items-start justify-between gap-4 p-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-70">{p.tag}</div>
              <h3 className="display mt-2 text-3xl md:text-4xl">{p.title}</h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed opacity-80">{p.summary}</p>
            </div>
            <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-current text-xl transition-transform duration-300 group-hover:-rotate-45">
              →
            </span>
          </div>
        </button>
      </Tilt>
    </motion.article>
  )
}

function Featured({ p, onOpen }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 40])
  return (
    <Reveal>
      <button
        ref={ref}
        onClick={() => onOpen(p)}
        data-cursor="Read"
        className="card-pop group relative grid w-full overflow-hidden rounded-[32px] border-[3px] border-ink bg-snow text-left text-ink md:grid-cols-[1fr_1.15fr]"
      >
        <div className="relative z-10 flex flex-col justify-between gap-8 p-7 md:p-10">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-lime">★ Featured case study</span>
              <span className="rounded-full border-2 border-ink px-3 py-1 font-mono text-[10px] uppercase tracking-widest">{p.year}</span>
            </div>
            <h3 className="display mt-6 text-5xl leading-[0.9] md:text-7xl">
              AI that works <span className="text-cobalt">offline.</span>
            </h3>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/80">{p.summary}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {p.numbers.map((n) => (
              <div key={n.label} className="rounded-2xl border-[3px] border-ink bg-lime/0 p-3 transition group-hover:bg-lime">
                <div className="display text-4xl text-cobalt">{n.n}</div>
                <div className="text-xs font-semibold uppercase tracking-wide">{n.label}</div>
              </div>
            ))}
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cobalt px-6 py-3 font-bold text-snow transition group-hover:bg-ink group-hover:text-lime">
            Read the case study →
          </span>
        </div>
        <div className="relative min-h-[380px] overflow-hidden bg-cobalt p-6 md:p-10">
          <div className="halftone absolute inset-0 opacity-50" />
          <motion.div style={{ y: y1 }} className="relative z-10 mt-6 md:mt-10">
            <BrowserFrame src="img/work/dash.webp" alt="Illustrative AI operations dashboard" className="shadow-2xl" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="relative z-20 -mt-16 ml-auto w-[72%]">
            <BrowserFrame src="img/work/chat.webp" alt="Illustrative offline AI assistant" className="shadow-2xl" />
          </motion.div>
          <Star className="absolute right-4 top-4 z-30 h-28 w-28 rotate-12 md:h-32 md:w-32">
            <span className="display text-base leading-tight">
              REAL SCREENS
              <br />
              UNDER NDA
            </span>
          </Star>
          <span className="absolute bottom-3 left-6 z-30 font-mono text-[10px] uppercase tracking-widest text-snow/70">
            Illustrative concepts · not the real product
          </span>
        </div>
      </button>
    </Reveal>
  )
}

export function Work({ onOpen }) {
  const [f, setF] = useState('all')
  const featured = data.projects.find((p) => p.featured)
  const rest = data.projects.filter((p) => !p.featured && (f === 'all' || p.cat === f))
  return (
    <section id="work" className="relative overflow-hidden bg-cobalt px-5 py-24 md:px-8 md:py-32">
      <div className="halftone absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <Label n="02" className="text-lime">Selected work</Label>
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SplitHeading text="WORK THAT SHIPPED." className="display text-6xl text-snow md:text-[9vw]" />
          <Reveal className="max-w-sm text-snow/80">
            Click any project for the full case study: the problem, my role, key decisions and outcome.
          </Reveal>
        </div>

        {(f === 'all' || f === 'ai') && <Featured p={featured} onOpen={onOpen} />}

        <div className="no-scrollbar mb-10 mt-16 flex gap-2 overflow-x-auto">
          {filters.map(([k, t]) => (
            <button
              key={k}
              onClick={() => setF(k)}
              className={`relative shrink-0 rounded-full border-[3px] border-ink px-5 py-2.5 text-sm font-bold transition ${
                f === k ? 'text-ink' : 'bg-cobalt-deep text-snow hover:bg-snow/10'
              }`}
            >
              {f === k && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-lime" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {rest.map((p, i) => (
              <Card key={p.id} p={p} i={i} onOpen={onOpen} />
            ))}
          </AnimatePresence>
        </motion.div>

        {(f === 'all' || f === 'ai') && (
          <Reveal className="mt-12 grid gap-4 md:grid-cols-2">
            {data.also.map((a) => (
              <div key={a.t} className="rounded-2xl border-2 border-dashed border-snow/40 p-5 text-snow">
                <div className="font-mono text-[10px] uppercase tracking-widest text-lime">Also designed · Indian Navy</div>
                <div className="display mt-2 text-2xl">{a.t}</div>
                <p className="mt-1 text-sm text-snow/75">{a.d}</p>
              </div>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  )
}

/* ---------------- Case study modal ---------------- */
function Block({ title, children, n }) {
  return (
    <Reveal className="grid gap-4 border-t-[3px] border-ink py-10 md:grid-cols-[220px_1fr]">
      <div className="flex items-start gap-3">
        <span className="font-mono text-xs text-cobalt">{n}</span>
        <h4 className="display text-3xl">{title}</h4>
      </div>
      <div>{children}</div>
    </Reveal>
  )
}

export function CaseModal({ p, onClose, onNext }) {
  const box = useRef(null)
  useEffect(() => {
    if (!p) return
    document.body.style.overflow = 'hidden'
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    box.current?.scrollTo(0, 0)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', k)
    }
  }, [p, onClose])

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          className="fixed inset-0 z-[80] bg-ink/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={box}
            key={p.id}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
            className="absolute inset-x-0 bottom-0 top-4 overflow-y-auto rounded-t-[32px] border-t-[3px] border-ink bg-snow text-ink md:inset-x-6 md:top-8"
          >
            {/* sticky bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b-[3px] border-ink bg-snow/95 px-5 py-3 backdrop-blur md:px-10">
              <span className="font-mono text-[11px] uppercase tracking-widest">Case study · {p.title}</span>
              <button onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-xl text-lime transition hover:rotate-90" aria-label="Close">
                ✕
              </button>
            </div>

            {/* hero */}
            <div className="relative overflow-hidden bg-cobalt px-5 pb-14 pt-12 text-snow md:px-10">
              <div className="halftone absolute inset-0 opacity-40" />
              <div className="relative mx-auto max-w-6xl">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-lime">{p.tag} · {p.year}</div>
                <h2 className="display mt-4 text-5xl md:text-8xl">{p.title}</h2>
                <p className="mt-5 max-w-2xl text-lg text-snow/85">{p.summary}</p>
                <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                  {p.meta.map((m) => (
                    <div key={m.k} className="rounded-2xl border-2 border-snow/30 p-3">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-lime">{m.k}</div>
                      <div className="mt-1 text-sm font-semibold">{m.v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex justify-center">
                  <div className={p.device === 'phone' ? 'w-[260px]' : 'w-full max-w-4xl'}>
                    <Visual p={p} big />
                  </div>
                </div>
                {p.device !== 'image' && (
                  <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-snow/60">
                    {p.confidential ? 'Illustrative concept · real screens are confidential (NDA)' : 'Illustrative concept screen'}
                  </p>
                )}
              </div>
            </div>

            <div className="mx-auto max-w-6xl px-5 md:px-10">
              <Block n="01" title="Overview">
                <p className="text-lg leading-relaxed">{p.overview}</p>
              </Block>
              <Block n="02" title="The challenge">
                <ul className="space-y-3">
                  {p.challenge.map((c) => (
                    <li key={c} className="flex gap-3 text-lg">
                      <span className="mt-2 h-3 w-3 shrink-0 rounded-full bg-cobalt" />
                      {c}
                    </li>
                  ))}
                </ul>
              </Block>
              <Block n="03" title="My role">
                <div className="flex flex-wrap gap-2">
                  {p.role.map((r) => (
                    <span key={r} className="rounded-full border-2 border-ink bg-lime px-4 py-2 text-sm font-semibold">
                      ✓ {r}
                    </span>
                  ))}
                </div>
              </Block>
              {p.designed && (
                <Block n="04" title="What I designed">
                  <div className="grid gap-5 md:grid-cols-3">
                    {p.designed.map((d) => (
                      <div key={d.t} className="overflow-hidden rounded-2xl border-[3px] border-ink">
                        <div className="bg-cobalt p-3">
                          <img src={d.img} alt={`${d.t} illustrative concept`} loading="lazy" className="rounded-lg" />
                        </div>
                        <div className="p-4">
                          <b className="text-lg">{d.t}</b>
                          <p className="mt-1 text-sm text-ink/75">{d.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Block>
              )}
              <Block n={p.designed ? '05' : '04'} title="Key decisions">
                <div className="grid gap-4 md:grid-cols-2">
                  {p.decisions.map((d, i) => (
                    <div key={d.t} className="card-pop rounded-2xl border-[3px] border-ink bg-snow p-5" style={{ boxShadow: '6px 6px 0 #0B1020' }}>
                      <div className="display text-4xl text-cobalt">0{i + 1}</div>
                      <b className="mt-2 block text-lg">{d.t}</b>
                      <p className="mt-1 text-ink/75">{d.d}</p>
                    </div>
                  ))}
                </div>
              </Block>
              <Block n={p.designed ? '06' : '05'} title="Outcome">
                <div className="rounded-3xl border-[3px] border-ink bg-lime p-6 text-xl font-semibold leading-relaxed">{p.outcome}</div>
                {p.numbers && (
                  <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {p.numbers.map((n) => (
                      <div key={n.label} className="rounded-2xl bg-cobalt p-4 text-snow">
                        <div className="display text-5xl text-lime">{n.n}</div>
                        <div className="text-sm">{n.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Block>
              {p.learned && (
                <Block n="07" title="What I learned">
                  <ul className="space-y-3">
                    {p.learned.map((l) => (
                      <li key={l} className="font-hand text-3xl leading-tight text-cobalt">→ {l}</li>
                    ))}
                  </ul>
                </Block>
              )}
              {p.id === 'passionpro' && (
                <div className="pb-4">
                  <a href={data.person.behance} target="_blank" rel="noreferrer" className="btn-pop inline-flex rounded-full border-[3px] border-ink bg-cobalt px-6 py-3 font-bold text-snow">
                    See the full case study on Behance ↗
                  </a>
                </div>
              )}
              <div className="flex flex-col items-start justify-between gap-4 border-t-[3px] border-ink py-10 md:flex-row md:items-center">
                <button onClick={onClose} className="font-semibold underline underline-offset-4">← Back to all work</button>
                <button onClick={onNext} className="btn-pop rounded-full border-[3px] border-ink bg-lime px-6 py-3 font-extrabold">
                  Next project →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------------- Concept gallery: drag carousel + lightbox ---------------- */
export function Gallery() {
  const [open, setOpen] = useState(null)
  const track = useRef(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    const m = () => track.current && setW(track.current.scrollWidth - track.current.offsetWidth)
    m()
    window.addEventListener('resize', m)
    return () => window.removeEventListener('resize', m)
  }, [])
  const list = data.concepts
  const go = (d) => setOpen((o) => (o + d + list.length) % list.length)

  useEffect(() => {
    if (open === null) return
    const k = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  })

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-snow md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Label n="03" className="text-lime">Playground</Label>
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SplitHeading text="CONCEPTS & EXPLORATIONS" className="display text-5xl md:text-8xl" wordClass="" />
          <Reveal className="max-w-sm text-snow/70">Landing pages and a UX research study from my design course. Drag the strip, click to zoom.</Reveal>
        </div>
      </div>
      <div ref={track} className="overflow-hidden px-5 md:px-8" data-cursor="Drag">
        <motion.div drag="x" dragConstraints={{ left: -w, right: 0 }} className="flex w-max gap-6">
          {list.map((c, i) => (
            <motion.button
              key={c.t}
              onClick={() => setOpen(i)}
              whileHover={{ y: -10, rotate: i % 2 ? 1.5 : -1.5 }}
              className="group w-[260px] shrink-0 text-left md:w-[340px]"
            >
              <div className="relative h-[340px] overflow-hidden rounded-2xl border-[3px] border-snow/80 bg-cobalt md:h-[420px]">
                <img src={c.img} alt={c.t} draggable={false} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-lime text-ink opacity-0 transition group-hover:opacity-100">⤢</span>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <b className="display text-2xl">{c.t}</b>
                <span className="font-mono text-xs text-lime">0{i + 1}</span>
              </div>
              <div className="text-sm text-snow/60">{c.d}</div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[85] flex items-center justify-center bg-ink/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.img
              key={open}
              src={list[open].img}
              alt={list[open].t}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-h-[82vh] max-w-full rounded-xl border-[3px] border-lime object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => go(-1)} className="h-12 w-12 rounded-full bg-snow text-xl text-ink">←</button>
              <span className="display min-w-[200px] text-center text-2xl">{list[open].t}</span>
              <button onClick={() => go(1)} className="h-12 w-12 rounded-full bg-lime text-xl text-ink">→</button>
            </div>
            <button className="absolute right-5 top-5 h-12 w-12 rounded-full bg-lime text-xl text-ink" onClick={() => setOpen(null)} aria-label="Close">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
