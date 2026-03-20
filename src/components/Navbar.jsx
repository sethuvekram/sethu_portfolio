import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About',      href: '#about',      id: 'about'      },
  { label: 'Skills',     href: '#skills',     id: 'skills'     },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Education',  href: '#education',  id: 'education'  },
  { label: 'Projects',   href: '#projects',   id: 'projects'   },
  { label: 'Contact',    href: '#contact',    id: 'contact'    },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState('')
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [progress,  setProgress]  = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 40)

      // Scroll progress 0–100
      const docH  = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docH > 0 ? (scrollY / docH) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = links.map(l => l.id)
    const observers  = []

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive('#' + id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const navStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    transition: 'all 0.3s ease',
    padding: scrolled ? '12px 0' : '22px 0',
    background: scrolled ? 'rgba(5,8,22,0.92)' : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <nav style={navStyle}>
        <div className="section-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: '1.2rem',
              letterSpacing: '0.5px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
            }}>
              <span style={{ color: '#00d4ff', textShadow: '0 0 12px rgba(0,212,255,0.6)' }}>{`{`}</span>
              <span style={{
                background: 'linear-gradient(135deg, #00d4ff, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                padding: '0 4px',
              }}>S</span>
              <span style={{
                color: '#a78bfa',
                textShadow: '0 0 12px rgba(167,139,250,0.6)',
                animation: 'nav-cursor-blink 1.1s step-end infinite',
              }}>_</span>
              <span style={{ color: '#a78bfa', textShadow: '0 0 12px rgba(167,139,250,0.6)' }}>{`}`}</span>
            </span>
          </a>

          <style>{`
            @keyframes nav-cursor-blink {
              0%, 100% { opacity: 1; }
              50%       { opacity: 0; }
            }
          `}</style>

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="desktop-nav">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link ${active === l.href ? 'active' : ''}`}
                onClick={() => setActive(l.href)}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary" style={{ padding: '9px 22px', fontSize: '0.85rem' }}>
              <span>Hire Me</span>
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', display: 'none' }}
            className="hamburger-btn"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 150 }}
        />
      )}

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button
          onClick={() => setMenuOpen(false)}
          style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}
        >
          <X size={24} />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link ${active === l.href ? 'active' : ''}`}
              onClick={() => { setActive(l.href); setMenuOpen(false) }}
              style={{ fontSize: '1.1rem' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary"
            style={{ marginTop: 8, justifyContent: 'center' }}
            onClick={() => setMenuOpen(false)}
          >
            <span>Hire Me</span>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav  { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}

