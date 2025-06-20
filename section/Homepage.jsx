import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import React from "react";
import AboutSection from "@/components/AboutSection";

function Homepage() {
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <HeroSection />
      <AboutSection />
    </div>
  );
}

export default Homepage;
