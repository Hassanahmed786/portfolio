import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievements } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      }
    );

    rowsRef.current.forEach((row, i) => {
      gsap.fromTo(
        row,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
          delay: i * 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="section flex-col px-4 py-24">
      <div className="text-center mb-6 z-10" ref={titleRef} style={{ opacity: 1 }}>
        <div
          className="font-pixel inline-block mb-4 px-4 py-1"
          style={{ fontSize: 'clamp(7px, 1vw, 10px)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)', letterSpacing: '0.3em' }}
        >
          // HIGH_SCORES
        </div>
        <h2
          className="font-pixel"
          style={{ fontSize: 'clamp(18px, 4vw, 40px)', color: '#f59e0b', textShadow: '0 0 20px rgba(245,158,11,0.5)' }}
        >
          ACHIEVEMENTS
        </h2>
      </div>

      {/* Arcade leaderboard */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Header bar */}
        <div
          className="font-pixel flex gap-4 mb-2 px-6 py-3"
          style={{
            fontSize: '9px',
            color: '#f59e0b',
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.3)',
            letterSpacing: '0.2em',
          }}
        >
          <span style={{ width: 40 }}>RANK</span>
          <span style={{ flex: 1 }}>ACHIEVEMENT</span>
          <span>SCORE</span>
        </div>

        {/* Leaderboard rows */}
        <div className="space-y-1">
          {achievements.map((ach, i) => {
            const score = 9999 - i * 1000;
            const isTop3 = i < 3;
            return (
              <div
                key={ach.rank}
                ref={el => { if (el) rowsRef.current[i] = el; }}
                className="flex items-center gap-4 px-6 py-4 group"
                style={{
                  opacity: 0,
                  background: isTop3 ? 'rgba(245,158,11,0.07)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isTop3 ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  boxShadow: isTop3 ? '0 0 15px rgba(245,158,11,0.1)' : 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,255,157,0.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = isTop3 ? 'rgba(245,158,11,0.07)' : 'rgba(255,255,255,0.02)';
                }}
              >
                {/* Rank */}
                <div
                  className="font-pixel"
                  style={{
                    width: 40, fontSize: '11px',
                    color: isTop3 ? '#f59e0b' : 'rgba(255,255,255,0.3)',
                    textShadow: isTop3 ? '0 0 10px rgba(245,158,11,0.8)' : 'none',
                  }}
                >
                  {ach.rank}
                </div>

                {/* Icon */}
                <span style={{ fontSize: 20, width: 28 }}>{ach.icon}</span>

                {/* Title + desc */}
                <div className="flex-1 min-w-0">
                  <div
                    className="font-pixel truncate"
                    style={{
                      fontSize: 'clamp(7px, 1.2vw, 10px)',
                      color: isTop3 ? '#f59e0b' : '#00ff9d',
                    }}
                  >
                    {ach.title}
                  </div>
                  <div
                    className="font-mono"
                    style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: 2 }}
                  >
                    {ach.desc}
                  </div>
                </div>

                {/* Score */}
                <div
                  className="font-pixel"
                  style={{
                    fontSize: '11px',
                    color: isTop3 ? '#f59e0b' : 'rgba(0,255,157,0.5)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {score.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Credits */}
        <div
          className="text-center font-pixel mt-6"
          style={{ fontSize: '8px', color: 'rgba(0,255,157,0.3)', letterSpacing: '0.2em', animation: 'blink 2s step-end infinite' }}
        >
          PRESS START TO CONTINUE...
        </div>
      </div>
    </section>
  );
}
