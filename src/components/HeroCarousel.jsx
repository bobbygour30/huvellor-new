// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ReactTyped } from "react-typed";
// import { FaTimes } from "react-icons/fa";
// import assets from "../assets/assets";
// import { Link } from "react-router-dom";

// const carouselItems = [
//   {
//     title: "Empowering Human Brilliance",
//     subtitle: "Aligning people, culture, and capability for lasting success.",
//     image: assets.hero || "",
//   },
//   {
//     title: "Strategic HR Solutions. Exceptional Talent. Real Business Impact.",
//     subtitle: "Where human potential meets strategic excellence.",
//     image: assets.hero2 || "",
//   },
// ];

// const blobs = [
//   {
//     size: 150,
//     top: "10%",
//     left: "5%",
//     color: "rgba(0,64,72,0.35)",
//     duration: 60,
//   },
//   {
//     size: 200,
//     top: "60%",
//     left: "75%",
//     color: "rgba(0,64,72,0.25)",
//     duration: 90,
//   },
//   {
//     size: 120,
//     top: "40%",
//     left: "50%",
//     color: "rgba(0,64,72,0.3)",
//     duration: 70,
//   },
// ];

// const animatedCircles = [
//   { size: 40, top: "5%", left: "15%", duration: 5, opacity: 0.2 },
//   { size: 60, top: "80%", left: "20%", duration: 6, opacity: 0.3 },
//   { size: 50, top: "30%", left: "10%", duration: 4, opacity: 0.25 },
//   { size: 70, top: "90%", left: "85%", duration: 7, opacity: 0.2 },
//   { size: 45, top: "15%", left: "90%", duration: 5.5, opacity: 0.3 },
//   { size: 55, top: "70%", left: "5%", duration: 6.5, opacity: 0.25 },
// ];

// export default function HeroCarousel() {
//   const [index, setIndex] = useState(0);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(
//       () => setIndex((i) => (i + 1) % carouselItems.length),
//       6000
//     );
//     return () => clearInterval(interval);
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
//     exit: { opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } },
//   };

//   const textVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.9, ease: "easeOut" },
//     },
//   };

//   return (
//     <section className="relative overflow-hidden min-h-[70vh] sm:min-h-[100vh] bg-[#002C2F]">
//       {/* Floating blobs */}
//       {blobs.map((b, i) => (
//         <motion.div
//           key={i}
//           className="absolute rounded-full blur-3xl z-10"
//           style={{
//             width: `${b.size}px`,
//             height: `${b.size}px`,
//             top: b.top,
//             left: b.left,
//             backgroundColor: b.color,
//           }}
//           animate={{ x: [0, 25, -25, 0], y: [0, -15, 15, 0] }}
//           transition={{
//             repeat: Infinity,
//             duration: b.duration,
//             ease: "easeInOut",
//           }}
//         />
//       ))}

//       {/* Floating circles */}
//       {animatedCircles.map((circle, i) => (
//         <motion.div
//           key={i}
//           className="absolute rounded-full bg-white/20 z-10"
//           style={{
//             width: `${circle.size}px`,
//             height: `${circle.size}px`,
//             top: circle.top,
//             left: circle.left,
//           }}
//           animate={{
//             scale: [1, 1.1, 1],
//             opacity: [circle.opacity, circle.opacity * 1.8, circle.opacity],
//           }}
//           transition={{
//             repeat: Infinity,
//             duration: circle.duration,
//             ease: "easeInOut",
//           }}
//         />
//       ))}

//       {/* Carousel */}
//       <AnimatePresence mode="wait">
//         {carouselItems.map(
//           (item, i) =>
//             i === index && (
//               <motion.div
//                 key={i}
//                 className="absolute inset-0 flex items-center z-20"
//                 style={{
//                   backgroundImage: `url(${item.image})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   backgroundRepeat: "no-repeat",
//                 }}
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//               >
//                 {/* Container with max width and padding */}
//                 <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
//                   <motion.div
//                     className="relative z-30 text-left"
//                     variants={textVariants}
//                   >
//                     {/* Typing Effect Title */}
//                     <h1 className="text-white font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 tracking-wide w-full">
//                       <ReactTyped
//                         strings={[item.title]}
//                         typeSpeed={80}
//                         backSpeed={30}
//                         loop
//                         showCursor={true}
//                       />
//                     </h1>

//                     <p className="text-white text-base sm:text-lg md:text-xl mb-10 max-w-lg">
//                       {item.subtitle}
//                     </p>

//                     <Link to="/contact">
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="bg-[#F0C5B5] text-[#004048] font-semibold 
//              px-5 py-2 text-sm 
//              sm:px-6 sm:py-2.5 sm:text-base 
//              md:px-8 md:py-3 
//              rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
//                       >
//                         Discover More
//                       </motion.button>
//                     </Link>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             )
//         )}
//       </AnimatePresence>

//       {/* Modal */}
//       {showModal && (
//         <motion.div
//           className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="bg-white rounded-xl p-6 sm:p-8 max-w-md sm:max-w-lg w-full relative"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//           >
//             <button
//               className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
//               onClick={() => setShowModal(false)}
//             >
//               <FaTimes size={18} />
//             </button>
//             <h2 className="text-2xl font-bold mb-4 text-[#004048]">
//               More About HUVELLOR
//             </h2>
//             <p className="text-gray-700">
//               HUVELLOR provides tailored HR services that align top talent with
//               your business goals. We help businesses scale sustainably with
//               strategic HR solutions.
//             </p>
//           </motion.div>
//         </motion.div>
//       )}
//     </section>
//   );
// }
