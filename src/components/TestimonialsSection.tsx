import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface TestimonialProps {
  content: string;
  author: string;
  position: string;
  company: string;
  rating: number;
  image?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ content, author, position, company, rating, image }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-quote">
        <Quote className="w-10 h-10 text-[var(--accent-primary-10)]" />
      </div>
      <div className="flex gap-2 items-center mt-2 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      <p className="text-[var(--text-secondary)] mb-6 relative pl-2">
        {content}
      </p>
      <div className="flex items-center gap-3">
        {image ? (
          <img 
            src={image} 
            alt={author} 
            className="w-12 h-12 rounded-full object-cover border-2 border-[var(--border-color)]" 
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[var(--accent-primary-10)] flex items-center justify-center text-[var(--accent-primary)] font-semibold">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-semibold text-[var(--text-primary)]">{author}</div>
          <div className="text-sm text-[var(--text-secondary)]">{position}, {company}</div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation('home');
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  const testimonials: TestimonialProps[] = [
    {
      content: t('testimonials.1.content') || "Grâce à TechnicIA, notre temps d'intervention a été réduit de 40%. L'interface intuitive permet même aux nouveaux techniciens de diagnostiquer rapidement les problèmes complexes. Un vrai gain de productivité pour toute l'équipe.",
      author: t('testimonials.1.author') || "Mathieu D.",
      position: t('testimonials.1.position') || "Responsable Maintenance",
      company: t('testimonials.1.company') || "GreenTech Industries",
      rating: 5
    },
    {
      content: t('testimonials.2.content') || "L'accès instantané à toute notre documentation technique a transformé notre façon de travailler. Nous sommes beaucoup plus efficaces et précis dans nos interventions. La traduction des schémas en langage clair est bluffante.",
      author: t('testimonials.2.author') || "Sophie L.",
      position: t('testimonials.2.position') || "Technicienne Senior",
      company: t('testimonials.2.company') || "AeroSystems",
      rating: 4
    },
    {
      content: t('testimonials.3.content') || "TechnicIA est devenu indispensable pour notre équipe. La traduction des schémas techniques en langage clair nous fait gagner un temps précieux et réduit considérablement les erreurs d'interprétation. Le support client est également exemplaire.",
      author: t('testimonials.3.author') || "Thomas R.",
      position: t('testimonials.3.position') || "Directeur Technique",
      company: t('testimonials.3.company') || "MecaFuture",
      rating: 5
    }
  ];
  
  // Set up autoplay
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);
  
  // Pause autoplay on hover
  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => setAutoplay(true);
  
  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-[var(--background-secondary)]">
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
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto text-[var(--text-secondary)]"
          >
            {t('testimonials.subtitle') || "Découvrez l'expérience de nos utilisateurs et comment TechnicIA a transformé leur approche de la maintenance industrielle."}
          </motion.p>
        </div>
        
        <div 
          className="relative max-w-4xl mx-auto" 
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          {/* Desktop layout - Multiple testimonials */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Testimonial {...testimonial} />
              </motion.div>
            ))}
          </div>
          
          {/* Mobile/Tablet layout - Carousel */}
          <div className="lg:hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Testimonial {...testimonials[current]} />
              </motion.div>
            </AnimatePresence>
            
            <div className="mt-6 flex justify-center items-center gap-4">
              <button 
                className="p-2 rounded-full bg-white border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors"
                onClick={goToPrev}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === current ? 'bg-[var(--accent-primary)]' : 'bg-[var(--border-color)]'
                    }`}
                    onClick={() => setCurrent(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                className="p-2 rounded-full bg-white border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors"
                onClick={goToNext}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold mb-4">
            {t('testimonials.cta.title') || "Prêt à rejoindre nos clients satisfaits ?"}
          </h3>
          <a 
            href="#contact"
            className="btn-primary rounded-lg inline-flex items-center gap-2 px-8"
          >
            {t('testimonials.cta.button') || "Démarrer avec TechnicIA"}
            <ChevronRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;