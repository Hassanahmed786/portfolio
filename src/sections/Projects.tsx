import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'BHAAGO NETA BHAAGO',
    badge: '🥇 WINNER',
    category: 'MONAD BLOCKCHAIN RUNNER',
    description: '2D blockchain runner game on Monad Testnet with ERC-721 power-ups, on-chain leaderboard, and 4 smart contracts. Real player earnings through play-to-earn mechanics.',
    features: [
      'Monad Testnet integration with 4 solidity contracts',
      'ERC-721 power-up NFTs with dynamic rarity',
      'Real-time on-chain leaderboard synchronized',
      'Play-to-earn mechanics with token rewards',
    ],
    stack: ['React 18', 'TypeScript', 'Solidity', 'ethers.js', 'Hardhat', 'Monad'],
    color: '#00ff9d',
  },
  {
    id: 2,
    title: 'WEB3 NFT GIFT CARD',
    badge: '🎁 NFT',
    category: 'CARDANO BLOCKCHAIN',
    description: 'NFT gift cards on Cardano Testnet with MetaMask authentication and trustless peer-to-peer transfers. QR-code redeemable on mobile.',
    features: [
      'Cardano Ada Lovelace Testnet deployment',
      'MetaMask wallet integration + recovery seeds',
      'Trustless peer-to-peer NFT transfers',
      'QR-code redemption mechanism',
    ],
    stack: ['React', 'Web3.js', 'Cardano', 'MetaMask', 'Node.js'],
    color: '#a855f7',
  },
  {
    id: 3,
    title: 'LEGICALL AI',
    badge: '⚖️ AGENT',
    category: 'LEGAL RISK ASSISTANT',
    description: 'Real-time legal call assistant with speech-to-text conversion, RAG-powered legal knowledge lookup, and multi-language transcript support.',
    features: [
      'Live speech-to-text during calls (Google Speech API)',
      'RAG-powered legal case law lookup system',
      'Real-time risk assessment and flagging',
      'Multi-language transcript export',
    ],
    stack: ['JavaScript', 'Google Speech-to-Text', 'Azure', 'RAG', 'NLP', 'Node.js'],
    color: '#00b4ff',
  },
  {
    id: 4,
    title: 'HERITAGE HUES',
    badge: '🏆 1ST',
    category: 'SMART TRAVEL COMPANION',
    description: 'Flutter + Firebase travel app with ML-powered destination recommendations, Google Maps integration. National Hackathon Winner 2023.',
    features: [
      'ML-powered travel recommendation engine',
      'Real-time Google Maps integration + directions',
      'Firebase Realtime DB for offline sync',
      'Dark mode + Accessibility (96+ Lighthouse)',
    ],
    stack: ['Flutter', 'Firebase', 'TensorFlow Lite', 'Google Maps', 'Dart'],
    color: '#f59e0b',
  },
  {
    id: 5,
    title: 'WHATIF ENGINE',
    badge: '🧠 ML',
    category: 'CAUSAL AI SYSTEM',
    description: 'Counterfactual ML reasoning engine that answers "what if" scenarios using causal inference on real-world datasets. Built with Pearl Causal Networks.',
    features: [
      'Pearl Causal Inference framework integration',
      'Counterfactual query resolution engine',
      'Real-world dataset causality mapping',
      'Interactive what-if scenario explorer',
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Pearl', 'Jupyter'],
    color: '#ff2d55',
  },
];

