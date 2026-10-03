import Background from './components/Background'
import Navbar from './components/Navbar'
import { BackToTop, SideRail } from './components/SideRail'
import Hero from './sections/Hero'
import About from './sections/About'
import Journey from './sections/Journey'
import Toolkit from './sections/Toolkit'
import Projects from './sections/Projects'
import Contributions from './sections/Contributions'
import LeetCode from './sections/LeetCode'
import Contact from './sections/Contact'

/**
 * Each section is a full-screen "panel". On desktop the page snaps from
 * panel to panel (see .panel in index.css); the dot rail on the right
 * shows where you are.
 */
export default function App() {
  return (
    <>
      <Background />
      <Navbar />
      <SideRail />
      <main>
        <Hero />
        <About />
        <Journey />
        <Toolkit />
        <Projects />
        <Contributions />
        <LeetCode />
        <Contact />
      </main>
      <BackToTop />
    </>
  )
}
