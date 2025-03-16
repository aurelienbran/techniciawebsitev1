import React from 'react';
import { motion } from 'framer-motion';
import { BrainCog, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    type: 'user' | 'ai';
    timestamp: Date;
    imageUrl?: string;
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.type === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`flex ${isAI ? 'flex-row' : 'flex-row-reverse'} max-w-[80%] items-start gap-2`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isAI ? 'bg-[var(--accent-primary)]/20' : 'bg-[var(--accent-secondary)]/20'
        }`}>
          {isAI ? <BrainCog className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </div>
        
        <div className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}>
          <div className={`rounded-lg p-4 ${
            isAI 
              ? 'bg-[var(--background-secondary)] bg-opacity-80' 
              : 'bg-[var(--accent-primary)]'
          }`}>
            {message.imageUrl && (
              <img 
                src={message.imageUrl} 
                alt="Technical diagram" 
                className="rounded-lg mb-2 max-w-full h-auto"
              />
            )}
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>
          <span className="text-xs text-[var(--text-secondary)] mt-1">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}