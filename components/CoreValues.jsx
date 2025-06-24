"use client"

import { useRef, useEffect } from "react"
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

  useEffect(() => {
    const container = containerRef.current
    const cards = cardsRef.current

    if (!container || !cards) return

    // Calculate total width of all cards
    const cardElements = cards.children
    const cardWidth = 380 // Your card width is w-[450px]
    const gap = 24 // gap-8 = 32px
    const totalWidth = (cardWidth + gap) * cardElements.length
    const viewportWidth = window.innerWidth

    // Initial offset - make first card 30% visible
    const initialOffset = viewportWidth - cardWidth * 0.3

    // Set initial position without animation
    gsap.set(cards, {
      x: initialOffset,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${totalWidth + viewportWidth * 0.7}`, // Adjusted for initial visibility
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    // Animate cards from initial position to end position
    tl.to(cards, {
      x: -totalWidth + viewportWidth * 0.3, // Leave 30% of the last card visible
      ease: "none",
    })

    // Stagger animation for individual cards appearing
    gsap.fromTo(
      cardElements,
      {
        opacity: 0,
        scale: 0.9,
        y: 30, // Reduced y movement for subtler animation
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
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
  }, [])

  return (
    <section
      ref={containerRef}
      className="h-[100vh] relative overflow-hidden"
      style={{
        backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
      `,
        backgroundSize: "50px 50px",
      }}
    >
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="text-center">
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-center">
              <Image
                src="/images/pythagoras.jpg"
                alt="Pythagoras Icon"
                width={32}
                height={20}
                className="grayscale hover:grayscale-0 transition-all duration-300 rounded"
              />
            </div>
            <span className="text-gray-400 text-[15px] font-medium tracking-wider uppercase">Philosophy</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Values &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Mission</span>
          </h2>

          <p className="text-white/70 text-[15px] max-w-3xl mx-auto leading-relaxed">
            The principles that guide my work and the mission that drives my passion for creating exceptional digital
            experiences.
          </p>
        </div>
      </div>

      <div className="absolute top-[68%] left-0 transform -translate-y-1/2 w-full">
        <div ref={cardsRef} className="flex gap-6">
          {coreValues.map((value) => (
            <div
              key={value.title}
              className="flex-shrink-0 w-[380px] h-[420px] bg-white/5 shadow-lg backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-500 group hover:shadow-[0_20px_50px_-12px_rgba(147,51,234,0.3)] hover:-translate-y-4"
              style={{
                transformOrigin: "center bottom",
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-6 h-6 text-white" />
              </div>

              <h4 className="text-2xl font-bold text-white/80 mb-4 group-hover:text-purple-400 transition-colors">
                {value.title}
              </h4>

              <p className="text-white text-[15px] leading-relaxed mb-6">{value.description}</p>

              <div className="space-y-2">
                {value.principles.map((principle) => (
                  <div key={principle} className="flex items-center gap-3 text-gray-400">
                    <div className="w-2 h-2 rounded-full flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500" />
                    <span className="text-sm">{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">
        <span>Scroll to explore</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <div className="absolute top-24 left-12 w-4 h-4 bg-purple-500 rounded-full opacity-30 animate-pulse" />
      <div className="absolute top-96 right-16 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse" />
      <div className="absolute bottom-48 left-1/4 w-3 h-3 bg-green-400 rounded-full opacity-35 animate-pulse" />
    </section>
  )
}

export default CoreValues
