'use client';

import { useRef, useEffect, useState } from 'react';
import { ExternalLink, Trophy } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { projects, type Project } from '@/lib/data';
import { translations, type Lang } from '@/lib/i18n';

interface Props { lang: Lang; }

type ProjectsT = {
  sectionTitle: string;
  sectionSubtitle: string;
  githubBtn: string;
  demoBtn: string;
  frontendBtn: string;
  backendBtn: string;
  openCmd: string;
};

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

function ProjectCard({ project, lang, t }: { project: Project; lang: Lang; t: ProjectsT }) {
  const desc = lang === 'jp' ? project.descriptionJp : project.descriptionEn;
  const award = lang === 'jp' ? project.awardJp : project.award;

  return (
    <div
      className="terminal-card"
      data-hover
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'default',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
      {/* Terminal top bar */}
      <div className="terminal-header">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span style={{ marginLeft: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
          {t.openCmd} {project.id}
        </span>
      </div>

      <div style={{ padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Award badge */}
        {award && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#f9d423' }}>
            <Trophy size={12} />
            {award}
          </div>
        )}

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1rem',
          fontWeight: 700,
          color: 'var(--color-primary)',
          lineHeight: 1.3,
        }}>
          {project.title}
        </h3>

        {/* Date + type */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
          {project.date} · {project.type}
        </div>

        {/* Description */}
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.75,
          flex: 1,
          fontFamily: lang === 'jp' ? 'var(--font-sans)' : undefined,
        }}>
          {desc}
        </p>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tech.map(tech => (
            <span
              key={tech}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                padding: '2px 8px',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                color: 'var(--text-secondary)',
                background: 'rgba(0,255,153,0.04)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
          {project.links.map(link => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              aria-label={`${link.label} – ${project.title}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--color-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '5px',
                padding: '5px 10px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                cursor: 'none',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--color-primary)';
                el.style.boxShadow = '0 0 10px var(--glow-color)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border-color)';
                el.style.boxShadow = 'none';
              }}
            >
              <GithubIcon size={12} />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ lang }: Props) {
  const t = translations[lang].projects;

  return (
    <section
      id="projects"
      style={{ padding: '6rem 5%', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionFadeIn>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', fontSize: '0.8rem', marginBottom: '8px' }}>// 03. projects</p>
            <h2 className="section-title">{t.sectionTitle}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{t.sectionSubtitle}</p>
          </div>
        </SectionFadeIn>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {projects.map((project, i) => (
            <SectionFadeIn key={project.id} style={{ transitionDelay: `${i * 0.07}s` }}>
              <ProjectCard project={project} lang={lang} t={t} />
            </SectionFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
