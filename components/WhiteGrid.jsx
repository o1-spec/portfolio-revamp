"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"

// Optimized White Animated Grid Component
const OptimizedWhiteAnimatedGrid = ({ isFixed, sectionHeight }) => {
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 })
  const [animatedCells, setAnimatedCells] = useState(new Set())
  const gridRef = useRef(null)

  // Throttled resize handler
  const updateGridSize = useCallback(() => {
    const cellSize = 40
    const height = Math.max(sectionHeight || window.innerHeight, window.innerHeight)
    const rows = Math.ceil(height / cellSize) + 3 // Reduced extra rows
    const cols = Math.ceil(window.innerWidth / cellSize) + 1 // Reduced extra cols
    setGridSize({ rows, cols })
  }, [sectionHeight])

  // Debounced resize effect
  useEffect(() => {
    let timeoutId
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateGridSize, 100)
    }

    updateGridSize()
    window.addEventListener("resize", debouncedResize)
    return () => {
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [updateGridSize])

  // Optimized cell animation
  useEffect(() => {
    const animateRandomCells = () => {
      const newAnimatedCells = new Set()
      const numCells = Math.floor(Math.random() * 20) + 10 // Reduced number of animated cells

      for (let i = 0; i < numCells; i++) {
        const row = Math.floor(Math.random() * gridSize.rows)
        const col = Math.floor(Math.random() * gridSize.cols)
        newAnimatedCells.add(`${row}-${col}`)
      }

      setAnimatedCells(newAnimatedCells)
    }

    const interval = setInterval(animateRandomCells, 3000) // Increased interval
    return () => clearInterval(interval)
  }, [gridSize])

  // Memoized grid rendering
  const gridCells = useMemo(() => {
    const cells = []
    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.cols; col++) {
        const key = `${row}-${col}`
        const isAnimated = animatedCells.has(key)

        cells.push(
          <div
            key={key}
            style={{
              position: "absolute",
              left: col * 40,
              top: row * 40,
              width: 40,
              height: 40,
              border: "1px solid rgba(0, 0, 0, 0.06)", // Reduced opacity
              backgroundColor: isAnimated ? "rgba(0, 0, 0, 0.03)" : "transparent", // Reduced opacity
              transition: "all 0.3s ease-out", // Faster transition
              transform: isAnimated ? "scale(1.05)" : "scale(1)", // Reduced scale
              willChange: isAnimated ? "transform, background-color" : "auto",
            }}
          />,
        )
      }
    }
    return cells
  }, [gridSize, animatedCells])

  return (
    <div
      ref={gridRef}
      style={{
        position: isFixed ? "fixed" : "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: isFixed ? "100vh" : "100%",
        minHeight: sectionHeight ? `${sectionHeight}px` : "100vh",
        background: "radial-gradient(circle at center, #ffffff 0%, #f8f9fa 100%)",
        overflow: "hidden",
        zIndex: 1,
        transition: "none", // Remove transition for better performance
        transform: "translateZ(0)", // Force hardware acceleration
        backfaceVisibility: "hidden",
      }}
    >
      {gridCells}
    </div>
  )
}
export default function AnimatedBackground({ children, className = "" }) {
  const [isGridFixed, setIsGridFixed] = useState(false)
  const [sectionHeight, setSectionHeight] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef(null)
  const scrollTimeoutRef = useRef(null)
  const lastScrollY = useRef(0)

  // Optimized section height calculation
  const updateSectionHeight = useCallback(() => {
    if (sectionRef.current) {
      setSectionHeight(sectionRef.current.offsetHeight)
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(updateSectionHeight, 100)
    window.addEventListener("resize", updateSectionHeight)
    return () => {
      window.removeEventListener("resize", updateSectionHeight)
      clearTimeout(timeoutId)
    }
  }, [updateSectionHeight])

  // Throttled scroll handler with RAF
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return

    const currentScrollY = window.scrollY

    // Skip if scroll hasn't changed much
    if (Math.abs(currentScrollY - lastScrollY.current) < 5) return
    lastScrollY.current = currentScrollY

    requestAnimationFrame(() => {
      if (!sectionRef.current) return

      const sectionRect = sectionRef.current.getBoundingClientRect()
      const sectionTop = sectionRect.top
      const sectionBottom = sectionRect.bottom
      const windowHeight = window.innerHeight

      const shouldBeFixed = sectionTop <= 0 && sectionBottom > windowHeight * 0.8

      if (shouldBeFixed !== isGridFixed) {
        setIsGridFixed(shouldBeFixed)
      }
    })
  }, [isGridFixed])

  // Optimized scroll listener
  useEffect(() => {
    const throttledScroll = () => {
      if (scrollTimeoutRef.current) return

      scrollTimeoutRef.current = requestAnimationFrame(() => {
        handleScroll()
        scrollTimeoutRef.current = null
      })
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", throttledScroll)
      if (scrollTimeoutRef.current) {
        cancelAnimationFrame(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll])

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    })
  }, [])

  useEffect(() => {
    let timeoutId
    const throttledMouseMove = (e) => {
      if (timeoutId) return
      timeoutId = setTimeout(() => {
        handleMouseMove(e)
        timeoutId = null
      }, 16) // ~60fps
    }

    window.addEventListener("mousemove", throttledMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [handleMouseMove])

  return (
    <section ref={sectionRef} className={`min-h-screen relative overflow-hidden ${className}`}>
      {/* Optimized White Animated Grid Background */}
      <OptimizedWhiteAnimatedGrid isFixed={isGridFixed} sectionHeight={sectionHeight} />

      {/* Optimized Dynamic Mouse-Following Gradient */}
      <div
        className="absolute w-80 h-80 rounded-full opacity-8 blur-2xl transition-transform duration-500 ease-out pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          transform: `translate(${mousePosition.x - 160}px, ${mousePosition.y - 160}px)`,
          zIndex: isGridFixed ? 15 : 10,
          position: isGridFixed ? "fixed" : "absolute",
          willChange: "transform",
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-20">{children}</div>
    </section>
  )
}
