import React from "react";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

export default function ResumeHero() {
  const bgImage = assets.resumehero;

  return (
    <section className="relative overflow-hidden font-sans isolate mt-10">
      <style>{`
        @keyframes floatPulse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes rotateGradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 36, 41, 0.6), rgba(0, 36, 41, 0.7)), url('${bgImage}')`,
        }}
      ></div>

      {/* Glowing Gradient Orb */}
      <div
        className="absolute right-10 bottom-10 w-80 h-80 rounded-full blur-3xl opacity-40 -z-5"
        style={{
          background:
            "conic-gradient(from 180deg, rgba(250,212,188,0.5), rgba(0,64,72,0.6), rgba(240,197,181,0.5))",
          animation: "rotateGradient 40s linear infinite",
        }}
      ></div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28 lg:py-36">
        <div className="text-white relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="block">Submit Your Resume</span>
            <span className="block text-[#F0C5B5]">and Get Hired Faster</span>
          </h1>

          {/* Typing Effect */}
          <div className="mt-8 h-[3rem] sm:h-[3.5rem] flex items-center">
            <div
              className="inline-flex items-center px-8 py-3 rounded-full bg-[#F0C5B5]/20 backdrop-blur-sm border border-[#F0C5B5]/30 shadow-lg"
              style={{
                color: "#F0C5B5",
                fontSize: "1.8rem",
                transition: "all 0.4s ease",
              }}
            >
              <ReactTyped
                strings={[
                  "Dream Job Awaits!",
                  "Upload and Let Employers Find You.",
                  "Your Career Starts Here!",
                ]}
                typeSpeed={45} // smoother typing
                backSpeed={25} // smoother backspacing
                backDelay={2500}
                loop
                smartBackspace
                showCursor={true}
                cursorChar="|"
              />
            </div>
          </div>

          <p className="mt-6 text-white/85 max-w-lg leading-relaxed">
            Don’t wait for opportunities — create them. Upload your resume and
            get matched with companies actively hiring top talent like you.
          </p>

          {/* Button */}
          <div className="mt-8">
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 rounded-full bg-[#F0C5B5] text-[#004048] px-8 py-3 font-semibold text-base shadow-lg hover:scale-105 transition-transform"
            >
              Submit Resume
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
