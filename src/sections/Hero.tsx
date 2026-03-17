import { useEffect, useState } from 'react';

export function HeroContent() {
  const [bootComplete, setBootComplete] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [showStats, setShowStats] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  const bootLines = [
    '> SYSTEM BOOT v2.5.1................. OK',
    '> HASSAN.OS LOADING.................. OK',
    '> FULL STACK MODULE.................. READY',
    '> AI/ML MODULE....................... READY',
    '> BLOCKCHAIN MODULE.................. READY',
    '> 7x HACKATHON RECORD................ VERIFIED ✓',
    '> WELCOME, OPERATOR.',
  ];

  useEffect(() => {
    let charIndex = 0;
    let lineIndex = 0;
    let fullText = '';

    const typeNextChar = () => {
      if (lineIndex < bootLines.length) {
        const line = bootLines[lineIndex];
        if (charIndex < line.length) {
          fullText += line[charIndex];
          setTypewriterText(fullText);
          charIndex++;
          setTimeout(typeNextChar, 40);
        } else {
          fullText += '\n';
          setTypewriterText(fullText);
          charIndex = 0;
          lineIndex++;
          setTimeout(typeNextChar, 100);
        }
      } else {
        setBootComplete(true);
        setTimeout(() => setNameVisible(true), 300);
        setTimeout(() => setShowStats(true), 1100);
        setTimeout(() => setShowScroll(true), 1500);
      }
    };

    setTimeout(typeNextChar, 200);
  }, []);

  const stats = [
    '7x WINNER',
    '500+ STUDENTS TAUGHT',
    'IIT ROPAR AI',
    'MICROSOFT AMBASSADOR',
  ];

  return (
    <>
      <style>{`
        @keyframes nameReveal {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
            filter: blur(10px);
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
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        @keyframes blinkCursor {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .hero-boot-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: clamp(0.5rem, 1.2vw, 0.75rem);
          color: #00ff9d;
          text-shadow: 0 0 10px #00ff9d, 0 0 20px #00ff9d40;
          line-height: 1.6;
          white-space: pre;
          letter-spacing: 0.05em;
          opacity: ${bootComplete ? 0 : 1};
          transition: opacity 0.8s ease-out;
        }

        .hero-name-container {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(3rem, 10vw, 8rem);
          color: #00ff9d;
          text-shadow: 0 0 20px #00ff9d, 0 0 40px #00ff9d80, 0 0 80px #00ff9d30;
          letter-spacing: 0.05em;
          line-height: 1.2;
          text-align: center;
          animation: ${nameVisible ? 'nameReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'};
        }

        .hero-name-last {
          color: #ffb800;
          text-shadow: 0 0 20px #ffb800, 0 0 40px #ffb80050;
        }

        .hero-subtitle {
          font-family: 'Share Tech Mono', monospace;
          color: #ffb80099;
          letter-spacing: 0.4em;
          font-size: clamp(0.6rem, 1.5vw, 1rem);
          margin-top: 1rem;
          opacity: ${nameVisible ? 1 : 0};
          animation: ${nameVisible ? 'nameReveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards' : 'none'};
        }

        .hero-stats-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 2rem;
          padding: 0 2rem;
        }

        .hero-stat-chip {
          border: 1px solid #00ff9d40;
          background: #00ff9d08;
          padding: 6px 14px;
          font-size: 0.55rem;
          color: #00ff9d;
          border-radius: 2px;
          box-shadow: 0 0 10px #00ff9d20;
          font-family: 'Share Tech Mono', monospace;
          letter-spacing: 0.1em;
          animation: ${showStats ? `statSlideIn 0.6s ease-out 0.1s forwards` : 'none'};
          opacity: 0;
        }

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
          font-family: 'Share Tech Mono', monospace;
          font-size: clamp(0.5rem, 1vw, 0.7rem);
          color: #00ff9d;
          letter-spacing: 0.2em;
          animation: blinkCursor 1s infinite;
          margin-bottom: 0.5rem;
        }

        .hero-scroll-arrow {
          font-size: 1.5rem;
          animation: scrollBounce 1.5s ease-in-out infinite;
          display: inline-block;
        }

        .hero-cursor-blink {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: #00ff9d;
          margin-left: 4px;
          animation: blinkCursor 0.6s infinite;
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
            maxWidth: '90vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Boot sequence */}
          {!bootComplete && (
            <div className="hero-boot-text">
              {typewriterText}
              <span className="hero-cursor-blink" />
            </div>
          )}

          {/* Name display */}
          {bootComplete && (
            <>
              <div className="hero-name-container">
                SHAIK HASSAN
                <br />
                <span className="hero-name-last">AHMED</span>
              </div>

              <div className="hero-subtitle">
                FULL STACK · AI/ML · BLOCKCHAIN
              </div>

              {/* Stat chips */}
              {showStats && (
                <div className="hero-stats-row">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="hero-stat-chip" style={{ animationDelay: `${idx * 0.12}s` }}>
                      {stat}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator">
          <div className="hero-scroll-text">[ SCROLL TO ENTER ]</div>
          <div className="hero-scroll-arrow">↓</div>
        </div>
      </section>
    </>
  );
}
