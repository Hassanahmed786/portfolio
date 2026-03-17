import { TerminalBox } from '../components/shared';

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

export function SkillsSection() {
  return (
    <section
      id="skills"
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
        SKILL MATRIX
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
        {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => (
          <TerminalBox
            key={category}
            title={category}
            style={{
              borderColor: categoryColors[category],
              boxShadow: `0 0 20px ${categoryColors[category]}40`,
              animation: `fade-in 0.6s ease-out ${0.1 * categoryIndex}s both`,
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {skills.map((skill, skillIndex) => (
                <div
                  key={skill}
                  style={{
                    padding: '8px 12px',
                    background: `${categoryColors[category]}20`,
                    border: `1px solid ${categoryColors[category]}`,
                    borderRadius: '3px',
                    color: categoryColors[category],
                    fontSize: '11px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    animation: `fade-in 0.4s ease-out ${0.05 * skillIndex + 0.1 * categoryIndex}s both`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = `${categoryColors[category]}40`;
                    el.style.boxShadow = `0 0 15px ${categoryColors[category]}`;
                    el.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = `${categoryColors[category]}20`;
                    el.style.boxShadow = 'none';
                    el.style.transform = 'scale(1)';
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </TerminalBox>
        ))}
      </div>
    </section>
  );
}
