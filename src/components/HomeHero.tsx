import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BrainCog, Shield, Zap, Users, ArrowRight } from 'lucide-react';

export default function HomeHero() {
  const { t } = useTranslation('home');

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div className="animated-bg"></div>
      
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
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
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
              {t('hero.title')}
            </h2>
            
            <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl lg:pr-12">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 lg:justify-start justify-center">
              <button className="btn-primary flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium">
                {t('hero.cta.primary')}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary px-8 py-3.5 rounded-lg font-medium">
                {t('hero.cta.secondary')}
              </button>
            </div>

            <div className="mt-14 flex flex-wrap gap-4 lg:justify-start justify-center">
              <div className="security-badge flex items-center gap-2 py-1.5 px-3 rounded-full bg-[var(--accent-primary)]/10 text-sm">
                <Shield className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="security-badge flex items-center gap-2 py-1.5 px-3 rounded-full bg-[var(--accent-primary)]/10 text-sm">
                <Zap className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Real-time Analysis</span>
              </div>
              <div className="security-badge flex items-center gap-2 py-1.5 px-3 rounded-full bg-[var(--accent-primary)]/10 text-sm">
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
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 rounded-2xl animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                alt="Industrial Maintenance"
                className="rounded-2xl object-cover w-full h-full shadow-xl"
              />
              <div className="absolute -top-5 -right-5 glass-card p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <BrainCog className="w-6 h-6 text-[var(--accent-primary)]" />
                  <span className="font-semibold">AI-Powered Analysis</span>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 glass-card p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
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