import { Cloud, Container, GitBranch, Activity, Server, RefreshCw } from 'lucide-react'

const DEVOPS_ITEMS = [
  {
    icon: <Container size={22} />,
    color: '#00d4ff',
    title: 'Docker Containerization',
    desc: 'Containerizing microservices and full-stack apps for consistent deployments across environments.',
  },
  {
    icon: <Cloud size={22} />,
    color: '#7c3aed',
    title: 'AWS Cloud Deployment',
    desc: 'Deploying and managing production services on AWS infrastructure — EC2, S3, and more.',
  },
  {
    icon: <RefreshCw size={22} />,
    color: '#ec4899',
    title: 'CI/CD Pipelines',
    desc: 'Automating build, test, and deployment workflows for faster, safer releases.',
  },
  {
    icon: <Server size={22} />,
    color: '#10b981',
    title: 'Server Configuration',
    desc: 'Configuring and hardening production servers for security, performance, and uptime.',
  },
  {
    icon: <Activity size={22} />,
    color: '#f59e0b',
    title: 'Production Monitoring',
    desc: 'Monitoring application health, tracking performance metrics, and ensuring system stability.',
  },
  {
    icon: <GitBranch size={22} />,
    color: '#a78bfa',
    title: 'Version Control & Workflows',
    desc: 'Managing Git branching strategies, PR workflows, and collaborative development practices.',
  },
]

export default function DevOps() {
  return (
    <section id="devops" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 700px 400px at 100% 30%, rgba(124,58,237,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="section-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-divider" style={{ margin: '0 auto 16px' }} />
          <h2 className="section-title">
            DevOps & <span className="gradient-text">Deployment</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Production-ready cloud deployments and infrastructure management
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          marginBottom: 60,
        }} className="devops-grid">
          {DEVOPS_ITEMS.map(item => (
            <div key={item.title} className="glass-card" style={{ padding: 28 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `${item.color}12`,
                border: `1px solid ${item.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: item.color,
                marginBottom: 16,
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 10 }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(124,58,237,0.1) 50%, rgba(236,72,153,0.06) 100%)',
          border: '1px solid rgba(0,212,255,0.15)',
          borderRadius: 20,
          padding: '36px 40px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 24,
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8 }}>
              Full Deployment Lifecycle
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: 480, lineHeight: 1.7, fontSize: '0.9rem' }}>
              From writing code to deploying and monitoring production systems — I own the
              full engineering lifecycle including containerization, cloud infrastructure,
              and ongoing system maintenance.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 32 }}>
            {[
              { val: 'AWS',    sub: 'Cloud Provider' },
              { val: 'Docker', sub: 'Containers' },
              { val: 'CI/CD',  sub: 'Automation' },
            ].map(s => (
              <div key={s.val} style={{ textAlign: 'center' }}>
                <div className="stat-number" style={{ fontSize: '1.5rem' }}>{s.val}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .devops-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 560px) {
          .devops-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
