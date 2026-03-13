import { ShoppingCart, BarChart3, Globe, CheckCircle2, Zap } from 'lucide-react'

const PROJECTS = [
  {
    id: 1,
    icon: <ShoppingCart size={24} />,
    accent: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
    label: 'Enterprise Platform',
    title: 'eCommerce Inventory & Order Management System',
    desc: 'A full-scale eCommerce backend and admin platform managing product inventory, warehouse dispatch, billing, and order processing. Integrates GST billing, purchase orders, dispatch workflows, and warehouse management into a unified platform.',
    impact: [
      '15,000+ SKUs tracked across 4 warehouses in real time',
      '60% reduction in billing errors via automated GST engine',
      '3× faster dispatch processing vs previous manual workflow',
      '8 business modules unified into one live platform',
    ],
    features: [
      'Product Master Management',
      'Inventory Tracking System',
      'GST-based Billing Engine',
      'Warehouse Dispatch Workflow',
      'Purchase Order Management',
      'Vendor Management',
      'Order Processing System',
      'Stock Movement Tracking',
    ],
    stack: {
      frontend: ['React.js', 'Vite', 'Tailwind CSS'],
      backend:  ['Node.js', 'Java Spring Boot'],
      db:       ['MongoDB'],
      deploy:   ['AWS', 'Docker'],
    },
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(124,58,237,0.10))',
  },
  {
    id: 2,
    icon: <BarChart3 size={24} />,
    accent: 'linear-gradient(90deg, #7c3aed, #ec4899)',
    label: 'Business Intelligence',
    title: 'Sales Performance Dashboard',
    desc: 'A business intelligence dashboard for internal data teams to monitor sales performance, analyze revenue trends, and generate strategic insights in real time.',
    impact: [
      'Report generation cut from 2 hours to under 30 seconds',
      '12 product categories tracked with live drill-down filters',
      'Adopted by 3 sales teams across the organization',
    ],
    features: [
      'Real-time sales analytics',
      'Data filtering & drill-down analysis',
      'Performance comparison charts',
      'Product category insights',
      'Revenue & order trend tracking',
    ],
    stack: {
      frontend: ['React.js', 'Chart Libraries', 'REST APIs'],
      backend:  ['Node.js', 'Spring Boot APIs'],
      db:       ['PostgreSQL'],
      deploy:   [],
    },
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(236,72,153,0.10))',
  },
  {
    id: 3,
    icon: <Globe size={24} />,
    accent: 'linear-gradient(90deg, #10b981, #00d4ff)',
    label: 'Frontend / Startup',
    title: 'Startup Customer-Facing Websites',
    desc: 'Designed and developed modern, performance-optimized websites for startup companies to showcase their products and services with a strong focus on UI/UX and SEO.',
    impact: [
      '95+ Lighthouse performance score across all pages',
      'Average load time under 1.5s on mobile networks',
      'Directly grew customer engagement for 3 startups',
    ],
    features: [
      'Fully responsive UI design',
      'Fast page load performance',
      'SEO-optimized structure',
      'Interactive UI components',
      'Scalable frontend architecture',
    ],
    stack: {
      frontend: ['React.js', 'Vite', 'Tailwind CSS', 'JavaScript'],
      backend:  [],
      db:       [],
      deploy:   [],
    },
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(0,212,255,0.10))',
  },
]

const STACK_COLORS = {
  frontend: '#00d4ff',
  backend:  '#7c3aed',
  db:       '#10b981',
  deploy:   '#ec4899',
}

const STACK_LABELS = {
  frontend: 'Frontend',
  backend:  'Backend',
  db:       'Database',
  deploy:   'Deploy',
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 800px 500px at 50% 100%, rgba(0,212,255,0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }} />

      <div className="section-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-divider" style={{ margin: '0 auto 16px' }} />
          <h2 className="section-title">
            Key <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Real-world enterprise and startup applications delivered end-to-end
          </p>
        </div>

        {/* Projects */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {PROJECTS.map((p, pi) => (
            <div
              key={p.id}
              style={{
                background: p.gradient,
                border: '1px solid var(--glass-border)',
                borderRadius: 20,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--glass-border)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Accent top bar */}
              <div className="project-accent" style={{ background: p.accent }} />

              <div style={{ padding: '32px 36px' }} className="project-inner">
                {/* Top row */}
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 20,
                  marginBottom: 24, flexWrap: 'wrap',
                }}>
                  {/* Icon */}
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent-cyan)',
                  }}>
                    {p.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <span style={{
                      display: 'inline-block',
                      fontSize: '0.75rem', fontWeight: 600,
                      color: 'var(--text-muted)', letterSpacing: 2,
                      textTransform: 'uppercase', marginBottom: 6,
                    }}>
                      {p.label}
                    </span>
                    <h3 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 800, lineHeight: 1.2 }}>
                      {p.title}
                    </h3>
                  </div>
                </div>

                {/* Body grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.4fr 1fr 1fr',
                  gap: 28,
                }} className="project-body-grid">

                  {/* Description */}
                  <div>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: 20 }}>
                      {p.desc}
                    </p>

                    {/* Tech stack groups */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {Object.entries(p.stack).map(([key, vals]) =>
                        vals.length > 0 && (
                          <div key={key} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                            <span style={{
                              fontSize: '0.72rem', fontWeight: 600,
                              color: STACK_COLORS[key],
                              textTransform: 'uppercase',
                              letterSpacing: 1,
                              width: 60, flexShrink: 0,
                            }}>
                              {STACK_LABELS[key]}
                            </span>
                            {vals.map(v => (
                              <span key={v} className="tech-tag" style={{
                                fontSize: '0.72rem',
                                color: STACK_COLORS[key],
                                borderColor: `${STACK_COLORS[key]}30`,
                                background: `${STACK_COLORS[key]}08`,
                              }}>
                                {v}
                              </span>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 style={{
                      fontWeight: 700, fontSize: '0.78rem', marginBottom: 12,
                      color: 'var(--text-muted)', letterSpacing: 2, textTransform: 'uppercase',
                    }}>Features</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {p.features.map(f => (
                        <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <div style={{
                            width: 5, height: 5, borderRadius: '50%', flexShrink: 0, marginTop: 7,
                            background: 'var(--accent-cyan)',
                          }} />
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact */}
                  <div>
                    <h4 style={{
                      fontWeight: 700, fontSize: '0.78rem', marginBottom: 12,
                      color: 'var(--text-muted)', letterSpacing: 2, textTransform: 'uppercase',
                    }}>Impact</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {p.impact.map(imp => (
                        <div key={imp} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <Zap size={13} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 2 }} />
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: 1.5 }}>{imp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .project-body-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .project-body-grid { grid-template-columns: 1fr !important; }
          .project-inner { padding: 24px 20px !important; }
        }
      `}</style>
    </section>
  )
}
