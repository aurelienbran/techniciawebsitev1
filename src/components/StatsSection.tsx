import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Users, Clock } from 'lucide-react';

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
  icon: React.ReactNode;
  description?: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, suffix = '', delay = 0, icon, description }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const countingDone = useRef(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countingDone.current) {
          countingDone.current = true;
          
          let startTimestamp: number | null = null;
          const duration = 2000; // ms
          
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * value));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          
          // Add a little delay before starting the animation
          setTimeout(() => {
            window.requestAnimationFrame(step);
          }, delay * 1000);
        }
      },
      { threshold: 0.1 }
    );
    
    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    
    return () => {
      if (nodeRef.current) {
        observer.unobserve(nodeRef.current);
      }
    };
  }, [value, delay]);
  
  return (
    <motion.div 
      ref={nodeRef} 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      className="stat-card"
    >
      <div className="flex items-start gap-4">
        <div className="feature-icon-wrapper mt-1">
          {icon}
        </div>
        <div>
          <div className="stat-value">
            {count}{suffix}
          </div>
          <div className="stat-label mb-2">{label}</div>
          {description && (
            <p className="text-sm text-[var(--text-secondary)]">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const StatsSection: React.FC = () => {
  const { t } = useTranslation('home');
  
  const stats = [
    {
      value: 87,
      label: t('stats.diagnosisTime') || "Temps de diagnostic réduit",
      suffix: "%",
      delay: 0,
      icon: <TrendingUp className="feature-icon" />,
      description: "Réduction moyenne du temps de diagnostic par rapport aux méthodes traditionnelles."
    },
    {
      value: 15000,
      label: t('stats.documentations') || "Documentations intégrées",
      suffix: "+",
      delay: 0.2,
      icon: <Zap className="feature-icon" />,
      description: "Notre base de données contient plus de 15000 documents techniques accessibles instantanément."
    },
    {
      value: 92,
      label: t('stats.satisfaction') || "Satisfaction techniciens",
      suffix: "%",
      delay: 0.4,
      icon: <Users className="feature-icon" />,
      description: "Taux de satisfaction des techniciens utilisant TechnicIA au quotidien."
    },
    {
      value: 45,
      label: t('stats.timeReduction') || "Minutes économisées",
      suffix: "",
      delay: 0.6,
      icon: <Clock className="feature-icon" />,
      description: "Temps moyen économisé par intervention grâce à nos outils d'aide à la décision."
    }
  ];
  
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            {t('stats.title') || "Impact Mesurable"}
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
            {t('stats.subtitle') || "Les résultats concrets obtenus par nos clients grâce à TechnicIA"}
          </motion.p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem 
              key={index} 
              value={stat.value} 
              label={stat.label} 
              suffix={stat.suffix}
              delay={stat.delay}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute right-0 bottom-0 w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10"></div>
    </section>
  );
};

export default StatsSection;