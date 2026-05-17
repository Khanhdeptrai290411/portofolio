'use client';

import { useEffect, useState, useRef } from 'react';
import { terminalLines } from '@/lib/data';
import type { Lang } from '@/lib/i18n';

interface Props { lang: Lang; }

export default function TerminalPanel({ lang }: Props) {
  const [lines, setLines] = useState<{ cmd: string; out: string; done: boolean }[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [typedCmd, setTypedCmd] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLine >= terminalLines.length) return;

    const line = terminalLines[currentLine];
    let charIdx = 0;
    setTypedCmd('');
    setShowOutput(false);

    const typeTimer = setInterval(() => {
      charIdx++;
      setTypedCmd(line.command.slice(0, charIdx));
      if (charIdx >= line.command.length) {
        clearInterval(typeTimer);
        setTimeout(() => {
          setShowOutput(true);
          setTimeout(() => {
            setLines(prev => [...prev, { cmd: line.command, out: line.output, done: true }]);
            setCurrentLine(c => c + 1);
          }, 400);
        }, 300);
      }
    }, 55);

    return () => clearInterval(typeTimer);
  }, [currentLine]);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
  }, [lines, typedCmd, showOutput]);

  return (
    <div
      className="terminal-card"
      style={{ width: '100%', maxWidth: '440px' }}
      role="log"
      aria-label="Terminal panel"
      aria-live="polite"
    >
      {/* Header */}
      <div className="terminal-header">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span style={{
          marginLeft: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--text-secondary)',
        }}>
          bash – kay@portfolio
        </span>
      </div>

      {/* Body */}
      <div
        ref={ref}
        style={{
          padding: '16px',
          minHeight: '200px',
          maxHeight: '260px',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
        }}
      >
        {/* Completed lines */}
        {lines.map((l, i) => (
          <div key={i} style={{ marginBottom: '8px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--color-primary)' }}>kay@portfolio</span>
              <span style={{ color: 'var(--text-secondary)' }}>:~$ </span>
              <span style={{ color: 'var(--text-primary)' }}>{l.cmd}</span>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--color-accent)',
              paddingLeft: '12px',
              marginTop: '2px',
            }}>
              {l.out}
            </div>
          </div>
        ))}

        {/* Currently typing */}
        {currentLine < terminalLines.length && (
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--color-primary)' }}>kay@portfolio</span>
              <span style={{ color: 'var(--text-secondary)' }}>:~$ </span>
              <span style={{ color: 'var(--text-primary)' }}>{typedCmd}</span>
              <span
                className="cursor-blink"
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '14px',
                  background: 'var(--color-primary)',
                  verticalAlign: 'middle',
                  marginLeft: '2px',
                }}
              />
            </div>
            {showOutput && (
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--color-accent)',
                paddingLeft: '12px',
                marginTop: '2px',
              }}>
                {terminalLines[currentLine].output}
              </div>
            )}
          </div>
        )}

        {/* Done – idle cursor */}
        {currentLine >= terminalLines.length && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--color-primary)' }}>kay@portfolio</span>
            <span style={{ color: 'var(--text-secondary)' }}>:~$ </span>
            <span
              className="cursor-blink"
              style={{
                display: 'inline-block',
                width: '8px',
                height: '14px',
                background: 'var(--color-primary)',
                verticalAlign: 'middle',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
