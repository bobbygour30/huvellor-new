import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaChevronDown,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import assets from "../assets/assets";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Industries we serve", path: "/industries" },
  {
    name: "Career",
    subItems: [
      { name: "Explore Job Opportunities", path: "/jobs" },
      { name: "Submit Resume", path: "/apply" },
    ],
  },
  { name: "Contact", path: "/contact" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Blog", path: "/blog" },
];

const Navbar = () => {
  const [showTopBar, setShowTopBar] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileItem, setActiveMobileItem] = useState(null);
  const hoverTimer = useRef(null);
  const location = useLocation();

  // Optimized scroll: ignore tiny scrolls, use rAF, detect direction
  useEffect(() => {
    const lastY = { value: typeof window !== "undefined" ? window.scrollY : 0 };
    let ticking = false;
    const MIN_DELTA = 8; // ignore movements smaller than this (px)
    const TOP_THRESHOLD = 60; // if near top, always show

    const onScroll = () => {
      const currentY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const delta = currentY - lastY.value;

          // if user moved less than MIN_DELTA, ignore (prevents jitter)
          if (Math.abs(delta) >= MIN_DELTA) {
            // scrolling down and past threshold => hide top bar
            if (delta > 0 && currentY > TOP_THRESHOLD) {
              setShowTopBar(false);
            }
            // scrolling up => show top bar
            else if (delta < 0) {
              setShowTopBar(true);
            }
          } else {
            // small move but still ensure when at very top we show
            if (currentY <= TOP_THRESHOLD) setShowTopBar(true);
          }

          lastY.value = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dropdown logic
  const handleMouseEnter = (name) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    hoverTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const toggleMobileItem = (name) => {
    setActiveMobileItem((prev) => (prev === name ? null : name));
  };

  // Helper: is current path active (exact or starts with)
  const isActive = (path) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  // Helper: is any subitem active
  const hasActiveSubItem = (subItems) => {
    return subItems?.some((sub) => isActive(sub.path));
  };

  return (
    <header className="sticky top-0 z-50 bg-[#003034] shadow-md py-3">
      {/* === TOP BAR (fully hides on scroll) === */}
      <div
        className={`bg-[#003034] text-white text-sm transition-all duration-500 ease-in-out overflow-hidden ${
          showTopBar ? "max-h-20 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-full"
        }`}
      >
        <div className="flex justify-center lg:justify-end gap-3 pt-1 lg:pr-10 pr-0 ">
          <div className="flex items-center gap-3">
            <FaFacebookF className="cursor-pointer transition-colors hover:text-gray-200" />
            <FaInstagram className="cursor-pointer transition-colors hover:text-gray-200" />
            <FaLinkedinIn className="cursor-pointer transition-colors hover:text-gray-200" />
          </div>
        </div>
      </div>

      {/* === MAIN NAVBAR === */}
      <div className="bg-[#003034] text-white">
        <div className="flex items-center justify-between px-4 py-1 md:px-8 lg:justify-around">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={assets.logo}
              alt="Huvellor Logo"
              className="w-36 object-contain sm:w-48"
            />
          </Link>

          {/* === DESKTOP MENU === */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path) || (item.subItems && hasActiveSubItem(item.subItems));
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center gap-1 font-medium cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 text-lg">
                    <Link
                      to={item.path || "#"}
                      className={active ? "text-[#F0C5B5]" : ""}
                    >
                      {item.name}
                    </Link>
                    {item.subItems && (
                      <FaChevronDown
                        className={`ml-1 text-sm transition-transform duration-200 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>

                  {/* Underline effect – show when active or hovered */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#F0C5B5] transition-all duration-200 ${
                      active || activeDropdown === item.name ? "w-full" : "w-0"
                    }`}
                  ></span>

                  {/* Dropdown */}
                  {item.subItems && (
                    <div
                      className={`absolute left-1/2 top-full mt-2 w-48 -translate-x-1/2 rounded-lg bg-white text-[#104B51] shadow-lg ring-1 ring-gray-200 transition-all duration-200 ${
                        activeDropdown === item.name ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
                      }`}
                    >
                      {item.subItems.map((sub) => {
                        const subActive = isActive(sub.path);
                        return (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                              subActive ? "bg-gray-50 font-medium" : ""
                            }`}
                            onClick={() => setActiveDropdown(null)}
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* CTA */}
            <Link
              to="/quote"
              className={`inline-flex items-center justify-center rounded-md px-5 py-2 font-semibold shadow-md transition-transform duration-150 hover:scale-105 active:scale-95 ${
                isActive("/quote")
                  ? "bg-white text-[#003034]"
                  : "bg-[#F0C5B5] text-[#003034]"
              }`}
            >
              Get Quote
            </Link>
          </nav>

          {/* === MOBILE TOGGLE === */}
          <button
            className="text-2xl text-white lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* === MOBILE MENU === */}
      <div
        className={`bg-white overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          mobileOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2 px-6 py-4 text-[#003034]">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path) || (item.subItems && hasActiveSubItem(item.subItems));
            return (
              <div key={item.name}>
                <div
                  className={`flex items-center justify-between rounded px-2 py-2 transition-colors hover:bg-gray-100 ${
                    active ? "bg-gray-100 font-bold" : ""
                  }`}
                  onClick={() => item.subItems && toggleMobileItem(item.name)}
                >
                  <Link
                    to={item.path || "#"}
                    className="font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <FaChevronDown
                      className={`text-sm transition-transform duration-150 ${
                        activeMobileItem === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Submenu */}
                {item.subItems && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeMobileItem === item.name ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.subItems.map((sub) => {
                      const subActive = isActive(sub.path);
                      return (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className={`block rounded px-4 py-1 text-sm hover:bg-gray-100 ${
                            subActive ? "font-medium text-[#003034]" : ""
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <Link
            to="/quote"
            className={`mt-3 w-full rounded-md px-4 py-2 text-center font-semibold shadow-md transition-transform duration-150 hover:scale-105 active:scale-95 ${
              isActive("/quote")
                ? "bg-[#003034] text-white"
                : "bg-[#004048] text-white"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            Get Quote
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;