import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fields = [
  { key: 'name', prompt: '> CALLSIGN', placeholder: 'Your Name' },
  { key: 'email', prompt: '> TRANSMIT_TO', placeholder: 'your@email.com', type: 'email' },
  { key: 'message', prompt: '> MESSAGE_BODY', placeholder: 'Type your message...', textarea: true },
];

const socials = [
  { label: 'GITHUB', icon: '⌨', url: 'https://github.com/Hassanahmed786', color: '#00ff9d' },
  { label: 'LINKEDIN', icon: '🔗', url: 'https://linkedin.com/in/hassan-ahmed-3b5ba5283', color: '#00b4ff' },
  { label: 'EMAIL', icon: '📡', url: 'mailto:ahmedshaikhassan@gmail.com', color: '#a855f7' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [transmitting, setTransmitting] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      terminalRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
      }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTransmitting(true);
    setTimeout(() => {
      setTransmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <section ref={sectionRef} className="section flex-col px-4 py-24">
      <div className="text-center mb-16 z-10">
        <div
          className="font-pixel inline-block mb-4 px-4 py-1"
          style={{ fontSize: 'clamp(7px, 1vw, 10px)', color: '#00ff9d', border: '1px solid rgba(0,255,157,0.3)', letterSpacing: '0.3em' }}
        >
          // OPEN_CHANNEL
        </div>
        <h2
          className="font-pixel"
          style={{ fontSize: 'clamp(18px, 4vw, 40px)', color: '#00ff9d', textShadow: '0 0 20px rgba(0,255,157,0.5)' }}
        >
          CONTACT
        </h2>
        <div className="font-mono mt-2" style={{ fontSize: '12px', color: 'rgba(0,255,157,0.5)' }}>
          INITIATE TRANSMISSION — ALL CHANNELS OPEN
        </div>
      </div>

      <div
        ref={terminalRef}
        className="relative z-10 w-full max-w-2xl mx-auto"
        style={{ opacity: 1 }}
      >
        {/* Terminal window */}
        <div
          className="relative"
          style={{
            background: '#080a0e',
            border: '1px solid rgba(0,255,157,0.4)',
            boxShadow: '0 0 40px rgba(0,255,157,0.1)',
          }}
        >
          {/* Terminal title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: '1px solid rgba(0,255,157,0.2)', background: 'rgba(0,255,157,0.05)' }}
          >
            <div className="flex gap-1.5">
              {['#ff5f56', '#ffbd2e', '#27c93f'].map((c, i) => (
                <div key={i} className="rounded-full" style={{ width: 10, height: 10, background: c }} />
              ))}
            </div>
            <span className="font-mono mx-auto" style={{ fontSize: '11px', color: 'rgba(0,255,157,0.6)' }}>
              hassan@terminal:~ — transmission.sh
            </span>
          </div>

          <div className="p-6 md:p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* System banner */}
                <div className="font-mono" style={{ fontSize: '11px', color: 'rgba(0,255,157,0.5)' }}>
                  <div>HASSAN COMMS SYSTEM v2.0.25</div>
                  <div>Secure channel established. Type your message below.</div>
                  <div className="mt-1 cursor">_</div>
                </div>

                {fields.map(field => (
                  <div key={field.key}>
                    <div className="font-mono mb-1" style={{ fontSize: '12px', color: '#00ff9d' }}>
                      {field.prompt}:
                    </div>
                    {field.textarea ? (
                      <textarea
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        rows={4}
                        required
                        className="w-full font-mono resize-none"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid rgba(0,255,157,0.4)',
                          color: '#00ff9d',
                          fontSize: '13px',
                          outline: 'none',
                          padding: '8px 0',
                        }}
                      />
                    ) : (
                      <input
                        type={field.type || 'text'}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        required
                        className="w-full font-mono"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid rgba(0,255,157,0.4)',
                          color: '#00ff9d',
                          fontSize: '13px',
                          outline: 'none',
                          padding: '8px 0',
                        }}
                      />
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={transmitting}
                  className="w-full font-pixel py-4 transition-all"
                  style={{
                    fontSize: '10px',
                    background: transmitting ? 'rgba(0,255,157,0.2)' : 'rgba(0,255,157,0.1)',
                    border: '1px solid #00ff9d',
                    color: '#00ff9d',
                    textShadow: '0 0 10px #00ff9d',
                    boxShadow: '0 0 15px rgba(0,255,157,0.2)',
                    cursor: transmitting ? 'wait' : 'pointer',
                    letterSpacing: '0.2em',
                  }}
                >
                  {transmitting ? '> TRANSMITTING... ▓▓▓▓▓▓░░░░' : '> SEND_TRANSMISSION [ENTER]'}
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="font-pixel mb-4" style={{ fontSize: '30px', color: '#00ff9d' }}>✓</div>
                <div className="font-pixel mb-2" style={{ fontSize: '12px', color: '#00ff9d' }}>
                  TRANSMISSION RECEIVED
                </div>
                <div className="font-mono" style={{ fontSize: '12px', color: 'rgba(0,255,157,0.6)' }}>
                  Message delivered. Hassan will respond on next boot cycle.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-6 mt-8">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group no-underline"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 48, height: 48,
                  border: `1px solid ${s.color}50`,
                  background: `${s.color}10`,
                  fontSize: 22,
                  transition: 'all 0.3s',
                  boxShadow: `0 0 0px ${s.color}`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 15px ${s.color}60`;
                  (e.currentTarget as HTMLDivElement).style.border = `1px solid ${s.color}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0px ${s.color}`;
                  (e.currentTarget as HTMLDivElement).style.border = `1px solid ${s.color}50`;
                }}
              >
                {s.icon}
              </div>
              <span className="font-pixel" style={{ fontSize: '7px', color: s.color, letterSpacing: '0.1em' }}>
                {s.label}
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-10 font-mono" style={{ fontSize: '11px', color: 'rgba(0,255,157,0.3)' }}>
          © 2025 SHAIK HASSAN AHMED · BUILT WITH ⚡ · hassanahmed.works
        </div>
      </div>
    </section>
  );
}
