import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, active, onClick }) => {
  return (
    <a
      href={href}
      className={`relative font-medium py-2 px-3 transition-colors duration-300
        ${active 
          ? 'text-[var(--accent-primary)]' 
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }
        after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--accent-primary)]
        after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300
      `}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

const Navbar: React.FC = () => {
  const { t } = useTranslation('common');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['contact', 'about', 'demo', 'home'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 0) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: t('nav.home') || 'Accueil', href: '#home', section: 'home' },
    { name: t('nav.demo') || 'Démo', href: '#demo', section: 'demo' },
    { name: t('nav.about') || 'À propos', href: '#about', section: 'about' },
    { name: t('nav.contact') || 'Contact', href: '#contact', section: 'contact' },
  ];

  return (
    <header className={`navbar py-4 ${scrolled ? 'shadow-sm py-3 navbar-scrolled' : ''}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#home" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <div className="bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold">
                Technic<span className="text-[var(--accent-primary)]">IA</span>
              </span>
            </motion.div>
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <nav className="flex space-x-1">
              {navigation.map((item) => (
                <NavLink 
                  key={item.name}
                  href={item.href}
                  active={currentSection === item.section}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
            
            <div className="ml-6 flex items-center gap-3">
              <LanguageSelector />
              <a 
                href="#demo"
                className="btn-primary rounded-lg px-5 py-2 ml-2 flex items-center gap-2"
              >
                {t('nav.demoButton') || 'Essayer Démo'}
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSelector />
            <button
              className="text-[var(--text-primary)] p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden px-4 py-3 border-t border-[var(--border-color)] bg-white"
        >
          <nav className="flex flex-col space-y-3">
            {navigation.map((item) => (
              <NavLink 
                key={item.name}
                href={item.href}
                active={currentSection === item.section}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            <a 
              href="#demo"
              className="btn-primary rounded-lg px-5 py-2 mt-2 flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.demoButton') || 'Essayer Démo'}
              <ChevronDown className="h-4 w-4" />
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;