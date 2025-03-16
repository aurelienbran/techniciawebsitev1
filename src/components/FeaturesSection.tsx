import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, Tool, Book, GraduationCap } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="card hover:shadow-card-hover"
    >
      <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-[var(--text-secondary)]">{description}</p>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation('home');
  
  const features = [
    {
      icon: <FileText className="w-6 h-6 text-[var(--accent-primary)]" />,
      title: t('features.translation.title') || "Traduction des schémas",
      description: t('features.translation.description') || "Convertit automatiquement les schémas techniques complexes en langage clair et accessible."
    },
    {
      icon: <Tool className="w-6 h-6 text-[var(--accent-primary)]" />,
      title: t('features.diagnosis.title') || "Diagnostic intelligent",
      description: t('features.diagnosis.description') || "Guide pas à pas les techniciens dans l'identification et la résolution des pannes."
    },
    {
      icon: <Book className="w-6 h-6 text-[var(--accent-primary)]" />,
      title: t('features.documentation.title') || "Documentation instantanée",
      description: t('features.documentation.description') || "Accès immédiat à toute la documentation technique nécessaire pour chaque intervention."
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-[var(--accent-primary)]" />,
      title: t('features.training.title') || "Formation continue",
      description: t('features.training.description') || "Aide à la formation des nouveaux techniciens et au perfectionnement des équipes existantes."
    }
  ];

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
            {t('features.subtitle') || "Découvrez comment TechnicIA peut transformer votre approche de la maintenance industrielle."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.2 * index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;