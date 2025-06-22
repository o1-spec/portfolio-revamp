"use client"; // if using app directory

import { useState, Suspense } from "react";
import PortfolioLoader from "../components/PortfolioLoader";
import Homepage from "@/section/Homepage";
import CustomCursor from "@/components/CustomCursor";
import AnimatedBackground from "@/components/AnimatedBackground";

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
  const [showNextSection, setShowNextSection] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <CustomCursor />
        <PortfolioLoader
          onComplete={() => setIsLoading(false)}
          showNextSection={showNextSection}
          setShowNextSection={setShowNextSection}
        />
      </div>
    );
  }

  return (
    <>
      {showNextSection && (
        <>
          {/* <CustomCursor /> */}
          <AnimatedBackground type="neural" />
          <Homepage showNextSection={showNextSection} />
        </>
      )}
    </>
  );
}
