import { useState, useEffect } from "react";
import AnimatedCounter from "./AnimatedCounter";

export default function PortfolioLoader({
  onComplete,
  setShowNextSection,
}) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showText, setShowText] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showUnderline, setShowUnderline] = useState(false);
  const [underlineAnimation, setUnderlineAnimation] = useState("");
  const [hideCounter, setHideCounter] = useState(false);
  const [hideTitle, setHideTitle] = useState(false);

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
                    setTimeout(() => {
                      setUnderlineAnimation("animate-underline-bounce");
                      setTimeout(() => {
                        // First hide the counter
                        setHideCounter(true);
                        // Then hide the title after a delay
                        setTimeout(() => {
                          setHideTitle(true);
                          // Reduced delay - start next section right after wave animation
                          setTimeout(() => {
                            setShowNextSection(true);
                            // Minimal delay before calling onComplete
                            setTimeout(() => {
                              if (onComplete) onComplete();
                            }, 200);
                          }, 800);
                        }, 800);
                      }, 2300); // Slightly after wave animation completes (2.2s)
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

    // Total duration = 2 loops × 1s = 2s + small buffer
    const cleanup = setTimeout(() => {
      setUnderlineAnimation(""); // Removes the snake class
    }, 2200); // Wait slightly longer than 2 loops

    return () => clearTimeout(cleanup);
  }, [underlineAnimation]);

  return (
    <div className="overflow-hidden fixed inset-0 bg-black z-50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-6 transition-transform duration-700 ease-in-out overflow-hidden h-[150px] md:h-[200px] w-[220px] md:w-[300px]">
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
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="h-[80px] overflow-hidden">
          <div
            className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
              showUnderline ? "-translate-y-4" : ""
            } ${hideTitle ? "translate-y-[80px]" : "translate-y-0"}`}
            style={{
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <div
              className="relative text-white font-bold z-10"
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                letterSpacing: "0.15em",
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, monospace',
              }}
            >
              {typedText.split("").map((char, i) => (
                <span
                  key={i}
                  className={`font-bold text-xl md:text-3xl ${underlineAnimation ? `wave-char delay-${i}` : ""}`}
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
              <div
                className={`relative w-[50px] h-[2px] mt-2 transition-opacity duration-300`}
              >
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
        </div>
      )}

      <div
        className={`absolute bottom-4 left-6 transition-all duration-700 ease-out ${
          hideCounter ? "translate-y-24 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
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
      `}</style>
    </div>
  );
}
