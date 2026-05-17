'use client';

import type { Lang } from '@/lib/i18n';

interface Props {
  lang: Lang;
  onToggle: () => void;
}

export default function LanguageToggle({ lang, onToggle }: Props) {
  const handleClick = () => {
    onToggle();
    // Dispatch custom event so page.tsx can react same-tab
    window.dispatchEvent(new Event('langchange'));
  };

  return (
    <button
      onClick={handleClick}
      aria-label={lang === 'en' ? 'Switch to Japanese' : '英語に切り替える'}
      data-hover
      style={{
        background: 'transparent',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '5px 12px',
        cursor: 'none',
        color: 'var(--color-primary)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        fontWeight: 600,
        letterSpacing: '0.05em',
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px var(--glow-color)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {lang === 'en' ? 'JP' : 'EN'}
    </button>
  );
}
