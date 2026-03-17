import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'FULL-STACK DEV', value: 92, color: '#00ff9d' },
  { label: 'AI / ML ENG', value: 85, color: '#a855f7' },
  { label: 'BLOCKCHAIN', value: 80, color: '#f59e0b' },
  { label: 'CLOUD / DEVOPS', value: 85, color: '#00b4ff' },
  { label: 'HACKATHON WIN%', value: 14, color: '#ff2d55', label2: '7/50+ WINS' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Card entrance
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 80, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    );

    // Stat bars fill
    barsRef.current.forEach((bar, i) => {
      const fill = bar.querySelector('.bar-fill') as HTMLElement;
      const stat = stats[i];
      if (fill) {
        gsap.fromTo(
          fill,
          { width: '0%' },
          {
            width: `${stat.value}%`,
            duration: 1.5,
            ease: 'power2.out',
            delay: 0.2 + i * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              once: true,
            },
          }
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="section flex-col px-4 py-24">
      {/* Section header */}
      <div className="text-center mb-16 z-10">
        <div
          className="font-pixel inline-block mb-4 px-4 py-1"
          style={{
            fontSize: 'clamp(7px, 1vw, 10px)',
            color: '#00ff9d',
            border: '1px solid rgba(0,255,157,0.3)',
            letterSpacing: '0.3em',
          }}
        >
          // PLAYER_STATS
        </div>
        <h2
          className="font-pixel"
          style={{
            fontSize: 'clamp(18px, 4vw, 40px)',
            color: '#00ff9d',
            textShadow: '0 0 20px rgba(0,255,157,0.5)',
          }}
        >
          ABOUT ME
        </h2>
      </div>

      {/* Arcade character select card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-4xl mx-auto"
        style={{ opacity: 1 }}
      >
        <div
          className="relative p-px"
          style={{
            background: 'linear-gradient(135deg, #00ff9d40, transparent, #a855f740)',
          }}
        >
          <div
            className="relative p-8 md:p-12"
            style={{ background: '#0a0c10' }}
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: '#00ff9d' }} />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: '#00ff9d' }} />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: '#00ff9d' }} />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: '#00ff9d' }} />

            <div className="grid md:grid-cols-2 gap-10">
              {/* Left: Character info */}
              <div>
                {/* Pixel avatar */}
                <div
                  className="mb-6 relative mx-auto md:mx-0"
                  style={{ width: 120, height: 120 }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center font-pixel text-5xl"
                    style={{
                      border: '2px solid #00ff9d',
                      boxShadow: '0 0 20px rgba(0,255,157,0.4), inset 0 0 20px rgba(0,255,157,0.05)',
                      background: '#060608',
                    }}
                  >
                    👾
                  </div>
                  {/* SELECT blinking label */}
                  <div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-pixel whitespace-nowrap"
                    style={{ fontSize: '8px', color: '#f59e0b', animation: 'blink 1.2s step-end infinite' }}
                  >
                    ▶ SELECT ◀
                  </div>
                </div>

                <div className="mt-8">
                  <div className="font-pixel mb-1" style={{ fontSize: 'clamp(10px, 2vw, 16px)', color: '#00ff9d' }}>
                    HASSAN
                  </div>
                  <div className="font-mono mb-4" style={{ fontSize: '13px', color: 'rgba(0,255,157,0.6)' }}>
                    CLASS: FULL STACK + AI/ML + WEB3
                  </div>
                  <div
                    className="font-mono leading-relaxed"
                    style={{ fontSize: '12px', color: 'rgba(0,255,157,0.75)', lineHeight: '1.8' }}
                  >
                    B.Tech CSE @ Anurag University<br />
                    <span style={{ color: 'rgba(0,255,157,0.5)' }}>[GPA: 8.4/10 | 2023–2027]</span><br /><br />
                    Minor in AI @ IIT Ropar<br />
                    <span style={{ color: 'rgba(0,255,157,0.5)' }}>[GPA: 8.0/10 | 2024–2026]</span><br /><br />
                    Based in Hyderabad, India 🇮🇳<br />
                    <span style={{ color: '#f59e0b' }}>hassanahmed.works</span>
                  </div>
                </div>
              </div>

              {/* Right: RPG Stat Bars */}
              <div>
                <div
                  className="font-pixel mb-6"
                  style={{ fontSize: '10px', color: 'rgba(0,255,157,0.6)', letterSpacing: '0.2em' }}
                >
                  ─── SKILL STATS ───
                </div>
                <div className="space-y-5">
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      ref={el => { if (el) barsRef.current[i] = el; }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="font-pixel" style={{ fontSize: '8px', color: stat.color }}>
                          {stat.label}
                        </span>
                        <span className="font-mono" style={{ fontSize: '11px', color: stat.color }}>
                          {stat.label2 || `${stat.value}/100`}
                        </span>
                      </div>
                      <div
                        className="h-4 relative"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: `1px solid ${stat.color}40`,
                        }}
                      >
                        <div
                          className="bar-fill h-full"
                          style={{
                            width: '0%',
                            background: `linear-gradient(90deg, ${stat.color}, ${stat.color}99)`,
                            boxShadow: `0 0 10px ${stat.color}80`,
                            position: 'relative',
                          }}
                        >
                          {/* Pixel segments */}
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 14px, rgba(0,0,0,0.3) 14px, rgba(0,0,0,0.3) 16px)',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-8 font-mono"
                  style={{ fontSize: '11px', color: 'rgba(0,255,157,0.5)', lineHeight: '1.8' }}
                >
                  <span style={{ color: '#00ff9d' }}>$</span> ahmedshaikhassan@gmail.com<br />
                  <span style={{ color: '#00ff9d' }}>$</span> github.com/Hassanahmed786<br />
                  <span style={{ color: '#00ff9d' }}>$</span> linkedin.com/in/hassan-ahmed-3b5ba5283
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
