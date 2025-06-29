"use client"

import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
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
      { threshold: 0.1, rootMargin: "50px" },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleKeyDown = (event, url) => {
    if ((event.key === "Enter" || event.key === " ") && url) {
      event.preventDefault()
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <article
      ref={cardRef}
      className={`relative flex flex-col lg:flex-row items-center mb-12 sm:mb-16 lg:mb-24 xl:mb-32 group ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(50px)",
        transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transitionDelay: `${index * 0.15}s`,
      }}
    >
      {/* Responsive Image Section */}
      <div className={`w-full lg:basis-[60%] relative ${reverse ? "lg:ml-auto" : ""} mb-6 sm:mb-8 lg:mb-0`}>
        <div className="relative overflow-hidden rounded-lg shadow-2xl group-hover:shadow-3xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px] rounded-lg">
            <div className="w-full h-full bg-gray-900 rounded-md"></div>
          </div>

          <div className="relative bg-white overflow-hidden rounded-lg">
            <div
              className={`absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 transition-opacity duration-500 z-10 ${
                isHovered ? "opacity-20" : "opacity-60"
              }`}
            />

            <Image
              src={project.image || "/placeholder.svg?height=400&width=600"}
              alt={`Screenshot of ${project.title} project`}
              width={600}
              height={400}
              className={`object-cover transition-all w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] duration-700 ease-out ${
                isHovered
                  ? `grayscale-0 scale-105 ${
                      reverse ? "lg:translate-x-2 lg:-translate-y-2" : "lg:-translate-x-2 lg:-translate-y-2"
                    }`
                  : "grayscale scale-100"
              }`}
              priority={index < 2}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Responsive Content Section */}
      <div
        className={`w-full lg:w-[45%] lg:absolute z-20 flex flex-col transition-all duration-500 ${
          reverse ? "lg:left-0 lg:items-start text-left" : "lg:right-0 lg:items-end text-left lg:text-right"
        } ${isHovered ? "transform lg:translate-y-[-4px]" : ""}`}
      >
        <p className="text-white/60 font-mono text-xs sm:text-sm mb-2 tracking-wide transition-colors duration-300 group-hover:text-white/80">
          Featured Project
        </p>

        <h3
          className={`text-xl sm:text-2xl lg:text-3xl font-bold text-slate-200 mb-3 sm:mb-4 transition-all duration-300 ${
            isHovered ? "text-white transform scale-105" : "hover:text-white"
          }`}
        >
          {project.external ? (
            <a
              href={project.external}
              target="_blank"
              rel="noopener noreferrer"
              className="group-hover:text-purple-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
              onKeyDown={(e) => handleKeyDown(e, project.external)}
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>

        {/* Responsive description box */}
        <div
          className={`backdrop-blur-md p-4 sm:p-5 lg:p-6 rounded-lg shadow-xl mb-4 sm:mb-6 border transition-all duration-500 ${
            isHovered
              ? "bg-black/40 border-white/20 shadow-2xl transform scale-[1.02] lg:translate-y-[-2px]"
              : "bg-black/40 border-white/20"
          }`}
        >
          <p
            className={`text-gray-300 leading-relaxed text-sm sm:text-base lg:text-[15px] ${
              reverse ? "text-left" : "text-left lg:text-right"
            }`}
          >
            {project.description}
          </p>
        </div>

        {/* Responsive Tech Stack */}
        <ul
          className={`flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 font-mono text-xs sm:text-sm ${
            reverse ? "justify-start" : "justify-start lg:justify-end"
          }`}
        >
          {project.tech.map((tech, index) => (
            <motion.span
              key={index}
              className="px-2 py-1 text-xs sm:text-[14px] text-gray-300 rounded-full border border-gray-700 hover:border-purple-500/50 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </ul>

        {/* Responsive Links */}
        <div className={`flex gap-3 sm:gap-4 ${reverse ? "justify-start" : "justify-start lg:justify-end"}`}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 p-2 rounded-full hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={`View ${project.title} source code on GitHub`}
              onKeyDown={(e) => handleKeyDown(e, project.github)}
            >
              <Github size={18} className="sm:w-5 sm:h-5" />
            </a>
          )}
          {project.external && (
            <a
              href={project.external}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 p-2 rounded-full hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={`Visit ${project.title} live site`}
              onKeyDown={(e) => handleKeyDown(e, project.external)}
            >
              <ExternalLink size={18} className="sm:w-5 sm:h-5" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
