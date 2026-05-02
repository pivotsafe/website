"use client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

const texture = {
  matcap: "/matcap.avif",
  skin: "/skin.avif",
  env: "/env.avif",
};

const Cube = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const matcapTexture = useLoader(TextureLoader, texture.matcap);
  const skinTexture = useLoader(TextureLoader, texture.skin);
  const envTexture = useLoader(TextureLoader, texture.env);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.5 * delta;
      mesh.current.rotation.y += 0.5 * delta;
    }
  });

  return (
    <mesh ref={mesh} scale={[1, 1, 1]}>
      <boxGeometry />
      <meshStandardMaterial map={skinTexture} envMap={envTexture} />
    </mesh>
  );
};

function Buckyball() {
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);
  const matcapTexture = useLoader(TextureLoader, texture.matcap);
  const skinTexture = useLoader(TextureLoader, texture.skin);
  const envTexture = useLoader(TextureLoader, texture.env);

  return (
    <>
      <mesh geometry={geometry} scale={0.91}>
        <meshMatcapMaterial matcap={matcapTexture} transparent opacity={0.9} />
      </mesh>

      {/* Single Wireframe Overlay */}
      <mesh geometry={geometry}>
        <meshBasicMaterial wireframe color={"#fd6e1e"} />
      </mesh>
    </>
  );
}

const ShapeThree = () => {
  return (
    <Canvas
      camera={{ position: [0, 3, 5], fov: 35 }}
      style={{ height: "100%", width: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Buckyball />
      <OrbitControls
        autoRotate
        enableDamping
        enablePan={false}
        maxDistance={10}
      />
    </Canvas>
  );
};

export default ShapeThree;
