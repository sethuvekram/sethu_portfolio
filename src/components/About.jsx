import { Code2, Globe, Cpu, Users } from 'lucide-react'

const HIGHLIGHTS = [
  {
    icon: <Code2 size={22} />,
    color: '#00d4ff',
    title: 'Frontend Excellence',
    desc: 'Crafting pixel-perfect, performant UIs with React & Vite that delight users across all devices.',
  },
  {
    icon: <Cpu size={22} />,
    color: '#7c3aed',
    title: 'Backend Architecture',
    desc: 'Building secure, scalable REST APIs and microservices with Java Spring Boot and Node.js.',
  },
  {
    icon: <Globe size={22} />,
    color: '#10b981',
    title: 'Cloud & DevOps',
    desc: 'Deploying and managing production systems on AWS with Docker containerization and CI/CD pipelines.',
  },
  {
    icon: <Users size={22} />,
    color: '#ec4899',
    title: 'Team Collaboration',
    desc: 'Contributing to architecture decisions, mentoring junior devs, and driving best practices.',
  },
]

export default function About() {
  return (
    <section id="about" style={{ padding: '100px 0', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 700px 400px at 100% 40%, rgba(0,212,255,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="section-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 72,
          alignItems: 'center',
        }} className="about-grid">

          {/* Left — text */}
          <div>
            <div className="section-divider" />
            <h2 className="section-title">
              About <span className="gradient-text">Me</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem' }}>
              <p>
                I'm a <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Full-Stack Developer</span> at{' '}
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Shinelogics Informatics</span> with{' '}
                3+ years of hands-on experience building enterprise-grade applications.
              </p>
              <p>
                My expertise spans the full development lifecycle — from designing intuitive
                React interfaces and building high-performance APIs with{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Java Spring Boot</span>{' '}and{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Node.js</span>, to
                deploying containerized services on{' '}
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}>AWS</span>.
              </p>
              <p>
                I've delivered complex platforms including full-scale{' '}
                <span style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>eCommerce systems</span> with GST billing &amp;
                warehouse management, real-time{' '}
                <span style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>sales analytics dashboards</span>,
                and modern startup websites.
              </p>
              <p>
                I believe in writing <em>clean, maintainable code</em>, designing{' '}
                <em>scalable architectures</em>, and continuously improving development workflows.
              </p>
            </div>

            {/* Quick facts */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
              {['React Specialist','Spring Boot','Cloud Native','Team Player','Problem Solver'].map(t => (
                <span key={t} className="tech-tag" style={{ fontSize: '0.82rem' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right — highlight cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {HIGHLIGHTS.map((h, i) => (
              <div
                key={h.title}
                className="glass-card"
                style={{ padding: 24 }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${h.color}12`,
                  border: `1px solid ${h.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: h.color,
                  marginBottom: 14,
                }}>
                  {h.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 8 }}>{h.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: 1.65 }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .about-grid > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
