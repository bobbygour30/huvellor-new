import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaTimes,
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaVenusMars,
  FaGraduationCap,
  FaTools,
  FaFilePdf,
} from "react-icons/fa";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { useLocation } from "react-router-dom";
import assets from "../assets/assets";

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay },
  },
});

const ApplyForm = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const location = useLocation();
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    higherEducation: "",
    currentRole: "",
    currentLocation: "",
    currentCompany: "",
    experience: "",
    currentCTC: "",
    expectedCTC: "",
    currentStatus: "",
    email: "",
    mobile: "",
    message: "",
    resume: null,
    jobPosition: "",
    dob: "",
    gender: "",
    institute: "",
    functionalArea: "",
    industry: "",
    skills: "",
  });
  const [formStatus, setFormStatus] = useState(null);
  const [fileName, setFileName] = useState("No file chosen, yet.");
  const [dobType, setDobType] = useState("text");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const functionalAreas = [
    "Administration & Facilities",
    "Aviation & Aerospace",
    "BFSI, Investments & Trading",
    "Construction & Site Engineering",
    "Consulting",
    "Content, Editorial & Journalism",
    "CSR & Social Service",
    "Customer Success, Service & Operations",
    "Data Science & Analytics",
    "Energy & Mining",
    "Engineering - Hardware & Networks",
    "Engineering - Software & QA",
    "Environment Health & Safety",
    "Finance & Accounting",
    "Food, Beverage & Hospitality",
    "Healthcare & Life Sciences",
    "Human Resources",
    "IT & Information Security",
    "IT Software - Application Programme, Maintenance",
    "IT Software - Client / Server Programming",
    "IT Software - DBA, Data warehousing",
    "IT Software - eCommerce, Internet Technologies",
    "IT Software - Embed, EDA, VLSI, ASIC, Chip Design",
    "IT Software - ERP, CRM",
    "IT Software - Mainframe",
    "IT Software - Middleware",
    "IT Software - Mobile",
    "IT Software - Other",
    "IT Software - QA & Testing",
    "IT Software - System Programming",
    "IT Software - Systems, EDP, MIS",
    "IT Software - Telecom Software",
    "Legal & Regulatory",
    "Marketing & Communication",
    "Media Production & Entertainment",
    "Merchandising, Retail & eCommerce",
    "Other",
    "Packaging",
    "Procurement & Supply Chain",
    "Product Management",
    "Production, Manufacturing & Engineering",
    "Project & Program Management",
    "Quality Assurance",
    "Research & Development",
    "Risk Management & Compliance",
    "Sales & Business Development",
    "Security Services",
    "Shipping & Maritime",
    "Sports, Fitness & Personal Care",
    "Strategic & Top Management",
    "Teaching & Training",
    "UX, Design & Architecture",
  ];

  const industries = [
    "Accounting / Auditing",
    "Advertising & Marketing",
    "Agriculture / Forestry / Fishing",
    "Analytics / KPO / Research",
    "Animation & VFX",
    "Architecture / Interior Design",
    "Auto Components",
    "Automobile",
    "Aviation",
    "Banking",
    "Beauty & Personal Care",
    "Beverage",
    "Biotechnology",
    "BPO / Call Centre",
    "Building Material",
    "Chemicals",
    "Clinical Research / Contract Research",
    "Consumer Electronics & Appliances",
    "Content Development /Language",
    "Courier / Logistics",
    "Defence & Aerospace",
    "Design",
    "E-Learning / EdTech",
    "Education / Training",
    "Electrical Equipment",
    "Electronic Components /Semiconductors",
    "Electronics Manufacturing",
    "Emerging Technologies",
    "Engineering & Construction",
    "Events / Live Entertainment",
    "Facility Management Services",
    "Fertilizers / Pesticides / Agro chemicals",
    "Film / Music / Entertainment",
    "Financial Services",
    "FinTech / Payments",
    "Fitness & Wellness",
    "FMCG",
    "Food Processing",
    "Furniture & Furnishing",
    "Gaming",
    "Gems & Jewellery",
    "Government / Public Administration",
    "Hardware & Networking",
    "Hotels & Restaurants",
    "Import & Export",
    "Industrial Automation",
    "Industrial Equipment / Machinery",
    "Insurance",
    "Internet",
    "Investment Banking / Venture Capital / Private Equity",
    "Iron & Steel",
    "IT Services & Consulting",
    "Law Enforcement / Security Services",
    "Leather",
    "Legal",
    "Management Consulting",
    "Medical Devices & Equipment",
    "Medical Services / Hospital",
    "Metals & Mining",
    "Miscellaneous",
    "NBFC",
    "NGO / Social Services / Industry Associations",
    "Oil & Gas",
    "Packaging & Containers",
    "Petrochemical / Plastics /Rubber",
    "Pharmaceutical & Life Sciences",
    "Ports & Shipping",
    "Power",
    "Printing & Publishing",
    "Pulp & Paper",
    "Railways",
    "Real Estate",
    "Recruitment / Staffing",
    "Retail",
    "Software Product",
    "Sports / Leisure & Recreation",
    "Telecom / ISP",
    "Textile & Apparel",
    "Travel & Tourism",
    "TV/Radio",
    "Urban Transport",
    "Water Treatment / Waste Management",
  ];

  useEffect(() => {
    if (location.state?.job) {
      setSelectedJob(location.state.job);
      setFormData((prev) => ({
        ...prev,
        jobPosition: location.state.job.role,
      }));
    }
  }, [location.state]);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume" && files[0]) {
      if (files[0].type !== "application/pdf") {
        setFileName("Invalid file type. Please upload a PDF.");
        setFormData((prev) => ({ ...prev, resume: null }));
        alert("Please upload a PDF file.");
        return;
      }
      setFileName(files[0].name);
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else if (name === "resume" && !files[0]) {
      setFileName("No file chosen, yet.");
      setFormData((prev) => ({ ...prev, resume: null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const clearFile = () => {
    setFileName("No file chosen, yet.");
    setFormData((prev) => ({ ...prev, resume: null }));
    const fileInput = document.querySelector('input[name="resume"]');
    if (fileInput) fileInput.value = "";
  };

  const handleDobFocus = () => setDobType("date");
  const handleDobBlur = (e) => {
    if (!e.target.value) setDobType("text");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.resume) {
      setError("Please upload a PDF resume.");
      return;
    }
    if (!formData.jobPosition) {
      setError("Please specify a job position.");
      return;
    }
    setFormStatus("Submitting...");
    setError("");

    try {
      const uploadData = new FormData();
      uploadData.append("resume", formData.resume);
      Object.keys(formData).forEach((key) => {
        if (formData[key] && key !== "resume")
          uploadData.append(key, formData[key]);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/resumes`,
        uploadData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { resumeUrl, parsedResume, jobPosition } = response.data;

      const emailParams = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        higherEducation: formData.higherEducation,
        currentRole: formData.currentRole,
        currentLocation: formData.currentLocation,
        currentCompany: formData.currentCompany,
        experience: formData.experience,
        currentCTC: formData.currentCTC,
        expectedCTC: formData.expectedCTC,
        currentStatus: formData.currentStatus,
        email: formData.email,
        mobile: formData.mobile,
        message: formData.message,
        resumeUrl,
        parsedResume,
        jobPosition,
        dob: formData.dob,
        gender: formData.gender,
        institute: formData.institute,
        functionalArea: formData.functionalArea,
        industry: formData.industry,
        skills: formData.skills,
        year: new Date().getFullYear(),
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setShowSuccess(true);
      setFormStatus(null);
      setFormData({
        firstName: "",
        lastName: "",
        higherEducation: "",
        currentRole: "",
        currentLocation: "",
        currentCompany: "",
        experience: "",
        currentCTC: "",
        expectedCTC: "",
        currentStatus: "",
        email: "",
        mobile: "",
        message: "",
        resume: null,
        jobPosition: "",
        dob: "",
        gender: "",
        institute: "",
        functionalArea: "",
        industry: "",
        skills: "",
      });
      setFileName("No file chosen, yet.");
      setSelectedJob(null);
      setDobType("text");
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error(
        "Error submitting application:",
        error.message,
        error.response?.data
      );
      setError(`Error submitting application: ${error.message}`);
      setFormStatus(null);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relativ text-[#104B51]    overflow-hidden"
    >
      <div className="relative z-10">
        {/* HERO BANNER - SPLIT LAYOUT */}
        <motion.div
          variants={fadeInUp(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col-reverse md:flex-row gap-5 items-center justify-center mb-10 bg-[#f0f0f0] px-6 py-10 md:px-10 lg:px-20"
        >
          {/* LEFT: Text */}
          <div className="text-center md:text-left flex flex-col justify-center max-w-3xl sm:ml-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#104B51] mb-4 leading-tight ">
              Let’s build your next chapter with Huvellor
            </h1>
            <p className="text-xs sm:text-lg md:text-xl text-[#104B51]/80 font-medium">
              Share your profile with us and get connected to exclusive
              opportunities from our trusted clients’ network — where your
              talent truly belongs.
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
              <div className="w-6 h-10 border-2 border-[#104B51] rounded-full flex justify-center opacity-80">
                <div className="w-1 h-3 bg-[#104B51] rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>

          {/* RIGHT: Animated Image */}
          <div className="flex justify-center">
            <motion.img
              src={assets.resume1}
              alt="Career Opportunities"
              className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl object-contain"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            />
          </div>
        </motion.div>

        {/* FORM SECTION */}
        <motion.form
          variants={fadeInUp(0.3)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onSubmit={handleSubmit}
          className="bg-[#F0F0F0] border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
        >
          {/* Show Job Title if Applying for Specific Job */}
          {selectedJob && (
            <div className="md:col-span-3 bg-[#104B51] text-white p-4 rounded-xl text-center font-semibold text-lg shadow-md mb-4">
              Applying for:{" "}
              <span className="underline">{selectedJob.role}</span>
            </div>
          )}

          {/* Job Position Input (Only if no job selected) */}
          {!selectedJob && (
            <div className="relative md:col-span-3">
              <FaBriefcase className="absolute top-3 left-3 text-[#104B51]" />
              <input
                type="text"
                name="jobPosition"
                value={formData.jobPosition}
                onChange={handleFormChange}
                placeholder="Job Position*"
                required
                className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500"
              />
            </div>
          )}

          {/* First Name */}
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleFormChange}
              placeholder="First Name*"
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500"
            />
          </div>

          {/* Last Name */}
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleFormChange}
              placeholder="Last Name*"
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500"
            />
          </div>

          {/* Gender */}
          <div className="relative">
            <FaVenusMars className="absolute top-3 left-3 text-[#104B51]" />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleFormChange}
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51]"
            >
              <option value="" disabled>
                Select Gender*
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* DOB */}
          <div className="relative">
            <FaCalendarAlt className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type={dobType}
              name="dob"
              value={formData.dob}
              onChange={handleFormChange}
              onFocus={handleDobFocus}
              onBlur={handleDobBlur}
              placeholder="DOB* (YYYY-MM-DD)"
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Email ID*"
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500"
            />
          </div>

          {/* Mobile */}
          <div className="relative">
            <FaPhoneAlt className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleFormChange}
              placeholder="Mobile No*"
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500"
            />
          </div>

          {/* Current Location */}
          <div className="relative">
            <FaBuilding className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="text"
              name="currentLocation"
              value={formData.currentLocation}
              onChange={handleFormChange}
              placeholder="City Name*"
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500"
            />
          </div>

          {/* Company */}
          <div className="relative">
            <FaBuilding className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="text"
              name="currentCompany"
              value={formData.currentCompany}
              onChange={handleFormChange}
              placeholder="Company"
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500"
            />
          </div>

          {/* Current Role */}
          <div className="relative">
            <FaBriefcase className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="text"
              name="currentRole"
              value={formData.currentRole}
              onChange={handleFormChange}
              placeholder="Designation*"
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500"
            />
          </div>

          {/* Experience */}
          <div className="relative">
            <FaTools className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleFormChange}
              placeholder="Experience (years)*"
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500"
            />
          </div>

          {/* Current CTC */}
          <div className="relative">
            <FaBriefcase className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="number"
              name="currentCTC"
              value={formData.currentCTC}
              onChange={handleFormChange}
              placeholder="Current CTC (LPA)*"
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500"
            />
          </div>

          {/* Expected CTC */}
          <div className="relative">
            <FaBriefcase className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="number"
              name="expectedCTC"
              value={formData.expectedCTC}
              onChange={handleFormChange}
              placeholder="Expected CTC (LPA)*"
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500"
            />
          </div>

          {/* Education */}
          <div className="relative">
            <FaGraduationCap className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="text"
              name="higherEducation"
              value={formData.higherEducation}
              onChange={handleFormChange}
              placeholder="Degree*"
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500"
            />
          </div>

          {/* Institute */}
          <div className="relative">
            <FaGraduationCap className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="text"
              name="institute"
              value={formData.institute}
              onChange={handleFormChange}
              placeholder="Institute*"
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500"
            />
          </div>

          {/* Current Status */}
          <div className="relative">
            <FaBriefcase className="absolute top-3 left-3 text-[#104B51]" />
            <select
              name="currentStatus"
              value={formData.currentStatus}
              onChange={handleFormChange}
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51]"
            >
              <option value="" disabled>
                Current Status*
              </option>
              <option value="Working">Working</option>
              <option value="Not Working">Not Working</option>
            </select>
          </div>

          {/* Functional Area */}
          <div className="relative md:col-span-3">
            <FaTools className="absolute top-3 left-3 text-[#104B51]" />
            <select
              name="functionalArea"
              value={formData.functionalArea}
              onChange={handleFormChange}
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51]"
            >
              <option value="" disabled>
                Function*
              </option>
              {functionalAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Industry */}
          <div className="relative md:col-span-3">
            <FaBuilding className="absolute top-3 left-3 text-[#104B51]" />
            <select
              name="industry"
              value={formData.industry}
              onChange={handleFormChange}
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51]"
            >
              <option value="" disabled>
                Industry*
              </option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Skills */}
          <div className="relative md:col-span-3">
            <FaTools className="absolute top-3 left-3 text-[#104B51]" />
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleFormChange}
              placeholder="Skills (comma separated)*"
              required
              className="w-full pl-10 border border-gray-300 bg-white text-[#104B51] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500"
            />
          </div>

          {/* Message */}
          <div className="relative md:col-span-3">
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleFormChange}
              placeholder="Message (Optional)"
              className="w-full pl-3 pt-3 border border-gray-300 bg-white text-[#104B51] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104B51] placeholder-gray-500 resize-y"
            />
          </div>

          {/* Resume Upload */}
          <div className="relative md:col-span-3">
            <label className="flex items-center border-2 border-dashed border-gray-400 bg-white rounded-lg p-4 cursor-pointer hover:border-[#104B51] transition-all">
              <FaFilePdf className="text-[#104B51] mr-3 text-xl" />
              <div className="flex-1">
                <span className="text-[#104B51] font-medium">
                  Upload Resume (PDF only)
                </span>
                <p className="text-sm text-gray-500">{fileName}</p>
              </div>
              {fileName !== "No file chosen, yet." && (
                <button
                  type="button"
                  onClick={clearFile}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              )}
              <input
                type="file"
                name="resume"
                onChange={handleFormChange}
                accept="application/pdf"
                required
                className="hidden"
              />
            </label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#104B51] text-white font-semibold rounded-full py-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {formStatus || "Submit Application"}
            </motion.button>

            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex justify-center items-center gap-2 text-green-600 font-medium"
              >
                Application submitted successfully!
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex justify-center items-center gap-2 text-red-600 font-medium"
              >
                {error}
              </motion.div>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ApplyForm;
