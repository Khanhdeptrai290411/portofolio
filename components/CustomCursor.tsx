'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let ringX = -100, ringY = -100;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const animateRing = () => {
      ringX += (pos.x - ringX) * 0.12;
      ringY += (pos.y - ringY) * 0.12;
      setRing({ x: ringX, y: ringY });
      animId = requestAnimationFrame(animateRing);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [data-hover]')) setHovering(true);
    };
    const onLeave = () => setHovering(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    animId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(animId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos.x, pos.y]);

  return (
    <>
      <div
        className="custom-cursor-dot"
        style={{ left: pos.x, top: pos.y }}
        aria-hidden="true"
      />
      <div
        className={`custom-cursor-ring ${hovering ? 'hovering' : ''}`}
        style={{ left: ring.x, top: ring.y }}
        aria-hidden="true"
      />
    </>
  );
}
