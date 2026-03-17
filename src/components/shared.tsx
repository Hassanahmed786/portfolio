import { ReactNode } from 'react';

export function CRTOverlay() {
  return <div className="crt-overlay" />;
}

interface GlowTextProps {
  children: ReactNode;
  color?: 'phosphor' | 'amber';
  className?: string;
}

export function GlowText({ children, color = 'phosphor', className = '' }: GlowTextProps) {
  const glowStyle =
    color === 'phosphor'
      ? 'drop-shadow(0 0 10px #00ff9d) drop-shadow(0 0 20px #00ff9d40)'
      : 'drop-shadow(0 0 10px #ffb800) drop-shadow(0 0 20px #ffb80040)';

  return (
    <span
      className={className}
      style={{
        filter: glowStyle,
        color: color === 'phosphor' ? '#00ff9d' : '#ffb800',
      }}
    >
      {children}
    </span>
  );
}

interface NavBarProps {
  sections: string[];
  activeSection: number;
  onSectionClick: (index: number) => void;
}

export function NavBar({ sections, activeSection, onSectionClick }: NavBarProps) {
  return (
    <>
      {/* Top-left logo */}
      <div
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          fontSize: '10px',
          fontFamily: 'var(--font-pixel)',
          color: '#00ff9d',
          textShadow: '0 0 10px #00ff9d',
          zIndex: 1000,
          pointerEvents: 'none',
        }}
      >
        HASSAN.OS v1.0
      </div>

      {/* Right-side section dots */}
      <nav
        style={{
          position: 'fixed',
          right: 30,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {sections.map((section, i) => (
          <button
            key={i}
            onClick={() => onSectionClick(i)}
            title={section}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              border: '2px solid',
              background: activeSection === i ? '#00ff9d' : 'transparent',
              borderColor: activeSection === i ? '#00ff9d' : '#00ff9d88',
              cursor: 'pointer',
              boxShadow: activeSection === i ? '0 0 10px #00ff9d' : 'none',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </nav>
    </>
  );
}

export function TerminalBox({
  title,
  children,
  className = '',
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        border: '2px solid #00ff9d',
        borderRadius: '4px',
        padding: '20px',
        background: 'rgba(6, 6, 8, 0.8)',
        color: '#e8ffe8',
        fontFamily: 'var(--font-mono)',
        boxShadow: '0 0 20px #00ff9d40',
      }}
    >
      {title && (
        <div
          style={{
            marginBottom: '15px',
            paddingBottom: '10px',
            borderBottom: '1px solid #00ff9d',
            color: '#00ff9d',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

export function StatBar({
  label,
  value,
  max = 100,
}: {
  label: string;
  value: number;
  max?: number;
}) {
  const percentage = (value / max) * 100;
  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ color: '#00ff9d', fontSize: '12px', fontWeight: 'bold' }}>{label}</span>
        <span style={{ color: '#ffb800', fontSize: '12px' }}>{value}%</span>
      </div>
      <div
        style={{
          width: '100%',
          height: '12px',
          border: '1px solid #00ff9d',
          borderRadius: '2px',
          overflow: 'hidden',
          background: 'rgba(0, 255, 157, 0.1)',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: `linear-gradient(90deg, #00ff9d, #ffb800)`,
            boxShadow: '0 0 10px #00ff9d',
            transition: 'width 0.6s ease-out',
          }}
        />
      </div>
    </div>
  );
}
