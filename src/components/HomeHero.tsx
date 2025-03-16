import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BrainCog, Shield, Zap, Users, ArrowRight } from 'lucide-react';

export default function HomeHero() {
  const { t } = useTranslation('home');

  return (
    <section className="relative min-h-screen flex items-center">
      <div className="animated-bg"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center gap-2 mb-6 lg:justify-start justify-center">
              <BrainCog className="w-8 h-8 text-[var(--accent-primary)]" />
              <h1 className="text-2xl font-bold gradient-text">TechnicIA</h1>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              {t('hero.title')}
            </h2>
            
            <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
              <button className="btn-primary flex items-center gap-2">
                {t('hero.cta.primary')}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary">
                {t('hero.cta.secondary')}
              </button>
            </div>

            <div className="mt-12 flex flex-wrap gap-4 lg:justify-start justify-center">
              <div className="security-badge">
                <Shield className="w-4 h-4" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="security-badge">
                <Zap className="w-4 h-4" />
                <span>Real-time Analysis</span>
              </div>
              <div className="security-badge">
                <Users className="w-4 h-4" />
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
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 rounded-full animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                alt="Industrial Maintenance"
                className="rounded-full object-cover w-full h-full"
              />
              <div className="absolute -top-4 -right-4 glass-card p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <BrainCog className="w-6 h-6 text-[var(--accent-primary)]" />
                  <span className="font-semibold">AI-Powered Analysis</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-[var(--accent-primary)]" />
                  <span className="font-semibold">Real-time Diagnostics</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}