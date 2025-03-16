import React, { useState, useEffect, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Solution from './pages/Solution';
import Demonstrator from './pages/Demonstrator';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import IntroAnimation from './components/IntroAnimation';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import './styles/intro.css';

function App() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState('home');
  const [showIntro, setShowIntro] = useState(true);
  const [introStage, setIntroStage] = useState<'animation' | 'screen' | 'complete'>('animation');
  const [isLoading, setIsLoading] = useState(true);

  // Check if we should skip intro based on URL hash or localStorage
  useEffect(() => {
    const skipIntro = window.location.hash === '#skip-intro' || 
                     (localStorage.getItem('hasSeenIntro') === 'true' && 
                      window.location.hash !== '#force-intro');
    
    if (skipIntro) {
      setShowIntro(false);
      setIntroStage('complete');
    }
  }, []);

  // Initial loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    // Observe elements with fade-in class
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  // Handle intro animation complete
  const handleAnimationComplete = () => {
    // Progress to intro screen
    setIntroStage('screen');
  };

  // Handle intro screen complete
  const handleIntroScreenComplete = () => {
    // Mark as visited and complete intro
    localStorage.setItem('hasSeenIntro', 'true');
    setIntroStage('complete');
    setShowIntro(false);
  };

  // Render loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* Intro Animation Sequence */}
      {showIntro && introStage === 'animation' && (
        <IntroAnimation onComplete={handleAnimationComplete} />
      )}
      
      {/* Intro Screen (shown after animation) */}
      {showIntro && introStage === 'screen' && (
        <IntroScreen onComplete={handleIntroScreenComplete} />
      )}
      
      {/* Main Application */}
      <div className="min-h-screen bg-[var(--background-primary)]">
        <ScrollProgress />
        
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <Suspense fallback={<LoadingScreen />}>
          <AnimatePresence mode="wait">
            {currentPage === 'home' ? (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HeroSection />
                <FeaturesSection />
                <StatsSection />
                <TestimonialsSection />
              </motion.div>
            ) : currentPage === 'solution' ? (
              <motion.div
                key="solution"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Solution />
              </motion.div>
            ) : currentPage === 'about' ? (
              <motion.div
                key="about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <About />
              </motion.div>
            ) : currentPage === 'contact' ? (
              <motion.div
                key="contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Contact />
              </motion.div>
            ) : (
              <motion.div
                key="demonstrator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Demonstrator />
              </motion.div>
            )}
          </AnimatePresence>
        </Suspense>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;