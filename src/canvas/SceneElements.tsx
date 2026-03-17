import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Temporary vectors (reused, not recreated in useFrame)
const _tempV = new THREE.Vector3();

export function GridFloor() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.z -= 0.05;
      if (meshRef.current.position.z < -50) {
        meshRef.current.position.z = 50;
      }
    }
  });

  return (
    <group ref={meshRef}>
      <gridHelper args={[100, 100, 0x00ff9d, 0x004d33]} />
    </group>
  );
}

export function ParticleField({ count = 2000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positionAttribute = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return positions;
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positionAttribute, 3));
    return geo;
  }, [positionAttribute]);

  let frameCount = 0;
  useFrame((state) => {
    if (pointsRef.current) {
      frameCount++;
      if (frameCount % 3 !== 0) return;
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.1}
        color={0x00ff9d}
        sizeAttenuation
        transparent
        opacity={0.5}
      />
    </points>
  );
}

export function FloatingGeometry({ count = 12 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Precompute geometries once
  const geometries = useMemo(
    () => [
      new THREE.IcosahedronGeometry(0.5, 3),
      new THREE.TorusKnotGeometry(0.5, 0.2, 50, 8),
      new THREE.OctahedronGeometry(0.5, 1),
      new THREE.DodecahedronGeometry(0.5, 0),
    ],
    []
  );

  const colors = [0x00ff9d, 0xffb800, 0xffffff, 0xaa00ff];
  const emissives = [0x003a1f, 0x664400, 0x333333, 0x440055];

  // Track mouse for magnetic repulsion
  useMemo(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  let frameCount = 0;
  useFrame((state) => {
    if (!groupRef.current) return;
    frameCount++;
    if (frameCount % 2 !== 0) return;

    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      
      // Use delta-time for smooth animation
      const delta = state.clock.getDelta();
      mesh.rotation.x += delta * 0.5;
      mesh.rotation.y += delta * 0.7;

      // Floating motion
      const freq = 0.3 + (i % 4) * 0.2;
      const offset = (i / 4) * Math.PI * 2;
      mesh.position.y += Math.sin(state.clock.elapsedTime * freq + offset) * 0.002;

      // Mouse magnetic repulsion
      const screenX = mousePosRef.current.x;
      const screenY = mousePosRef.current.y;
      const canvasW = window.innerWidth;
      const canvasH = window.innerHeight;

      // Convert screen coords to world coords (approximate)
      const worldMouseX = ((screenX / canvasW) - 0.5) * 50;
      const worldMouseY = -((screenY / canvasH) - 0.5) * 25;

      const dx = mesh.position.x - worldMouseX;
      const dy = mesh.position.y - worldMouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 5 && dist > 0) {
        const force = (5 - dist) * 0.08;
        _tempV.set(
          (dx / dist) * force,
          (dy / dist) * force,
          0
        );
        mesh.position.add(_tempV);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => {
        const geom = geometries[i % geometries.length];
        const color = colors[i % colors.length];
        const emissive = emissives[i % emissives.length];
        const x = (Math.random() - 0.5) * 40;
        const y = Math.random() * 13 - 5;
        const z = (Math.random() - 0.5) * 40;

        return (
          <mesh key={i} geometry={geom} position={[x, y, z]}>
            <meshStandardMaterial
              color={color}
              emissive={emissive}
              emissiveIntensity={0.5}
              wireframe={i % 2 === 0}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

