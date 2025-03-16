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
import './styles/intro.css';

function App() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showIntro, setShowIntro] = useState(true);
  const [introStage, setIntroStage] = useState<'animation' | 'screen' | 'complete'>('animation');
  const [isLoading, setIsLoading] = useState(true);
  const featuresRef = useRef<HTMLDivElement>(null);

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
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
              {/* Logo */}
              <motion.div 
                className="flex items-center cursor-pointer" 
                onClick={() => setCurrentPage('home')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BrainCog className="h-8 w-8 text-[var(--accent-primary)]" />
                <span className="ml-2 text-xl font-bold">TechnicIA</span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-4">
                  {['home', 'solution', 'demonstrator', 'about', 'contact'].map((page) => (
                    <button 
                      key={page}
                      className={`nav-link relative ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {t(`nav.${page}`)}
                      {currentPage === page && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)]"
                          layoutId="navIndicator"
                        />
                      )}
                    </button>
                  ))}
                </div>
                <LanguageSelector />
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors duration-300"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="md:hidden bg-[var(--background-secondary)]/95 backdrop-blur-md"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {['home', 'solution', 'demonstrator', 'about', 'contact'].map((page) => (
                    <button 
                      key={page}
                      className={`nav-link block w-full text-left ${currentPage === page ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentPage(page);
                        setIsMenuOpen(false);
                      }}
                    >
                      {t(`nav.${page}`)}
                    </button>
                  ))}
                  <div className="px-4 py-2">
                    <LanguageSelector />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

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
                <HomeHero />
                <Features />
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
                      <button 
                        className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                        onClick={() => setCurrentPage(page)}
                      >
                        {t(`nav.${page}`)}
                      </button>
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
                  <button className="px-4 py-2 bg-[var(--accent-primary)] rounded-r-lg hover:bg-[var(--accent-secondary)] transition-colors duration-300">
                    {t('footer.subscribe')}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-[var(--text-secondary)]/20 text-center text-[var(--text-secondary)]">
              <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;