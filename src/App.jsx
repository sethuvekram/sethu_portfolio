import './index.css'
import { useEffect, useRef, useState } from 'react'
import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import About      from './components/About'
import Skills     from './components/Skills'
import Experience from './components/Experience'
import Projects   from './components/Projects'
import DevOps     from './components/DevOps'
import Contact    from './components/Contact'
import Footer     from './components/Footer'
import { Zap, Target, Users, CheckCircle2, ArrowRight, Star } from 'lucide-react'

/* ─────────────────────────────────────────
   useInView — fires once when el enters viewport
───────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

/* ─────────────────────────────────────────
   Reveal — scroll-triggered fade-up wrapper
───────────────────────────────────────── */
function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{
      opacity:   inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(44px)',
      transition: `opacity 0.78s ease ${delay}s, transform 0.78s ease ${delay}s`,
    }}>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────
   CursorGlow — ambient spotlight follows mouse
───────────────────────────────────────── */
function CursorGlow() {
  const [pos, setPos] = useState({ x: -999, y: -999 })
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const move = e => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true) }
    const hide = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', hide)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', hide)
    }
  }, [])
  return (
    <div style={{
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 9998,
      left: pos.x - 260,
      top:  pos.y - 260,
      width:  520,
      height: 520,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0,212,255,0.042) 0%, transparent 65%)',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.35s ease, left 0.07s linear, top 0.07s linear',
    }} />
  )
}

/* ─────────────────────────────────────────
   TechMarquee — infinite scrolling tech strip
───────────────────────────────────────── */
const MARQUEE_ITEMS = [
  'React.js','Vite','JavaScript','TypeScript',
  'Java','Spring Boot','Node.js','Express.js',
  'MongoDB','PostgreSQL','MySQL',
  'AWS','Docker','CI/CD',
  'REST APIs','Microservices','Tailwind CSS','Git',
]

const DOT_COLORS = ['var(--accent-cyan)','var(--accent-purple)','var(--accent-pink)','#10b981']

function TechMarquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div style={{
      overflow: 'hidden',
      padding: '18px 0',
      borderTop:    '1px solid var(--glass-border)',
      borderBottom: '1px solid var(--glass-border)',
      background: 'rgba(0,0,0,0.18)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 130,
        background: 'linear-gradient(90deg, var(--bg-primary), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 130,
        background: 'linear-gradient(270deg, var(--bg-primary), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 16px',
            margin: '0 5px',
            borderRadius: 50,
            fontSize: '0.81rem',
            fontWeight: 500,
            color: 'var(--text-muted)',
            border: '1px solid var(--glass-border)',
            background: 'var(--glass-bg)',
            whiteSpace: 'nowrap',
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
              background: DOT_COLORS[i % 4],
            }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   WhyHireMe — 3 bold value proposition cards
───────────────────────────────────────── */
const WHY_PILLARS = [
  {
    icon: <Zap size={26} />,
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.07), rgba(0,212,255,0.01))',
    border: 'rgba(0,212,255,0.18)',
    title: 'End-to-End Delivery',
    tagline: 'I own the full stack — no handoffs, no gaps.',
    points: [
      'UI to API to database to deployment, all in one developer',
      'Production-ready code shipped with real business impact',
      'Delivered 3+ enterprise platforms used by real teams daily',
    ],
  },
  {
    icon: <Target size={26} />,
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.07), rgba(124,58,237,0.01))',
    border: 'rgba(124,58,237,0.18)',
    title: 'Business-First Thinking',
    tagline: 'I build what solves problems, not just what looks good.',
    points: [
      'Built GST billing engines that eliminated manual errors',
      'Dashboards that turned raw data into strategic decisions',
      'Performance optimizations with measurable business value',
    ],
  },
  {
    icon: <Users size={26} />,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.07), rgba(236,72,153,0.01))',
    border: 'rgba(236,72,153,0.18)',
    title: 'Reliable Team Asset',
    tagline: 'I collaborate, mentor, and raise the bar.',
    points: [
      'Code reviews, architecture input, and Agile workflow champion',
      'Mentor junior developers and share knowledge proactively',
      'Clear communicator with PMs, designers, and stakeholders',
    ],
  },
]

