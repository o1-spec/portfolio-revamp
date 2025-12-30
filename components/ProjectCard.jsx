"use client";

import Image from "next/image";
import {
  Github,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function ProjectCard({ project, index = 0, reverse = false }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleKeyDown = (event, url) => {
    if ((event.key === "Enter" || event.key === " ") && url) {
      event.preventDefault();
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const images = Array.isArray(project.images)
    ? project.images
    : [project.image];
  const mainImage = images[currentImageIndex];
  const isMobileProject =
    images.length > 1 && images.some((img) => img.includes("Image-"));

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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
      <div
        className={`w-full lg:basis-[60%] relative ${
          reverse ? "lg:ml-auto" : ""
        } mb-6 sm:mb-8 lg:mb-0`}
      >
        <div
          className={`relative overflow-hidden rounded-lg shadow-2xl group-hover:shadow-3xl transition-all duration-500 ${
            isMobileProject ? "" : ""
          }`}
        >
          {!isMobileProject && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px] rounded-lg">
              <div className="w-full h-full bg-gray-900 rounded-md"></div>
            </div>
          )}

          <div
            className={`relative ${
              isMobileProject ? "" : "bg-white"
            } overflow-hidden rounded-lg`}
          >
            {!isMobileProject && (
              <div
                className={`absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 transition-opacity duration-500 z-10 ${
                  isHovered ? "opacity-20" : "opacity-60"
                }`}
              />
            )}

            {isMobileProject ? (
              // Mobile app layout - single image with navigation
              <div className="relative flex items-center justify-center">
                <div className="relative w-[280px] sm:w-[320px] md:w-[360px] h-[498px] sm:h-[569px] md:h-[640px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={mainImage}
                        alt={`Screenshot ${currentImageIndex + 1} of ${
                          project.title
                        } mobile app`}
                        width={360}
                        height={640}
                        className="object-contain rounded-lg shadow-lg"
                        priority={index < 2}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Navigation buttons */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 md:left-20 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-all duration-300 z-20 shadow-lg"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 md:right-24 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-all duration-300 z-20 shadow-lg"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
                {/* Image counter */}
                <div className="absolute top-4 right-4 bg-black/80 text-white text-xs px-3 py-1 rounded-full font-medium z-20">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>
            ) : (
              // Regular web project layout
              <Image
                src={mainImage || "/placeholder.svg?height=400&width=600"}
                alt={`Screenshot of ${project.title} project`}
                width={600}
                height={400}
                className={`object-cover transition-all w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] duration-700 ease-out cursor-pointer ${
                  isHovered
                    ? `grayscale-0 scale-105 ${
                        reverse
                          ? "lg:translate-x-2 lg:-translate-y-2"
                          : "lg:-translate-x-2 lg:-translate-y-2"
                      }`
                    : "grayscale scale-100"
                }`}
                priority={index < 2}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                onClick={() =>
                  images.length > 1 && setShowAllImages(!showAllImages)
                }
              />
            )}

            {/* Accordion Toggle Icon with improved styling */}
            {images.length > 1 && !isMobileProject && (
              <motion.button
                onClick={() => setShowAllImages(!showAllImages)}
                className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-all duration-300 z-20 shadow-lg border border-white/20"
                aria-label="Toggle more images"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: showAllImages ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </motion.button>
            )}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {showAllImages && images.length > 1 && !isMobileProject && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden"
            >
              {images.slice(1).map((img, idx) => (
                <motion.div
                  key={idx}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: idx * 0.05,
                    duration: 0.3,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={img}
                    alt={`Additional screenshot ${idx + 1} of ${project.title}`}
                    width={300}
                    height={200}
                    className="object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Responsive Content Section */}
      <div
        className={`w-full lg:w-[45%] lg:absolute z-20 flex flex-col ${
          reverse
            ? "lg:left-0 lg:items-start text-left"
            : "lg:right-0 lg:items-end text-left lg:text-right"
        } ${isHovered ? "transform lg:translate-y-[-4px]" : ""}`}
        style={{
          transition: isHovered ? "transform 0.5s ease" : "none",
        }}
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
        <div
          className={`flex gap-3 sm:gap-4 ${
            reverse ? "justify-start" : "justify-start lg:justify-end"
          }`}
        >
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
          {project.github2 && (
            <a
              href={project.github2}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-green-400 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 p-2 rounded-full hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={`View ${project.title} secondary repo on GitHub`}
              onKeyDown={(e) => handleKeyDown(e, project.github2)}
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
  );
}
