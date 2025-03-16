import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MessageSquare, Brain, Eye, Languages, FileText, Factory } from 'lucide-react';

const icons = [
  <MessageSquare className="h-6 w-6" />,
  <Brain className="h-6 w-6" />,
  <Eye className="h-6 w-6" />,
  <Languages className="h-6 w-6" />,
  <FileText className="h-6 w-6" />,
  <Factory className="h-6 w-6" />
];

export default function Features() {
  const { t } = useTranslation('home');

  return (
    <section id="features" className="py-20 relative">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('features.title')}</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 fade-in"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="h-12 w-12 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center mb-4">
                {icons[index]}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t(`features.items.${index}.title`)}
              </h3>
              <p className="text-[var(--text-secondary)]">
                {t(`features.items.${index}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}