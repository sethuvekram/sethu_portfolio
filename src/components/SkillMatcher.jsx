import { useState, useRef } from 'react'
import { FileText, Zap, CheckCircle2, XCircle, BarChart3, ChevronRight, RotateCcw } from 'lucide-react'

/* ── Full skill + keyword mapping ── */
const SKILLS = [
  // Frontend
  { name: 'React.js',        keys: ['react', 'react.js', 'reactjs'] },
  { name: 'Vite',            keys: ['vite'] },
  { name: 'JavaScript',      keys: ['javascript', 'js', 'es6', 'ecmascript', 'vanilla js'] },
  { name: 'TypeScript',      keys: ['typescript', 'ts'] },
  { name: 'HTML5 / CSS3',    keys: ['html', 'css', 'html5', 'css3'] },
  { name: 'Tailwind CSS',    keys: ['tailwind', 'tailwindcss'] },
  { name: 'Sass / SCSS',     keys: ['sass', 'scss'] },
  // Backend
  { name: 'Spring Boot',     keys: ['spring boot', 'spring', 'springboot'] },
  { name: 'Java',            keys: ['java'] },
  { name: 'Node.js',         keys: ['node', 'node.js', 'nodejs'] },
  { name: 'Express',         keys: ['express', 'express.js'] },
  { name: 'REST APIs',       keys: ['rest', 'restful', 'api', 'apis', 'rest api'] },
  { name: 'Microservices',   keys: ['microservice', 'microservices', 'distributed'] },
  { name: 'Auth & Security', keys: ['auth', 'oauth', 'jwt', 'security', 'authentication'] },
  // Database
  { name: 'MongoDB',         keys: ['mongodb', 'mongo', 'nosql'] },
  { name: 'PostgreSQL',      keys: ['postgresql', 'postgres', 'pg'] },
  { name: 'MySQL',           keys: ['mysql', 'sql'] },
  { name: 'Redis',           keys: ['redis', 'cache', 'caching'] },
  // Cloud / DevOps
  { name: 'AWS',             keys: ['aws', 'amazon web services', 'ec2', 's3', 'ecs', 'lambda', 'rds'] },
  { name: 'Docker',          keys: ['docker', 'container', 'containerization'] },
  { name: 'CI/CD',           keys: ['ci/cd', 'cicd', 'continuous integration', 'continuous deployment', 'pipeline'] },
  { name: 'GitHub Actions',  keys: ['github actions', 'github'] },
  { name: 'Jenkins',         keys: ['jenkins'] },
  { name: 'Linux',           keys: ['linux', 'ubuntu', 'bash', 'shell', 'unix'] },
  { name: 'Nginx',           keys: ['nginx', 'reverse proxy'] },
  // Tools / Practices
  { name: 'Git',             keys: ['git', 'version control', 'gitlab', 'bitbucket'] },
  { name: 'Agile / Scrum',   keys: ['agile', 'scrum', 'sprint', 'kanban', 'jira'] },
  { name: 'AI / LLM',        keys: ['ai', 'llm', 'openai', 'langchain', 'machine learning', 'ml', 'gpt'] },
  { name: 'GraphQL',         keys: ['graphql'] },
  { name: 'Kafka',           keys: ['kafka', 'message queue', 'rabbitmq', 'event driven'] },
]

const MATCH_LEVELS = [
  { min: 80, label: 'Excellent Match',   color: '#10b981', desc: 'Strong alignment — highly recommend reaching out!' },
  { min: 60, label: 'Good Match',        color: '#00d4ff', desc: 'Solid overlap — worth a conversation.' },
  { min: 40, label: 'Partial Match',     color: '#f59e0b', desc: 'Key skills match — some gaps exist.' },
  { min: 0,  label: 'Limited Match',     color: '#ec4899', desc: 'Skill overlap is minimal for this role.' },
]

function getLevel(pct) {
  return MATCH_LEVELS.find(l => pct >= l.min) || MATCH_LEVELS[MATCH_LEVELS.length - 1]
}

function analyzeJD(text) {
  const lower = text.toLowerCase()
  return SKILLS.map(skill => ({
    ...skill,
    matched: skill.keys.some(k => lower.includes(k)),
  }))
}

