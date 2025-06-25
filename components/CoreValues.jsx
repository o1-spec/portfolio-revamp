"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { Code, Users, Shield, Lightbulb } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const coreValues = [
  {
    icon: Code,
    title: "Problem-Solving through Code",
    description:
      "I enjoy tackling coding challenges and applying logical thinking to break down complex problems. Problem-solving sharpens my skills and shapes how I build.",
    principles: [
      "Consistent practice with data structures and algorithms",
      "Strategic debugging and optimization",
      "Breaking problems into manageable parts",
    ],
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: Lightbulb,
    title: "Real-World Impact",
    description:
      "I believe the true value of technology lies in its ability to solve real-world problems. I aim to build solutions that are practical, meaningful, and improve lives in measurable ways.",
    principles: [
      "Understanding the 'why' before building",
      "Designing systems that solve actual user pain points",
      "Prioritizing business value and scalability",
    ],
    color: "from-orange-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Delightful User Interfaces",
    description:
      "Good UI isn't just about beauty — it's about clarity and usability. I craft intuitive, accessible, and engaging interfaces that leave users with good impressions.",
    principles: [
      "Consistent, readable design patterns",
      "Accessibility and mobile responsiveness",
      "Micro-interactions and thoughtful animations",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Innovation & Growth",
    description:
      "I'm always exploring better ways to build, think, and deliver. I embrace new technologies, tools, and mindsets that help me grow and stay ahead in a fast-moving industry.",
    principles: [
      "Staying curious and open to learning",
      "Experimenting with new tools and frameworks",
      "Sharing knowledge and contributing to communities",
    ],
    color: "from-green-500 to-emerald-500",
  },
]

