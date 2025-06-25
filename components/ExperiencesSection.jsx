"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  TrendingUp,
  Award,
  Users,
  Code,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const experiences = [
  {
    id: 1,
    company: "TECHSERVICES LIMITED",
    role: "Frontend Developer",
    type: "Full-time",
    location: "Remote",
    duration: "2025",
    period: "6 Months",
    description:
      "Development of core banking systems serving millions of users with 99.9% uptime.",
    achievements: [
      "Contributed to the development of a core banking system supporting day-to-day operations such as customer onboarding, transaction processing, and account management.",
      // "Contributed to the development of a core banking system supporting day-to-day operations such as customer onboarding, transaction processing, and account management. Currently in use by Turbo Microfinance Bank.",
      "Collaborated with a team of 6 developers to deliver secure and scalable financial products used internally by bank staff",
      "Assisted in implementing modular services architecture to improve maintainability and reduce system outages",
      "Built key components for sections like user management, loan processing, and audit logging essential to banking operations",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Material-UI",
      "React Query",
      "MIFOS",
    ],
    projects: [
      {
        name: "Banking Core System",
        impact: "2M+ daily transactions",
        users: "50K+ active users",
      },
    ],
    companyInfo: {
      industry: "Custom Software Solutions",
      size: "20+ employees",
      website: "https://techservicehub.io/",
    },
  },
  {
    id: 2,
    company: "TECHSERVICES LIMITED",
    role: "Frontend Developer",
    type: "Full-time",
    location: "Remote",
    duration: "2025",
    period: "4 Months",
    description:
      "development of digital banking systems serving millions of users with 99.9% uptime.",
    achievements: [
      "Contributed to the development of a digital banking platform enabling customers to manage accounts, view transactions, and perform transfers online",
      "Built and integrated user-facing components such as login, dashboard views, and transaction history using modern frontend technologies",
      "Implemented role-based access control and secure authentication flows to ensure data protection and compliance",
      "Worked closely with backend engineers to connect APIs for real-time balance updates, payment processing, and notifications",
    ],
    technologies: ["Next.js", "TypeScript", "Material-UI", "React Query"],
    projects: [
      {
        name: "Digital Banking Platform",
        impact: "99.9% uptime achieved",
        users: "25K+ customers",
      },
    ],
    companyInfo: {
      industry: "Custom Software Solutions",
      size: "20+ employees",
      website: "https://techservicehub.io/",
    },
  },
  {
    id: 3,
    company: "Ernext Gadgets",
    role: "Frontend Developer",
    type: "Contract",
    location: "Lagos, Nigeria",
    duration: "March 2025 - May 2025",
    period: "3 Months",
    description:
      "Built a full-featured e-commerce application for a technology gadget hub, enabling customers to seamlessly browse, order, and purchase gadgets online with secure checkout and real-time inventory updates.",
    achievements: [
      "Developed a complete e-commerce platform for a tech gadget hub with features like product browsing, cart, checkout, and order tracking",
      "Integrated secure payment gateways and real-time inventory management to enhance shopping experience",
      "Optimized frontend performance, resulting in faster page loads and smoother navigation across devices",
      "Implemented an admin dashboard for product and order management, improving operational efficiency for store staff",
    ],
    technologies: ["React", "Redux", "Appwrite", "Cloudinary", "Typescript"],
    projects: [
      {
        name: "E-Commerce Application",
        impact: "200 concurrent users",
        users: "85% success rate",
      },
    ],
    companyInfo: {
      industry: "E-commerce & Retail Technology",
      size: "5+ employees",
      website: "https://www.ernextgadgets.ng/",
    },
  },
  {
    id: 4,
    company: "HOTKEYS MASTER",
    role: "Frontend Developer",
    type: "Freelance",
    location: "Remote",
    duration: "Oct 2024 – November 2024",
    period: "2 Months",
    description:
      "Built an interactive, gamified web application that helps users master keyboard shortcuts for popular software like VS Code and Photoshop. Collaborated closely with a backend engineer to implement real-time features and performance tracking tools.",
    achievements: [
      "Designed and implemented the interactive 'game booth' for practicing keyboard shortcuts",
      "Collaborated with a backend engineer to integrate APIs for leaderboards and performance tracking",
      "Created responsive and engaging UI using modern frontend frameworks",
      "Contributed to a learning platform that blends gamification with productivity training",
    ],
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Framer Motion",
      "Appwrite",
    ],
    projects: [
      {
        name: "Interactive Game Booth",
        impact: "Hands-on learning for keyboard shortcuts",
        users: "Developers, designers, and power users",
      },
      {
        name: "Leaderboard & Tracking API Integration",
        impact: "Encouraged engagement and performance monitoring",
        users: "Global user base (beta)",
      },
    ],
    companyInfo: {
      industry: "Productivity & Learning",
      size: "Freelance/Small Team",
      website: "https://hotkeysmaster.com/",
      engagement: "Freelance",
    },
  },
];

