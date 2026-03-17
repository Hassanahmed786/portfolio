import { Canvas } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = (clock.getElapsedTime() * 2) % 10;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[200, 60, '#00ff9d', '#003d28']}
      position={[0, -4, -20]}
      rotation={[0, 0, 0]}
    />
  );
}

function FloatingCube({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * speed * 0.5;
      meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        wireframe
      />
    </mesh>
  );
}

function FloatingOctahedron({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * speed * 0.4;
      meshRef.current.rotation.z = clock.getElapsedTime() * speed * 0.6;
      meshRef.current.position.y = position[1] + Math.cos(clock.getElapsedTime() * speed * 0.7) * 0.6;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.5]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        wireframe
      />
    </mesh>
  );
}

function FloatingTorus({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * speed * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed * 0.9 + 1) * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.4, 0.15, 8, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.7}
        wireframe
      />
    </mesh>
  );
}

function SceneContent() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 0]} color="#00ff9d" intensity={3} distance={30} />
      <pointLight position={[-10, 3, -10]} color="#a855f7" intensity={2} distance={25} />
      <pointLight position={[10, 3, -10]} color="#00b4ff" intensity={2} distance={25} />

      {/* Grid floor - infinite perspective */}
      <GridFloor />

      {/* Stars */}
      <Stars radius={100} depth={60} count={3000} factor={4} saturation={0} fade speed={1} />

      {/* Floating geometry */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
        <FloatingCube position={[-5, 2, -8]} color="#00ff9d" speed={0.8} />
      </Float>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <FloatingOctahedron position={[5, 1, -10]} color="#a855f7" speed={1.2} />
      </Float>
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
        <FloatingTorus position={[-7, -1, -12]} color="#00b4ff" speed={0.6} />
      </Float>
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.2}>
        <FloatingCube position={[7, 3, -9]} color="#f59e0b" speed={1.1} />
      </Float>
      <Float speed={1.4} rotationIntensity={0.9} floatIntensity={1}>
        <FloatingOctahedron position={[3, -2, -14]} color="#ff2d55" speed={0.9} />
      </Float>
      <Float speed={2.2} rotationIntensity={1.4} floatIntensity={1.8}>
        <FloatingTorus position={[-3, 4, -11]} color="#00ff9d" speed={1.4} />
      </Float>

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={1.5}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.002, 0.002)}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette eskil={false} offset={0.35} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      id="r3f-canvas"
      className="fixed inset-0 z-0"
      style={{ background: '#060608' }}
      camera={{ position: [0, 2, 8], fov: 60 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
    >
      <SceneContent />
    </Canvas>
  );
}
