"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const avatars = ["👨‍💻", "🤔", "😎", "🚀", "💡"]

const quotes = [
  "First, solve the problem. Then, write the code.",
  "Creativity is intelligence having fun.",
  "One bug closer to brilliance.",
  "Code is poetry written in logic.",
  "Innovation distinguishes between a leader and a follower.",
]

export default function AvatarCard() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    if (!isFlipped) {
      // When flipping to show quote, cycle to next quote
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
    } else {
      // When flipping back to avatar, cycle to next avatar
      setCurrentAvatarIndex((prev) => (prev + 1) % avatars.length)
    }
  }

  const handleDragStart = () => {
    setIsDragging(true)
    handleFlip()
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <motion.div
      className="fixed top-5 right-12 z-20 cursor-grab active:cursor-grabbing"
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.05 }}
      whileDrag={{ scale: 1.1, rotate: 5 }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {/* Hanging String */}
      <motion.div
        className="absolute -top-5 left-1/2 w-0.5 h-5 bg-white/50 transform -translate-x-1/2"
        animate={{
          scaleY: isDragging ? 1.5 : 1,
          rotate: isDragging ? Math.random() * 10 - 5 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Card Container */}
      <motion.div
        className="relative w-72 h-96 perspective-1000"
        onHoverStart={() => !isDragging && handleFlip()}
        onHoverEnd={() => !isDragging && setTimeout(() => setIsFlipped(false), 2000)}
      >
        {/* Card Inner */}
        <motion.div
          className="relative w-full h-full transform-style-preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          {/* Front Side - Avatar */}
          <motion.div
            className="absolute inset-0 w-full h-full backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-full h-full bg-black/80 backdrop-blur-md border-2 border-white/30 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl">
              {/* Avatar Display */}
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  scale: isDragging ? 1.2 : 1,
                  rotate: isDragging ? 360 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                {avatars[currentAvatarIndex]}
              </motion.div>

              {/* Avatar Label */}
              <div className="text-white/80 text-center">
                <h3 className="text-xl font-semibold mb-2">Creative Coder</h3>
                <p className="text-sm text-white/60">{isDragging ? "Wheeee! 🎉" : "Hover or drag me!"}</p>
              </div>

              {/* Floating Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/40 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.2, 0.6, 0.2],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Back Side - Quote */}
          <motion.div
            className="absolute inset-0 w-full h-full backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="w-full h-full bg-white/90 backdrop-blur-md border-2 border-black/30 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl">
              {/* Quote Icon */}
              <motion.div
                className="text-4xl mb-4 text-black/70"
                initial={{ scale: 0 }}
                animate={{ scale: isFlipped ? 1 : 0 }}
                transition={{ delay: 0.3 }}
              >
                💭
              </motion.div>

              {/* Quote Text */}
              <motion.blockquote
                className="text-black text-center text-lg font-medium leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isFlipped ? 1 : 0,
                  y: isFlipped ? 0 : 20,
                }}
                transition={{ delay: 0.4 }}
              >
                "{quotes[currentQuoteIndex]}"
              </motion.blockquote>

              {/* Quote Attribution */}
              <motion.div
                className="text-black/60 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: isFlipped ? 1 : 0 }}
                transition={{ delay: 0.6 }}
              >
                — Developer Wisdom
              </motion.div>

              {/* Animated Background Pattern */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-black/20 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Drag Indicator */}
      {isDragging && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-xs whitespace-nowrap"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          ✨ Keep dragging for more fun! ✨
        </motion.div>
      )}
    </motion.div>
  )
}
