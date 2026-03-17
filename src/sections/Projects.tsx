import { useState } from 'react';
import { TerminalBox } from '../components/shared';

const projects = [
  {
    title: 'Bhaago Neta Bhaago',
    badge: '🥇',
    category: 'MONAD BLOCKCHAIN RUNNER',
    description: '2D blockchain runner game on Monad Testnet with ERC-721 power-ups, on-chain leaderboard, and 4 smart contracts.',
    stack: ['React 18', 'TypeScript', 'Solidity', 'ethers.js', 'Hardhat'],
    color: '#00ff9d',
  },
  {
    title: 'Web3 NFT Gift Card',
    badge: '🥇',
    category: 'CARDANO TESTNET',
    description: 'NFT gift cards on Cardano Ada Lovelace Testnet with MetaMask wallet authentication and trustless transfers.',
    stack: ['React', 'Web3.js', 'Solidity', 'MetaMask'],
    color: '#a855f7',
  },
  {
    title: 'LegiCall AI',
    badge: '🤖',
    category: 'LEGAL RISK AGENT',
    description: 'Real-time legal call assistant with speech-to-text, RAG-powered legal lookup, and multilingual transcripts.',
    stack: ['JavaScript', 'Google Speech-to-Text', 'Azure', 'RAG', 'NLP'],
    color: '#00b4ff',
  },
  {
    title: 'Heritage Hues',
    badge: '🏆',
    category: 'SMART TRAVEL APP',
    description: 'Flutter + Firebase travel app with ML-powered recommendations, Google Maps integration. National Hackathon Winner.',
    stack: ['Flutter', 'Firebase', 'ML', 'Google Maps'],
    color: '#f59e0b',
  },
  {
    title: 'WhatIf Engine',
    badge: '🧠',
    category: 'CAUSAL AI SYSTEM',
    description: 'Counterfactual ML reasoning engine that answers "what if" scenarios using causal inference and real-world datasets.',
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
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
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1500,
        backdropFilter: 'blur(4px)',
      }}
    >
      <TerminalBox
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className="fade-in"
        style={{ maxWidth: '500px', margin: '20px' }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: '24px',
              fontFamily: 'var(--font-pixel)',
              color: project.color,
              marginBottom: '8px',
              textShadow: `0 0 10px ${project.color}`,
            }}
          >
            {project.badge} {project.title}
          </h3>
          <p
            style={{
              color: '#ffb800',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            {project.category}
          </p>
        </div>

        <p style={{ color: '#e8ffe8', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
          {project.description}
        </p>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ color: '#00ff9d', fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>
            TECH STACK
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.stack.map((tech, i) => (
              <span
                key={i}
                style={{
                  background: `${project.color}20`,
                  border: `1px solid ${project.color}`,
                  color: project.color,
                  padding: '4px 8px',
                  borderRadius: '3px',
                  fontSize: '10px',
                  fontWeight: 'bold',
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
            padding: '12px',
            background: 'transparent',
            border: `2px solid ${project.color}`,
            color: project.color,
            fontFamily: 'var(--font-mono)',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: `0 0 10px ${project.color}40`,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${project.color}`;
            (e.currentTarget as HTMLElement).style.background = `${project.color}20`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 10px ${project.color}40`;
            (e.currentTarget as HTMLElement).style.background = 'transparent';
          }}
        >
          CLOSE TERMINAL
        </button>
      </TerminalBox>
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
        padding: '60px 40px',
        zIndex: 10,
        position: 'relative',
      }}
    >
      <h2
        style={{
          fontSize: '40px',
          fontFamily: 'var(--font-pixel)',
          color: '#00ff9d',
          textShadow: '0 0 20px #00ff9d',
          marginBottom: '60px',
          letterSpacing: '4px',
          textAlign: 'center',
        }}
      >
        ARCADE PROJECTS
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        {projects.map((project, i) => (
          <button
            key={i}
            onClick={() => setSelectedProject(project)}
            style={{
              padding: '20px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: `2px solid ${project.color}`,
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#e8ffe8',
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.3s ease',
              textAlign: 'left',
              animation: `fade-in 0.6s ease-out ${0.1 * i}s both`,
              boxShadow: `0 0 10px ${project.color}40`,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = `0 0 20px ${project.color}, inset 0 0 20px ${project.color}20`;
              el.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = `0 0 10px ${project.color}40`;
              el.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ marginBottom: '12px' }}>
              <div
                style={{
                  fontSize: '28px',
                  marginBottom: '8px',
                }}
              >
                {project.badge}
              </div>
              <h3
                style={{
                  fontSize: '16px',
                  color: project.color,
                  textShadow: `0 0 10px ${project.color}`,
                  marginBottom: '4px',
                  fontWeight: 'bold',
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontSize: '10px',
                  color: '#ffb800',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {project.category}
              </p>
            </div>
            <p
              style={{
                fontSize: '12px',
                lineHeight: '1.5',
                color: '#e8ffe8',
                marginBottom: '12px',
              }}
            >
              {project.description}
            </p>
            <div
              style={{
                fontSize: '10px',
                color: '#00ff9d',
                textTransform: 'uppercase',
              }}
            >
              ▶ INSERT COIN
            </div>
          </button>
        ))}
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
