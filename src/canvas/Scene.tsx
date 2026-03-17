import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { GridFloor, ParticleField, FloatingGeometry } from './SceneElements';
import { Suspense } from 'react';

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 60 }}
      gl={{
        antialias: true,
        alpha: true,
        pixelRatio: window.devicePixelRatio,
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <color attach="background" args={['#060608']} />
      <fog attach="fog" args={['#060608', 15, 60]} />

      <ambientLight intensity={0.1} />
      <pointLight position={[0, 10, 0]} intensity={2} color="#00ff9d" />

      <Suspense fallback={null}>
        <GridFloor />
        <ParticleField count={2000} />
        <FloatingGeometry />
      </Suspense>

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={1.5} mipmapBlur />
        <ChromaticAberration offset={[0.002, 0.002]} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  );
}
