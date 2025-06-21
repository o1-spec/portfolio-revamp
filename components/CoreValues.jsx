"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Target,
  Heart,
  Zap,
  Shield,
  Users,
  Lightbulb,
  Rocket,
  Globe,
  Code,
  Award,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

const coreValues = [
  {
    icon: Code,
    title: "Excellence in Craft",
    description:
      "Every line of code is written with precision and purpose. I believe in creating solutions that are not just functional, but elegant and maintainable.",
    principles: [
      "Clean, readable code architecture",
      "Comprehensive testing and documentation",
      "Performance optimization at every level",
      "Continuous learning and improvement",
    ],
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: Users,
    title: "Human-Centered Design",
    description:
      "Technology should serve people, not the other way around. I prioritize user experience and accessibility in every project I undertake.",
    principles: [
      "Intuitive and accessible interfaces",
      "User feedback integration",
      "Inclusive design practices",
      "Empathy-driven development",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Security & Trust",
    description:
      "In an interconnected world, security isn't optional. I build systems with security-first mindset and maintain the highest standards of data protection.",
    principles: [
      "End-to-end encryption implementation",
      "Regular security audits and updates",
      "Privacy by design approach",
      "Transparent security practices",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Growth",
    description:
      "I embrace emerging technologies and methodologies to solve complex problems in creative ways, always pushing the boundaries of what's possible.",
    principles: [
      "Exploring cutting-edge technologies",
      "Creative problem-solving approaches",
      "Rapid prototyping and iteration",
      "Knowledge sharing and mentoring",
    ],
    color: "from-yellow-500 to-orange-500",
  },
];

// const missionPoints = [
//   {
//     icon: Target,
//     title: "Empowering Digital Transformation",
//     description:
//       "I help businesses and organizations leverage technology to achieve their goals, streamline operations, and create meaningful impact in their industries.",
//   },
//   {
//     icon: Globe,
//     title: "Building Scalable Solutions",
//     description:
//       "Creating robust, scalable applications that grow with businesses, handling everything from startup MVPs to enterprise-level systems.",
//   },
//   {
//     icon: Rocket,
//     title: "Accelerating Innovation",
//     description:
//       "Bringing cutting-edge technologies and best practices to every project, ensuring clients stay ahead of the technological curve.",
//   },
//   {
//     icon: Heart,
//     title: "Creating Positive Impact",
//     description:
//       "Using technology as a force for good, building solutions that improve lives, enhance productivity, and solve real-world problems.",
//   },
// ];

// const achievements = [
//   { label: "Years of Experience", value: "5+", icon: Award },
//   { label: "Successful Projects", value: "100+", icon: CheckCircle },
//   { label: "Client Satisfaction", value: "98%", icon: TrendingUp },
//   { label: "Technologies Mastered", value: "20+", icon: Zap },
// ];

export default function CoreValues() {
  const [activeValue, setActiveValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={ref}
      className="min-h-screen relative overflow-hidden py-20 mt-20"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ y: backgroundY }}
      >
        <motion.div
          className="absolute top-32 left-16 w-4 h-4 bg-purple-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-96 right-24 w-2 h-2 bg-blue-400 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-48 left-1/4 w-3 h-3 bg-green-400 rounded-full"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </motion.div>

      <div className=" mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-center">
              <Image
                src="/images/pythagoras.jpg"
                alt="Pythagoras Icon"
                width={42}
                height={24}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <span className="text-gray-400 text-sm font-medium tracking-wider uppercase">
              Philosophy
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Values &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Mission
            </span>
          </h2>

          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            The principles that guide my work and the mission that drives my
            passion for creating exceptional digital experiences. These values
            shape every decision I make and every line of code I write.
          </motion.p>
        </motion.div>

        {/* Achievements Stats */}
        {/* <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <achievement.icon className="w-5 h-5 text-white" />
              </motion.div>
              <motion.div
                className="text-2xl font-bold text-white mb-1"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              >
                {achievement.value}
              </motion.div>
              <div className="text-gray-400 text-sm">{achievement.label}</div>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Core Values Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {/* <motion.h3
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            Core Values
          </motion.h3> */}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-500 cursor-pointer group"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setActiveValue(index)}
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h4 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                  {value.title}
                </h4>

                <p className="text-gray-300 text-[18px] leading-relaxed mb-6">
                  {value.description}
                </p>

                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeValue === index ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  {value.principles.map((principle, principleIndex) => (
                    <motion.div
                      key={principle}
                      className="flex items-center gap-3 text-gray-400"
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{
                        delay: 1.6 + index * 0.2 + principleIndex * 0.1,
                        duration: 0.4,
                      }}
                    >
                      <motion.div
                          className="w-2 h-2 rounded-full flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500"
                          whileHover={{ scale: 1.5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                      <span className="text-[16px]">{principle}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 2.8, duration: 0.6 }}
        >
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto py-10"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h4 className="text-4xl font-bold text-white mb-8">
              Ready to Build Something Amazing Together?
            </h4>
           
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Conversation
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
