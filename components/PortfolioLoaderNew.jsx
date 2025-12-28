"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function PortfolioLoaderNew({ onComplete, setShowNextSection }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 50 && !showText) {
          setShowText(true);
        }

        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              setShowNextSection(true);
              onComplete();
            }, 400);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete, setShowNextSection, showText]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden px-4">
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="wave mb-5 md:mb-8"
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <motion.div
                key={i}
                className="bar bg-white"
                animate={{
                  height: [20, 60, 20],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
                style={{
                  width: "8px",
                  borderRadius: "4px",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isComplete && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-56 md:max-w-64 h-2 bg-gray-700 rounded-full overflow-hidden mb-3 md:mb-4"
          >
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showText && !isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: [
                "0 0 25px rgba(255, 255, 255, 0.4), 0 0 50px rgba(255, 255, 255, 0.2), 0 0 75px rgba(255, 255, 255, 0.1)",
                "0 0 40px rgba(255, 255, 255, 0.6), 0 0 70px rgba(255, 255, 255, 0.3), 0 0 100px rgba(255, 255, 255, 0.15)",
                "0 0 25px rgba(255, 255, 255, 0.4), 0 0 50px rgba(255, 255, 255, 0.2), 0 0 75px rgba(255, 255, 255, 0.1)",
              ],
            }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="text-black bg-white rounded-lg px-4 py-4 text-center mb-6 md:mb-8"
          >
            <p
              className="text-lg md:text-xl font-bold tracking-wide"
              style={{
                fontSize: "clamp(1.25rem, 4vw, 2rem)",
                fontWeight: "900",
                letterSpacing: "0.15em",
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, monospace',
              }}
            >
              o1-spec
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}