const CoreValues = () => {
  const containerRef = useRef(null)
  const cardsRef = useRef(null)
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)

    return () => window.removeEventListener("resize", updateScreenSize)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const cards = cardsRef.current

    if (!container || !cards || screenSize.width === 0) return

    // Responsive card dimensions
    const isMobile = screenSize.width < 768
    const isTablet = screenSize.width >= 768 && screenSize.width < 1024

    let cardWidth, cardHeight, gap, cardPadding

    if (isMobile) {
      cardWidth = Math.min(300, screenSize.width - 40) // 20px margin on each side
      cardHeight = 380
      gap = 16
      cardPadding = 16
    } else if (isTablet) {
      cardWidth = 320
      cardHeight = 400
      gap = 20
      cardPadding = 20
    } else {
      cardWidth = 380
      cardHeight = 420
      gap = 24
      cardPadding = 24
    }

    const cardElements = cards.children
    const totalWidth = (cardWidth + gap) * cardElements.length
    const viewportWidth = screenSize.width

    // Responsive initial positioning
    const initialOffset = isMobile
      ? viewportWidth - cardWidth * 0.2 // Show more of first card on mobile
      : viewportWidth - cardWidth * 0.3

    // Set responsive card dimensions
    gsap.set(cardElements, {
      width: cardWidth,
      height: cardHeight,
      padding: cardPadding,
    })

    // Set initial position
    gsap.set(cards, {
      x: initialOffset,
    })

    // Responsive scroll distance
    const scrollMultiplier = isMobile ? 1.2 : 0.7
    const endOffset = isMobile
      ? viewportWidth * 0.2 // Leave less space on mobile
      : viewportWidth * 0.3

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${totalWidth * scrollMultiplier + viewportWidth * scrollMultiplier}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // Better mobile performance
        refreshPriority: isMobile ? 1 : 0,
      },
    })

    // Animate cards with responsive positioning
    tl.to(cards, {
      x: -totalWidth + endOffset,
      ease: "none",
    })

    // Responsive stagger animation
    gsap.fromTo(
      cardElements,
      {
        opacity: 0,
        scale: isMobile ? 0.95 : 0.9,
        y: isMobile ? 20 : 30,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: isMobile ? 0.4 : 0.6,
        stagger: isMobile ? 0.1 : 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [screenSize])

  const isMobile = screenSize.width < 768
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024

  return (
    <section
      ref={containerRef}
      className="h-[100vh] relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: isMobile ? "30px 30px" : isTablet ? "40px 40px" : "50px 50px",
      }}
    >
      {/* Responsive Header */}
      <div className={`absolute ${isMobile ? "top-4" : "top-6"} left-1/2 transform -translate-x-1/2 z-20 px-4 w-full`}>
        <div className="text-center">
          <motion.div
            className="inline-flex items-center gap-2 mb-3 sm:mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/images/pythagoras.jpg"
              alt="Pythagoras Icon"
              width={isMobile ? 24 : isTablet ? 28 : 32}
              height={isMobile ? 16 : isTablet ? 18 : 20}
              className="grayscale hover:grayscale-0 transition-all duration-300 rounded"
            />
            <span
              className={`text-gray-400 ${isMobile ? "text-xs" : isTablet ? "text-sm" : "text-[15px]"} font-medium tracking-wider uppercase`}
            >
              Philosophy
            </span>
          </motion.div>

          <h2
            className={`${isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-3xl md:text-4xl lg:text-5xl"} font-bold text-white mb-3 sm:mb-4 tracking-tight`}
          >
            Values &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Mission</span>
          </h2>

          <p
            className={`text-white/70 ${isMobile ? "text-sm" : isTablet ? "text-base" : "text-[15px]"} mx-auto leading-relaxed max-w-3xl`}
          >
            The principles that guide my work and the mission that drives my passion for creating exceptional digital
            experiences.
          </p>
        </div>
      </div>

      {/* Responsive Horizontal Scroll Cards */}
      <div className={`absolute ${isMobile ? "top-[60%]" : "top-[68%]"} left-0 transform -translate-y-1/2 w-full`}>
        <div ref={cardsRef} className={`flex ${isMobile ? "gap-4" : isTablet ? "gap-5" : "gap-6"}`}>
          {coreValues.map((value) => (
            <div
              key={value.title}
              className="flex-shrink-0 bg-white/5 shadow-lg backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-500 group hover:shadow-[0_20px_50px_-12px_rgba(147,51,234,0.3)] hover:-translate-y-2 sm:hover:-translate-y-4"
              style={{
                transformOrigin: "center bottom",
              }}
            >
              <div
                className={`${isMobile ? "w-8 h-8" : isTablet ? "w-10 h-10" : "w-12 h-12"} bg-gradient-to-r from-purple-500 to-pink-500 ${isMobile ? "rounded-lg" : "rounded-2xl"} flex items-center justify-center ${isMobile ? "mb-4" : isTablet ? "mb-5" : "mb-6"} group-hover:scale-110 transition-transform duration-300`}
              >
                <value.icon className={`${isMobile ? "w-4 h-4" : isTablet ? "w-5 h-5" : "w-6 h-6"} text-white`} />
              </div>

              <h4
                className={`${isMobile ? "text-lg" : isTablet ? "text-xl" : "text-2xl"} font-bold text-white/80 ${isMobile ? "mb-3" : "mb-4"} group-hover:text-purple-400 transition-colors leading-tight`}
              >
                {value.title}
              </h4>

              <p
                className={`text-white ${isMobile ? "text-sm" : "text-[15px]"} leading-relaxed ${isMobile ? "mb-4" : isTablet ? "mb-5" : "mb-6"}`}
              >
                {value.description}
              </p>

              <div className="space-y-2">
                {value.principles.map((principle) => (
                  <div key={principle} className="flex items-start gap-2 sm:gap-3 text-gray-400">
                    <div
                      className={`${isMobile ? "w-1.5 h-1.5 mt-1.5" : "w-2 h-2 mt-2"} rounded-full flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500`}
                    />
                    <span className={`${isMobile ? "text-xs" : "text-sm"} leading-relaxed`}>{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Scroll Indicator */}
      <div
        className={`absolute ${isMobile ? "bottom-[10%]" : "bottom-[15%]"} left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse`}
      >
        <span className={isMobile ? "text-xs" : "text-sm"}>{isMobile ? "Scroll to explore" : "Scroll to explore"}</span>
        <svg className={`${isMobile ? "w-4 h-4" : "w-5 h-5"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Responsive decorative elements */}
      <div
        className={`absolute ${isMobile ? "top-16 left-4 w-2 h-2" : isTablet ? "top-20 left-8 w-3 h-3" : "top-24 left-12 w-4 h-4"} bg-purple-500 rounded-full opacity-30 animate-pulse`}
      />
      <div
        className={`absolute ${isMobile ? "top-32 right-6 w-1.5 h-1.5" : isTablet ? "top-48 right-12 w-2 h-2" : "top-96 right-16 w-2 h-2"} bg-blue-400 rounded-full opacity-40 animate-pulse`}
      />
      <div
        className={`absolute ${isMobile ? "bottom-16 left-1/4 w-2 h-2" : isTablet ? "bottom-24 left-1/4 w-2.5 h-2.5" : "bottom-48 left-1/4 w-3 h-3"} bg-green-400 rounded-full opacity-35 animate-pulse`}
      />    
    </section>
  )
}

export default CoreValues
