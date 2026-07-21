"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const featuredProjects = [
    {
      title: "QueueWatch",
      description:
        "An operational diagnostics and observability platform for background jobs, queues, workers, retries, failures, and dead-letter queues. Built to help engineering teams monitor distributed job systems, detect failures early, and understand worker health in real time.",
      image: "/images/project-5.png",
      tech: [
        "Next.js",
        "NestJS",
        "PostgreSQL",
        "Redis",
        "BullMQ",
        "WebSockets",
        "Docker",
      ],
      github: "https://github.com/o1-spec/queuewatch",
      external: "https://queuewatch-web.vercel.app/",
    },
    {
      title: "Foundry",
      description:
        "A multi-agent command center and telemetry studio for running, tracking, and reviewing AI agent workflows. It provides visibility into agent execution, task progress, retries, logs, cost tracking, and human-in-the-loop review.",
      image: "/images/project-6.png",
      tech: [
        "Next.js",
        "React Flow",
        "TypeScript",
        "AI Agents",
        "Telemetry",
        "Workflow Automation",
      ],
      github: "https://github.com/o1-spec/foundry-ai-platform",
      external: "",
    },
    {
      title: "FileFlow",
      description:
        "A distributed file processing pipeline for handling uploads, background jobs, retries, worker-based processing, and real-time status tracking. Built with queue-based workflows to process files reliably without blocking the main application.",
      image: "/images/file-flow.png",
      tech: [
        "Next.js",
        "Node.js",
        "BullMQ",
        "Redis",
        "PostgreSQL",
        "MinIO",
        "Docker",
      ],
      github: "https://github.com/o1-spec/File-flow",
      external: "https://fileflow-frontend.vercel.app/",
    },
    {
      title: "Rate-Limited API Gateway",
      description:
        "A production-style API gateway that protects backend services using distributed rate limiting. Implements fixed window, sliding window, and token bucket algorithms with Redis-backed counters.",
      image: "/images/api-gateway.png",
      tech: [
        "Node.js",
        "Express",
        "Redis",
        "Lua Scripts",
        "System Design",
        "Distributed Systems",
      ],
      github: "https://github.com/o1-spec/rate-limited-api-gateway",
      external: "",
    },
    {
      title: "Citadela",
      description:
        "An elegant and responsive e-commerce website built for a fictional restaurant. As one of my first projects, it showcases my early work with HTML, CSS, and JavaScript — featuring smooth animations, clean UI, and a fully functional layout designed to highlight dishes and enable orders. The interface remains one of my favorite builds for its simplicity and visual appeal.",
      image: "/images/project-3.png",
      tech: ["HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/",
      external: "https://citadela.netlify.app/",
    },
    {
      title: "PopCorn Movies",
      description:
        "A movie discovery application that helps users find and explore films. Features include advanced search functionality, detailed movie information, user ratings, and personalized recommendations. Built with React and Redux for efficient state management.",
      image: "/images/project-4.png",
      tech: ["React", "Redux", "TMDB API", "Styled Components"],
      github: "https://github.com/o1-spec/Popcorn-movies",
      external: "https://popcorn-movies-black.vercel.app/",
    },
    {
      title: "PneumoDetect AI",
      description:
        "PneumoDetect AI is a healthcare-focused platform designed to support AI-assisted chest X-ray analysis for pneumonia screening workflows. The system includes backend services for managing patient records, scan uploads, authentication, scan history, diagnostic results, and TensorFlow AI inference requests.",
      images: [
        "/images/pneumo-1.png",
        "/images/pneumo-2.png",
        "/images/pneumo-3.png",
        "/images/pneumo-4.png",
        "/images/pneumo-5.png",
        "/images/pneumo-6.png",
      ],
      tech: [
        "NestJS",
        "PostgreSQL",
        "TensorFlow",
        "React Native",
        "REST APIs",
        "AI Integration",
      ],
      github: "https://github.com/o1-spec/PneumoDetect-Backend",
      github2: "https://github.com/o1-spec/PneumoDetect",
      github3: "https://github.com/o1-spec/PneumoDetect-ai-endpoints",
      external: "",
    },
    {
      title: "Marketplace Mobile App",
      description:
        "A mobile marketplace app built with React Native, similar to Jumia, where buyers and sellers can connect to buy and sell goods. Features include real-time messaging between buyers and sellers powered by WebSockets, secure authentication, and a seamless user experience for transactions.",
      images: [
        "/images/Image-1.png",
        "/images/Image-2.png",
        "/images/Image-3.png",
        "/images/Image-4.png",
        "/images/Image-5.png",
      ],
      tech: ["React Native", "Expo", "Next.js Route", "Websockets"],
      github: "https://github.com/o1-spec/react-native-marketplace",
      github2: "https://github.com/o1-spec/marketplace-backend",
      external: "https://expo.dev/@yourusername/your-app",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 xl:pt-40 px-4 sm:px-6 lg:px-8 bg-gray-900"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Responsive Header */}
        <header
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-14 group"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <div className="flex gap-3 sm:gap-4 items-center">
            <div className="relative">
              <Image
                src={"/images/lilith.webp"}
                alt="Projects Icon"
                width={40}
                height={40}
                className="sm:w-[50px] sm:h-[50px] grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
            </div>
            <h2
              id="projects-heading"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300"
            >
              Some Projects I've Built
            </h2>
          </div>
          <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-slate-400/80 to-transparent group-hover:from-purple-400/80 transition-colors duration-500"></div>
        </header>

        {/* Responsive Projects Grid */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-24 xl:space-y-40">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
