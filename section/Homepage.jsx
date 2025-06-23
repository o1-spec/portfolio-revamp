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
      <div id="about">
        <AboutSection />
      </div>
      <div id="Experiences">
        <ExperienceSection />
      </div>
      <div id="projects">
        <ProjectsSection />
        <NoteworthyProjects />
      </div>
      <div id="core-values">
        <CoreValues />
      </div>
      <div id="contact">
        <AnimatedBackground>
          <ContactSection />
        </AnimatedBackground>
      </div>
    </div>
  );
}

export default Homepage;
