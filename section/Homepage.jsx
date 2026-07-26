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
import PublicationsSection from "@/components/PublicationsSection";

function Homepage() {
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <HeroSection />
      <div id="about" className="scroll-mt-24">
        <AboutSection />
      </div>
      <div id="Experiences" className="scroll-mt-24">
        <ExperienceSection />
      </div>
      <div id="projects" className="scroll-mt-24">
        <ProjectsSection />
        <NoteworthyProjects />
      </div>
      <div id="publications" className="scroll-mt-24">
        <PublicationsSection />
      </div>
      <div id="core-values" className="scroll-mt-24">
        <CoreValues />
      </div>
      <div id="contact" className="scroll-mt-24">
        <AnimatedBackground>
          <ContactSection />
        </AnimatedBackground>
      </div>
    </div>
  );
}

export default Homepage;
