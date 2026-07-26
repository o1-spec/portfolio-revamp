"use client";

import { useEffect, useState, useRef } from "react";
import { BookOpen, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const articles = [
  {
    title:
      "Telemetry Systems: Understanding What Your Background Jobs Are Trying to Tell You",
    description:
      "A Dead Letter Queue can tell you that a job failed. However, a robust telemetry system goes further, helping you understand failure patterns and worker performance in real time.",
    date: "July 18, 2026",
    readTime: "4 min read",
    tech: ["Telemetry", "Background Jobs", "BullMQ", "Observability"],
    link: "https://medium.com/@oluwafemionadokun/telemetry-systems-understanding-what-your-background-jobs-are-trying-to-tell-you-b80593de2d1e?sharedUserId=oluwafemionadokun",
  },
  {
    title:
      "Why Retries Are Not Enough: The Role of Dead Letter Queues in Reliable Systems",
    description:
      "A customer places an order on an e-commerce platform. Behind the scenes, retries attempt to recover from failures, but when those reach their limits, Dead Letter Queues act as the ultimate safety net.",
    date: "June 6, 2026",
    readTime: "5 min read",
    tech: ["Distributed Systems", "DLQ", "Error Handling", "System Design"],
    link: "https://medium.com/@oluwafemionadokun/why-retries-are-not-enough-the-role-of-dead-letter-queues-in-reliable-systems-aba164215086?sharedUserId=oluwafemionadokun",
  },
];

export default function PublicationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="publications-inner"
      className="py-16 sm:py-24 lg:py-24 lg:pb-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {/* <div className="inline-flex items-center gap-2 mb-4 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full text-purple-400 font-mono text-xs sm:text-sm uppercase tracking-wider">
            <BookOpen size={14} />
            Technical Writing
          </div> */}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Articles &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Publications
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Writing about backend scalability, queue-based background workflows,
            system design, and caching strategies.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {articles.map((article, index) => (
            <motion.a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 sm:p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/15 flex flex-col min-h-[320px]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transitionDelay: `${index * 0.15}s`,
              }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Meta Info */}
              <div className="flex items-center justify-between mb-4 text-xs font-mono text-gray-400">
                <span>{article.date}</span>
                <span className="bg-purple-500/10 px-2 py-0.5 rounded text-purple-300">
                  {article.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-colors duration-300 leading-snug">
                {article.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                {article.description}
              </p>

              {/* Footer / Tech tags & icon */}
              <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {article.tech.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-[11px] font-mono text-gray-400 bg-slate-800/65 border border-slate-700/40 rounded px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 group-hover:text-purple-300 transition-colors duration-300 font-mono self-start">
                  Read on Medium
                  <ExternalLink
                    size={12}
                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Hover highlight border */}
              <div className="absolute inset-0 border border-purple-500/0 group-hover:border-purple-500/20 rounded-xl pointer-events-none transition-colors duration-300" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
