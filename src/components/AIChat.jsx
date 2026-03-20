import { useState, useEffect, useRef, useCallback } from 'react'
import { Terminal } from 'lucide-react'

/* ─── colour palette ─── */
const C = {
  green:  '#00ff88',
  cyan:   '#00d4ff',
  purple: '#a78bfa',
  yellow: '#fbbf24',
  pink:   '#f472b6',
  white:  '#e2e8f0',
  dim:    '#6b7280',
  muted:  '#4b5563',
}

/* ─── boot sequence ─── */
const BOOT = [
  { text: 'Initializing portfolio terminal v2.6…',           color: C.dim,    delay: 0   },
  { text: '> Loading profile data…                  ✓',      color: C.green,  delay: 200 },
  { text: '> Parsing 26 skills across 5 domains…    ✓',      color: C.green,  delay: 400 },
  { text: '> Indexing 3 enterprise projects…         ✓',      color: C.green,  delay: 580 },
  { text: '> Verifying 3+ yrs experience log…       ✓',      color: C.green,  delay: 740 },
  { text: '> AI engine ready.                        ✓',      color: C.cyan,   delay: 900 },
  { text: '',                                                  color: C.dim,    delay: 980 },
  { text: "Type  help  to see all commands.",                  color: C.white,  delay:1060 },
]

