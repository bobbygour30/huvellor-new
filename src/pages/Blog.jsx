import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaSearch,
  FaTag,
  FaHeart,
  FaShareAlt,
  FaSync,
  FaCalendarAlt,
  FaUser,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import axios from "axios";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const getDateFormat = (dateStr) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "1\nJan\n25";
  const day = d.getDate();
  const monthAbbr = months[d.getMonth()];
  const year = d.getFullYear().toString().slice(-2);
  return `${day}\n${monthAbbr}\n${year}`;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80 },
  },
};

const Blog = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specificBlogId, setSpecificBlogId] = useState(null);
  const [likesMap, setLikesMap] = useState({});

  /* ------------------------------------------------------------------ */
  /*  URL param handling                                                */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const handle = () => {
      const id = new URLSearchParams(window.location.search).get("id");
      if (id) {
        setSpecificBlogId(id);
        setSearchTerm("");
        setSelectedCategory("");
        setSelectedTag("");
      } else {
        setSpecificBlogId(null);
      }
    };
    handle();
    window.addEventListener("popstate", handle);
    return () => window.removeEventListener("popstate", handle);
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Fetch blogs                                                       */
  /* ------------------------------------------------------------------ */
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`);
      if (Array.isArray(data)) {
        const valid = data
          .filter(
            (p) =>
              p &&
              p._id &&
              p.title &&
              p.excerpt &&
              p.imageUrl &&
              p.category &&
              p.date
          )
          .map((p) => ({
            id: p._id,
            img: p.imageUrl,
            category: p.category,
            date: getDateFormat(p.date),
            title: p.title,
            excerpt: p.excerpt,
            fullContent: p.fullContent || "",
            tags: Array.isArray(p.tags) ? p.tags : [],
            author: p.author || "Anonymous",
            likes: p.likes ?? 0,
          }));

        const map = {};
        valid.forEach((b) => {
          map[b.id] = { count: b.likes, liked: false };
        });
        setLikesMap(map);
        setBlogs(valid);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      setError(`Failed to load blogs: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Memoised helpers                                                  */
  /* ------------------------------------------------------------------ */
  const categories = useMemo(() => {
    const cats = [...new Set(blogs.map((b) => b.category).filter(Boolean))];
    return cats.sort();
  }, [blogs]);

  const tags = useMemo(() => {
    const all = blogs.flatMap((b) => b.tags || []);
    return [...new Set(all)].sort();
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    let filtered = blogs.filter((post) => {
      const matchesSearch =
        !searchTerm ||
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesTag =
        !selectedTag ||
        (post.tags || []).some((t) => t.toLowerCase() === selectedTag.toLowerCase());

      return matchesSearch && matchesCategory && matchesTag;
    });

    return filtered;
  }, [blogs, searchTerm, selectedCategory, selectedTag]);

  const sortedBlogs = useMemo(() => {
    return [...filteredBlogs].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [filteredBlogs]);

  const latestPosts = sortedBlogs.slice(0, 5);
  const hasActiveFilters = searchTerm || selectedCategory || selectedTag || specificBlogId;

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedTag("");
    setSpecificBlogId(null);
    window.history.replaceState({}, "", window.location.pathname);
  };

  /* ------------------------------------------------------------------ */
  /*  Like / Share                                                      */
  /* ------------------------------------------------------------------ */
  const toggleLike = async (blogId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${blogId}/like`
      );
      setLikesMap((prev) => ({
        ...prev,
        [blogId]: { count: data.likes, liked: data.liked },
      }));
    } catch (err) {
      console.error("Like toggle error:", err);
    }
  };

  const handleShare = async (blog) => {
    const url = `${window.location.origin}/blog?id=${blog.id}`;
    const shareData = { title: blog.title, text: blog.excerpt, url };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      navigator.clipboard.writeText(url).then(() => alert("Link copied!"));
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Navigation                                                        */
  /* ------------------------------------------------------------------ */
  const openBlog = (id) => {
    setSpecificBlogId(id);
    window.history.pushState({}, "", `?id=${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBackToList = () => {
    setSpecificBlogId(null);
    window.history.replaceState({}, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ------------------------------------------------------------------ */
  /*  Loading / Error / Empty                                           */
  /* ------------------------------------------------------------------ */
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-[#104B51]">
        Loading blogs...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error}
      </div>
    );

  if (!blogs.length)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[#104B51] text-center px-4">
        No blogs available. Try creating a new blog or{" "}
        <button onClick={fetchBlogs} className="underline hover:text-[#0e3f45] ml-1">
          refresh
        </button>
        .
      </div>
    );

  /* ------------------------------------------------------------------ */
  /*  SINGLE BLOG VIEW                                                  */
  /* ------------------------------------------------------------------ */
  if (specificBlogId) {
    const blog = blogs.find((b) => b.id === specificBlogId);
    if (!blog) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-[#104B51] text-center">
          Blog not found.
          <button
            onClick={goBackToList}
            className="mt-4 flex items-center gap-2 text-[#104B51] underline hover:text-[#0e3f45]"
          >
            <FaArrowLeft /> Back to list
          </button>
        </div>
      );
    }

    const info = likesMap[blog.id] || { count: 0, liked: false };

    return (
      <section className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white text-[#104B51] py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="absolute -top-20 -left-20 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-[#104B51]/5 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-[#104B51]/5 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={goBackToList}
            className="mb-6 flex items-center gap-2 text-[#104B51] hover:text-[#0e3f45] transition-colors"
          >
            <FaArrowLeft /> Back to all blogs
          </motion.button>

          <FullBlogView blog={blog} info={info} toggleLike={toggleLike} handleShare={handleShare} />
        </div>
      </section>
    );
  }

  /* ------------------------------------------------------------------ */
  /*  LIST VIEW – CARD GRID (Like News.jsx)                             */
  /* ------------------------------------------------------------------ */
  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white text-[#104B51] py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-[#104B51]/5 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-[#104B51]/5 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* ==================== MAIN CONTENT (CARDS) ==================== */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.div
                className="w-12 h-1 mx-auto bg-[#104B51] rounded-full mb-3"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
              />
              <p className="text-sm text-cyan-900/60 uppercase tracking-widest">
                All Blogs
              </p>
              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight w-full">
                Explore Our Latest Blogs
              </h2>
              <p className="mt-2 text-gray-600">
                {sortedBlogs.length} {sortedBlogs.length === 1 ? "post" : "posts"} found
              </p>
            </motion.div>

            {/* CARD GRID */}
            {sortedBlogs.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-500">
                No blogs match your filters.
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="ml-2 text-[#104B51] underline hover:text-[#0e3f45]"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8"
              >
                {sortedBlogs.map((it) => {
                  const likeInfo = likesMap[it.id] || { count: 0, liked: false };
                  return (
                    <BlogCard
                      key={it.id}
                      blog={it}
                      likeInfo={likeInfo}
                      toggleLike={toggleLike}
                      handleShare={handleShare}
                      openBlog={openBlog}
                    />
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* ==================== SIDEBAR ==================== */}
          <aside className="lg:col-span-4 order-1 lg:order-2 space-y-5">
            {/* SEARCH */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-5"
            >
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#104B51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#104B51] focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                )}
              </div>
            </motion.div>

            {/* ACTIVE FILTERS */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#104B51]/5 rounded-lg p-3 text-xs sm:text-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#104B51]">Active Filters</span>
                  <button onClick={clearAllFilters} className="underline hover:text-[#0e3f45]">
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {searchTerm && (
                    <span className="px-2 py-0.5 bg-[#104B51] text-white rounded text-xs">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="px-2 py-0.5 bg-[#104B51] text-white rounded text-xs">
                      {selectedCategory}
                    </span>
                  )}
                  {selectedTag && (
                    <span className="px-2 py-0.5 bg-[#104B51] text-white rounded text-xs">
                      #{selectedTag}
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {/* LATEST POSTS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-bold text-[#104B51] mb-3 flex items-center gap-2">
                <FaSync className="text-base sm:text-lg" />
                Latest Posts
              </h3>
              <div className="space-y-3">
                {latestPosts.length > 0 ? (
                  latestPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => openBlog(post.id)}
                      className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <img
                        src={post.img || "https://via.placeholder.com/80"}
                        alt={post.title}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                        onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/80")}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[#104B51] line-clamp-2 text-xs sm:text-sm">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {getDateFormat(post.date).replace(/\n/g, " ")}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500">No recent posts</p>
                )}
              </div>
            </motion.div>

            {/* CATEGORIES & TAGS (unchanged) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-bold text-[#104B51] mb-3">
                Categories
              </h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setSpecificBlogId(null);
                    window.history.replaceState({}, "", window.location.pathname);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm ${
                    selectedCategory === "" && !specificBlogId
                      ? "bg-[#104B51] text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  All Categories ({blogs.length})
                </button>
                {categories.map((cat) => {
                  const count = blogs.filter((b) => b.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSpecificBlogId(null);
                        window.history.replaceState({}, "", window.location.pathname);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm ${
                        selectedCategory === cat
                          ? "bg-[#104B51] text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-bold text-[#104B51] mb-3 flex items-center gap-2">
                <FaTag className="text-base sm:text-lg" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    setSelectedTag("");
                    setSpecificBlogId(null);
                    window.history.replaceState({}, "", window.location.pathname);
                  }}
                  className={`px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs rounded-full transition-colors ${
                    selectedTag === "" && !specificBlogId
                      ? "bg-[#104B51] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(tag);
                      setSpecificBlogId(null);
                      window.history.replaceState({}, "", window.location.pathname);
                    }}
                    className={`px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs rounded-full transition-colors ${
                      selectedTag === tag
                        ? "bg-[#104B51] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Reusable Blog Card (Same as News.jsx style)                       */
/* ------------------------------------------------------------------ */
const BlogCard = ({ blog, likeInfo, toggleLike, handleShare, openBlog }) => {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden relative"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden h-56">
        <motion.img
          src={blog.img}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500"
          whileHover={{ scale: 1.1 }}
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/600x400?text=Image+Not+Found";
          }}
        />
      
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* Category + Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FaTag className="text-[#104B51]" />
            <span>{blog.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(blog.id);
              }}
              className={`flex items-center gap-1 text-sm transition-colors ${
                likeInfo.liked ? "text-red-600" : "text-slate-600 hover:text-red-600"
              }`}
            >
              <FaHeart
                className={`transition-colors ${
                  likeInfo.liked ? "text-red-600 fill-red-600" : ""
                }`}
              />
              <span>{likeInfo.count}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare(blog);
              }}
              className="text-slate-600 hover:text-[#104B51] transition-colors"
            >
              <FaShareAlt />
            </button>
          </div>
        </div>

        <motion.h3
          className="text-xl font-extrabold text-slate-900 mb-3 line-clamp-2"
          whileHover={{ color: "#104B51" }}
          transition={{ duration: 0.3 }}
        >
          {blog.title}
        </motion.h3>

        <p className="text-slate-500 mb-6 line-clamp-3">{blog.excerpt}</p>

        {/* READ MORE BUTTON - EXACT SAME AS News.jsx */}
        <div className="border-t border-slate-200 pt-4">
          <motion.button
            onClick={() => openBlog(blog.id)}
            className="relative w-full text-left text-sm font-bold text-slate-900 inline-flex items-center justify-between overflow-hidden px-1 py-2"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="relative z-10 flex items-center gap-2"
              variants={{
                hover: {
                  textShadow: "0 0 20px rgba(16, 75, 81, 0.8)",
                },
              }}
              transition={{ duration: 0.3 }}
            >
              Read More
              <motion.span
                className="inline-block w-5 h-5"
                initial={{ rotate: 0 }}
                variants={{
                  hover: { rotate: 90 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </motion.span>
            </motion.span>

            <motion.div
              className="absolute bottom-0 right-0 h-0.5 bg-gradient-to-l from-[#104B51] to-[#0e3f45]"
              initial={{ width: 0 }}
              variants={{
                hover: { width: "100%", left: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ boxShadow: "0 0 10px #104B51" }}
            />

            <motion.div
              className="absolute inset-0 -z-10"
              variants={{
                hover: {
                  scale: [1, 1.6],
                  opacity: [0, 0.5, 0],
                },
              }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                background:
                  "radial-gradient(circle at 10% 50%, #104B51 0%, transparent 70%)",
                filter: "blur(12px)",
              }}
            />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

/* ------------------------------------------------------------------ */
/*  Full Blog View (Single Blog Page)                                 */
/* ------------------------------------------------------------------ */
const FullBlogView = ({ blog, info, toggleLike, handleShare }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
        <img
          src={blog.img}
          alt={blog.title}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/1200x600")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <span className="inline-block bg-[#104B51] px-3 py-1 rounded-full mb-2 text-sm">
            {blog.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            {blog.title}
          </h1>
        </div>
      </div>

      <div className="p-6 sm:p-8 md:p-10 lg:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <FaUser className="text-[#104B51]" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-[#104B51]" />
              <span>{new Date(blog.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleLike(blog.id)}
              className={`flex items-center gap-1 transition-colors ${
                info.liked ? "text-red-600" : "text-gray-600 hover:text-red-600"
              }`}
            >
              <FaHeart className={info.liked ? "fill-red-600 text-red-600" : ""} />
              <span>{info.count}</span>
            </button>
            <button
              onClick={() => handleShare(blog)}
              className="text-gray-600 hover:text-[#104B51]"
            >
              <FaShareAlt />
            </button>
          </div>
        </div>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">{blog.excerpt}</p>

        <div className="prose prose-lg max-w-none text-gray-700 mb-8">
          {blog.fullContent
            .split(/\n{1,2}/)
            .filter((p) => p.trim())
            .map((para, i) => (
              <p key={i} className="mb-6 leading-7">
                {para}
              </p>
            ))}
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-3 py-1 bg-[#104B51]/10 text-[#104B51] text-sm rounded-full"
              >
                <FaTag className="text-xs" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default Blog;