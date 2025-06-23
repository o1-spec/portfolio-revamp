"use client"

import { useEffect, useState, useRef } from "react"
import { Github, Mail, Phone, Linkedin, Download, ChevronDown } from "lucide-react"
import Image from "next/image"

const HeroSectionWithArrow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [hoveredIcon, setHoveredIcon] = useState(null)
  const [isArrowHovered, setIsArrowHovered] = useState(false)
  const cardRef = useRef(null)
  const [isCardFlipped, setIsCardFlipped] = useState(false)

  // Drag state
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
const [cardPosition, setCardPosition] = useState({ x: window.innerWidth - 450, y: 20 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Handle dragging
      if (isDragging) {
        const newX = e.clientX - dragOffset.x
        const newY = e.clientY - dragOffset.y

        // Convert to position from edges (keep the right/top positioning style)
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight

        setCardPosition({
          x: Math.max(0, Math.min(windowWidth - 300, newX)), // 300 is card width
          y: Math.max(0, Math.min(windowHeight - 380, newY)), // 380 is card height
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  const handleMouseDown = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setIsDragging(true)
    e.preventDefault()
  }

  const cardTransform = () => {
    if (isDragging) return "" // No mouse-follow effect while dragging

    if (!cardRef.current) return ""

    const card = cardRef.current.getBoundingClientRect()
    const cardCenterX = card.left + card.width / 2
    const cardCenterY = card.top + card.height / 2

    const deltaX = (mousePosition.x - cardCenterX) * 0.05 // Reduced effect when not dragging
    const deltaY = (mousePosition.y - cardCenterY) * 0.05

    return `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.1}deg)`
  }

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
  ]

  const quotes = [
    "Code is poetry written in logic.",
    "Every bug is a puzzle waiting to be solved.",
    "Innovation happens at the intersection of creativity and technology.",
    "The best code is not just functional, but beautiful.",
    "Dream in code, build in reality.",
  ]

  const handleScrollDown = () => {
    // Scroll to about section specifically
    const aboutSection = document.getElementById("about-section")
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Main Content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          marginTop: "0px",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* First Name - Smaller */}
        <h1
          style={{
            fontSize: "5rem",
            fontWeight: "300",
            color: "rgba(255, 255, 255, 0.8)",
            marginBottom: "0.5rem",
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            animation: "typewriter1 2s steps(20) 0.5s both",
            borderRight: "3px solid white",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "fit-content",
            margin: "0 auto 0.5rem auto",
            letterSpacing: "4px",
          }}
        >
          ONADOKUN
        </h1>

        {/* Last Name - Bigger */}
        <h1
          style={{
            fontSize: "7.5rem",
            fontWeight: "900",
            color: "white",
            marginBottom: "2rem",
            textShadow: "3px 3px 6px rgba(0,0,0,0.8)",
            animation: "typewriter2 2.5s steps(25) 2.5s both",
            borderRight: "3px solid white",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "fit-content",
            margin: "0 auto 2rem auto",
            letterSpacing: "5px",
          }}
        >
          OLUWAFEMI
        </h1>

        {/* Enhanced Subtitle */}
        <p
          style={{
            fontSize: "2.2rem",
            color: "rgba(255, 255, 255, 0.9)",
            marginBottom: "1rem",
            animation: "fadeInUp 2s ease-out 4s both",
            fontWeight: "400",
            letterSpacing: "1px",
          }}
        >
          Creative Technologist & Code Artist
        </p>

        {/* Secondary subtitle */}
        <p
          style={{
            fontSize: "1.3rem",
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "2rem",
            animation: "fadeInUp 2s ease-out 4.5s both",
            fontStyle: "italic",
          }}
        >
          Building Tomorrow's Web, One Line at a Time
        </p>

        {/* Animated underline */}
        <div
          style={{
            width: "350px",
            height: "3px",
            background: "linear-gradient(90deg, transparent, white, transparent)",
            margin: "0 auto",
            animation: "pulse 2s ease-in-out infinite, fadeIn 1s ease-out 5s both",
          }}
        />

        {/* Floating symbols */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-180px",
            fontSize: "3.5rem",
            color: "rgba(255, 255, 255, 0.25)",
            animation: "float 3s ease-in-out infinite",
          }}
        >
          {"</>"}
        </div>
        <div
          style={{
            position: "absolute",
            top: "-70px",
            right: "-150px",
            fontSize: "2.5rem",
            color: "rgba(255, 255, 255, 0.2)",
            animation: "float 4s ease-in-out infinite reverse",
          }}
        >
          {"{}"}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-120px",
            fontSize: "3rem",
            color: "rgba(255, 255, 255, 0.25)",
            animation: "float 3.5s ease-in-out infinite",
          }}
        >
          {"()"}
        </div>
      </div>

      {/* Vertical Social Links - Left Side */}
      <div
        style={{
          position: "fixed",
          left: "40px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 15,
          animation: "slideInLeft 1s ease-out 5.5s both",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "25px 15px",
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "60px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          }}
        >
          {/* Social Icons */}
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50px",
                  height: "50px",
                  background:
                    hoveredIcon === index
                      ? `linear-gradient(135deg, ${social.color}30, ${social.color}10)`
                      : "rgba(255, 255, 255, 0.1)",
                  border: hoveredIcon === index ? `2px solid ${social.color}` : "2px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  color: hoveredIcon === index ? social.color : "rgba(255, 255, 255, 0.8)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  transform: hoveredIcon === index ? "scale(1.1) translateX(5px)" : "scale(1)",
                  animation: `fadeInScale 0.6s ease-out ${5.8 + index * 0.1}s both`,
                }}
                onMouseEnter={() => setHoveredIcon(index)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <IconComponent size={20} />
              </a>
            )
          })}
        </div>

        {/* Tooltip for hovered icon */}
        {hoveredIcon !== null && (
          <div
            style={{
              position: "absolute",
              left: "80px",
              top: `${hoveredIcon * 70 + 40}px`,
              background: "rgba(0, 0, 0, 0.9)",
              color: "white",
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: "500",
              whiteSpace: "nowrap",
              animation: "fadeIn 0.2s ease-out",
              border: `1px solid ${socialLinks[hoveredIcon].color}`,
              zIndex: 20,
            }}
          >
            {socialLinks[hoveredIcon].label}
            <div
              style={{
                position: "absolute",
                left: "-6px",
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
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
        style={{
          position: "fixed",
          bottom: "40px",
          left: "6%",
          transform: "translateX(-50%)",
          zIndex: 15,
          animation: "slideInUp 1s ease-out 6.2s both",
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 24px",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "30px",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            backdropFilter: "blur(10px)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05) translateY(-5px)"
            e.target.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15))"
            e.target.style.boxShadow = "0 12px 25px rgba(0,0,0,0.4)"
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1) translateY(0)"
            e.target.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))"
            e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)"
          }}
          onClick={() => {
            console.log("Downloading CV...")
          }}
        >
          <Download size={18} />
          Download CV
        </button>
      </div>

      {/* Animated Bouncing Arrow - Bottom Center */}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 15,
          animation: "fadeInBounce 1.5s ease-out 7s both",
        }}
      >
        <button
          onClick={handleScrollDown}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60px",
            height: "60px",
            background: isArrowHovered
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15))"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))",
            backdropFilter: "blur(15px)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "50%",
            color: "white",
            cursor: "pointer",
            transition: "all 0.3s ease",
            animation: "bounce 2s ease-in-out infinite",
            boxShadow: isArrowHovered ? "0 15px 35px rgba(255, 255, 255, 0.2)" : "0 10px 25px rgba(0, 0, 0, 0.3)",
            transform: isArrowHovered ? "scale(1.1)" : "scale(1)",
          }}
          onMouseEnter={() => setIsArrowHovered(true)}
          onMouseLeave={() => setIsArrowHovered(false)}
        >
          <ChevronDown
            size={28}
            style={{
              animation: "arrowPulse 2s ease-in-out infinite",
            }}
          />
        </button>

        {/* Scroll hint text */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "-55%",
            transform: "translateX(-50%)",
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "12px",
            textTransform: "uppercase",
            fontWeight: "500",
            whiteSpace: "nowrap",
            opacity: isArrowHovered ? 1 : 0.6,
            transition: "opacity 0.3s ease",
            animation: "fadeInUp 1s ease-out 7.5s both",
          }}
        >
          Scroll to explore
        </div>

        {/* Animated rings around the button */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80px",
            height: "80px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            animation: "ripple 3s ease-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100px",
            height: "100px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            animation: "ripple 3s ease-out infinite 1s",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Draggable Picture Card */}
      <div
        ref={cardRef}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          // Only flip if not dragging
          if (!isDragging) {
            setIsCardFlipped(!isCardFlipped)
          }
        }}
        style={{
          position: "absolute",
          left: `${cardPosition.x}px`,
          top: `${cardPosition.y}px`,
          width: "300px",
          height: "380px",
          perspective: "1000px",
          zIndex: isDragging ? 30 : 20,
          userSelect: "none",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Hanging string - only show when not dragging */}
        {!isDragging && (
          <div
            style={{
              position: "absolute",
              top: "-20px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "2px",
              height: "20px",
              background: "rgba(255, 255, 255, 0.5)",
              transition: "opacity 0.3s ease",
              zIndex: 1,
            }}
          />
        )}

        {/* Card Inner Container for 3D flip */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transform: `${isDragging ? "scale(1.05)" : cardTransform()} ${
              isCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
            }`,
            transition: isDragging ? "transform 0.6s ease-in-out" : "transform 0.6s ease-in-out",
            cursor: isDragging ? "grabbing" : "grab",
            transformOrigin: "center",
          }}
        >
          {/* Front Side */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              background: "#191919",
              backdropFilter: "blur(10px)",
              border: isDragging ? "2px solid rgba(255, 255, 255, 0.4)" : "2px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "25px",
              padding: "30px",
              boxShadow: isDragging ? "0 20px 60px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Picture */}
            <div
              style={{
                width: "100%",
                height: "200px",
                background: "linear-gradient(45deg, #333, #555)",
                borderRadius: "10px",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src="/images/luffy-2.jpg"
                alt="Luffy"
                width={250}
                height={200}
                className="object-cover grayscale hover:grayscale-0 transition-all duration-300 ease-in-out rounded-[10px]"
                style={{
                  maxHeight: "100%",
                }}
              />
            </div>

            <p
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "1.4rem",
                opacity: isHovering || isDragging ? 1 : 0.7,
                transition: "opacity 0.3s ease",
                pointerEvents: "none",
              }}
            >
              Meet my coding buddy! <br />
            </p>
            <p className="text-[15px] text-center pt-6 text-white/80">
              {isDragging ? "Dragging..." : "Click to flip & see quotes!"}
            </p>

            {/* Drag indicator */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "20px",
                height: "20px",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                color: "rgba(255, 255, 255, 0.6)",
                pointerEvents: "none",
                opacity: isHovering || isDragging ? 1 : 0.5,
                transition: "opacity 0.3s ease",
              }}
            >
              ⋮⋮
            </div>
          </div>

          {/* Back Side */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "25px",
              padding: "30px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              overflow: "hidden",
            }}
          >
            {/* Quotes Header */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
                animation: isCardFlipped ? "fadeInDown 0.8s ease-out 0.3s both" : "none",
                zIndex: 2,
              }}
            >
              <h3
                style={{
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "5px",
                }}
              >
                Daily Inspiration
              </h3>
              <div
                style={{
                  width: "60px",
                  height: "2px",
                  background: "linear-gradient(90deg, transparent, #fff, transparent)",
                  margin: "0 auto",
                }}
              />
            </div>

            {/* Scrolling Quotes Container */}
            <div
              style={{
                flex: 1,
                width: "100%",
                position: "relative",
                overflow: "hidden",
                mask: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                WebkitMask: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              }}
            >
              {/* Scrolling Quotes */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  animation: isCardFlipped
                    ? "initialQuotesFadeIn 2s ease-out 0.5s both, infiniteScroll 20s linear 3s infinite"
                    : "none",
                  transform: isCardFlipped ? "translateY(0)" : "translateY(100%)",
                }}
              >
                {/* First set of quotes */}
                {quotes.map((quote, index) => (
                  <div
                    key={`first-${index}`}
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      fontStyle: "italic",
                      padding: "12px 16px",
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      minHeight: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    "{quote}"
                  </div>
                ))}

                {/* Duplicate set for seamless loop */}
                {quotes.map((quote, index) => (
                  <div
                    key={`second-${index}`}
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      fontStyle: "italic",
                      padding: "12px 16px",
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      minHeight: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    "{quote}"
                  </div>
                ))}
              </div>
            </div>

            {/* Back button hint */}
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.8rem",
                textAlign: "center",
                marginTop: "15px",
                animation: isCardFlipped ? "fadeIn 1s ease-out 2s both" : "none",
                zIndex: 2,
              }}
            >
              Click again to flip back
            </p>

            {/* Flip indicator */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "20px",
                height: "20px",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.6)",
                pointerEvents: "none",
                animation: isCardFlipped ? "spin 2s ease-in-out infinite" : "none",
                zIndex: 2,
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
  )
}

export default HeroSectionWithArrow
