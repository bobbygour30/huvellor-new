import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import assets from "../assets/assets";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    designation: "",
    services: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        "service_auklwbt",
        "template_q581hsv",
        {
          name: formData.name,
          company: formData.company,
          designation: formData.designation,
          services: formData.services,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        "AJeXFQw4omBjW5xKN"
      )
      .then(() => {
        setShowSuccess(true);
        setFormData({
          name: "",
          company: "",
          designation: "",
          services: "",
          email: "",
          phone: "",
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
    <>
      <section
        id="contact"
        className="relative py-16 md:py-24 bg-white overflow-hidden border-t border-[#24585D]"
      >
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-4 h-4 sm:w-5 sm:h-5 bg-[#24585D]/20 rounded-full blur-md"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -35, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.4, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 5 + Math.random() * 5,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500/95 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 z-30"
              >
                <FaCheckCircle className="text-lg" />
                <span className="text-sm font-medium">
                  Message sent successfully!
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative bg-[#f5f5f5] rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-200 z-20"
            >
              <div className="space-y-4 mb-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#003034]">
                  Let’s Start a Conversation
                </h2>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Looking to hire or explore a talent solution?
                </p>
                <div className="border-l-4 border-[#F0C5B5] pl-4 text-gray-800 text-sm italic">
                  “Together, we’ll shape the future of work.”
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-800 text-sm font-medium mb-1">
                      Hello, my name is
                      <span className="text-[#24585D]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#24585D] outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-800 text-sm font-medium mb-1">
                      I work in
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#24585D] outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-800 text-sm font-medium mb-1">
                    My designation is
                  </label>
                  <input
                    type="text"
                    name="designation"
                    placeholder="Your designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#24585D] outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-800 text-sm font-medium mb-1">
                    I’m interested in
                    <span className="text-[#24585D]">*</span>
                  </label>
                  <select
                    name="services"
                    value={formData.services}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-800 focus:ring-2 focus:ring-[#24585D] outline-none transition"
                  >
                    <option value="" disabled className="text-gray-500">
                      Select a Service
                    </option>
                    {[
                      "Executive Hiring",
                      "End-to-End Recruitment",
                      "HR Advisory",
                      "Policy Development",
                      "Other",
                    ].map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-800 text-sm font-medium mb-1">
                      You can reach me at
                      <span className="text-[#24585D]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#24585D] outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-800 text-sm font-medium mb-1">
                      or call me on
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#24585D] outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Type your enquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#24585D] outline-none resize-none transition"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#24585D] text-white font-semibold shadow-md hover:shadow-lg transition-all ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <FaPaperPlane className="text-lg" />
                  {isSubmitting ? "Sending..." : "Submit"}
                </motion.button>
              </form>
            </motion.div>

            {/* Left: Animated Image */}
            {/* Left: Animated Image */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="relative w-full flex justify-center items-center rounded-2xl  p-6"
>
  {/* Pulsing Glow Ring */}
  <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-r from-[#24585D]/15 to-[#24585D]/5 animate-ping-slow opacity-30 pointer-events-none z-0" />

  {/* Rotating Aura */}
  <motion.div
    className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-r from-[#24585D]/20 via-transparent to-[#24585D]/20 pointer-events-none z-0"
    animate={{ rotate: [0, 360] }}
    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
  />

  {/* Breathing + Glow Image */}
  <motion.div
    animate={{
      scale: [1, 1.02, 1],
      y: [-3, 0, -3],
     
    }}
    transition={{
      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    }}
    className="relative z-10"
  >
    <img
      src={assets.new1}
      alt="Let’s Connect"
      className="w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[500px] h-auto object-contain  rounded-2xl"
    />
  </motion.div>
</motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
