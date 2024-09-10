"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from '../CanvasLoader';
import { angleToRadians } from "../../utils/angleToRadians";
import Snowlayout from "@/components/models/Colourd_scene";

const SchoolCanvas = () => {
    return (
        <mesh>
            <Environment files="/preset/venice_sunset_1k.hdr" />
            <hemisphereLight intensity={0.15} groundColor="red" />
            <pointLight intensity={1} />
            <Snowlayout scale={3} rotation={[-angleToRadians(7.8), angleToRadians(200), 0]} position={[0.05, -0.22, 0]} />
        </mesh>
    );
}

const SchoolCav = () => {
    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [0, 0, -0.5]}}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 3}
                    minPolarAngle={Math.PI / 3}
                    minAzimuthAngle={angleToRadians(150)}
                    maxAzimuthAngle={angleToRadians(210)}
                />
                <SchoolCanvas />
            </Suspense>
            <Preload all />
        </Canvas>
    );
}

export default SchoolCav;
