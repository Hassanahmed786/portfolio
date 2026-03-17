import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export function HeroContent() {
  const [nameVisible, setNameVisible] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLElement | null)[]>([]);
  const glitchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTimeout(() => setNameVisible(true), 200);
    setTimeout(() => setShowStats(true), 900);
    setTimeout(() => setShowScroll(true), 1400);
  }, []);

  // Counter animations
  useEffect(() => {
    if (!showStats) return;

    const counters = [
      { value: 50, label: 'HACKATHONS' },
      { value: 7, label: 'FIRST PLACE' },
      { value: 500, label: 'STUDENTS' },
      { value: 8.4, label: 'GPA' },
    ];

    counterRefs.current.forEach((el, idx) => {
      if (el && counters[idx]) {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: counters[idx].value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            const displayVal = counters[idx].label.includes('GPA')
              ? counter.val.toFixed(1)
              : Math.round(counter.val);
            el.textContent = displayVal + (counters[idx].label.includes('GPA') || counters[idx].label.includes('FIRST') ? '' : '+');
          },
        });
      }
    });
  }, [showStats]);

  // Glitch effect trigger
  useEffect(() => {
    const triggerGlitch = () => {
      if (nameRef.current && !glitchActive) {
        setGlitchActive(true);
        setTimeout(() => {
          setGlitchActive(false);
          scheduleNextGlitch();
        }, 300);
      }
    };

    const scheduleNextGlitch = () => {
      const delay = 8000 + Math.random() * 7000; // 8-15s
      glitchTimeoutRef.current = setTimeout(triggerGlitch, delay);
    };

    scheduleNextGlitch();

    return () => {
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current);
      }
    };
  }, [glitchActive]);

  const stats = [
    { num: '50', label: 'HACKATHONS PARTICIPATED' },
    { num: '7', label: 'FIRST PLACE WINS' },
    { num: '500', label: 'STUDENTS TAUGHT' },
    { num: '8.4', label: 'UNIVERSITY GPA' },
  ];

  return (
    <>
      <style>{`
        @keyframes nameReveal {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.8);
            filter: blur(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes statSlideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }

        @keyframes blinkCursor {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @keyframes counterPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .hero-name-container {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(2rem, 8vw, 5.5rem);
          color: #00ff9d;
          text-shadow: 0 0 20px #00ff9d, 0 0 40px #00ff9d, 0 0 80px #00ff9d40;
          letter-spacing: 0.08em;
          line-height: 1.15;
          text-align: center;
          animation: ${nameVisible ? 'nameReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'};
          opacity: 0;
          position: relative;
        }

        .hero-name-container.glitch {
          animation: nameReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards, glitch 0.3s ease-out;
        }

        .hero-name-first {
          display: block;
        }

        .hero-name-last {
          color: #ffb800;
          text-shadow: 0 0 20px #ffb800, 0 0 40px #ffb800, 0 0 80px #ffb80040;
        }

        .hero-subtitle {
          font-family: 'Share Tech Mono', monospace;
          color: #ffb80088;
          letter-spacing: 0.5em;
          font-size: clamp(0.7rem, 1.8vw, 1.1rem);
          margin-top: clamp(1rem, 3vw, 2rem);
          font-weight: bold;
          opacity: ${nameVisible ? 1 : 0};
          animation: ${nameVisible ? 'nameReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards' : 'none'};
        }

        .hero-counters-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1.5rem;
          justify-content: center;
          margin-top: clamp(2rem, 5vw, 3.5rem);
          padding: 0 2rem;
          width: 100%;
          max-width: 900px;
        }

        .hero-counter-box {
          border: 2px solid #00ff9d;
          background: linear-gradient(135deg, #00ff9d15, #00ff9d08);
          padding: 1.5rem 1rem;
          border-radius: 3px;
          box-shadow: 0 0 20px #00ff9d30;
          text-align: center;
          animation: ${showStats ? 'statSlideIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none'};
          opacity: 0;
        }

        .hero-counter-box:nth-child(1) { animation-delay: 0s; }
        .hero-counter-box:nth-child(2) { animation-delay: 0.1s; }
        .hero-counter-box:nth-child(3) { animation-delay: 0.2s; }
        .hero-counter-box:nth-child(4) { animation-delay: 0.3s; }

        .hero-counter-number {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          color: #00ff9d;
          text-shadow: 0 0 15px #00ff9d;
          margin-bottom: 0.5rem;
          font-weight: bold;
          display: block;
          min-height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-counter-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: clamp(0.45rem, 0.7vw, 0.55rem);
          color: #ffb800;
          letter-spacing: 0.08em;
          font-weight: bold;
          text-transform: uppercase;
        }

        .hero-stats-row {
          display: flex;
          gap: 1.2rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: clamp(1.5rem, 4vw, 3rem);
          padding: 0 2rem;
        }

        .hero-stat-chip {
          border: 2px solid #00ff9d;
          background: linear-gradient(135deg, #00ff9d15, #00ff9d08);
          padding: 8px 18px;
          font-size: clamp(0.5rem, 0.8vw, 0.65rem);
          color: #00ff9d;
          border-radius: 3px;
          box-shadow: 0 0 15px #00ff9d30;
          font-family: 'Share Tech Mono', monospace;
          letter-spacing: 0.12em;
          font-weight: bold;
          animation: ${showStats ? `statSlideIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards` : 'none'};
          opacity: 0;
        }

        .hero-stat-chip:nth-child(1) { animation-delay: 0s; }
        .hero-stat-chip:nth-child(2) { animation-delay: 0.1s; }
        .hero-stat-chip:nth-child(3) { animation-delay: 0.2s; }
        .hero-stat-chip:nth-child(4) { animation-delay: 0.3s; }

        .hero-scroll-indicator {
          position: absolute;
          bottom: 60px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          opacity: ${showScroll ? 1 : 0};
          transition: opacity 0.8s ease-out;
        }

        .hero-scroll-text {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(0.45rem, 0.8vw, 0.65rem);
          color: #00ff9d;
          letter-spacing: 0.15em;
          animation: blinkCursor 1.2s infinite;
          margin-bottom: 1rem;
          font-weight: bold;
        }

        .hero-scroll-arrow {
          font-size: clamp(1.5rem, 3vw, 2rem);
          animation: scrollBounce 2s ease-in-out infinite;
          display: inline-block;
          color: #00ff9d;
        }
      `}</style>

      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            width: '100%',
            maxWidth: '95vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Name display with glitch */}
          <div
            ref={nameRef}
            className={`hero-name-container ${glitchActive ? 'glitch' : ''}`}
            data-text="SHAIK HASSAN AHMED"
          >
            <span className="hero-name-first">SHAIK HASSAN</span>
            <span className="hero-name-last">AHMED</span>
          </div>

          <div className="hero-subtitle">
            FULL STACK · AI/ML · BLOCKCHAIN
          </div>

          {/* Counter boxes */}
          {showStats && (
            <div className="hero-counters-row">
              {stats.map((stat, idx) => (
                <div key={idx} className="hero-counter-box">
                  <span
                    className="hero-counter-number"
                    ref={(el) => {counterRefs.current[idx] = el;}}
                  >
                    0
                  </span>
                  <div className="hero-counter-label">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Legacy stat chips (optional, can be removed if using counters only) */}
          {/* This section is commented out in favor of counters above */}
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator">
          <div className="hero-scroll-text">[ SCROLL DOWN ]</div>
          <div className="hero-scroll-arrow">↓</div>
        </div>
      </section>
    </>
  );
}
