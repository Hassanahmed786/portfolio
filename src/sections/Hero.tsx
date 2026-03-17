import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { GlowText } from '../components/shared';

const techLogos = ['React', 'Python', 'Solidity', 'TypeScript', 'Web3.js', 'TensorFlow', 'AWS', 'PostgreSQL'];

export function HeroSection() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
    // Smooth camera position
    if (camera.position.z > 8.5) {
      camera.position.z -= 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {/* Main text */}
      <Html
        position={[0, 0, 0]}
        center
        scale={1}
        style={{
          pointerEvents: 'none',
          textAlign: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '80px',
              fontFamily: 'var(--font-pixel)',
              color: '#00ff9d',
              textShadow: '0 0 20px #00ff9d, 0 0 40px #00ff9d80',
              margin: '0 0 20px 0',
              letterSpacing: '8px',
            }}
          >
            HASSAN
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#ffb800',
              textShadow: '0 0 10px #ffb800',
              margin: 0,
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Full Stack · AI/ML · Blockchain
          </p>
        </div>
      </Html>

      {/* Orbiting tech logos */}
      {techLogos.map((tech, i) => {
        const angle = (i / techLogos.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <Html
            key={i}
            position={[x, 0.5, z]}
            scale={0.5}
            style={{
              color: '#00ff9d',
              fontSize: '10px',
              fontWeight: 'bold',
              pointerEvents: 'none',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                border: '2px solid #00ff9d',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 255, 157, 0.1)',
                boxShadow: '0 0 10px #00ff9d',
              }}
            >
              {tech}
            </div>
          </Html>
        );
      })}
    </group>
  );
}

export function HeroContent() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            color: '#00ff9d',
            marginBottom: '40px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            animation: 'fade-in 1s ease-out 0.5s both',
          }}
        >
          Welcome to my interactive portfolio
        </div>
        <div
          style={{
            animation: 'bounce 2s infinite 0.8s',
            fontSize: '24px',
            color: '#ffb800',
          }}
        >
          ↓
        </div>
      </div>
    </section>
  );
}
