"use client";

import Image from "next/image";
import { Zap, Target, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTech, setHoveredTech] = useState(null);
  const sectionRef = useRef(null);

  const techStacks = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Python",
    "Django",
    "Tailwind CSS",
    "Docker",
    "Three.js",
    "Firebase",
    "Github",
    "React Native",
    "Expo",
  ];

  const passions = [
    {
      icon: <Zap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: "Lightning Fast Applications",
    },
    {
      icon: <Target className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: "Pixel Perfect Designs",
    },
    {
      icon: <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: "Delightful UX",
    },
  ];

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
    <div
      id="about-section"
      ref={sectionRef}
      className="min-h-screen text-white flex items-center justify-center p-4 relative overflow-hidden"
    >
      <div className="max-w-7xl w-full relative z-10">
        {/* Responsive Layout: Stack on mobile, side-by-side on desktop */}
        <div className="flex flex-col lg:flex-row gap-7 items-center">
          {/* Content Section - Full width on mobile, 50% on desktop */}
          <div className="flex flex-col gap-4 sm:gap-6 w-full lg:basis-[50%] order-2 lg:order-1">
            {/* Responsive Header */}
            <div
              className={`flex gap-3 sm:gap-4 lg:gap-5 items-center transition-all duration-1800 ease-out ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              <Image
                src="/images/shaka-2.jpg"
                alt="Onadokun Oluwafemi"
                width={24}
                height={24}
                className={`sm:w-[28px] sm:h-[28px] lg:w-[32px] lg:h-[32px] transition-all duration-1200 ease-out ${
                  isVisible
                    ? "opacity-100 scale-100 rotate-0"
                    : "opacity-0 scale-0 rotate-180"
                }`}
                style={{ transitionDelay: "0.8s" }}
              />
              <span
                className={`font-semibold text-xl sm:text-2xl lg:text-[26px] transition-all duration-1600 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "1.0s" }}
              >
                About Me
              </span>
            </div>

            {/* Responsive Paragraphs */}
            <p
              className={`text-sm sm:text-base lg:text-[17px] pb-2 leading-relaxed transition-all duration-2000 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: "1.4s" }}
            >
              Hello! My name is Onadokun Oluwafemi, and I'm passionate about
              crafting digital experiences that make a difference. My journey
              into software development began in 2022, I have always been
              fascinated by how things work — from the logic behind everyday
              apps to the intelligence powering AI systems. I've always been
              curious about the "why" and "how" behind tech products. This
              curiosity led me to explore the world of software development,
              where I found my passion for creating innovative solutions that
              solve real-world problems.
            </p>

            <p
              className={`text-sm sm:text-base lg:text-[17px] leading-relaxed transition-all duration-2000 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: "2.0s" }}
            >
              Today, I work at TECHSERVICES, where we build and sell custom
              applications to businesses. I've contributed to the development of
              a core banking system and a digital banking platform — both built
              to deliver secure and scalable solutions for financial
              institutions — as well as other applications for industries.
              Outside of coding, I enjoy reading books, exploring technical
              documentation, and strengthening my problem-solving skills through
              data structures and algorithms.
            </p>

            {/* Responsive Passion Cards */}
            <div className="flex gap-4 pt-4 flex-wrap lg:flex-nowrap">
              {passions.map((passion, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm w-[300px] md:w-[200px] rounded-xl p-4 py-4 border border-white/10 hover:bg-white/10 transition-all duration-1200 ease-out group hover:scale-105 hover:-translate-y-2 hover:shadow-2xl ${
                    isVisible
                      ? "opacity-100 translate-y-0 rotate-0"
                      : "opacity-0 translate-y-32 rotate-12"
                  }`}
                  style={{
                    transitionDelay: `${2.6 + index * 0.4}s`,
                    transformOrigin: "bottom center",
                  }}
                >
                  <div className="flex flex-col gap-3 sm:gap-4 text-left">
                    <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:text-purple-400">
                      {passion.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-base sm:text-lg mb-1 group-hover:text-white transition-colors duration-300 leading-tight">
                        {passion.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Section - Full width on mobile, 50% on desktop */}
          <div className="space-y-6 sm:space-y-8 w-full lg:basis-[50%] lg:pl-6 xl:pl-10 order-1 lg:order-2">
            {/* Responsive Picture Container */}
            <div
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 flex justify-center transition-all duration-2200 ease-out ${
                isVisible
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-50 rotate-45"
              }`}
              style={{ transitionDelay: "0.8s" }}
            >
              <div className="relative group max-w-sm w-full">
                {/* Enhanced glow effect */}
                <div
                  className={`absolute inset-0 bg-white/30 rounded-xl blur-xl transition-all duration-1200 ${
                    isVisible ? "opacity-70" : "opacity-0"
                  } group-hover:opacity-100 group-hover:scale-110`}
                  style={{ transitionDelay: "1.6s" }}
                ></div>

                {/* Main image container */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
                  <Image
                    src="/images/femi.jpg"
                    alt="Onadokun Oluwafemi - Full Stack Developer"
                    width={300}
                    height={400}
                    className="rounded-lg object-cover w-full h-[280px] sm:h-[350px] lg:h-[400px] grayscale group-hover:grayscale-0 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-all duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Responsive Floating badge */}
                <div
                  className={`absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 sm:p-3 border-2 border-white/20 group-hover:-translate-y-2 transition-all duration-500 ease-out ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                  style={{
                    transitionDelay: "3.8s",
                    animation: isVisible
                      ? "bounce 2s ease-in-out infinite 4.5s"
                      : "none",
                  }}
                >
                  <span className="text-lg sm:text-xl">💻</span>
                </div>
              </div>
            </div>

            {/* Responsive Tech Arsenal */}
            <div
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 transition-all duration-1800 ease-out ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
              style={{ transitionDelay: "2.4s" }}
            >
              <h3
                className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white transition-all duration-1400 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-10"
                }`}
                style={{ transitionDelay: "2.8s" }}
              >
                Tech Arsenal
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {techStacks.map((tech, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm lg:text-[14px] border cursor-pointer transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:bg-white/20 hover:border-purple-400 hover:text-purple-300 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    } ${
                      hoveredTech === index
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400 text-purple-300 scale-110 -translate-y-1 shadow-lg"
                        : "hover:bg-white/10"
                    }`}
                    style={{
                      transitionDelay: `${3.2 + index * 0.15}s`,
                      animation:
                        hoveredTech === index
                          ? "pulse 0.6s ease-in-out"
                          : "none",
                    }}
                    onMouseEnter={() => setHoveredTech(index)}
                    onMouseLeave={() => setHoveredTech(null)}
                    // Touch-friendly interactions
                    onTouchStart={() => setHoveredTech(index)}
                    onTouchEnd={() =>
                      setTimeout(() => setHoveredTech(null), 1000)
                    }
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
