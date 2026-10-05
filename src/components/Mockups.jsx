/* Device frames and diagrams used as project covers and in case studies. */

const asset = (src) => (src && !/^https?:|^\//.test(src) ? `${import.meta.env.BASE_URL}${src}` : src)

export function PhoneFrame({ src, alt = '', className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.6rem] border-[5px] border-fg bg-fg shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)] ${className}`}>
      <span className="absolute left-1/2 top-1.5 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-fg" />
      <img src={asset(src)} alt={alt} loading="lazy" className="block aspect-[9/19] w-full rounded-[1.2rem] bg-white object-cover object-top" />
    </div>
  )
}

export function BrowserFrame({ src, url = '', alt = '', className = '', children }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-line bg-surface shadow-[0_18px_40px_-18px_rgb(0_0_0/0.5)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line bg-raised px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-hard/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-medium/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-easy/80" />
        {url && <span className="ml-2 truncate rounded bg-bg px-2 py-0.5 font-mono text-[10px] text-muted">{url}</span>}
      </div>
      {src ? <img src={asset(src)} alt={alt} loading="lazy" className="block w-full" /> : children}
    </div>
  )
}

/** Always dark, like a real terminal, in both themes. */
export function TerminalFrame({ lines = [], title = 'zsh', className = '' }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-black/40 bg-[#001219] text-left shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ae2012]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ee9b00]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#0a9396]" />
        <span className="ml-2 font-mono text-[10px] text-white/50">{title}</span>
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[11px] leading-relaxed text-[#e9d8a6]">
        {lines.map((l, i) => {
          const [route, note] = l.split(/\s{2,}(?=\S)/)
          const [verb, ...rest] = route.split(' ')
          return (
            <div key={i} className="whitespace-pre">
              <span className="text-[#94d2bd]">{verb}</span> {rest.join(' ')}
              {note && <span className="text-[#ee9b00]">  {note}</span>}
            </div>
          )
        })}
      </pre>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Diagrams. Drawn in SVG with theme colours so they work light & dark. */

function Box({ x, y, w, h, title, sub = [], strong = false }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" className={strong ? 'fill-accent stroke-accent' : 'fill-surface stroke-line'} strokeWidth="2" />
      <text x={x + 14} y={y + 26} className={`font-cond text-[15px] font-bold uppercase ${strong ? 'fill-accent-fg' : 'fill-fg'}`}>
        {title}
      </text>
      {sub.map((s, i) => (
        <text key={i} x={x + 14} y={y + 46 + i * 17} className={`font-mono text-[11px] ${strong ? 'fill-accent-fg' : 'fill-muted'}`} style={strong ? { opacity: 0.85 } : undefined}>
          {s}
        </text>
      ))}
    </g>
  )
}

function Arrow({ d, dashed = false }) {
  return <path d={d} fill="none" className="stroke-accent2" strokeWidth="2" strokeDasharray={dashed ? '5 5' : undefined} markerEnd="url(#arrow)" />
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" className="fill-accent2" />
      </marker>
    </defs>
  )
}

const TOOLS = ['search_products', 'get_rating', 'checkout', 'get_order_history', 'get_user_preferences', 'update_user_preferences', 'describe_product_image']

export function AgentDiagram({ compact = false, className = '' }) {
  if (compact)
    return (
      <svg viewBox="0 0 520 200" className={className} role="img" aria-label="Chat UI to LLM agent to 7 tools to SQLite">
        <ArrowDefs />
        <Box x={10} y={60} w={110} h={70} title="Chat UI" sub={['Streamlit']} />
        <Box x={150} y={50} w={130} h={90} title="LLM Agent" sub={['llama-3.3-70b', 'via Groq']} strong />
        <Box x={310} y={20} w={200} h={100} title="7 Tools" sub={['search · rate · checkout', 'history · preferences', 'image → vision LLM']} />
        <Box x={310} y={140} w={200} h={52} title="SQLite" />
        <Arrow d="M120 95 H146" />
        <Arrow d="M280 85 H306" />
        <Arrow d="M410 120 V136" />
      </svg>
    )
  return (
    <svg viewBox="0 0 720 380" className={className} role="img" aria-label="Architecture of the AI Shopping Agent">
      <ArrowDefs />
      <Box x={10} y={50} w={170} h={90} title="Streamlit chat" sub={['text messages', 'image upload']} />
      <Box x={10} y={230} w={170} h={90} title="pytest evals" sub={['4 tool-call checks', '2 LLM-as-judge']} />
      <Box x={230} y={95} w={180} h={110} title="Agent" sub={['llama-3.3-70b', 'Groq · tool calling', 'guardrail prompt']} strong />
      <Box x={230} y={255} w={180} h={80} title="Vision LLM" sub={['llama-4-scout', 'describes photos']} />
      <rect x={460} y={20} width={250} height={262} rx="10" className="fill-surface stroke-line" strokeWidth="2" />
      <text x={474} y={46} className="fill-fg font-cond text-[15px] font-bold uppercase">
        7 Python tools
      </text>
      {TOOLS.map((t, i) => (
        <g key={t}>
          <rect x={474} y={60 + i * 30} width={222} height={24} rx="5" className="fill-raised" />
          <text x={484} y={76 + i * 30} className="fill-fg font-mono text-[11px]">
            {t}()
          </text>
        </g>
      ))}
      <Box x={460} y={300} w={250} h={70} title="SQLite" sub={['products · reviews · orders']} />
      <Arrow d="M180 95 C205 95 205 130 226 130" />
      <Arrow d="M410 150 H456" />
      <Arrow d="M585 282 V296" />
      <Arrow d="M474 252 C440 252 440 290 414 290" />
      <Arrow d="M180 275 C205 275 205 190 226 190" dashed />
    </svg>
  )
}

export function KafkaDiagram({ compact = false, className = '' }) {
  const H = compact ? 200 : 240
  return (
    <svg viewBox={`0 0 640 ${H}`} className={className} role="img" aria-label="Producer to order.placed topic with 3 partitions to two consumer groups">
      <ArrowDefs />
      <Box x={10} y={H / 2 - 40} w={140} h={80} title="Producer" sub={['ORDER_PLACED']} />
      <rect x={200} y={H / 2 - 70} width={210} height={140} rx="10" className="fill-accent stroke-accent" strokeWidth="2" />
      <text x={214} y={H / 2 - 44} className="fill-accent-fg font-cond text-[15px] font-bold uppercase">
        Topic: order.placed
      </text>
      {[0, 1, 2].map((p) => (
        <g key={p}>
          <rect x={214} y={H / 2 - 30 + p * 30} width={182} height={22} rx="4" className="fill-bg" opacity="0.9" />
          <text x={224} y={H / 2 - 15 + p * 30} className="fill-fg font-mono text-[11px]">
            partition {p}
          </text>
          {[0, 1, 2, 3].map((m) => (
            <rect key={m} x={318 + m * 18} y={H / 2 - 25 + p * 30} width={12} height={12} rx="2" className="fill-accent2" opacity={1 - m * 0.2} />
          ))}
        </g>
      ))}
      <Box x={460} y={H / 2 - 80} w={170} h={64} title="Notification" sub={['consumer group']} />
      <Box x={460} y={H / 2 + 16} w={170} h={64} title="Analytics" sub={['consumer group']} />
      <Arrow d={`M150 ${H / 2} H196`} />
      <Arrow d={`M410 ${H / 2} C435 ${H / 2} 435 ${H / 2 - 48} 456 ${H / 2 - 48}`} />
      <Arrow d={`M410 ${H / 2} C435 ${H / 2} 435 ${H / 2 + 48} 456 ${H / 2 + 48}`} />
    </svg>
  )
}

/** The cover shown at the top of a project card. */
export function ProjectCover({ p }) {
  const c = p.cover || {}
  if (c.type === 'phones')
    return (
      <div className="relative flex h-full items-start justify-center gap-3 overflow-hidden bg-accent/15 px-6 pt-6">
        {c.shots.map((s, i) => (
          <PhoneFrame
            key={s}
            src={s}
            className={`w-[28%] shrink-0 transition-transform duration-500 ${i === 1 ? '-translate-y-1 group-hover:-translate-y-4' : 'translate-y-5 group-hover:translate-y-2'}`}
          />
        ))}
      </div>
    )
  if (c.type === 'browser')
    return (
      <div className="flex h-full items-start justify-center overflow-hidden bg-accent2/15 px-6 pt-6">
        <BrowserFrame src={c.image} url={c.url} className="w-full transition-transform duration-500 group-hover:-translate-y-2" />
      </div>
    )
  if (c.type === 'terminal')
    return (
      <div className="h-full overflow-hidden bg-raised px-5 pt-5">
        <TerminalFrame lines={c.lines.slice(0, 7)} title="auth-service — routes" className="transition-transform duration-500 group-hover:-translate-y-2" />
      </div>
    )
  if (c.type === 'agent')
    return (
      <div className="grid h-full place-items-center bg-raised px-4">
        <AgentDiagram compact className="w-full transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
    )
  if (c.type === 'kafka')
    return (
      <div className="grid h-full place-items-center bg-raised px-4">
        <KafkaDiagram compact className="w-full transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
    )
  if (p.image) return <img src={asset(p.image)} alt="" className="h-full w-full object-cover" />
  return <div className="bg-stripes h-full bg-accent" />
}

export { asset }
