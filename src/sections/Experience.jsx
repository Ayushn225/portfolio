import { LuBriefcase, LuGraduationCap } from 'react-icons/lu'
import { experience, education } from '../data/portfolio'
import { Card, Chip, Section } from '../components/ui'
import Timeline from '../components/Timeline'

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked." intro="Internships and the things I keep doing outside class.">
      <Timeline
        items={experience}
        renderItem={(x) => (
          <Card tilt className="p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs text-accent">{x.period}</span>
              <Chip className="!py-0.5">{x.type}</Chip>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold text-fg sm:text-xl">{x.role}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted">
              <LuBriefcase className="shrink-0" /> {x.company} · {x.location}
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-fg/75">
              {x.points.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {x.tech.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </Card>
        )}
      />
    </Section>
  )
}

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="What I've studied.">
      <Timeline
        items={education}
        renderItem={(x) => (
          <Card tilt className="p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-xl text-accent">
                <LuGraduationCap />
              </span>
              <div className="min-w-0">
                <span className="font-mono text-xs text-accent">{x.period}</span>
                <h3 className="mt-1 font-display text-lg font-bold text-fg">{x.degree}</h3>
                <p className="text-sm text-muted">
                  {x.school} · {x.location}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-fg">{x.grade}</span>
            </div>
            {x.highlights?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {x.highlights.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            )}
          </Card>
        )}
      />
    </Section>
  )
}
