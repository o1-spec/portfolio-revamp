"use client";

import { useState, useEffect } from "react";
import AnimatedCounter from "./AnimatedCounter";

export default function PortfolioLoader({ onComplete, setShowNextSection }) {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [hideCounter, setHideCounter] = useState(false);
  const [hideTitle, setHideTitle] = useState(false);
  const [showRectangle, setShowRectangle] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowRectangle(true);
    }, 300);

    setTimeout(() => {
      const text = "o1-spec";
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setTypedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 200);

      return () => clearInterval(typeInterval);
    }, 800);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setHideCounter(true);
            setHideTitle(true);
            setTimeout(() => {
              setShowNextSection(true);
              setTimeout(() => {
                if (onComplete) onComplete();
              }, 200);
            }, 800);
          }, 500);
          return 100;
        }

        const remaining = 100 - prev;
        const increment =
          remaining > 50
            ? Math.random() * 5 + 2
            : remaining > 20
            ? Math.random() * 3 + 1
            : Math.random() * 2 + 0.5;

        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete, setShowNextSection]);

  return (
    <div className="overflow-hidden fixed inset-0 bg-black z-50">
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="h-[100px] sm:h-[120px] md:h-[140px] w-full max-w-md overflow-hidden bg-transparent relative">
          {showText && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`relative transition-all duration-800 ${
                  hideTitle
                    ? "translate-y-[150px] sm:translate-y-[180px] md:translate-y-[200px]"
                    : "translate-y-0"
                }`}
                style={{
                  transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <div
                  className={`absolute inset-0 bg-white rounded-lg transition-all duration-700 ease-out animate-subtle-glow ${
                    showRectangle
                      ? "scale-100 opacity-100"
                      : "scale-75 opacity-0"
                  }`}
                  style={{
                    transform: showRectangle ? "scale(1.1)" : "scale(0.8)",
                  }}
                />

                <div
                  className="relative px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-black font-bold z-10"
                  style={{
                    fontSize: "clamp(1.25rem, 4vw, 2rem)",
                    fontWeight: "600",
                    letterSpacing: "0.15em",
                    fontFamily:
                      'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, monospace',
                  }}
                >
                  {typedText.split("").map((char, i) => (
                    <span
                      key={i}
                      className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl inline-block"
                    >
                      {char}
                    </span>
                  ))}
                  {typedText.length < 7 && (
                    <span className="animate-pulse text-black/70">|</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div
        className={`absolute bottom-4 left-4 sm:left-6 transition-all duration-700 ease-out ${
          hideCounter ? "translate-y-24 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <AnimatedCounter value={Math.floor(progress)} />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
        <div
          className="h-full bg-white transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <style jsx>{`
        @keyframes subtle-glow {
          0%,
          100% {
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.4),
              0 0 50px rgba(255, 255, 255, 0.2),
              0 0 75px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.6),
              0 0 70px rgba(255, 255, 255, 0.3),
              0 0 100px rgba(255, 255, 255, 0.15);
          }
        }

        .animate-subtle-glow {
          animation: subtle-glow 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