/* ─── command responses ─── */
const CMDS = {
  help: () => [
    { t: '┌─ Available Commands ─────────────────────────────┐', c: C.purple },
    { t: '│                                                   │', c: C.muted  },
    { t: '│  skills       →  Full tech stack breakdown        │', c: C.white  },
    { t: '│  projects     →  Delivered projects + metrics     │', c: C.white  },
    { t: '│  experience   →  Career timeline                  │', c: C.white  },
    { t: '│  education    →  Academic & self-taught path      │', c: C.white  },
    { t: '│  contact      →  All ways to reach Sethu          │', c: C.white  },
    { t: '│  availability →  Hiring status                    │', c: C.white  },
    { t: '│  match <kw>   →  Quick skill match check          │', c: C.cyan   },
    { t: '│  hire         →  🚀  (try it)                     │', c: C.yellow },
    { t: '│  clear        →  Reset terminal                   │', c: C.dim    },
    { t: '│                                                   │', c: C.muted  },
    { t: '└───────────────────────────────────────────────────┘', c: C.purple },
  ],

  skills: () => [
    { t: '● Tech Stack — Sethuvekram Shanmugasundaram', c: C.cyan   },
    { t: '',                                           c: C.dim    },
    { t: '  🎨  Frontend',                            c: C.yellow },
    { t: '      React.js   ████████████  92%',        c: C.green  },
    { t: '      JS ES6+    ████████████  90%',        c: C.green  },
    { t: '      TypeScript ████████░░░   70%',        c: C.green  },
    { t: '      Tailwind   ████████████  85%',        c: C.green  },
    { t: '',                                           c: C.dim    },
    { t: '  ⚙️  Backend',                             c: C.purple },
    { t: '      Spring Boot ████████████ 88%',        c: C.green  },
    { t: '      Node.js     ████████████ 85%',        c: C.green  },
    { t: '      REST APIs   ████████████ 90%',        c: C.green  },
    { t: '',                                           c: C.dim    },
    { t: '  🗄️  Databases',                           c: C.cyan   },
    { t: '      MongoDB    ████████████  85%',        c: C.green  },
    { t: '      PostgreSQL ████████████  82%',        c: C.green  },
    { t: '',                                           c: C.dim    },
    { t: '  ☁️  Cloud & DevOps',                      c: C.yellow },
    { t: '      AWS (EC2 · S3 · ECS · RDS) 80%',    c: C.green  },
    { t: '      Docker       ████████████ 82%',       c: C.green  },
    { t: '      GitHub Actions + Jenkins  (CI/CD)',   c: C.green  },
    { t: '',                                           c: C.dim    },
    { t: '  Run  match <keyword>  to check role fit', c: C.dim    },
  ],

  projects: () => [
    { t: '● Delivered Projects',                                        c: C.cyan   },
    { t: '',                                                             c: C.dim    },
    { t: '  [1] eCommerce Inventory & Order Management',                c: C.yellow },
    { t: '      Stack  : React · Spring Boot · MongoDB · AWS',          c: C.white  },
    { t: '      Impact : 15K+ SKUs · 60% fewer billing errors',         c: C.green  },
    { t: '      Status : 🔒 Private · Delivered 2023 · Live',           c: C.dim    },
    { t: '',                                                             c: C.dim    },
    { t: '  [2] Sales Performance Dashboard',                           c: C.yellow },
    { t: '      Stack  : React · Spring Boot · PostgreSQL',             c: C.white  },
    { t: '      Impact : Reports 2h → 30s · 3 sales teams',            c: C.green  },
    { t: '      Status : 🔒 Private · Delivered 2024 · Live',           c: C.dim    },
    { t: '',                                                             c: C.dim    },
    { t: '  [3] Startup Customer-Facing Websites (×3)',                 c: C.yellow },
    { t: '      Stack  : React · Vite · Tailwind CSS',                  c: C.white  },
    { t: '      Impact : 95+ Lighthouse · <1.5s mobile load',           c: C.green  },
    { t: '      Status : 🔒 Private · Delivered 2024 · Live',           c: C.dim    },
    { t: '',                                                             c: C.dim    },
    { t: '  Email sethu.nextgen@gmail.com for case studies →',          c: C.cyan   },
  ],

  experience: () => [
    { t: '● Career Timeline',                                                c: C.cyan   },
    { t: '',                                                                  c: C.dim    },
    { t: '  ┌─ 2025 – Present ───────────────────────────────┐',             c: C.pink   },
    { t: '  │  Product Strategy Lead                         │',             c: C.white  },
    { t: '  │  Shinelogics Informatics · Chennai             │',             c: C.dim    },
    { t: '  │  · Own product roadmap & prioritization        │',             c: C.white  },
    { t: '  │  · Bridge business requirements ↔ engineering  │',             c: C.white  },
    { t: '  └────────────────────────────────────────────────┘',             c: C.pink   },
    { t: '',                                                                  c: C.dim    },
    { t: '  ┌─ 2022 – 2025 ──────────────────────────────────┐',             c: C.cyan   },
    { t: '  │  Full-Stack Developer                          │',             c: C.white  },
    { t: '  │  Shinelogics Informatics · Chennai             │',             c: C.dim    },
    { t: '  │  · Built enterprise React + Spring Boot apps   │',             c: C.white  },
    { t: '  │  · Promoted → Product Strategy Lead  ✓         │',             c: C.green  },
    { t: '  └────────────────────────────────────────────────┘',             c: C.cyan   },
  ],

  education: () => [
    { t: '● Academic Background',                                       c: C.cyan   },
    { t: '',                                                             c: C.dim    },
    { t: '  🎓  B.E. Mechanical Engineering',                           c: C.yellow },
    { t: '      K.S.Rangasamy College of Technology',                   c: C.white  },
    { t: '      Anna University  |  Graduated: 2021',                   c: C.dim    },
    { t: '',                                                             c: C.dim    },
    { t: '  💡  Self-taught full-stack dev (2021 – 2022)',              c: C.white  },
    { t: '      "From stress calculations → system architecture"',      c: C.green  },
    { t: '',                                                             c: C.dim    },
    { t: '  🎯  Target: AWS Certified Developer 2025',                  c: C.cyan   },
  ],

  contact: () => [
    { t: '● Contact Information',                                            c: C.cyan  },
    { t: '',                                                                  c: C.dim   },
    { t: '  📧  Email    :  sethu.nextgen@gmail.com',                        c: C.white },
    { t: '  🐙  GitHub   :  github.com/sethuvekram',                         c: C.white },
    { t: '  💼  LinkedIn :  in/sethuvekram-shanmugasundaram-215303147',       c: C.white },
    { t: '  📍  Location :  Chennai, India  (remote / hybrid / onsite)',      c: C.white },
    { t: '  ⏱️  Response :  Typically within 24 hours',                       c: C.green },
    { t: '',                                                                  c: C.dim   },
    { t: '  Or scroll ↓ and use the Contact form directly.',                  c: C.dim   },
  ],

  availability: () => [
    { t: '● Availability Status',                                  c: C.cyan  },
    { t: '',                                                        c: C.dim   },
    { t: '  Status : ● OPEN TO OPPORTUNITIES',                     c: C.green },
    { t: '',                                                        c: C.dim   },
    { t: '  ✓  Full-Stack Development roles',                      c: C.green },
    { t: '  ✓  Backend / API Architecture',                        c: C.green },
    { t: '  ✓  Product Engineering leadership',                    c: C.green },
    { t: '  ✓  Cloud / DevOps-focused positions',                  c: C.green },
    { t: '  ✓  Remote, Hybrid, or Onsite (Chennai)',               c: C.green },
    { t: '',                                                        c: C.dim   },
    { t: '  Reach out →  sethu.nextgen@gmail.com',                 c: C.cyan  },
  ],

  hire: () => [
    { t: '',                                                                 c: C.dim    },
    { t: '  > Authenticating request…',                                      c: C.yellow },
    { t: '  > Verifying candidate profile…',                                 c: C.yellow },
    { t: '  > Cross-referencing 3+ years of production code…',               c: C.yellow },
    { t: '  > Scanning 3 enterprise-grade live projects…',                   c: C.yellow },
    { t: '  > Calculating culture fit score…',                               c: C.yellow },
    { t: '',                                                                  c: C.dim    },
    { t: '  ╔════════════════════════════════════════╗',                      c: C.green  },
    { t: '  ║  ✅  CANDIDATE APPROVED FOR HIRE       ║',                     c: C.green  },
    { t: '  ║                                        ║',                     c: C.green  },
    { t: '  ║  Confidence   :  98.7%                 ║',                     c: C.green  },
    { t: '  ║  Time to ROI  :  < 30 days             ║',                     c: C.green  },
    { t: '  ║  10x Status   :  CONFIRMED             ║',                     c: C.green  },
    { t: '  ╚════════════════════════════════════════╝',                      c: C.green  },
    { t: '',                                                                  c: C.dim    },
    { t: '  Next step → sethu.nextgen@gmail.com 🚀',                         c: C.cyan   },
  ],

  whoami: () => [
    { t: '  Sethuvekram Shanmugasundaram',                          c: C.yellow },
    { t: '  Product Strategy Lead & Full-Stack Developer',          c: C.white  },
    { t: '  Shinelogics Informatics · Chennai, India',              c: C.dim    },
    { t: '',                                                         c: C.dim    },
    { t: '  3+ yrs · React · Spring Boot · Node.js · AWS',         c: C.green  },
    { t: '  Promoted: Developer → Product Strategy Lead ✓',        c: C.cyan   },
  ],

  clear: () => null,
}

