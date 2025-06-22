"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Code, Users, Shield, Lightbulb } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const coreValues = [
  {
    icon: Code,
    title: "Excellence in Craft",
    description:
      "Every line of code is written with precision and purpose. I believe in creating solutions that are not just functional, but elegant and maintainable.",
    principles: [
      "Clean, readable code architecture",
      "Comprehensive testing and documentation",
      "Performance optimization at every level",
      "Continuous learning and improvement",
    ],
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: Users,
    title: "Human-Centered Design",
    description:
      "Technology should serve people, not the other way around. I prioritize user experience and accessibility in every project I undertake.",
    principles: [
      "Intuitive and accessible interfaces",
      "User feedback integration",
      "Inclusive design practices",
      "Empathy-driven development",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Security & Trust",
    description:
      "In an interconnected world, security isn't optional. I build systems with security-first mindset and maintain the highest standards of data protection.",
    principles: [
      "End-to-end encryption implementation",
      "Regular security audits and updates",
      "Privacy by design approach",
      "Transparent security practices",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Growth",
    description:
      "I embrace emerging technologies and methodologies to solve complex problems in creative ways, always pushing the boundaries of what's possible.",
    principles: [
      "Exploring cutting-edge technologies",
      "Creative problem-solving approaches",
      "Rapid prototyping and iteration",
      "Knowledge sharing and mentoring",
    ],
    color: "from-yellow-500 to-orange-500",
  },
];

// Keep your coreValues array as is

const CoreValues = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current;

    if (!container || !cards) return;

    // Calculate total width of all cards
    const cardElements = cards.children;
    const cardWidth = 450; // Your card width is w-[450px]
    const gap = 32; // gap-8 = 32px
    const totalWidth = (cardWidth + gap) * cardElements.length;
    const viewportWidth = window.innerWidth;
    
    // Initial offset - make first card 30% visible
    const initialOffset = viewportWidth - (cardWidth * 0.3);

    // Set initial position without animation
    gsap.set(cards, {
      x: initialOffset,
    });

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
    });

    // Animate cards from initial position to end position
    tl.to(
      cards,
      {
        x: -totalWidth + viewportWidth * 0.3, // Leave 30% of the last card visible
        ease: "none",
      }
    );

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
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-[110vh] relative overflow-hidden"
      style={{
        backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
      `,
        backgroundSize: "50px 50px",
      }}
    >
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="text-center">
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-center">
              <Image
                src="/images/pythagoras.jpg"
                alt="Pythagoras Icon"
                width={42}
                height={24}
                className="grayscale hover:grayscale-0 transition-all duration-300 rounded"
              />
            </div>
            <span className="text-gray-400 text-md font-medium tracking-wider uppercase">
              Philosophy
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight">
            Values &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Mission
            </span>
          </h2>

          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            The principles that guide my work and the mission that drives my
            passion for creating exceptional digital experiences.
          </p>
        </div>
      </div>

      {/* Horizontal Scrolling Cards */}
      <div className="absolute top-[63%] left-0 transform -translate-y-1/2 w-full">
        <div ref={cardsRef} className="flex gap-8">
          {coreValues.map((value) => (
            <div
              key={value.title}
              className="flex-shrink-0 w-[450px] h-[510px] bg-white shadow-lg backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-8 h-8 text-white" />
              </div>

              <h4 className="text-3xl font-bold text-black mb-4 group-hover:text-purple-400 transition-colors">
                {value.title}
              </h4>

              <p className="text-black text-[18px] leading-relaxed mb-6">
                {value.description}
              </p>

              <div className="space-y-3">
                {value.principles.map((principle) => (
                  <div
                    key={principle}
                    className="flex items-center gap-3 text-gray-400"
                  >
                    <div className="w-2 h-2 rounded-full flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500" />
                    <span className="text-[17px]">{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint (optional) */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-gray-400 opacity-70 animate-pulse">
        <span>Scroll to explore</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-32 left-16 w-4 h-4 bg-purple-500 rounded-full opacity-30 animate-pulse" />
      <div className="absolute top-96 right-24 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse" />
      <div className="absolute bottom-48 left-1/4 w-3 h-3 bg-green-400 rounded-full opacity-35 animate-pulse" />
    </section>
  );
};

export default CoreValues;