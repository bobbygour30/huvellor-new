"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

const sliderData = [
  {
    heading: ["Empowering", "Human Brilliance"],
    image: assets.hero2,
    badge: "Top Talent",
    subtitle: "Aligning people, culture, and capability for lasting success.",
  },
  {
    heading: ["Strategic HR Solutions"],
    image: assets.hero3,
    badge: "Fast Placement",
    subtitle: "Where human potential meets strategic excellence.",
  },
  {
    heading: ["Unlock Your Team's Potential"],
    image: assets.hiring1,
    badge: "Trusted Candidates",
    subtitle: "Tailored HR services for sustainable growth.",
  },
];

export default function HeroHiring2() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide every 7 seconds
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % sliderData.length),
      7000
    );
    return () => clearInterval(interval);
  }, []);

  const fadeVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut", delay: 0.2 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <section className="relative isolate overflow-hidden font-sans">
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
        rel="stylesheet"
      />
      {/* Background slider */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={sliderData[currentSlide].image}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,64,72,0.35), rgba(0,64,72,0.35)), url('${sliderData[currentSlide].image}')`,
            }}
          />
        </AnimatePresence>
      </div>

      {/* Teal overlay */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-2/3 -z-5"
        style={{
          clipPath: "polygon(0 0, 70% 0, 55% 100%, 0% 100%)",
          background:
            "linear-gradient(90deg, rgba(0,96,104,0.9) 0%, rgba(0,96,104,0.82) 100%)",
        }}
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-white">
          {/* Left Side */}
          <div>
            {/* Slider heading */}
            <AnimatePresence mode="wait">
              <motion.div
                key={sliderData[currentSlide].heading.join("-")}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug md:leading-[1.2] mb-4">
                  {sliderData[currentSlide].heading.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
              </motion.div>
            </AnimatePresence>

            {/* Animated Title (replaces old paragraph) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${currentSlide}`}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-6"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {sliderData[currentSlide].title}
                </h3>
              </motion.div>
            </AnimatePresence>

            {/* Animated Subtitle */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`subtitle-${currentSlide}`}
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-3 max-w-xl"
              >
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  {sliderData[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Static Typing effect */}
            <div
              className="inline-block text-2xl sm:text-3xl md:text-4xl mt-8"
              style={{
                fontFamily: "'Great Vibes', cursive",
                background: "rgba(0,64,72,0.85)",
                color: "#f8f8f8",
                padding: "8px 18px",
                borderRadius: "9999px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                minHeight: "3.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ReactTyped
                strings={[
                  "Ready to hire?",
                  "Let’s start your journey!",
                  "Find the perfect candidate today!",
                ]}
                typeSpeed={45}
                backSpeed={25}
                backDelay={4000}
                loop
                showCursor={false}
              />
            </div>

            {/* CTA Button */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <Link
                to="/services"
                className="inline-flex items-center rounded-md bg-[#F0C5B5] px-6 py-3 text-sm font-bold text-[#004048] shadow-lg transition-transform transform hover:-translate-y-0.5"
              >
                Discover More
              </Link>
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-10">
              {sliderData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}