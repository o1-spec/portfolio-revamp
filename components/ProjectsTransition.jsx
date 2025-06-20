"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ProjectsTransition({ isTriggered, onComplete }) {
  const [animationStage, setAnimationStage] = useState("idle")
  const [glowCount, setGlowCount] = useState(0)

  useEffect(() => {
    if (isTriggered) {
      // Start the animation sequence
      setAnimationStage("envelope")

      // Envelope unwrapping -> White screen
      setTimeout(() => setAnimationStage("whiteScreen"), 800)

      // Start glowing text
      setTimeout(() => setAnimationStage("glowing"), 1200)

      // After 3 glows, start block exit
      setTimeout(() => setAnimationStage("blockExit"), 4200)

      // Show projects
      setTimeout(() => {
        setAnimationStage("projects")
        onComplete?.()
      }, 6000)
    }
  }, [isTriggered, onComplete])

  // Handle glow repetition
  useEffect(() => {
    if (animationStage === "glowing") {
      const glowInterval = setInterval(() => {
        setGlowCount((prev) => {
          if (prev < 2) {
            return prev + 1
          } else {
            clearInterval(glowInterval)
            return prev
          }
        })
      }, 1000)

      return () => clearInterval(glowInterval)
    }
  }, [animationStage])

  // Generate grid blocks for exit animation
  const generateBlocks = () => {
    const blocks = []
    const rows = 8
    const cols = 12

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        blocks.push({
          id: `${i}-${j}`,
          row: i,
          col: j,
          delay: (i + j) * 0.05,
        })
      }
    }
    return blocks
  }

  const blocks = generateBlocks()

  if (!isTriggered) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Envelope Unwrapping Animation */}
        {animationStage === "envelope" && (
          <motion.div
            className="absolute inset-0 bg-white origin-center"
            initial={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              scale: 0,
            }}
            animate={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              scale: [0, 1.2, 1],
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Envelope fold lines */}
            <motion.div
              className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-200 origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
            <motion.div
              className="absolute top-0 left-0 w-full h-0.5 bg-gray-200 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              style={{
                transform: "rotate(26.57deg)",
                transformOrigin: "0 0",
              }}
            />
            <motion.div
              className="absolute top-0 right-0 w-full h-0.5 bg-gray-200 origin-right"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              style={{
                transform: "rotate(-26.57deg)",
                transformOrigin: "100% 0",
              }}
            />
          </motion.div>
        )}

        {/* Full White Screen */}
        {(animationStage === "whiteScreen" || animationStage === "glowing") && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}

        {/* Glowing o1-spec Text */}
        {animationStage === "glowing" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-8xl font-bold font-mono tracking-wider text-black relative"
              key={glowCount}
              initial={{
                scale: 0.8,
                opacity: 0.7,
                filter: "blur(2px)",
              }}
              animate={{
                scale: [0.8, 1.2, 1],
                opacity: [0.7, 1, 0.9],
                filter: [
                  "blur(2px) drop-shadow(0 0 10px rgba(0,0,0,0.3))",
                  "blur(0px) drop-shadow(0 0 30px rgba(59,130,246,0.8)) drop-shadow(0 0 60px rgba(147,51,234,0.6))",
                  "blur(0px) drop-shadow(0 0 20px rgba(0,0,0,0.4))",
                ],
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: 0,
              }}
            >
              o1-spec
              {/* Glow rings */}
              <motion.div
                className="absolute inset-0 border-2 border-blue-400 rounded-lg"
                initial={{ scale: 1, opacity: 0 }}
                animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
              />
              <motion.div
                className="absolute inset-0 border border-purple-400 rounded-lg"
                initial={{ scale: 1, opacity: 0 }}
                animate={{
                  scale: [1, 1.8, 2.5],
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          </div>
        )}

        {/* Block Exit Animation */}
        {animationStage === "blockExit" && (
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-8">
            {blocks.map((block) => (
              <motion.div
                key={block.id}
                className="bg-white border-r border-b border-gray-100"
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: 0,
                  scale: 0,
                  rotateZ: 180,
                }}
                transition={{
                  delay: block.delay,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            ))}
          </div>
        )}

        {/* Particle Effects during transitions */}
        {(animationStage === "glowing" || animationStage === "blockExit") && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: -100,
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: Math.random() * 3,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </AnimatePresence>
  )
}
