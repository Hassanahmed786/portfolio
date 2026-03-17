import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const bootLines = [
    '> SYSTEM BOOT v2.5.1...',
    '> LOADING HASSAN.OS...',
    '> FULL STACK MODULE .......... OK',
    '> AI/ML MODULE .............. OK',
    '> BLOCKCHAIN MODULE .......... OK',
    '> 7x HACKATHON WINNER ........ CONFIRMED ✓',
    '> WELCOME, OPERATOR.',
  ];

  useEffect(() => {
    let charIndex = 0;
    let lineIndex = 0;
    let fullText = '';

    const typeCharacter = () => {
      if (lineIndex < bootLines.length) {
        const currentLine = bootLines[lineIndex];
        if (charIndex < currentLine.length) {
          fullText += currentLine[charIndex];
          setDisplayedText(fullText);
          
          // Highlight name when it appears
          if (currentLine.includes('HASSAN') && fullText.includes('HASSAN')) {
            setHighlightIndex(fullText.indexOf('HASSAN'));
          }
          
          charIndex++;
          setTimeout(typeCharacter, 20);
        } else {
          fullText += '\n';
          setDisplayedText(fullText);
          charIndex = 0;
          lineIndex++;
          setTimeout(typeCharacter, 80);
        }
      } else {
        setIsComplete(true);
        setTimeout(() => onComplete(), 600);
      }
    };

    setTimeout(typeCharacter, 100);
  }, [onComplete]);

  if (isComplete) {
    return null;
  }

  // Render with name highlighting
  const renderText = () => {
    if (highlightIndex >= 0) {
      const beforeName = displayedText.substring(0, displayedText.indexOf('HASSAN'));
      const nameEndIndex = displayedText.indexOf('HASSAN') + 'HASSAN'.length;
      const name = displayedText.substring(displayedText.indexOf('HASSAN'), nameEndIndex);
      const afterName = displayedText.substring(nameEndIndex);

      return (
        <>
          {beforeName}
          <span style={{
            color: '#ffb800',
            textShadow: '0 0 20px #ffb800, 0 0 40px #ffb80080',
            fontWeight: 'bold',
            animation: 'pulse 0.6s ease-in-out 2'
          }}>
            {name}
          </span>
          {afterName}
        </>
      );
    }
    return displayedText;
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#060608',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isComplete ? 0 : 1,
        transition: 'opacity 0.6s ease-out',
        overflow: 'hidden',
      }}
    >
      {/* Animating scanlines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 157, 0.03) 0px, rgba(0, 255, 157, 0.03) 2px, transparent 2px, transparent 4px)',
          animation: 'scanlines 8s linear infinite',
          pointerEvents: 'none',
        }}
      />
      
      {/* Glitch effect overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
          pointerEvents: 'none',
        }}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; text-shadow: 0 0 20px #ffb800, 0 0 40px #ffb80080; }
          50% { opacity: 0.7; text-shadow: 0 0 30px #ffb800, 0 0 60px #ffb800aa; }
        }
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
        .terminal-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: #00ff9d;
          animation: blink 0.6s infinite;
          margin-left: 4px;
          box-shadow: 0 0 10px #00ff9d;
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>

      <div
        style={{
          width: '90%',
          maxWidth: '600px',
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          lineHeight: '1.8',
          color: '#00ff9d',
          textShadow: '0 0 10px #00ff9d, 0 0 20px #00ff9d40',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {renderText()}
        {!isComplete && <span className="terminal-cursor" />}
      </div>
    </div>
  );
}
