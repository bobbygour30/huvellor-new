// src/components/JobListings.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaBriefcase, FaFilter } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay } },
});

const indianCities = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const JOB_TYPES = [
  "Full-Time",
  "Part-Time",
  "Contract / Project-Based",
  "Freelance / Consultant",
  "Internship / Trainee"
];

const WORK_MODES = ["On-Site", "Hybrid", "Remote"];

const INDUSTRIES = [
  "HR", "Recruitment", "L&D", "Finance",
  "Technology & Digital Solutions (IT)",
  "E-Commerce & Startups",
  "BFSI & Fintech",
  "Consulting & Advisory",
  "FMCG & Consumer Goods",
  "Healthcare & Life Sciences",
  "Engineering, Manufacturing & Automotive",
  "Media, Marketing & Communications",
  "Hospitality, Travel & Aviation",
  "Real Estate & Infrastructure",
  "Education, EdTech & Learning",
  "Human Resources & Talent Management",
  "Energy, Oil & Sustainability",
  "Logistics, Supply Chain & Procurement",
  "Non-Profit, CSR & Social Impact",
  "Government, Policy & Public Sector",
  "Legal & Compliance"
];

/* -------------------------------------------------
   TypingHeading – infinite loop (type → delete)
   ------------------------------------------------- */
const TypingHeading = ({ text, className }) => {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let idx = 0;
    let forward = true;               // true = typing, false = deleting
    let timer = null;

    const typeSpeed = 50;             // ms per char while typing
    const deleteSpeed = 30;           // ms per char while deleting
    const pauseAfterType = 1500;      // pause after full text
    const pauseAfterDelete = 800;     // pause after empty

    const step = () => {
      if (forward) {
        // ---- TYPING ----
        if (idx < text.length) {
          setDisplayed(text.slice(0, idx + 1));
          idx++;
        } else {
          // finished typing → pause then start deleting
          timer = setTimeout(() => {
            forward = false;
            step();
          }, pauseAfterType);
          return;
        }
      } else {
        // ---- DELETING ----
        if (idx > 0) {
          idx--;
          setDisplayed(text.slice(0, idx));
        } else {
          // finished deleting → pause then restart typing
          timer = setTimeout(() => {
            forward = true;
            step();
          }, pauseAfterDelete);
          return;
        }
      }

      timer = setTimeout(step, forward ? typeSpeed : deleteSpeed);
    };

    step(); // start the loop

    // blink cursor
    const blink = setInterval(() => setShowCursor((c) => !c), 500);

    return () => {
      clearTimeout(timer);
      clearInterval(blink);
    };
  }, [text]);

  return (
    <h1 className={className}>
      {displayed}
      {showCursor && (
        <span className="inline-block w-1 h-8 ml-1 bg-[#F0C5B5] animate-pulse align-middle" />
      )}
    </h1>
  );
};

