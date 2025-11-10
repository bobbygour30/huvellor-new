// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaTimes, FaStar, FaGem, FaLightbulb, FaChartLine, FaUsers, FaRocket, FaShieldAlt, FaGlobe, FaCogs, FaTrophy, FaHandshake, FaLeaf } from "react-icons/fa";
// import assets from "../assets/assets";
// import { Link } from "react-router-dom";

// const carouselItems = [
//   {
//     title: "Empowering Human Brilliance",
//     subtitle: "Exceptional Talent. Real Business Impact.",
//     image: assets.hero || "",
//     elements: [
//       { text: "Unlock Potential", icon: <FaChartLine />, top: "10%", left: "70%" },
//       { text: "Synergy", icon: <FaUsers />, top: "30%", left: "90%" },
//       { text: "Innovation", icon: <FaGem />, top: "70%", left: "90%" },
//       { text: "Leaders ", icon: <FaStar />, top: "90%", left: "70%" },
//       { text: "Growth", icon: <FaRocket />, top: "50%", left: "95%" },
//     ],
//   },
//   {
//     title: "Unlock Your Team's Potential",
//     subtitle: "Tailored HR services for sustainable growth.",
//     image: assets.hero2 || "",
//     elements: [
//       { text: "Growth", icon: <FaRocket />, top: "10%", left: "70%" },
//       { text: "Guidance", icon: <FaLightbulb />, top: "30%", left: "90%" },
//       { text: "Security", icon: <FaShieldAlt />, top: "70%", left: "90%" },
//       { text: "Global", icon: <FaGlobe />, top: "90%", left: "70%" },
//       { text: "Efficiency", icon: <FaCogs />, top: "50%", left: "95%" },
//     ],
//   },
//   {
//     title: "Build High-Performing Teams",
//     subtitle: "We align talent with your business vision.",
//     image: assets.hero3 || "",
//     elements: [
//       { text: "Innovation", icon: <FaGem />, top: "10%", left: "70%" },
//       { text: "Leaders", icon: <FaStar />, top: "30%", left: "90%" },
//       { text: "Achievement", icon: <FaTrophy />, top: "70%", left: "90%" },
//       { text: "Partnerships", icon: <FaHandshake />, top: "90%", left: "70%" },
//       { text: "Sustainability", icon: <FaLeaf />, top: "50%", left: "95%" },
//     ],
//   },
// ];

// const blobs = [
//   { size: 150, top: "10%", left: "5%", color: "rgba(16,75,81,0.3)", duration: 60 },
//   { size: 200, top: "60%", left: "75%", color: "rgba(16,75,81,0.2)", duration: 90 },
//   { size: 120, top: "40%", left: "50%", color: "rgba(16,75,81,0.25)", duration: 70 },
// ];

// const animatedCircles = [
//   { size: 40, top: "5%", left: "15%", duration: 5, opacity: 0.2 },
//   { size: 60, top: "80%", left: "20%", duration: 6, opacity: 0.3 },
//   { size: 50, top: "30%", left: "10%", duration: 4, opacity: 0.25 },
//   { size: 70, top: "90%", left: "85%", duration: 7, opacity: 0.2 },
//   { size: 45, top: "15%", left: "90%", duration: 5.5, opacity: 0.3 },
//   { size: 55, top: "70%", left: "5%", duration: 6.5, opacity: 0.25 },
//   { size: 65, top: "45%", left: "95%", duration: 4.5, opacity: 0.2 },
//   { size: 50, top: "25%", left: "85%", duration: 5, opacity: 0.3 },
//   { size: 60, top: "65%", left: "10%", duration: 6, opacity: 0.25 },
//   { size: 40, top: "85%", left: "75%", duration: 4.5, opacity: 0.2 },
// ];

// export default function HeroCarousel2() {
//   const [index, setIndex] = useState(0);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => setIndex((i) => (i + 1) % carouselItems.length), 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
//     exit: { opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } },
//   };

//   const textVariants = {
//     hidden: { opacity: 0, x: -100 },
//     visible: { 
//       opacity: 1, 
//       x: 0, 
//       transition: { 
//         duration: 0.8, 
//         ease: "easeOut",
//         staggerChildren: 0.2 
//       } 
//     },
//   };

//   const childVariants = {
//     hidden: { opacity: 0, x: -30 },
//     visible: { 
//       opacity: 1, 
//       x: 0, 
//       transition: { duration: 0.6, ease: "easeOut" } 
//     },
//   };

