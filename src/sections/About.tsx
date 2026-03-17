import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [bioText, setBioText] = useState('');

  useEffect(() => {
    const fullText = `Full Stack Developer & AI/ML Engineer from Hyderabad.

I build things at the intersection of Web3, generative AI, 
and pixel-perfect interfaces.

7x Hackathon winner. IIT Ropar AI Minor student.
Microsoft Learn Student Ambassador.
Co-Founder of ILearn Community — 500+ developers.`;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      onEnter: () => {
        let idx = 0;
        const typeChar = () => {
          if (idx < fullText.length) {
            setBioText(fullText.substring(0, idx + 1));
            idx++;
            setTimeout(typeChar, 20);
          }
        };
        typeChar();
      },
      once: true,
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const bars = document.querySelectorAll('.about-stat-fill');
    bars.forEach((bar, i) => {
      const targetWidth = bar.getAttribute('data-width') || '0';
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: targetWidth,
          duration: 1,
          ease: 'power2.out',
          delay: i * 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
        }
      );
    });

    const eduCards = document.querySelectorAll('.about-edu-card');
    eduCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          delay: i * 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
        }
      );
    });
  }, []);

  const statBars = [
    { label: 'FRONTEND', value: 85 },
    { label: 'BACKEND', value: 90 },
    { label: 'AI/ML', value: 82 },
    { label: 'BLOCKCHAIN', value: 78 },
    { label: 'HACKATHONS', value: 100 },
  ];

  const educations = [
    {
      school: 'Anurag University',
      program: 'B.Tech Computer Science Engineering',
      gpa: '8.4',
      period: '2023–2027',
    },
    {
      school: 'IIT Ropar',
      program: 'Minor in Artificial Intelligence',
      gpa: '8.0',
      period: '2024–2026',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        minHeight: '100vh',
        padding: '100px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <style>{`
        .about-player-card {
          border: 1px solid #00ff9d40;
          background: linear-gradient(135deg, #0a0f0a 0%, #050a05 100%);
          box-shadow: 0 0 30px #00ff9d20, inset 0 0 30px #00ff9d08;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .about-player-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00ff9d40, transparent);
          animation: scanSweep 3s ease-in-out infinite;
        }

        @keyframes scanSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        .about-card-header {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.8rem;
          color: #00ff9d;
          letter-spacing: 0.2em;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .about-card-header::after {
          content: '_';
          display: inline-block;
          margin-left: 4px;
          animation: blinkText 0.6s infinite;
        }

        @keyframes blinkText {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .about-pixel-avatar {
          width: 80px;
          height: 80px;
          display: grid;
          grid-template-columns: repeat(16, 1fr);
          grid-template-rows: repeat(16, 1fr);
          gap: 1px;
          margin: 0 auto 1.5rem;
          background: #000;
          padding: 2px;
          border: 1px solid #00ff9d;
        }

        .about-pixel {
          border-radius: 1px;
        }

        .about-pixel.lit {
          background: #00ff9d;
          box-shadow: 0 0 4px #00ff9d;
        }

        .about-pixel.empty {
          background: transparent;
        }

        .about-stats-table {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          color: #e8ffe8;
          line-height: 2;
          margin-bottom: 1.5rem;
        }

        .about-stat-row {
          display: flex;
          justify-content: space-between;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #00ff9d15;
        }

        .about-stat-label {
          color: #00ff9d;
          font-weight: bold;
          min-width: 100px;
        }

        .about-stat-value {
          color: #ffb800;
        }

        .about-status {
          color: #00ff00;
        }

        .about-rpg-bars {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .about-bar-group {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .about-bar-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          color: #ffb800;
          min-width: 70px;
          letter-spacing: 0.1em;
        }

        .about-bar-track {
          flex: 1;
          height: 6px;
          background: #ffffff15;
          border: 1px solid #00ff9d20;
          position: relative;
          overflow: hidden;
        }

        .about-stat-fill {
          height: 100%;
          background: #00ff9d;
          box-shadow: 0 0 8px #00ff9d, inset 0 0 4px #00ff9d;
          width: 0%;
        }

        .about-bar-percent {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          color: #00ff9d;
          min-width: 35px;
          text-align: right;
        }

        .about-right-column {
          padding-left: 3rem;
        }

        .about-section-heading {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(0.8rem, 2vw, 1rem);
          color: #ffb800;
          letter-spacing: 0.2em;
          margin-bottom: 2rem;
          text-shadow: 0 0 10px #ffb800;
        }

        .about-section-heading::before {
          content: '> ';
          color: #00ff9d;
        }

        .about-bio-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          color: #e8ffe8;
          line-height: 1.8;
          white-space: pre-wrap;
          margin-bottom: 2.5rem;
          min-height: 150px;
        }

        .about-edu-card {
          border: 1px solid #00ff9d25;
          border-left: 4px solid;
          background: linear-gradient(135deg, rgba(0, 255, 157, 0.02), rgba(0, 255, 157, 0.01));
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 0 15px rgba(0, 255, 157, 0.1);
        }

        .about-edu-card:nth-child(1) {
          border-left-color: #00ff9d;
        }

        .about-edu-card:nth-child(2) {
          border-left-color: #ffb800;
        }

        .about-edu-school {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.7rem;
          color: #00ff9d;
          margin-bottom: 0.5rem;
          letter-spacing: 0.1em;
        }

        .about-edu-program {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          color: #e8ffe8;
          margin-bottom: 0.5rem;
        }

        .about-edu-meta {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          color: #00ff9d80;
          display: flex;
          justify-content: space-between;
        }

        .about-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          max-width: 1200px;
          width: 100%;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .about-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .about-right-column {
            padding-left: 0;
          }
        }
      `}</style>

      <div className="about-container">
        {/* LEFT: Player Card */}
        <div className="about-player-card">
          <div className="about-card-header">OPERATOR PROFILE</div>

          <div className="about-pixel-avatar">
            {[0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0].map((px, i) => (
              <div key={i} className={`about-pixel ${px ? 'lit' : 'empty'}`} />
            ))}
          </div>

          <div className="about-stats-table">
            <div className="about-stat-row">
              <span className="about-stat-label">NAME</span>
              <span className="about-stat-value">SHAIK HASSAN AHMED</span>
            </div>
            <div className="about-stat-row">
              <span className="about-stat-label">CLASS</span>
              <span className="about-stat-value">FULL STACK + AI/ML</span>
            </div>
            <div className="about-stat-row">
              <span className="about-stat-label">LEVEL</span>
              <span className="about-stat-value">7x HACKATHON WINNER</span>
            </div>
            <div className="about-stat-row">
              <span className="about-stat-label">GUILD</span>
              <span className="about-stat-value">ILEARN COMMUNITY</span>
            </div>
            <div className="about-stat-row">
              <span className="about-stat-label">SERVER</span>
              <span className="about-stat-value">HYDERABAD NODE</span>
            </div>
            <div className="about-stat-row">
              <span className="about-stat-label">STATUS</span>
              <span className="about-status">◉ ONLINE</span>
            </div>
          </div>

          <div className="about-rpg-bars">
            {statBars.map((bar, i) => (
              <div key={i} className="about-bar-group">
                <div className="about-bar-label">{bar.label}</div>
                <div className="about-bar-track">
                  <div
                    className="about-stat-fill"
                    data-width={`${bar.value}%`}
                  />
                </div>
                <div className="about-bar-percent">{bar.value}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Bio and Education */}
        <div className="about-right-column">
          <h2 className="about-section-heading">ABOUT_ME.EXE</h2>
          <div className="about-bio-text">{bioText}</div>

          <h3 className="about-section-heading" style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            EDUCATION
          </h3>

          {educations.map((edu, i) => (
            <div key={i} className="about-edu-card">
              <div className="about-edu-school">{edu.school}</div>
              <div className="about-edu-program">{edu.program}</div>
              <div className="about-edu-meta">
                <span>GPA {edu.gpa}</span>
                <span>{edu.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
