import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { GridFloor, ParticleField, FloatingGeometry, DNAHelix, WireframeBox, IcosahedronElement, AchievementTrophies, WarpTunnel, MagneticFieldLines, CodeFragments } from './SceneElements';
import { Suspense } from 'react';
import { Vector2 } from 'three';

export function Scene() {
  const dpr = Math.min(window.devicePixelRatio, 2);
  const showEffects = dpr >= 1.5;

  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 60 }}
      dpr={dpr}
      frameloop="always"
      performance={{ min: 0.5 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <color attach="background" args={['#060608']} />
      <fog attach="fog" args={['#060608', 15, 80]} />

      <ambientLight intensity={0.15} />
      <pointLight position={[0, 10, 0]} intensity={2.5} color="#00ff9d" distance={40} />
      <pointLight position={[15, 5, 10]} intensity={1.2} color="#ffb800" distance={30} />

      <Suspense fallback={null}>
        {/* Core scene elements */}
        <GridFloor />
        <ParticleField count={3000} />
        <FloatingGeometry count={35} />

        {/* New 3D Elements */}
        <DNAHelix />
        <WireframeBox />
        <IcosahedronElement />
        <AchievementTrophies />
        <WarpTunnel />
        <MagneticFieldLines />
        <CodeFragments />

        {/* Post-processing - conditional on DPR */}
        {showEffects ? (
          <EffectComposer multisampling={0}>
            <Bloom luminanceThreshold={0.15} intensity={1.2} mipmapBlur radius={0.4} />
            <ChromaticAberration offset={new Vector2(0.0008, 0.0008)} />
            <Vignette eskil={false} offset={0.15} darkness={0.9} />
          </EffectComposer>
        ) : (
          <EffectComposer multisampling={0}>
            <Vignette eskil={false} offset={0.15} darkness={0.9} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
