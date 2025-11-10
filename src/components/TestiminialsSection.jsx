import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

// For infinite loop, we need to "wrap" indices
function wrapIdx(idx, arrLength) {
  return ((idx % arrLength) + arrLength) % arrLength;
}

export default function TestimonialsSection({ testimonialsRef }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const [visibleCount, setVisibleCount] = useState(window.innerWidth < 768 ? 1 : 2);

  // Update visibleCount on window resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : 2);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto slide every 4 seconds if not paused
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [paused, index]);

  // Show testimonials for current index
  const getVisibleTestimonials = () => {
    const res = [];
    for (let i = 0; i < visibleCount; i++) {
      res.push(testimonials[wrapIdx(index + i, testimonials.length)]);
    }
    return res;
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => wrapIdx(prev - 1, testimonials.length));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => wrapIdx(prev + 1, testimonials.length));
  };

  // Animation variant for smooth sliding
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
      position: "absolute"
    }),
    center: { 
      x: 0, 
      opacity: 1,
      position: "relative"
    },
    exit: (dir) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
      position: "absolute"
    }),
  };

  return (
    <section
      id="testimonials"
      ref={testimonialsRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#004048]" />
      <div
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-10"
        aria-hidden
      />

      <div className="relative max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row gap-12 items-start text-white">
        {/* Left Content */}
        <div className="w-full md:w-1/3 pt-10">
          <p className="text-[#F0C5B5] text-sm font-semibold tracking-wider uppercase">
            Our Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 leading-snug">
            What They’re Talking About?
          </h2>
          <p className="text-gray-200 leading-relaxed max-w-md mt-4">
            Hear directly from the businesses we've partnered with and the
            impact we've created.
          </p>
        </div>

        {/* Right Carousel */}
        <div
          className="w-full overflow-hidden relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex relative pt-10 justify-between"
          >
            <AnimatePresence initial={false} custom={direction}>
              {getVisibleTestimonials().map((t, i) => (
                <motion.div
                  key={t.name + index + i}
                  className="flex-shrink-0"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  style={{
                    width: `calc(${100 / visibleCount}% - ${visibleCount > 1 ? 12 : 0}px)`,
                  }}
                >
                  <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 text-center text-gray-800 h-full">
                    <div className="relative w-24 h-24 mx-auto -mt-16 mb-4 rounded-full border-4 border-white shadow-lg overflow-hidden">
                      <motion.img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.35 }}
                      />
                    </div>
                    <div className="flex justify-center mb-2 text-yellow-400">
                      {[...Array(5)].map((_, j) => (
                        <FaStar key={j} />
                      ))}
                    </div>
                    <p className="text-[#333333] text-lg leading-relaxed mb-6 italic">
                      {t.quote}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <FaQuoteLeft className="text-cyan-500 text-lg" />
                      <h4 className="text-[#003034] font-semibold text-sm">
                        {t.name}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-[#F0C5B5]/80 hover:bg-[#F0C5B5] text-[#004048] transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-[#F0C5B5]/80 hover:bg-[#F0C5B5] text-[#004048] transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
