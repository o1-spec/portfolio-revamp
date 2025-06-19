import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import React from "react";
import AboutSection from "@/components/AboutSection";

function Homepage({ showNextSection }) {
  return (
    <>
      <Nav />
      <HeroSection />
      <AboutSection />
    </>
  );
}

export default Homepage;