const JobListings = () => {
  const sectionRef = useRef(null);
  // allow re-trigger when user scrolls back into view
  const isInView = useInView(sectionRef, { once: false, amount: 0.25 });
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    industry: "",
    experience: 0,
    salary: 0,
    location: "",
    jobType: [],
    workMode: [],
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationSuggestions] = useState(indianCities);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`);
        const data = Array.isArray(response.data) ? response.data : [];
        const normalizedData = data.map(job => ({
          ...job,
          location: job.location ? job.location.trim() : job.location,
          salary: job.salary ? job.salary / 100000 : job.salary,
          workMode: job.workMode || "",
        }));
        setJobs(normalizedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error.message);
        setError(`Failed to load jobs: ${error.message}. Please try again later.`);
        setJobs([]);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleFilterChange = (category, value) => {
    setFilters((prev) => ({ ...prev, [category]: value }));
  };

  const handleJobTypeToggle = (value) => {
    setFilters((prev) => {
      const current = prev.jobType;
      return {
        ...prev,
        jobType: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleWorkModeToggle = (value) => {
    setFilters((prev) => {
      const current = prev.workMode;
      return {
        ...prev,
        workMode: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleJobApply = (job) => {
    navigate("/apply", { state: { job } });
  };

  const getSalaryDisplay = (salary) => {
    if (salary === 0) return "Any";
    return salary >= 100 ? `Up to ${salary / 100} Cr` : `Up to ${salary} LPA`;
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesIndustry = filters.industry === "" || job.industry === filters.industry;
    const matchesExperience = filters.experience === 0 || job.experience <= filters.experience;
    const matchesSalary = filters.salary === 0 || job.salary <= filters.salary;
    const matchesLocation = filters.location === "" || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesJobType = filters.jobType.length === 0 || filters.jobType.includes(job.type);
    const matchesWorkMode = filters.workMode.length === 0 || filters.workMode.includes(job.workMode);

    return matchesIndustry && matchesExperience && matchesSalary && matchesLocation && matchesJobType && matchesWorkMode;
  });

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-white text-[#104B51] ">
      {/* HERO BANNER */}
      <motion.div
        variants={fadeInUp(0.1)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative w-full h-[200px] md:h-[300px] overflow-hidden shadow-2xl mb-20"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("https://images.pexels.com/photos/5989926/pexels-photo-5989926.jpeg")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 md:px-16 max-w-7xl mx-auto">
          {/* ---- Typing Heading (infinite loop) ---- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-4xl lg:text-5xl font-extrabold text-[#F0C5B5] mb-6 leading-tight drop-shadow-lg"
          >
            <TypingHeading
              text="Explore career opportunities with leading organizations"
              className="inline-block"
            />
          </motion.div>

          <motion.p
            className="text-xs md:text-xl lg:text-xl text-gray-200 leading-relaxed drop-shadow-md max-w-4xl"
            animate={{
              x: [8, -8, 8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Discover handpicked roles from our trusted clients — where talent meets purpose & ambition finds its place.
          </motion.p>
        </div>
      </motion.div>

      {/* Filters & Job Listings */}
      <div className="md:flex md:space-x-8 px-6 md:px-16">
        {/* Desktop Filters */}
        <motion.div
          variants={fadeInUp(0.4)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="hidden md:block md:w-1/4 bg-white p-6 rounded-3xl text-[#104B51] border border-gray-200 shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaBriefcase /> Filters
          </h2>

          {/* Industry - Single Select Dropdown */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Industry</h3>
            <select
              value={filters.industry}
              onChange={(e) => handleFilterChange("industry", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-[#104B51] focus:outline-none focus:ring-2 focus:ring-[#104B51]"
            >
              <option value="">All Industries</option>
              {INDUSTRIES.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Job Type */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Job Type</h3>
            {JOB_TYPES.map((type) => (
              <label key={type} className="flex items-center gap-2 mb-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.jobType.includes(type)}
                  onChange={() => handleJobTypeToggle(type)}
                  className="accent-[#104B51]"
                />
                {type}
              </label>
            ))}
          </div>

          {/* Work Mode */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2 flex items-center gap-1">
              Work Mode
            </h3>
            {WORK_MODES.map((mode) => (
              <label key={mode} className="flex items-center gap-2 mb-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.workMode.includes(mode)}
                  onChange={() => handleWorkModeToggle(mode)}
                  className="accent-[#104B51]"
                />
                {mode}
              </label>
            ))}
          </div>

          {/* Experience */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Experience (years)</h3>
            <input
              type="range"
              min="0"
              max="50"
              value={filters.experience}
              onChange={(e) => handleFilterChange("experience", Number(e.target.value))}
              className="w-full accent-[#104B51]"
            />
            <p className="text-sm text-gray-600 mt-1">
              {filters.experience === 0 ? "Any" : `Up to ${filters.experience} years`}
            </p>
          </div>

          {/* Salary */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Salary</h3>
            <input
              type="range"
              min="0"
              max="200"
              value={filters.salary}
              onChange={(e) => handleFilterChange("salary", Number(e.target.value))}
              className="w-full accent-[#104B51]"
            />
            <p className="text-sm text-gray-600 mt-1">{getSalaryDisplay(filters.salary)}</p>
          </div>

          {/* Location */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Location</h3>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-[#104B51] focus:outline-none focus:ring-2 focus:ring-[#104B51]"
            >
              <option value="">Any</option>
              {locationSuggestions.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Mobile Filters */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 bg-[#104B51] text-white px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            <FaFilter /> {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 bg-white p-4 rounded-2xl text-[#104B51] border border-gray-200 space-y-4 shadow-lg"
            >
              {/* Industry - Single Select Dropdown (Mobile) */}
              <div>
                <h3 className="font-semibold mb-2">Industry</h3>
                <select
                  value={filters.industry}
                  onChange={(e) => handleFilterChange("industry", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-[#104B51] focus:outline-none focus:ring-2 focus:ring-[#104B51]"
                >
                  <option value="">All Industries</option>
                  {INDUSTRIES.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Type */}
              <div>
                <h3 className="font-semibold mb-2">Job Type</h3>
                {JOB_TYPES.map((type) => (
                  <label key={type} className="flex items-center gap-2 mb-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.jobType.includes(type)}
                      onChange={() => handleJobTypeToggle(type)}
                      className="accent-[#104B51]"
                    />
                    {type}
                  </label>
                ))}
              </div>

              {/* Work Mode */}
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-1">
                  Work Mode
                </h3>
                {WORK_MODES.map((mode) => (
                  <label key={mode} className="flex items-center gap-2 mb-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.workMode.includes(mode)}
                      onChange={() => handleWorkModeToggle(mode)}
                      className="accent-[#104B51]"
                    />
                    {mode}
                  </label>
                ))}
              </div>

              {/* Experience */}
              <div>
                <h3 className="font-semibold mb-2">Experience (years)</h3>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={filters.experience}
                  onChange={(e) => handleFilterChange("experience", Number(e.target.value))}
                  className="w-full accent-[#104B51]"
                />
                <p className="text-sm text-gray-600 mt-1">
                  {filters.experience === 0 ? "Any" : `Up to ${filters.experience} years`}
                </p>
              </div>

              {/* Salary */}
              <div>
                <h3 className="font-semibold mb-2">Salary</h3>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={filters.salary}
                  onChange={(e) => handleFilterChange("salary", Number(e.target.value))}
                  className="w-full accent-[#104B51]"
                />
                <p className="text-sm text-gray-600 mt-1">{getSalaryDisplay(filters.salary)}</p>
              </div>

              {/* Location */}
              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-[#104B51] focus:outline-none focus:ring-2 focus:ring-[#104B51]"
                >
                  <option value="">Any</option>
                  {locationSuggestions.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>

        {/* Job Listings */}
        <div className="md:w-3/4 space-y-12">
          <motion.div
            variants={fadeInUp(0.5)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl font-bold mb-8 text-[#104B51]">Current Openings</h2>
            <div className="space-y-6">
              {loading ? (
                <p className="text-gray-600">Loading jobs...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job, i) => (
                  <motion.div
                    key={job._id || job.role}
                    variants={fadeInUp(0.1 + i * 0.1)}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row md:justify-between items-start md:items-center hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] transition-all duration-700"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-[#104B51]">{job.role}</h3>
                      <p className="text-gray-600 text-sm mt-1">{job.type}</p>
                      <p className="text-gray-600 text-sm mt-1">Industry: {job.industry}</p>
                      <p className="text-gray-600 text-sm mt-1">Experience: {job.experience} years</p>
                      <p className="text-gray-600 text-sm mt-1">
                        Salary: {job.salary >= 100 ? `${job.salary / 100} Cr` : `${job.salary} LPA`}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">Location: {job.location}</p>
                      {job.workMode && (
                        <p className="text-gray-600 text-sm mt-1">Work Mode: {job.workMode}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleJobApply(job)}
                      className="mt-4 md:mt-0 inline-block bg-[#104B51] text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-500"
                    >
                      Apply
                    </button>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-600">
                  {filters.location
                    ? `Jobs for this location are not available.`
                    : jobs.length === 0
                    ? "No jobs available."
                    : "No jobs match your filters."}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JobListings;