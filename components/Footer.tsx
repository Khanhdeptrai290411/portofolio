'use client';

import { Heart } from 'lucide-react';
import { GithubIcon, FacebookIcon } from './BrandIcons';
import { translations, type Lang } from '@/lib/i18n';
import { navItems } from '@/lib/data';

interface Props { lang: Lang; }

export default function Footer({ lang }: Props) {
  const t = translations[lang].footer;
  const tNav = translations[lang].nav;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-color)',
        padding: '3rem 5% 2rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', marginBottom: '2rem' }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.4rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
              textShadow: '0 0 12px var(--glow-color)',
              marginBottom: '8px',
            }}>
              Kay<span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>~$</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)', maxWidth: '240px', lineHeight: 1.7 }}>
              {lang === 'jp'
                ? 'Web・モバイル・AI技術でデジタルプロダクトを構築しています。'
                : 'Building meaningful digital products with web, mobile and AI.'}
            </p>
          </div>

          {/* Nav links */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-primary)', marginBottom: '12px', letterSpacing: '0.08em' }}>
              {lang === 'jp' ? 'ナビゲーション' : 'NAVIGATION'}
            </div>
            <nav aria-label="Footer navigation">
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {navItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      data-hover
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'none',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        color: 'var(--text-secondary)',
                        transition: 'color 0.2s',
                        padding: 0,
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                    >
                      <span style={{ color: 'var(--color-primary)', marginRight: '6px', opacity: 0.6 }}>~/</span>
                      {lang === 'en' ? item.labelEn : item.labelJp}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-primary)', marginBottom: '12px', letterSpacing: '0.08em' }}>
              {lang === 'jp' ? 'ソーシャル' : 'SOCIAL'}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { href: 'https://github.com/Khanhdeptrai290411', icon: <GithubIcon size={18} />, label: 'GitHub' },
                { href: 'https://www.facebook.com/nguyen.inh.quoc.khanh.121003', icon: <FacebookIcon size={18} />, label: 'Facebook' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-hover
                  style={{
                    color: 'var(--text-secondary)',
                    padding: '8px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.2s',
                    cursor: 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = 'var(--color-primary)';
                    el.style.borderColor = 'var(--color-primary)';
                    el.style.boxShadow = '0 0 12px var(--glow-color)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = 'var(--text-secondary)';
                    el.style.borderColor = 'var(--border-color)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            © {new Date().getFullYear()} Nguyễn Đình Quốc Khánh. {t.rights}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {t.builtWith}
            <Heart size={12} style={{ color: 'var(--color-primary)' }} fill="currentColor" />
          </p>
        </div>
      </div>
    </footer>
  );
}
