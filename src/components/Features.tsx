import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MessageSquare, Brain, Eye, Languages, FileText, Factory } from 'lucide-react';

const features = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: <Brain className="h-6 w-6" />,
    color: 'from-purple-400 to-purple-600'
  },
  {
    icon: <Eye className="h-6 w-6" />,
    color: 'from-green-400 to-green-600'
  },
  {
    icon: <Languages className="h-6 w-6" />,
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    icon: <FileText className="h-6 w-6" />,
    color: 'from-red-400 to-red-600'
  },
  {
    icon: <Factory className="h-6 w-6" />,
    color: 'from-teal-400 to-teal-600'
  }
];

export default function Features() {
  const { t } = useTranslation('home');

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 fade-in">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight">{t('features.title')}</h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 rounded-xl shadow-lg border border-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/20 transition-all duration-300 fade-in"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -5,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`h-16 w-16 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg p-3.5`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">
                {t(`features.items.${index}.title`)}
              </h3>
              <p className="text-[var(--text-secondary)] text-lg">
                {t(`features.items.${index}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* Added action button */}
        <div className="mt-16 text-center">
          <button className="bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-white font-medium py-3.5 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
}