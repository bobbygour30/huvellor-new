"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import assets from "../assets/assets";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const floatingAnimation = {
  y: [0, -12, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function HireBanner() {


  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden font-sans">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,55,63,0.88), rgba(0,55,63,0.92)), url('${assets.hire}')`,
        }}
      />


      {/* Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">

          {/* ---------- LEFT: Floating Image Frame ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative order-2 lg:order-1 flex justify-center"
          >
            <motion.div
              animate={floatingAnimation}
              className="relative w-full max-w-sm md:max-w-md lg:max-w-lg"
            >
              {/* Main Image */}
              <motion.img
                src="https://react.mediacity.co.in/hiredots/static/media/cta-2-1.8718beaea6babb89f996.png"
                alt="Hiring illustration"
                className="w-full h-auto object-contain rounded-lg drop-shadow-2xl"
                style={{
                  maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              />

              {/* Glowing Border Frame */}
              <motion.div
                className="absolute inset-0 border-4 sm:border-6 lg:border-8 rounded-lg pointer-events-none"
                style={{ borderColor: "#E8B4A0" }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(232, 180, 160, 0.3)",
                    "0 0 35px rgba(232, 180, 160, 0.5)",
                    "0 0 20px rgba(232, 180, 160, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Animated Tag */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6, type: "spring", stiffness: 120 }}
                viewport={{ once: true }}
                className="absolute -bottom-4 left-4 sm:left-6 bg-gradient-to-r from-[#E8B4A0] to-[#f4c9b3] text-[#00373F] px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                Top Talent Available
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ---------- RIGHT: Text + CTA ---------- */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-white space-y-6 sm:space-y-8 order-1 lg:order-2"
          >
            {/* Script Header */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl md:text-3xl"
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: "#F9E2D9",
              }}
            >
              Ready to hire?
            </motion.h3>

            {/* Main Headline - Word-by-Word Animation */}
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {["Hire", "Your", "Next", "Candidate", "on"].map((word, i) => (
  <React.Fragment key={i}>
    <motion.span
      custom={i}
      variants={textVariants}
      className={i === 4 ? "relative inline-block" : ""}
    >
      {i === 4 ? (
        <span style={{ color: "#E8B4A0" }} className="relative inline-block">
          Huvellor
          <motion.span
            className="absolute -bottom-1 left-0 w-full h-1"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              background: "linear-gradient(90deg, #E8B4A0, transparent)",
            }}
          />
        </span>
      ) : (
        word + " "
      )}
    </motion.span>

    {/* Add <br /> after “Next” for responsive layout */}
    {i === 2 && <br className="hidden xs:block" />}
  </React.Fragment>
))}

            </motion.h2>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              viewport={{ once: true }}
              className="text-base sm:text-lg md:text-xl text-white/85 max-w-lg leading-relaxed"
            >
              Crafting teams that define tomorrow.
            </motion.p>

            {/* Pulsing CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              viewport={{ once: true }}
              className="pt-2 sm:pt-4"
            >
              <Link
                to="/apply"
                className="group inline-flex items-center gap-3 text-white font-semibold text-base sm:text-lg border-b-4 pb-1 transition-all duration-300 hover:gap-5 hover:text-[#E8B4A0] relative"
                style={{ borderColor: "#E8B4A0" }}
              >
                Start your hiring journey
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-3 duration-300" />
                {/* Pulse Glow */}
                <motion.span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(232, 180, 160, 0)",
                      "0 0 0 10px rgba(232, 180, 160, 0.2)",
                      "0 0 0 20px rgba(232, 180, 160, 0)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1.2 }}
        viewport={{ once: true }}
        style={{
          background: "linear-gradient(to right, transparent, #E8B4A0, transparent)",
          transformOrigin: "center",
        }}
      />
    </section>
  );
}