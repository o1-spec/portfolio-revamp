"use client"

import { useEffect, useState } from "react"

const WhiteAnimatedGrid = () => {
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 })
  const [animatedCells, setAnimatedCells] = useState(new Set())

  useEffect(() => {
    const updateGridSize = () => {
      const cellSize = 40
      const rows = Math.ceil(window.innerHeight / cellSize)
      const cols = Math.ceil(window.innerWidth / cellSize)
      setGridSize({ rows, cols })
    }

    updateGridSize()
    window.addEventListener("resize", updateGridSize)
    return () => window.removeEventListener("resize", updateGridSize)
  }, [])

  useEffect(() => {
    const animateRandomCells = () => {
      const newAnimatedCells = new Set()
      const numCells = Math.floor(Math.random() * 25) + 15

      for (let i = 0; i < numCells; i++) {
        const row = Math.floor(Math.random() * gridSize.rows)
        const col = Math.floor(Math.random() * gridSize.cols)
        newAnimatedCells.add(`${row}-${col}`)
      }

      setAnimatedCells(newAnimatedCells)
    }

    const interval = setInterval(animateRandomCells, 2000)
    return () => clearInterval(interval)
  }, [gridSize])

  const renderGrid = () => {
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
              border: "1px solid rgba(0, 0, 0, 0.08)",
              backgroundColor: isAnimated ? "rgba(0, 0, 0, 0.05)" : "transparent",
              transition: "all 0.5s ease-in-out",
              transform: isAnimated ? "scale(1.1)" : "scale(1)",
            }}
          />,
        )
      }
    }
    return cells
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle at center, #ffffff 0%, #f8f9fa 100%)",
        overflow: "hidden",
        zIndex: -1,
      }}
    >
      {renderGrid()}
    </div>
  )
}

export default WhiteAnimatedGrid
