"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import globeDots from "@/content/globe-dots.json";

const SCENE_CONTROLS = {
  cameraDistance: 3,
  cameraZoom: 52,
  globeRightOffset: 0.3,
  globeVerticalOffset: -0.02,
  globeScale: 0.6,
  globeTiltBack: -0.36,
  globeTurnRight: -0.54,
  globeLean: 0.12,
  globeRotationSpeed: 0.012,
  surfaceDotSize: 0.017,
  surfaceBrightness: 0.94,
  satelliteSpeedMultiplier: 0.1,
  satelliteSize: 0.01,
  satelliteTrailLength: 14,
  satelliteTrailSpacing: 1,
  satelliteGlowSize: 0.06
};

const CAMERA = {
  position: [0, 0, SCENE_CONTROLS.cameraDistance] as [number, number, number],
  fov: SCENE_CONTROLS.cameraZoom,
  dpr: [1, 1.8] as [number, number]
};

const GLOBE = {
  position: [SCENE_CONTROLS.globeRightOffset, SCENE_CONTROLS.globeVerticalOffset, 0] as [number, number, number],
  rotation: [SCENE_CONTROLS.globeTiltBack, SCENE_CONTROLS.globeTurnRight, SCENE_CONTROLS.globeLean] as [
    number,
    number,
    number
  ],
  scale: SCENE_CONTROLS.globeScale,
  surfaceDotSize: SCENE_CONTROLS.surfaceDotSize,
  surfaceOpacity: SCENE_CONTROLS.surfaceBrightness,
  spinSpeed: SCENE_CONTROLS.globeRotationSpeed
};

const ORBIT_GROUP_ROTATION = [0, 0, 0] as [number, number, number];

const SATELLITE = {
  size: SCENE_CONTROLS.satelliteSize,
  trailCount: SCENE_CONTROLS.satelliteTrailLength,
  glowSize: SCENE_CONTROLS.satelliteGlowSize
};

const SATELLITES = [
  {
    phase: 0.2,
    speed: 0.42 * SCENE_CONTROLS.satelliteSpeedMultiplier,
    color: "#ffffff",
    altitude: 0.08,
    inclination: 28,
    ascendingNode: -18,
    trailGap: 0.045 * SCENE_CONTROLS.satelliteTrailSpacing
  },
  {
    phase: 2.8,
    speed: 0.34 * SCENE_CONTROLS.satelliteSpeedMultiplier,
    color: "#d41422",
    altitude: 0.11,
    inclination: -42,
    ascendingNode: 46,
    trailGap: 0.052 * SCENE_CONTROLS.satelliteTrailSpacing
  },
  {
    phase: 4.4,
    speed: 0.38 * SCENE_CONTROLS.satelliteSpeedMultiplier,
    color: "#ffffff",
    altitude: 0.06,
    inclination: 64,
    ascendingNode: -34,
    trailGap: 0.042 * SCENE_CONTROLS.satelliteTrailSpacing
  }
];

function makeOrbitGeoPoint(t: number, inclination: number, ascendingNode: number) {
  const inclinationRad = THREE.MathUtils.degToRad(inclination);
  const lat = THREE.MathUtils.radToDeg(Math.asin(Math.sin(inclinationRad) * Math.sin(t)));
  const lon =
    ascendingNode +
    THREE.MathUtils.radToDeg(Math.atan2(Math.cos(inclinationRad) * Math.sin(t), Math.cos(t)));

  return { lat, lng: lon };
}

function globeCoordToScenePoint(
  globe: ThreeGlobe,
  t: number,
  altitude: number,
  inclination: number,
  ascendingNode: number
) {
  const { lat, lng } = makeOrbitGeoPoint(t, inclination, ascendingNode);
  const coords = globe.getCoords(lat, lng, altitude);
  const scale = globeDots.radius / globe.getGlobeRadius();

  return new THREE.Vector3(coords.x * scale, coords.y * scale, coords.z * scale);
}

function Satellite({
  phase,
  speed,
  color,
  altitude,
  inclination,
  ascendingNode,
  trailGap = 0.035
}: {
  phase: number;
  speed: number;
  color: string;
  altitude: number;
  inclination: number;
  ascendingNode: number;
  trailGap?: number;
}) {
  const satelliteRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const trailGeometryRefs = useRef<Array<THREE.BufferGeometry | null>>([]);
  const globeHelper = useMemo(() => {
    const helper = new ThreeGlobe({ animateIn: false, waitForGlobeReady: false });
    helper.pauseAnimation();
    return helper;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase;
    const currentPoint = globeCoordToScenePoint(globeHelper, t, altitude, inclination, ascendingNode);
    satelliteRef.current?.position.copy(currentPoint);
    glowRef.current?.position.copy(currentPoint);

    trailGeometryRefs.current.forEach((geometry, index) => {
      if (!geometry) return;
      const start = globeCoordToScenePoint(globeHelper, t - index * trailGap, altitude, inclination, ascendingNode);
      const end = globeCoordToScenePoint(globeHelper, t - (index + 1) * trailGap, altitude, inclination, ascendingNode);
      const position = geometry.attributes.position;
      position.setXYZ(0, start.x, start.y, start.z);
      position.setXYZ(1, end.x, end.y, end.z);
      position.needsUpdate = true;
    });
  });

  return (
    <>
      {Array.from({ length: SATELLITE.trailCount }).map((_, index) => (
        <line key={index}>
          <bufferGeometry
            ref={(node) => {
              trailGeometryRefs.current[index] = node;
            }}
          >
            <bufferAttribute attach="attributes-position" args={[new Float32Array(6), 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color={color}
            transparent
            opacity={(SATELLITE.trailCount - index) / (SATELLITE.trailCount * 1.75)}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </line>
      ))}
      <mesh ref={glowRef}>
        <sphereGeometry args={[SATELLITE.glowSize, 22, 22]} />
        <meshBasicMaterial color={color} transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={satelliteRef}>
        <sphereGeometry args={[SATELLITE.size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </>
  );
}

function DottedEarth() {
  const earthRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    return {
      positions: new Float32Array(globeDots.positions),
      colors: new Float32Array(globeDots.colors)
    };
  }, []);

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * GLOBE.spinSpeed;
    }
  });

  return (
    <points ref={earthRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={GLOBE.surfaceOpacity}
        size={GLOBE.surfaceDotSize}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Globe() {
  return (
    <group position={GLOBE.position} rotation={GLOBE.rotation} scale={GLOBE.scale}>
      <DottedEarth />

      <group rotation={ORBIT_GROUP_ROTATION}>
        {SATELLITES.map((satellite) => (
          <Satellite key={`${satellite.color}-${satellite.phase}`} {...satellite} />
        ))}
      </group>
    </group>
  );
}

export function GlobeScene() {
  return (
    <div className="globe-scene" aria-label="Animated wireframe Earth with satellites">
      <Canvas camera={{ position: CAMERA.position, fov: CAMERA.fov }} dpr={CAMERA.dpr}>
        <ambientLight intensity={0.65} />
        <Globe />
      </Canvas>
    </div>
  );
}
