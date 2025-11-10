import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay },
  },
});

const GetQuote = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    company: "",
    services: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.services) {
      setError("Please select a service.");
      return;
    }

    setIsSubmitting(true);

    emailjs
      .send(
        "service_auklwbt", // Replace with your EmailJS service ID
        "template_q581hsv", // Replace with your EmailJS template ID
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          designation: formData.designation,
          company: formData.company,
          services: formData.services,
          message: formData.message,
        },
        "AJeXFQw4omBjW5xKN" // Replace with your EmailJS public key
      )
      .then(() => {
        setShowSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          designation: "",
          company: "",
          services: "",
          message: "",
        });
        setTimeout(() => setShowSuccess(false), 5000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send message. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section
      ref={sectionRef}
      id="get-quote"
      className="relative bg-white text-[#104B51] py-20 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background Blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-[#104B51]/10 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-72 sm:w-[28rem] h-72 sm:h-[28rem] bg-[#104B51]/20 rounded-full blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-2"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-[#104B51]">
            Get a Quote
          </h2>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
            Reach out to us and let’s discuss how we can help your business find
            the right talent.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={fadeInUp(0.3)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onSubmit={handleSubmit}
          className="bg-[#F0F0F0] border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Name */}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500 text-sm sm:text-base"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500 text-sm sm:text-base"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <FaPhoneAlt className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500 text-sm sm:text-base"
            />
          </div>

          {/* Designation */}
          <div className="relative">
            <FaBuilding className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500 text-sm sm:text-base"
            />
          </div>

          {/* Company */}
          <div className="relative">
            <FaBuilding className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500 text-sm sm:text-base"
            />
          </div>

          {/* Services */}
          <select
            name="services"
            value={formData.services}
            onChange={handleChange}
            required
            className="border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 sm:py-3.5 col-span-1 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#104B51] text-sm sm:text-base"
          >
            <option value="" disabled>
              Select a Service
            </option>
            <option value="Executive Hiring">Executive Hiring</option>
            <option value="End-to-End Recruitment">
              End-to-End Recruitment
            </option>
            <option value="HR Advisory">HR Advisory</option>
            <option value="Policy Development">Policy Development</option>
            <option value="Other">Other</option>
          </select>

          {/* Message */}
          <textarea
            name="message"
            rows="5"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="sm:col-span-2 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500 text-sm sm:text-base"
          ></textarea>

          {/* Button & Messages */}
          <div className="sm:col-span-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#104B51] text-white font-semibold rounded-full px-6 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-500 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Sending..." : "Get a Quote"}
            </motion.button>

            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 flex justify-center items-center gap-2 text-[#104B51] font-medium text-sm sm:text-base"
              >
                <FaCheckCircle className="text-lg text-green-600" />
                <span>Message sent successfully!</span>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 flex justify-center items-center gap-2 text-red-600 font-medium text-sm sm:text-base"
              >
                <span>{error}</span>
              </motion.div>
            )}
          </div>
        </motion.form>
      </div>

      {/* Decorative Wave */}
      <svg
        className="absolute left-0 bottom-0 w-full opacity-30"
        viewBox="0 0 600 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M0 200 C150 140 300 120 600 20 L600 200 Z" fill="#E5E5E5" />
      </svg>
    </section>
  );
};

export default GetQuote;
