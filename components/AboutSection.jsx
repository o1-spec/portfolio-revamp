"use client"

import Image from "next/image"
import { Zap, Target, Sparkles } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredTech, setHoveredTech] = useState(null)
  const sectionRef = useRef(null)

  const techStacks = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Django",
    "Tailwind CSS",
    "Docker",
    "Three.js",
    "Firebase",
  ]

  const passions = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Applications",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Pixel Perfect Designs",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Delightful UX",
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
    <div
      id="about-section"
      ref={sectionRef}
      className="min-h-screen text-white flex items-center justify-center p-4 relative overflow-hidden"
    >
      <div className="container w-full relative z-10">
        <div className="flex gap-7 items-center">
          <div className="flex flex-col gap-4 basis-[50%]">
            {/* Header with staggered animation */}
            <div
              className={`flex gap-5 items-center transition-all duration-1800 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              <Image
                src="/images/shaka-2.jpg"
                alt="Onadokun Oluwafemi"
                width={40}
                height={40}
                className={`transition-all duration-1200 ease-out ${
                  isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-180"
                }`}
                style={{ transitionDelay: "0.8s" }}
              />
              <span
                className={`font-semibold text-[34px] transition-all duration-1600 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "1.0s" }}
              >
                About Me
              </span>
            </div>

            {/* First paragraph with typewriter effect */}
            <p
              className={`text-[22px] pb-2 transition-all duration-2000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: "1.4s" }}
            >
              Hello! My name is Onadokun Oluwafemi, and I'm passionate about crafting digital experiences that make a
              difference. My journey into software development began in 2022 when I started customizing blog layouts — a
              simple experiment with HTML and CSS that sparked a deeper interest in building for the web.
            </p>

            {/* Second paragraph */}
            <p
              className={`text-[22px] transition-all duration-2000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: "2.0s" }}
            >
              Today, I work at TECHSERVICES, where we build and sell custom applications to businesses. I've contributed
              to the development of a core banking system and a digital banking platform — both built to deliver secure
              and scalable solutions for financial institutions. Outside of coding, I enjoy reading books, exploring
              technical documentation, and strengthening my problem-solving skills through data structures and
              algorithms.
            </p>

            {/* Passion cards with staggered entrance */}
            <div className="flex gap-4 pt-4">
              {passions.map((passion, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm w-[200px] rounded-xl p-4 py-6 border border-white/10 hover:bg-white/10 transition-all duration-1200 ease-out group hover:scale-105 hover:-translate-y-2 hover:shadow-2xl ${
                    isVisible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-32 rotate-12"
                  }`}
                  style={{
                    transitionDelay: `${2.6 + index * 0.4}s`,
                    transformOrigin: "bottom center",
                  }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:text-purple-400">
                      {passion.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 group-hover:text-white transition-colors duration-300">
                        {passion.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 basis-[50%] pl-10">
            {/* Picture Container with dramatic entrance */}
            <div
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex justify-center transition-all duration-2200 ease-out ${
                isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-45"
              }`}
              style={{ transitionDelay: "0.8s" }}
            >
              <div className="relative group">
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
                    className="rounded-lg object-cover w-full h-[400px] grayscale group-hover:grayscale-0 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-all duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Floating badge with bounce animation */}
                <div
                  className={`absolute -bottom-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 border-2 border-white/20 group-hover:-translate-y-2 transition-all duration-500 ease-out ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                  style={{
                    transitionDelay: "3.8s",
                    animation: isVisible ? "bounce 2s ease-in-out infinite 4.5s" : "none",
                  }}
                >
                  <span className="text-xl">💻</span>
                </div>
              </div>
            </div>

            {/* Tech Arsenal with enhanced animations */}
            <div
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-1800 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
              }`}
              style={{ transitionDelay: "2.4s" }}
            >
              <h3
                className={`text-2xl font-bold mb-4 text-white transition-all duration-1400 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
                }`}
                style={{ transitionDelay: "2.8s" }}
              >
                Tech Arsenal
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStacks.map((tech, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-[17px] border cursor-pointer transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:bg-white/20 hover:border-purple-400 hover:text-purple-300 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    } ${
                      hoveredTech === index
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400 text-purple-300 scale-110 -translate-y-1 shadow-lg"
                        : "hover:bg-white/10"
                    }`}
                    style={{
                      transitionDelay: `${3.2 + index * 0.15}s`,
                      animation: hoveredTech === index ? "pulse 0.6s ease-in-out" : "none",
                    }}
                    onMouseEnter={() => setHoveredTech(index)}
                    onMouseLeave={() => setHoveredTech(null)}
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
          0%, 20%, 50%, 80%, 100% {
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
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  )
}
