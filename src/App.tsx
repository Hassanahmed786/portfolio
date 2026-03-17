import { useEffect, useRef, useState } from 'react';
import { Scene } from './canvas/Scene';
import { Loader } from './sections/Loader';
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
  const [activeSection, setActiveSection] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

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
    };
  }, []);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const handleSectionClick = (index: number) => {
    const element = sectionRefs.current[index];
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        duration: 1.5,
      });
    }
  };

  // Custom cursor trail
  useEffect(() => {
    const trail: { x: number; y: number }[] = [];
    const trailLength = 5;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      trail.push({ x, y });
      if (trail.length > trailLength) trail.shift();

      // Create cursor element
      const cursorEl = document.querySelector('.cursor');
      if (cursorEl) {
        (cursorEl as HTMLElement).style.left = `${x}px`;
        (cursorEl as HTMLElement).style.top = `${y}px`;
      }

      // Create trail dots
      trail.forEach((point, index) => {
        const opacity = (index + 1) / trailLength;
        const trailDot = document.createElement('div');
        trailDot.className = 'cursor-trail';
        trailDot.style.left = `${point.x}px`;
        trailDot.style.top = `${point.y}px`;
        trailDot.style.opacity = opacity.toString();
        document.body.appendChild(trailDot);

        setTimeout(() => trailDot.remove(), 200);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ background: '#060608', color: '#e8ffe8' }}>
      {/* Canvas background */}
      <Scene />

      {/* Loading screen */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

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

      {/* Content sections */}
      {loaded && (
        <div style={{ position: 'relative', zIndex: 5 }}>
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
        </div>
      )}
    </div>
  );
}
