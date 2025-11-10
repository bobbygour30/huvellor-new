import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Industries from './pages/Industries';
import ContactUs from './pages/ContactUs';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import GetQuote from './pages/GetQuote';
import AdminLogin from './admin/AdminLogin'; // Added AdminLogin import
import AdminDashboard from './admin/AdminDashboard'; // Added AdminDashboard import
import ScrollToTop from './components/ScrollToTop';
import JobListings from './pages/JobListing';
import ApplyForm from './pages/ApplyForm';
import JobAdmin from './admin/JobAdmin';
import BlogAdmin from './admin/BlogAdmin';

const App = () => {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/quote" element={<GetQuote />} />
        <Route path="/admin/login" element={<AdminLogin />} /> {/* Added AdminLogin route */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* Added AdminDashboard route */}
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/apply" element={<ApplyForm />} />
        <Route path="/admin/jobs" element={<JobAdmin />} />
        <Route path="/admin/blogs" element={<BlogAdmin />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;