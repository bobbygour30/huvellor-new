import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTag, FaHeart, FaShareAlt } from "react-icons/fa";
import axios from "axios";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
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

export default function NewsComponent() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likesMap, setLikesMap] = useState({}); // { blogId: { count, liked } }

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs`
      );
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
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3)
          .map((p) => ({
            id: p._id,
            img: p.imageUrl,
            category: p.category,
            date: getDateFormat(p.date),
            title: p.title,
            excerpt: p.excerpt,
            likes: p.likes ?? 0,
          }));

        // initialise likesMap from server data
        const initMap = {};
        valid.forEach((b) => {
          initMap[b.id] = { count: b.likes, liked: false };
        });
        setLikesMap(initMap);
        setBlogs(valid);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load latest articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

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
      console.error("Like error:", err);
    }
  };

  const handleShare = async (blog) => {
    const url = `${window.location.origin}/blog?id=${blog.id}`;
    const shareData = { title: blog.title, text: blog.excerpt, url };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      navigator.clipboard.writeText(url).then(() => alert("Link copied!"));
    }
  };
  const InkPortal = () => {
    return (
      <motion.div
        className="relative w-28 h-28"
        initial={{ scale: 0, rotate: 0 }}
        variants={{
          hover: {
            scale: [0, 1.3, 1.1],
            rotate: [0, 180, 360],
          },
        }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
          times: [0, 0.6, 1],
        }}
      >
        {/* Main Ink Blob */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #1e3a8a, #0f172a, #0f172a)",
            boxShadow: `
            0 0 60px #1e40af,
            0 0 100px #3b82f6,
            inset 0 0 40px rgba(30, 58, 138, 0.6)
          `,
            filter: "blur(1px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner Void (Text Gets Sucked In) */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-8 h-8 bg-black rounded-full"
          style={{ x: "-50%", y: "-50%" }}
          animate={{
            scale: [0.3, 1.4, 0.8],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Energy Rings */}
        {[1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: "#60a5fa",
              boxShadow: "0 0 20px #60a5fa",
            }}
            animate={{
              scale: [0.8, 2.5],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: ring * 0.3,
            }}
          />
        ))}

        {/* Final Flash on Click */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white"
          variants={{
            tap: {
              scale: [1, 4],
              opacity: [0, 1, 0],
            },
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    );
  };

  const openSpecificBlog = (blogId) => {
    window.location.href = `/blog?id=${blogId}`;
  };

  if (loading)
    return (
      <section className="max-w-7xl mx-auto mt-10 py-20 text-center">
        <p className="text-slate-600">Loading latest articles...</p>
      </section>
    );
  if (error)
    return (
      <section className="max-w-7xl mx-auto mt-10 py-20 text-center">
        <p className="text-red-600">{error}</p>
      </section>
    );
  if (!blogs.length)
    return (
      <section className="max-w-7xl mx-auto mt-10 py-20 text-center">
        <p className="text-slate-600">No articles available at the moment.</p>
      </section>
    );

  return (
    <section className="max-w-7xl mx-auto mt-10 ">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <motion.div
          className="w-12 h-1 mx-auto bg-[#24585D] rounded-full mb-3"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        />
        <p className="text-sm text-cyan-900/60 uppercase tracking-widest">
          News Updates
        </p>
        <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
          Latest Articles &
          <br />
          News from the Blogs
        </h2>
      </motion.div>

      {/* CARDS */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20 p-2"
      >
        {blogs.map((it) => {
          const likeInfo = likesMap[it.id] || { count: 0, liked: false };
          return (
            <motion.article
              key={it.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden relative"
            >
              {/* IMAGE SECTION */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={it.img}
                  alt={it.title}
                  className="w-full h-56 object-cover transition-transform duration-500"
                  whileHover={{ scale: 1.1 }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/600x400?text=Image+Not+Found";
                  }}
                />
              </div>

              {/* CARD CONTENT */}
              <div className="p-6">
                {/* TAG + LIKE + SHARE */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <FaTag className="text-[#24585D]" />
                    <span>{it.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* LIKE */}
                    <button
                      onClick={() => toggleLike(it.id)}
                      className={`flex items-center gap-1 text-sm transition-colors ${
                        likeInfo.liked
                          ? "text-red-600"
                          : "text-slate-600 hover:text-red-600"
                      }`}
                    >
                      <FaHeart
                        className={`transition-colors ${
                          likeInfo.liked ? "text-red-600 fill-red-600" : ""
                        }`}
                      />
                      <span>{likeInfo.count}</span>
                    </button>
                    {/* SHARE */}
                    <button
                      onClick={() => handleShare(it)}
                      className="text-slate-600 hover:text-[#24585D] transition-colors"
                    >
                      <FaShareAlt />
                    </button>
                  </div>
                </div>

                <motion.h3
                  className="text-xl font-extrabold text-slate-900 mb-3 line-clamp-2"
                  whileHover={{ color: "#24585D" }}
                  transition={{ duration: 0.3 }}
                >
                  {it.title}
                </motion.h3>

                <p className="text-slate-500 mb-6 line-clamp-3">{it.excerpt}</p>


                {/* FULL-WIDTH READ MORE - ARROW ROTATES ON HOVER */}
                <div className="border-t border-slate-200 pt-4">
                  <motion.button
                    onClick={() => openSpecificBlog(it.id)}
                    className="relative w-full text-left text-sm font-bold text-slate-900 inline-flex items-center justify-between overflow-hidden px-1 py-2"
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Left: Text + Arrow */}
                    <motion.span
                      className="relative z-10 flex items-center gap-2"
                      variants={{
                        hover: {
                          textShadow: "0 0 20px rgba(96, 216, 224, 0.8)",
                        },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Read More
                      {/* Arrow: Always visible, rotates on hover */}
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

                    {/* Underline: Slides in from right */}
                    <motion.div
                      className="absolute bottom-0 right-0 h-0.5 bg-gradient-to-l from-[#60d8e0] to-[#24585D]"
                      initial={{ width: 0 }}
                      variants={{
                        hover: { width: "100%", left: 0 },
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{ boxShadow: "0 0 10px #60d8e0" }}
                    />

                    {/* Background Pulse */}
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
                          "radial-gradient(circle at 10% 50%, #60d8e0 0%, transparent 70%)",
                        filter: "blur(12px)",
                      }}
                    />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
