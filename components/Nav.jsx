"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-40">
      <div
        className={`w-0.5 bg-gradient-to-b from-gray-600 to-gray-800 mx-auto transition-all duration-1500 ease-out ${
          isVisible ? "h-16" : "h-0"
        }`}
      />
      <div
        className={`bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl px-8 py-4 border border-gray-200 relative transition-all duration-1000 ease-out w-[450px] ${
          isVisible
            ? "translate-y-0 opacity-100 rotate-0"
            : "-translate-y-8 opacity-0 rotate-3"
        }`}
        style={{
          transformOrigin: "top center",
        }}
      >
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-600 shadow-inner" />
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full" />

        <div className="flex items-center justify-between space-x-10">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-900 font-mono tracking-wider">
            o1-spec
          </div>

          <div className="flex space-x-8">
            <Link
              href="#about"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium hover:scale-105 transform"
            >
              About
            </Link>
            <Link
              href="#work"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium hover:scale-105 transform"
            >
              Work
            </Link>
            <Link
              href="#contact"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium hover:scale-105 transform"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
