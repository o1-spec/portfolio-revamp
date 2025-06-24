"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#Experiences", label: "Experiences" },
    { href: "#projects", label: "Projects" },
    { href: "#core-values", label: "Core Values" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-40">
      {/* Thread with subtle swing */}
      <div
        className={`w-0.5 bg-gradient-to-b from-gray-600 to-gray-800 mx-auto transition-all duration-1500 ease-out ${
          isVisible ? "h-10" : "h-0"
        }`}
        style={{
          animation: isVisible ? "threadSwing 4s ease-in-out infinite" : "none",
          transformOrigin: "top center",
        }}
      />

      <div
        className={`bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl px-6 py-3 border border-gray-200 relative transition-all duration-1000 ease-out w-[700px] ${
          isVisible
            ? "translate-y-0 opacity-100 rotate-0"
            : "-translate-y-8 opacity-0 rotate-3"
        }`}
        style={{
          transformOrigin: "top center",
          animation: isVisible ? "navSwing 4s ease-in-out infinite" : "none",
        }}
      >
        {/* Connection point */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-600 shadow-inner" />
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full" />

        <div className="flex items-center justify-between space-x-10">
          <div className="text-xl font-bold text-gray-900 font-mono tracking-wider">
            o1-spec
          </div>

          <div className="flex space-x-8 relative">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                className="relative text-gray-700 font-medium transition-all text-[15px] duration-300 ease-out group overflow-hidden"
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {/* Main text with multiple hover effects */}
                <span className="relative z-10 block transition-all duration-300 ease-out group-hover:text-gray-900 group-hover:scale-105 group-hover:-translate-y-0.5">
                  {link.label}
                </span>

                {/* Animated underline */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />

                {/* Glow effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-md transform scale-0 group-hover:scale-100 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 -z-10" />

                {/* Sliding background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out -z-10" />

                {/* Floating particles effect */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500 ease-out" />
                <div className="absolute -top-0.5 left-1/4 transform -translate-x-1/2 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-3 transition-all duration-700 ease-out" />
                <div className="absolute -top-0.5 right-1/4 transform translate-x-1/2 w-0.5 h-0.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2.5 transition-all duration-600 ease-out" />

                {/* Ripple effect */}
                {hoveredLink === index && (
                  <div className="absolute inset-0 rounded-md border border-blue-300 animate-ping opacity-30" />
                )}

                {/* Text shadow effect */}
                <div className="absolute inset-0 text-gray-900 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm">
                  {link.label}
                </div>
              </Link>
            ))}

            {/* Dynamic background indicator */}
            {hoveredLink !== null && (
              <div
                className="absolute top-0 h-full bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-md transition-all duration-300 ease-out -z-20"
                style={{
                  left: `${hoveredLink * 32 + hoveredLink * 8}px`, // Approximate positioning
                  width: "80px", // Approximate width
                }}
              />
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes navSwing {
          0% {
            transform: rotate(-1.5deg);
          }
          50% {
            transform: rotate(1.5deg);
          }
          100% {
            transform: rotate(-1.5deg);
          }
        }

        @keyframes threadSwing {
          0% {
            transform: rotate(-1.5deg);
          }
          50% {
            transform: rotate(1.5deg);
          }
          100% {
            transform: rotate(-1.5deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float-up {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(-50%);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-12px) translateX(-50%);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.6),
              0 0 30px rgba(147, 51, 234, 0.3);
          }
        }
      `}</style>
    </div>
  );
}
