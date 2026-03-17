import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const missions = [
  {
    id: 1,
    badge: 'MISSION 001',
    org: 'MICROSOFT LEARN STUDENT AMBASSADOR',
    period: 'Aug 2024 – Present',
    highlights: [
      '10+ technical workshops on Azure, GitHub, Python, AI/ML',
      '500+ students reached · 30% boost in cloud adoption',
      'Organized hackathons · mentored full-stack teams',
    ],
    stack: ['AZURE', 'GITHUB', 'PYTHON', 'AI/ML'],
  },
  {
    id: 2,
    badge: 'MISSION 002',
    org: 'FULL STACK DEVELOPER INTERN — AICTE EDUNET',
    period: '2024',
    highlights: [
      'Built scalable MERN stack applications with REST APIs',
      'Integrated AI/ML models for real-time analytics',
      '20% improvement in performance and UX',
    ],
    stack: ['MERN', 'FLASK', 'REST API', 'AI/ML'],
  },
  {
    id: 3,
    badge: 'MISSION 003',
    org: 'CO-FOUNDER — ILEARN COMMUNITY & TECHNOSPHERE',
    period: 'Mar 2025 – Present',
    highlights: [
      'Scaled to 500+ member developer community',
      'Workshops on AI/ML, Web3, full-stack development',
      'Award-winning hackathon submissions',
    ],
    stack: ['AI/ML', 'WEB3', 'COMMUNITY', 'HACKATHONS'],
  },
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const cycleThroughCards = () => {
      let current = 0;
      const cycleCards = () => {
        cardsRef.current.forEach((card, i) => {
          const offset = (i - current + missions.length) % missions.length;
          const positions = [
            { x: '-35vw', y: '0', rotY: 15, scale: 0.9, z: -50 },
            { x: '0', y: '0', rotY: 0, scale: 1, z: 0 },
            { x: '35vw', y: '0', rotY: -15, scale: 0.9, z: -50 },
          ];
          const pos = positions[offset] || positions[0];

          gsap.to(card, {
            x: pos.x,
            rotationY: pos.rotY,
            scale: pos.scale,
            z: pos.z,
            opacity: offset === 1 ? 1 : 0.5,
            duration: 0.6,
            ease: 'power3.inOut',
          });
        });

        setActiveCard(current);
        current = (current + 1) % missions.length;
      };

      cycleCards();
      const interval = setInterval(cycleCards, 4000);
      return () => clearInterval(interval);
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionElement,
      onEnter: cycleThroughCards,
      once: false,
    });

    return () => scrollTrigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 40px',
        zIndex: 10,
        position: 'relative',
      }}
    >
      <style>{`
        .exp-heading {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(1rem, 4vw, 1.5rem);
          color: #ffb800;
          letter-spacing: 0.2em;
          margin-bottom: 4rem;
          text-align: center;
          text-shadow: 0 0 10px #ffb800;
        }

        .exp-heading::before {
          content: '[ ';
          color: #00ff9d;
        }

        .exp-heading::after {
          content: ' ]';
          color: #00ff9d;
        }

        .exp-carousel {
          perspective: 1000px;
          width: 100%;
          max-width: 1200px;
          height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .exp-card {
          position: absolute;
          width: 400px;
          background: linear-gradient(135deg, #0d120d 0%, #070b07 100%);
          border: 1px solid #00ff9d25;
          border-top: 3px solid #00ff9d;
          box-shadow: 0 20px 60px #00000080, 0 0 30px #00ff9d10;
          padding: 2.5rem;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          transform-style: preserve-3d;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          opacity: 0.5;
        }

        .exp-card:hover {
          box-shadow: 0 30px 80px #00000090, 0 0 50px #00ff9d25;
          border-color: #00ff9d50;
        }

        .exp-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, #00ff9d10, transparent);
          transform: translateX(-100%);
          animation: shimmer 0.6s forwards;
        }

        @keyframes shimmer {
          to { transform: translateX(100%); }
        }

        .exp-badge {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.5rem;
          color: #ffb800;
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }

        .exp-org {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.75rem;
          color: #00ff9d;
          margin-bottom: 0.5rem;
          letter-spacing: 0.1em;
          line-height: 1.2;
        }

        .exp-period {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          color: #ffb80099;
          margin-bottom: 1.5rem;
        }

        .exp-highlights {
          flex: 1;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          color: #e8ffe8;
          line-height: 1.6;
        }

        .exp-highlight {
          margin-bottom: 0.7rem;
          display: flex;
          gap: 0.5rem;
        }

        .exp-highlight::before {
          content: '▸';
          color: #00ff9d;
          flex-shrink: 0;
        }

        .exp-stack {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #00ff9d15;
        }

        .exp-tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.5rem;
          color: #00ff9d;
          border: 1px solid #00ff9d30;
          padding: 3px 8px;
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .exp-card {
            width: 300px;
            padding: 1.5rem;
          }
        }
      `}</style>

      <h2 className="exp-heading">EXPERIENCE</h2>

      <div className="exp-carousel">
        {missions.map((mission, i) => (
          <div
            key={mission.id}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="exp-card"
            onClick={() => {
              const offset = (i - activeCard + missions.length) % missions.length;
              if (offset !== 1) {
                setActiveCard((prev) => (prev + offset) % missions.length);
              }
            }}
          >
            <div className="exp-badge">{mission.badge}</div>
            <div className="exp-org">{mission.org}</div>
            <div className="exp-period">{mission.period}</div>

            <div className="exp-highlights">
              {mission.highlights.map((highlight, j) => (
                <div key={j} className="exp-highlight">
                  {highlight}
                </div>
              ))}
            </div>

            <div className="exp-stack">
              {mission.stack.map((tech, j) => (
                <div key={j} className="exp-tag">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
