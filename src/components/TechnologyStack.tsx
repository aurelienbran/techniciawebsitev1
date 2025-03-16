import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Database, Network, Lock, Cloud } from 'lucide-react';

const technologies = [
  {
    icon: <Brain className="h-6 w-6" />,
    name: 'Machine Learning',
    description: 'Advanced neural networks for pattern recognition and prediction'
  },
  {
    icon: <Code className="h-6 w-6" />,
    name: 'Natural Language Processing',
    description: 'Understanding and processing technical documentation and queries'
  },
  {
    icon: <Database className="h-6 w-6" />,
    name: 'Knowledge Graph',
    description: 'Interconnected technical data for comprehensive understanding'
  },
  {
    icon: <Network className="h-6 w-6" />,
    name: 'Edge Computing',
    description: 'Real-time processing at the point of maintenance'
  },
  {
    icon: <Lock className="h-6 w-6" />,
    name: 'Security',
    description: 'Enterprise-grade encryption and data protection'
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    name: 'Cloud Infrastructure',
    description: 'Scalable and reliable service delivery'
  }
];

export default function TechnologyStack() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="h-12 w-12 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center mb-4">
            {tech.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
          <p className="text-[var(--text-secondary)]">{tech.description}</p>
        </motion.div>
      ))}
    </div>
  );
}