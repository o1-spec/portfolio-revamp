import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import React from "react";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperiencesSection";
import CoreValues from "@/components/CoreValues";

function Homepage() {
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <HeroSection />
      <AboutSection />
      {/* <div className="z-200 relative">
        <ProjectsSection />
      </div> */}
      <CoreValues/>
      <ExperienceSection/>
      <ContactSection />
    </div>
  );
}

export default Homepage;
