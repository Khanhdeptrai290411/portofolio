'use client';

import { techStack } from '@/lib/data';
import { useMemo } from 'react';

// Deterministic pseudo-random positions using index
function seedRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function FloatingTechBackground() {
  const blocks = useMemo(() => {
    return techStack.map((tech, i) => {
      const left  = 2 + seedRandom(i * 7)  * 94; // % across
      const top   = 2 + seedRandom(i * 13) * 90; // % down
      const delay = seedRandom(i * 3)  * 6;       // animation delay
      const dur   = 5 + seedRandom(i * 5) * 6;   // float duration
      const size  = seedRandom(i * 11) > 0.5 ? 'sm' : 'xs';
      return { ...tech, left, top, delay, dur, size };
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {blocks.map((b, i) => (
        <div
          key={b.name}
          title={`${b.name} – ${b.category}`}
          style={{
            position: 'absolute',
            left: `${b.left}%`,
            top: `${b.top}%`,
            animation: `float-slow ${b.dur}s ease-in-out ${b.delay}s infinite`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: b.size === 'sm' ? '0.7rem' : '0.6rem',
              color: 'var(--color-primary)',
              background: 'rgba(0,255,153,0.04)',
              border: '1px solid rgba(0,255,153,0.12)',
              borderRadius: '4px',
              padding: '3px 8px',
              opacity: 0.35,
              whiteSpace: 'nowrap',
              transition: 'opacity 0.3s',
              letterSpacing: '0.05em',
            }}
          >
            {b.name}
          </div>
        </div>
      ))}
    </div>
  );
}