/* ─── match <keyword> ─── */
const MATCH_SKILLS = [
  { name: 'React',        keys: ['react'] },
  { name: 'Spring Boot',  keys: ['spring', 'java'] },
  { name: 'Node.js',      keys: ['node'] },
  { name: 'TypeScript',   keys: ['typescript', 'ts'] },
  { name: 'AWS',          keys: ['aws', 'cloud', 'ec2', 's3'] },
  { name: 'Docker',       keys: ['docker', 'container'] },
  { name: 'MongoDB',      keys: ['mongo', 'nosql'] },
  { name: 'PostgreSQL',   keys: ['postgres', 'sql'] },
  { name: 'CI/CD',        keys: ['ci', 'cd', 'cicd', 'pipeline', 'jenkins'] },
  { name: 'Microservices',keys: ['microservice', 'distributed'] },
  { name: 'REST APIs',    keys: ['rest', 'api', 'restful'] },
  { name: 'Agile/Scrum',  keys: ['agile', 'scrum', 'sprint'] },
  { name: 'JavaScript',   keys: ['javascript', 'js', 'es6'] },
  { name: 'Grafana',      keys: ['grafana', 'monitoring'] },
]

function matchCmd(arg) {
  if (!arg) return [{ t: '  Usage: match <keyword>   e.g.  match react spring', c: C.dim }]
  const lower = arg.toLowerCase()
  const found  = MATCH_SKILLS.filter(s => s.keys.some(k => lower.includes(k))).map(s => s.name)
  if (!found.length) return [
    { t: `  No direct match for "${arg}" in skill set.`, c: C.yellow },
    { t: '  Try: react, spring, node, aws, docker, postgres…', c: C.dim },
  ]
  return [
    { t: `  Matching "${arg}" against Sethuvekram's skills…`, c: C.dim },
    { t: '', c: '' },
    ...found.map(f => ({ t: `  ✓  ${f}`, c: C.green })),
    { t: '', c: '' },
    { t: `  ${found.length}/${MATCH_SKILLS.length} core skills aligned.`, c: C.cyan },
    { t: '  Run  projects  to see real-world usage →', c: C.dim },
  ]
}

/* ─── NL fallback ─── */
function nlFallback(input) {
  const q = input.toLowerCase()
  if (/skill|tech|stack|language|framework/.test(q))   return CMDS.skills()
  if (/project|built|system|dashboard/.test(q))        return CMDS.projects()
  if (/experience|career|work|job|role/.test(q))       return CMDS.experience()
  if (/education|college|degree|university/.test(q))   return CMDS.education()
  if (/contact|email|reach|call|phone/.test(q))        return CMDS.contact()
  if (/available|hire|hiring|open|opportunit/.test(q)) return CMDS.availability()
  if (/who|about|yourself|name|introduce/.test(q))     return CMDS.whoami()
  return [
    { t: `  Command not recognised: "${input}"`, c: C.yellow },
    { t: '  Type  help  to see all commands.',   c: C.dim   },
  ]
}

