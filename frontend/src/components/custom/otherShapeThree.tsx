"use client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { easing } from "maath";
import React, { useMemo, useReducer, useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

// Define types for textures
const texture = {
  matcap: "/matcap.avif",
  skin: "/skin.avif",
  env: "/env.avif",
};

// Stable references for Canvas props — creating these inline (e.g.
// `gl={{ antialias: false }}`) on every render triggers an internal R3F 9.x
// reconciliation bug where the renderer state object is momentarily `null`
// when the scene re-renders (e.g. after a click). Hoisting them to module
// scope keeps the same reference identity across renders.
const GL_PROPS = { antialias: false, alpha: true, powerPreference: "high-performance" as const };
const CAMERA_PROPS = { position: [0, 0, 15] as [number, number, number], fov: 35, near: 1, far: 20 };
const DPR: [number, number] = [1, 1.5];

const Buckyball: React.FC = () => {
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.2, 0), []);
  const matcapTexture = useLoader(TextureLoader, texture.matcap);

  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      colliders="hull"
      type="fixed"
      position={[0, 0, 0]}
      //   scale={1.5}
    >
      <mesh geometry={geometry} scale={0.8}>
        <meshMatcapMaterial matcap={matcapTexture} transparent opacity={1} />
      </mesh>

      {/* Single Wireframe Overlay */}
      <mesh geometry={geometry} scale={1}>
        <meshBasicMaterial wireframe color={"#fd6e1e"} />
      </mesh>
    </RigidBody>
  );
};

const OtherShapeThree: React.FC = () => {
  return <Scene style={{ borderRadius: 0 }} />;
};

const accents = ["#9147ff", "#20ffa0", "#ff4060", "#ffcc00"];
const shuffle = (accent: number = 0) => [
  { color: "#9147ff", roughness: 0.1 },
  { color: "#444", roughness: 0.75 },
  { color: "#444", roughness: 0.75 },
  { color: "white", roughness: 0.1 },
  { color: "white", roughness: 0.75 },
  { color: "white", roughness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.75, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true },
];

interface SceneProps {
  style: React.CSSProperties;
}

function Scene(props: SceneProps) {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);
  const connectors = useMemo(() => shuffle(accent), [accent]);

  return (
    <Canvas
      onClick={click}
      shadows
      dpr={DPR}
      gl={GL_PROPS}
      camera={CAMERA_PROPS}
      {...props}
    >
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />

      <Physics gravity={[0, 0, 0]}>
        <Buckyball />
        <Pointer />
        {connectors.map((props, i) => (
          <Connector key={i} {...props} />
        ))}
      </Physics>
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer
            form="circle"
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={8}
          />
        </group>
      </Environment>
    </Canvas>
  );
}

interface ConnectorProps {
  position?: [number, number, number];
  children?: React.ReactNode;
  color?: string;
  scale?: number;
  accent?: boolean;
  vec?: THREE.Vector3;
}

function Connector({
  position,
  children,
  vec = new THREE.Vector3(),
  scale = 1,
  accent,
  ...props
}: ConnectorProps) {
  const api = useRef<any>();
  const pos = useMemo(
    () =>
      position || [Math.random() * 10, Math.random() * 10, Math.random() * 10],
    [position]
  );

  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    api.current?.applyImpulse(
      vec.copy(api.current.translation()).negate().multiplyScalar(0.2)
    );
  });

  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos}
      ref={api}
      colliders={false}
      scale={1}
    >
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />

      {children ? children : <Model {...props} />}

      {accent && (
        <pointLight intensity={4} distance={2.5} color={props.color} />
      )}
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef<any>();
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      )
    );
  });

  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      {/* <BallCollider args={[2]} /> */}
      <CuboidCollider args={[0.5, 0.5, 0.5]} />
    </RigidBody>
  );
}

interface ModelProps {
  children?: React.ReactNode;
  color?: string;
  roughness?: number;
}

function Model({ children, color = "white", roughness = 0 }: ModelProps) {
  const ref = useRef<any>();
  const { nodes, materials }: any = useGLTF("/c-transformed.glb");

  useFrame((state, delta) => {
    easing.dampC(ref.current.material.color, color, 0.2, delta);
  });

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      scale={4}
      geometry={nodes.connector.geometry}
    >
      <meshStandardMaterial
        metalness={0.2}
        roughness={roughness}
        map={materials.base.map}
      />
      {children}
    </mesh>
  );
}

export default OtherShapeThree;
