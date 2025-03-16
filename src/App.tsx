import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { BrainCog, Menu, X } from 'lucide-react';
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
import Features from './components/Features';
import './styles/intro.css';

function App() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <div className="min-h-screen bg-[var(--background-primary)]">
        <ScrollProgress />
        
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[var(--background-primary)]/95 shadow-lg' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
                <BrainCog className="h-8 w-8 text-[var(--accent-primary)]" />
                <span className="ml-2 text-xl font-bold">TechnicIA</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-4">
                  <button 
                    className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                    onClick={() => setCurrentPage('home')}
                  >
                    {t('nav.home')}
                  </button>
                  <button 
                    className={`nav-link ${currentPage === 'solution' ? 'active' : ''}`}
                    onClick={() => setCurrentPage('solution')}
                  >
                    {t('nav.solution')}
                  </button>
                  <button 
                    className={`nav-link ${currentPage === 'demonstrator' ? 'active' : ''}`}
                    onClick={() => setCurrentPage('demonstrator')}
                  >
                    {t('nav.demo')}
                  </button>
                  <button 
                    className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
                    onClick={() => setCurrentPage('about')}
                  >
                    {t('nav.about')}
                  </button>
                  <button 
                    className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
                    onClick={() => setCurrentPage('contact')}
                  >
                    {t('nav.contact')}
                  </button>
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
          {isMenuOpen && (
            <div className="md:hidden bg-[var(--background-secondary)]/95 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button 
                  className={`nav-link block w-full text-left ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentPage('home');
                    setIsMenuOpen(false);
                  }}
                >
                  {t('nav.home')}
                </button>
                <button 
                  className={`nav-link block w-full text-left ${currentPage === 'solution' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentPage('solution');
                    setIsMenuOpen(false);
                  }}
                >
                  {t('nav.solution')}
                </button>
                <button 
                  className={`nav-link block w-full text-left ${currentPage === 'demonstrator' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentPage('demonstrator');
                    setIsMenuOpen(false);
                  }}
                >
                  {t('nav.demo')}
                </button>
                <button 
                  className={`nav-link block w-full text-left ${currentPage === 'about' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentPage('about');
                    setIsMenuOpen(false);
                  }}
                >
                  {t('nav.about')}
                </button>
                <button 
                  className={`nav-link block w-full text-left ${currentPage === 'contact' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentPage('contact');
                    setIsMenuOpen(false);
                  }}
                >
                  {t('nav.contact')}
                </button>
                <div className="px-4 py-2">
                  <LanguageSelector />
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <Suspense fallback={<LoadingScreen />}>
          {currentPage === 'home' ? (
            <>
              <HomeHero />
              <Features />
            </>
          ) : currentPage === 'solution' ? <Solution /> : 
             currentPage === 'about' ? <About /> :
             currentPage === 'contact' ? <Contact /> :
             <Demonstrator />}
        </Suspense>

        {/* Footer */}
        <footer className="bg-[var(--background-secondary)] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <BrainCog className="h-8 w-8 text-[var(--accent-primary)]" />
                  <span className="ml-2 text-xl font-bold">TechnicIA</span>
                </div>
                <p className="text-[var(--text-secondary)]">
                  {t('footer.description')}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
                <ul className="space-y-2">
                  <li>
                    <button 
                      className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                      onClick={() => setCurrentPage('home')}
                    >
                      {t('nav.home')}
                    </button>
                  </li>
                  <li>
                    <button 
                      className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                      onClick={() => setCurrentPage('solution')}
                    >
                      {t('nav.solution')}
                    </button>
                  </li>
                  <li>
                    <button 
                      className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                      onClick={() => setCurrentPage('demonstrator')}
                    >
                      {t('nav.demo')}
                    </button>
                  </li>
                  <li>
                    <button 
                      className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                      onClick={() => setCurrentPage('about')}
                    >
                      {t('nav.about')}
                    </button>
                  </li>
                  <li>
                    <button 
                      className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                      onClick={() => setCurrentPage('contact')}
                    >
                      {t('nav.contact')}
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  <li>contact@technicia.com</li>
                  <li>+1 (555) 123-4567</li>
                  <li>123 Tech Street, AI Valley</li>
                </ul>
              </div>
              <div>
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