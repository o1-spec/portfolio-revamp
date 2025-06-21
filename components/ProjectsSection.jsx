"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import ProjectCard from "./ProjectCard"

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const featuredProjects = [
    {
      title: "Ernext Gadgets",
      description:
        "A comprehensive e-commerce platform for electronics and gadgets. Features include real-time inventory management, secure payment processing, and responsive design. Built with modern web technologies for optimal performance.",
      image: "/images/image-1.png",
      tech: ["Next JS", "Cloudinary", "AppWrite", "Framer Motion", "Redux"],
      github: "https://github.com/",
      external: "https://marketplace.visualstudio.com/items?itemName=brittanychiang.halcyon-theme",
    },
    {
      title: "Chatter",
      description:
        "A modern blogging platform that enables writers to create, share, and discover engaging content. Features include rich text editing, social interactions, real-time notifications, and a clean, distraction-free reading experience.",
      image: "/images/image-2.png",
      tech: ["React", "Firebase", "Context API", "Framer Motion", "TypeScript"],
      github: "https://github.com/o1-spec/Chatter",
      external: "https://chatter-jade.vercel.app/blog/feed",
    },
    {
      title: "Citadela",
      description:
        "A sleek and responsive business website showcasing modern web development practices. Features smooth animations, optimized performance, and cross-browser compatibility. Built with vanilla technologies for maximum efficiency.",
      image: "/images/image-3.png",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/",
      external: "https://citadela.netlify.app/",
    },
    {
      title: "PopCorn Movies",
      description:
        "A movie discovery application that helps users find and explore films. Features include movie search, detailed information, ratings, and personalized recommendations. Built with React and Redux for state management.",
      image: "/images/image-4.png",
      tech: ["React", "Redux"],
      github: "https://github.com/o1-spec/Popcorn-movies",
      external: "https://popcorn-movies-black.vercel.app/",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 pt-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto z-10">
        {/* Enhanced Header */}
        <div
          className="flex items-center gap-5 group"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Image
                src={"/images/lilith.webp"}
                alt="Projects Icon"
                width={50}
                height={50}
                className="grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
            </div>
            <h3 className="text-4xl font-bold text-white group-hover:text-white/90 transition-colors duration-300">
              Some Projects I've Built
            </h3>
          </div>
          <span className="block w-[300px] h-[1px] bg-slate-100/80 group-hover:bg-white transition-colors duration-500"></span>
        </div>

        {/* Projects Grid */}
        <div className="space-y-48 pt-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} reverse={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
