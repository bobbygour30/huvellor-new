// "use client";
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaPlus, FaMinus } from "react-icons/fa";
// import assets from "../assets/assets";

// const qnaData = [
//   {
//     question: "Rising above competitiveness decline",
//     answer:
//       "We help your business stay ahead of competitors through efficient hiring and advanced team management solutions.",
//   },
//   {
//     question: "Defeating complex cyber threats",
//     answer:
//       "Our experts provide secure, scalable systems to protect your business from evolving cyber challenges.",
//   },
//   {
//     question: "Battling inefficiencies in cost & time management",
//     answer:
//       "We streamline your operations to ensure timely delivery and cost-effective solutions.",
//   },
//   {
//     question: "Managing team instability",
//     answer:
//       "We build robust, well-managed teams with high retention and stable performance.",
//   },
//   {
//     question: "Finding talent with a rare skillset",
//     answer:
//       "Our global network helps source top talent across industries and technical domains.",
//   },
// ];

// export default function QnASection() {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleQnA = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <section className="bg-[#004048] text-white py-20 px-6 md:px-10 lg:px-20">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
//         {/* Floating Image Section */}
//         <motion.div
//           className="relative w-full md:w-1/2"
//           animate={{ y: [0, -15, 0] }}
//           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//             <img
//               src={assets.qna}
//               alt="Business Team"
//               className="
//                 w-full 
//                 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[600px] 
//                 object-cover opacity-90
//               "
//             />
//           </div>
//         </motion.div>

//         {/* Q&A Section */}
//         <div className="w-full md:w-1/2 space-y-6">
//           <div className="uppercase text-sm tracking-wider font-semibold text-teal-200">
//             What we’re all about
//           </div>

//           <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
//             Overcoming talent challenges as a team
//           </h2>

//           <p className="text-gray-200 text-base">
//             Our clients come to us because they have outgrown their local labor
//             market. We help them find, recruit, and retain top tech talent.
//             Whether you need experts to deploy features on time, scale
//             operations, or modernize legacy systems — we’ve got you covered.
//           </p>

//           <div className="divide-y divide-white/20 border-t border-b border-white/20">
//             {qnaData.map((item, index) => {
//               const isActive = activeIndex === index;
//               return (
//                 <div key={index} className="py-4">
//                   <button
//                     onClick={() => toggleQnA(index)}
//                     className="flex items-center w-full text-left gap-4 group"
//                   >
//                     {/* Animated Circle Icon */}
//                     <motion.div
//                       initial={false}
//                       animate={{
//                         rotate: isActive ? 180 : 0,
//                         backgroundColor: isActive ? "#14b8a6" : "#083c3d",
//                         boxShadow: isActive
//                           ? "0 0 15px rgba(20,184,166,0.6)"
//                           : "0 0 0 rgba(0,0,0,0)",
//                       }}
//                       whileHover={{
//                         scale: 1.15,
//                         boxShadow: "0 0 15px rgba(20,184,166,0.5)",
//                       }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       className="flex items-center justify-center w-10 h-10 rounded-full border border-teal-400 text-teal-300"
//                     >
//                       {isActive ? (
//                         <FaMinus className="text-white text-sm" />
//                       ) : (
//                         <FaPlus className="text-white text-sm" />
//                       )}
//                     </motion.div>

//                     {/* Question Text */}
//                     <span className="font-semibold text-white text-lg group-hover:text-teal-300 transition-colors duration-300">
//                       {item.question}
//                     </span>
//                   </button>

//                   {/* Animated Answer */}
//                   <AnimatePresence initial={false}>
//                     {isActive && (
//                       <motion.div
//                         key="content"
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.4, ease: "easeInOut" }}
//                         className="overflow-hidden"
//                       >
//                         <p className="text-teal-100 mt-3 ml-14">{item.answer}</p>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
