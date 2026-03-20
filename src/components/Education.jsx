import { GraduationCap, Cpu, ArrowRight, BookOpen, Lightbulb } from 'lucide-react'

const PIVOT_SKILLS = [
  'Systems Thinking',
  'Engineering Precision',
  'Problem Decomposition',
  'Technical Rigor',
  'Analytical Mindset',
  'First-Principles Reasoning',
]

export default function Education() {
  return (
    <section id="education" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 700px 400px at 30% 50%, rgba(16,185,129,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="section-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-divider" style={{ margin: '0 auto 16px' }} />
          <h2 className="section-title">
            Education & <span className="gradient-text">Background</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            The unconventional path that built a sharper engineer
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 36,
          alignItems: 'start',
        }} className="edu-grid">

          {/* Degree card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(0,212,255,0.06))',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: 20,
            padding: '32px 36px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Accent top */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: 'linear-gradient(90deg, #10b981, #00d4ff)',
            }} />

            <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginBottom: 28 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#10b981',
              }}>
                <GraduationCap size={24} />
              </div>
              <div>
                <div style={{
                  fontSize: '0.72rem', fontWeight: 600, letterSpacing: 2,
                  textTransform: 'uppercase', color: '#10b981', marginBottom: 6,
                }}>
                  Undergraduate Degree
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 4 }}>
                  B.E. Mechanical Engineering
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  K.S.Rangasamy College of Technology · Anna University
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24,
            }}>
              {[
                { label: 'Graduated', value: '2021' },
                { label: 'Specialisation', value: 'Thermal & Manufacturing' },
              ].map(b => (
                <div key={b.label} style={{
                  padding: '6px 14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: 8,
                  fontSize: '0.8rem',
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>{b.label}: </span>
                  <span style={{ fontWeight: 600 }}>{b.value}</span>
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex', gap: 8, flexWrap: 'wrap',
            }}>
              {PIVOT_SKILLS.map(s => (
                <span key={s} className="tech-tag" style={{
                  color: '#10b981',
                  borderColor: 'rgba(16,185,129,0.2)',
                  background: 'rgba(16,185,129,0.06)',
                  fontSize: '0.75rem',
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Career pivot story */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Pivot banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(124,58,237,0.10))',
              border: '1px solid rgba(0,212,255,0.15)',
              borderRadius: 16,
              padding: '20px 24px',
              display: 'flex', gap: 14, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: 'rgba(0,212,255,0.08)',
                border: '1px solid rgba(0,212,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent-cyan)',
              }}>
                <Cpu size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 6 }}>
                  Career Pivot · 2022
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                  From stress calculations to system architecture — graduating in Mechanical Engineering gave me a first-principles approach to problem-solving. The same discipline that analyses load distributions now shapes how I design scalable APIs and database schemas.
                </p>
              </div>
            </div>

            {/* Why it matters card */}
            <div style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 16,
              padding: '20px 24px',
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
                <Lightbulb size={16} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <h4 style={{ fontWeight: 700, fontSize: '0.9rem' }}>Why it gives me an edge</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { arrow: 'Tolerances & precision', out: 'Bug-free production deployments' },
                  { arrow: 'Systems under load', out: 'Scalable backend architecture' },
                  { arrow: 'Cross-discipline thinking', out: 'Business + engineering alignment' },
                ].map(row => (
                  <div key={row.arrow} style={{
                    display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap',
                    fontSize: '0.83rem',
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>{row.arrow}</span>
                    <ArrowRight size={13} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.out}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning mindset */}
            <div style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 16,
              padding: '20px 24px',
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
                <BookOpen size={16} style={{ color: '#7c3aed', flexShrink: 0 }} />
                <h4 style={{ fontWeight: 700, fontSize: '0.9rem' }}>Continuous Learning</h4>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.7, marginBottom: 12 }}>
                Self-taught full-stack developer since 2022. Currently deepening expertise in AI-assisted development, LLM integrations with Spring Boot, and product-led growth strategies.
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 12px', borderRadius: 20,
                background: 'rgba(124,58,237,0.08)',
                border: '1px solid rgba(124,58,237,0.2)',
                fontSize: '0.78rem', color: '#7c3aed', fontWeight: 600,
              }}>
                🎯 Target: AWS Certified Developer 2025
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .edu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
