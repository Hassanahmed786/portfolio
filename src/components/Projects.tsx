import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const cabinetRefs = useRef<HTMLDivElement[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cabinetRefs.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, rotateX: -15 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
        }
      );
    });
  }, []);

  useEffect(() => {
    if (detailRef.current) {
      gsap.fromTo(
        detailRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeIdx]);

  const active = projects[activeIdx];

  return (
    <section ref={sectionRef} className="section flex-col px-4 py-24">
      <div className="text-center mb-16 z-10">
        <div
          className="font-pixel inline-block mb-4 px-4 py-1"
          style={{ fontSize: 'clamp(7px, 1vw, 10px)', color: '#00ff9d', border: '1px solid rgba(0,255,157,0.3)', letterSpacing: '0.3em' }}
        >
          // INSERT_COIN
        </div>
        <h2
          className="font-pixel"
          style={{ fontSize: 'clamp(18px, 4vw, 40px)', color: '#00ff9d', textShadow: '0 0 20px rgba(0,255,157,0.5)' }}
        >
          PROJECTS
        </h2>
        <div className="font-mono mt-2" style={{ fontSize: '12px', color: 'rgba(0,255,157,0.5)' }}>
          SELECT YOUR CABINET — PRESS ENTER TO PLAY
        </div>
      </div>

      {/* Arcade cabinet grid */}
      <div
        className="relative z-10 w-full max-w-5xl mx-auto"
        style={{ perspective: '1200px' }}
      >
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={el => { if (el) cabinetRefs.current[i] = el; }}
              onClick={() => setActiveIdx(i)}
              className="relative cursor-pointer group"
              style={{
                opacity: 0,
                width: 'clamp(140px, 18vw, 180px)',
                transition: 'transform 0.3s',
                transform: activeIdx === i ? 'scale(1.05) translateY(-8px)' : 'scale(1)',
              }}
            >
              {/* Cabinet body */}
              <div
                className="p-4 relative"
                style={{
                  background: activeIdx === i ? `${project.color}15` : '#0d1117',
                  border: `2px solid ${activeIdx === i ? project.color : `${project.color}40`}`,
                  boxShadow: activeIdx === i
                    ? `0 0 20px ${project.color}60, 0 0 40px ${project.color}20`
                    : `0 0 10px ${project.color}10`,
                  transition: 'all 0.3s',
                }}
              >
                {/* Winner badge */}
                {project.winner && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 font-pixel whitespace-nowrap px-2 py-0.5"
                    style={{
                      fontSize: '6px',
                      background: '#f59e0b',
                      color: '#000',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {project.winnerLabel}
                  </div>
                )}

                {/* Screen */}
                <div
                  className="flex items-center justify-center mb-3"
                  style={{
                    height: 80,
                    background: '#060608',
                    border: `1px solid ${project.color}30`,
                    boxShadow: `inset 0 0 15px ${project.color}20`,
                  }}
                >
                  <span style={{ fontSize: 36 }}>{project.badge}</span>
                </div>

                {/* Cabinet label */}
                <div
                  className="font-pixel text-center leading-relaxed"
                  style={{
                    fontSize: 'clamp(5px, 0.9vw, 8px)',
                    color: project.color,
                    wordBreak: 'break-word',
                  }}
                >
                  {project.title}
                </div>

                {/* Coin slot */}
                <div
                  className="mt-3 mx-auto"
                  style={{
                    width: 40, height: 4,
                    background: `${project.color}30`,
                    border: `1px solid ${project.color}50`,
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Active project detail */}
        <div
          ref={detailRef}
          className="relative p-6 md:p-8 mx-auto max-w-2xl"
          style={{
            background: '#0a0c10',
            border: `1px solid ${active.color}50`,
            boxShadow: `0 0 30px ${active.color}20`,
          }}
        >
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: active.color }} />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: active.color }} />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: active.color }} />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: active.color }} />

          <div className="flex items-center gap-3 mb-4">
            <span style={{ fontSize: 28 }}>{active.badge}</span>
            <div>
              <div className="font-pixel" style={{ fontSize: 'clamp(9px, 1.5vw, 14px)', color: active.color }}>
                {active.title}
              </div>
              {active.winner && (
                <div className="font-pixel mt-1" style={{ fontSize: '8px', color: '#f59e0b' }}>
                  🏆 {active.winnerLabel}
                </div>
              )}
            </div>
          </div>

          <p className="font-mono mb-5" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7' }}>
            {active.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {active.stack.map((tech, i) => (
              <span
                key={i}
                className="font-pixel"
                style={{
                  fontSize: '7px',
                  padding: '4px 8px',
                  border: `1px solid ${active.color}50`,
                  color: active.color,
                  background: `${active.color}10`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Navigation hint */}
          <div className="flex justify-center gap-8 mt-6">
            <button
              onClick={() => setActiveIdx(i => (i - 1 + projects.length) % projects.length)}
              className="font-pixel"
              style={{ fontSize: '9px', color: 'rgba(0,255,157,0.6)', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              ◄ PREV
            </button>
            <span className="font-mono" style={{ fontSize: '11px', color: 'rgba(0,255,157,0.4)' }}>
              {activeIdx + 1} / {projects.length}
            </span>
            <button
              onClick={() => setActiveIdx(i => (i + 1) % projects.length)}
              className="font-pixel"
              style={{ fontSize: '9px', color: 'rgba(0,255,157,0.6)', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              NEXT ►
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
