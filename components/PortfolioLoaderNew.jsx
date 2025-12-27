import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function PortfolioLoaderNew({ onComplete, setShowNextSection }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
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
  }, [onComplete, setShowNextSection]);

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
                  repeat: Infinity,
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
            className="w-full max-w-64 h-2 bg-gray-700 rounded-full overflow-hidden mb-3 md:mb-4"
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
    </div>
  );
}