interface ProjectModalProps {
  project: (typeof projects)[0];
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,20,20,0.85) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1500,
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.3s ease-out',
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .proj-modal {
          animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      <div
        className="proj-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '600px',
          width: '90%',
          background: 'linear-gradient(135deg, #0d120d 0%, #071707 100%)',
          border: `2px solid ${project.color}`,
          borderTop: `4px solid ${project.color}`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 40px ${project.color}20`,
          padding: '2.5rem',
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              fontSize: '2rem',
              marginBottom: '0.5rem',
            }}
          >
            {project.badge}
          </div>
          <h3
            style={{
              fontFamily: 'Press Start 2P, monospace',
              fontSize: '1.2rem',
              color: project.color,
              textShadow: `0 0 20px ${project.color}`,
              marginBottom: '0.5rem',
              letterSpacing: '0.1em',
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontFamily: 'Share Tech Mono, monospace',
              color: '#ffb800',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            {project.category}
          </p>
        </div>

        <p
          style={{
            fontFamily: 'Share Tech Mono, monospace',
            color: '#e8ffe8',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
          }}
        >
          {project.description}
        </p>

        <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: `1px solid ${project.color}30` }}>
          <p
            style={{
              fontFamily: 'Press Start 2P, monospace',
              color: project.color,
              fontSize: '0.6rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              letterSpacing: '0.1em',
            }}
          >
            KEY FEATURES
          </p>
          {project.features.map((feature, i) => (
            <div
              key={i}
              style={{
                fontFamily: 'Share Tech Mono, monospace',
                color: '#e8ffe8',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                marginBottom: '0.7rem',
                display: 'flex',
                gap: '0.7rem',
              }}
            >
              <span style={{ color: '#00ff9d', flexShrink: 0 }}>▸</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              fontFamily: 'Press Start 2P, monospace',
              color: project.color,
              fontSize: '0.6rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              letterSpacing: '0.1em',
            }}
          >
            TECH STACK
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
            {project.stack.map((tech, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  background: `${project.color}15`,
                  border: `1px solid ${project.color}50`,
                  color: project.color,
                  padding: '6px 12px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '1rem',
            background: 'transparent',
            border: `2px solid ${project.color}`,
            color: project.color,
            fontFamily: 'Press Start 2P, monospace',
            fontSize: '0.65rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: `0 0 15px ${project.color}40`,
            transition: 'all 0.3s ease',
            letterSpacing: '0.1em',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.boxShadow = `0 0 30px ${project.color}, inset 0 0 20px ${project.color}20`;
            el.style.background = `${project.color}15`;
            el.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.boxShadow = `0 0 15px ${project.color}40`;
            el.style.background = 'transparent';
            el.style.transform = 'scale(1)';
          }}
        >
          EJECT CABINET
        </button>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <section
      id="projects"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 40px',
        zIndex: 10,
        position: 'relative',
      }}
    >
      <style>{`
        .proj-heading {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(1rem, 4vw, 1.5rem);
          color: #ffb800;
          letter-spacing: 0.2em;
          margin-bottom: 4rem;
          text-align: center;
          text-shadow: 0 0 10px #ffb800;
        }

        .proj-heading::before {
          content: '( ';
          color: #00ff9d;
        }

        .proj-heading::after {
          content: ' )';
          color: #00ff9d;
        }

        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          width: 100%;
          perspective: 1200px;
        }

        .proj-cabinet {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: cabinetSlideIn 0.6s ease-out both;
        }

        .proj-cabinet:nth-child(1) { animation-delay: 0.05s; }
        .proj-cabinet:nth-child(2) { animation-delay: 0.1s; }
        .proj-cabinet:nth-child(3) { animation-delay: 0.15s; }
        .proj-cabinet:nth-child(4) { animation-delay: 0.2s; }
        .proj-cabinet:nth-child(5) { animation-delay: 0.25s; }

        @keyframes cabinetSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px) rotateX(10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }

        .cabinet-outer {
          background: linear-gradient(135deg, #1a1a1a 0%, #232323 50%, #1a1a1a 100%);
          border: 3px solid;
          border-top-color: #444;
          border-left-color: #333;
          border-right-color: #111;
          border-bottom-color: #000;
          box-shadow: 
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.5),
            0 10px 30px rgba(0,0,0,0.6);
          padding: 1.5rem 1rem;
          border-radius: 0.5rem;
        }

        .proj-cabinet:hover .cabinet-outer {
          box-shadow: 
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.5),
            0 20px 60px rgba(0,0,0,0.8);
          transform: translateY(-5px);
        }

        .cabinet-screen {
          background: linear-gradient(135deg, #000 0%, #0d0d0d 100%);
          border: 2px solid;
          border-color: var(--proj-color);
          border-top-width: 4px;
          box-shadow: 
            0 0 20px var(--proj-color-glow),
            inset 0 0 10px rgba(0,0,0,0.9),
            inset 0 1px 0 rgba(255,255,255,0.05);
          padding: 1.5rem;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .cabinet-screen::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            repeating-linear-gradient(
              0deg,
              rgba(0,0,0,0.03),
              rgba(0,0,0,0.03) 1px,
              transparent 1px,
              transparent 2px
            );
          pointer-events: none;
          border-radius: 0.25rem;
        }

        .cabinet-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }

        .cabinet-header {
          margin-bottom: 1rem;
        }

        .cabinet-badge {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          color: var(--proj-color);
          letter-spacing: 0.15em;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 10px var(--proj-color-glow);
        }

        .cabinet-title {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(0.7rem, 2vw, 0.9rem);
          color: var(--proj-color);
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
          line-height: 1.2;
          text-shadow: 0 0 15px var(--proj-color-glow);
        }

        .cabinet-category {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          color: #ffb80088;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .cabinet-description {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          color: #d0d0d0;
          line-height: 1.4;
          margin-bottom: 1rem;
        }

        .cabinet-cta {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          color: var(--proj-color);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: bold;
        }

        .cabinet-cta::before {
          content: '▶ ';
          color: var(--proj-color);
        }

        .proj-cabinet:hover .cabinet-outer {
          transform: translateY(-6px);
        }

        @media (max-width: 768px) {
          .proj-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .cabinet-screen {
            min-height: 250px;
          }
        }
      `}</style>

      <h2 className="proj-heading">ARCADE PROJECTS</h2>

      <div className="proj-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className="proj-cabinet"
            onClick={() => setSelectedProject(project)}
            style={{
              '--proj-color': project.color,
              '--proj-color-glow': project.color + '40',
            } as React.CSSProperties}
          >
            <div className="cabinet-outer">
              <div className="cabinet-screen">
                <div className="cabinet-content">
                  <div className="cabinet-header">
                    <div className="cabinet-badge">{project.badge}</div>
                    <h3 className="cabinet-title">{project.title}</h3>
                    <p className="cabinet-category">{project.category}</p>
                  </div>

                  <p className="cabinet-description">{project.description}</p>

                  <div className="cabinet-cta">INSERT COIN</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
