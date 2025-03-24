"use client";

import * as THREE from "three";
import { Model } from "@/components/Model";
import { ContactShadows, Environment, Html, OrbitControls } from "@react-three/drei";
import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Hotspot } from "@/slices/Hero/Hotspot";
import { WavyPaths } from "@/slices/Hero/WavyPaths";

const INITIAL_CAMERA_POSITION = [1.5, 1, 1.4] as const;



export function InteractiveModel() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <Canvas
        className="min-h-[60rem] w-full"
        camera={{ position: INITIAL_CAMERA_POSITION, fov: 55 }}
      >
        <Suspense>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene() {
  const containerRef = useRef<THREE.Group>(null);
  const originRef = useRef<THREE.Group>(null);

  const [animating, setAnimating] = useState(false);
  const [showHotspot, setShowHotspot] = useState({
    front: true,
    middle: true,
    back: true,
  });

  const { camera } = useThree();

  useEffect(() => {
    if (!containerRef.current || !originRef.current) return;

    // gsap.to(containerRef.current.position, {
    //   x: 0.2,
    //   duration: 3,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: "sine.inOut",
    // });

    gsap.to(originRef.current.rotation, {
      y: Math.PI / 64,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  useEffect(() => {
    camera.lookAt(new THREE.Vector3(-0.2, 0.15, 0));

    setZoom();

    window.addEventListener("resize", setZoom);

    function setZoom() {
      const scale = Math.max(Math.min(1000 / window.innerWidth, 2.2), 1);

      camera.position.x = INITIAL_CAMERA_POSITION[0] * scale;
      camera.position.y = INITIAL_CAMERA_POSITION[1] * scale;
      camera.position.z = INITIAL_CAMERA_POSITION[2] * scale;
    }

    return () => window.removeEventListener("resize", setZoom);
  }, [camera]);

  function onClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();

    const board = containerRef.current;
    const origin = originRef.current;

    if (!board || !origin || animating) return;

    const { name } = event.object;

    setShowHotspot((current) => ({ ...current, [name]: false }));

    if (name === "back") {
      rotateModel(board, { y: Math.PI / 2 });
    } else if (name === "middle") {
      rotateModel(board, { x: Math.PI / 2 });
    } else if (name === "front") {
      rotateModel(board, { y: -Math.PI / 2 });
    }
  }

  function rotateModel(board: THREE.Group, rotation: { [key: string]: number }) {
    setAnimating(true);

    gsap.timeline({
      onComplete: () => {
        setAnimating(false);
        setShowHotspot((current) => ({
          front: true,
          middle: true,
          back: true
        }));
      }
    })
    .to(board.rotation, {
      ...rotation,
      duration: 1,
      ease: "power2.inOut"
    });
  }

  return (
    <group>
      <Environment files={"/hdr/warehouse-256.hdr"} />
      <group ref={originRef}>
        <group ref={containerRef} position={[-0.25, -1, -0.635]}>
          <group position={[0, 0.686, 0.635]} >
            <group scale={[0.17, 0.17, 0.17]}>
            <Model position={[-1, 2.4, -2]} rotation={[-Math.PI/32, Math.PI/1.2, -Math.PI/0.5]}/>
            </group>

            <mesh position={[0, 0.27, 0.9]} name="front" onClick={onClick}>
              <boxGeometry args={[0.6, 0.6, 0.2]} />
              <meshStandardMaterial visible={false} />
            </mesh>

            <mesh position={[0, 0.27, 0]} name="middle" onClick={onClick}>
              <boxGeometry args={[0.6, 0.6, 0.2]} />
              <meshStandardMaterial visible={false} />
            </mesh>

            <mesh position={[0, 0.27, -0.9]} name="back" onClick={onClick}>
              <boxGeometry args={[0.6, 0.6, 0.2]} />
              <meshStandardMaterial visible={false} />
            </mesh>

            <Hotspot
              isVisible={!animating && showHotspot.front}
              position={[0, -1.5, 0.9]}
              color="#c41a7c"
            />
            <Hotspot
              isVisible={!animating && showHotspot.middle}
              position={[0, -1.5, 0]}
              color="#c41a7c"
            />
            <Hotspot
              isVisible={!animating && showHotspot.back}
              position={[0, -1.5, -0.9]}
              color="#c41a7c"
            />
          </group>
        </group>
      </group>
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
      <group
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        position={[0, -1.09, -0.5]}
        scale={[0.2, 0.2, 0.2]}
      >
        <Html
          wrapperClass="pointer-events-none"
          transform
          zIndexRange={[1, 0]}
          occlude="blending"
        >
          <WavyPaths />
        </Html>
      </group>
    </group>
  );
}