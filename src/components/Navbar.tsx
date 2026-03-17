import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EXP', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'WINS', href: '#achievements' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' }
    );
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 py-4"
      style={{
        background: 'rgba(6,6,8,0.85)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(0,255,157,0.15)',
      }}
    >
      {/* Logo */}
      <div
        className="font-pixel"
        style={{
          fontSize: 'clamp(8px, 1.5vw, 12px)',
          color: '#00ff9d',
          textShadow: '0 0 10px #00ff9d, 0 0 20px rgba(0,255,157,0.4)',
          letterSpacing: '0.15em',
        }}
      >
        H<span style={{ color: '#00cc7a' }}>&gt;</span>
      </div>

      {/* Nav links */}
      <ul className="flex items-center gap-4 md:gap-6 list-none">
        {navItems.map(item => (
          <li key={item.label}>
            <a
              href={item.href}
              onClick={e => handleClick(e, item.href)}
              className="font-pixel no-underline transition-all"
              style={{
                fontSize: 'clamp(6px, 1vw, 9px)',
                color: 'rgba(0,255,157,0.6)',
                textDecoration: 'none',
                letterSpacing: '0.15em',
                transition: 'color 0.2s, text-shadow 0.2s',
              }}
              onMouseEnter={e => {
                (e.target as HTMLAnchorElement).style.color = '#00ff9d';
                (e.target as HTMLAnchorElement).style.textShadow = '0 0 10px #00ff9d';
              }}
              onMouseLeave={e => {
                (e.target as HTMLAnchorElement).style.color = 'rgba(0,255,157,0.6)';
                (e.target as HTMLAnchorElement).style.textShadow = 'none';
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Status indicator */}
      <div className="hidden md:flex items-center gap-2">
        <div
          className="rounded-full"
          style={{
            width: 8, height: 8,
            background: '#00ff9d',
            boxShadow: '0 0 6px #00ff9d',
            animation: 'blink 2s step-end infinite',
          }}
        />
        <span className="font-pixel" style={{ fontSize: '7px', color: 'rgba(0,255,157,0.5)', letterSpacing: '0.1em' }}>
          ONLINE
        </span>
      </div>
    </nav>
  );
}
