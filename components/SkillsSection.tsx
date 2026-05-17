'use client';

import { useRef, useEffect, useState } from 'react';
import { skills, type SkillLevel } from '@/lib/data';
import { translations, type Lang } from '@/lib/i18n';

interface Props { lang: Lang; }

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

const LEVEL_COLORS: Record<SkillLevel, string> = {
  Experienced: 'var(--color-primary)',
  Familiar: 'var(--color-accent)',
  Learning: '#f9d423',
};

const CATEGORY_ORDER = ['Frontend', 'Backend', 'Mobile', 'Database', 'Tools', 'Languages'];

export default function SkillsSection({ lang }: Props) {
  const t = translations[lang].skills;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...CATEGORY_ORDER];
  const filtered = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);

  const grouped: Record<string, typeof skills> = {};
  filtered.forEach(s => {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  });

  return (
    <section
      id="skills"
      style={{ padding: '6rem 5%', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <SectionFadeIn>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', fontSize: '0.8rem', marginBottom: '8px' }}>// 02. skills</p>
            <h2 className="section-title">{t.sectionTitle}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{t.sectionSubtitle}</p>
          </div>
        </SectionFadeIn>

        {/* Category filter tabs */}
        <SectionFadeIn style={{ transitionDelay: '0.1s' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '2.5rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-hover
                style={{
                  padding: '6px 16px',
                  borderRadius: '999px',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? 'var(--color-primary)' : 'var(--border-color)',
                  background: activeCategory === cat ? 'rgba(0,255,153,0.1)' : 'transparent',
                  color: activeCategory === cat ? 'var(--color-primary)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  cursor: 'none',
                  transition: 'all 0.2s',
                }}
              >
                {cat === 'All' ? (lang === 'jp' ? 'すべて' : 'All') : t.categories[cat as keyof typeof t.categories] ?? cat}
              </button>
            ))}
          </div>
        </SectionFadeIn>

        {/* Skills grid */}
        {Object.entries(grouped).map(([category, catSkills], gi) => (
          <SectionFadeIn key={category} style={{ transitionDelay: `${gi * 0.08}s`, marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: 'var(--color-primary)',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{ opacity: 0.5 }}>──</span>
                {t.categories[category as keyof typeof t.categories] ?? category}
                <span style={{ opacity: 0.5 }}>──</span>
              </h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {catSkills.map(skill => (
                  <div
                    key={skill.name}
                    data-hover
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.25s ease',
                      cursor: 'default',
                      minWidth: '140px',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = LEVEL_COLORS[skill.level];
                      el.style.boxShadow = `0 0 16px ${LEVEL_COLORS[skill.level]}40`;
                      el.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'var(--border-color)';
                      el.style.boxShadow = 'none';
                      el.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                        {skill.name}
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: '1px solid',
                        borderColor: LEVEL_COLORS[skill.level],
                        color: LEVEL_COLORS[skill.level],
                        background: `${LEVEL_COLORS[skill.level]}12`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {t.levels[skill.level]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </SectionFadeIn>
        ))}
      </div>
    </section>
  );
}
