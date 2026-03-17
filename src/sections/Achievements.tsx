import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  { rank: '1st', event: 'MONAD BLITZ HYDERABAD', points: '+500 XP', year: 2024 },
  { rank: '1st', event: 'WEB3 HACKATHON CHAMPIONSHIP', points: '+450 XP', year: 2024 },
  { rank: '1st', event: 'NATIONAL HACKATHON WINNER', points: '+420 XP', year: 2023 },
  { rank: '2nd', event: 'MRECW WEB DEVELOPMENT', points: '+350 XP', year: 2023 },
  { rank: 'TOP 5', event: 'GDG AGENT HACKATHON', points: '+300 XP', year: 2025 },
  { rank: 'WINNER', event: 'MONAD DEVELOPER RELAY', points: '+380 XP', year: 2024 },
  { rank: 'FINALIST', event: 'INDIA CODE CHAMPIONSHIP', points: '+320 XP', year: 2023 },
  { rank: 'CERTIFIED', event: 'ORACLE CLOUD GENAI', points: '+250 XP', year: 2024 },
  { rank: 'CERTIFIED', event: 'MICROSOFT AMBASSADOR', points: '+400 XP', year: 2024 },
];

const certifications = [
  { name: 'Oracle Data Science', issuer: 'Oracle', date: '2024', icon: '🔵' },
  { name: 'Oracle Cloud GenAI', issuer: 'Oracle', date: '2024', icon: '🔵' },
  { name: 'Google Analytics 4', issuer: 'Google', date: '2024', icon: '🔴' },
  { name: 'Meta Front-End Pro', issuer: 'Meta', date: '2024', icon: '🔵' },
  { name: 'Cisco Networking', issuer: 'Cisco', date: '2023', icon: '🟡' },
  { name: 'McKinsey Forward 2025', issuer: 'McKinsey', date: '2025', icon: '🟢' },
];

export function AchievementsSection() {
  const rowsRef = useRef<HTMLDivElement[]>([]);
  const certRefs = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    rowsRef.current.forEach((row, i) => {
      gsap.fromTo(
        row,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: i * 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            once: true,
          },
        }
      );
    });

    certRefs.current.forEach((cert, i) => {
      gsap.fromTo(
        cert,
        { opacity: 0, scale: 0.8, rotateZ: -5 },
        {
          opacity: 1,
          scale: 1,
          rotateZ: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: 'back.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="achievements"
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
        .ach-heading {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(1rem, 4vw, 1.5rem);
          color: #ffb800;
          letter-spacing: 0.2em;
          margin-bottom: 3rem;
          text-align: center;
          text-shadow: 0 0 10px #ffb800;
          z-index: 20;
          position: relative;
        }

        .ach-heading::before {
          content: '[ ';
          color: #00ff9d;
        }

        .ach-heading::after {
          content: ' ]';
          color: #00ff9d;
        }

        .highscore-table {
          max-width: 800px;
          width: 100%;
          background: linear-gradient(135deg, #0d120d 0%, #070b07 100%);
          border: 2px solid #00ff9d;
          border-top-width: 4px;
          box-shadow: 0 0 30px #00ff9d20, inset 0 0 20px rgba(0,0,0,0.5);
          margin-bottom: 4rem;
          border-radius: 0.25rem;
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 80px 1fr 120px 80px;
          gap: 1.5rem;
          padding: 1.5rem;
          background: linear-gradient(90deg, #00ff9d10, transparent);
          border-bottom: 2px solid #00ff9d;
          font-family: 'Press Start 2P', monospace;
          font-size: 0.65rem;
          color: #ffb800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: bold;
        }

        .table-row {
          display: grid;
          grid-template-columns: 80px 1fr 120px 80px;
          gap: 1.5rem;
          padding: 1.2rem 1.5rem;
          border-bottom: 1px solid #00ff9d15;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          color: #e8ffe8;
          align-items: center;
          transition: all 0.3s ease;
        }

        .table-row:hover {
          background: linear-gradient(90deg, #00ff9d08, transparent);
          padding-left: 2rem;
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .rank-cell {
          color: #ffb800;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .event-cell {
          color: #e8ffe8;
          line-height: 1.3;
        }

        .points-cell {
          color: #00ff9d;
          font-weight: bold;
          text-align: right;
        }

        .year-cell {
          color: #ffb80088;
          font-size: 0.7rem;
          text-align: right;
        }

        .certifications-heading {
          font-family: 'Press Start 2P', monospace;
          font-size: 1.1rem;
          color: #ffb800;
          letter-spacing: 0.1em;
          margin-bottom: 2.5rem;
          text-align: center;
          text-shadow: 0 0 10px #ffb800;
        }

        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
          width: 100%;
          margin-bottom: 3rem;
        }

        .cert-card {
          background: linear-gradient(135deg, #0d120d 0%, #0a0f0a 100%);
          border: 2px solid;
          border-radius: 0.35rem;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        }

        .cert-card:hover {
          transform: translateY(-8px) rotateZ(2deg);
          box-shadow: 0 20px 50px rgba(0,0,0,0.8);
        }

        .cert-icon {
          font-size: 2rem;
          text-align: center;
        }

        .cert-name {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.75rem;
          color: #00ff9d;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-shadow: 0 0 10px #00ff9d;
          line-height: 1.2;
        }

        .cert-issuer {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          color: #ffb80088;
          text-transform: uppercase;
        }

        .cert-date {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          color: #88ff8888;
          border-top: 1px solid #00ff9d15;
          padding-top: 0.8rem;
        }

        .player-name {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(1.2rem, 3vw, 2rem);
          color: #ffb800;
          letter-spacing: 0.2em;
          text-shadow: 0 0 30px #ffb800;
          animation: nameFlash 1s ease-in-out infinite;
        }

        @keyframes nameFlash {
          0%, 100% { text-shadow: 0 0 30px #ffb800; }
          50% { text-shadow: 0 0 60px #ffb800, 0 0 100px #ffb80050; }
        }

        @media (max-width: 768px) {
          .table-header,
          .table-row {
            grid-template-columns: 60px 1fr 80px;
            gap: 1rem;
          }

          .year-cell {
            display: none;
          }

          .cert-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <h2 className="ach-heading">HIGH SCORES</h2>

      <div className="highscore-table">
        <div className="table-header">
          <div>RANK</div>
          <div>EVENT</div>
          <div>POINTS</div>
          <div>YEAR</div>
        </div>

        {achievements.map((achievement, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) rowsRef.current[i] = el;
            }}
            className="table-row"
          >
            <div className="rank-cell">{achievement.rank}</div>
            <div className="event-cell">{achievement.event}</div>
            <div className="points-cell">{achievement.points}</div>
            <div className="year-cell">{achievement.year}</div>
          </div>
        ))}
      </div>

      <h3 className="certifications-heading">CERTIFICATIONS</h3>

      <div className="cert-grid">
        {certifications.map((cert, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) certRefs.current[i] = el;
            }}
            className="cert-card"
            style={{
              borderColor: cert.icon === '🔵' ? '#00b4ff' : cert.icon === '🔴' ? '#ff4444' : cert.icon === '🟡' ? '#ffb800' : '#00ff9d',
            }}
          >
            <div className="cert-icon">{cert.icon}</div>
            <div className="cert-name">{cert.name}</div>
            <div className="cert-issuer">{cert.issuer}</div>
            <div className="cert-date">Licensed {cert.date}</div>
          </div>
        ))}
      </div>

      <div className="player-name">LEVEL UP!</div>
    </section>
  );
}
