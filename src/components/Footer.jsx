"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import assets from "../assets/assets";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" },
  }),
};

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="relative overflow-hidden bg-[#004048] pt-10 md:pt-16 text-gray-300"
    >
      {/* Aurora Light Sweep Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[200%] bg-gradient-to-r from-[#00b3b3]/20 via-[#F0C5B5]/30 to-transparent blur-3xl"
          animate={{
            x: ["-100%", "100%"],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row gap-8 md:gap-10 justify-between md:justify-evenly z-10">
        {/* Logo + Intro + Need Help */}
        <motion.div
          variants={fadeInUp}
          custom={0}
          className="relative w-full md:w-auto sm:max-w-sm space-y-4 text-center md:text-left"
        >
          <div className="relative inline-block mx-auto md:mx-0">
            <motion.img
              src={assets.logo}
              alt="logo"
              className="mx-auto md:mx-0 w-36 sm:w-44 object-contain relative z-10"
              animate={{
                scale: [1, 1.03, 1],
                filter: [
                  "drop-shadow(0 0 0px #F0C5B5)",
                  "drop-shadow(0 0 12px #F0C5B5)",
                  "drop-shadow(0 0 0px #F0C5B5)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F0C5B5]/40 to-transparent blur-md"
              animate={{
                x: ["-150%", "150%"],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Need Help */}
          <motion.div
            className="flex items-center justify-center md:justify-start gap-3 mt-6 bg-transparent"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#00b3b3] overflow-hidden flex-shrink-0">
              <motion.img
                src={assets.book}
                alt="help avatar"
                className="w-full h-full object-cover"
                animate={{
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <div className="text-left">
              <p className="text-xs uppercase text-gray-400 tracking-wider">
                Need Help?
              </p>
              <Link
                to="/quote"
                className="text-white font-semibold hover:text-[#F0C5B5] transition"
              >
                Book a Consultation
              </Link> 
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={fadeInUp}
          custom={1}
          className="w-full md:min-w-[150px] md:w-auto text-center md:text-left"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
            Quick Links
          </h3>
          <div className="h-1 w-10 bg-[#F0C5B5]/50 mb-4 rounded-lg mx-auto md:mx-0" />
          <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
            <li>
              <Link to="/about" className="hover:text-white transition">
                • About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white transition">
                • Services
              </Link>
            </li>
            <li>
              <Link to="/industries" className="hover:text-white transition">
                • Industries We Serve
              </Link>
            </li>
            <li>
              <Link to="/career" className="hover:text-white transition">
                • Career Opportunity
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                • Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-white transition">
                • Privacy Policy
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          variants={fadeInUp}
          custom={2}
          className="w-full md:min-w-[150px] md:w-auto text-center md:text-left"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
            Contact Info
          </h3>
          <div className="h-1 w-10 bg-[#F0C5B5]/50 mb-4 rounded-lg mx-auto md:mx-0" />
          <ul className="space-y-3 text-sm sm:text-base">
            <li className="flex justify-center md:justify-start items-center gap-2">
              <FaMapMarkerAlt className="text-[#F0C5B5] flex-shrink-0" />
              <span className="w-52">
                9th floor, Unitech cyber park, Tower D, Sector 39, Gurgaon (Hr),
                PIN - 122001
              </span>
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <FaEnvelope className="text-[#F0C5B5] flex-shrink-0" />
              <a href="mailto:info@huvellor.com" className="hover:text-white">
                info@huvellor.com
              </a>
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <FaPhoneAlt className="text-[#F0C5B5] flex-shrink-0" />
              <a href="tel:+919999999999" className="hover:text-white">
                +91 99999 99999
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Explore Career Opportunities + Timing + Socials */}
        <motion.div
          variants={fadeInUp}
          custom={3}
          className="w-full md:w-72 text-center md:text-left"
        >
          <h3 className="text-lg sm:text-2xl font-semibold text-white mb-3">
            Explore Career Opportunities
          </h3>

          {/* CTAs with Subheadings */}
          <div className="space-y-4">
            <div>
              <Link
                to="/jobs"
                className="inline-block bg-[#F0C5B5] text-[#003034] font-semibold px-4 sm:px-5 py-2 rounded-full hover:bg-[#f7d3c2] transition mx-auto md:mx-0"
              >
                Explore Jobs
              </Link>
              <p className="text-xs text-gray-300 mt-1 text-center md:text-left">
                Discover exclusive roles from our trusted clients — where your talent meets purpose.
              </p>
            </div>

            <div>
              <Link
                to="/apply"
                className="inline-block border bg-[#F0C5B5] text-[#003034] font-semibold px-4 sm:px-5 py-2 rounded-full hover:bg-[#f7d3c2] transition mx-auto md:mx-0"
              >
                Submit Your Resume
              </Link>
              <p className="text-xs text-gray-300 mt-1 text-center md:text-left">
                We’ll connect you with matching opportunities.
              </p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="mt-4 text-sm text-gray-300">
            Working Hours: 9:00am - 6:00pm
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 mt-3">
            <a
              href="#"
              className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-[#F0C5B5] hover:text-[#004048] transition flex-shrink-0"
            >
              <FaLinkedinIn className="text-sm sm:text-base" />
            </a>
            <a
              href="#"
              className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-[#F0C5B5] hover:text-[#004048] transition flex-shrink-0"
            >
              <FaFacebookF className="text-sm sm:text-base" />
            </a>
            <a
              href="#"
              className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-[#F0C5B5] hover:text-[#004048] transition flex-shrink-0"
            >
              <FaInstagram className="text-sm sm:text-base" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 bg-[#003034] border-t border-white/10 py-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} HUVELLOR. All Rights Reserved.
      </div>

      {/* Scroll to Top */}
<a
  href="#"
  className="fixed bottom-4 sm:bottom-20 right-4 sm:right-7 bg-[#F0C5B5] w-10 sm:w-11 h-10 sm:h-11 flex items-center justify-center rounded-full text-[#003034] text-lg shadow-lg hover:scale-110 transition"
>
  ↑
</a>
    </motion.footer>
  );
}