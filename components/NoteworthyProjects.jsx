"use client";

import { useState, useEffect, useRef } from "react";
import { Folder, Github, ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "SocketChat",
    description:
      "A real-time messaging platform built with Socket.IO and WebSockets for persistent chat history, instant message delivery, user presence, and low-latency communication.",
    tech: ["Node.js", "Socket.IO", "Redis", "PostgreSQL", "Express", "React"],
    github: "https://github.com/o1-spec/SocketChat",
    external: "",
  },
  {
    title: "Ernext Gadgets",
    description:
      "A full-featured e-commerce application for a technology gadget hub with product browsing, cart management, checkout, order tracking, and admin product management.",
    tech: ["Next.js", "Appwrite", "Cloudinary", "Redux", "Tailwind CSS"],
    github: "https://github.com/o1-spec/ernext-gadgets",
    external: "https://www.ernextgadgets.ng/",
  },
  {
    title: "Chatter",
    description:
      "A modern interactive blogging platform for writers and readers with rich text editing, social features like likes/comments, and real-time notifications.",
    tech: ["React", "Firebase", "Context API", "Framer Motion", "TypeScript"],
    github: "https://github.com/o1-spec/Chatter",
    external: "https://chatter-jade.vercel.app/blog/feed",
  },
  {
    title: "PDF API",
    description:
      "Building a simple API to convert PDF files to text, images, and more. Built with Python and Django.",
    tech: ["Python", "Django", "HTML / CSS"],
    github: "https://github.com/o1-spec/Pdf-Api",
    external: "",
  },
  {
    title: "Three.js Solar System",
    description:
      "A 3D solar system simulation using Three.js, showcasing planets and their orbits.",
    tech: ["JavaScript", "Three.js", "CSS3"],
    github: "https://github.com/o1-spec/Three-Js-Solar-System/",
    external: "https://o1-spec-three-js-solar-system.vercel.app/",
  },
  {
    title: "Real-Time Messaging Platform",
    description:
      "A full-stack messaging application with real-time communication using WebSockets. Features include instant messaging, typing indicators, and push notifications.",
    tech: ["React", "Node.js", "MongoDB", "WebSockets", "Express"],
    github: "https://github.com/o1-spec/messaging-platform",
    external: "",
  },
  {
    title: "A Logistic Dashboard",
    description:
      "A dashboard for managing logistics and cargo shipments. It includes features for tracking shipments, managing cargo, and viewing shipment history.",
    tech: ["Render", "React", "Node.js", "Jest"],
    github: "https://github.com/o1-spec/Cargo-pulse-logistic-dashboard",
    external: "https://cargo-pulse-logistic-dashboard.vercel.app/",
  },
];

export default function NoteworthyProjects() {
  const [isVisible, setIsVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const sectionRef = useRef(null);

  const initialProjects = projects.slice(0, 6);
  const extraProjects = projects.slice(6);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderProjectCard = (project, index) => (
    <div
      key={project.title || index}
      className="group relative bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20 min-h-[280px] sm:min-h-[320px] flex flex-col w-full"
    >
      {/* Responsive Header with icons */}
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="relative">
          <Folder
            className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 group-hover:text-pink-400 transition-colors duration-300"
            strokeWidth={1.5}
          />
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md scale-150" />
        </div>

        <div className="flex gap-2 sm:gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 p-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
            </a>
          )}
          {project.external && (
            <a
              href={project.external}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 p-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink
                className="w-5 h-5 sm:w-6 sm:h-6"
                strokeWidth={1.5}
              />
            </a>
          )}
        </div>
      </div>

      {/* Responsive Project Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-colors duration-300 leading-tight">
        {project.title}
      </h3>

      {/* Responsive Project Description */}
      <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed mb-4 sm:mb-6 group-hover:text-slate-300 transition-colors duration-300 flex-grow">
        {project.description}
      </p>

      {/* Responsive Tech Stack */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mt-auto">
        {project.tech.map((tech, techIndex) => (
          <span
            key={techIndex}
            className="text-slate-400 font-mono text-xs sm:text-[14px] hover:text-pink-400 transition-colors duration-300 cursor-default px-2 py-1 bg-slate-800/50 rounded border border-slate-700/50 hover:border-pink-400/50"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 border border-purple-500/0 group-hover:border-purple-500/30 rounded-lg sm:rounded-xl transition-colors duration-300 pointer-events-none" />

      {/* Subtle background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl pointer-events-none" />
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-32 xl:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Responsive Header */}
        <div
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-4 leading-tight">
            Other Noteworthy Projects
          </h2>
        </div>

        {/* Responsive Projects Grid - Initial 6 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
          {initialProjects.map((project, index) => (
            <div
              key={project.title}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transitionDelay: `${index * 0.08}s`,
                width: "100%",
              }}
            >
              {renderProjectCard(project, index)}
            </div>
          ))}
        </div>

        {/* Extra Projects with Smooth AnimatePresence Reveal */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-items-center pt-4 sm:pt-6 lg:pt-8">
                {extraProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    className="w-full"
                  >
                    {renderProjectCard(project, index)}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Styled Show More / Show Less Button */}
        {projects.length > 6 && (
          <div
            className="text-center mt-10 sm:mt-14"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s",
            }}
          >
            <button
              onClick={() => setShowMore(!showMore)}
              className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/30 hover:border-purple-500/60 rounded-full text-white font-mono text-sm sm:text-base backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] cursor-pointer"
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 font-semibold transition-colors duration-300">
                {showMore
                  ? "Show Less"
                  : `Show More (${extraProjects.length} more)`}
              </span>
              <ChevronDown
                size={18}
                className={`text-purple-400 group-hover:text-pink-300 transition-transform duration-300 ${
                  showMore ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        )}
      </div>

      {/* Responsive Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
