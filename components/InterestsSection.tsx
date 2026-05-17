'use client';

import { useRef, useEffect, useState } from 'react';
import { Dumbbell, BookOpen, Code2, Languages } from 'lucide-react';
import { interests } from '@/lib/data';
import { translations, type Lang } from '@/lib/i18n';

interface Props { lang: Lang; }

const ICONS: Record<string, React.ReactNode> = {
  Dumbbell: <Dumbbell size={18} />,
  BookOpen: <BookOpen size={18} />,
  Code2: <Code2 size={18} />,
  Languages: <Languages size={18} />,
};

function SectionFadeIn({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease', ...style }}>
      {children}
    </div>
  );
}

export default function InterestsSection({ lang }: Props) {
  const t = translations[lang].interests;

  return (
    <section
      id="interests"
      style={{ padding: '6rem 5%', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)' }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <SectionFadeIn>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', fontSize: '0.8rem', marginBottom: '8px' }}>// 05. interests</p>
            <h2 className="section-title">{t.sectionTitle}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{t.sectionSubtitle}</p>
          </div>
        </SectionFadeIn>

        <SectionFadeIn style={{ transitionDelay: '0.1s' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '2rem' }}>
            {interests.map((interest, i) => (
              <div
                key={interest.id}
                data-hover
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 22px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '999px',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'default',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 2px 10px rgba(0,255,153,0.05)',
                  animationDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(0,255,153,0.12)';
                  el.style.borderColor = 'var(--color-primary)';
                  el.style.boxShadow = '0 0 20px var(--glow-color)';
                  el.style.transform = 'translateY(-3px) scale(1.04)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'var(--bg-card)';
                  el.style.borderColor = 'var(--border-color)';
                  el.style.boxShadow = '0 2px 10px rgba(0,255,153,0.05)';
                  el.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {ICONS[interest.icon]}
                {lang === 'jp' ? interest.labelJp : interest.labelEn}
              </div>
            ))}
          </div>
        </SectionFadeIn>

        <SectionFadeIn style={{ transitionDelay: '0.2s' }}>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.92rem',
            lineHeight: 1.8,
            maxWidth: '600px',
            margin: '0 auto',
            fontFamily: lang === 'jp' ? 'var(--font-sans)' : undefined,
          }}>
            {t.desc}
          </p>
        </SectionFadeIn>
      </div>
    </section>
  );
}
