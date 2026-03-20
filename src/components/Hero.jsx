import { useEffect, useState, useRef } from 'react'
import { ArrowDown, MapPin, Code2, Zap, Download, Briefcase, GitBranch } from 'lucide-react'

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

/* ── Floating tech icon definitions ── */
const FLOAT_ICONS = [
  { label: 'React', color: '#61dafb', angle: 0,   r: 170,
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 10.11A1.87 1.87 0 1 1 10.13 12 1.88 1.88 0 0 1 12 10.11M7.37 20c.34.08.61-.37.58-.7a13.54 13.54 0 0 0-.54-2.23 12.09 12.09 0 0 0-1.67.3 7.52 7.52 0 0 0 1.63 2.63M8.83 8a13.13 13.13 0 0 0-2.52-3.72 7.28 7.28 0 0 0-1.63 2.64A12.25 12.25 0 0 0 8.83 8M12 5.67c-.7.84-1.33 1.96-1.85 3.17A7.13 7.13 0 0 0 12 9a7 7 0 0 0 1.85-.17A19.7 19.7 0 0 0 12 5.67M16.83 13.34a12.25 12.25 0 0 0 2.53-1.08 7.28 7.28 0 0 0-1.63-2.64 13 13 0 0 0-2.52 3.72 12 12 0 0 1 1.62 0M7.36 4c-.56.68-1.19 1.58-1.64 2.63a12 12 0 0 0 1.67.31A13.66 13.66 0 0 0 7.94 4.7 7.46 7.46 0 0 0 7.36 4M16.93 20a7.52 7.52 0 0 0 1.63-2.63 12.09 12.09 0 0 0-1.67-.3 13.54 13.54 0 0 0-.54 2.23c-.03.33.24.78.58.7M16.63 4a7.35 7.35 0 0 0-.58.7 13.66 13.66 0 0 0 .54 2.24 12 12 0 0 0 1.67-.31A19.06 19.06 0 0 0 16.63 4M4 12a7.39 7.39 0 0 0 .58 2.85 12.27 12.27 0 0 0 1.72-.83Q6 13.52 6 12t.3-2a12.27 12.27 0 0 0-1.72-.83A7.39 7.39 0 0 0 4 12m13.72 2a12.27 12.27 0 0 0 1.72.83A7.39 7.39 0 0 0 20 12a7.39 7.39 0 0 0-.58-2.85 12.27 12.27 0 0 0-1.72.83q.3.98.3 2t-.28 2M10.15 19A19.7 19.7 0 0 0 12 18.33 19.7 19.7 0 0 0 13.85 19a13.13 13.13 0 0 0 2.52-3.18A7.13 7.13 0 0 0 14.52 15 7 7 0 0 0 12 15.17 7.13 7.13 0 0 0 9.63 15a13.13 13.13 0 0 0-1.84.82A13.13 13.13 0 0 0 10.15 19"/></svg> },
  { label: 'Java', color: '#f89820', angle: 72,  r: 170,
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/></svg> },
  { label: 'AWS',  color: '#ff9900', angle: 144, r: 170,
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.383-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.030-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.319-.08-.072-.056-.128-.16-.16-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.159.32-.072.056-.176.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.778.778 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.655.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/></svg> },
  { label: 'Docker', color: '#2496ed', angle: 216, r: 170,
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.743.421H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.010.303-.293.55-.65.707-1.046l.098-.288Z"/></svg> },
  { label: 'Node.js', color: '#8cc84b', angle: 288, r: 170,
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M11.998.016a1.008 1.008 0 0 0-.504.132L1.218 5.886a1.01 1.01 0 0 0-.504.875v11.487a1.01 1.01 0 0 0 .504.875l10.276 5.736a1.01 1.01 0 0 0 1.009 0l10.275-5.736a1.01 1.01 0 0 0 .505-.875V6.76a1.01 1.01 0 0 0-.505-.875L12.502.148a1.008 1.008 0 0 0-.504-.132zM12 2.158l9.27 5.176v10.33L12 22.842l-9.27-5.178V7.334z"/><path d="M12 7.43c-2.538 0-4.031 1.07-4.031 2.862 0 1.884 1.454 2.408 3.82 2.644 2.802.276 3.017.693 3.017 1.25 0 .97-.773 1.38-2.59 1.38-2.287 0-2.79-.572-2.962-1.707a.213.213 0 0 0-.21-.18H7.64a.213.213 0 0 0-.212.225c.203 2.373 1.585 3.477 4.572 3.477 2.73 0 4.3-1.072 4.3-2.944 0-1.856-1.255-2.35-3.896-2.704-2.667-.355-2.94-.537-2.94-1.168 0-.522.233-1.217 2.194-1.217 1.76 0 2.411.38 2.68 1.566.04.187.21.322.4.322h1.396a.214.214 0 0 0 .214-.22c-.248-2.184-1.636-3.587-4.348-3.587z"/></svg> },
]

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

/* ── Vector photo frame with orbiting icons ── */
function PhotoOrbit() {
  return (
    <div style={{ position: 'relative', width: 340, height: 340 }}>

      {/* Orbit ring SVG */}
      <svg width="340" height="340" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <circle cx="170" cy="170" r="158" fill="none"
          stroke="rgba(0,212,255,0.1)" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="170" cy="170" r="140" fill="none"
          stroke="rgba(124,58,237,0.08)" strokeWidth="1" />
        {/* Corner accent lines */}
        <line x1="20" y1="170" x2="60" y2="170" stroke="rgba(0,212,255,0.3)" strokeWidth="1.5"/>
        <line x1="280" y1="170" x2="320" y2="170" stroke="rgba(0,212,255,0.3)" strokeWidth="1.5"/>
        <line x1="170" y1="20" x2="170" y2="60" stroke="rgba(124,58,237,0.3)" strokeWidth="1.5"/>
        <line x1="170" y1="280" x2="170" y2="320" stroke="rgba(124,58,237,0.3)" strokeWidth="1.5"/>
        {/* Hex corner decorations */}
        {[0,60,120,180,240,300].map(deg => {
          const rad = (deg * Math.PI) / 180
          const cx = 170 + 155 * Math.cos(rad)
          const cy = 170 + 155 * Math.sin(rad)
          return <circle key={deg} cx={cx} cy={cy} r="3"
            fill="none" stroke="rgba(0,212,255,0.4)" strokeWidth="1.5" />
        })}
      </svg>

      {/* Orbiting tech icons */}
      {FLOAT_ICONS.map(({ label, color, angle, r, svg }) => {
        const rad = ((angle - 90) * Math.PI) / 180
        const x = 170 + r * Math.cos(rad) - 19
        const y = 170 + r * Math.sin(rad) - 19
        return (
          <div key={label} title={label} style={{
            position: 'absolute',
            left: x, top: y,
            width: 38, height: 38,
            borderRadius: 10,
            background: `${color}12`,
            border: `1.5px solid ${color}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color,
            zIndex: 3,
            backdropFilter: 'blur(6px)',
            boxShadow: `0 4px 16px ${color}18`,
          }}>
            {svg}
          </div>
        )
      })}

      {/* Center photo */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
      }}>
        {/* Gradient glow ring */}
        <div style={{
          position: 'absolute', inset: -3, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink))',
          filter: 'blur(2px)',
          zIndex: 0,
        }} />
        {/* Photo clipped to circle */}
        <div style={{
          width: 204, height: 204,
          borderRadius: '50%',
          overflow: 'hidden',
          position: 'relative', zIndex: 1,
          border: '3px solid rgba(5,8,22,0.8)',
        }}>
          <img
            src={`${import.meta.env.BASE_URL}profile.png`}
            alt="Sethuvekram Shanmugasundaram"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>
        {/* Open to Work badge */}
        <div style={{
          position: 'absolute', bottom: -16, left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(5,8,22,0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(16,185,129,0.45)',
          borderRadius: 50, padding: '5px 13px',
          whiteSpace: 'nowrap', zIndex: 4,
          fontSize: '0.73rem', fontWeight: 700, color: '#10b981',
          display: 'flex', alignItems: 'center', gap: 6,
          boxShadow: '0 4px 16px rgba(16,185,129,0.15)',
        }}>
          <span className="pulse-green-dot" />
          Open to Work
        </div>
      </div>

      {/* Corner hex decorations */}
      <svg width="340" height="340" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {/* Top-left bracket */}
        <path d="M 30 50 L 30 30 L 50 30" fill="none" stroke="rgba(0,212,255,0.35)" strokeWidth="2" strokeLinecap="round"/>
        {/* Top-right bracket */}
        <path d="M 290 30 L 310 30 L 310 50" fill="none" stroke="rgba(124,58,237,0.35)" strokeWidth="2" strokeLinecap="round"/>
        {/* Bottom-left bracket */}
        <path d="M 30 290 L 30 310 L 50 310" fill="none" stroke="rgba(124,58,237,0.35)" strokeWidth="2" strokeLinecap="round"/>
        {/* Bottom-right bracket */}
        <path d="M 310 290 L 310 310 L 290 310" fill="none" stroke="rgba(0,212,255,0.35)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  )
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
              marginBottom: 28,
            }} className="animate-fade-up delay-300">
              Full-Stack Developer turned Product Strategist —{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>3+ years</span>{' '}
              shipping enterprise-grade platforms with{' '}
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}>React</span>,{' '}
              <span style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>Spring Boot</span> &{' '}
              <span style={{ color: 'var(--accent-pink)', fontWeight: 500 }}>AWS</span>.
            </p>

            {/* Currently at badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '8px 16px', borderRadius: 12, marginBottom: 32,
              background: 'rgba(236,72,153,0.06)',
              border: '1px solid rgba(236,72,153,0.2)',
              fontSize: '0.83rem',
            }} className="animate-fade-up delay-300">
              <Briefcase size={14} style={{ color: '#ec4899' }} />
              <span style={{ color: 'var(--text-muted)' }}>Currently at</span>
              <span style={{ color: '#ec4899', fontWeight: 700 }}>Shinelogics Informatics</span>
              <span style={{
                padding: '2px 8px', borderRadius: 50, fontSize: '0.7rem', fontWeight: 700,
                background: 'rgba(236,72,153,0.15)', color: '#ec4899',
              }}>Product Strategy Lead</span>
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

          {/* Visual side — orbit photo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}
               className="hero-visual animate-fade-right delay-400">
            <div className="animate-float">
              <PhotoOrbit />
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
          .hero-visual {
            display: flex !important;
            justify-content: center;
            margin-top: 8px;
            margin-bottom: -32px;
            transform: scale(0.62);
            transform-origin: center top;
          }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  )
}
