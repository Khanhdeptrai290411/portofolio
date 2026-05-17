'use client';

import type { Lang } from '@/lib/i18n';
import HeroSection from '@/components/HeroSection';
import FloatingTechBackground from '@/components/FloatingTechBackground';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import AwardsSection from '@/components/AwardsSection';
import InterestsSection from '@/components/InterestsSection';
import ContactSection from '@/components/ContactSection';
import { useState, useEffect } from 'react';

export default function Home() {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = (localStorage.getItem('lang') as Lang) || 'en';
    setLang(saved);

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'lang') setLang((e.newValue as Lang) || 'en');
    };
    window.addEventListener('storage', onStorage);

    // Also watch for same-tab changes via custom event
    const onLangChange = () => {
      const current = (localStorage.getItem('lang') as Lang) || 'en';
      setLang(current);
    };
    window.addEventListener('langchange', onLangChange);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('langchange', onLangChange);
    };
  }, []);

  return (
    <>
      <section id="home" style={{ position: 'relative', overflow: 'hidden' }}>
        <FloatingTechBackground />
        <HeroSection lang={lang} />
      </section>
      <AboutSection lang={lang} />
      <SkillsSection lang={lang} />
      <ProjectsSection lang={lang} />
      <AwardsSection lang={lang} />
      <InterestsSection lang={lang} />
      <ContactSection lang={lang} />
    </>
  );
}
