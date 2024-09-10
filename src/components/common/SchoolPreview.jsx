"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from '@/components/CanvasLoader';
import { angleToRadians } from "@/utils/angleToRadians";
import StructureSchoolPreview from "@/pages/common/ClassStructure";
import { degToRad } from "three/src/math/MathUtils";

const LayoutCanvas = () => {
    return (
        <mesh>
            <Environment files="/preset/venice_sunset_1k.hdr" />
            <hemisphereLight intensity={0.15} groundColor="black" />
            <pointLight intensity={1} />
            <StructureSchoolPreview rotation={[0, -Math.PI / 2, 0]} position={[-4.5, -1.5, -1.5]} />
        </mesh>
    );
}

const SchoolCav = () => {
    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [0, 0, -12]}}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    minZoom={1}
                    maxZoom={3}
                    polarRotateSpeed={-0.3}
                    azimuthRotateSpeed={-0.3}
                    minPolarAngle={degToRad(70)}  
                    maxPolarAngle={degToRad(95)}
                    // minAzimuthAngle={degToRad(-90)} 
                    // maxAzimuthAngle={degToRad(90)}  
                    mouseButtons={{
                        left: 1,
                        right: 2,
                        wheel: 16,
                    }}
                    smoothTime={0.1}
                />
                <LayoutCanvas />
            </Suspense>
            <Preload all />
        </Canvas>
    );
}

export default SchoolCav;
