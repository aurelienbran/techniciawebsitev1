import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, Tool, Book, GraduationCap, Check } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  points?: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay, points }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="card hover:shadow-card-hover group"
    >
      <div className="feature-icon-wrapper group-hover:bg-blue-100 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-[var(--text-secondary)] mb-5">{description}</p>
      
      {points && points.length > 0 && (
        <ul className="space-y-2">
          {points.map((point, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-[var(--accent-primary)] mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm text-[var(--text-secondary)]">{point}</span>
            </li>
          ))}
        </ul>
      )}
      
      <div className="mt-6 text-[var(--accent-primary)] flex items-center text-sm font-medium">
        <span>En savoir plus</span>
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation('home');
  
  const features = [
    {
      icon: <FileText className="feature-icon" />,
      title: t('features.translation.title') || "Traduction des schémas",
      description: t('features.translation.description') || "Convertit automatiquement les schémas techniques complexes en langage clair et accessible.",
      points: [
        "Reconnaissance visuelle avancée",
        "Support multi-formats (PDF, CAO, images)",
        "Annotations automatiques"
      ]
    },
    {
      icon: <Tool className="feature-icon" />,
      title: t('features.diagnosis.title') || "Diagnostic intelligent",
      description: t('features.diagnosis.description') || "Guide pas à pas les techniciens dans l'identification et la résolution des pannes.",
      points: [
        "Analyse prédictive des défaillances",
        "Suggestions de résolution contextuelles",
        "Historique des interventions similaires"
      ]
    },
    {
      icon: <Book className="feature-icon" />,
      title: t('features.documentation.title') || "Documentation instantanée",
      description: t('features.documentation.description') || "Accès immédiat à toute la documentation technique nécessaire pour chaque intervention.",
      points: [
        "Recherche sémantique puissante",
        "Organisation par équipement et référence",
        "Mises à jour automatiques"
      ]
    },
    {
      icon: <GraduationCap className="feature-icon" />,
      title: t('features.training.title') || "Formation continue",
      description: t('features.training.description') || "Aide à la formation des nouveaux techniciens et au perfectionnement des équipes existantes.",
      points: [
        "Parcours d'apprentissage personnalisés",
        "Simulations interactives de dépannage",
        "Suivi des compétences acquises"
      ]
    }
  ];

  return (
    <section id="demo" className="py-20 bg-[var(--background-secondary)]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            {t('features.title') || "Fonctionnalités principales"}
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
            {t('features.subtitle') || "Découvrez comment TechnicIA peut transformer votre approche de la maintenance industrielle grâce à nos outils basés sur l'intelligence artificielle."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              points={feature.points}
              delay={0.2 * index}
            />
          ))}
        </div>
        
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 rounded-2xl overflow-hidden bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] p-1"
        >
          <div className="bg-white rounded-xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Prêt à essayer TechnicIA?</h3>
              <p className="text-[var(--text-secondary)]">Demandez une démo personnalisée pour votre équipe de maintenance.</p>
            </div>
            <button className="btn-primary whitespace-nowrap flex items-center gap-2 rounded-lg">
              Réserver une démonstration
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;