import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScrollArrowProps {
  targetId: string;
}

export default function ScrollArrow({ targetId }: ScrollArrowProps) {
  const handleClick = () => {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors duration-300"
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <ChevronDown className="h-8 w-8" />
    </motion.button>
  );
}