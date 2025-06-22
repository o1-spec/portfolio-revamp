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
    company: "TECHSERVICES",
    role: "Senior Full Stack Developer",
    type: "Full-time",
    location: "Remote",
    duration: "2022 - Present",
    period: "2+ years",
    description:
      "Leading the development of core banking systems and digital banking platforms, serving millions of users with 99.9% uptime.",
    achievements: [
      "Architected and built a core banking system handling $2M+ daily transactions",
      "Led a team of 6 developers in delivering critical financial applications",
      "Implemented microservices architecture reducing system downtime by 40%",
      "Developed real-time fraud detection system preventing $500K+ in losses",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
    ],
    projects: [
      {
        name: "Banking Core System",
        impact: "$2M+ daily transactions",
        users: "50K+ active users",
      },
      {
        name: "Digital Banking Platform",
        impact: "99.9% uptime achieved",
        users: "25K+ customers",
      },
    ],
    companyInfo: {
      industry: "Financial Technology",
      size: "500+ employees",
      website: "https://techservices.com",
    },
  },
  {
    id: 2,
    company: "DevConnect Inc.",
    role: "Lead Frontend Developer",
    type: "Contract",
    location: "San Francisco, CA",
    duration: "2021 - 2022",
    period: "1 year",
    description:
      "Spearheaded the development of a revolutionary developer networking platform, growing the user base from 1K to 10K+ active developers.",
    achievements: [
      "Built real-time collaboration tools supporting 1000+ concurrent users",
      "Implemented AI-powered project matching algorithm with 85% success rate",
      "Optimized application performance resulting in 60% faster load times",
      "Mentored 3 junior developers and established coding standards",
    ],
    technologies: [
      "React",
      "Node.js",
      "Socket.io",
      "MongoDB",
      "GraphQL",
      "Docker",
    ],
    projects: [
      {
        name: "DevConnect Platform",
        impact: "900% user growth",
        users: "10K+ developers",
      },
      {
        name: "Real-time Collaboration Suite",
        impact: "1000+ concurrent users",
        users: "85% success rate",
      },
    ],
    companyInfo: {
      industry: "Developer Tools",
      size: "50-100 employees",
      website: "https://devconnect.com",
    },
  },
  {
    id: 3,
    company: "Analytics Pro",
    role: "Frontend Developer",
    type: "Full-time",
    location: "New York, NY",
    duration: "2020 - 2021",
    period: "1 year",
    description:
      "Developed advanced analytics dashboards and data visualization tools for e-commerce platforms, processing millions of data points daily.",
    achievements: [
      "Created interactive dashboards processing 10M+ data points daily",
      "Implemented real-time data streaming with 99.5% accuracy",
      "Reduced dashboard load times by 70% through optimization",
      "Built custom charting library used across 5+ products",
    ],
    technologies: [
      "Vue.js",
      "D3.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
    ],
    projects: [
      {
        name: "E-commerce Analytics Dashboard",
        impact: "10M+ data points/day",
        users: "15K+ businesses",
      },
      {
        name: "Real-time Visualization Engine",
        impact: "70% faster load times",
        users: "99.5% accuracy",
      },
    ],
    companyInfo: {
      industry: "Business Intelligence",
      size: "100-200 employees",
      website: "https://analyticspro.com",
    },
  },
  {
    id: 4,
    company: "StartupLab",
    role: "Junior Full Stack Developer",
    type: "Full-time",
    location: "Austin, TX",
    duration: "2019 - 2020",
    period: "1 year",
    description:
      "Started my professional journey building MVPs and prototypes for various startups, learning to work in fast-paced environments.",
    achievements: [
      "Delivered 8+ MVP applications within tight deadlines",
      "Collaborated with designers to implement pixel-perfect UIs",
      "Integrated 15+ third-party APIs and services",
      "Participated in code reviews and agile development processes",
    ],
    technologies: [
      "React",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Stripe",
      "Heroku",
    ],
    projects: [
      {
        name: "Multiple MVP Applications",
        impact: "8+ successful launches",
        users: "Various startups",
      },
      {
        name: "API Integration Suite",
        impact: "15+ integrations",
        users: "Multiple clients",
      },
    ],
    companyInfo: {
      industry: "Startup Incubator",
      size: "20-50 employees",
      website: "https://startuplab.com",
    },
  },
];

const skills = [
  {
    name: "Frontend Development",
    level: 95,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Backend Development",
    level: 90,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "System Architecture",
    level: 85,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Database Design",
    level: 88,
    color: "from-yellow-500 to-orange-500",
  },
  { name: "DevOps & Cloud", level: 80, color: "from-red-500 to-pink-500" },
  {
    name: "Team Leadership",
    level: 85,
    color: "from-indigo-500 to-purple-500",
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

      <div className="container mx-auto px-6">
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
            <span className="text-gray-400 text-[17px] font-medium tracking-wider uppercase">
              Career Journey
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Professional
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Experience
            </span>
          </h2>

          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            My professional journey through the world of software development,
            from junior developer to leading complex projects and teams.
          </motion.p>
        </motion.div>

        {/* Skills Overview */}
        {/* <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Core Competencies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-gray-400 text-sm">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Experience Timeline */}
        <div className="flex flex-col lg:flex-row gap-12 pt-6">
          {/* Timeline Navigation */}
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
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
                    <span className="font-semibold text-[20px]">
                      {exp.company}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        selectedExperience === index ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                  <div className="opacity-75 text-[17px]">{exp.role}</div>
                  <div className="text-[17px] opacity-60 mt-1">
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
              className="bg-white/5 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Company Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {experiences[selectedExperience].role}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-1 text-[18px]">
                      <Briefcase className="w-4 h-4" />
                      <span>{experiences[selectedExperience].company}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[18px]">
                      <MapPin className="w-4 h-4" />
                      <span>{experiences[selectedExperience].location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[18px]">
                      <Calendar className="w-4 h-4" />
                      <span>{experiences[selectedExperience].period}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                    <span className="block px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[16px] rounded-full">
                      {experiences[selectedExperience].type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed mb-6 text-[20px]">
                {experiences[selectedExperience].description}
              </p>

              {/* Key Achievements */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400 text-[20px]" />
                  Key Achievements
                </h4>
                <ul className="space-y-3">
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
                        <span className="text-[18px] leading-relaxed">
                          {achievement}
                        </span>
                      </motion.li>
                    )
                  )}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400 text-[18px]" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experiences[selectedExperience].technologies.map(
                    (tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 text-[17px] text-gray-300 text-sm rounded-full border border-gray-700 hover:border-purple-500/50 transition-colors"
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
                      className="bg-white/5 rounded-lg p-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h5 className="font-semibold text-white mb-2 text-[18px]">
                        {project.name}
                      </h5>
                      <div className="space-y-1 text-sm text-gray-400">
                        <div className="flex items-center gap-2 text-[16px]">
                          <TrendingUp className="w-3 h-3" />
                          <span>{project.impact}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[16px]">
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
