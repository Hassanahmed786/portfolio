import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const techStack = [
  { label: 'REACT', color: '#61DAFB' },
  { label: 'PYTHON', color: '#3776AB' },
  { label: 'SOLIDITY', color: '#a855f7' },
  { label: 'AZURE', color: '#00b4ff' },
  { label: 'THREE.JS', color: '#00ff9d' },
  { label: 'TypeScript', color: '#3178c6' },
];

export default function Hero() {
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Letters rise from below with stagger
    tl.fromTo(
      lettersRef.current,
      { y: 120, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'back.out(1.7)',
      }
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(
      badgeRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
      '-=0.4'
    )
    .fromTo(
      orbitsRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      '-=0.6'
    );
  }, []);

  const letters = 'HASSAN'.split('');

  return (
    <section
      className="section flex-col text-center relative overflow-hidden w-full items-center justify-center"
      style={{ minHeight: '100vh', paddingTop: '80px', display: 'flex' }}
    >
      {/* Animated horizontal scanline */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #00ff9d, transparent)',
          animation: 'scanFlash 6s linear infinite',
          opacity: 0.15,
        }}
      />

      {/* HASSAN 3D Letters */}
      <div
        className="relative z-10 mb-4"
        style={{ perspective: '800px', perspectiveOrigin: 'center bottom', opacity: 1 }}
      >
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {letters.map((letter, i) => (
            <span
              key={i}
              ref={el => { if (el) lettersRef.current[i] = el; }}
              className="font-pixel inline-block"
              style={{
                fontSize: 'clamp(32px, 10vw, 120px)',
                color: '#00ff9d',
                textShadow: `
                  0 0 10px #00ff9d,
                  0 0 30px #00ff9d,
                  0 0 60px rgba(0,255,157,0.6),
                  0 0 100px rgba(0,255,157,0.3),
                  4px 4px 0 #003d28,
                  8px 8px 0 #001a12
                `,
                transformStyle: 'preserve-3d',
                display: 'inline-block',
                opacity: 1,
                willChange: 'transform, opacity',
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Full name */}
      <div
        className="font-pixel mb-3 z-10"
        style={{
          fontSize: 'clamp(8px, 2vw, 16px)',
          color: '#00cc7a',
          letterSpacing: '0.3em',
        }}
      >
        SHAIK HASSAN AHMED
      </div>

      {/* Subtitle */}
      <div
        ref={subtitleRef}
        className="font-mono z-10 mb-8"
        style={{
          fontSize: 'clamp(11px, 2vw, 18px)',
          color: 'rgba(0,255,157,0.7)',
          letterSpacing: '0.15em',
        }}
      >
        Full Stack Dev &nbsp;|&nbsp; AI/ML Engineer &nbsp;|&nbsp; Blockchain Builder
      </div>

      {/* 7x Winner Badge */}
      <div
        ref={badgeRef}
        className="inline-flex items-center gap-3 font-pixel z-10 mb-10 mx-auto"
        style={{
          fontSize: 'clamp(7px, 1.2vw, 11px)',
          padding: '10px 20px',
          border: '2px solid #f59e0b',
          color: '#f59e0b',
          boxShadow: '0 0 15px rgba(245,158,11,0.5), inset 0 0 10px rgba(245,158,11,0.05)',
          letterSpacing: '0.2em',
        }}
      >
        <span>🏆</span>
        <span>7x HACKATHON WINNER</span>
        <span>🏆</span>
      </div>

      {/* Orbit tech stack pills */}
      <div
        ref={orbitsRef}
        className="flex flex-wrap justify-center gap-3 z-10 max-w-2xl mx-auto px-4"
      >
        {techStack.map((tech, i) => (
          <div
            key={i}
            className="font-pixel"
            style={{
              fontSize: 'clamp(6px, 1vw, 9px)',
              padding: '6px 14px',
              border: `1px solid ${tech.color}`,
              color: tech.color,
              boxShadow: `0 0 8px ${tech.color}40`,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              letterSpacing: '0.1em',
            }}
          >
            {tech.label}
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ color: 'rgba(0,255,157,0.5)' }}
      >
        <div className="font-pixel" style={{ fontSize: '8px', letterSpacing: '0.2em' }}>SCROLL DOWN</div>
        <div
          className="w-px h-12"
          style={{
            background: 'linear-gradient(180deg, rgba(0,255,157,0.5), transparent)',
            animation: 'float 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
