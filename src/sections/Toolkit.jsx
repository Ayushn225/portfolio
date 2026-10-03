import { LuBoxes, LuCode, LuDatabase, LuGraduationCap } from 'react-icons/lu'
import { skills } from '../data/portfolio'
import { Card, Heading, Panel, Reveal, SpotlightGroup } from '../components/ui'

const icons = [LuCode, LuBoxes, LuDatabase, LuGraduationCap]

export default function Toolkit() {
  const all = skills.flatMap((g) => g.items)
  return (
    <Panel id="toolkit" tone="alt">
      <Heading index="04" eyebrow="Skills" title="Toolkit" intro="Languages, frameworks and tools I use to build and ship." />

      <SpotlightGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g, i) => {
          const Icon = icons[i % icons.length]
          return (
            <Reveal key={g.group} delay={i * 80}>
              <Card tilt className="group h-full overflow-hidden p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-xl text-accent-fg transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                    <Icon />
                  </span>
                  <span className="display text-4xl text-line transition-colors duration-300 group-hover:text-accent2">{String(g.items.length).padStart(2, '0')}</span>
                </div>
                <h3 className="display mt-5 text-2xl text-fg">{g.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-line px-2.5 py-1 font-cond text-sm font-semibold text-fg/85 transition hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-accent-fg"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          )
        })}
      </SpotlightGroup>

      {/* ticker strip */}
      <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden bg-fg py-3">
        <div className="flex w-max animate-marquee gap-8 hover:[animation-play-state:paused]">
          {[...all, ...all].map((s, i) => (
            <span key={i} className="display flex items-center gap-8 whitespace-nowrap text-2xl text-bg">
              {s}
              <span className="h-2 w-2 rotate-45 bg-accent2" />
            </span>
          ))}
        </div>
      </div>
    </Panel>
  )
}
