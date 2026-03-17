import { useState } from 'react';
import { TerminalBox } from '../components/shared';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    margin: '8px 0',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid #00ff9d',
    color: '#e8ffe8',
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: 'none',
  };

  return (
    <section
      id="contact"
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
      <TerminalBox title="📡 SECURE TRANSMISSION" style={{ maxWidth: '500px', width: '100%' }}>
        <div
          style={{
            marginBottom: '20px',
            color: '#00ff9d',
            fontSize: '12px',
            lineHeight: '1.6',
          }}
        >
          <div>{`> INITIATING CONNECTION TO HASSAN.WORKS...`}</div>
          <div>{`> ENCRYPTION: AES-256 ✓`}</div>
          <div>&nbsp;</div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  color: '#00ff9d',
                  fontSize: '11px',
                  marginBottom: '5px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                CALLSIGN:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                style={inputStyle}
                onFocus={(e) => {
                  (e.target as HTMLElement).style.boxShadow = '0 0 12px #00ff9d';
                }}
                onBlur={(e) => {
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  color: '#00ff9d',
                  fontSize: '11px',
                  marginBottom: '5px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                FREQUENCY:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                style={inputStyle}
                onFocus={(e) => {
                  (e.target as HTMLElement).style.boxShadow = '0 0 12px #00ff9d';
                }}
                onBlur={(e) => {
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  color: '#00ff9d',
                  fontSize: '11px',
                  marginBottom: '5px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                MESSAGE:
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message..."
                required
                rows={4}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: '100px',
                }}
                onFocus={(e) => {
                  (e.target as HTMLElement).style.boxShadow = '0 0 12px #00ff9d';
                }}
                onBlur={(e) => {
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '12px',
                background: isSubmitting ? 'rgba(0, 255, 157, 0.2)' : 'transparent',
                border: '2px solid #00ff9d',
                color: '#00ff9d',
                fontFamily: 'var(--font-mono)',
                fontWeight: 'bold',
                fontSize: '12px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 10px #00ff9d40',
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px #00ff9d';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0, 255, 157, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 10px #00ff9d40';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              {isSubmitting ? '📡 TRANSMITTING...' : '▶ TRANSMIT'}
            </button>
          </form>
        ) : (
          <div
            style={{
              textAlign: 'center',
              animation: 'fade-in 0.6s ease-out',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                color: '#00ff9d',
                marginBottom: '15px',
                textShadow: '0 0 20px #00ff9d',
                animation: 'pulse-glow 1s infinite',
              }}
            >
              ✓ TRANSMISSION RECEIVED
            </div>
            <p
              style={{
                color: '#ffb800',
                fontSize: '12px',
                marginBottom: '20px',
              }}
            >
              Thank you for reaching out, {formData.name}!
            </p>
            <p style={{ color: '#e8ffe8', fontSize: '11px' }}>
              I'll get back to you at<br />
              <span style={{ color: '#00ff9d' }}>{formData.email}</span>
              <br />
              soon. Stay awesome! 🚀
            </p>
          </div>
        )}

        {/* Social links */}
        <div
          style={{
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid #00ff9d40',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="https://github.com/Hassanahmed786"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#00ff9d',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 'bold',
              padding: '8px 12px',
              border: '1px solid #00ff9d',
              borderRadius: '3px',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 10px #00ff9d40',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = '0 0 20px #00ff9d';
              el.style.background = 'rgba(0, 255, 157, 0.2)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = '0 0 10px #00ff9d40';
              el.style.background = 'transparent';
            }}
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/hassanahmed786"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#ffb800',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 'bold',
              padding: '8px 12px',
              border: '1px solid #ffb800',
              borderRadius: '3px',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 10px #ffb80040',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = '0 0 20px #ffb800';
              el.style.background = 'rgba(255, 184, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = '0 0 10px #ffb80040';
              el.style.background = 'transparent';
            }}
          >
            LINKEDIN
          </a>
        </div>
      </TerminalBox>
    </section>
  );
}
