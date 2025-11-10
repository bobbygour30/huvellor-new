import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "CEO, SaaS Startup",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "HUVELLOR helped us close critical leadership roles in record time. Their process is sharp, and their team truly understands business.",
  },
  {
    name: "HR Manager, Mid-size Tech Company",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "We completely restructured our HR policies with HUVELLOR's help. It was smooth, professional, and fully compliant.",
  },
  {
    name: "Abhishek, Tech Synergia",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    quote:
      "The recruitment and onboarding solutions provided were seamless and highly effective. Our team is thriving thanks to HUVELLOR.",
  },
  {
    name: "Renuka, Renuka Info Tech Solutions",
    image: "https://randomuser.me/api/portraits/women/41.jpg",
    quote:
      "The professionalism and attention to detail shown by HUVELLOR were exceptional. They delivered beyond expectations.",
  },
  {
    name: "Mayank, Golden Roadways & Logistics",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
    quote:
      "Their HR strategy insights helped us revamp our team structure for optimal efficiency. Highly recommended!",
  },
];

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "linear", delay } },
});

const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-16 lg:py-20 px-6 md:px-8 lg:px-12 overflow-hidden"
    >

      {/* Floating Blobs */}
      <motion.div
        className="absolute -top-24 -left-20 w-80 md:w-96 lg:w-96 h-80 md:h-96 lg:h-96 bg-[#104B51]/20 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 md:w-[28rem] lg:w-[28rem] h-80 md:h-[28rem] lg:h-[28rem] bg-[#104B51]/30 rounded-full blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Headline */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-8 md:mb-10 lg:mb-12 relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp(0)}
      >
        <h1 className="text-3xl text-[#104B51] md:text-4xl lg:text-5xl font-extrabold mb-4">
          What Our Clients Say
        </h1>
        <p className="text-black text-base md:text-lg lg:text-xl">
          Hear directly from the businesses we've partnered with and the impact we've created.
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto relative z-10">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            variants={fadeInUp(0.2 + i * 0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.03, translateY: -5 }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
            className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-7 lg:p-8 border border-white/20 text-center text-gray-800"
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto -mt-14 mb-4 rounded-full border-4 border-white shadow-lg overflow-hidden">
              <motion.img
                src={t.image}
                alt={`${t.name}'s avatar`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.35 }}
              />
            </div>
            <div className="flex justify-center mb-2 text-yellow-400">
              {[...Array(5)].map((_, j) => (
                <FaStar key={j} className="text-sm md:text-base" />
              ))}
            </div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 italic">
              {t.quote}
            </p>
            <div className="flex items-center justify-center gap-2">
              <FaQuoteLeft className="text-cyan-500 text-lg" />
              <h4 className="text-[#003034] font-semibold text-sm md:text-base">
                {t.name}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;