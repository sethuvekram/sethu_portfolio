import { useEffect, useRef, useState } from 'react'
import { Code2, Globe, Cpu, Users, TrendingUp, Lightbulb, BookOpen, Flame } from 'lucide-react'

/* ── "Currently" live items ─────────────────────────────────────── */
const CURRENTLY = [
  { emoji: '🏗️', label: 'Building', value: 'AI-assisted product roadmapping tools' },
  { emoji: '📖', label: 'Reading',  value: 'Continuous Discovery Habits — Teresa Torres' },
  { emoji: '🧪', label: 'Exploring', value: 'LLM integration in Spring Boot microservices' },
  { emoji: '🎯', label: 'Goal',     value: 'Senior Full-Stack / Lead Engineer role' },
]

/* ── Industry POV cards ─────────────────────────────────────────── */
const POV_CARDS = [
  {
    color: '#00d4ff',
    icon: <Cpu size={20} />,
    trend: 'AI in Enterprise Software',
    opinion: 'AI won\'t replace developers — it\'ll expose which developers never really understood the problem they were solving. The winners will be engineers who pair deep domain knowledge with AI fluency.',
    tag: 'Hot take',
  },
  {
    color: '#7c3aed',
    icon: <TrendingUp size={20} />,
    trend: 'Product-Led Engineering',
    opinion: 'The gap between "what was built" and "what users needed" exists because engineers ship features, not outcomes. Every developer should be embedded in product thinking — not handed a ticket.',
    tag: 'Strongly held',
  },
  {
    color: '#ec4899',
    icon: <Globe size={20} />,
    trend: 'Full-Stack vs. Specialisation',
    opinion: 'T-shaped is outdated. The industry increasingly rewards π-shaped engineers — deep in two areas, wide across everything else. My depth: React systems + Spring Boot architecture.',
    tag: 'Personal POV',
  },
]

/* ── The rare combination pills ─────────────────────────────────── */
const RARE_COMBO = [
  { label: 'Codes it himself', color: '#00d4ff' },
  { label: 'Thinks product-first', color: '#7c3aed' },
  { label: 'Ships end-to-end', color: '#10b981' },
  { label: 'Grew into strategy', color: '#ec4899' },
  { label: 'Mentors teams', color: '#f59e0b' },
  { label: 'Owns the outcome', color: '#00d4ff' },
]

export default function About() {
  const povRef = useRef(null)
  const [povInView, setPovInView] = useState(false)
  useEffect(() => {
    const el = povRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setPovInView(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" style={{ padding: '100px 0', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 700px 400px at 100% 40%, rgba(0,212,255,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="section-wrapper" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Section header ── */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-divider" style={{ margin: '0 auto 16px' }} />
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            The story, the thinking, and the perspective behind the work
          </p>
        </div>

        {/* ── Bio + rare combo ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'flex-start', marginBottom: 72,
        }} className="about-grid">

          {/* Left — story bio */}
          <div>
            {/* Promotion arc badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 50, marginBottom: 28,
              background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(124,58,237,0.1))',
              border: '1px solid rgba(236,72,153,0.25)',
            }}>
              <TrendingUp size={14} style={{ color: '#ec4899' }} />
              <span style={{ color: '#ec4899', fontSize: '0.8rem', fontWeight: 700, letterSpacing: 0.5 }}>
                Developer → Product Strategy Lead · Shinelogics Informatics
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '0.97rem' }}>
              <p>
                I didn't plan to become a Product Strategy Lead. I started as a developer who cared  
                too much about <em>why</em> we were building something — not just <em>how</em>.{' '}
                Three years of shipping real systems, asking the hard product questions, and{' '}
                owning outcomes end-to-end got me promoted into strategy.
              </p>
              <p>
                That experience makes me genuinely rare:{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>I can write the Spring Boot API, design the React UI, architect the AWS deployment — and then sit in a room with stakeholders and translate all of it into business value.</span>{' '}
                Most engineers can't do that. Most product people can't do the first three.
              </p>
              <p>
                I've shipped platforms that track{' '}
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}>15,000+ SKUs</span>, eliminated{' '}
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}>60% of billing errors</span>, and cut report generation from{' '}
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}>2 hours to 30 seconds</span>.
                Those aren't feature descriptions — they're business outcomes. That's the lens I  
                bring to every line of code.
              </p>
              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', borderLeft: '2px solid rgba(0,212,255,0.3)', paddingLeft: 16 }}>
                "I build software that makes the business case for itself."
              </p>
            </div>
          </div>

          {/* Right — rare combo + currently */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* Rare combination */}
            <div className="glass-card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <Flame size={18} style={{ color: '#f59e0b' }} />
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>The Rare Combination</h4>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: 1.65, marginBottom: 18 }}>
                Most companies hire either a developer <em>or</em> a strategist. I collapsed that boundary.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                {RARE_COMBO.map(item => (
                  <span key={item.label} style={{
                    padding: '5px 13px', borderRadius: 50, fontSize: '0.8rem', fontWeight: 600,
                    background: `${item.color}12`,
                    border: `1px solid ${item.color}30`,
                    color: item.color,
                  }}>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Currently */}
            <div className="glass-card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'pulse-green 1.6s ease-in-out infinite' }} />
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Currently</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {CURRENTLY.map(c => (
                  <div key={c.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1rem', lineHeight: 1, marginTop: 1 }}>{c.emoji}</span>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: 1 }}>{c.label}</span>
                      <p style={{ color: 'var(--text-primary)', fontSize: '0.855rem', marginTop: 2, lineHeight: 1.5 }}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Industry POV ── */}
        <div ref={povRef}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '5px 16px', borderRadius: 50, marginBottom: 14,
              background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <Lightbulb size={13} style={{ color: '#f59e0b' }} />
              <span style={{ color: '#f59e0b', fontSize: '0.78rem', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                Industry Perspective
              </span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              What I Actually Think About <span className="gradient-text">The Industry</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 10 }}>
              Opinions held with evidence. The kind of thinking I bring to every project.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="pov-grid">
            {POV_CARDS.map((card, i) => (
              <div key={card.trend} style={{
                background: `linear-gradient(145deg, ${card.color}06, transparent)`,
                border: `1px solid ${card.color}20`,
                borderRadius: 20, padding: '28px 24px',
                opacity: povInView ? 1 : 0,
                transform: povInView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`,
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${card.color}45`
                  e.currentTarget.style.boxShadow = `0 16px 48px ${card.color}10`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${card.color}20`
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 11,
                    background: `${card.color}12`, border: `1px solid ${card.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color,
                  }}>
                    {card.icon}
                  </div>
                  <span style={{
                    padding: '3px 10px', borderRadius: 50, fontSize: '0.7rem', fontWeight: 700,
                    background: `${card.color}12`, border: `1px solid ${card.color}25`, color: card.color,
                    textTransform: 'uppercase', letterSpacing: 0.5,
                  }}>
                    {card.tag}
                  </span>
                </div>

                <h4 style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: 12, color: 'var(--text-primary)' }}>
                  {card.trend}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.855rem', lineHeight: 1.75 }}>
                  "{card.opinion}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 960px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .pov-grid   { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .pov-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

