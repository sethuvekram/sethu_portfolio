import { Briefcase, CheckCircle2, Calendar, TrendingUp } from 'lucide-react'

const ROLES = [
  {
    title: 'Product Strategy Lead',
    period: '2025 – Present',
    isCurrent: true,
    color: '#ec4899',
    badgeBg: 'rgba(236,72,153,0.1)',
    badgeBorder: 'rgba(236,72,153,0.25)',
    summary:
      'Elevated from engineering into product strategy, owning cross-functional roadmaps, aligning technical execution with business goals, and driving product-led growth initiatives across multiple client verticals.',
    responsibilities: [
      'Define and own product roadmaps across eCommerce, analytics & SaaS verticals',
      'Bridge engineering, design & business stakeholders to deliver on strategic objectives',
      'Lead product discovery — user research, competitive analysis & prioritization',
      'Drive OKR/KPI frameworks to measure product impact and team performance',
      'Mentor full-stack teams and enforce architectural best practices',
      'Evaluate and introduce AI/automation tooling to accelerate delivery',
    ],
    tech: ['Product Strategy', 'OKRs', 'Roadmapping', 'Agile / Scrum', 'React', 'Spring Boot', 'AWS'],
  },
  {
    title: 'Full-Stack Developer',
    period: '2022 – 2025',
    isCurrent: false,
    color: '#00d4ff',
    badgeBg: 'rgba(0,212,255,0.08)',
    badgeBorder: 'rgba(0,212,255,0.2)',
    summary:
      'Built and shipped production-grade enterprise applications across eCommerce, inventory, and analytics domains. Owned end-to-end delivery from DB schema to React UI to AWS deployment.',
    responsibilities: [
      'Built scalable full-stack apps with React, Node.js, and Spring Boot',
      'Designed REST APIs and microservices for complex business workflows',
      'Implemented inventory management, billing systems & dispatch workflows',
      'Deployed production systems on AWS using Docker and CI/CD pipelines',
      'Designed database schemas and optimised queries for high-performance reads',
      'Code reviews, technical architecture input & mentoring junior devs',
    ],
    tech: ['React', 'Vite', 'Spring Boot', 'Node.js', 'MongoDB', 'PostgreSQL', 'MySQL', 'AWS', 'Docker'],
  },
]

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 600px 400px at 0% 50%, rgba(124,58,237,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="section-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-divider" style={{ margin: '0 auto 16px' }} />
          <h2 className="section-title">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            3+ years at Shinelogics Informatics — from Full-Stack Developer to Product Strategy Lead
          </p>
        </div>

        {/* Promotion banner */}
        <div style={{
          maxWidth: 860, margin: '0 auto 40px',
          padding: '18px 28px',
          background: 'linear-gradient(135deg, rgba(236,72,153,0.06), rgba(124,58,237,0.06))',
          border: '1px solid rgba(236,72,153,0.2)',
          borderRadius: 16,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899',
          }}>
            <TrendingUp size={18} />
          </div>
          <div>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ec4899' }}>Promoted within Shinelogics Informatics</span>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', margin: '2px 0 0' }}>
              Grew from Full-Stack Developer → Product Strategy Lead — recognising both technical depth and strategic thinking.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ position: 'relative', paddingLeft: 56 }}>
            {/* Vertical line */}
            <div className="timeline-line" style={{ left: 20 }} />

            {ROLES.map((role, ri) => (
              <div key={role.title} style={{ position: 'relative', marginBottom: ri < ROLES.length - 1 ? 44 : 0 }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: -46, top: 6,
                  width: 22, height: 22, borderRadius: '50%',
                  background: role.isCurrent
                    ? 'linear-gradient(135deg, #ec4899, #7c3aed)'
                    : 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 2,
                  boxShadow: role.isCurrent ? '0 0 12px rgba(236,72,153,0.4)' : 'none',
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />
                </div>

                {/* Card */}
                <div className="glass-card" style={{ padding: 36 }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                    flexWrap: 'wrap', gap: 16, marginBottom: 20,
                  }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 6 }}>
                        {role.title}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Briefcase size={15} style={{ color: role.color }} />
                        <span style={{ color: role.color, fontWeight: 600, fontSize: '0.9rem' }}>
                          Shinelogics Informatics
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 50,
                        background: role.badgeBg,
                        border: `1px solid ${role.badgeBorder}`,
                        color: role.color, fontSize: '0.82rem', fontWeight: 600,
                      }}>
                        <Calendar size={13} />
                        {role.period}
                      </span>
                      {role.isCurrent && (
                        <span style={{
                          padding: '4px 12px', borderRadius: 50,
                          background: 'rgba(16,185,129,0.1)',
                          border: '1px solid rgba(16,185,129,0.25)',
                          color: '#10b981', fontSize: '0.78rem', fontWeight: 600,
                        }}>
                          Current Role
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 24 }}>
                    {role.summary}
                  </p>

                  {/* Responsibilities */}
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 14,
                      color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 2 }}>
                      Key Responsibilities
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }} className="responsibilities-grid">
                      {role.responsibilities.map(r => (
                        <div key={r} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <CheckCircle2 size={15} style={{ color: role.color, marginTop: 2, flexShrink: 0 }} />
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech tags */}
                  <div style={{
                    marginTop: 24, paddingTop: 20,
                    borderTop: '1px solid var(--glass-border)',
                    display: 'flex', flexWrap: 'wrap', gap: 8,
                  }}>
                    {role.tech.map(t => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .responsibilities-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
