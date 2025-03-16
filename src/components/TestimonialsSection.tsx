import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  position: string;
}

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation('home');
  const [current, setCurrent] = useState(0);
  
  // Define testimonials with translation support
  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: t('testimonials.1.content') || "Grâce à TechnicIA, notre temps d'intervention a été réduit de 40%. L'interface intuitive permet même aux nouveaux techniciens de diagnostiquer rapidement les problèmes complexes.",
      author: t('testimonials.1.author') || "Mathieu D.",
      position: t('testimonials.1.position') || "Responsable Maintenance, GreenTech Industries"
    },
    {
      id: 2,
      content: t('testimonials.2.content') || "L'accès instantané à toute notre documentation technique a transformé notre façon de travailler. Nous sommes beaucoup plus efficaces et précis dans nos interventions.",
      author: t('testimonials.2.author') || "Sophie L.",
      position: t('testimonials.2.position') || "Technicienne Senior, AeroSystems"
    },
    {
      id: 3,
      content: t('testimonials.3.content') || "TechnicIA est devenu indispensable pour notre équipe. La traduction des schémas techniques en langage clair nous fait gagner un temps précieux et réduit considérablement les erreurs.",
      author: t('testimonials.3.author') || "Thomas R.",
      position: t('testimonials.3.position') || "Directeur Technique, MecaFuture"
    }
  ];
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-[var(--background-primary)]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            {t('testimonials.title') || "Ce qu'en disent nos clients"}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-[var(--accent-primary)] mx-auto mb-6"
          ></motion.div>
        </div>
        
        <div className="max-w-4xl mx-auto relative min-h-[300px] md:min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center p-8 bg-white rounded-xl shadow-sm border border-[var(--border-color)] absolute w-full"
            >
              <div className="text-5xl text-[var(--accent-primary)] mb-6">❝</div>
              <p className="text-lg mb-8 text-[var(--text-secondary)]">{testimonials[current].content}</p>
              <div>
                <div className="font-semibold text-[var(--accent-secondary)]">{testimonials[current].author}</div>
                <div className="text-sm text-[var(--text-light)]">{testimonials[current].position}</div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current ? 'bg-[var(--accent-primary)] w-6' : 'bg-gray-300'
                }`}
                aria-label={`Voir le témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;