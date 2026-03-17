import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

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

  const positionAttribute = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positionAttribute[i * 3] = (Math.random() - 0.5) * 200;
    positionAttribute[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positionAttribute[i * 3 + 2] = (Math.random() - 0.5) * 200;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positionAttribute, 3));

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <pointsMaterial
        attach="material"
        size={0.1}
        color={0x00ff9d}
        sizeAttenuation
        transparent
        opacity={0.5}
      />
    </points>
  );
}

export function FloatingGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const geometries = [
    new THREE.IcosahedronGeometry(0.5, 4),
    new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16),
    new THREE.OctahedronGeometry(0.5, 2),
    new THREE.DodecahedronGeometry(0.5, 0),
  ];

  const colors = [0x00ff9d, 0xffb800, 0xffffff, 0xaa00ff];
  const emissives = [0x003a1f, 0x664400, 0x333333, 0x440055];

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      mesh.rotation.x += 0.002;
      mesh.rotation.y += 0.003;
      const freq = 0.3 + (i % 4) * 0.2;
      const offset = (i / 4) * Math.PI * 2;
      mesh.position.y += Math.sin(state.clock.elapsedTime * freq + offset) * 0.002;
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 25 }).map((_, i) => {
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
              emissiveIntensity={0.3}
              wireframe={i % 2 === 0}
            />
          </mesh>
        );
      })}
    </group>
  );
}
