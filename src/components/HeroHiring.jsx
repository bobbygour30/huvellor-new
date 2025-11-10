import React from "react";
import assets from "../assets/assets";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroHiring() {
  const bgImage = assets.hiring1;
  const fgIllustration = assets.hiring2;

  return (
    <>
    <section className="relative isolate overflow-hidden font-sans">
      {/* Google Font for cursive text */}
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
        rel="stylesheet"
      />

      {/* Custom keyframes */}
      <style>{`
        @keyframes floaty {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-18px) translateX(6px) rotate(3deg); }
          100% { transform: translateY(0) translateX(0) rotate(0deg); }
        }
        @keyframes slow-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,64,72,0.25), rgba(0,64,72,0.25)), url('${bgImage}')`,
        }}
      />

      {/* Teal overlay */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-2/3 -z-5 transform-gpu"
        style={{
          clipPath: "polygon(0 0, 70% 0, 55% 100%, 0% 100%)",
          background:
            "linear-gradient(90deg, rgba(0,64,72,0.95) 0%, rgba(0,64,72,0.88) 100%)",
        }}
      />

      {/* Floating decor */}
      <div aria-hidden="true">
        <div
          className="hidden md:block absolute right-8 top-10 w-56 h-56 rounded-full opacity-30 blur-lg"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(0,64,72,0.4), rgba(0,64,72,0.7))",
            animation: "slow-rotate 28s linear infinite",
          }}
        />
        <div
          className="absolute left-10 top-20 w-6 h-6 rounded-full bg-white/20"
          style={{ animation: "floaty 6s ease-in-out infinite" }}
        />
        <div
          className="absolute left-28 top-8 w-10 h-10 rounded-full bg-white/15"
          style={{ animation: "floaty 7s ease-in-out -2s infinite" }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24 lg:py-32">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div className="text-white">
           

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug md:leading-[1.2] break-words">
              <span className="block">Hire Your Next</span>
              <span className="block">Candidate on Huvellor</span>
            </h2>

            {/* Smooth infinite typing animation with fixed height */}
            <div className="mt-4">
              <div
                className="inline-block text-3xl sm:text-4xl md:text-5xl overflow-hidden"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: "#f8f8f8",
                  background: "rgba(0,64,72,0.85)",
                  padding: "8px 18px",
                  borderRadius: "9999px",
                  transform: "translateY(-10px) rotate(-2deg)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                  minHeight: "1.4em", // 👈 prevents height collapse
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <ReactTyped
                  strings={[
                    "Ready to get hire?",
                    "Let's start your journey!",
                    "Find the perfect candidate today!",
                  ]}
                  typeSpeed={60}
                  backSpeed={30}
                  backDelay={2500}
                  loop
                  smartBackspace
                  showCursor={false}
                />
              </div>
            </div>

            <p className="mt-6 text-white/90 max-w-xl leading-relaxed">
              Let’s start a conversation — we connect you with verified
              candidates, fast placements, and smart recruiting tools to grow
              your business effectively.
            </p>

            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <Link
                to="/quote"
                className="inline-flex items-center rounded-md bg-[#F0C5B5]  px-6 py-3 text-sm font-bold text-[#004048] shadow-lg transition-transform transform hover:-translate-y-0.5"
              >
                Let’s talk
              </Link>
              
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center justify-center relative">
            <div className="relative w-80 sm:w-96 md:w-[480px] lg:w-[600px] xl:w-[700px]">
              <img
                src={fgIllustration}
                alt="Illustration of hiring"
                className="w-full h-auto object-contain rounded-2xl shadow-2xl"
                style={{ animation: "floaty 6s ease-in-out infinite" }}
              />
              <div
                className="absolute left-5 top-5 px-4 py-1 rounded-md text-xs font-medium tracking-wide"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  color: "#004048",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                }}
              >
                Top Talent
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
      </>
  );
}
