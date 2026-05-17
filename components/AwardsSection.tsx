'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Trophy } from 'lucide-react';
import { awards } from '@/lib/data';
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

export default function AwardsSection({ lang }: Props) {
  const t = translations[lang].awards;

  return (
    <section
      id="awards"
      style={{ padding: '6rem 5%', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <SectionFadeIn>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', fontSize: '0.8rem', marginBottom: '8px' }}>// 04. awards</p>
            <h2 className="section-title">{t.sectionTitle}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{t.sectionSubtitle}</p>
          </div>
        </SectionFadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {awards.map((award, i) => (
            <SectionFadeIn key={award.id} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div
                className="terminal-card"
                data-hover
                style={{
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = '0 8px 40px var(--glow-color)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Header */}
                <div className="terminal-header">
                  <span className="terminal-dot terminal-dot-red" />
                  <span className="terminal-dot terminal-dot-yellow" />
                  <span className="terminal-dot terminal-dot-green" />
                  <span style={{ marginLeft: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                    {award.logFile}
                  </span>
                </div>

                {/* Image with scanline overlay */}
                <div
                  className="scanline-overlay"
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    style={{ objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,255,153,0.04)', mixBlendMode: 'screen', pointerEvents: 'none' }} />
                </div>

                {/* Info */}
                <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Trophy size={15} style={{ color: '#f9d423', marginTop: '2px', flexShrink: 0 }} />
                    <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1.3 }}>
                      {lang === 'jp' ? award.titleJp : award.title}
                    </h3>
                  </div>

                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-accent)' }}>
                    {award.date} · {t.organizer}: {lang === 'jp' ? award.organizerJp : award.organizer}
                  </div>

                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-primary)', opacity: 0.7 }}>
                    {t.project}: {award.project}
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontFamily: lang === 'jp' ? 'var(--font-sans)' : undefined }}>
                    {lang === 'jp' ? award.descriptionJp : award.descriptionEn}
                  </p>
                </div>
              </div>
            </SectionFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
