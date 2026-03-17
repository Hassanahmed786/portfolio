import { useRef, useEffect, useState } from 'react';
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
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );

    const observerOptions = {
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href);
    }
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,20,20,0.9) 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '2px solid #00ff9d25',
        boxShadow: '0 10px 40px rgba(0,255,157,0.1)',
      }}
    >
      <style>{`
        @keyframes blink {
          0%, 49%, 100% { opacity: 1; }
          50%, 99% { opacity: 0.3; }
        }

        @keyframes glow-pulse {
          0%, 100% { text-shadow: 0 0 10px #00ff9d; }
          50% { text-shadow: 0 0 20px #00ff9d, 0 0 40px #00ff9d40; }
        }

        .nav-logo {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(0.6rem, 1.5vw, 0.9rem);
          color: #00ff9d;
          text-shadow: 0 0 10px #00ff9d;
          letter-spacing: 0.15em;
          animation: glow-pulse 2s ease-in-out infinite;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(0.5rem, 0.9vw, 0.7rem);
          color: rgba(0,255,157,0.4);
          text-decoration: none;
          letter-spacing: 0.1em;
          cursor: pointer;
          text-transform: uppercase;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          padding: 0.5rem 0;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00ff9d, #ffb800);
          transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-link:hover {
          color: #00ff9d;
          text-shadow: 0 0 10px #00ff9d;
        }

        .nav-link:hover::before {
          width: 100%;
        }

        .nav-link.active {
          color: #ffb800;
          text-shadow: 0 0 15px #ffb800;
        }

        .nav-link.active::before {
          width: 100%;
          background: #ffb800;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00ff9d;
          box-shadow: 0 0 10px #00ff9d;
          animation: blink 2s step-end infinite;
        }

        .status-text {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.5rem;
          color: rgba(0,255,157,0.5);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .nav-links {
            gap: 0.8rem;
          }

          .status-indicator {
            display: none;
          }
        }
      `}</style>

      {/* Logo */}
      <div className="nav-logo">
        H<span style={{ color: '#00cc7a' }}>&gt;</span>
      </div>

      {/* Nav Links */}
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`nav-link ${activeSection === item.href ? 'active' : ''}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Status Indicator */}
      <div className="status-indicator">
        <div className="status-dot"></div>
        <span className="status-text">ONLINE</span>
      </div>
    </nav>
  );
}
