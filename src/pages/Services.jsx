import React from "react";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaUserFriends,
  FaProjectDiagram,
  FaStar,
  FaBalanceScale,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import assets from "../assets/assets"; // Make sure this path is correct

const ICONS = [
  FaUserTie,
  FaUserFriends,
  FaProjectDiagram,
  FaStar,
  FaBalanceScale,
  FaChalkboardTeacher,
];

const SERVICES = [
  {
    title: "Executive & Leadership Hiring",
    tagline: "We specialize in identifying and attracting top-tier leaders who can drive strategy, growth,and innovation. Confidential searches and leadership assessments included.",
    content:
      "At Huvellor, leadership hiring goes beyond designations — it’s about discovering individuals who carry both vision and values. We specialize in connecting organizations with leaders who can drive strategy, nurture culture, and elevate teams with empathy and innovation. Our focus is not just on experience, but on leadership energy, authenticity, and long-term alignment with your business goals.",
  },
  {
    title: "End-to-End Recruitment Services",
    tagline: "From sourcing to onboarding, we manage the entire recruitment cycle for all roles—technical, non-technical, mid-level, and senior.",
    content:
      "From workforce planning to seamless onboarding, we manage the entire recruitment lifecycle with precision and purpose. Our approach blends human insight with data intelligence — ensuring every hire strengthens performance, culture, and retention. We build hiring frameworks that evolve with your organization, helping you scale smarter and hire faster without compromising quality.",
  },
  {
    title: "Contract Staffing & Project-Based Hiring",
    tagline: "Flexible hiring for short-term projects or seasonal needs without compromising on talentquality or compliance.",
    content:
      "We help leaders design HR strategies that fuel sustainable growth. Through workforce analytics, role mapping, and organizational planning, Huvellor ensures your talent structure mirrors your company’s direction. Our advisory empowers decision-makers to anticipate future needs, build succession pipelines, and shape workplaces ready for tomorrow.",
  },
  {
    title: "HR Strategy & Workforce Planning",
    tagline: "We help you design scalable HR strategies—from workforce planning and org design to performance management systems.",
    content:
      "We help leaders design HR strategies that fuel sustainable growth. Through workforce analytics, role mapping, and organizational planning, Huvellor ensures your talent structure mirrors your company’s direction. Our advisory empowers decision-makers to anticipate future needs, build succession pipelines, and shape workplaces ready for tomorrow.",
  },
  {
    title: "Employer Branding & Talent Advisory",
    tagline: "We shape how talent sees your brand. From job ad optimization to candidate experience, we help you attract the right kind of attention.",
    content:
      "Your employer brand is the story your people tell about you. At Huvellor, we craft that story with authenticity — strengthening how your organization is perceived by both employees and candidates. We guide you in building a talent identity that attracts, engages, and retains the best, helping you stand out as a trusted and aspirational employer.",
  },
  {
    title: "Policy Development & Compliance",
    tagline: "Customized HR policies aligned with labor laws and your company culture. Includes handbooks, contracts, grievance policies, etc",
    content:
      "We design HR policies that uphold fairness, integrity, and legal compliance. From drafting company handbooks to implementing statutory frameworks, Huvellor ensures your organization operates responsibly and confidently. Our goal is to create a foundation where both employees and employers feel secure, respected, and aligned.",
  },
  {
    title: "Onboarding & Employee Experience",
    tagline: "We create smooth, impactful onboarding experiences that improve retention and employee engagement from day one.",
    content:
      "We design HR policies that uphold fairness, integrity, and legal compliance. From drafting company handbooks to implementing statutory frameworks, Huvellor ensures your organization operates responsibly and confidently. Our goal is to create a foundation where both employees and employers feel secure, respected, and aligned.",
  },
  {
    title: "Learning & Development Programs",
    tagline: "Upskill your team with custom training modules on leadership, communication, compliance, and team dynamics.",
    content:
      "People evolve when they feel seen, supported, and guided. Our customized programs nurture emotional intelligence, leadership capabilities, and team synergy — helping individuals thrive at every level. Through thoughtful onboarding and development journeys, we help companies cultivate a culture of continuous learning and human brilliance.",
  },
];

const Services = () => {
  return (
    <section className="py-24 px-6 md:px-16 bg-[#f8f8f8]">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-[#003034]">
          Our Expertise. Your Competitive Advantage.
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-xl">
          Here are the premium services HUVELLOR offers:
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {SERVICES.map((card, i) => {
          const Icon = ICONS[i] || FaUserTie;
          const img =
            assets[`service${i + 1}`] || assets[`serviceImage${i + 1}`] || "";

          return (
            <motion.article
              key={card.title}
              className="relative bg-white rounded-2xl shadow-md overflow-hidden flex flex-col 
                         hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + i * 0.08,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              {/* Image */}
              <div
                className="h-56 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${img})` }}
              ></div>

              {/* Card Base Content */}
              <div className="flex-1 flex flex-col justify-between relative p-6 text-center z-10">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#003034] text-white w-20 h-20 rounded-full grid place-items-center shadow-lg border-4 border-white">
                  <Icon className="text-white opacity-95" size={28} />
                </div>

                <h3 className="text-xl font-semibold text-[#003034] mt-10">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-[#333333]">{card.tagline}</p>
              </div>

              {/* Full Card Hover Overlay WITHOUT Read More Button */}
              <motion.div className="absolute inset-0 bg-[#003034]/95 text-white p-6 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-y-auto rounded-2xl z-20">
                <p className="text-sm md:text-base">{card.content}</p>
              </motion.div>
            </motion.article>
          );
        })}
      </div>
      <div className="ml-auto flex items-center justify-center mt-10">
        <Link to="/quote">
          <button className="bg-[#24585D] text-white px-6 py-3 rounded-md font-semibold shadow-md hover:opacity-95 cursor-pointer">
            SCHEDULE A STRATEGY CALL
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Services;
