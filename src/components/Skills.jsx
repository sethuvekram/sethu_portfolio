import { useEffect, useRef, useState } from 'react'
import { Layers, Server, Database, Cloud, Wrench } from 'lucide-react'

const CATEGORIES = [
  {
    icon: <Layers size={20} />,
    title: 'Frontend Development',
    color: '#00d4ff',
    skills: [
      { name: 'React.js',         level: 92 },
      { name: 'Vite',             level: 88 },
      { name: 'JavaScript ES6+',  level: 90 },
      { name: 'TypeScript',       level: 70 },
      { name: 'Tailwind CSS',     level: 85 },
      { name: 'HTML5 / CSS3',     level: 92 },
      { name: 'Sass / SCSS',      level: 80 },
    ],
  },
  {
    icon: <Server size={20} />,
    title: 'Backend Development',
    color: '#7c3aed',
    skills: [
      { name: 'Java Spring Boot',      level: 88 },
      { name: 'Node.js / Express',     level: 85 },
      { name: 'REST API Design',       level: 90 },
      { name: 'Microservices',         level: 80 },
      { name: 'Auth & Security',       level: 82 },
    ],
  },
  {
    icon: <Database size={20} />,
    title: 'Databases',
    color: '#10b981',
    skills: [
      { name: 'MongoDB',        level: 85 },
      { name: 'PostgreSQL',     level: 82 },
      { name: 'MySQL',          level: 80 },
      { name: 'Schema Design',  level: 86 },
      { name: 'Query Optimize', level: 83 },
    ],
  },
  {
    icon: <Cloud size={20} />,
    title: 'Cloud & DevOps',
    color: '#ec4899',
    skills: [
      { name: 'AWS',        level: 80 },
      { name: 'Docker',     level: 82 },
      { name: 'CI/CD',      level: 75 },
      { name: 'Monitoring', level: 72 },
    ],
  },
  {
    icon: <Wrench size={20} />,
    title: 'Tools & Practices',
    color: '#f59e0b',
    skills: [
      { name: 'Git / GitHub',   level: 90 },
      { name: 'Agile / Scrum',  level: 85 },
      { name: 'Code Reviews',   level: 88 },
      { name: 'AI Dev Tools',   level: 80 },
    ],
  },
]

const ALL_BADGES = [
  'React.js','Vite','JavaScript','TypeScript','HTML5','CSS3','Tailwind','Sass',
  'Java','Spring Boot','Node.js','Express.js',
  'MongoDB','PostgreSQL','MySQL',
  'AWS','Docker','CI/CD',
  'Git','Agile','REST APIs','Microservices',
]

export default function Skills() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 800px 400px at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-divider" style={{ margin: '0 auto 16px' }} />
          <h2 className="section-title">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            A comprehensive toolkit built across 3+ years of professional development
          </p>
        </div>

        {/* Skill cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          marginBottom: 64,
        }}>
          {CATEGORIES.map((cat, ci) => (
            <div key={cat.title} className="glass-card" style={{ padding: 28 }}>
              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `${cat.color}15`,
                  border: `1px solid ${cat.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: cat.color,
                }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>{cat.title}</h3>
              </div>

              {/* Skills list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {cat.skills.map((skill, skillIdx) => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        {skill.name}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: cat.color, fontFamily: "'JetBrains Mono', monospace" }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: inView ? `${skill.level}%` : '0%',
                          background: `linear-gradient(90deg, ${cat.color}, ${cat.color}99)`,
                          transition: `width 1.1s cubic-bezier(0.4,0,0.2,1) ${skillIdx * 0.08 + 0.2}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* All-skills tag cloud */}
        <div style={{
          textAlign: 'center',
          padding: '40px 32px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: 20,
        }}>
          <h3 style={{ marginBottom: 20, fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.9rem', letterSpacing: 2, textTransform: 'uppercase' }}>
            Core Technologies
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {ALL_BADGES.map(b => (
              <span key={b} className="skill-badge">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
