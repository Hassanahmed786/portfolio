import { useEffect, useRef, useState, Suspense } from 'react';
import { Scene } from './canvas/Scene';
import { Intro } from './components/Intro';
import { HeroContent } from './sections/Hero';
import { AboutSection } from './sections/About';
import { ExperienceSection } from './sections/Experience';
import { ProjectsSection } from './sections/Projects';
import { SkillsSection } from './sections/Skills';
import { AchievementsSection } from './sections/Achievements';
import { ContactSection } from './sections/Contact';
import { CRTOverlay, NavBar } from './components/shared';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = ['HERO', 'ABOUT', 'EXPERIENCE', 'PROJECTS', 'SKILLS', 'ACHIEVEMENTS', 'CONTACT'];

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis and GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4), // quartic ease
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP ticker sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Update active section based on scroll
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const currentSection = Math.floor(scrollPos / windowHeight);
      setActiveSection(Math.min(currentSection, SECTIONS.length - 1));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  // Intro to main transition
  useEffect(() => {
    if (loaded && !introComplete && loaderRef.current && mainContentRef.current) {
      // Fade out loader
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          if (loaderRef.current) {
            loaderRef.current.style.display = 'none';
          }
        },
      });

      // Fade in main content
      gsap.to(mainContentRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });

      setIntroComplete(true);
    }
  }, [loaded, introComplete]);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const handleSectionClick = (index: number) => {
    const element = sectionRefs.current[index];
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        duration: 1.5,
      });
    }
  };

  // Enhanced custom cursor with lag
  useEffect(() => {
    const cursor = document.querySelector('.cursor') as HTMLElement;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create trail dot
      const trailDot = document.createElement('div');
      trailDot.className = 'cursor-trail';
      trailDot.style.left = `${mouseX}px`;
      trailDot.style.top = `${mouseY}px`;
      document.body.appendChild(trailDot);

      setTimeout(() => trailDot.remove(), 200);
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ background: '#060608', color: '#e8ffe8' }}>
      {/* Canvas background - always mounted */}
      <Scene />

      {/* Intro screen */}
      <div
        ref={loaderRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2000,
          opacity: 1,
          pointerEvents: loaded ? 'none' : 'auto',
        }}
      >
        <Intro onComplete={() => setLoaded(true)} />
      </div>

      {/* Custom cursor */}
      <div className="cursor" />

      {/* CRT overlay */}
      <CRTOverlay />

      {/* Navigation */}
      {loaded && (
        <NavBar
          sections={SECTIONS}
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
        />
      )}

      {/* Content sections - preloaded, initially hidden */}
      <div
        ref={mainContentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          opacity: 0,
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        <Suspense fallback={null}>
          <div ref={(el) => {if (el) sectionRefs.current[0] = el;}}>
            <HeroContent />
          </div>
          <div ref={(el) => {if (el) sectionRefs.current[1] = el;}}>
            <AboutSection />
          </div>
          <div ref={(el) => {if (el) sectionRefs.current[2] = el;}}>
            <ExperienceSection />
          </div>
          <div ref={(el) => {if (el) sectionRefs.current[3] = el;}}>
            <ProjectsSection />
          </div>
          <div ref={(el) => {if (el) sectionRefs.current[4] = el;}}>
            <SkillsSection />
          </div>
          <div ref={(el) => {if (el) sectionRefs.current[5] = el;}}>
            <AchievementsSection />
          </div>
          <div ref={(el) => {if (el) sectionRefs.current[6] = el;}}>
            <ContactSection />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
