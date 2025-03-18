
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Cpu, Database } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const elements = containerRef.current.querySelectorAll('.parallax-element');
      elements.forEach(el => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '1');
        (el as HTMLElement).style.transform = `translate(${x * 30 * speed}px, ${y * 30 * speed}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden"
      style={{ background: 'radial-gradient(circle at 50% 50%, rgba(42, 157, 104, 0.05), transparent 60%)' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-ecosync-green-dark/5 rounded-full blur-3xl parallax-element" data-speed="0.5"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-ecosync-blue-dark/5 rounded-full blur-3xl parallax-element" data-speed="0.7"></div>
        <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-ecosync-green-medium/5 rounded-full blur-3xl parallax-element" data-speed="0.3"></div>
      </div>
      
      {/* Floating tech icons */}
      <motion.div 
        className="absolute top-1/4 left-1/4 parallax-element" 
        data-speed="1.5"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <Leaf className="text-ecosync-green-dark/20 w-16 h-16" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 parallax-element" 
        data-speed="2"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
      >
        <Cpu className="text-ecosync-blue-dark/20 w-14 h-14" />
      </motion.div>
      
      <motion.div 
        className="absolute top-2/3 right-1/3 parallax-element" 
        data-speed="1.8"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
      >
        <Database className="text-ecosync-green-medium/20 w-12 h-12" />
      </motion.div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-ecosync-green-light text-ecosync-green-dark mb-6 tracking-wide">
              AI + IoT + Blockchain
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-balance"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-ecosync-green-dark via-ecosync-blue-dark to-ecosync-green-dark">
              The Future of Sustainability
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-foreground/80 mb-8 mx-auto max-w-3xl text-balance"
          >
            EcoSync integrates cutting-edge technology to create a self-sustaining, 
            fraud-proof ecosystem for environmental governance and sustainability.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-ecosync-green-dark to-ecosync-blue-dark text-white font-medium shadow-lg shadow-primary/20 transition-all duration-200 flex items-center justify-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-ecosync-green-dark/20 text-foreground font-medium transition-all duration-200"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-ecosync-green-dark/10 to-ecosync-blue-dark/10 backdrop-blur-sm"></div>
            <div className="w-full aspect-[16/9] bg-ecosync-dark rounded-3xl overflow-hidden p-1">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-ecosync-green-dark/80 to-ecosync-blue-dark/80 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl font-bold mb-2">EcoSync Dashboard</div>
                  <p className="text-white/70">Interactive demo coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
