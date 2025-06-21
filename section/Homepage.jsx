"use client"

import Nav from "@/components/Nav"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ContactSection from "@/components/ContactSection"
import ExperienceSection from "@/components/ExperiencesSection"
import CoreValues from "@/components/CoreValues"
import AnimatedBackground from "@/components/WhiteGrid"

function Homepage() {
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <HeroSection />
      <AboutSection />
      {/* <div className="z-200 relative">
        <ProjectsSection />
      </div> */}
      <CoreValues />

      {/* Experience Section with Animated Background */}
        <ExperienceSection />
      {/* <AnimatedBackground>
      </AnimatedBackground> */}

      {/* Contact Section with Animated Background */}
      <AnimatedBackground>
        <ContactSection />
      </AnimatedBackground>
    </div>
  )
}

export default Homepage
