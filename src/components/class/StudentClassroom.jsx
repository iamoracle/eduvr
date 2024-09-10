"use client";
import { CameraControls, Environment, Html, Preload } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Students } from "@/components/class/Students";
import { Teacher } from "../Teacher";
import { degToRad } from "three/src/math/MathUtils";
import { NavbarStudent } from "./NavStudent";
import { StudentBoard } from "./StudentBoard";
import ClassRooomStructure from "@/components/class/ClassStructure";
import CanvasLoader from "../CanvasLoader";
import { Suspense, useState, useEffect } from "react";
import { Toaster } from "sonner";
import Image from "next/image";

const IntroOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null; // Don't render anything if not visible
  }

  return (
    <div className="__intro fixed top-0 left-0 w-full h-full bg-black/70 z-50 flex justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="max-w-md text-center flex flex-col items-center px-12">
          <Image
            src="/icon/camera_panning.png"
            width={300}
            height={300}
            alt="camera panning"
            className="w-24 h-24 object-contain opacity-60"
          />
          <p className="text-slate-400 text-xl mt-2">
            You are in a 3D view, you can pan the camera left, right, up, down,
            zoom in, and zoom out.
          </p>
        </div>
      </div>
    </div>
  );
};

const Classroom = ({ sessionId }) => {
  const Camerapositions = [
    [-3.2, 0, 0.55],
    [-1.6, 0, 0.55],
    [-0.04, 0, 0.55],
    [1.6, 0, 0.55],
    [3.2, 0, 0.55],
    [3.2, 0, 0.55],
    [-3.2, 0, 2.25],
    [-1.6, 0, 2.25],
    [-0.04, 0, 2.25],
    [1.6, 0, 2.25],
    [3.2, 0, 2.25],
    [3.2, 0, 2.25],
    [-3.2, 0, 4],
    [-1.6, 0, 4],
    [-0.04, 0, 4],
    [1.6, 0, 4],
    [3.2, 0, 4],
    [3.2, 0, 4],
    [-3.2, 0, 5],
    [-1.6, 0, 5],
    [-0.04, 0, 5],
    [1.6, 0, 5],
    [3.2, 0, 5],
    [3.2, 0, 5],
    [-3.2, 0, 30],
    [-1.6, 0, 6],
    [-0.04, 0, 6],
    [1.6, 0, 6],
    [3.2, 0, 6],
    [3.2, 0, 6],
  ];

  const [seatVal, setSeatVal] = useState();

  return (
    <>
      <div className="w-12 z-10 h-full right-10 fixed bottom-0 flex flex-col">
        <NavbarStudent />
      </div>
      <IntroOverlay />
      <Canvas
        camera={{
          position: Camerapositions[seatVal] || [0, 0, 1.55],
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <CameraManager />
          <Environment files="/preset/venice_sunset_1k.hdr" />
          <Students />
          <Html
            position={[-0.0793, 0.175, -3]}
            transform
            distanceFactor={1.25}
            zIndexRange={[0, -1]}
            occlude={false}
            followCamera={false}
          >
            <StudentBoard sessionId={sessionId} />
          </Html>
          <ambientLight intensity={0.8} color="black" />
          <ClassRooomStructure
            position={[4.1, -1.5, -1.5]}
            rotation={[0, Math.PI / 2, 0]}
          />
        </Suspense>
        <Preload all />
      </Canvas>
      <Toaster />
    </>
  );
};

const CameraManager = () => {
  return (
    <CameraControls
      minZoom={1}
      maxZoom={3}
      polarRotateSpeed={-0.3}
      azimuthRotateSpeed={-0.3}
      minPolarAngle={degToRad(70)}
      maxPolarAngle={degToRad(95)}
      minAzimuthAngle={degToRad(-90)}
      maxAzimuthAngle={degToRad(90)}
      mouseButtons={{
        left: 1,
        right: 2,
        wheel: 16,
      }}
      smoothTime={0.1}
    />
  );
};

export default Classroom;
