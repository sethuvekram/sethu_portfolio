import { useState } from 'react'
import { MapPin, Mail, MessageSquare, Send, CheckCircle2, Linkedin, Github, Globe } from 'lucide-react'

const AVAILABLE_FOR = [
  'Full-Stack Development',
  'Backend Architecture',
  'Cloud Deployments',
  'Product Engineering',
  'Team Collaboration',
]

// ── FormSubmit (zero sign-up required) ─────────────────────────────────────
// Sends directly to sethu.nextgen@gmail.com via formsubmit.co
// First submission triggers a ONE-TIME confirmation email — click Activate in it.
// After that, every submission lands in your Gmail inbox automatically.
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/sethu.nextgen@gmail.com'
// ────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm]           = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending]     = useState(false)
  const [sendError, setSendError] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    setSendError(false)
    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          subject: form.subject || 'Portfolio Contact',
          message: form.message,
          _captcha: 'false',
          _template: 'table',
        }),
      })
      const data = await res.json()
      if (data.success === 'true' || data.success === true) {
        setSubmitted(true)
      } else {
        setSendError(true)
      }
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  const INPUT_STYLE = {
    width: '100%',
    padding: '13px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'Inter, sans-serif',
  }

  return (
    <section id="contact" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 700px 500px at 50% 110%, rgba(124,58,237,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="section-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-divider" style={{ margin: '0 auto 16px' }} />
          <h2 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Open to new opportunities, collaborations, and interesting conversations
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48,
        }} className="contact-grid">

          {/* Left side — info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {/* Location */}
            <div className="glass-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: 4 }}>Location</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Chennai, India</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 2 }}>Open to remote & hybrid work</p>
                </div>
              </div>
            </div>

            {/* Available for */}
            <div className="glass-card" style={{ padding: 24 }}>
              <h4 style={{ fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle2 size={17} style={{ color: '#10b981' }} />
                Available For
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {AVAILABLE_FOR.map(a => (
                  <div key={a} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-cyan)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="glass-card" style={{ padding: 24 }}>
              <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.95rem' }}>Find Me Online</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a
                  href="https://github.com/sethuvekram"
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none',
                    color: 'var(--text-muted)', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-cyan)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Github size={16} />
                  </div>
                  <span>github.com/sethuvekram</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/sethuvekram-shanmugasundaram-215303147/"
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none',
                    color: 'var(--text-muted)', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#7c3aed'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Linkedin size={16} />
                  </div>
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href="mailto:sethu.nextgen@gmail.com"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none',
                    color: 'var(--text-muted)', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#10b981'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={16} />
                  </div>
                  <span>sethu.nextgen@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Philosophy blurb */}
            <div style={{
              padding: 24,
              background: 'linear-gradient(135deg, rgba(0,212,255,0.05), rgba(124,58,237,0.08))',
              border: '1px solid rgba(0,212,255,0.12)',
              borderRadius: 14,
            }}>
              <h4 style={{ fontWeight: 700, marginBottom: 10, fontSize: '0.95rem' }}>Development Philosophy</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                "Clean code, scalable architecture, and user-first experiences — delivered with consistency and craftsmanship."
              </p>
            </div>
          </div>

          {/* Right side — form */}
          <div className="glass-card" style={{ padding: 36 }}>
            {submitted ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                height: '100%', gap: 16, textAlign: 'center',
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'rgba(16,185,129,0.12)',
                  border: '2px solid #10b981',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CheckCircle2 size={28} style={{ color: '#10b981' }} />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '1.2rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:'',email:'',subject:'',message:'' }) }}
                  className="btn-secondary"
                  style={{ marginTop: 8 }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
                  <MessageSquare size={20} style={{ color: 'var(--accent-cyan)' }} />
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Send a Message</h3>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                    <div>
                      <label htmlFor="contact-name" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6, display: 'block' }}>
                        Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name" value={form.name} onChange={handleChange} required
                        placeholder="Your name"
                        style={INPUT_STYLE}
                        onFocus={e => e.target.style.borderColor = 'rgba(0,212,255,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6, display: 'block' }}>
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        name="email" value={form.email} onChange={handleChange} required type="email"
                        placeholder="your@email.com"
                        style={INPUT_STYLE}
                        onFocus={e => e.target.style.borderColor = 'rgba(0,212,255,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6, display: 'block' }}>
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject" value={form.subject} onChange={handleChange}
                      placeholder="What's this about?"
                      style={INPUT_STYLE}
                      onFocus={e => e.target.style.borderColor = 'rgba(0,212,255,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6, display: 'block' }}>
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message" value={form.message} onChange={handleChange} required
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      style={{ ...INPUT_STYLE, resize: 'vertical', minHeight: 120 }}
                      onFocus={e => e.target.style.borderColor = 'rgba(0,212,255,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ justifyContent: 'center', marginTop: 4 }}
                    disabled={sending}
                  >
                    <span>{sending ? 'Sending...' : 'Send Message'}</span>
                    <Send size={16} />
                  </button>

                  {sendError && (
                    <p style={{
                      marginTop: 12, textAlign: 'center',
                      color: '#f87171', fontSize: '0.85rem',
                    }}>
                      Something went wrong. Please email me directly at{' '}
                      <a href="mailto:sethu.nextgen@gmail.com"
                         style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>
                        sethu.nextgen@gmail.com
                      </a>
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
