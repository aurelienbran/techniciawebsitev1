import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { BrainCog, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Solution from './pages/Solution';
import Demonstrator from './pages/Demonstrator';
import About from './pages/About';
import Contact from './pages/Contact';
import LanguageSelector from './components/LanguageSelector';
import ScrollProgress from './components/ScrollProgress';
import ScrollArrow from './components/ScrollArrow';
import HomeHero from './components/HomeHero';
import LoadingScreen from './components/LoadingScreen';
import IntroAnimation from './components/IntroAnimation';
import IntroScreen from './components/IntroScreen';
import Features from './components/Features';
import CustomCursor from './components/CustomCursor'; 
import './styles/intro.css';

function App() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showIntro, setShowIntro] = useState(true);
  const [introStage, setIntroStage] = useState<'animation' | 'screen' | 'complete'>('animation');
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Check if user has visited before
  useEffect(() => {
    const visited = localStorage.getItem('hasVisitedBefore') === 'true';
    setHasVisitedBefore(visited);
    
    // Skip intro if hash parameter exists
    if (window.location.hash === '#skip-intro') {
      setShowIntro(false);
      setIntroStage('complete');
    }
  }, []);

  // Initial loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Skip directly to the main app if visited before and no force-intro parameter
      if (hasVisitedBefore && window.location.hash !== '#force-intro') {
        setShowIntro(false);
        setIntroStage('complete');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [hasVisitedBefore]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle intro animation complete
  const handleAnimationComplete = () => {
    // Progress to intro screen
    setIntroStage('screen');
  };

  // Handle intro screen complete
  const handleIntroScreenComplete = () => {
    // Mark as visited and complete intro
    localStorage.setItem('hasVisitedBefore', 'true');
    setIntroStage('complete');
    setShowIntro(false);
  };

  // Render loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* Enhanced cursor for better interaction feel */}
      <CustomCursor />
      
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
        
        {/* Enhanced Navigation with Animation */}
        <motion.nav 
          className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled ? 'bg-[var(--background-primary)]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
          }`}
          initial={introStage === 'complete' ? { y: -100 } : { y: 0 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: introStage === 'complete' ? 0.2 : 0 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo with hover animation */}
              <motion.div 
                className="flex items-center cursor-pointer" 
                onClick={() => setCurrentPage('home')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BrainCog className="h-8 w-8 text-[var(--accent-primary)]" />
                <span className="ml-2 text-xl font-bold">TechnicIA</span>
              </motion.div>

              {/* Desktop Navigation with improved hover effects */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-4">
                  {['home', 'solution', 'demonstrator', 'about', 'contact'].map((page) => (
                    <motion.button 
                      key={page}
                      className={`nav-link relative ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      {t(`nav.${page}`)}
                      {currentPage === page && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)]"
                          layoutId="navIndicator"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
                <LanguageSelector />
              </div>

              {/* Mobile menu button with animation */}
              <div className="md:hidden">
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="md:hidden bg-[var(--background-secondary)]/95 backdrop-blur-md"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div className="px-2 pt-2 pb-3 space-y-1">
                  {['home', 'solution', 'demonstrator', 'about', 'contact'].map((page, index) => (
                    <motion.button 
                      key={page}
                      className={`nav-link block w-full text-left ${currentPage === page ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentPage(page);
                        setIsMenuOpen(false);
                      }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      {t(`nav.${page}`)}
                    </motion.button>
                  ))}
                  <motion.div 
                    className="px-4 py-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                  >
                    <LanguageSelector />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Main Content with Page Transitions */}
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
                <HomeHero />
                <Features />
              </motion.div>
            ) : currentPage === 'solution' ? (
              <motion.div
                key="solution"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Solution />
              </motion.div>
            ) : currentPage === 'about' ? (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <About />
              </motion.div>
            ) : currentPage === 'contact' ? (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Contact />
              </motion.div>
            ) : (
              <motion.div
                key="demonstrator"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Demonstrator />
              </motion.div>
            )}
          </AnimatePresence>
        </Suspense>

        {/* Enhanced Footer */}
        <footer className="bg-[var(--background-secondary)] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="fade-in">
                <div className="flex items-center mb-4">
                  <BrainCog className="h-8 w-8 text-[var(--accent-primary)]" />
                  <span className="ml-2 text-xl font-bold">TechnicIA</span>
                </div>
                <p className="text-[var(--text-secondary)]">
                  {t('footer.description')}
                </p>
              </div>
              
              <div className="fade-in">
                <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
                <ul className="space-y-2">
                  {['home', 'solution', 'demonstrator', 'about', 'contact'].map((page) => (
                    <li key={page}>
                      <motion.button 
                        className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                        onClick={() => setCurrentPage(page)}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {t(`nav.${page}`)}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="fade-in">
                <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  <li>contact@technicia.com</li>
                  <li>+1 (555) 123-4567</li>
                  <li>123 Tech Street, AI Valley</li>
                </ul>
              </div>
              
              <div className="fade-in">
                <h4 className="text-lg font-semibold mb-4">{t('footer.newsletter')}</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder={t('footer.newsletterPlaceholder')}
                    className="flex-1 px-4 py-2 rounded-l-lg bg-[var(--background-primary)] border border-[var(--text-secondary)]/20 focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                  <motion.button 
                    className="px-4 py-2 bg-[var(--accent-primary)] rounded-r-lg hover:bg-[var(--accent-secondary)] transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('footer.subscribe')}
                  </motion.button>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="mt-8 pt-8 border-t border-[var(--text-secondary)]/20 text-center text-[var(--text-secondary)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;