function WhyHireMe() {
  const [ref, inView] = useInView(0.1)
  return (
    <section ref={ref} style={{
      padding: '100px 0',
      position: 'relative',
      overflow: 'hidden',
      opacity:   inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(44px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 900px 500px at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />

      <div className="section-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-divider" style={{ margin: '0 auto 16px' }} />
          <h2 className="section-title">
            Why Hire <span className="gradient-text">Me?</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Three reasons I bring immediate value from day one
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
          marginBottom: 52,
        }} className="why-grid">
          {WHY_PILLARS.map((p, i) => (
            <div key={p.title} style={{
              background: p.gradient,
              border: `1px solid ${p.border}`,
              borderRadius: 20,
              padding: '32px 28px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              opacity:   inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transitionProperty: 'opacity, transform, box-shadow',
              transitionDuration: '0.8s, 0.8s, 0.3s',
              transitionDelay: `${0.12 + i * 0.13}s, ${0.12 + i * 0.13}s, 0s`,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = `0 24px 56px ${p.color}18`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: `${p.color}14`,
                border: `1px solid ${p.color}28`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: p.color, marginBottom: 18,
              }}>
                {p.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 10 }}>{p.title}</h3>
              <p style={{
                color: p.color, fontSize: '0.875rem', fontStyle: 'italic',
                marginBottom: 20, lineHeight: 1.55, fontWeight: 500,
              }}>
                "{p.tagline}"
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {p.points.map(pt => (
                  <div key={pt} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <CheckCircle2 size={14} style={{ color: p.color, flexShrink: 0, marginTop: 2 }} />
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.845rem', lineHeight: 1.6 }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div style={{
          textAlign: 'center',
          padding: '36px 24px',
          background: 'linear-gradient(135deg, rgba(0,212,255,0.04), rgba(124,58,237,0.07), rgba(236,72,153,0.04))',
          border: '1px solid rgba(0,212,255,0.14)',
          borderRadius: 20,
        }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 20 }}>
            Ready to build something great together?
          </p>
          <a href="#contact" className="btn-primary">
            <span>Let's Talk</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .why-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

/* ─────────────────────────────────────────
   CodeShowcase — real syntax-highlighted snippet
───────────────────────────────────────── */
function CodeShowcase() {
  const [ref, inView] = useInView(0.1)
  return (
    <section ref={ref} style={{
      padding: '100px 0', position: 'relative', overflow: 'hidden',
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(44px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 700px 400px at 100% 50%, rgba(0,212,255,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div className="section-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' }} className="code-grid">

          {/* Left — text */}
          <div>
            <div className="section-divider" />
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              Clean Code,<br /><span className="gradient-text">Real Work</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28, fontSize: '0.95rem' }}>
              A real snippet from the eCommerce Inventory System — a secured Spring Boot REST
              controller with paginated product queries and role-based warehouse dispatch.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { color: '#00d4ff', text: 'RESTful design with proper HTTP semantics' },
                { color: '#7c3aed', text: 'Spring Security role-based access control' },
                { color: '#10b981', text: 'Clean service-layer separation & pagination' },
                { color: '#ec4899', text: 'Request validation with @Valid annotations' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — code window */}
          <div style={{
            background: '#0d1117',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.05)',
          }}>
            {/* Window chrome */}
            <div style={{
              padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 7,
              background: '#161b22', borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginLeft: 10, fontFamily: "'JetBrains Mono', monospace" }}>
                InventoryController.java
              </span>
            </div>
            {/* Code */}
            <pre style={{
              padding: '22px 20px', margin: 0, overflowX: 'auto',
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.76rem', lineHeight: 1.8,
              color: '#e6edf3',
            }}>
<span style={{color:'#ff7b72'}}>@RestController{`\n`}</span>
<span style={{color:'#ff7b72'}}>@RequestMapping</span><span style={{color:'#e6edf3'}}>(</span><span style={{color:'#a5d6ff'}}>"/api/inventory"</span><span style={{color:'#e6edf3'}}>){`\n`}</span>
<span style={{color:'#ff7b72'}}>public class </span><span style={{color:'#ffa657'}}>InventoryController </span><span style={{color:'#e6edf3'}}>{`{\n\n`}</span>
<span style={{color:'#8b949e'}}>{'  '}// Paginated product listing{`\n`}</span>
<span style={{color:'#ff7b72'}}>{'  '}@GetMapping</span><span style={{color:'#e6edf3'}}>(</span><span style={{color:'#a5d6ff'}}>"/products"</span><span style={{color:'#e6edf3'}}>){`\n`}</span>
<span style={{color:'#ff7b72'}}>{'  '}public </span><span style={{color:'#79c0ff'}}>ResponseEntity</span><span style={{color:'#e6edf3'}}>{`<List<Product>> `}</span>
<span style={{color:'#d2a8ff'}}>getAll</span><span style={{color:'#e6edf3'}}>(</span><span style={{color:'#ff7b72'}}>@RequestParam </span><span style={{color:'#79c0ff'}}>int </span><span style={{color:'#e6edf3'}}>page, </span><span style={{color:'#ff7b72'}}>@RequestParam </span><span style={{color:'#79c0ff'}}>int </span><span style={{color:'#e6edf3'}}>size) {`{\n`}</span>
<span style={{color:'#79c0ff'}}>{'    '}Page</span><span style={{color:'#e6edf3'}}>{`<Product> `}results = service</span>
<span style={{color:'#d2a8ff'}}>{'        '}.getActiveProducts</span><span style={{color:'#e6edf3'}}>(PageRequest.of(page, size));{`\n`}</span>
<span style={{color:'#ff7b72'}}>{'    '}return </span><span style={{color:'#79c0ff'}}>ResponseEntity</span><span style={{color:'#d2a8ff'}}>.ok</span><span style={{color:'#e6edf3'}}>(results.getContent());{`\n`}</span>
<span style={{color:'#e6edf3'}}>{'  '}{'}'}{`\n\n`}</span>
<span style={{color:'#8b949e'}}>{'  '}// Secured warehouse dispatch{`\n`}</span>
<span style={{color:'#ff7b72'}}>{'  '}@PostMapping</span><span style={{color:'#e6edf3'}}>(</span><span style={{color:'#a5d6ff'}}>"/dispatch"</span><span style={{color:'#e6edf3'}}>){`\n`}</span>
<span style={{color:'#ff7b72'}}>{'  '}@PreAuthorize</span><span style={{color:'#e6edf3'}}>(</span><span style={{color:'#a5d6ff'}}>{"\"hasRole('WAREHOUSE')\""}</span><span style={{color:'#e6edf3'}}>){`\n`}</span>
<span style={{color:'#ff7b72'}}>{'  '}public </span><span style={{color:'#79c0ff'}}>ResponseEntity</span><span style={{color:'#e6edf3'}}>{`<DispatchNote> `}</span>
<span style={{color:'#d2a8ff'}}>dispatch</span><span style={{color:'#e6edf3'}}>(</span><span style={{color:'#ff7b72'}}>@RequestBody @Valid </span><span style={{color:'#79c0ff'}}>DispatchRequest </span><span style={{color:'#e6edf3'}}>req) {`{\n`}</span>
<span style={{color:'#79c0ff'}}>{'    '}DispatchNote </span><span style={{color:'#e6edf3'}}>note = service</span><span style={{color:'#d2a8ff'}}>.processDispatch</span><span style={{color:'#e6edf3'}}>(req);{`\n`}</span>
<span style={{color:'#ff7b72'}}>{'    '}return </span><span style={{color:'#79c0ff'}}>ResponseEntity</span><span style={{color:'#d2a8ff'}}>.status</span><span style={{color:'#e6edf3'}}>(</span><span style={{color:'#79c0ff'}}>201</span><span style={{color:'#e6edf3'}}>)</span><span style={{color:'#d2a8ff'}}>.body</span><span style={{color:'#e6edf3'}}>(note);{`\n`}</span>
<span style={{color:'#e6edf3'}}>{'  '}{'}'}{`\n`}</span>
<span style={{color:'#e6edf3'}}>{'}'}</span>
            </pre>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .code-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

/* ─────────────────────────────────────────
   Testimonials — social proof section
───────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    role: 'Senior Developer',
    company: 'Shinelogics Informatics',
    color: '#00d4ff',
    initial: 'R',
    quote: 'Sethuvekram consistently delivers clean, production-ready code. His ability to design full-stack systems from DB schema to React UI independently is rare at his experience level. A genuine force-multiplier on every sprint.',
  },
  {
    name: 'Priya Shankar',
    role: 'Product Manager',
    company: 'Shinelogics Informatics',
    color: '#7c3aed',
    initial: 'P',
    quote: 'Working with Sethu on our eCommerce platform was seamless. He understood business requirements quickly, asked the right questions, and delivered on time. His GST billing module alone saved the team weeks of manual work.',
  },
  {
    name: 'Arun Venkatesh',
    role: 'Lead Engineer',
    company: 'Shinelogics Informatics',
    color: '#ec4899',
    initial: 'A',
    quote: "What impresses me most is Sethu's ownership mindset — he doesn't just complete tickets, he thinks about scalability. His Docker deployment setup noticeably improved our CI/CD reliability and reduced release friction.",
  },
]

function Testimonials() {
  const [ref, inView] = useInView(0.1)
  return (
    <section ref={ref} style={{
      padding: '100px 0', position: 'relative', overflow: 'hidden',
      background: 'rgba(255,255,255,0.01)',
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(44px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 800px 400px at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="section-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-divider" style={{ margin: '0 auto 16px' }} />
          <h2 className="section-title">
            What Colleagues <span className="gradient-text">Say</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Feedback from teammates who have worked alongside me
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="test-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 20, padding: '28px 24px',
              transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: `${0.1 + i * 0.13}s`,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${t.color}40`
                e.currentTarget.style.boxShadow = `0 20px 50px ${t.color}12`
                e.currentTarget.style.transform = 'translateY(-5px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--glass-border)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Quote icon */}
              <div style={{ color: t.color, opacity: 0.22, marginBottom: 14 }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                </svg>
              </div>
              {/* Quote text */}
              <p style={{
                color: 'var(--text-muted)', fontSize: '0.875rem',
                lineHeight: 1.8, marginBottom: 22, fontStyle: 'italic',
              }}>
                "{t.quote}"
              </p>
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                {[0,1,2,3,4].map(si => (
                  <Star key={si} size={13} fill="#f59e0b" stroke="none" />
                ))}
              </div>
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${t.color}28, ${t.color}0a)`,
                  border: `1.5px solid ${t.color}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.9rem', color: t.color, flexShrink: 0,
                }}>
                  {t.initial}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: 'rgba(148,163,184,0.5)', fontSize: '0.75rem', marginTop: 24, fontStyle: 'italic' }}>
          * Testimonials from colleagues at Shinelogics Informatics
        </p>
      </div>
      <style>{`@media (max-width: 900px) { .test-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

/* ─────────────────────────────────────────
   BackToTop — floating button after 400px scroll
───────────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 200,
        width: 46,
        height: 46,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0,212,255,0.3)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)')}
      onMouseLeave={e => (e.currentTarget.style.transform = visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)')}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  )
}

/* ─────────────────────────────────────────
   SocialSidebar — fixed left strip with links
───────────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/sethuvekram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sethuvekram-shanmugasundaram-215303147/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:sethu.nextgen@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
]

function SocialSidebar() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div style={{
      position: 'fixed',
      left: 24,
      bottom: 0,
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(-20px)',
      transition: 'opacity 0.4s ease, transform 0.4s ease',
      pointerEvents: visible ? 'auto' : 'none',
    }} className="social-sidebar">
      {SOCIAL_LINKS.map(link => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'color 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--accent-cyan)'
            e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)'
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,212,255,0.15)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--text-muted)'
            e.currentTarget.style.borderColor = 'var(--glass-border)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {link.icon}
        </a>
      ))}
      {/* Vertical line */}
      <div style={{ width: 1, height: 70, background: 'var(--glass-border)' }} />
    </div>
  )
}

/* ─────────────────────────────────────────
   LoadingScreen — SVS splash that fades out
───────────────────────────────────────── */
function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [fading,  setFading]  = useState(false)
  useEffect(() => {
    const t1 = setTimeout(() => setFading(true),  900)
    const t2 = setTimeout(() => setVisible(false), 1650)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  if (!visible) return null
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--bg-primary)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 20,
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.75s ease',
      pointerEvents: fading ? 'none' : 'auto',
    }}>
      {/* Animated initials */}
      <div style={{
        width: 80, height: 80, borderRadius: 22,
        background: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(124,58,237,0.12))',
        border: '1.5px solid rgba(0,212,255,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'loading-pulse 1s ease-in-out infinite alternate',
      }}>
        <span style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: '1.6rem',
          background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px',
        }}>SVS</span>
      </div>
      {/* Dot loader */}
      <div style={{ display: 'flex', gap: 7 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--accent-cyan)',
            opacity: 0.4,
            animation: `loading-dot 0.8s ${i * 0.2}s ease-in-out infinite alternate`,
          }} />
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   App root
───────────────────────────────────────── */
export default function App() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <LoadingScreen />
      <CursorGlow />
      <SocialSidebar />
      <BackToTop />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Reveal><About /></Reveal>
        <WhyHireMe />
        <Reveal delay={0.05}><Skills /></Reveal>
        <Reveal delay={0.05}><Experience /></Reveal>
        <Reveal delay={0.05}><Projects /></Reveal>
        <CodeShowcase />
        <Testimonials />
        <Reveal delay={0.05}><DevOps /></Reveal>
        <Reveal delay={0.05}><Contact /></Reveal>
      </main>
      <Footer />
    </div>
  )
}
