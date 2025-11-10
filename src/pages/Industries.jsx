// pages/Industries.jsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  HiOutlineComputerDesktop,
  HiOutlineBanknotes,
  HiOutlineHeart,
  HiOutlineWrenchScrewdriver,
  HiOutlineShoppingCart,
  HiOutlineRocketLaunch,
  HiOutlineTruck,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const INDUSTRIES = [
  {
    title: "Information Technology",
    tagline: "Empowering tech-driven organizations with specialized talent across software, AI, and digital infrastructure.",
    img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SW5mb3JtYXRpb24lMjBUZWNobm9sb2d5fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  },
  {
    title: "Fintech & Banking",
    tagline: "Providing top talent for fast-evolving financial sectors — compliance, analytics, product, and risk management.",
    img: "https://plus.unsplash.com/premium_photo-1661301075857-63868ae88c00?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFua2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    title: "Healthcare & Life Sciences",
    tagline: "Connecting healthcare innovators, life sciences researchers, and wellness professionals with leading organizations.",
    img: "https://plus.unsplash.com/premium_photo-1699387204388-120141c76d51?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGVhbHRoY2FyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    title: "Manufacturing & Engineering",
    tagline: "Driving operational excellence with engineers, plant managers, and process specialists who power progress.",
    img: "https://images.unsplash.com/photo-1717386255773-1e3037c81788?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFudWZhY3R1cmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    title: "Retail & Consumer Goods",
    tagline: "Helping brands attract dynamic retail leaders, merchandisers, and customer engagement experts.",
    img: "https://images.unsplash.com/photo-1656360088907-5109c245851d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29vZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    title: "Startups & VC-backed Ventures",
    tagline: "Supporting high-growth startups with versatile talent to scale products, teams, and culture fast.",
    img: "https://plus.unsplash.com/premium_photo-1684769161054-2fa9a998dcb6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhcnR1cHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    title: "Logistics & Supply Chain",
    tagline: "Delivering professionals who streamline supply operations and logistics management with precision.",
    img: "https://plus.unsplash.com/premium_photo-1661879449050-069f67e200bd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naXN0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  },
];

const ICONS = [
  HiOutlineComputerDesktop,
  HiOutlineBanknotes,
  HiOutlineHeart,
  HiOutlineWrenchScrewdriver,
  HiOutlineShoppingCart,
  HiOutlineRocketLaunch,
  HiOutlineTruck,
];

const Industries = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-16 bg-[#f8f8f8] min-h-screen"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-6xl font-bold text-[#003034]"
        >
          Industries We Serve
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#333333] mt-3 max-w-2xl mx-auto text-lg"
        >
          Powering innovation and growth across high-impact sectors with exceptional talent.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {INDUSTRIES.map((industry, i) => {
          const Icon = ICONS[i];

          return (
            <motion.article
              key={industry.title}
              className="relative bg-white rounded-2xl shadow-md overflow-hidden flex flex-col 
                         hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.1 + i * 0.08,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              {/* Image Zoom */}
              <div
                className="h-56 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${industry.img})` }}
              />

              {/* Content */}
              <div className="flex-1 p-6 text-center relative z-10">
                {/* 3D Flip Icon */}
                <motion.div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                             bg-[#003034] text-white w-20 h-20 rounded-full 
                             grid place-items-center shadow-lg border-4 border-white"
                  style={{ perspective: 1000 }}
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      placeItems: "center",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <Icon size={32} className="text-white" />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      placeItems: "center",
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <Icon size={32} className="text-white" />
                  </div>
                </motion.div>

                <h3 className="text-xl font-semibold text-[#003034] mt-10">
                  {industry.title}
                </h3>
                <p className="mt-2 text-sm text-[#333333] leading-relaxed">
                  {industry.tagline}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-16">
        <Link to="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#24585D] text-white px-8 py-4 rounded-md font-semibold shadow-lg 
                       hover:bg-[#1e4b50] transition-all text-lg"
          >
            LET’S TALK — FIND TALENT FOR YOUR SECTOR
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default Industries;