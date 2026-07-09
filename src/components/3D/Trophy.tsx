"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Wireframe, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// A procedural trophy approximation using primitives for simplicity/reliability
// instead of loading an external GLTF which might not exist or fail.
function TrophyModel() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={group} dispose={null}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        {/* Diamond / Crown part */}
        <mesh position={[0, 1.5, 0]}>
          <octahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.8}
            wireframe={true}
            transparent
            opacity={0.8}
            distort={0.2}
            speed={2}
          />
        </mesh>

        {/* Core glowing sphere */}
        <mesh position={[0, 1.5, 0]}>
           <sphereGeometry args={[0.5, 32, 32]} />
           <meshStandardMaterial color="#bd00ff" emissive="#bd00ff" emissiveIntensity={2} />
        </mesh>

        {/* Base / Stem */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.2, 0.8, 2, 8]} />
          <meshStandardMaterial
            color="#111"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={2}
          />
          <Wireframe thickness={0.02} stroke="#ffd700" />
        </mesh>

        {/* Base Plate */}
        <mesh position={[0, -1.6, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.2, 16]} />
          <meshStandardMaterial
             color="#222"
             metalness={0.8}
             roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Trophy3D() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px] relative pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#bd00ff" />
        <TrophyModel />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