export default function SkillMatcher() {
  const [jd, setJd]           = useState('')
  const [results, setResults]  = useState(null)
  const [animPct, setAnimPct]  = useState(0)
  const textareaRef            = useRef(null)

  const analyze = () => {
    if (!jd.trim()) return
    const res = analyzeJD(jd)
    const matched = res.filter(r => r.matched).length
    const pct = Math.round((matched / res.length) * 100)
    setResults({ skills: res, pct, matched, total: res.length })
    setAnimPct(0)
    // Animate counter
    let i = 0
    const t = setInterval(() => {
      i += 2
      setAnimPct(Math.min(i, pct))
      if (i >= pct) clearInterval(t)
    }, 18)
  }

  const reset = () => {
    setJd('')
    setResults(null)
    setAnimPct(0)
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  const level = results ? getLevel(results.pct) : null

  return (
    <section id="skill-matcher" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 800px 400px at 80% 50%, rgba(124,58,237,0.07) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="section-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-divider" style={{ margin: '0 auto 16px' }} />
          <h2 className="section-title">
            AI <span className="gradient-text">Skill Matcher</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Paste any job description — instantly see how well Sethu's skills match your role
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: results ? '1fr 1.3fr' : '1fr',
          gap: 32,
          maxWidth: results ? '100%' : 760,
          margin: '0 auto',
          transition: 'all 0.4s ease',
        }} className="matcher-grid">

          {/* Input panel */}
          <div style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: 20,
            padding: 28,
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#7c3aed',
              }}>
                <FileText size={18} />
              </div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 2 }}>Paste Job Description</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Copy from LinkedIn, Naukri, or any job posting</p>
              </div>
            </div>

            <textarea
              ref={textareaRef}
              value={jd}
              onChange={e => setJd(e.target.value)}
              placeholder={`Paste the job description here...\n\nExample:\n"We are looking for a Full-Stack Developer with experience in React, Node.js, AWS, and Docker. Must have strong REST API design skills..."`}
              rows={10}
              style={{
                flex: 1,
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.65,
                resize: 'vertical', minHeight: 220, outline: 'none',
                fontFamily: 'Inter, sans-serif',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={analyze}
                disabled={!jd.trim()}
                className="btn-primary"
                style={{
                  flex: 1, justifyContent: 'center',
                  opacity: jd.trim() ? 1 : 0.5, cursor: jd.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                <Zap size={15} />
                <span>Analyze Match</span>
              </button>
              {results && (
                <button
                  onClick={reset}
                  className="btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <RotateCcw size={14} />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Results panel */}
          {results && (
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 20,
              animation: 'fade-in-up 0.4s ease',
            }}>
              {/* Score card */}
              <div style={{
                background: `linear-gradient(135deg, ${level.color}10, ${level.color}05)`,
                border: `1px solid ${level.color}30`,
                borderRadius: 20,
                padding: '24px 28px',
                display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap',
              }}>
                {/* Circle */}
                <div style={{ position: 'relative', width: 90, height: 90, flexShrink: 0 }}>
                  <svg width="90" height="90" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="45" cy="45" r="38" fill="none"
                      stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                    <circle cx="45" cy="45" r="38" fill="none"
                      stroke={level.color} strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 38}`}
                      strokeDashoffset={`${2 * Math.PI * 38 * (1 - animPct / 100)}`}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.05s linear' }}
                    />
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column',
                  }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 900, color: level.color, lineHeight: 1 }}>
                      {animPct}%
                    </span>
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'inline-block', padding: '3px 12px', borderRadius: 20,
                    background: `${level.color}20`, border: `1px solid ${level.color}30`,
                    fontSize: '0.78rem', fontWeight: 700, color: level.color, marginBottom: 8,
                  }}>
                    {level.label}
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 12 }}>
                    {level.desc}
                  </p>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>{results.matched}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginLeft: 4 }}>matched</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#94a3b8' }}>{results.total - results.matched}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginLeft: 4 }}>not in JD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills breakdown */}
              <div style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: 20, padding: '20px 24px',
                flex: 1,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <BarChart3 size={16} style={{ color: 'var(--accent-cyan)' }} />
                  <h4 style={{ fontWeight: 700, fontSize: '0.9rem' }}>Skills Breakdown</h4>
                </div>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px',
                  maxHeight: 260, overflowY: 'auto',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(0,212,255,0.2) transparent',
                }} className="skills-breakdown-grid">
                  {/* Matched first */}
                  {[...results.skills].sort((a, b) => b.matched - a.matched).map(skill => (
                    <div key={skill.name} style={{
                      display: 'flex', alignItems: 'center', gap: 7,
                      padding: '5px 8px', borderRadius: 8,
                      background: skill.matched ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${skill.matched ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)'}`,
                    }}>
                      {skill.matched
                        ? <CheckCircle2 size={13} style={{ color: '#10b981', flexShrink: 0 }} />
                        : <XCircle size={13} style={{ color: 'rgba(148,163,184,0.3)', flexShrink: 0 }} />
                      }
                      <span style={{
                        fontSize: '0.78rem', fontWeight: skill.matched ? 600 : 400,
                        color: skill.matched ? 'var(--text-primary)' : 'var(--text-muted)',
                      }}>
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href="mailto:sethu.nextgen@gmail.com?subject=Role Opportunity"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '13px 20px', borderRadius: 12, textDecoration: 'none',
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(124,58,237,0.1))',
                  border: '1px solid rgba(0,212,255,0.2)',
                  color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.88rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.18), rgba(124,58,237,0.18))'}
                onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(124,58,237,0.1))'}
              >
                <span>Looks like a fit? Let's talk</span>
                <ChevronRight size={15} />
              </a>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .matcher-grid { grid-template-columns: 1fr !important; }
          .skills-breakdown-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .skills-breakdown-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
