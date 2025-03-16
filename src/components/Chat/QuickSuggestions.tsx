import React from 'react';
import { motion } from 'framer-motion';

interface QuickSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export default function QuickSuggestions({ suggestions, onSelect }: QuickSuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={suggestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(suggestion)}
          className="px-4 py-2 rounded-full bg-[var(--background-secondary)] hover:bg-[var(--accent-primary)]/20 
                   border border-[var(--accent-primary)]/20 transition-all duration-300
                   text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  );
}