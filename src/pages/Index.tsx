
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Technology from '@/components/home/Technology';
import Benefits from '@/components/home/Benefits';
import Contact from '@/components/home/Contact';
import Footer from '@/components/layout/Footer';
import { useAnimateOnScroll, useSmoothScroll } from '@/lib/animations';

const Index = () => {
  useAnimateOnScroll();
  useSmoothScroll();

  useEffect(() => {
    // Initial fade-in animation for the page
    document.body.classList.add('opacity-0');
    setTimeout(() => {
      document.body.classList.remove('opacity-0');
      document.body.classList.add('opacity-100', 'transition-opacity', 'duration-500');
    }, 100);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white dark:bg-ecosync-dark"
    >
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Technology />
        <Benefits />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
