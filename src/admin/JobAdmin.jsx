// src/admin/JobAdmin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JOB_TYPES = [
  "Full-Time",
  "Part-Time",
  "Contract / Project-Based",
  "Freelance / Consultant",
  "Internship / Trainee"
];

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

const WORK_MODES = ["On-Site", "Hybrid", "Remote"];

const JobAdmin = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    role: "",
    type: "",
    industry: "",
    experience: null,
    salary: null,
    profile: "",
    package: null,
    location: "",
    workMode: "",
  });
  const [error, setError] = useState("");
  const [editingJobId, setEditingJobId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
    } else {
      fetchJobs();
    }
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = Array.isArray(response.data) ? response.data : [];
      setJobs(data);
    } catch (err) {
      setError("Error fetching jobs");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
      if (editingJobId) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${editingJobId}`, formData, { headers });
        setEditingJobId(null);
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`, formData, { headers });
      }
      setFormData({
        role: "",
        type: "",
        industry: "",
        experience: null,
        salary: null,
        profile: "",
        package: null,
        location: "",
        workMode: "",
      });
      fetchJobs();
      setError("");
    } catch (err) {
      setError(editingJobId ? "Error updating job" : "Error adding job");
    }
  };

  const handleEdit = (job) => {
    setFormData({
      role: job.role,
      type: job.type,
      industry: job.industry,
      experience: job.experience,
      salary: job.salary,
      profile: job.profile,
      package: job.package,
      location: job.location,
      workMode: job.workMode || "",
    });
    setEditingJobId(job._id);
  };

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        fetchJobs();
        setError("");
      } catch (err) {
        setError("Error deleting job");
      }
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      role: "",
      type: "",
      industry: "",
      experience: null,
      salary: null,
      profile: "",
      package: null,
      location: "",
      workMode: "",
    });
    setEditingJobId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#104B51]">Job Management</h1>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-300">
            Logout
          </button>
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-2xl mb-12 shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-[#104B51]">
            {editingJobId ? "Edit Job Opening" : "Add New Job Opening"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Role"
              className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51]"
              required
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51]"
              required
            >
              <option value="">Select Job Type</option>
              {JOB_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51]"
              required
            >
              <option value="">Select Industry</option>
              {INDUSTRIES.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            <input
              name="experience"
              type="number"
              value={formData.experience || ""}
              onChange={handleChange}
              placeholder="Experience (years)"
              className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51]"
              required
            />
            <input
              name="salary"
              type="number"
              value={formData.salary || ""}
              onChange={handleChange}
              placeholder="Salary (LPA)"
              className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51]"
              required
            />
            <select
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51]"
              required
            >
              <option value="">Select Work Mode</option>
              {WORK_MODES.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
            <input
              name="profile"
              value={formData.profile}
              onChange={handleChange}
              placeholder="Profile"
              className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51]"
              required
            />
            <input
              name="package"
              type="number"
              value={formData.package || ""}
              onChange={handleChange}
              placeholder="Package (LPA)"
              className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51]"
              required
            />
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51]"
              required
            />
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="w-full bg-[#104B51] text-white font-semibold rounded-full py-3 hover:bg-[#0D3E43] transition-all duration-300"
            >
              {editingJobId ? "Update Job" : "Add Job"}
            </button>
            {editingJobId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full bg-gray-500 text-white font-semibold rounded-full py-3 hover:bg-gray-600 transition-all duration-300"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <h2 className="text-2xl font-bold mb-6 text-[#104B51]">Current Job Openings</h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="bg-gray-100 p-4 rounded-2xl flex justify-between items-center shadow-md">
              <div>
                <h3 className="text-xl font-semibold text-[#104B51]">{job.role}</h3>
                <p className="text-gray-600">{job.type} | {job.location} | {job.workMode}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(job)}
                  className="bg-[#104B51] text-white px-4 py-2 rounded-full hover:bg-[#0D3E43] transition-all duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobAdmin;