import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-[#104B51] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#F9FAFB] border border-gray-200 shadow-lg p-8 rounded-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-[#104B51]">
          Admin Login
        </h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 text-[#104B51] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#104B51] bg-white"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg border border-gray-300 text-[#104B51] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#104B51] bg-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#104B51] text-white font-semibold rounded-full py-3 hover:shadow-lg transition-all duration-500"
        >
          Login
        </button>

        <div className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} HUVELLOR | Admin Access Only
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
