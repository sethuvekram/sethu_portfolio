import { useEffect, useState, useRef } from 'react'
import { ArrowDown, MapPin, Code2, Zap, Download } from 'lucide-react'

const ROLES = [
  'Product Strategy Lead',
  'Full-Stack Developer',
  'React Specialist',
  'Spring Boot Engineer',
  'Cloud & DevOps Engineer',
]

const STATS = [
  { target: 3,  suffix: '+',  label: 'Years Experience',   color: '#00d4ff' },
  { target: 10, suffix: '+',  label: 'Projects Delivered', color: '#7c3aed' },
  { target: 5,  suffix: '+',  label: 'Tech Stacks',        color: '#ec4899' },
  { target: 50, suffix: 'K+', label: 'Lines of Code',      color: '#10b981' },
]

const STACK = ['React', 'Vite', 'Spring Boot', 'Node.js', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL']

function CountUp({ target, suffix = '', color, trigger }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let frame = 0
    const total = 80
    const timer = setInterval(() => {
      frame++
      setCount(Math.floor(target * Math.min(Math.sqrt(frame / total), 1)))
      if (frame >= total) clearInterval(timer)
    }, 18)
    return () => clearInterval(timer)
  }, [trigger, target])
  return <span style={{ color }}>{count}{suffix}</span>
}

export default function Hero() {
  const [roleIdx,   setRoleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting,  setDeleting]  = useState(false)
  const [charIdx,   setCharIdx]   = useState(0)
  const [statsInView, setStatsInView] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsInView(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIdx]
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      }, 80)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1))
        setCharIdx(c => c - 1)
      }, 40)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setRoleIdx(r => (r + 1) % ROLES.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, roleIdx])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 100,
        paddingBottom: 80,
      }}
    >
      {/* Ambient glow blobs */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 900px 600px at -10% 50%, rgba(0,212,255,0.07) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 700px 500px at 110% 60%, rgba(124,58,237,0.10) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 500px 300px at 50% 100%, rgba(236,72,153,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Dot grid */}
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      {/* Floating orbs */}
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
        top: '10%', right: '-10%',
        animation: 'spin-slow 30s linear infinite',
      }} />

      <div className="section-wrapper" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}
             className="hero-grid">

          {/* Text side */}
          <div>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 50, marginBottom: 28,
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.2)',
              color: 'var(--accent-cyan)',
              fontSize: '0.82rem', fontWeight: 600,
            }} className="animate-fade-up">
              <Zap size={14} />
              Available for opportunities
            </div>

            {/* Name */}
            <h1 style={{ fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: 16 }}
                className="animate-fade-up delay-100">
              Hi, I'm{' '}
              <span className="gradient-text">Sethuvekram</span>
            </h1>

            {/* Typewriter role */}
            <div style={{
              height: 56, display: 'flex', alignItems: 'center', marginBottom: 24,
            }}>
              <span style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--text-muted)',
              }} className="animate-fade-up delay-200">
                {displayed}
                <span style={{
                  display: 'inline-block',
                  width: 2, height: '1.1em',
                  background: 'var(--accent-cyan)',
                  marginLeft: 2,
                  verticalAlign: 'middle',
                  animation: 'typing-cursor 0.9s infinite',
                }} />
              </span>
            </div>

            {/* Tagline */}
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              maxWidth: 540,
              lineHeight: 1.75,
              marginBottom: 36,
            }} className="animate-fade-up delay-300">
              Full-Stack Developer with{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>3+ years</span>{' '}
              building scalable eCommerce platforms, dashboards, and cloud-native applications
              using <span style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}>React</span>,{' '}
              <span style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>Spring Boot</span>, and{' '}
              <span style={{ color: 'var(--accent-pink)', fontWeight: 500 }}>AWS</span>.
            </p>

            {/* Location */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 36,
            }} className="animate-fade-up delay-300">
              <MapPin size={14} style={{ color: 'var(--accent-cyan)' }} />
              Chennai, India
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 52 }}
                 className="animate-fade-up delay-400">
              <a href="#projects" className="btn-primary">
                <span>View My Work</span>
                <Code2 size={16} />
              </a>
              <a href="#contact" className="btn-secondary">
                Let's Connect
              </a>
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                download="Sethuvekram_Resume.pdf"
                className="btn-download-cv"
              >
                <Download size={15} />
                Download CV
              </a>
            </div>

            {/* Stack pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
                 className="animate-fade-up delay-500">
              {STACK.map((s, i) => (
                <span
                  key={s}
                  className="tech-tag"
                  style={{ animationDelay: `${0.5 + i * 0.06}s` }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Visual side — photo card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-end' }}
               className="hero-visual animate-fade-right delay-400">
            <div style={{ position: 'relative' }} className="animate-float">
              {/* Outer glow ring */}
              <div style={{
                position: 'absolute', inset: -3,
                borderRadius: 28,
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink))',
                zIndex: 0,
                filter: 'blur(1px)',
              }} />
              {/* Photo */}
              <div style={{
                width: 280, height: 340,
                borderRadius: 24,
                overflow: 'hidden',
                position: 'relative',
                zIndex: 1,
                border: '2px solid rgba(0,212,255,0.25)',
              }}>
                <img
                src={`${import.meta.env.BASE_URL}profile.png`}
                  alt="Sethuvekram Shanmugasundaram"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
              </div>
              {/* Open to Work badge */}
              <div style={{
                position: 'absolute', bottom: -18, left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(5,8,22,0.92)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(16,185,129,0.45)',
                borderRadius: 50,
                padding: '7px 16px',
                whiteSpace: 'nowrap',
                zIndex: 2,
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#10b981',
                display: 'flex', alignItems: 'center', gap: 7,
              }}>
                <span className="pulse-green-dot" />
                Open to Work
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            marginTop: 60,
            paddingTop: 40,
            borderTop: '1px solid var(--glass-border)',
          }}
          className="stats-grid"
        >
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center' }}
                 className={`animate-fade-up delay-${(i + 3) * 100}`}>
              <div className="stat-number">
                <CountUp target={s.target} suffix={s.suffix} color={s.color} trigger={statsInView} />
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: 2,
        textTransform: 'uppercase',
      }}
        className="animate-float"
      >
        <span>Scroll</span>
        <ArrowDown size={16} />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual { display: none !important; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  )
}
