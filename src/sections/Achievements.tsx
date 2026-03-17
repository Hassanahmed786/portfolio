import { useState } from 'react';
import { TerminalBox } from '../components/shared';

const achievements = [
  { rank: '1ST', event: 'MONAD BLITZ HYDERABAD', result: '★★★★★', year: 2024 },
  { rank: '1ST', event: 'WEB3 HACKATHON CHAMPIONSHIP', result: '★★★★★', year: 2024 },
  { rank: '1ST', event: 'NATIONAL HACKATHON', result: '★★★★★', year: 2024 },
  { rank: '2ND', event: 'MRECW WEB DEVELOPMENT', result: '★★★★☆', year: 2023 },
  { rank: 'PART', event: 'GDG AGENTATHON', result: '✓ COMPLETED', year: 2025 },
];

const certifications = [
  'Oracle Data Science',
  'Oracle Cloud GenAI',
  'Google Analytics',
  'Meta Front-End',
  'Cisco Networking',
  'McKinsey Forward 2025',
];

export function AchievementsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="achievements"
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
      {/* Arcade High Scores Table */}
      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          marginBottom: '60px',
        }}
      >
        <TerminalBox title="🎮 HIGH SCORES">
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              lineHeight: '2.2',
              color: '#00ff9d',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 120px',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '2px solid #00ff9d',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '11px',
                letterSpacing: '2px',
              }}
            >
              <div>RANK</div>
              <div>EVENT</div>
              <div text-align="right">RESULT</div>
            </div>

            {/* Scores */}
            {achievements.map((achievement, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 120px',
                  paddingBottom: '8px',
                  marginBottom: '8px',
                  borderBottom: '1px solid #00ff9d40',
                  opacity: hoveredIndex === null || hoveredIndex === i ? 1 : 0.5,
                  transition: 'all 0.3s ease',
                  animation: `slide-in-left 0.6s ease-out ${0.08 * i}s both`,
                }}
              >
                <div style={{ color: '#ffb800', fontWeight: 'bold' }}>{achievement.rank}</div>
                <div>{achievement.event}</div>
                <div style={{ color: '#ffb800' }}>{achievement.result}</div>
              </div>
            ))}
          </div>
        </TerminalBox>
      </div>

      {/* Certifications Grid */}
      <div style={{ width: '100%', maxWidth: '900px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontFamily: 'var(--font-pixel)',
            color: '#00ff9d',
            textShadow: '0 0 10px #00ff9d',
            marginBottom: '30px',
            letterSpacing: '2px',
            textAlign: 'center',
          }}
        >
          CERTIFICATIONS
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {certifications.map((cert, i) => (
            <div
              key={i}
              style={{
                padding: '20px',
                border: '2px solid #00ff9d',
                borderRadius: '4px',
                background: 'rgba(0, 255, 157, 0.05)',
                color: '#00ff9d',
                fontWeight: 'bold',
                fontSize: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                animation: `fade-in 0.6s ease-out ${0.08 * i}s both`,
                boxShadow: '0 0 10px #00ff9d40',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = '0 0 20px #00ff9d, inset 0 0 20px #00ff9d20';
                el.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = '0 0 10px #00ff9d40';
                el.style.transform = 'scale(1)';
              }}
            >
              {cert}
            </div>
          ))}
        </div>
      </div>

      {/* Player name insert */}
      <div
        style={{
          marginTop: '60px',
          textAlign: 'center',
          fontSize: '24px',
          fontFamily: 'var(--font-pixel)',
          color: '#ffb800',
          letterSpacing: '8px',
          textShadow: '0 0 20px #ffb800',
          animation: 'fade-in 1s ease-out 1s both',
        }}
      >
        H-A-S-S-A-N
      </div>
    </section>
  );
}
