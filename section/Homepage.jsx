"use client";

import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperiencesSection";
import CoreValues from "@/components/CoreValues";
import AnimatedBackground from "@/components/WhiteGrid";
import ProjectsSection from "@/components/ProjectsSection";
import NoteworthyProjects from "@/components/NoteworthyProjects";

function Homepage() {
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <NoteworthyProjects />
      <AnimatedBackground>
        <CoreValues />
      </AnimatedBackground>
      <AnimatedBackground>
        <ContactSection />
      </AnimatedBackground>
    </div>
  );
}

export default Homepage;
