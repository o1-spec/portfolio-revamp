"use client"; // if using app directory

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import PortfolioLoader from "../components/PortfolioLoader";

// Your Three.js scene component
function Scene() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <PortfolioLoader onComplete={() => setIsLoading(false)} />
      </div>
    );
  }

  return (
    <></>
  );
}
