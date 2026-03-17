import { TerminalBox, StatBar, GlowText } from '../components/shared';

export function AboutSection() {
  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        zIndex: 10,
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          maxWidth: '1000px',
          width: '100%',
          alignItems: 'center',
        }}
      >
        {/* Left: Profile card */}
        <TerminalBox title="🔍 Operator Profile">
          <div style={{ color: '#00ff9d', lineHeight: '1.8', fontSize: '14px' }}>
            NAME: <GlowText color="amber">SHAIK HASSAN AHMED</GlowText>
            <br />
            CLASS: <GlowText color="phosphor">FULL STACK / AI ENGINEER</GlowText>
            <br />
            LEVEL: <GlowText color="amber">7x HACKATHON WINNER</GlowText>
            <br />
            LOCATION: <GlowText color="phosphor">HYDERABAD, INDIA</GlowText>
            <br />
            <br />
            <div style={{ borderTop: '1px solid #00ff9d', paddingTop: '15px' }}>
              <p style={{ fontSize: '12px', marginBottom: '15px' }}>
                Full Stack Developer & AI/ML Engineer building the future at the intersection of
                Web3, AI, and clean code.
              </p>
              <StatBar label="FRONTEND" value={85} />
              <StatBar label="BACKEND" value={90} />
              <StatBar label="AI/ML" value={82} />
              <StatBar label="BLOCKCHAIN" value={78} />
              <StatBar label="HACKATHONS" value={100} />
            </div>
          </div>
        </TerminalBox>

        {/* Right: Bio and education */}
        <div>
          <div
            style={{
              marginBottom: '40px',
              lineHeight: '1.8',
              color: '#e8ffe8',
              fontSize: '14px',
              animation: 'slide-in-left 0.8s ease-out 0.3s both',
            }}
          >
            <p style={{ marginBottom: '20px' }}>
              Full Stack Developer & AI/ML Engineer with 7 hackathon wins across Monad Blitz,
              National Hackathons, and Web3 competitions. Building cutting-edge applications in
              blockchain, frontend, and AI/ML.
            </p>
            <p style={{ marginBottom: '20px' }}>
              Microsoft Learn Student Ambassador • IIT Ropar AI Minor • Creator of developer
              communities with 500+ members.
            </p>
          </div>

          <TerminalBox title="📚 Education">
            <div style={{ fontSize: '12px', lineHeight: '2' }}>
              <div
                style={{
                  marginBottom: '15px',
                  paddingBottom: '15px',
                  borderBottom: '1px solid #00ff9d40',
                }}
              >
                <div style={{ color: '#00ff9d', fontWeight: 'bold' }}>IIT Ropar</div>
                <div style={{ color: '#ffb800', fontSize: '11px' }}>AI/ML Minor • 2023-2025</div>
              </div>
              <div
                style={{
                  marginBottom: '15px',
                  paddingBottom: '15px',
                  borderBottom: '1px solid #00ff9d40',
                }}
              >
                <div style={{ color: '#00ff9d', fontWeight: 'bold' }}>Microsoft Azure Training</div>
                <div style={{ color: '#ffb800', fontSize: '11px' }}>Cloud Computing • 2024</div>
              </div>
              <div>
                <div style={{ color: '#00ff9d', fontWeight: 'bold' }}>Oracle Certifications</div>
                <div style={{ color: '#ffb800', fontSize: '11px' }}>Data Science & Cloud • 2024</div>
              </div>
            </div>
          </TerminalBox>
        </div>
      </div>
    </section>
  );
}
