'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { navItems } from '@/lib/data';
import { translations, type Lang } from '@/lib/i18n';

interface Props {
  theme: 'dark' | 'light';
  lang: Lang;
  onToggleTheme: () => void;
  onToggleLang: () => void;
}

export default function Navbar({ theme, lang, onToggleTheme, onToggleLang }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const t = translations[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = navItems.map(n => n.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLabel = (item: typeof navItems[0]) =>
    lang === 'en' ? item.labelEn : item.labelJp;

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 5%',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: scrolled
            ? 'rgba(8,13,11,0.92)'
            : 'rgba(8,13,11,0.6)',
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Brand */}
        <button
          onClick={() => scrollTo('home')}
          data-hover
          aria-label="Kay – Go to top"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '1.3rem',
            fontWeight: 700,
            color: 'var(--color-primary)',
            letterSpacing: '0.05em',
            textShadow: '0 0 12px var(--glow-color)',
          }}
        >
          Kay<span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>~$</span>
        </button>

        {/* Desktop nav links */}
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '2rem',
            margin: 0,
            padding: 0,
          }}
          className="hidden md:flex"
        >
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                data-hover
                aria-label={`Go to ${item.labelEn}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: activeSection === item.id ? 700 : 400,
                  color: activeSection === item.id ? 'var(--color-primary)' : 'var(--text-secondary)',
                  textShadow: activeSection === item.id ? '0 0 8px var(--glow-color)' : 'none',
                  transition: 'color 0.2s, text-shadow 0.2s',
                  padding: '4px 0',
                  borderBottom: activeSection === item.id ? '1px solid var(--color-primary)' : '1px solid transparent',
                }}
              >
                {navLabel(item)}
              </button>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <LanguageToggle lang={lang} onToggle={onToggleLang} />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          {/* Hamburger – mobile only */}
          <button
            className="flex md:hidden"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            data-hover
            style={{
              background: 'none',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '6px 8px',
              cursor: 'none',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            zIndex: 999,
            background: 'rgba(8,13,11,0.97)',
            borderBottom: '1px solid var(--border-color)',
            backdropFilter: 'blur(20px)',
            padding: '1rem 0',
          }}
        >
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              data-hover
              style={{
                display: 'block',
                width: '100%',
                padding: '14px 5%',
                background: 'none',
                border: 'none',
                cursor: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                color: activeSection === item.id ? 'var(--color-primary)' : 'var(--text-secondary)',
                textAlign: 'left',
                borderLeft: activeSection === item.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                transition: 'all 0.2s',
                animationDelay: `${i * 0.05}s`,
              }}
            >
              <span style={{ color: 'var(--color-primary)', marginRight: '8px', opacity: 0.6 }}>~/</span>
              {navLabel(item)}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