export default function ExperienceSection() {
  const [selectedExperience, setSelectedExperience] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const timelineY = useTransform(scrollYProgress, [0, 1], [100, -100]);

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
        style={{ y: timelineY }}
      >
        <motion.div
          className="absolute top-40 left-20 w-3 h-3 bg-purple-500 rounded-full"
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
          className="absolute top-96 right-32 w-2 h-2 bg-blue-400 rounded-full"
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
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
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
                src="/images/edison.jpg"
                alt="Experience Icon"
                width={42}
                height={24}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <span className="text-gray-400 md:text-[15px] text-[13px] font-medium tracking-wider uppercase">
              Career Journey
            </span>
          </motion.div>

          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Professional
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Experience
            </span>
          </h2>

          <motion.p
            className="text-gray-400 text-[15px] md:text-[17px] max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            My professional journey through the world of software development,
            from junior developer to leading complex projects and teams.
          </motion.p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="flex flex-col lg:flex-row gap-12 pt-2 md:pt-6">
          {/* Timeline Navigation */}
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-5 md:mb-8">
              Career Timeline
            </h3>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <motion.button
                  key={exp.id}
                  onClick={() => setSelectedExperience(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    selectedExperience === index
                      ? "bg-purple-900/30 border-purple-500 text-white"
                      : "bg-white/5 border-gray-800 text-gray-400 hover:border-gray-600"
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                  }
                  transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[15px] md:text-[17px]">
                      {exp.company}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        selectedExperience === index ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                  <div className="opacity-75 md:text-[15px] text-[13px]">{exp.role}</div>
                  <div className="text-[14px] md:text-[15px] opacity-60 mt-1">
                    {exp.duration}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Experience Details */}
          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <motion.div
              key={selectedExperience}
              className="bg-white/5 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 py-5 md:py-6 md:p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Company Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-2">
                    {experiences[selectedExperience].role}
                  </h3>
                  <div className="flex items-center gap-x-4 gap-y-2 text-gray-400 flex-wrap">
                    <div className="flex items-center gap-1 text-[12px] md:text-[14px]">
                      <Briefcase className="w-4 h-4" />
                      <span>{experiences[selectedExperience].company}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[12px] md:text-[14px]">
                      <MapPin className="w-4 h-4" />
                      <span>{experiences[selectedExperience].location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[12px] md:text-[14px]">
                      <Calendar className="w-4 h-4" />
                      <span>{experiences[selectedExperience].period}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                    <span className="block px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[12px] md:text-[13px] rounded-full">
                      {experiences[selectedExperience].type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed mb-6 text-[14px] md:text-[16px]">
                {experiences[selectedExperience].description}
              </p>

              {/* Key Achievements */}
              <div className="mb-6">
                <h4 className="text-[15px] md:text-[18px] font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400 text-[14px] md:text-[16px]" />
                  Key Achievements
                </h4>
                <ul className="space-y-2">
                  {experiences[selectedExperience].achievements.map(
                    (achievement, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500"
                          whileHover={{ scale: 1.5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                        <span className="text-[13px] md:text-[14px] leading-relaxed">
                          {achievement}
                        </span>
                      </motion.li>
                    )
                  )}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-[15px] md:text-lg font-semibold text-white mb-2.5 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400 text-[14px] md:text-[16px]" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experiences[selectedExperience].technologies.map(
                    (tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-2 py-1 text-[12px] md:text-[15px] text-gray-300 text-sm rounded-full border border-gray-700 hover:border-purple-500/50 transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    )
                  )}
                </div>
              </div>

              {/* Projects Impact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experiences[selectedExperience].projects.map(
                  (project, index) => (
                    <motion.div
                      key={project.name}
                      className="bg-white/5 rounded-lg p-2.5"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h5 className="font-semibold text-white mb-2 text-[14px] md:text-[16px]">
                        {project.name}
                      </h5>
                      <div className="space-y-1 text-sm text-gray-400">
                        <div className="flex items-center gap-2 text-[12px] md:text-[14px]">
                          <TrendingUp className="w-3 h-3" />
                          <span>{project.impact}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[12px] md:text-[14px]">
                          <Users className="w-3 h-3" />
                          <span>{project.users}</span>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
