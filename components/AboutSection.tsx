'use client';

import { useRef, useEffect, useState } from 'react';
import { MapPin, GraduationCap, BookOpen, Languages, Focus, Award } from 'lucide-react';
import { translations, type Lang } from '@/lib/i18n';

interface Props { lang: Lang; }

function SectionFadeIn({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function AboutSection({ lang }: Props) {
  const t = translations[lang].about;

  const facts = [
    { icon: <MapPin size={14} />, label: t.locationLabel, value: t.location },
    { icon: <GraduationCap size={14} />, label: t.educationLabel, value: t.education },
    { icon: <BookOpen size={14} />, label: t.majorLabel, value: t.major },
    { icon: <Award size={14} />, label: t.gpaLabel, value: t.gpa },
    { icon: <Languages size={14} />, label: t.japaneseLabel, value: t.japanese },
    { icon: <Focus size={14} />, label: t.focusLabel, value: t.focus },
  ];

  return (
    <section
      id="about"
      style={{
        padding: '6rem 5%',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-color)',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionFadeIn>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', fontSize: '0.8rem', marginBottom: '8px' }}>
              // 01. about
            </p>
            <h2 className="section-title">
              {t.sectionTitle}
            </h2>
          </div>
        </SectionFadeIn>

        <SectionFadeIn style={{ transitionDelay: '0.15s' }}>
          <div className="terminal-card">
            {/* Terminal header */}
            <div className="terminal-header">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
              <span style={{
                marginLeft: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
              }}>
                {t.terminalPrompt}
              </span>
            </div>

            <div style={{ padding: '1.8rem', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
              {/* Bio */}
              <div style={{ flex: '1 1 340px' }}>
                <p style={{
                  fontFamily: lang === 'jp' ? 'var(--font-sans)' : 'var(--font-mono)',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.9,
                }}>
                  {t.bio}
                </p>
              </div>

              {/* Facts */}
              <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {facts.map(f => (
                  <div
                    key={f.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      background: 'rgba(0,255,153,0.04)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                    }}
                  >
                    <span style={{ color: 'var(--color-primary)', flexShrink: 0 }}>{f.icon}</span>
                    <span style={{ color: 'var(--text-secondary)', minWidth: '80px' }}>{f.label}:</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionFadeIn>
      </div>
    </section>
  );
}
