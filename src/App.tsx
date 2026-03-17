import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import LoadingScreen from './components/LoadingScreen';
import Scene from './components/Scene';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (loaded) {
      try {
        // Init Lenis smooth scroll
        const lenis = new Lenis({
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
        });
        lenisRef.current = lenis;

        const raf = (time: number) => {
          lenis.raf(time);
          ScrollTrigger.update();
          requestAnimationFrame(raf);
        };
        const rafId = requestAnimationFrame(raf);

        return () => {
          cancelAnimationFrame(rafId);
          lenis.destroy();
        };
      } catch (error) {
        console.error('Lenis initialization failed:', error);
      }
    }
  }, [loaded]);

  const handleLoadComplete = () => {
    setLoaded(true);
  };

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {loaded && (
        <>
          {/* 3D Background Canvas (desktop only) */}
          {!isMobile && <Scene />}

          {/* HTML overlay content */}
          <div className="relative z-20">
            <Navbar />

            {/* Sections */}
            <div id="hero">
              <Hero />
            </div>
            <div id="about">
              <About />
            </div>
            <div id="experience">
              <Experience />
            </div>
            <div id="projects">
              <Projects />
            </div>
            <div id="skills">
              <Skills />
            </div>
            <div id="achievements">
              <Achievements />
            </div>
            <div id="contact">
              <Contact />
            </div>
          </div>
        </>
      )}
    </>
  );
}
