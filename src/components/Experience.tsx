import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      orbRef.current,
      { opacity: 0, scale: 0 },
      {
        opacity: 1, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      }
    );

    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: i % 2 === 0 ? -80 : 80, rotateY: i % 2 === 0 ? -20 : 20 },
        {
          opacity: 1, x: 0, rotateY: 0, duration: 1, ease: 'power3.out',
          delay: i * 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="section flex-col px-4 py-24">
      <div className="text-center mb-16 z-10">
        <div
          className="font-pixel inline-block mb-4 px-4 py-1"
          style={{ fontSize: 'clamp(7px, 1vw, 10px)', color: '#00ff9d', border: '1px solid rgba(0,255,157,0.3)', letterSpacing: '0.3em' }}
        >
          // MISSION_LOG
        </div>
        <h2
          className="font-pixel"
          style={{ fontSize: 'clamp(18px, 4vw, 40px)', color: '#00ff9d', textShadow: '0 0 20px rgba(0,255,157,0.5)' }}
        >
          EXPERIENCE
        </h2>
      </div>

      {/* Central orb + cards layout */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Central glowing orb */}
        <div
          ref={orbRef}
          className="mx-auto mb-12 flex items-center justify-center"
          style={{
            width: 80, height: 80,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #00ff9d40, #00ff9d10)',
            border: '2px solid #00ff9d',
            boxShadow: '0 0 30px rgba(0,255,157,0.6), 0 0 60px rgba(0,255,157,0.3), inset 0 0 30px rgba(0,255,157,0.1)',
            opacity: 0,
          }}
        >
          <span style={{ fontSize: 30 }}>⚡</span>
        </div>

        {/* Mission cards */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              ref={el => { if (el) cardsRef.current[i] = el; }}
              className="relative flex-1 p-6 group"
              style={{
                background: '#0a0c10',
                border: `1px solid ${exp.color}40`,
                boxShadow: `0 0 20px ${exp.color}10`,
                opacity: 0,
                transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                gsap.to(e.currentTarget, { y: -8, duration: 0.3, ease: 'power2.out' });
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${exp.color}40`;
              }}
              onMouseLeave={e => {
                gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: 'power2.out' });
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${exp.color}10`;
              }}
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: exp.color }} />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: exp.color }} />

              {/* Mission number */}
              <div
                className="font-pixel mb-3"
                style={{ fontSize: '9px', color: exp.color, opacity: 0.6, letterSpacing: '0.2em' }}
              >
                MISSION_{String(i + 1).padStart(2, '0')}
              </div>

              <div
                className="font-pixel mb-1 leading-relaxed"
                style={{ fontSize: 'clamp(8px, 1.2vw, 11px)', color: exp.color }}
              >
                {exp.role}
              </div>

              <div
                className="font-mono mb-1"
                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}
              >
                {exp.org}
              </div>

              <div
                className="font-mono mb-4"
                style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}
              >
                {exp.period}
              </div>

              <ul className="space-y-2">
                {exp.highlights.map((h, j) => (
                  <li
                    key={j}
                    className="font-mono flex items-start gap-2"
                    style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)' }}
                  >
                    <span style={{ color: exp.color, flexShrink: 0 }}>▸</span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Connecting line to orb (visual) */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full h-6 w-px md:hidden"
                style={{ background: `linear-gradient(180deg, #00ff9d20, ${exp.color})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
