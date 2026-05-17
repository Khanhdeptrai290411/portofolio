'use client';

import { useRef, useEffect, useState } from 'react';
import { Send, MapPin, Mail, Clock } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { personalInfo } from '@/lib/data';
import { translations, type Lang } from '@/lib/i18n';

interface Props { lang: Lang; }

function SectionFadeIn({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease', ...style }}>
      {children}
    </div>
  );
}

export default function ContactSection({ lang }: Props) {
  const t = translations[lang].contact;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.send(
        'service_dbehtno', 
        'template_ebjh1wn',
        { name, email, message },
        'iAhy7LoOQkac9QZLT'
      );

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    background: 'rgba(0,255,153,0.03)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--color-primary)';
    e.currentTarget.style.boxShadow = '0 0 12px var(--glow-color)';
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--border-color)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <section
      id="contact"
      style={{ padding: '6rem 5%', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionFadeIn>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', fontSize: '0.8rem', marginBottom: '8px' }}>// 06. contact</p>
            <h2 className="section-title">{t.sectionTitle}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{t.sectionSubtitle}</p>
          </div>
        </SectionFadeIn>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* LEFT: Terminal info */}
          <SectionFadeIn style={{ flex: '1 1 280px', transitionDelay: '0.1s' }}>
            <div className="terminal-card" style={{ height: '100%' }}>
              <div className="terminal-header">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span style={{ marginLeft: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  bash
                </span>
              </div>
              <div style={{ padding: '1.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                <div style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--color-primary)' }}>kay@portfolio</span>:~/contact$ ./connect.sh
                </div>

                {[
                  { icon: <Mail size={13} />, label: 'email', value: personalInfo.email },
                  { icon: <GithubIcon size={13} />, label: 'github', value: 'github.com/Khanhdeptrai290411' },
                  { icon: <MapPin size={13} />, label: 'location', value: personalInfo.location },
                  { icon: <Clock size={13} />, label: 'response', value: lang === 'jp' ? '通常24時間以内' : 'within 24 hours' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-primary)', marginTop: '1px', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.72rem' }}>{item.label}</div>
                      <div style={{ color: 'var(--text-primary)', wordBreak: 'break-all' }}>{item.value}</div>
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--color-primary)' }}>$</span> _
                  <span
                    className="cursor-blink"
                    style={{ display: 'inline-block', width: '8px', height: '13px', background: 'var(--color-primary)', verticalAlign: 'middle', marginLeft: '2px' }}
                  />
                </div>
              </div>
            </div>
          </SectionFadeIn>

          {/* RIGHT: Form */}
          <SectionFadeIn style={{ flex: '1 1 320px', transitionDelay: '0.2s' }}>
            <div className="terminal-card">
              <div className="terminal-header">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span style={{ marginLeft: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  send_message.sh
                </span>
              </div>

              <form onSubmit={handleSubmit} style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label htmlFor="contact-name" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--color-primary)' }}>$</span> name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--color-primary)' }}>$</span> email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--color-primary)' }}>$</span> message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder={t.messagePlaceholder}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                    onFocus={onFocus as any}
                    onBlur={onBlur as any}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary"
                  data-hover
                  style={{
                    cursor: 'pointer',
                    opacity: status === 'sending' ? 0.7 : 1,
                    justifyContent: 'center',
                  }}
                >
                  <Send size={14} />
                  {status === 'sending' ? t.sending : t.sendBtn}
                </button>

                {/* Toast-style inline status */}
                {status === 'success' && (
                  <div className="toast toast-success" style={{ position: 'static', margin: 0 }}>
                    {t.successMsg}
                  </div>
                )}
                {status === 'error' && (
                  <div className="toast toast-error" style={{ position: 'static', margin: 0 }}>
                    {t.errorMsg}
                  </div>
                )}
              </form>
            </div>
          </SectionFadeIn>
        </div>
      </div>
    </section>
  );
}
