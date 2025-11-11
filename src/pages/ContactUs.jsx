import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  },
});

const ContactUs = () => {
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
        "service_auklwbt",
        "template_q581hsv",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          designation: formData.designation,
          company: formData.company,
          services: formData.services,
          message: formData.message,
        },
        "AJeXFQw4omBjW5xKN"
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
      .catch(() => alert("Failed to send message. Please try again."))
      .finally(() => setIsSubmitting(false));
  };

  const contactCards = [
    {
      icon: <FaMapMarkerAlt className="text-xl xs:text-2xl" />,
      title: "Office",
      desc: "9th floor, Unitech cyber park, Tower D, Sector 39, Gurgaon (Hr), PIN code -122001",
    },
    {
      icon: <FaPhoneAlt className="text-xl xs:text-2xl" />,
      title: "Phone",
      desc: "+91 9876543210",
    },
    {
      icon: <FaEnvelope className="text-xl xs:text-2xl" />,
      title: "Email",
      desc: "contact@huvellor.com",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[60vh] xs:min-h-[70vh] bg-gray-50 text-[#104B51] overflow-x-hidden py-12 xs:py-16 px-4 xs:px-6 md:px-16"
    >
      {/* Subtle Background Accents */}
      <div className="absolute -top-20 -left-10 w-48 xs:w-64 h-48 xs:h-64 bg-[#104B51]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-56 xs:w-80 h-56 xs:h-80 bg-[#104B51]/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Heading */}
        <motion.div
          variants={fadeInUp(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-12 xs:mb-16"
        >
          <h1 className="text-3xl xs:text-4xl md:text-5xl font-bold mb-4 text-[#104B51]">
            Let’s Build Your Dream Team
          </h1>
          <p className="text-gray-600 text-base xs:text-lg md:text-xl leading-relaxed">
            Have a recruitment need? Need strategic HR support? Our team is
            ready to assist you with precision and passion.
          </p>
        </motion.div>

        {/* ==================== CONTACT CARDS – GRAY GRADIENT ==================== */}
        <motion.div
          variants={fadeInUp(0.2)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 xs:gap-8 max-w-5xl mx-auto mb-12 xs:mb-16"
        >
          {contactCards.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 xs:p-7 shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#104B51]/10 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Icon with Rose Gold Accent */}
              <div className="w-12 h-12 xs:w-14 xs:h-14 rounded-full bg-[#F0C5B5]/10 flex items-center justify-center mb-4 text-[#F0C5B5] shadow-sm">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg xs:text-xl font-semibold text-[#104B51] mb-1">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm xs:text-base text-gray-700 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Form & Map */}
        <div className="flex flex-col md:flex-row gap-6 xs:gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <motion.form
            variants={fadeInUp(0.4)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onSubmit={handleSubmit}
            className="flex-1 bg-white rounded-2xl shadow-sm p-6 xs:p-8 border border-gray-200"
          >
            <h2 className="text-2xl xs:text-3xl font-bold mb-6 xs:mb-8 text-center text-[#104B51]">
              Send Us a Message
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 bg-white text-[#104B51] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-400 text-sm xs:text-base transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 bg-white text-[#104B51] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-400 text-sm xs:text-base transition"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-300 bg-white text-[#104B51] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-400 text-sm xs:text-base transition"
              />
              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                className="border border-gray-300 bg-white text-[#104B51] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-400 text-sm xs:text-base transition"
              />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="border border-gray-300 bg-white text-[#104B51] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-400 text-sm xs:text-base transition"
              />
              <select
                name="services"
                value={formData.services}
                onChange={handleChange}
                required
                className="border border-gray-300 bg-white text-[#104B51] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] text-sm xs:text-base transition"
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
              <textarea
                name="message"
                rows={4}
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="md:col-span-2 border border-gray-300 bg-white text-[#104B51] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-400 text-sm xs:text-base transition"
              ></textarea>
              <div className="md:col-span-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#104B51] text-white font-medium rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </motion.button>

                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex justify-center items-center gap-2 text-green-600 font-medium"
                  >
                    <FaCheckCircle />
                    <span>Message sent successfully!</span>
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center text-red-600 font-medium"
                  >
                    {error}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.form>

          {/* Google Map */}
          <motion.div
            variants={fadeInUp(0.6)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-1 rounded-2xl overflow-hidden shadow-md border border-gray-200"
          >
            <iframe
              title="Huvellor Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.799235233525!2d77.05122137509325!3d28.46008239103057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19bfbf7ad0d7%3A0x4a54f7342c5fdf8c!2sUnitech%20Cyber%20Park%2C%20Tower%20D%2C%20Sector%2039%2C%20Gurugram%2C%20Haryana%20122001!5e0!3m2!1sen!2sin!4v1696767894321!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[300px] xs:min-h-[350px]"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;