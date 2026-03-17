import { useEffect, useRef, useState } from 'react';
import '../styles/intro.css';

interface IntroProps {
  onComplete: () => void;
}

export function Intro({ onComplete }: IntroProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [showName, setShowName] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('0%');
  const [currentTime, setCurrentTime] = useState('');
  const nameRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const terminalLines = [
    '> SYSTEM BOOT v2.5.1........... OK',
    '> FULL STACK MODULE............. READY',
    '> AI/ML MODULE.................. READY',
    '> BLOCKCHAIN MODULE........... READY',
    '> HACKATHON RECORD [7x WIN] ..... VERIFIED ✓',
    '> WELCOME, OPERATOR.',
  ];

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Terminal text animation
  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let currentText = '';

    const typeNextChar = () => {
      if (lineIndex < terminalLines.length) {
        const line = terminalLines[lineIndex];
        if (charIndex < line.length) {
          currentText += line[charIndex];
          setBootLines(prev => {
            const updated = [...prev];
            updated[lineIndex] = currentText;
            return updated;
          });
          charIndex++;
          setTimeout(typeNextChar, 15);
        } else {
          lineIndex++;
          charIndex = 0;
          currentText = '';
          
          if (lineIndex < terminalLines.length) {
            // Delays between lines: stagger them out nicely
            const delayBetweenLines = 200;
            setTimeout(typeNextChar, delayBetweenLines);
          } else {
            // All lines complete - terminal will fade out at 2800ms
            // Name will show at 3100ms
          }
        }
      }
    };

    typeNextChar();

    // Fade out terminal at 2800ms, show name at 3100ms
    const fadeTimer = setTimeout(() => {
      const terminalEl = document.querySelector('.intro-terminal') as HTMLElement;
      if (terminalEl) {
        terminalEl.style.animation = 'terminalFadeOut 0.3s ease forwards';
      }
    }, 2800);

    const showNameTimer = setTimeout(() => {
      setShowName(true);
      setShowSubtitle(true);
    }, 3100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(showNameTimer);
    };
  }, []);

  // Show progress bar at t=3400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgressBar(true);
    }, 3400);
    return () => clearTimeout(timer);
  }, []);

  // Simulate loading progress
  useEffect(() => {
    if (!showProgressBar) return;

    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      let increment = 0;

      if (currentProgress < 30) {
        // Quick 0-30%
        increment = Math.random() * 5 + 2;
      } else if (currentProgress < 60) {
        // Slower 30-60%
        increment = Math.random() * 2 + 1;
      } else if (currentProgress < 85) {
        // Variable 60-85%
        increment = Math.random() * 3 + 1;
      } else if (currentProgress < 100) {
        // Slow crawl 85-100%
        increment = Math.random() * 1 + 0.5;
      }

      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(Math.round(currentProgress));
      setProgressText(Math.round(currentProgress) + '%');

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        // Flash white then maintain
        if (progressFillRef.current) {
          progressFillRef.current.style.background = '#ffffff';
          setTimeout(() => {
            if (progressFillRef.current) {
              progressFillRef.current.style.background = '#00ff9d';
              setProgressText('100% — ENTERING');
              // Wait 600ms then complete
              setTimeout(() => {
                if (introRef.current) {
                  introRef.current.style.animation = 'introPulseOut 0.5s ease forwards';
                  setTimeout(() => {
                    onComplete();
                  }, 500);
                }
              }, 600);
            }
          }, 100);
        }
      }
    }, 60);

    return () => clearInterval(progressInterval);
  }, [showProgressBar, onComplete]);

  // Glitch effect (random 8-12s)
  useEffect(() => {
    const triggerGlitch = () => {
      if (nameRef.current) {
        const glitchOverlay = document.querySelector('.name-glitch') as HTMLElement;
        if (glitchOverlay) {
          glitchOverlay.classList.add('active');
          setTimeout(() => {
            glitchOverlay.classList.remove('active');
            // Schedule next glitch
            const nextDelay = Math.random() * 4000 + 8000;
            setTimeout(triggerGlitch, nextDelay);
          }, 300);
        }
      }
    };

    if (showName) {
      const delay = Math.random() * 4000 + 8000;
      const timer = setTimeout(triggerGlitch, delay);
      return () => clearTimeout(timer);
    }
  }, [showName]);

  // Flicker animation (every 8s)
  useEffect(() => {
    if (!showName) return;

    const triggerFlicker = () => {
      if (nameRef.current) {
        const nameLineOne = nameRef.current.querySelector(
          '.name-line-one'
        ) as HTMLElement;
        if (nameLineOne) {
          nameLineOne.style.animation = 'nameBrieflens 0.15s ease forwards';
          setTimeout(() => {
            nameLineOne.style.animation = 'none';
            setTimeout(triggerFlicker, 8000);
          }, 150);
        }
      }
    };

    const timer = setTimeout(triggerFlicker, 8000);
    return () => clearTimeout(timer);
  }, [showName]);

  return (
    <div
      ref={introRef}
      className="intro-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10000,
        background: '#060608',
        overflow: 'hidden',
      }}
    >
      {/* BACKGROUND LAYER */}

      {/* 1. Grid Floor */}
      <div className="grid-floor" />

      {/* 2. Horizon Line */}
      <div className="horizon-line" />

      {/* 3. Warp Rings SVG */}
      <svg className="warp-rings" viewBox="0 0 300 300">
        {[140, 120, 100, 80, 60, 40, 20].map(radius => (
          <circle
            key={`ring-${radius}`}
            cx="150"
            cy="150"
            r={radius}
            stroke="#00ff9d"
            strokeWidth="0.8"
            fill="none"
          />
        ))}
        {/* Crosshair lines */}
        <line x1="150" y1="10" x2="150" y2="290" stroke="#00ff9d" strokeWidth="0.8" />
        <line x1="10" y1="150" x2="290" y2="150" stroke="#00ff9d" strokeWidth="0.8" />
        <line x1="30" y1="30" x2="270" y2="270" stroke="#00ff9d" strokeWidth="0.8" />
        <line x1="270" y1="30" x2="30" y2="270" stroke="#00ff9d" strokeWidth="0.8" />
      </svg>

      {/* DECORATION LAYER */}

      {/* 4. Corner Brackets */}
      <div className="corner-bracket top-left" />
      <div className="corner-bracket top-right" />
      <div className="corner-bracket bottom-left" />
      <div className="corner-bracket bottom-right" />

      {/* 5. Side Indicator Dots */}
      <div className="side-dots left-dots">
        {[1, 2, 3, 4].map(i => (
          <div
            key={`left-${i}`}
            className="indicator-dot"
            style={{
              opacity: [0.3, 0.2, 0.15, 0.1][i - 1],
              animationDelay: `${(i - 1) * 0.3}s`,
            }}
          />
        ))}
      </div>
      <div className="side-dots right-dots">
        {[1, 2, 3, 4].map(i => (
          <div
            key={`right-${i}`}
            className="indicator-dot"
            style={{
              opacity: [0.3, 0.2, 0.15, 0.1][i - 1],
              animationDelay: `${(i - 1) * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* 6. Status Bar */}
      <div className="status-bar">
        <span>SYS:OK</span>
        <span className="status-dot">◉</span>
        <span>HASSAN.OS v1.0</span>
        <span className="status-dot">◉</span>
        <span>{currentTime}</span>
      </div>

      {/* 7. Wireframe Floating Shapes */}
      <div className="shape diamond" style={{ top: '15%', left: '12%', animationDuration: '5s' }} />
      <div className="shape square" style={{ top: '22%', right: '8%', animationDuration: '7s', animationDelay: '0.5s' }} />
      <div className="shape diamond" style={{ bottom: '25%', left: '5%', animationDuration: '6s', animationDelay: '1s' }} />
      <div className="shape square" style={{ bottom: '20%', right: '10%', animationDuration: '8s', animationDelay: '0.7s' }} />
      <div className="shape diamond" style={{ top: '45%', right: '3%', animationDuration: '9s', animationDelay: '1.2s' }} />
      <div className="shape square" style={{ top: '35%', left: '8%', animationDuration: '11s', animationDelay: '0.3s' }} />

      {/* 8. Floating Particles */}
      <div className="floating-particles">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 40}%`,
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      {/* 9. Scan Beam */}
      <div className="scan-beam" />

      {/* CRT OVERLAY LAYER */}

      {/* 10. Scanlines */}
      <div className="scanlines" />

      {/* 11. Vignette */}
      <div className="vignette" />

      {/* CONTENT LAYER */}

      {/* 12. Terminal Boot Text */}
      <div className="intro-terminal">
        {bootLines.map((line, idx) => (
          <div key={idx} className="terminal-line" style={{
            animation: `terminalSlideIn 0.4s ease-out forwards`,
            animationDelay: `${idx * 0.15}s`,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span>{line}</span>
            {line.includes('OK') && (
              <span style={{ color: '#00ff9d', fontWeight: 'bold' }}>✓</span>
            )}
            {line.includes('READY') && (
              <span style={{ color: '#00ff9d', fontWeight: 'bold' }}>✓</span>
            )}
            {line.includes('VERIFIED') && (
              <span style={{ color: '#ffb800', fontWeight: 'bold' }}>✓</span>
            )}
          </div>
        ))}
      </div>

      {/* 13. The Name - Centerpiece */}
      {showName && (
        <div ref={nameRef} className="name-container">
          <div className="name-glitch"></div>
          <div className="name-content">
            <div className="name-line-one">SHAIK HASSAN</div>
            <div className="name-line-two">AHMED</div>
          </div>
        </div>
      )}

      {/* 14. Subtitle */}
      {showSubtitle && (
        <div className="subtitle">
          FULL STACK · AI/ML · BLOCKCHAIN
        </div>
      )}

      {/* 15. Progress Bar */}
      {showProgressBar && (
        <div className="progress-container">
          <div className="progress-label">INITIALIZING PORTFOLIO</div>
          <div className="progress-track">
            <div
              ref={progressFillRef}
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-percent">{progressText}</div>
        </div>
      )}
    </div>
  );
}
