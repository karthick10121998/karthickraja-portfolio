import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { data } from './data'
import { Cursor, Loader, Nav, ScrollProgress } from './components/chrome'
import Hero from './components/Hero'
import { CaseModal, Gallery, Work } from './components/Work'
import { About, Contact, Experience, Footer, Process, Recognition, Skills, Stats, Testimonials } from './components/Sections'
import { Tape } from './components/ui'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(null)
  const done = useCallback(() => setLoading(false), [])
  const close = useCallback(() => setActive(null), [])

  const openById = (id) => setActive(data.projects.find((p) => p.id === id))
  const next = () => {
    const i = data.projects.findIndex((p) => p.id === active.id)
    setActive(data.projects[(i + 1) % data.projects.length])
  }

  return (
    <div className="grain overflow-x-clip">
      <AnimatePresence>{loading && <Loader onDone={done} />}</AnimatePresence>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero ready={!loading} />
        <div className="relative z-20 -mt-16 mb-[-30px]">
          <Tape items={['UI/UX DESIGN', 'AI PRODUCTS', 'DESIGN SYSTEMS', 'PROTOTYPING', 'USER RESEARCH', 'REACT.JS']} rotate={-3} tone="lime" />
          <Tape items={['7 AI APPS', '150+ SCREENS', '3 DESIGN SYSTEMS', 'INDIAN NAVY', 'OFFLINE-FIRST']} rotate={2} tone="ink" reverse className="-mt-4" />
        </div>
        <Stats />
        <About />
        <Work onOpen={setActive} />
        <Gallery />
        <Process />
        <Skills />
        <Experience onOpenCase={openById} />
        <Recognition />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <CaseModal p={active} onClose={close} onNext={next} />
    </div>
  )
}
