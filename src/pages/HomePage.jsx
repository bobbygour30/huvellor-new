import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import assets from '../assets/assets';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
// import HeroCarousel from '../components/HeroCarousel';
import TestimonialsSection from '../components/TestiminialsSection';
import ContactForm from '../components/ContactForm';
import AboutSection from '../components/AboutSection';
import NewsComponent from '../components/News';
// import HeroCarousel2 from '../components/HeroCarousel2';
import HeroHiring2 from '../components/HeroHiring2';
import HireBanner from '../components/HireBanner';
// import QnASection from '../components/QnASection';



const heroTitleVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: 'easeOut' } },
};

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } },
});

function TestimonialCarousel({ items = [] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-white/5 p-6 shadow-lg border border-white/6">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            initial={{ x: 12, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -12, opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            <p className="text-gray-100/85 text-lg md:text-base">"{items[index].quote}"</p>
            <div className="mt-4 text-sm font-semibold text-gray-200">— {items[index].name}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-2 justify-center mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full ${i === index ? 'bg-[#F0C5B5]' : 'bg-white/30'}`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const whyRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.2 });
  const isWhyInView = useInView(whyRef, { once: true, amount: 0.2 });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 });
  const isContactInView = useInView(contactRef, { once: true, amount: 0.2 });

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // image pool to cycle through for service cards (fallback to empty string if asset missing)
  const imgPool = [
    assets.service1 || assets.serviceImage1 || '',
    assets.service2 || assets.serviceImage2 || '',
    assets.service3 || assets.serviceImage3 || '',
  ];

  return (
    <>
    
    <main className="min-h-screen text-[#003034]">
      
    {/* <HeroCarousel ref={heroRef} isHeroInView={isHeroInView} />
    <HeroCarousel2 ref={heroRef} isHeroInView={isHeroInView} /> */}
       <HeroHiring2 ref={heroRef} isHeroInView={isHeroInView} />
      <AboutSection />
      <ServicesSection ref={servicesRef} assets={assets} isServicesInView={isServicesInView} />

      {/* WHY CHOOSE US */}
      <WhyChooseUs whyRef={whyRef} />
      <TestimonialsSection testimonialsRef={testimonialsRef} />
      
      <NewsComponent />
      <HireBanner />
      <ContactForm />
       

      
    </main>
    </>
  );
}