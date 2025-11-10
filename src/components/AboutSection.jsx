"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import assets from "../assets/assets";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section className="max-w-[1500px] mx-auto px-6 md:px-8 lg:px-12 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-0 items-center">
        {/* LEFT: Layered images with smooth floating animation */}
        <div className="relative w-full h-full flex justify-center items-center lg:mt-40">
          {/* Floating background image */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:block absolute left-0 top-0 transform -translate-x-20 -translate-y-6 w-[550px] h-[550px] shadow-lg overflow-hidden rounded-sm"
          >
            <img
              src={assets.about1}
              alt="bg-left"
              className="object-cover w-full h-full"
            />
          </motion.div>

          {/* Foreground floating image */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 w-[500px] h-[550px] rounded-sm shadow-2xl overflow-hidden mt-10"
          >
            <img
              src="https://react.mediacity.co.in/hiredots/static/media/about-2-2.b88c9a575a3ec3f8f24c.jpg"
              alt="main"
              className="object-cover w-full h-full"
            />

            
          </motion.div>
        </div>

        {/* RIGHT: Content Section */}
        <div className="relative flex flex-col justify-start md:justify-center md:items-center lg:items-start w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-1 rounded-full bg-[#24585D]"></div>
          </div>

          <h2 className="text-4xl md:text-4xl lg:text-5xl font-extrabold text-[#24585D] leading-tight mb-6">
            Ready to Hire your Next
            <br />
            Candidate
          </h2>

          <p className="text-[#333333] max-w-xl md:max-w-md lg:max-w-xl mb-6 md:mb-8 text-lg">
            HUVELLOR was founded with a single belief that exceptional people
            power exceptional businesses. As a premium HR consultancy, we
            partner with companies that value quality, culture, and long-term
            talent success.
          </p>

          {/* === Feature Box === */}
          <div className="mt-6 w-full bg-white shadow-xl rounded-md overflow-hidden">
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-4 ">
                <FeatureLine text="Strategic talent partnerships" />
                <FeatureLine text="Quality over quantity approach" />
                <FeatureLine text="Faster hiring zero compromise" />
              </div>
              <div className="space-y-4">
                <FeatureLine text="Leadership driven recruitment" />
                <FeatureLine text="Precision hiring for culture & capability" />
                <FeatureLine text="Strategic hiring for skills & culture fit" />
              </div>
            </div>

            {/* Bottom ribbon */}
            <div className="bg-[#24585D] text-white px-6 py-4 flex items-center gap-3">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2v8"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 11h10"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 20h14v-6H5v6z"
                  stroke="#fff"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-medium">
                Welcome - Empowering Human Brilliance
              </span>
            </div>
          </div>

          {/* Signature Row */}
          <div className="mt-6 md:mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24">
                {" "}
                {/* Slightly larger container for crisp border */}
                {/* White border via padding + background */}
                <div className="absolute inset-0 rounded-full bg-white  shadow-lg">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img
                      src={assets.person2}
                      alt="Shephali Gupta"
                      className="w-full h-full object-cover rounded-full"
                      style={{ imageRendering: "-webkit-optimize-contrast" }} // Prevents blur on zoom
                    />
                  </div>
                </div>
                {/* Optional: Outer accent ring (your original dark border) */}
                <div className="absolute -inset-1 rounded-full border-2 border-[#24585D] -z-10"></div>
              </div>

              <div>
                <div className="text-lg font-semibold">Shephali Gupta</div>
                <div className="text-sm text-gray-400">FOUNDER</div>
              </div>
            </div>

            <div>
              <Link to="/about">
                <button className="bg-[#f7dace] text-[#004048] px-6 py-3 rounded-md font-semibold shadow-md hover:opacity-95 transition-opacity">
                  DISCOVER MORE
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable Feature Line Component
function FeatureLine({ text }) {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, repeatDelay: 3, duration: 2 }}
        className="flex-shrink-0 w-9 h-9 rounded-full bg-[#004048] flex items-center justify-center text-white"
      >
        <FaCheckCircle size={16} />
      </motion.div>
      <span className="text-slate-700 font-medium">{text}</span>
    </div>
  );
}
