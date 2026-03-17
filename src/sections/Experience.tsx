import { TerminalBox } from '../components/shared';

const experiences = [
  {
    role: 'Microsoft Learn Student Ambassador',
    org: 'Microsoft',
    period: 'Aug 2024 – Present',
    highlights: [
      '10+ technical workshops delivered',
      '500+ students reached',
      'Azure, GitHub, AI/ML topics',
      '30% cloud adoption boost',
    ],
  },
  {
    role: 'Full Stack Dev Intern',
    org: 'AICTE Edunet Foundation',
    period: '2024',
    highlights: [
      'MERN stack development',
      'REST API design & integration',
      'Flask + AI/ML integration',
      '20% performance improvement',
    ],
  },
  {
    role: 'Co-Founder',
    org: 'ILearn Community & TechnoSphere',
    period: 'Mar 2025 – Present',
    highlights: [
      '500+ member developer community',
      'AI/ML & Web3 workshops',
      'Tech education platform',
    ],
  },
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
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
          marginBottom: '80px',
          letterSpacing: '4px',
          textAlign: 'center',
        }}
      >
        MISSION HISTORY
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        {experiences.map((exp, i) => (
          <div
            key={i}
            style={{
              animation: `fade-in 0.8s ease-out ${0.1 * i}s both`,
              transform: `scale(1)`,
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            <TerminalBox title={`MISSION ${String(i + 1).padStart(3, '0')}`}>
              <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
                <div style={{ color: '#ffb800', fontWeight: 'bold', marginBottom: '8px' }}>
                  {exp.role}
                </div>
                <div style={{ color: '#00ff9d', fontSize: '11px', marginBottom: '12px' }}>
                  {exp.org}
                </div>
                <div style={{ color: '#e8ffe8', fontSize: '10px', marginBottom: '15px', opacity: 0.7 }}>
                  {exp.period}
                </div>
                <div style={{ borderTop: '1px solid #00ff9d40', paddingTop: '12px' }}>
                  {exp.highlights.map((highlight, j) => (
                    <div key={j} style={{ marginBottom: '8px', color: '#e8ffe8' }}>
                      ▸ {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </TerminalBox>
          </div>
        ))}
      </div>
    </section>
  );
}
