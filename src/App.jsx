import { useEffect, useState } from 'react'
import { LuArrowUp } from 'react-icons/lu'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import { Experience, Education } from './sections/Experience'
import Projects from './sections/Projects'
import Contributions from './sections/Contributions'
import LeetCode from './sections/LeetCode'
import { Achievements, Contact } from './sections/Contact'
import { profile } from './data/portfolio'

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 800)
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`icon-btn fixed bottom-5 right-5 z-40  transition-all duration-500 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <LuArrowUp />
    </a>
  )
}

export default function App() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Contributions />
        <LeetCode />
        <Achievements />
        <Contact />
      </main>
      <footer className="border-t border-line px-4 py-10 text-center text-sm text-muted sm:px-6">
        <p>
          Designed & built by <span className="text-fg">{profile.firstName} {profile.lastName}</span> · © {new Date().getFullYear()}
        </p>
      </footer>
      <BackToTop />
    </>
  )
}