/* ─── resolve input ─── */
function resolve(raw) {
  const lower        = raw.trim().toLowerCase()
  const [cmd, ...rest] = lower.split(/\s+/)
  const arg          = rest.join(' ')

  if (cmd === 'match')                           return matchCmd(arg)
  if (cmd === 'ls' || cmd === 'dir')             return CMDS.help()
  if (cmd === 'pwd')                             return [{ t: '/home/visitor/sethu-portfolio', c: C.green }]
  if (cmd === 'exit' || cmd === 'quit')          return [{ t: '  Goodbye! 👋', c: C.dim }]
  if (cmd === 'clear')                           return null
  if (CMDS[cmd])                                 return CMDS[cmd]()
  return nlFallback(raw.trim())
}

/* ─── Main component ─── */
export default function AIChat() {
  const [open,      setOpen]      = useState(false)
  const [lines,     setLines]     = useState([])
  const [input,     setInput]     = useState('')
  const [booted,    setBooted]    = useState(false)
  const [history,   setHistory]   = useState([])
  const [histIdx,   setHistIdx]   = useState(-1)
  const [minimised, setMinimised] = useState(false)
  const [pulse,     setPulse]     = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  /* boot animation */
  useEffect(() => {
    if (!open || booted) return
    const timers = BOOT.map(({ text, color, delay }) =>
      setTimeout(() =>
        setLines(l => [...l, { text, color, id: Math.random() }])
      , delay)
    )
    const done = setTimeout(() => setBooted(true), BOOT[BOOT.length - 1].delay + 60)
    return () => { timers.forEach(clearTimeout); clearTimeout(done) }
  }, [open, booted])

  /* auto-scroll */
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [lines])

  /* focus on open */
  useEffect(() => {
    if (open && !minimised) setTimeout(() => inputRef.current?.focus(), 80)
  }, [open, minimised])

  /* attention pulse every 10s */
  useEffect(() => {
    const t = setInterval(() => { setPulse(true); setTimeout(() => setPulse(false), 900) }, 10000)
    return () => clearInterval(t)
  }, [])

  const addLines = useCallback(newLines =>
    setLines(l => [...l, ...newLines.map(nl => ({ t: nl.t, c: nl.c, text: nl.t, color: nl.c, id: Math.random() }))]),
  [])

  const submit = useCallback(() => {
    const raw = input.trim()
    if (!raw) return
    setInput('')
    setHistory(h => [raw, ...h])
    setHistIdx(-1)

    /* echo */
    setLines(l => [...l, { text: `visitor@sethu.dev:~$ ${raw}`, color: C.cyan, id: Math.random() }])

    const result = resolve(raw)
    if (result === null) { setLines([]); return }

    setLines(l => [...l,
      ...result.map(nl => ({ text: nl.t, color: nl.c, id: Math.random() })),
      { text: '', color: '', id: Math.random() },
    ])
  }, [input])

  const handleKey = useCallback(e => {
    if (e.key === 'Enter') { submit(); return }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistIdx(i => { const n = Math.min(i + 1, history.length - 1); setInput(history[n] || ''); return n })
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistIdx(i => { const n = Math.max(i - 1, -1); setInput(n === -1 ? '' : history[n]); return n })
    }
  }, [submit, history])

  return (
    <>
      {/* Floating terminal pill */}
      {!open && (
        <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 9999 }}>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open terminal"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '10px 20px', borderRadius: 50, border: 'none', cursor: 'pointer',
              background: 'rgba(5,8,22,0.96)',
              boxShadow: '0 0 0 1px rgba(0,255,136,0.35), 0 8px 32px rgba(0,0,0,0.55)',
              color: C.green,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.82rem', fontWeight: 500,
              transition: 'box-shadow 0.25s, transform 0.2s',
              position: 'relative',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,255,136,0.7), 0 12px 40px rgba(0,0,0,0.6)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,255,136,0.35), 0 8px 32px rgba(0,0,0,0.55)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <Terminal size={14} />
            <span style={{ color: C.dim }}>~/</span>
            <span>sethu</span>
            <span style={{
              display: 'inline-block', width: 8, height: 15,
              background: C.green, borderRadius: 1, marginLeft: 2,
              animation: 'term-blink 1.1s step-start infinite',
            }} />
            {pulse && (
              <span style={{
                position: 'absolute', inset: -5, borderRadius: 50,
                border: '2px solid rgba(0,255,136,0.45)',
                animation: 'term-ping 0.8s ease-out forwards',
                pointerEvents: 'none',
              }} />
            )}
          </button>
        </div>
      )}

      {/* Terminal window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
          width: 530,
          height: minimised ? 42 : 540,
          background: '#0b0e18',
          border: '1px solid rgba(0,255,136,0.16)',
          borderRadius: 12,
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 0 0 1px rgba(0,255,136,0.06), 0 30px 80px rgba(0,0,0,0.75)',
          overflow: 'hidden',
          fontFamily: "'JetBrains Mono', monospace",
          animation: 'term-open 0.22s cubic-bezier(0.16,1,0.3,1)',
          transition: 'height 0.25s ease',
        }}>

          {/* Title bar */}
          <div style={{
            height: 42, flexShrink: 0,
            background: '#141622',
            borderBottom: minimised ? 'none' : '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center',
            padding: '0 14px', gap: 8,
            userSelect: 'none',
          }}>
            {/* Traffic lights */}
            <div style={{ display: 'flex', gap: 7 }}>
              {[['#ff5f57', 0], ['#febc2e', 1], ['#28c840', 2]].map(([col, idx]) => (
                <button
                  key={col}
                  onClick={() => {
                    if (idx === 0) { setOpen(false); setBooted(false); setLines([]) }
                    if (idx === 1) setMinimised(m => !m)
                  }}
                  style={{
                    width: 12, height: 12, borderRadius: '50%', background: col,
                    border: 'none', cursor: 'pointer', transition: 'filter 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.25)'}
                  onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
                />
              ))}
            </div>
            <div style={{ flex: 1, textAlign: 'center', fontSize: '0.73rem', color: C.muted, letterSpacing: 0.5 }}>
              visitor@sethu.dev: ~
            </div>
          </div>

          {!minimised && (
            <>
              {/* Output */}
              <div
                onClick={() => inputRef.current?.focus()}
                style={{
                  flex: 1, overflowY: 'auto', padding: '14px 16px',
                  display: 'flex', flexDirection: 'column', gap: 0,
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(0,255,136,0.12) transparent',
                  cursor: 'text',
                }}
              >
                {lines.map(line => (
                  <div key={line.id} style={{
                    fontSize: '0.77rem', lineHeight: 1.75,
                    color: line.color || 'transparent',
                    whiteSpace: 'pre',
                    minHeight: line.text === '' ? '0.6em' : undefined,
                  }}>
                    {line.text}
                  </div>
                ))}

                {/* Live prompt */}
                {booted && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <span style={{ color: C.green, fontSize: '0.77rem', flexShrink: 0 }}>
                      visitor@sethu.dev:~$
                    </span>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      spellCheck={false}
                      autoComplete="off"
                      style={{
                        background: 'transparent', border: 'none', outline: 'none',
                        color: C.white, fontSize: '0.77rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        flex: 1, caretColor: C.green,
                      }}
                    />
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick-command bar */}
              {booted && (
                <div style={{
                  flexShrink: 0, padding: '8px 14px 10px',
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                  display: 'flex', gap: 6, flexWrap: 'wrap',
                }}>
                  {['skills', 'projects', 'experience', 'contact', 'hire', 'match react'].map(cmd => (
                    <button
                      key={cmd}
                      onClick={() => { setInput(cmd); setTimeout(() => { inputRef.current?.focus() }, 10) }}
                      style={{
                        padding: '3px 10px', borderRadius: 4, cursor: 'pointer',
                        background: 'rgba(0,255,136,0.04)',
                        border: '1px solid rgba(0,255,136,0.13)',
                        color: C.dim, fontSize: '0.69rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(0,255,136,0.11)'
                        e.currentTarget.style.color = C.green
                        e.currentTarget.style.borderColor = 'rgba(0,255,136,0.38)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(0,255,136,0.04)'
                        e.currentTarget.style.color = C.dim
                        e.currentTarget.style.borderColor = 'rgba(0,255,136,0.13)'
                      }}
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes term-open {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes term-blink {
          0%,100% { opacity:1; }
          50%     { opacity:0; }
        }
        @keyframes term-ping {
          0%   { transform: scale(1);   opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @media (max-width: 570px) {
          /* terminal goes nearly full-width on mobile */
        }
      `}</style>
    </>
  )
}
