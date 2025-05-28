import { useState, useEffect } from "react";
import AnimatedCounter from "./AnimatedCounter";

export default function PortfolioLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showText, setShowText] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showUnderline, setShowUnderline] = useState(false);
  const [underlineAnimation, setUnderlineAnimation] = useState("");
  const [showZoomEffect, setShowZoomEffect] = useState(false);
  const [showNextSection, setShowNextSection] = useState(false);

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
                      
                      // After snake animation completes (2.2s), start zoom effect
                      setTimeout(() => {
                        setShowZoomEffect(true);
                        
                        // After zoom completes (1.5s), show next section
                        setTimeout(() => {
                          setShowNextSection(true);
                          if (onComplete) onComplete();
                        }, 1500);
                      }, 2200); // Wait for snake animation to complete
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

  useEffect(() => {
    if (!underlineAnimation) return;

    const cleanup = setTimeout(() => {
      setUnderlineAnimation("");
    }, 2200);

    return () => clearTimeout(cleanup);
  }, [underlineAnimation]);

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Loading Progress Bar */}
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

      {/* Main Text Animation */}
      {showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
              showUnderline ? "-translate-y-4" : ""
            } ${
              showZoomEffect ? "zoom-in-effect" : ""
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
              {typedText.split("").map((char, i) => (
                <span
                  key={i}
                  className={underlineAnimation ? `wave-char delay-${i}` : ""}
                  style={{
                    display: "inline-block",
                  }}
                >
                  {char}
                </span>
              ))}
              {typedText.length < 7 && <span className="animate-pulse">|</span>}
            </div>

            {showUnderline && (
              <div className="relative w-[50px] h-[2px] mt-2">
                <div
                  className={`absolute h-full bg-white ${
                    underlineAnimation ? "animate-underline-bounce" : ""
                  }`}
                  style={{
                    width: "40%",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Progress Counter */}
      <div className="absolute bottom-4 left-6">
        <AnimatedCounter value={Math.floor(progress)} />
      </div>

      {/* Next Section */}
      {showNextSection && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black slide-in-section">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white space-y-6">
              <h1 className="text-6xl font-bold mb-4 animate-fade-in-up">
                Welcome
              </h1>
              <p className="text-xl opacity-80 animate-fade-in-up-delay">
                Your portfolio experience begins now
              </p>
              <div className="w-24 h-1 bg-white mx-auto animate-scale-in"></div>
            </div>
          </div>
        </div>
      )}

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
            width: 40%;
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
          animation: underlineBounceCenter 2.2s ease-out forwards;
        }

        @keyframes snakeWave {
          0% {
            transform: translateY(0%);
          }
          25% {
            transform: translateY(-30%);
          }
          50% {
            transform: translateY(0%);
          }
          75% {
            transform: translateY(30%);
          }
          100% {
            transform: translateY(0%);
          }
        }

        .wave-char {
          animation: snakeWave 1s ease-in-out 2;
          animation-fill-mode: forwards;
        }

        .wave-char.delay-0 {
          animation-delay: 0s;
        }
        .wave-char.delay-1 {
          animation-delay: 0.05s;
        }
        .wave-char.delay-2 {
          animation-delay: 0.1s;
        }
        .wave-char.delay-3 {
          animation-delay: 0.15s;
        }
        .wave-char.delay-4 {
          animation-delay: 0.2s;
        }
        .wave-char.delay-5 {
          animation-delay: 0.25s;
        }
        .wave-char.delay-6 {
          animation-delay: 0.3s;
        }

        /* Zoom Effect Animation */
        @keyframes zoomIn {
          0% {
            transform: scale(1) translateY(-1rem) rotate(0deg);
          }
          20% {
            transform: scale(1.1) translateY(-1rem) rotate(45deg);
          }
          40% {
            transform: scale(2) translateY(-1rem) rotate(45deg);
          }
          70% {
            transform: scale(15) translateY(-1rem) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: scale(25) translateY(-1rem) rotate(45deg);
            opacity: 0;
          }
        }

        .zoom-in-effect {
          animation: zoomIn 1.5s ease-in-out forwards;
        }

        /* Next Section Slide In */
        @keyframes slideInFromBottom {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .slide-in-section {
          animation: slideInFromBottom 0.8s ease-out forwards;
        }

        /* Next Section Content Animations */
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay {
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out 0.9s forwards;
          transform: scaleX(0);
        }
      `}</style>
    </div>
  );
}