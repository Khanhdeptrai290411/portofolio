'use client';

import Image from 'next/image';
import { Download, ArrowRight, Mail } from 'lucide-react';
import { GithubIcon, FacebookIcon } from './BrandIcons';
import { personalInfo, socialLinks } from '@/lib/data';
import { translations, type Lang } from '@/lib/i18n';
import TerminalPanel from './TerminalPanel';

interface Props { lang: Lang; }

export default function HeroSection({ lang }: Props) {
  const t = translations[lang].hero;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 5% 60px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '3rem',
          flexWrap: 'wrap',
        }}
      >
        {/* ── LEFT: Text ──────────────────────────────────── */}
        <div style={{ flex: '1 1 340px', minWidth: '280px' }}>
          {/* Role badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,255,153,0.08)',
              border: '1px solid var(--border-color)',
              borderRadius: '999px',
              padding: '4px 14px',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--color-primary)',
              letterSpacing: '0.08em',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--color-primary)',
                boxShadow: '0 0 8px var(--glow-strong)',
                animation: 'pulse-glow 2s ease-in-out infinite',
                flexShrink: 0,
              }}
            />
            {t.role}
          </div>

          {/* Main heading */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '1.2rem',
              color: 'var(--text-primary)',
            }}
          >
            {t.greeting}{' '}
            <span
              className="glitch-text"
              style={{
                color: 'var(--color-primary)',
                textShadow: '0 0 24px var(--glow-color)',
                display: 'block',
              }}
            >
              {t.name}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: 'var(--text-secondary)',
              maxWidth: '480px',
              lineHeight: 1.75,
              marginBottom: '2rem',
              fontFamily: lang === 'jp' ? 'var(--font-sans)' : 'var(--font-mono)',
            }}
          >
            {t.subtitle}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '2rem' }}>
            <a
              href={personalInfo.cvPath}
              download
              className="btn-primary"
              data-hover
              style={{ cursor: 'pointer' }}
            >
              <Download size={15} />
              {t.downloadCV}
            </a>
            <button
              onClick={() => scrollTo('projects')}
              className="btn-outline"
              data-hover
              style={{ cursor: 'pointer' }}
            >
              {t.viewProjects}
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="btn-outline"
              data-hover
              style={{ cursor: 'pointer' }}
            >
              <Mail size={15} />
              {t.contactMe}
            </button>
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <a
              href="https://github.com/Khanhdeptrai290411"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-hover
              style={{
                color: 'var(--text-secondary)',
                transition: 'color 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <GithubIcon size={22} />
            </a>
            <a
              href="https://www.facebook.com/nguyen.inh.quoc.khanh.121003"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              data-hover
              style={{
                color: 'var(--text-secondary)',
                transition: 'color 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <FacebookIcon size={22} />
            </a>
          </div>
        </div>

        {/* ── RIGHT: Avatar + Terminal ─────────────────── */}
        <div
          style={{
            flex: '1 1 320px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          {/* Avatar frame */}
          <div style={{ position: 'relative', width: '220px', height: '220px' }}>
            {/* Outer rotating dashed ring */}
            <div
              className="animate-spin-slow"
              style={{
                position: 'absolute',
                inset: '-16px',
                borderRadius: '50%',
                border: '2px dashed rgba(0,255,153,0.4)',
                zIndex: 0,
              }}
            />
            {/* Inner counter-rotating square */}
            <div
              className="animate-spin-reverse"
              style={{
                position: 'absolute',
                inset: '-8px',
                border: '1px solid rgba(0,255,153,0.2)',
                borderRadius: '4px',
                zIndex: 0,
              }}
            />

            {/* Pixel corner brackets */}
            {[
              { top: -4, left: -4, borderWidth: '2px 0 0 2px' },
              { top: -4, right: -4, borderWidth: '2px 2px 0 0' },
              { bottom: -4, left: -4, borderWidth: '0 0 2px 2px' },
              { bottom: -4, right: -4, borderWidth: '0 2px 2px 0' },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  borderColor: 'var(--color-primary)',
                  borderStyle: 'solid',
                  zIndex: 3,
                  ...s,
                }}
              />
            ))}

            {/* Avatar image */}
            <div
              className="scanline-overlay"
              style={{
                position: 'relative',
                width: '220px',
                height: '220px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '2px solid rgba(0,255,153,0.3)',
                boxShadow: '0 0 32px var(--glow-color), 0 0 64px rgba(0,255,153,0.1)',
                zIndex: 2,
              }}
            >
              <Image
                src="/images/Me.jpg"
                alt="Nguyễn Đình Quốc Khánh – Fullstack Developer"
                fill
                sizes="220px"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
              {/* Green overlay tint */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,255,153,0.05)',
                  mixBlendMode: 'screen',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Profile label */}
            <div
              style={{
                position: 'absolute',
                bottom: '-36px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--color-primary)',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                lineHeight: 1.6,
                opacity: 0.8,
              }}
            >
              <div>{t.profilePath}</div>
              <div style={{ color: 'var(--text-secondary)' }}>
                {t.statusOnline} &nbsp;|&nbsp; {t.roleLabel}
              </div>
            </div>
          </div>

          {/* Terminal panel – below avatar */}
          <div style={{ marginTop: '2rem', width: '100%', maxWidth: '440px' }}>
            <TerminalPanel lang={lang} />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-color)',
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        {[
          { num: '3+', label: lang === 'jp' ? '年経験' : 'Years Experience' },
          { num: '6+', label: lang === 'jp' ? 'プロジェクト' : 'Projects Built' },
          { num: '3', label: lang === 'jp' ? '受賞歴' : 'Awards Won' },
          { num: 'N3', label: lang === 'jp' ? '日本語レベル' : 'Japanese Level' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center', minWidth: '110px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: 'var(--color-primary)',
                textShadow: '0 0 12px var(--glow-color)',
              }}
            >
              {stat.num}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
