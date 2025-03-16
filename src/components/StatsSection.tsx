import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, suffix = '', delay = 0 }) => {
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
    <div ref={nodeRef} className="text-center">
      <div className="text-4xl lg:text-5xl font-bold text-[var(--accent-primary)] mb-2">
        {count}{suffix}
      </div>
      <div className="text-[var(--text-secondary)]">{label}</div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const { t } = useTranslation('home');
  
  const stats = [
    {
      value: 87,
      label: t('stats.diagnosisTime') || "Temps de diagnostic réduit",
      suffix: "%",
      delay: 0
    },
    {
      value: 15000,
      label: t('stats.documentations') || "Documentations intégrées",
      suffix: "+",
      delay: 0.2
    },
    {
      value: 92,
      label: t('stats.satisfaction') || "Satisfaction techniciens",
      suffix: "%",
      delay: 0.4
    },
    {
      value: 45,
      label: t('stats.timeReduction') || "Minutes économisées par intervention",
      suffix: "",
      delay: 0.6
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-10 shadow-sm"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatItem 
                key={index} 
                value={stat.value} 
                label={stat.label} 
                suffix={stat.suffix}
                delay={stat.delay}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;