import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { ReactTyped } from "react-typed";
import assets from "../assets/assets";

export default function WhyChooseUs({ whyRef }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });

  return (
    <section
      id="why"
      ref={whyRef}
      className="relative overflow-hidden py-20 bg-white"
    >
      {/* thin decorative bottom border */}
      <div className="absolute left-0 right-0 bottom-0 h-1 bg-[#004048]" />

      <div
        className="relative max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row gap-10 items-center justify-center"
        ref={ref}
      >
        {/* LEFT: organic image composition */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6 col-span-1 relative flex items-center justify-center"
        >
          {/* Floating decorative background circle */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
            className="absolute -left-10 -top-20 w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] rounded-full bg-[#004048] overflow-hidden hidden lg:block"
          >
            <img
              src={assets.why}
              alt="decor"
              className="w-full h-full object-cover opacity-80"
            />
          </motion.div>

          {/* Floating main organic image */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.02, 1],
              rotate: [0, 2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            className="relative z-10  w-[260px] h-[260px] lg:w-[410px] lg:h-[410px] rounded-[36%] overflow-hidden shadow-2xl border-8 border-white mt-24 lg:ml-40"
          >
            <img
              src={assets.why2}
              alt="team"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* RIGHT: heading + description + feature pills */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-6 col-span-1 flex flex-col md:items-center md:justify-center lg:items-start lg:justify-start w-full"
        >
          {/* Typing effect heading */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f1720] leading-tight mb-6"
            style={{
              minHeight: '3.75rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ReactTyped
              strings={["WHY CHOOSE HUVELLOR?"]}
              typeSpeed={70}
              backSpeed={50}
              backDelay={1500}
              loop={true}
              showCursor={false}
            />
          </h2>

          <p className="text-[#333333]  mb-2 text-lg">
            At Huvellor, recruitment is more than filling roles — it’s about aligning brilliance with purpose and crafting teams that define tomorrow. We blend strategic insight with human intuition to discover professionals who not only excel in capability but also embody the perfect culture fit. Every partnership is grounded in depth, care, and the belief that the right people don’t just join organizations — they elevate them. 
          </p>
          <p className="pb-4 text-lg text-[#333333]">Our mission is to shape stories of growth, leadership, and trust by connecting vision-driven businesses with talent that reflects brilliance, balance, and purpose.</p>

          {/* Feature pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Premium, personalized service" },
              { title: "Domain-specific recruitment expertise" },
              { title: "Fast turnarounds without compromising quality" },
              { title: "Dedicated account managers" },
              { title: "Scalable solutions for startups to enterprises" },
              { title: "Culture first hiring approach" },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow w-full"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 3,
                    duration: 2,
                  }}
                  className="flex-shrink-0 w-9 h-9 rounded-full bg-[#004048] flex items-center justify-center text-white"
                >
                  <FaCheckCircle />
                </motion.div>
                <div className="text-lg font-semibold text-[#0f1720]">
                  {f.title}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="/quote"
            whileHover={{
              y: -3,
              scale: 1.05,
              boxShadow: "0px 8px 20px rgba(0,64,72,0.2)",
            }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-full bg-[#fbccbc] text-[#004048] font-semibold shadow-lg"
          >
            Book a Consultation
          </motion.a>
        </motion.div>
      </div>

      {/* custom padding for lg+ */}
      <style jsx>{`
        @media (min-width: 1024px) {
          section#why {
            padding-top: 6.5rem;
            padding-bottom: 6.5rem;
          }
        }
      `}</style>
    </section>
  );
}