"use client"

import { useState, useRef, useEffect } from "react"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, ArrowUpRight, Sparkles } from "lucide-react"

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState({
    header: false,
    form: false,
    contactInfo: false,
    contactCards: [false, false, false],
    socialLinks: false,
    availability: false,
    cta: false,
  })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("idle")
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Staggered animation effect
  useEffect(() => {
    if (isVisible) {
      const animationSequence = [
        { key: "header", delay: 0 },
        { key: "form", delay: 200 },
        { key: "contactInfo", delay: 400 },
        { key: "contactCards", delay: 600, isArray: true },
        { key: "socialLinks", delay: 1000 },
        { key: "availability", delay: 1200 },
        { key: "cta", delay: 1400 },
      ]

      const timeouts = []

      animationSequence.forEach(({ key, delay, isArray }) => {
        const timeout = setTimeout(() => {
          if (isArray && key === "contactCards") {
            // Animate contact cards one by one
            ;[0, 1, 2].forEach((index) => {
              const cardTimeout = setTimeout(() => {
                setAnimatedElements((prev) => ({
                  ...prev,
                  contactCards: prev.contactCards.map((item, i) => (i === index ? true : item)),
                }))
              }, index * 150)
              timeouts.push(cardTimeout)
            })
          } else {
            setAnimatedElements((prev) => ({ ...prev, [key]: true }))
          }
        }, delay)
        timeouts.push(timeout)
      })

      return () => timeouts.forEach(clearTimeout)
    }
  }, [isVisible])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 3000)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "oluwafemionadokun@gmail.com",
      href: "mailto:oluwafemionadokun@gmail.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+234 705 826 6972",
      href: "tel:+2347058266972",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Lagos, Nigeria",
      href: "#",
      color: "from-purple-500 to-pink-500",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/o1-spec",
      color: "hover:bg-gray-800 hover:text-white",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/onadokun",
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/onadokun",
      color: "hover:bg-sky-500 hover:text-white",
    },
  ]

  return (
    <div ref={sectionRef} className="text-gray-900 mt-20 font-mono">
      {/* Content */}
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: animatedElements.header ? 1 : 0,
            transform: animatedElements.header ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <div className="relative inline-block">
            <h2 className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Let's Work
              <br />
              <span className="text-gray-600 relative">
                Together
                <Sparkles className="absolute -top-2 -right-8 w-6 h-6 text-blue-500 animate-pulse" />
              </span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 rounded-full" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed tracking-wide">
            Have a project in mind? Let's discuss how we can bring your ideas to life with cutting-edge technology and
            creative solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 container mx-auto">
          {/* Contact Form */}
          <div
            className="space-y-8"
            style={{
              opacity: animatedElements.form ? 1 : 0,
              transform: animatedElements.form ? "translateX(0)" : "translateX(-50px)",
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <div className="relative">
              <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 hover:bg-white hover:border-gray-300 hover:shadow-xl transition-all duration-500 group shadow-lg">
                <h3 className="text-4xl font-bold mb-4 tracking-tight text-gray-900">Send a Message</h3>
                <p className="text-gray-600 mb-6 tracking-wide text-[18px]">
                  Fill out the form below and I'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group relative">
                      <label htmlFor="name" className="block text-[16px] font-medium text-gray-700 mb-2 tracking-wide">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-gray-900 placeholder-gray-500 tracking-wide hover:bg-white hover:border-gray-400"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div className="group relative">
                      <label htmlFor="email" className="block text-[16px] font-medium text-gray-700 mb-2 tracking-wide">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-gray-900 placeholder-gray-500 tracking-wide hover:bg-white hover:border-gray-400"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <label htmlFor="subject" className="block text-[16px] font-medium text-gray-700 mb-2 tracking-wide">
                      Subject
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-gray-900 placeholder-gray-500 tracking-wide hover:bg-white hover:border-gray-400"
                        placeholder="Project Discussion"
                      />
                    </div>
                  </div>

                  <div className="group relative">
                    <label htmlFor="message" className="block text-[16px] font-medium text-gray-700 mb-2 tracking-wide">
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-gray-900 placeholder-gray-500 resize-none tracking-wide hover:bg-white hover:border-gray-400"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-700 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-900/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="tracking-wide">Sending...</span>
                      </>
                    ) : submitStatus === "success" ? (
                      <>
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <span className="tracking-wide text-[18px]">Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <span className="tracking-wide text-[18px]">Send Message</span>
                        <Send
                          size={18}
                          className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300"
                        />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div
              style={{
                opacity: animatedElements.contactInfo ? 1 : 0,
                transform: animatedElements.contactInfo ? "translateX(0)" : "translateX(50px)",
                transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <h3 className="text-4xl font-bold mb-4 tracking-tight text-gray-900">Get in Touch</h3>
              <p className="text-gray-600 tracking-wide text-[19px]">
                Prefer to reach out directly? Here are the best ways to contact me.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="group relative flex items-center gap-4 p-6 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white hover:border-gray-300 hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:scale-[1.02]"
                  style={{
                    opacity: animatedElements.contactCards[index] ? 1 : 0,
                    transform: animatedElements.contactCards[index] ? "translateY(0)" : "translateY(30px)",
                    transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  <div className="relative w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 group-hover:scale-110 transition-all duration-500">
                    <info.icon
                      size={22}
                      className="text-gray-700 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <p className="text-sm text-gray-500 tracking-wide text-[19px] mb-1">{info.label}</p>
                    <p className="font-medium tracking-wide text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                      {info.value}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-gray-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 group-hover:-translate-y-1 transition-all duration-500"
                  />
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div
              className="pt-8"
              style={{
                opacity: animatedElements.socialLinks ? 1 : 0,
                transform: animatedElements.socialLinks ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <h4 className="text-xl font-semibold mb-6 tracking-tight text-gray-900">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-14 h-14 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-center transition-all duration-500 overflow-hidden transform hover:scale-110 hover:rotate-3 hover:shadow-lg ${social.color}`}
                    aria-label={social.label}
                    style={{
                      transitionDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <social.icon
                      size={22}
                      className="relative text-gray-700 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div
              className="relative p-6 bg-gradient-to-r from-green-50/90 to-emerald-50/90 backdrop-blur-sm border border-green-200 rounded-xl overflow-hidden group hover:from-green-100/90 hover:to-emerald-100/90 hover:border-green-300 transition-all duration-500"
              style={{
                opacity: animatedElements.availability ? 1 : 0,
                transform: animatedElements.availability ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-emerald-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                <span className="font-semibold tracking-wide text-[20px] text-green-800">Available for Projects</span>
              </div>
              <p className="text-green-700 text-[18px] tracking-wide relative">
                Currently accepting new projects and collaborations. Let's create something amazing together!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-20 pt-16 border-t border-gray-200"
          style={{
            opacity: animatedElements.cta ? 1 : 0,
            transform: animatedElements.cta ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <h3 className="text-3xl font-bold mb-4 tracking-tight text-gray-900">Ready to Start Your Project?</h3>
          <p className="text-gray-600 mb-8 text-[19px] max-w-2xl mx-auto tracking-wide">
            Whether you need a complete web application, mobile app, or just want to discuss an idea, I'm here to help
            bring your vision to life.
          </p>
          <a
            href="mailto:oluwafemionadokun@gmail.com"
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-700 transition-all duration-500 overflow-hidden transform hover:scale-105 hover:shadow-2xl hover:shadow-gray-900/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <span className="relative tracking-wide text-[18px]">Start a Conversation</span>
            <ArrowUpRight
              size={18}
              className="relative group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-12 transition-all duration-300"
            />
          </a>
        </div>
      </div>
    </div>
  )
}
