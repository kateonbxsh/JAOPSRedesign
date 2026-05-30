"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ParticleField() {
  const fieldRef = useRef<THREE.Points>(null);
  const closeFieldRef = useRef<THREE.Points>(null);

  const distantStars = useMemo(() => {
    const positions = new Float32Array(1800);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 26;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = -Math.random() * 12;
    }
    return positions;
  }, []);

  const redParticles = useMemo(() => {
    const positions = new Float32Array(240);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 18;
      positions[i + 1] = (Math.random() - 0.5) * 11;
      positions[i + 2] = -1 - Math.random() * 7;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (fieldRef.current) {
      fieldRef.current.rotation.y += delta * 0.006;
      fieldRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.08;
    }
    if (closeFieldRef.current) {
      closeFieldRef.current.rotation.z -= delta * 0.012;
      closeFieldRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.035) * 0.06;
    }
  });

  return (
    <>
      <Points ref={fieldRef} positions={distantStars} stride={3}>
        <PointMaterial transparent color="#ffffff" size={0.018} sizeAttenuation depthWrite={false} opacity={0.5} />
      </Points>
      <Points ref={closeFieldRef} positions={redParticles} stride={3}>
        <PointMaterial transparent color="#d41422" size={0.024} sizeAttenuation depthWrite={false} opacity={0.32} />
      </Points>
    </>
  );
}

export function StarBackground() {
  return (
    <div className="starfield" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 54 }} dpr={[1, 1.5]}>
        <ParticleField />
      </Canvas>
    </div>
  );
}
