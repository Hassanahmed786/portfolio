import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

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
          charIndex++;
          setTimeout(typeCharacter, 40);
        } else {
          fullText += '\n';
          setDisplayedText(fullText);
          charIndex = 0;
          lineIndex++;
          setTimeout(typeCharacter, 150);
        }
      } else {
        setIsComplete(true);
        setTimeout(() => onComplete(), 800);
      }
    };

    setTimeout(typeCharacter, 200);
  }, [onComplete]);

  if (isComplete) {
    return null;
  }

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
        transition: 'opacity 0.8s ease-out',
      }}
    >
      <div
        style={{
          width: '90%',
          maxWidth: '600px',
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          lineHeight: '1.8',
          color: '#00ff9d',
          textShadow: '0 0 10px #00ff9d',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}
      >
        {displayedText}
        {!isComplete && <span className="terminal-cursor" />}
      </div>
    </div>
  );
}
