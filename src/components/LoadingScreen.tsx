import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const bootLines = [
  '> INITIALIZING HASSAN.EXE...',
  '> LOADING NEURAL NETWORKS... [OK]',
  '> MOUNTING BLOCKCHAIN MODULES... [OK]',
  '> CALIBRATING GSAP ANIMATIONS... [OK]',
  '> BOOTING REACT THREE FIBER... [OK]',
  '> SCANNING HACKATHON DATABASE... 7 WINS FOUND',
  '> WARMING UP CRT DISPLAY... [OK]',
  '> ALL SYSTEMS NOMINAL.',
  '> WELCOME TO HASSAN\'S TERMINAL.',
];

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>();

  useEffect(() => {
    console.log('LoadingScreen: Started');
    
    // Simple failsafe: complete after 4 seconds no matter what
    timeoutRef.current = setTimeout(() => {
      console.log('LoadingScreen: Timeout - calling onComplete');
      onComplete();
    }, 4000);

    let lineIdx = 0;
    const interval = setInterval(() => {
      if (lineIdx < bootLines.length) {
        console.log(`LoadingScreen: Adding line ${lineIdx}`);
        setLines(prev => [...prev, bootLines[lineIdx]]);
        setProgress(Math.round(((lineIdx + 1) / bootLines.length) * 100));
        lineIdx++;
      } else {
        console.log('LoadingScreen: Animation complete');
        clearInterval(interval);
        setTimeout(() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              y: -20,
              duration: 0.5,
              ease: 'power2.in',
              onComplete: () => {
                console.log('LoadingScreen: GSAP complete - calling onComplete');
                onComplete();
              },
            });
          } else {
            console.log('LoadingScreen: No container ref - calling onComplete directly');
            onComplete();
          }
        }, 300);
      }
    }, 200);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#060608',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px',
      }}
    >
      <pre
        style={{
          color: '#00ff9d',
          fontSize: '14px',
          textAlign: 'center',
          marginBottom: '40px',
          textShadow: '0 0 10px #00ff9d',
          fontFamily: 'monospace',
          whiteSpace: 'pre',
        }}
      >
{`██╗  ██╗ █████╗ ███████╗███████╗ █████╗ ███╗   ██╗
██║  ██║██╔══██╗██╔════╝██╔════╝██╔══██╗████╗  ██║
███████║███████║███████╗███████╗███████║██╔██╗ ██║
██╔══██║██╔══██║╚════██║╚════██║██╔══██║██║╚██╗██║
██║  ██║██║  ██║███████║███████║██║  ██║██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝`}
      </pre>

      <div
        style={{
          maxWidth: '600px',
          fontFamily: 'monospace',
          fontSize: '12px',
          color: '#00ff9d',
          marginBottom: '40px',
          textAlign: 'center',
          minHeight: '200px',
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ marginBottom: '8px' }}>
            {line}
          </div>
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '11px',
            color: '#00ff9d',
          }}
        >
          <span>LOADING</span>
          <span>{progress}%</span>
        </div>
        <div
          style={{
            height: '8px',
            background: 'rgba(0,255,157,0.1)',
            border: '1px solid rgba(0,255,157,0.3)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00ff9d, #7dffce)',
              boxShadow: '0 0 10px #00ff9d',
              transition: 'width 0.2s',
            }}
          />
        </div>
      </div>
    </div>
  );
}
