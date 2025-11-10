import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaQuoteLeft } from "react-icons/fa";
import assets from "../assets/assets";

const AboutUs = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // SSR-safe Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Optional: animate once
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Fallback: If JS fails or slow, show content after 1s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isVisible) setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  const leaders = [
    {
      name: "Shephali Gupta",
      role: "Founder & Strategic Hiring Partner, Huvellor",
      designation: "Empowering Human Brilliance",
      img: assets.person2,
      bio: "With extensive experience across IT, e-commerce, and entrepreneurship, Shephali Gupta stands as a visionary voice in strategic hiring and human potential. An MBA graduate from IITM, she brings together business insight, emotional intelligence, and intuitive understanding — the very foundation upon which Huvellor was built. Before launching Huvellor, Shephali led business development initiatives in leading IT and e-commerce firms, where she discovered one timeless truth — real growth begins with people. Inspired by this belief, she transitioned into entrepreneurship, founding her first HR consultancy to help organizations build high-performing, culture-aligned teams and craft teams that define tomorrow. After taking a meaningful career pause to nurture her daughter, Shephali returned with deeper clarity and renewed strength — ready to create a consultancy that not only connects talent with opportunity but also aligns brilliance with purpose. At Huvellor, she partners with forward-thinking organizations to deliver premium, relationship-driven recruitment solutions that blend strategy, empathy, and intuition. Her philosophy is simple yet profound — every placement is not merely a hire, but a story of growth, culture, and alignment. “At Huvellor, recruitment isn’t about filling roles — it’s about shaping legacies through people who embody brilliance, balance, and purpose.”",
    },
    {
      name: "Shivani Gupta",
      role: "Vice President , Huvellor",
      designation: "Business Development",
      img: assets.person,
      bio: "Bringing a rich blend of cross-industry experience across the IT, banking and education sectors, Shivani offers strong expertise in business development, sales, and marketing. Her strategic mindset and cross-industry perspective make her a driving force behind Huvellor’s growth—building strong client relationships, expanding markets, and delivering impactful, customized HR solutions. Focused, dynamic, and results-oriented, Shivani plays a key role in shaping the company’s business strategy and long-term success.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-white flex flex-col overflow-hidden"
      id="about"
    >
      {/* Floating Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 -left-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-gradient-to-tr from-[#104B51]/20 via-[#104B51]/10 to-transparent rounded-full blur-3xl opacity-60"
          animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-40 sm:w-64 md:w-80 h-40 sm:h-64 md:h-80 bg-gradient-to-br from-[#104B51]/15 via-[#104B51]/5 to-transparent rounded-full blur-3xl opacity-50"
          animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative py-10 sm:py-14 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text */}
          <div className="space-y-5 sm:space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight"
            >
              <TypeAnimation
                sequence={[
                  "Driven by People. Backed by Expertise.",
                  1500,
                  "",
                  500,
                ]}
                speed={60}
                repeat={Infinity}
                cursor={false}
                style={{
                  display: "inline-block",
                  background: "linear-gradient(to right, #104B51, #1E7B73)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-xl"
            >
              Huvellor was founded with a single belief: that exceptional people power exceptional businesses.
              <br />
              <br className="hidden sm:block" />
              As a premium HR consultancy, we partner with visionary organizations that value quality, culture fit, and long-term talent success. Our purpose is not just to fill roles — but to help companies build ecosystems where the right people thrive, lead, and create lasting impact.
              <br />
              <br />
              Our team combines deep industry insight with modern recruitment practices, behavioral assessments, and strategic HR frameworks to help our clients attract, retain, and elevate their workforce. We believe every hire tells a story — a story of growth, leadership, and alignment between human potential and business purpose.
              <br />
              <br />
              At Huvellor, we go beyond transactions. We build relationships based on trust, precision, and intuition. Whether you’re hiring your first key executive, scaling a growing team, or reimagining your people strategy, we bring a strategic, human-centric approach to every engagement — blending data, empathy, and expertise to deliver outcomes that last.
              <br />
              <br />
              Driven by our ethos of “Empowering Human Brilliance,” Huvellor stands as a trusted partner for organizations that seek more than talent — they seek transformation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center space-x-3"
            >
              <FaQuoteLeft className="text-[#104B51] text-lg sm:text-xl lg:text-2xl flex-shrink-0" />
              <p className="italic text-gray-600 text-sm sm:text-base lg:text-lg">
                “We don’t just find talent — we build enduring partnerships.”
              </p>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center mt-8 md:mt-0"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg h-64 sm:h-80 md:h-96 lg:h-full flex items-center justify-center">
              <img
                src={assets.about3}
                alt="Huvellor HR Team"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="relative bg-white py-12 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {[
            {
              title: "Our Mission",
              text: "To connect businesses with the right talent and build HR foundations that enable lasting success.",
            },
            {
              title: "Our Vision",
              text: "To be the most trusted HR partner for progressive companies across industries.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#104B51]/20 shadow-lg hover:shadow-2xl transition-all duration-700"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#104B51] mb-4 relative">
                {item.title}
                <span className="absolute bottom-0 left-0 w-12 sm:w-14 h-1 bg-gradient-to-r from-[#104B51] to-[#1E7B73] rounded-full"></span>
              </h2>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Leadership Section */}
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-10 sm:mb-12 lg:mb-16"
          >
            Meet Our Leadership
          </motion.h2>

          <div className="flex flex-col gap-10 sm:gap-12 lg:gap-16">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className={`
                  bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl 
                  transition-all duration-700 p-6 sm:p-8 border border-[#104B51]/20
                  flex flex-col md:flex-row
                  items-center gap-6 sm:gap-8 lg:gap-10
                `}
              >
                <div className="w-full md:w-1/3 flex flex-col items-center text-center md:text-left">
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-60 rounded-xl object-cover shadow-2xl mb-4"
                    loading="lazy"
                  />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#104B51]">
                    {leader.name}
                  </h3>
                  <p className="text-[#104B51] font-bold text-sm sm:text-base md:text-lg">
                    {leader.role}
                  </p>
                  <p className="text-[#104B51]/80 text-xs sm:text-sm md:text-base">
                    {leader.designation}
                  </p>
                </div>

                <div className="flex-1 text-gray-700 leading-relaxed text-justify">
                  <div className="inline-flex items-start gap-2">
                    <FaQuoteLeft className="text-[#104B51] text-lg sm:text-xl lg:text-2xl flex-shrink-0 mt-1" />
                    <p
                      className="inline"
                      style={{
                        fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)",
                        lineHeight: "1.6",
                      }}
                    >
                      {leader.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;