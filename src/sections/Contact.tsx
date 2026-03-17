import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    callsign: '',
    frequency: '',
    channel: '',
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

    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      setTimeout(() => {
        setFormData({ callsign: '', frequency: '', channel: '', message: '' });
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 40px',
        zIndex: 10,
        position: 'relative',
      }}
    >
      <style>{`
        .contact-heading {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(1rem, 4vw, 1.5rem);
          color: #ffb800;
          letter-spacing: 0.2em;
          margin-bottom: 3rem;
          text-align: center;
          text-shadow: 0 0 10px #ffb800;
          position: absolute;
          top: 100px;
        }

        .contact-heading::before {
          content: '> ';
          color: #00ff9d;
        }

        .contact-heading::after {
          content: '.';
          color: #00ff9d;
        }

        .terminal-form {
          max-width: 600px;
          width: 100%;
          background: linear-gradient(135deg, #0d120d 0%, #070b07 100%);
          border: 2px solid #00ff9d;
          border-top-width: 4px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 40px #00ff9d20;
          padding: 2.5rem;
          border-radius: 0.25rem;
        }

        .terminal-log {
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #00ff9d25;
        }

        .log-line {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          color: #00ff9d;
          line-height: 1.6;
          margin-bottom: 0.5rem;
          animation: textReveal 0.6s ease-out forwards;
        }

        @keyframes textReveal {
          from {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
          }
          to {
            opacity: 1;
            clip-path: inset(0 0 0 0);
          }
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          color: #00ff9d;
          font-family: 'Press Start 2P', monospace;
          font-size: 0.6rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: bold;
        }

        .form-input {
          width: 100%;
          padding: 10px 12px;
          background: transparent;
          border: none;
          border-bottom: 2px solid #00ff9d;
          color: #e8ffe8;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          border-bottom-color: #ffb800;
          box-shadow: 0 0 15px #00ff9d50;
        }

        .form-input::placeholder {
          color: #00ff9d66;
        }

        .textarea-input {
          width: 100%;
          padding: 10px 12px;
          background: transparent;
          border: 2px solid #00ff9d25;
          background: rgba(0,255,157,0.02);
          color: #e8ffe8;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.3s ease;
          min-height: 120px;
          resize: vertical;
        }

        .textarea-input:focus {
          border-color: #00ff9d;
          box-shadow: 0 0 15px #00ff9d30;
        }

        .submit-btn {
          width: 100%;
          padding: 0.9rem;
          background: transparent;
          border: 2px solid #00ff9d;
          color: #00ff9d;
          font-family: 'Press Start 2P', monospace;
          font-size: 0.65rem;
          font-weight: bold;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px #00ff9d40;
        }

        .submit-btn:hover:not(:disabled) {
          background: rgba(0,255,157,0.1);
          box-shadow: 0 0 30px #00ff9d;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-message {
          text-align: center;
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .success-title {
          font-family: 'Press Start 2P', monospace;
          font-size: 1rem;
          color: #00ff9d;
          text-shadow: 0 0 20px #00ff9d;
          margin-bottom: 1rem;
          animation: pulse-glow 1s infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px #00ff9d; }
          50% { text-shadow: 0 0 40px #00ff9d, 0 0 60px #00ff9d40; }
        }

        .success-body {
          color: #e8ffe8;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .success-email {
          color: #ffb800;
          font-weight: bold;
        }

        .social-links {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #00ff9d25;
          display: flex;
          justifyContent: 'center';
          gap: 1rem;
          flex-wrap: wrap;
        }

        .social-link {
          color: #00ff9d;
          text-decoration: none;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          font-weight: bold;
          padding: 8px 12px;
          border: 1px solid #00ff9d;
          border-radius: 3px;
          transition: all 0.3s ease;
          box-shadow: 0 0 10px #00ff9d40;
        }

        .social-link:hover {
          box-shadow: 0 0 20px #00ff9d;
          background: rgba(0,255,157,0.1);
        }

        .social-link.linkedin {
          color: #ffb800;
          border-color: #ffb800;
          box-shadow: 0 0 10px #ffb80040;
        }

        .social-link.linkedin:hover {
          box-shadow: 0 0 20px #ffb800;
          background: rgba(255,184,0,0.1);
        }
      `}</style>

      <h2 className="contact-heading">SECURE TRANSMISSION</h2>

      <div className="terminal-form">
        <div className="terminal-log">
          <div className="log-line" style={{ animationDelay: '0s' }}>
            &gt; INITIATING SECURE CONNECTION...
          </div>
          <div className="log-line" style={{ animationDelay: '0.2s' }}>
            &gt; ENCRYPTION: AES-256 ✓
          </div>
          <div className="log-line" style={{ animationDelay: '0.4s' }}>
            &gt; CHANNEL STATUS: READY
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">CALLSIGN:</label>
              <input
                type="text"
                name="callsign"
                value={formData.callsign}
                onChange={handleChange}
                placeholder="Enter your callsign"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">FREQUENCY:</label>
              <input
                type="email"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">CHANNEL:</label>
              <input
                type="text"
                name="channel"
                value={formData.channel}
                onChange={handleChange}
                placeholder="Project, Opportunity, etc."
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">MESSAGE:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message (max 500 chars)..."
                required
                maxLength={500}
                className="textarea-input"
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-btn">
              {isSubmitting ? '📡 TRANSMITTING...' : '▶ TRANSMIT SIGNAL'}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <div className="success-title">✓ TRANSMISSION RECEIVED</div>
            <div className="success-body">
              Thanks for reaching out, <span style={{ color: '#00ff9d' }}>{formData.callsign}</span>!
              <br />
              <br />I'll respond to your message at:
              <br />
              <span className="success-email">{formData.frequency}</span>
              <br />
              <br />Stay awesome! 🚀
            </div>
          </div>
        )}

        <div className="social-links">
          <a
            href="https://github.com/Hassanahmed786"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/hassanahmed786"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link linkedin"
          >
            LINKEDIN
          </a>
          <a
            href="https://twitter.com/hassanahmed786"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            TWITTER
          </a>
        </div>
      </div>
    </section>
  );
}
