import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    excerpt: "",
    image: null,
    imageUrl: "",
    fullContent: "",
    category: "",
    tags: "",
  });
  const [error, setError] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
    } else {
      fetchBlogs();
    }
  }, [navigate]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = Array.isArray(response.data) ? response.data : [];
      setBlogs(data);
    } catch (err) {
      setError("Error fetching blogs");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        setError("Only JPEG, PNG, or GIF images are allowed");
        setFileName("Invalid file type");
        setFormData({ ...formData, image: null });
        return;
      }
      setFileName(file.name);
      setFormData({ ...formData, image: file });
    } else {
      setFileName("No file chosen");
      setFormData({ ...formData, image: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingBlogId && !formData.image) {
      setError("Image is required for new blogs");
      return;
    }
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image") {
          if (formData[key]) submitData.append(key, formData[key]);
        } else {
          submitData.append(key, formData[key]);
        }
      });

      let response;
      if (editingBlogId) {
        response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/${editingBlogId}`, submitData, { headers });
      } else {
        response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`, submitData, { headers });
      }

      setFormData({
        title: "",
        author: "",
        excerpt: "",
        image: null,
        imageUrl: "",
        fullContent: "",
        category: "",
        tags: "",
      });
      setFileName("No file chosen");
      setEditingBlogId(null);
      fetchBlogs();
      setError("");
    } catch (err) {
      setError(editingBlogId ? "Error updating blog" : "Error adding blog");
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      author: blog.author,
      excerpt: blog.excerpt,
      image: null,
      imageUrl: blog.imageUrl,
      fullContent: blog.fullContent,
      category: blog.category,
      tags: blog.tags.join(", "),
    });
    setFileName("No file chosen");
    setEditingBlogId(blog._id);
  };

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/${blogId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        fetchBlogs();
        setError("");
      } catch (err) {
        setError("Error deleting blog");
      }
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      title: "",
      author: "",
      excerpt: "",
      image: null,
      imageUrl: "",
      fullContent: "",
      category: "",
      tags: "",
    });
    setFileName("No file chosen");
    setEditingBlogId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 sm:p-6 md:p-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#104B51]">Blog Management</h1>
          <button 
            onClick={handleLogout} 
            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-300 w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 sm:p-6 rounded-2xl mb-8 sm:mb-12 shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#104B51]">
            {editingBlogId ? "Edit Blog" : "Add New Blog"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51] w-full"
              required
            />
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
              className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51] w-full"
              required
            />
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Excerpt"
              className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51] h-20 w-full"
              required
            />
            <div className="relative">
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/gif"
                className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51] w-full"
              />
              <span className="text-sm text-gray-600">{fileName}</span>
            </div>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51] w-full"
              required
            >
              <option value="">Select Category</option>
              <option value="Strategic Hiring">Strategic Hiring</option>
              <option value="Philosophy">Philosophy</option>
              <option value="Energy Hiring">Energy Hiring</option>
              <option value="AI in Hiring">AI in Hiring</option>
            </select>
            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Tags (comma-separated)"
              className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51] w-full"
            />
            <textarea
              name="fullContent"
              value={formData.fullContent}
              onChange={handleChange}
              placeholder="Full Content (Plain Text)"
              className="sm:col-span-2 p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104B51] h-40 w-full"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-6">
            <button
              type="submit"
              className="bg-[#104B51] text-white font-semibold rounded-full py-3 hover:bg-[#0D3E43] transition-all duration-300 w-full"
            >
              {editingBlogId ? "Update Blog" : "Add Blog"}
            </button>
            {editingBlogId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white font-semibold rounded-full py-3 hover:bg-gray-600 transition-all duration-300 w-full"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#104B51]">Current Blogs</h2>
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div 
              key={blog._id} 
              className="bg-gray-100 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-md"
            >
              <div className="mb-4 sm:mb-0">
                <h3 className="text-lg sm:text-xl font-semibold text-[#104B51]">{blog.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{blog.category} | {new Date(blog.date).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-[#104B51] text-white px-4 py-2 rounded-full hover:bg-[#0D3E43] transition-all duration-300 w-full sm:w-auto"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-300 w-full sm:w-auto"
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

export default BlogAdmin;