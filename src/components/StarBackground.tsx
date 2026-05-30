"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const STARFIELD = {
  distantStarCount: 1300,
  brightStarCount: 140,
  redDustCount: 220,
  width: 30,
  height: 17,
  depth: 14,
  distantStarSize: 0.014,
  brightStarSize: 0.026,
  redDustSize: 0.03,
  distantStarOpacity: 0.42,
  brightStarOpacity: 0.62,
  redDustOpacity: 0.18
};

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function makeParticlePositions(count: number, seed: number, spreadX = STARFIELD.width, spreadY = STARFIELD.height) {
  const random = seededRandom(seed);
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < positions.length; i += 3) {
    positions[i] = (random() - 0.5) * spreadX;
    positions[i + 1] = (random() - 0.5) * spreadY;
    positions[i + 2] = -random() * STARFIELD.depth;
  }

  return positions;
}

function ParticleField() {
  const distantRef = useRef<THREE.Points>(null);
  const brightRef = useRef<THREE.Points>(null);
  const redDustRef = useRef<THREE.Points>(null);

  const distantStars = useMemo(() => makeParticlePositions(STARFIELD.distantStarCount, 18), []);
  const brightStars = useMemo(() => makeParticlePositions(STARFIELD.brightStarCount, 42, 24, 13), []);
  const redDust = useMemo(() => makeParticlePositions(STARFIELD.redDustCount, 76, 20, 11), []);

  useFrame((state, delta) => {
    if (distantRef.current) {
      distantRef.current.rotation.y += delta * 0.003;
      distantRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.025) * 0.05;
    }
    if (brightRef.current) {
      brightRef.current.rotation.y -= delta * 0.005;
      brightRef.current.rotation.z += delta * 0.002;
      brightRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.035) * 0.04;
    }
    if (redDustRef.current) {
      redDustRef.current.rotation.z -= delta * 0.006;
      redDustRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.09;
    }
  });

  return (
    <>
      <Points ref={distantRef} positions={distantStars} stride={3}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={STARFIELD.distantStarSize}
          sizeAttenuation
          depthWrite={false}
          opacity={STARFIELD.distantStarOpacity}
        />
      </Points>
      <Points ref={brightRef} positions={brightStars} stride={3}>
        <PointMaterial
          transparent
          color="#eef8ff"
          size={STARFIELD.brightStarSize}
          sizeAttenuation
          depthWrite={false}
          opacity={STARFIELD.brightStarOpacity}
        />
      </Points>
      <Points ref={redDustRef} positions={redDust} stride={3}>
        <PointMaterial
          transparent
          color="#d41422"
          size={STARFIELD.redDustSize}
          sizeAttenuation
          depthWrite={false}
          opacity={STARFIELD.redDustOpacity}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </>
  );
}

export function StarBackground() {
  return (
    <div className="starfield" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 54 }} dpr={[1, 1.4]}>
        <ParticleField />
      </Canvas>
    </div>
  );
}
