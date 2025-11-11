"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import assets from "../assets/assets";

/**
 * Updated HireBanner component — matches the poster layout:
 * - Big cursive "Ready to hire?" at top-left
 * - Large bold stacked headline
 * - Right-side illustration (uses the same illustration that was in the component / assets)
 * - Hanging sign in front of the chair (poster style)
 * - Responsive and closely aligned to the provided image composition
 *
 * Notes:
 * - Make sure assets.hire (background) and assets.hiring2 (foreground illustration) exist in your assets file.
 * - TailwindCSS required. Framer Motion used for subtle animation.
 */

export default function HireBannerPoster() {


  return (
    <section className="relative bg-[#1290a0] min-h-[84vh] md:min-h-[76vh] flex items-center justify-center overflow-hidden font-sans">
      {/* Google cursive font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
        rel="stylesheet"
      />

     

      {/* left teal block (poster look) */}
      <div
        className="absolute inset-y-0 left-0 -z-10 w-full md:w-3/5 lg:w-3/5"
        style={{
          clipPath: "polygon(0 0, 66% 0, 56% 100%, 0% 100%)",
          backgroundColor: "#1290a0", // changeable primary teal for your brand
        }}
        aria-hidden
      />

      {/* Decorative subtle shapes (optional) */}
      <div className="absolute right-12 top-8 hidden lg:block -z-10">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="w-44 h-44 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(0,0,0,0.05), rgba(255,255,255,0.02))",
          }}
        />
      </div>

      {/* Main container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* LEFT TEXT (matches poster stacking) */}
          <div className="text-left text-white flex flex-col gap-6 order-2 lg:order-1">
            {/* cursive small heading */}
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{ fontFamily: "'Great Vibes', cursive" }}
              className="text-3xl md:text-4xl lg:text-5xl leading-tight text-[#062E31]/90"
            >
              Ready to hire?
            </motion.h3>

            {/* large stacked headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.8 }}
              className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
            >
              <span className="block text-white">Hire Your Next</span>
              <span className="block text-white">Candidate on</span>
              <span className="block text-[#F1B99F]">Huvellor</span>
            </motion.h1>

            {/* small paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="max-w-xl text-black text-base md:text-lg"
            >
              We connect you with verified talent, fast placement support, and
              hiring tools built to scale your team — quickly and confidently.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="mt-2"
            >
              <Link
                to="/apply"
                className="inline-flex items-center gap-3 bg-[#F1B99F] text-[#063636] font-semibold px-5 py-3 rounded-full shadow-md hover:translate-y-[-2px] transition-transform"
              >
                Start your hiring journey
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT ILLUSTRATION (poster) */}
          <div className="relative order-1 lg:order-2 flex items-end justify-center md:justify-end">
            {/* wrapper controls size and poster composition */}
            <div className="relative w-full max-w-[520px] md:max-w-[600px] lg:max-w-[680px]">
              {/* person + chair illustration */}
              <motion.img
                src="https://react.mediacity.co.in/hiredots/static/media/cta-2-1.8718beaea6babb89f996.png
"
                alt="Hiring illustration"
                className="w-full h-auto object-contain rounded-2xl "
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                style={{ willChange: "transform" }}
              />

              {/* hanging sign (poster style) — positioned relative to the chair */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="absolute left-4 bottom-6 md:left-6 md:bottom-10 bg-white text-[#00373F] px-5 py-4 rounded-md shadow-2xl border border-white/60 text-sm sm:text-base font-bold leading-tight"
              >
                <div className="leading-tight text-left">
                  <span className="block">We Help</span>
                  <span className="block">You Fill</span>
                  <span className="block">This Seat with</span>
                  <span className="block">Brilliance.</span>
                </div>
              </motion.div>

              {/* thin horizontal baseline to mimic poster ground line */}
              <div className="hidden md:block absolute left-6 right-6 bottom-2 h-[2px] bg-black/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
