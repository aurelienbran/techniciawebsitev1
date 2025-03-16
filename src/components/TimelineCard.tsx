import React from 'react';
import { motion } from 'framer-motion';

interface TimelineCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  year: string;
  isActive: boolean;
  onClick: () => void;
}

export default function TimelineCard({
  icon,
  title,
  description,
  year,
  isActive,
  onClick
}: TimelineCardProps) {
  return (
    <motion.div
      className={`glass-card p-6 cursor-pointer transition-all duration-300 ${
        isActive ? 'ring-2 ring-[var(--accent-primary)] scale-105' : ''
      }`}
      onClick={onClick}
      whileHover={{ scale: isActive ? 1.05 : 1.02 }}
      layout
    >
      <div className="flex items-start space-x-4">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
          isActive ? 'bg-[var(--accent-primary)]' : 'bg-[var(--accent-primary)]/20'
        }`}>
          {icon}
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            <span className="text-sm text-[var(--accent-primary)]">{year}</span>
          </div>
          <p className="text-[var(--text-secondary)]">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}