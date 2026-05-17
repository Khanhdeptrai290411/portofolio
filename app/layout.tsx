'use client';

import './globals.css';
import { useState, useEffect } from 'react';
import type { Lang } from '@/lib/i18n';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [lang, setLang] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    const savedLang = (localStorage.getItem('lang') as Lang) || 'en';
    setTheme(savedTheme);
    setLang(savedLang);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
  };

  const toggleLang = () => {
    const next = lang === 'en' ? 'jp' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
  };

  if (!mounted) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>Kay – Portfolio</title>
          <meta name="description" content="Fullstack Developer Portfolio" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className="dark" style={{ background: '#080d0b' }} />
      </html>
    );
  }

  return (
    <html lang={lang === 'jp' ? 'ja' : 'en'} suppressHydrationWarning>
      <head>
        <title>Kay – Fullstack Developer Portfolio</title>
        <meta name="description" content="Portfolio of Nguyễn Đình Quốc Khánh (Kay) – Fullstack Developer, Web Developer Intern skilled in React, Next.js, Node.js, Flutter and AI technologies." />
        <meta name="keywords" content="Kay, Nguyễn Đình Quốc Khánh, fullstack developer, web developer, portfolio, React, Next.js, Flutter" />
        <meta name="author" content="Nguyễn Đình Quốc Khánh" />
        <meta property="og:title" content="Kay – Fullstack Developer Portfolio" />
        <meta property="og:description" content="Building accessible, scalable and meaningful digital products." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={theme === 'light' ? 'light' : ''}>
        <ScrollProgressBar />
        <Navbar theme={theme} lang={lang} onToggleTheme={toggleTheme} onToggleLang={toggleLang} />
        <main>{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
