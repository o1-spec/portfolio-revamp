import { useState, useEffect } from "react";
import AnimatedCounter from "./AnimatedCounter";

export default function PortfolioLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showText, setShowText] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showUnderline, setShowUnderline] = useState(false);
  const [underlineAnimation, setUnderlineAnimation] = useState("");

  useEffect(() => {
    // Simulate realistic loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start the completion sequence
          setTimeout(() => {
            setIsComplete(true);
            // Show text after loader moves up
            setTimeout(() => {
              setShowText(true);
              // Start typewriter effect
              const text = "o1-spec";
              let currentIndex = 0;
              const typeInterval = setInterval(() => {
                if (currentIndex <= text.length) {
                  setTypedText(text.slice(0, currentIndex));
                  currentIndex++;
                } else {
                  clearInterval(typeInterval);
                  // After typing is complete, move text up and show underline
                  setTimeout(() => {
                    setShowUnderline(true);
                    // Animate underline left to right
                    setTimeout(() => {
                      setUnderlineAnimation("animate-underline-bounce");
                      setTimeout(() => {
                        if (onComplete) onComplete();
                      }, 2000);
                    }, 200);
                  }, 300);
                }
              }, 150);
            }, 600);
          }, 300);
          return 100;
        }

        // More realistic loading curve
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
  }, [onComplete]);

  return (
    <div className="inset-0 bg-black z-50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-6 transition-transform duration-700 ease-in-out overflow-hidden h-[200px] w-[300px]">
        <div
          className={`relative bg-gray-800 overflow-hidden rounded-md h-[40px] w-full transition-transform duration-700 ease-out ${
            isComplete ? "-translate-y-32" : "translate-y-0"
          }`}
        >
          <div
            className="absolute top-0 left-0 h-full bg-white transition-all duration-200 ease-out"
            style={{
              width: `${progress}%`,
              borderRadius: "3px",
            }}
          />
        </div>
      </div>

      {showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`relative flex flex-col items-center justify-center transition-transform duration-300 ${
              showUnderline ? "-translate-y-4" : ""
            }`}
          >
            <div
              className="relative text-white font-bold z-10"
              style={{
                fontSize: "2.5rem",
                fontWeight: "600",
                letterSpacing: "0.15em",
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, monospace',
              }}
            >
              {typedText}
              {typedText.length < 7 && <span className="animate-pulse">|</span>}
            </div>

            {showUnderline && (
              <div className="relative w-[40px] h-[2px] mt-2">
                <div
                  className={`absolute h-full bg-white ${
                    underlineAnimation ? "animate-underline-bounce" : ""
                  }`}
                  style={{
                    width: "0%", // Start from 0%
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-6">
        <AnimatedCounter value={Math.floor(progress)} />
      </div>

      <style jsx>{`
        @keyframes sweepGlow {
          0% {
            left: -100%;
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        .animate-sweep-right {
          animation: sweepRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes underlineBounceCenter {
          0% {
            transform: translateX(0%);
            width: 0%;
            opacity: 1;
          }
          25% {
            transform: translateX(0%);
            width: 100%;
          }
          50% {
            transform: translateX(0%);
            width: 100%;
          }
          60% {
            transform: translateX(-100%);
            width: 100%;
          }
          75% {
            transform: translateX(100%);
            width: 100%;
          }
          85% {
            transform: translateX(0%);
            width: 100%;
          }
          100% {
            transform: translateX(0%);
            width: 40%;
          }
        }

        .animate-underline-bounce {
          animation: underlineBounceCenter 1.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