//   const elementVariants = {
//     hidden: { opacity: 0, scale: 0 },
//     visible: { 
//       opacity: 1, 
//       scale: 1, 
//       transition: { 
//         duration: 0.7, 
//         ease: "easeOut",
//         delay: 0.5 
//       } 
//     },
//   };

//   return (
//     <>
//       <section className="relative overflow-hidden lg:min-h-[100vh]  min-h-[50vh] bg-gray-900">
//         {/* Textured background overlay */}
//         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-5 z-0" />

//         {/* Animated blobs */}
//         {blobs.map((b, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full blur-3xl z-10"
//             style={{
//               width: `${b.size}px`,
//               height: `${b.size}px`,
//               top: b.top,
//               left: b.left,
//               backgroundColor: b.color,
//             }}
//             animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0], rotate: [0, 20, -20, 0] }}
//             transition={{ repeat: Infinity, duration: b.duration, ease: "easeInOut" }}
//           />
//         ))}

//         {/* Animated circles for decoration */}
//         {animatedCircles.map((circle, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full bg-white/20 z-10"
//             style={{
//               width: `${circle.size}px`,
//               height: `${circle.size}px`,
//               top: circle.top,
//               left: circle.left,
//             }}
//             animate={{ 
//               scale: [1, 1.1, 1], 
//               opacity: [circle.opacity, circle.opacity * 2, circle.opacity]
//             }}
//             transition={{ repeat: Infinity, duration: circle.duration, ease: "easeInOut" }}
//           />
//         ))}

//         {/* Carousel slides */}
//         <AnimatePresence initial={false} mode="wait">
//           {carouselItems.map((item, i) => (
//             i === index && (
//               <motion.div
//                 key={i}
//                 className="absolute inset-0 flex items-center justify-center z-20"
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 style={{
//                   backgroundImage: `url(${item.image})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   backgroundRepeat: "no-repeat",
//                 }}
//               >
//                 {/* Content */}
//                 <motion.div
//                   className="relative z-30 flex flex-col  items-start px-4 py-9 max-w-[90%] sm:max-w-6xl mx-auto lg:ml-72 "
//                   variants={textVariants}
//                 >
//                   <motion.h1
//                     className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-4 w-full sm:w-[80%] md:mt-10 lg:mt-3 mt-0"
//                     variants={childVariants}
//                   >
//                     {item.title}
//                   </motion.h1>
//                   <motion.p
//                     className="text-white text-sm sm:text-xl md:text-2xl mb-8 max-w-xl"
//                     variants={childVariants}
//                   >
//                     {item.subtitle}
//                   </motion.p>
//                   <Link to="/contact">
//                     <motion.button
//                       onClick={() => setShowModal(true)}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-white text-[#104b51] font-semibold px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
//                       variants={childVariants}
//                     >
//                       Discover More
//                     </motion.button>
//                   </Link>

//                   {/* Animated elements with text */}
//                   {item.elements.map((elem, idx) => (
//                     <motion.div
//                       key={idx}
//                       className="absolute w-full sm:w-full flex items-center gap-0.5 sm:gap-2 text-white text-xs sm:text-base bg-[#104b51]/50 px-2 sm:px-3 py-1 rounded-full shadow-md -ml-10 sm:-ml-0"
//                       style={{ top: elem.top, left: idx % 2 === 0 ? `calc(${elem.left} - 10%)` : elem.left }}
//                       variants={elementVariants}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       {elem.icon}
//                       <span>{elem.text}</span>
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               </motion.div>
//             )
//           ))}
//         </AnimatePresence>

//         {/* Modal */}
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white rounded-xl p-6 sm:p-8 max-w-md sm:max-w-lg w-full relative"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//             >
//               <button
//                 className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-600 hover:text-gray-900"
//                 onClick={() => setShowModal(false)}
//               >
//                 <FaTimes size={18} />
//               </button>
//               <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#104b51]">More About HUVELLOR</h2>
//               <p className="text-gray-700 text-sm sm:text-base">
//                 HUVELLOR provides tailored HR services that align top talent with your business goals. We help businesses
//                 scale sustainably with strategic HR solutions.
//               </p>
//             </motion.div>
//           </motion.div>
//         )}
//       </section>
//     </>
//   );
// }