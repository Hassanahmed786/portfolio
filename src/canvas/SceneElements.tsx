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

export function ParticleField({ count = 3000 }: { count?: number }) {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const geometry = useMemo(() => new THREE.SphereGeometry(0.015, 4, 4), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x00ff9d,
        transparent: true,
        opacity: 0.3,
      }),
    []
  );

  useFrame((state) => {
    if (!instancedMeshRef.current) return;

    for (let i = 0; i < count; i++) {
      const x = (Math.sin(state.clock.elapsedTime * 0.1 + i * 0.01) * 50) + Math.cos(i * 0.02) * 20;
      const y = Math.sin(state.clock.elapsedTime * 0.05 + i * 0.015) * 30;
      const z = (Math.random() - 0.5) * 200;

      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    }
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[geometry, material, count]}
    />
  );
}

export function FloatingGeometry({ count = 35 }: { count?: number }) {
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

// [NEW 3D #1] DNA HELIX
export function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  const positions = useMemo(() => {
    const helixSpots: [number, number, number][] = [];
    for (let i = 0; i < 80; i++) {
      const angle = (i / 40) * Math.PI * 2;
      const x = Math.cos(angle) * 2;
      const z = Math.sin(angle) * 2;
      const y = -8 + (i / 80) * 6;
      helixSpots.push([x, y, z]);
    }
    return helixSpots;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const delta = state.clock.getDelta();
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={i % 2 === 0 ? 0x00ff9d : 0xffb800} />
        </mesh>
      ))}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          {positions.length > 0 && (
            <primitive
              attach="attributes-position"
              object={new THREE.BufferAttribute(new Float32Array(positions.flat()), 3)}
            />
          )}
        </bufferGeometry>
        <lineBasicMaterial color={0xffffff} opacity={0.3} transparent />
      </lineSegments>
    </group>
  );
}

// [NEW 3D #2] ROTATING WIREFRAME CUBE CAGE
export function WireframeBox() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const delta = state.clock.getDelta();
      groupRef.current.rotation.x += delta * 0.1;
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.z += delta * 0.05;
    }
  });

  const edges = useMemo(() => {
    const geom = new THREE.BoxGeometry(6, 6, 6);
    return new THREE.EdgesGeometry(geom);
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={0x00ff9d} opacity={0.15} transparent />
      </lineSegments>
    </group>
  );
}

// [NEW 3D #3] ICOSAHEDRON WIREFRAME
export function IcosahedronElement() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const delta = state.clock.getDelta();
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      groupRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      groupRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2, 1), []);

  return (
    <group ref={groupRef} position={[0, -22, 0]}>
      <lineSegments>
        <bufferGeometry>
            {geometry && <primitive attach="attributes-position" object={new THREE.BufferAttribute(geometry.attributes.position.array as Float32Array, 3)} />}
        </bufferGeometry>
        <lineBasicMaterial color={0x00aaff} opacity={0.4} transparent />
      </lineSegments>
    </group>
  );
}

// [NEW 3D #4] FLOATING ACHIEVEMENT TROPHIES
export function AchievementTrophies() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const mesh = child as THREE.Mesh;
        const delta = state.clock.getDelta();
        mesh.rotation.y += delta * 0.3;
        const phase = (index / 3) * Math.PI * 2;
        mesh.position.y = -30 + Math.sin(state.clock.elapsedTime * 0.5 + phase) * 0.5;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <group key={i} position={[-2 + i * 2, -30, 0]}>
          <mesh>
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial
              color={0xffb800}
              emissive={0x7a5000}
              emissiveIntensity={0.6}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          <pointLight color={0xffb800} intensity={1} distance={3} />
        </group>
      ))}
    </group>
  );
}

// [NEW 3D #5] TUNNEL / WARP RINGS
export function WarpTunnel() {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => {
        const zPos = -2 - i * 2;
        const radius = 3 - i * 0.275;
        const opacity = 0.5 - i * 0.0625;
        return { zPos, radius, opacity };
      }),
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      const delta = state.clock.getDelta();
      groupRef.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        mesh.rotation.z += delta * 0.1;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, 0, ring.zPos]}>
          <torusGeometry args={[ring.radius, 0.15, 16, 100]} />
          <meshBasicMaterial
            color={0x00ff9d}
            opacity={ring.opacity}
            transparent
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

// [NEW 3D #6] MAGNETIC FIELD LINES
export function MagneticFieldLines() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5 + i * 0.3) * 0.1;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, -42, 0]}>
      {Array.from({ length: 12 }).map((_, i) => {
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-10 + Math.sin(i * 0.5) * 5, 0, 0),
          new THREE.Vector3(0, Math.cos(i * 0.5) * 8, 0),
          new THREE.Vector3(10 - Math.sin(i * 0.5) * 5, 0, 0),
        ]);
        const geometry = new THREE.TubeGeometry(curve, 20, 0.008, 4, false);

        return (
          <mesh key={i} geometry={geometry}>
            <meshBasicMaterial color={0x00ff9d} opacity={0.2} transparent />
          </mesh>
        );
      })}
    </group>
  );
}

// [NEW 3D #7] FLOATING CODE FRAGMENTS (simple version)
export function CodeFragments() {
  const codes = ['{ }', '=>', '//', '[]', '</>', 'fn()', '0x1', 'NFT'];

  return (
    <group>
      {codes.map((_, i) => {
        const x = (Math.random() - 0.5) * 50;
        const y = (Math.random() - 0.5) * 40 - 20;
        const z = (Math.random() - 0.5) * 50;

        return (
          <mesh key={i} position={[x, y, z]}>
            <planeGeometry args={[0.8, 0.4]} />
            <meshBasicMaterial
              color={0x00ff9d}
              opacity={0.3}
              transparent
              wireframe
            />
          </mesh>
        );
      })}
    </group>
  );
}
