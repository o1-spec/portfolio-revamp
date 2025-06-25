"use client";

import { useEffect, useState, useRef } from "react";
import {
  Github,
  Mail,
  Phone,
  Linkedin,
  Download,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

const HeroSectionWithArrow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isArrowHovered, setIsArrowHovered] = useState(false);
  const cardRef = useRef(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [cardPosition, setCardPosition] = useState({
    x: window.innerWidth - 350,
    y: 20,
  });

  useEffect(() => {
    // Set initial position based on screen size
    const updateInitialPosition = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if (windowWidth >= 1024) {
        // Desktop: top right
        setCardPosition({
          x: windowWidth - 300,
          y: 20,
        });
      } else if (windowWidth >= 768) {
        // Tablet: center right
        setCardPosition({
          x: windowWidth - 280,
          y: windowHeight * 0.3,
        });
      } else {
        // Mobile: bottom center
        setCardPosition({
          x: 10,
          y: 10,
        });
      }
    };

    updateInitialPosition();
    window.addEventListener("resize", updateInitialPosition);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const cardWidth = window.innerWidth < 768 ? 220 : 250;
        const cardHeight = window.innerWidth < 768 ? 280 : 320;

        setCardPosition({
          x: Math.max(0, Math.min(windowWidth - cardWidth, newX)),
          y: Math.max(0, Math.min(windowHeight - cardHeight, newY)),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", updateInitialPosition);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
    e.preventDefault();
  };

  const cardTransform = () => {
    if (isDragging) return ""; // No mouse-follow effect while dragging

    if (!cardRef.current) return "";

    const card = cardRef.current.getBoundingClientRect();
    const cardCenterX = card.left + card.width / 2;
    const cardCenterY = card.top + card.height / 2;

    const deltaX = (mousePosition.x - cardCenterX) * 0.05; // Reduced effect when not dragging
    const deltaY = (mousePosition.y - cardCenterY) * 0.05;

    return `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.1}deg)`;
  };

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/o1-spec",
      color: "#ffffff",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/oluwafemionadokun",
      color: "#0077b5",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:oluwafemionadokun@gmail.com",
      color: "#ea4335",
    },
    {
      icon: Phone,
      label: "Phone",
      href: "tel:+2347058266972",
      color: "#25d366",
    },
  ];

  const quotes = [
    "Code is poetry written in logic.",
    "Every bug is a puzzle waiting to be solved.",
    "Innovation happens at the intersection of creativity and technology.",
    "The best code is not just functional, but beautiful.",
    "Dream in code, build in reality.",
  ];

  const handleScrollDown = () => {
    // Scroll to about section specifically
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Main Content */}
      <div className="absolute top-[42%] md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 px-4 md:px-0">
        {/* First Name - Smaller */}
        <h1
          className="text-[30px] sm:text-3xl md:text-4xl lg:text-[3.7rem] font-light text-white/80 mb-2 md:mb-4 animate-typewriter1 border-r-4 border-white whitespace-nowrap overflow-hidden w-fit mx-auto tracking-[2px] sm:tracking-[4px] translate-y-3 sm:translate-y-0"
          style={{
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            animation: "typewriter1 2s steps(20) 0.5s both",
          }}
        >
          ONADOKUN
        </h1>

        {/* Last Name - Bigger */}
        <h1
          className="text-[46px] sm:text-4xl md:text-5xl lg:text-[5.8rem] font-black text-white mb-4 sm:mb-8 animate-typewriter2 border-r-4 border-white whitespace-nowrap overflow-hidden w-fit mx-auto tracking-[3px] sm:tracking-[5px]"
          style={{
            textShadow: "3px 3px 6px rgba(0,0,0,0.8)",
            animation: "typewriter2 2.5s steps(25) 2.5s both",
          }}
        >
          OLUWAFEMI
        </h1>

        {/* Enhanced Subtitle */}
        <p
          className="text-lg sm:text-xl md:text-2xl lg:text-[1.7rem] text-white/90 mb-2 sm:mb-4 font-normal tracking-[1px] animate-fadeInUp"
          style={{ animation: "fadeInUp 2s ease-out 4s both" }}
        >
          Creative Technologist & Code Artist
        </p>

        {/* Secondary subtitle */}
        <p
          className="text-sm sm:text-base lg:text-[0.9rem] text-white/70 mb-4 sm:mb-8 italic animate-fadeInUp"
          style={{ animation: "fadeInUp 2s ease-out 4.5s both" }}
        >
          Building Tomorrow's Web, One Line at a Time
        </p>

        {/* Animated underline */}
        <div
          className="w-[200px] sm:w-[300px] h-[2px] sm:h-[3px] mx-auto animate-pulse"
          style={{
            background:
              "linear-gradient(90deg, transparent, white, transparent)",
            animation:
              "pulse 2s ease-in-out infinite, fadeIn 1s ease-out 5s both",
          }}
        />

        {/* Floating symbols */}
        <div
          className="absolute top-[20px] md:-top-[60px] -left-[180px] text-[2.5rem] text-white/25 animate-float"
          style={{ animation: "float 3s ease-in-out infinite" }}
        >
          {"</>"}
        </div>
        <div
          className="absolute -top-[70px] -right-[150px] text-[2.5rem] text-white/20 animate-float"
          style={{ animation: "float 4s ease-in-out infinite reverse" }}
        >
          {"{}"}
        </div>
        <div
          className="absolute -bottom-[120px] -left-[120px] text-[2.5rem] text-white/25"
          style={{ animation: "float 3.5s ease-in-out infinite" }}
        >
          {"()"}
        </div>
      </div>

      <div
        className="fixed left-4 sm:left-[32px] top-[72%] md:top-1/2 transform -translate-y-1/2 z-[1727282828]"
        style={{ animation: "slideInLeft 1s ease-out 5.5s both" }}
      >
        <div className="flex flex-col items-center gap-3 sm:gap-3 py-4 sm:py-6 px-2 sm:px-3 bg-black/40 backdrop-blur-[20px] border border-white/20 rounded-[40px] sm:rounded-[60px] shadow-2xl">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-8 h-8 sm:w-[40px] sm:h-[40px] rounded-[50%] cursor-pointer transition-all duration-300 ${
                  hoveredIcon === index
                    ? "scale-110 translate-x-[3px] sm:translate-x-[5px]"
                    : "scale-100"
                }`}
                style={{
                  background:
                    hoveredIcon === index
                      ? `linear-gradient(135deg, ${social.color}30, ${social.color}10)`
                      : "rgba(255, 255, 255, 0.1)",
                  border:
                    hoveredIcon === index
                      ? `2px solid ${social.color}`
                      : "2px solid rgba(255, 255, 255, 0.2)",
                  color:
                    hoveredIcon === index
                      ? social.color
                      : "rgba(255, 255, 255, 0.8)",
                  animation: `fadeInScale 0.6s ease-out ${
                    5.8 + index * 0.1
                  }s both`,
                }}
                onMouseEnter={() => setHoveredIcon(index)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <IconComponent size={18} />
              </a>
            );
          })}
        </div>

        {/* Tooltip for hovered icon */}
        {hoveredIcon !== null && (
          <div
            className="absolute bg-black/90 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap z-20 animate-fadeIn"
            style={{
              left: "calc(100% + 15px)",
              top: `${46 * hoveredIcon + 30}px`,
              border: `1px solid ${socialLinks[hoveredIcon].color}`,
            }}
          >
            {socialLinks[hoveredIcon].label}
            <div
              className="absolute top-1/2 -left-[6px] -translate-y-1/2 w-0 h-0"
              style={{
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderRight: `6px solid ${socialLinks[hoveredIcon].color}`,
              }}
            />
          </div>
        )}
      </div>

      {/* Standalone Download CV Button - Bottom Left */}
      <div
        className="fixed bottom-5 sm:bottom-[40px] left-12 sm:left-[8%] transform sm:-translate-x-1/2"
        style={{
          animation: "slideInUp 1s ease-out 6.2s both",
          zIndex: 192828282,
        }}
      >
        <a
          href="/Oluwafemi-Onadokun-CV.pdf"
          download="Oluwafemi_Onadokun_CV.pdf"
          className="flex items-center gap-2 px-3 py-2 sm:px-[15px] sm:py-[10px] bg-gradient-to-br from-white/20 to-white/10 border-2 border-white/30 rounded-[20px] sm:rounded-[30px] text-white text-sm sm:text-base font-semibold cursor-pointer transition-all duration-300 shadow-xl backdrop-blur-[10px]"
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05) translateY(-5px)";
            e.target.style.background =
              "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15))";
            e.target.style.boxShadow = "0 12px 25px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1) translateY(0)";
            e.target.style.background =
              "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))";
            e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
          }}
          style={{
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          }}
        >
          <Download size={18} />
          <span className="hidden sm:inline">Download CV</span>
          <span className="sm:hidden">CV</span>
        </a>
      </div>

      {/* Animated Bouncing Arrow - Bottom Center */}
      <div
        className="absolute bottom-[20%] sm:bottom-[30px] left-1/2 transform -translate-x-1/2 z-15"
        style={{ animation: "fadeInBounce 1.5s ease-out 7s both" }}
      >
        <button
          onClick={handleScrollDown}
          className="flex items-center justify-center w-10 h-10 sm:w-[45px] sm:h-[45px] rounded-full text-white cursor-pointer transition-all duration-300 animate-bounce"
          style={{
            background: isArrowHovered
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15))"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))",
            backdropFilter: "blur(15px)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: isArrowHovered
              ? "0 15px 35px rgba(255, 255, 255, 0.2)"
              : "0 10px 25px rgba(0, 0, 0, 0.3)",
          }}
          onMouseEnter={() => setIsArrowHovered(true)}
          onMouseLeave={() => setIsArrowHovered(false)}
        >
          <ChevronDown
            size={20}
            style={{ animation: "arrowPulse 2s ease-in-out infinite" }}
          />
        </button>

        {/* Scroll hint text */}
        <div
          className={`absolute -top-[75%] -left-[60%] transform -translate-x-1/2 text-white/70 text-xs uppercase font-medium whitespace-nowrap transition-opacity duration-300 ${
            isArrowHovered ? "opacity-100" : "opacity-60"
          }`}
          style={{ animation: "fadeInUp 1s ease-out 7.5s both" }}
        >
          Click to explore
        </div>

        {/* Animated rings around the button */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-white/20 rounded-full pointer-events-none"
          style={{ animation: "ripple 3s ease-out infinite" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-25 h-25 border border-white/10 rounded-full pointer-events-none"
          style={{ animation: "ripple 3s ease-out infinite 1s" }}
        />
      </div>

      {/* Draggable Picture Card */}
      <div
        ref={cardRef}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          // Only flip if not dragging
          if (!isDragging) {
            setIsCardFlipped(!isCardFlipped);
          }
        }}
        className={`absolute select-none ${isDragging ? "z-30" : "z-20"}`}
        style={{
          left: `${cardPosition.x}px`,
          top: `${cardPosition.y}px`,
          perspective: "1000px",
          userSelect: "none",
          width: window.innerWidth < 768 ? "150px" : "250px",
          height: window.innerWidth < 768 ? "190px" : "320px",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Hanging string - only show when not dragging */}
        {!isDragging && (
          <div className="absolute -top-3 md:-top-5 left-1/2 transform -translate-x-1/2 w-0.5 h-3 md:h-5 bg-white/50 transition-opacity duration-300 z-1" />
        )}

        {/* Card Inner Container for 3D flip */}
        <div
          className={`relative w-full h-full transition-transform duration-600 ease-in-out ${
            isDragging ? "cursor-grabbing scale-105" : "cursor-grab"
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: `${isDragging ? "scale(1.05)" : cardTransform()} ${
              isCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
            }`,
            transformOrigin: "center",
          }}
        >
          {/* Front Side */}
          <div
            className={`absolute w-full h-full bg-[#191919] backdrop-blur-[10px] rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col items-center justify-center ${
              isDragging
                ? "border-2 border-white/40 shadow-3xl"
                : "border-2 border-white/20 shadow-xl"
            }`}
            style={{
              backfaceVisibility: "hidden",
              border: isDragging
                ? "2px solid rgba(255, 255, 255, 0.4)"
                : "2px solid rgba(255, 255, 255, 0.2)",
              boxShadow: isDragging
                ? "0 20px 60px rgba(0,0,0,0.5)"
                : "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            {/* Picture */}
            <div className="w-full h-24 sm:h-32 md:h-50 bg-gradient-to-br from-gray-700 to-gray-500 rounded-lg mb-3 sm:mb-4 flex items-center justify-center overflow-hidden relative">
              <Image
                src="/images/luffy-2.jpg"
                alt="Luffy"
                width={200}
                height={200}
                className="object-cover grayscale hover:grayscale-0 transition-all duration-300 ease-in-out rounded-lg max-h-full"
              />
            </div>

            <p
              className={`text-white text-center text-[10px] sm:text-[1.1rem] pointer-events-none transition-opacity duration-300 ${
                isHovering || isDragging ? "opacity-100" : "opacity-70"
              }`}
            >
              Meet my coding buddy! <br />
            </p>
            <p className="text-[8px] sm:text-[13px] text-center pt-3 sm:pt-6 text-white/80">
              {isDragging ? "Dragging..." : "Click to flip & see quotes!"}
            </p>

            {/* Drag indicator */}
            <div
              className={`absolute top-2.5 right-2.5 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px] text-white/60 pointer-events-none transition-opacity duration-300 ${
                isHovering || isDragging ? "opacity-100" : "opacity-50"
              }`}
            >
              ⋮⋮
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute w-full h-full backdrop-blur-[10px] border-2 border-white/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col items-center justify-start overflow-hidden shadow-2xl"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
            }}
          >
            {/* Quotes Header */}
            <div
              className="text-center mb-5 z-2"
              style={{
                animation: isCardFlipped
                  ? "fadeInDown 0.8s ease-out 0.3s both"
                  : "none",
              }}
            >
              <h3 className="text-white text-[11px] sm:text-[1.1rem] font-semibold mb-1">
                Daily Inspiration
              </h3>
              <div className="w-12 sm:w-15 h-0.5 mx-auto bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>

            {/* Scrolling Quotes Container */}
            <div
              className="flex-1 w-full relative overflow-hidden"
              style={{
                mask: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                WebkitMask:
                  "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              }}
            >
              <div
                className="flex flex-col gap-4"
                style={{
                  animation: isCardFlipped
                    ? "initialQuotesFadeIn 2s ease-out 0.5s both, infiniteScroll 20s linear 3s infinite"
                    : "none",
                  transform: isCardFlipped
                    ? "translateY(0)"
                    : "translateY(100%)",
                }}
              >
                {/* First set of quotes */}
                {quotes.map((quote, index) => (
                  <div
                    key={`first-${index}`}
                    className="text-white/90 text-[10px] md:text-sm text-center italic px-4 py-3 bg-white/5 rounded-xl border border-white/10 min-h-15 flex items-center justify-center flex-shrink-0"
                  >
                    "{quote}"
                  </div>
                ))}

                {/* Duplicate set for seamless loop */}
                {quotes.map((quote, index) => (
                  <div
                    key={`second-${index}`}
                    className="text-white/90 text-[0.7rem] text-center italic px-4 py-3 bg-white/5 rounded-xl border border-white/10 min-h-15 flex items-center justify-center flex-shrink-0"
                  >
                    "{quote}"
                  </div>
                ))}
              </div>
            </div>

            {/* Back button hint */}
            <p
              className="text-white/60 text-[10px] sm:text-[0.8rem] text-center mt-4 z-2"
              style={{
                animation: isCardFlipped
                  ? "fadeIn 1s ease-out 2s both"
                  : "none",
              }}
            >
              Click again to flip back
            </p>

            {/* Flip indicator */}
            <div
              className="absolute top-2.5 right-2.5 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs text-white/60 pointer-events-none z-2"
              style={{
                animation: isCardFlipped
                  ? "spin 2s ease-in-out infinite"
                  : "none",
              }}
            >
              ↻
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes typewriter1 {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes typewriter2 {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInBounce {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(30px) scale(0.8);
          }
          60% {
            opacity: 1;
            transform: translateX(-50%) translateY(-10px) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-15px);
          }
          60% {
            transform: translateY(-8px);
          }
        }

        @keyframes arrowPulse {
          0%,
          100% {
            opacity: 0.8;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(3px);
          }
        }

        @keyframes ripple {
          0% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scaleX(1);
          }
          50% {
            opacity: 1;
            transform: scaleX(1.2);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(8deg);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInQuote {
          from {
            opacity: 0;
            transform: translateX(-30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes initialQuotesFadeIn {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes infiniteScroll {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSectionWithArrow;
