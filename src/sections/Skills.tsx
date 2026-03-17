import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const skillsByCategory = {
  LANGUAGES: ['C++', 'Python', 'JavaScript', 'TypeScript', 'Solidity', 'Java'],
  FRONTEND: ['React', 'Tailwind CSS', 'Three.js', 'GSAP', 'Vite', 'Next.js'],
  'AI/ML': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'RAG'],
  BLOCKCHAIN: ['Solidity', 'Web3.js', 'ethers.js', 'Hardhat', 'MetaMask', 'Smart Contracts'],
  CLOUD: ['Azure', 'AWS', 'Firebase', 'Docker', 'PostgreSQL', 'MongoDB'],
};

const categoryColors: Record<string, string> = {
  LANGUAGES: '#ffb800',
  FRONTEND: '#00ff9d',
  'AI/ML': '#00aaff',
  BLOCKCHAIN: '#aa00ff',
  CLOUD: '#ff4444',
};

const constellations: Array<{ x: number; y: number; label: string; category: keyof typeof categoryColors }> = [
  { x: 15, y: 20, label: 'C++', category: 'LANGUAGES' },
  { x: 35, y: 15, label: 'Python', category: 'LANGUAGES' },
  { x: 50, y: 30, label: 'JavaScript', category: 'LANGUAGES' },
  { x: 65, y: 25, label: 'TypeScript', category: 'LANGUAGES' },
  { x: 80, y: 35, label: 'Solidity', category: 'LANGUAGES' },
  { x: 25, y: 55, label: 'React', category: 'FRONTEND' },
  { x: 45, y: 65, label: 'Three.js', category: 'FRONTEND' },
  { x: 70, y: 60, label: 'GSAP', category: 'FRONTEND' },
  { x: 75, y: 75, label: 'Tailwind', category: 'FRONTEND' },
  { x: 20, y: 80, label: 'TensorFlow', category: 'AI/ML' },
  { x: 40, y: 85, label: 'PyTorch', category: 'AI/ML' },
  { x: 60, y: 88, label: 'Scikit-learn', category: 'AI/ML' },
  { x: 50, y: 45, label: 'Web3.js', category: 'BLOCKCHAIN' },
  { x: 65, y: 50, label: 'Hardhat', category: 'BLOCKCHAIN' },
  { x: 30, y: 40, label: 'Azure', category: 'CLOUD' },
  { x: 55, y: 40, label: 'Firebase', category: 'CLOUD' },
];

export function SkillsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const nodesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawConstellation();
    };

    const drawConstellation = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      constellations.forEach((star, i) => {
        constellations.slice(i + 1).forEach((otherStar) => {
          const dx = (otherStar.x - star.x) * (width / 100);
          const dy = (otherStar.y - star.y) * (height / 100);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const opacity = (200 - distance) / 200 * 0.15;
            ctx.strokeStyle = `rgba(0, 255, 157, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(star.x * (width / 100), star.y * (height / 100));
            ctx.lineTo(otherStar.x * (width / 100), otherStar.y * (height / 100));
            ctx.stroke();
          }
        });
      });
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animateStars = () => {
      drawConstellation();
      requestAnimationFrame(animateStars);
    };

    animateStars();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const nodes = nodesRef.current;
    nodes.forEach((node, i) => {
      gsap.fromTo(
        node,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: i * 0.05,
          ease: 'back.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 40px',
        zIndex: 10,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .skills-heading {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(1rem, 4vw, 1.5rem);
          color: #ffb800;
          letter-spacing: 0.2em;
          margin-bottom: 3rem;
          text-align: center;
          text-shadow: 0 0 10px #ffb800;
          z-index: 20;
          position: relative;
        }

        .skills-heading::before {
          content: '< ';
          color: #00ff9d;
        }

        .skills-heading::after {
          content: ' >';
          color: #00ff9d;
        }

        .skills-container {
          max-width: 1400px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 3rem;
          align-items: center;
        }

        .constellation-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,10,10,0.2) 100%);
          border: 1px solid #00ff9d20;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .constellation-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .constellation-nodes {
          position: absolute;
          inset: 0;
        }

        .skill-node {
          position: absolute;
          transform: translate(-50%, -50%);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .skill-node-inner {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), rgba(0,0,0,0.3));
          border: 2px solid;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          font-weight: bold;
          color: white;
          text-align: center;
          padding: 4px;
          line-height: 1.1;
          box-shadow: 0 0 10px currentColor;
          text-shadow: 0 0 5px currentColor;
        }

        .skill-node:hover .skill-node-inner {
          transform: scale(1.3);
          box-shadow: 0 0 30px currentColor, inset 0 0 20px currentColor;
        }

        .skill-node:hover::after {
          content: attr(data-label);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          background: rgba(0,0,0,0.9);
          border: 1px solid currentColor;
          padding: 4px 8px;
          border-radius: 3px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          color: currentColor;
          margin-bottom: 8px;
        }

        .skills-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .skill-category {
          background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%);
          border: 1px solid;
          border-radius: 0.35rem;
          padding: 1rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .skill-category:hover {
          transform: translateX(-8px);
          box-shadow: 0 0 25px currentColor;
          background: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%);
        }

        .skill-category-name {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.6rem;
          font-weight: bold;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .skill-category-count {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.55rem;
          opacity: 0.7;
        }

        @media (max-width: 1024px) {
          .skills-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .skills-sidebar {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .skill-category {
            flex: 1;
            min-width: 120px;
          }
        }
      `}</style>

      <h2 className="skills-heading">SKILL MATRIX</h2>

      <div className="skills-container">
        <div className="constellation-wrapper">
          <canvas ref={canvasRef} className="constellation-canvas"></canvas>
          <div className="constellation-nodes">
            {constellations.map((star, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) nodesRef.current[i] = el;
                }}
                className="skill-node"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  color: categoryColors[star.category],
                }}
                data-label={star.label}
              >
                <div className="skill-node-inner">{star.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-sidebar">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div
              key={category}
              className="skill-category"
              style={{
                borderColor: categoryColors[category as keyof typeof categoryColors],
                color: categoryColors[category as keyof typeof categoryColors],
              }}
            >
              <div className="skill-category-name">{category}</div>
              <div className="skill-category-count">{skills.length} SKILLS</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
