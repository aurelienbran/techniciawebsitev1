import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ArrowRight, BrainCog, Shield, Zap, Users } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { t } = useTranslation('home');
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        backgroundPosition: '100% 100%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, []);
  
  return (
    <div className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%232664eb\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 0%',
          opacity: 0.5
        }}
      />
      
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white to-blue-50 opacity-85" />
      
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center gap-3 mb-8 lg:justify-start justify-center">
              <BrainCog className="w-10 h-10 text-[var(--accent-primary)]" />
              <h1 className="text-2xl font-bold gradient-text">TechnicIA</h1>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight text-[var(--text-primary)]">
              {t('hero.title') || "L'IA au service de la maintenance industrielle"}
            </h2>
            
            <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl lg:pr-12">
              {t('hero.subtitle') || "TechnicIA traduit les schémas techniques, guide les diagnostics, et fournit un accès instantané à la documentation technique pour vos équipes."}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 lg:justify-start justify-center">
              <button className="btn-primary flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium">
                {t('hero.cta.primary') || "Demander une démo"}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary px-8 py-3.5 rounded-lg font-medium">
                {t('hero.cta.secondary') || "En savoir plus"}
              </button>
            </div>

            <div className="mt-14 flex flex-wrap gap-4 lg:justify-start justify-center">
              <div className="security-badge">
                <Shield className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="security-badge">
                <Zap className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Real-time Analysis</span>
              </div>
              <div className="security-badge">
                <Users className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>500+ Companies Trust Us</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10 rounded-2xl" style={{ animation: 'pulse 4s infinite ease-in-out' }}></div>
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                alt="Industrial Maintenance"
                className="rounded-2xl object-cover w-full h-full shadow-xl"
              />
              
              <motion.div 
                className="absolute -top-5 -right-5 glass-card p-4 rounded-lg shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <BrainCog className="w-6 h-6 text-[var(--accent-primary)]" />
                  <span className="font-semibold text-[var(--text-primary)]">AI-Powered Analysis</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-5 -left-5 glass-card p-4 rounded-lg shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-[var(--accent-primary)]" />
                  <span className="font-semibold text-[var(--text-primary)]">Real-time Diagnostics</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Animated decorative elements */}
      <div className="absolute bottom-10 left-1/4 w-20 h-20 rounded-full bg-blue-100 filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 right-10 w-32 h-32 rounded-full bg-blue-50 filter blur-3xl opacity-40"></div>
    </div>
  );
};

export default HeroSection;