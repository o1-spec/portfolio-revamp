"use client";

import { useState, useEffect, useRef } from "react";
import { Folder, Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Integrating Algolia Search with WordPress Multisite",
    description:
      "Building a custom multisite compatible WordPress plugin to build global search with Algolia",
    tech: ["Algolia", "WordPress", "PHP"],
    github: "https://github.com/",
    external: "",
  },
  {
    title: "Time to Have More Fun",
    description:
      "A single page web app for helping me choose where to travel, built with Next.js, Firebase, and Tailwind CSS",
    tech: ["Next.js", "Tailwind CSS", "Firebase"],
    github: "https://github.com/",
    external: "https://example.com",
  },
  {
    title: "Building a Headless Mobile App CMS From Scratch",
    description:
      "Find out how we built a custom headless CMS with Node, Express, and Firebase for a project at Upstatement",
    tech: ["Node", "Express", "Firebase", "Vue"],
    github: "",
    external: "https://example.com",
  },
  {
    title: "OctoProfile",
    description:
      "A nicer look at your GitHub profile and repo stats. Includes data visualizations of your top languages, starred repositories, and top repos.",
    tech: ["Next.js", "Chart.js", "GitHub API"],
    github: "https://github.com/",
    external: "https://example.com",
  },
  {
    title: "Google Keep Clone",
    description: "A simple Google Keep clone built with Vue and Firebase.",
    tech: ["Vue", "Firebase", "CSS3"],
    github: "https://github.com/",
    external: "https://example.com",
  },
  {
    title: "Apple Music Embeddable Web Player Widget",
    description:
      "Embeddable web player widget for Apple Music that lets users log in and listen to full songs in the browser.",
    tech: ["Spotify API", "Vue", "Scss"],
    github: "",
    external: "https://example.com",
  },
];

export default function NoteworthyProjects() {
  const [isVisible, setIsVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const sectionRef = useRef(null);

  const displayedProjects = showMore ? projects : projects.slice(0, 6);

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

  return (
    <section
      ref={sectionRef}
      className="py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Other Noteworthy Projects
          </h2>
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-mono text-lg transition-colors duration-300 hover:underline"
          >
            {showMore ? "show less" : "view the archive"}
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-lg p-10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              {/* Header with icons */}
              <div className="flex items-start justify-between mb-6">
                <div className="relative">
                  <Folder
                    className="w-10 h-10 bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 group-hover:text-teal-300 transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md scale-150" />
                </div>

                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-8 h-8" strokeWidth={1.5} />
                    </a>
                  )}
                  {project.external && (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      aria-label="External Link"
                    >
                      <ExternalLink className="w-8 h-8" strokeWidth={1.5} />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Title */}
              <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-colors duration-300 leading-tight">
                {project.title}
              </h3>

              {/* Project Description */}
              <p className="text-slate-400 text-[18px] leading-relaxed mb-6 group-hover:text-slate-300 transition-colors duration-300">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-3 mt-auto">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-slate-400 font-mono text-[16px] hover:text-pink-400 transition-colors duration-300 cursor-default"
                    style={{
                      transitionDelay: `${techIndex * 0.05}s`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 border border-purple-500/0 group-hover:border-purple-500/30 rounded-lg transition-colors duration-300 pointer-events-none" />

              {/* Subtle background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {projects.length > 6 && (
          <div
            className="text-center mt-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s",
            }}
          >
            <button
              onClick={() => setShowMore(!showMore)}
              className="group px-8 py-3 border border-teal-400/50 text-teal-400 rounded-lg font-mono text-sm hover:bg-teal-400/10 hover:border-teal-400 transition-all duration-300 hover:scale-105"
            >
              <span className="group-hover:text-teal-300 transition-colors duration-300">
                {showMore
                  ? "Show Less"
                  : `Show More (${projects.length - 6} more)`}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
