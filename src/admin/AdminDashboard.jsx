import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#104B51]">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-300">
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate("/admin/jobs")}
            className="bg-[#104B51] text-white font-semibold rounded-full py-6 hover:bg-[#0D3E43] transition-all duration-300 text-center"
          >
            <h2 className="text-xl font-bold mb-2">Manage Jobs</h2>
            <p className="text-sm">Add, edit, delete job openings</p>
          </button>
          <button
            onClick={() => navigate("/admin/blogs")}
            className="bg-[#104B51] text-white font-semibold rounded-full py-6 hover:bg-[#0D3E43] transition-all duration-300 text-center"
          >
            <h2 className="text-xl font-bold mb-2">Manage Blogs</h2>
            <p className="text-sm">Add, edit, delete blog posts</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;