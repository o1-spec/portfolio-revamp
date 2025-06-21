"use client"

import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export default function ProjectCard({ project, index = 0, reverse = false }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`relative flex items-center mb-20 lg:mb-32 group ${reverse ? "flex-row-reverse" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(50px)",
        transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transitionDelay: `${index * 0.2}s`,
      }}
    >
      {/* Image Section */}
      <div className={`basis-[60%] relative ${reverse ? "ml-auto" : ""}`}>
        <div className="relative overflow-hidden shadow-2xl group-hover:shadow-3xl transition-shadow duration-500">
          {/* Subtle border glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] rounded">
            <div className="w-full h-full bg-black rounded"></div>
          </div>

          <div className="relative bg-white overflow-hidden">
            {/* Overlay for better text contrast */}
            <div
              className={`absolute inset-0 bg-black transition-opacity duration-500 z-10 ${
                isHovered ? "opacity-20" : "opacity-40"
              }`}
            />

            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={600}
              height={450}
              className={`object-cover transition-all w-full h-[400px] duration-500 ease-out ${
                isHovered
                  ? `grayscale-0 scale-105 ${reverse ? "translate-x-3 -translate-y-3" : "-translate-x-3 -translate-y-3"}`
                  : "grayscale scale-100"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div
        className={`absolute z-20 w-[45%] flex flex-col transition-all duration-500 ${
          reverse ? "left-0 items-start" : "right-0 items-end"
        } ${isHovered ? "transform translate-y-[-4px]" : ""}`}
      >
        <p className="text-white/60 font-mono text-[17px] mb-2 tracking-wide transition-colors duration-300 group-hover:text-white/80">
          Featured Project
        </p>

        <h3
          className={`text-3xl lg:text-4xl font-bold text-slate-200 mb-4 transition-all duration-300 ${
            reverse ? "text-left" : "text-right"
          } ${isHovered ? "text-white transform scale-105" : "hover:text-white"}`}
        >
          <a href={project.external} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        </h3>

        {/* Enhanced description box with better contrast */}
        <div
          className={`backdrop-blur-sm p-6 rounded-lg shadow-xl mb-4 border transition-all duration-500 ${
            isHovered
              ? "bg-black/90 border-white/30 shadow-2xl transform scale-[1.02] translate-y-[-2px]"
              : "bg-black/70 border-slate-700/50"
          }`}
        >
          <p className={`text-white/90 leading-relaxed text-[18px] ${reverse ? "text-left" : "text-right"}`}>
            {project.description
              .split(/(Visual Studio Marketplace|Package Control|Atom Package Manager|npm)/)
              .map((part, i) => {
                if (["Visual Studio Marketplace", "Package Control", "Atom Package Manager", "npm"].includes(part)) {
                  return (
                    <span
                      key={i}
                      className="text-white font-semibold hover:text-white/80 transition-colors duration-200"
                    >
                      {part}
                    </span>
                  )
                }
                return part
              })}
          </p>
        </div>

        {/* Tech Stack */}
        <ul className={`flex flex-wrap gap-3 mb-6 font-mono text-sm ${reverse ? "justify-start" : "justify-end"}`}>
          {project.tech.map((tech, i) => (
            <li
              key={i}
              className="text-slate-400 hover:text-white text-[16px] transition-all duration-300 cursor-pointer transform hover:scale-110 hover:-translate-y-1"
              style={{
                transitionDelay: isHovered ? `${i * 0.05}s` : "0s",
              }}
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Links */}
        <div className={`flex gap-4 ${reverse ? "justify-start" : "justify-end"}`}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
              aria-label="GitHub Repository"
            >
              <Github size={25} />
            </a>
          )}
          {project.external && (
            <a
              href={project.external}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
              aria-label="External Link"
            >
              <ExternalLink size={25} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
