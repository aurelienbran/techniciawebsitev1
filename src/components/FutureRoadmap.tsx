import React from 'react';
import { motion } from 'framer-motion';
import { Glasses, LineChart, Users } from 'lucide-react';

const futureFeatures = [
  {
    icon: <Glasses className="h-6 w-6" />,
    title: 'Enhanced Reality Integration',
    description: 'Augmented reality overlays will provide real-time visual guidance for maintenance procedures, allowing technicians to see step-by-step instructions in their field of view.'
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: 'Predictive Intelligence',
    description: 'Advanced algorithms will predict equipment failures with greater accuracy, enabling truly proactive maintenance scheduling and reducing unexpected downtime.'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Collaborative Learning',
    description: 'AI systems will learn from the collective experience of all users, continuously improving recommendations and adapting to new maintenance scenarios.'
  }
];

export default function FutureRoadmap() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {futureFeatures.map((feature, index) => (
        <motion.div
          key={feature.title}
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="h-12 w-12 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center mb-4">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-[var(--text-secondary)]">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}