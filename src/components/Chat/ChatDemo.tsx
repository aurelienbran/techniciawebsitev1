import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Volume2, VolumeX } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import QuickSuggestions from './QuickSuggestions';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: Date;
  imageUrl?: string;
}

const demoScenarios = {
  schemaTranslation: [
    {
      type: 'user',
      content: "Can you explain this hydraulic schematic?",
      imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80"
    },
    {
      type: 'ai',
      content: "This hydraulic schematic shows a basic circuit with:\n\n1. Main pump (P1)\n2. Two cylinders (C1, C2)\n3. Directional control valve (V1)\n\nThe flow path indicates..."
    }
  ],
  motorDiagnostic: [
    {
      type: 'user',
      content: "My electric motor is making unusual noise and overheating"
    },
    {
      type: 'ai',
      content: "Let's diagnose this systematically. Here are the most likely causes:\n\n1. Worn bearings (60% probability)\n2. Misalignment (25% probability)\n3. Electrical issues (10% probability)\n4. Mechanical overload (5% probability)\n\nCan you describe the noise more specifically?"
    }
  ]
};

const quickSuggestions = [
  "How do I read this technical diagram?",
  "Diagnose motor overheating",
  "Find maintenance manual",
  "Safety procedures"
];

export default function ChatDemo() {
  const { t } = useTranslation('demo');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [demoMode, setDemoMode] = useState(true);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);

  // Sound effects
  const messageSoundRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    messageSoundRef.current = new Audio('/message.mp3');
  }, []);

  const playMessageSound = () => {
    if (soundEnabled && messageSoundRef.current) {
      messageSoundRef.current.play();
    }
  };

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Demo mode
  useEffect(() => {
    if (demoMode) {
      startDemoScenario('schemaTranslation');
    }
  }, [demoMode]);

  // Inactivity detection
  useEffect(() => {
    const resetInactivityTimer = () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
      setInactivityTimer(
        setTimeout(() => {
          if (!demoMode) {
            setDemoMode(true);
            setMessages([]);
          }
        }, 30000)
      );
    };

    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keypress', resetInactivityTimer);

    return () => {
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keypress', resetInactivityTimer);
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [demoMode]);

  const startDemoScenario = async (scenario: keyof typeof demoScenarios) => {
    setDemoMode(true);
    for (const message of demoScenarios[scenario]) {
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        content: message.content,
        type: message.type as 'user' | 'ai',
        timestamp: new Date(),
        imageUrl: message.imageUrl
      };
      
      setMessages(prev => [...prev, newMessage]);
      playMessageSound();
      setIsTyping(false);
      
      if (message.type === 'user') {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  const handleSendMessage = async (content: string) => {
    setDemoMode(false);
    
    // User message
    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      type: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    playMessageSound();

    // AI response
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const aiMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content: "I understand your question about " + content.toLowerCase() + ". Let me analyze this...",
      type: 'ai',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiMessage]);
    playMessageSound();
    setIsTyping(false);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const userMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        content: "Can you analyze this technical diagram?",
        type: 'user',
        timestamp: new Date(),
        imageUrl: e.target?.result as string
      };
      setMessages(prev => [...prev, userMessage]);
      playMessageSound();
    };
    reader.readAsDataURL(file);
  };

  const clearChat = () => {
    setMessages([]);
    setDemoMode(true);
  };

  return (
    <div className="flex flex-col h-[600px] glass-card">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--text-secondary)]/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="font-medium">TechnicIA Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 hover:bg-[var(--background-primary)] rounded-full transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
          <button
            onClick={clearChat}
            className="p-2 hover:bg-[var(--background-primary)] rounded-full transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <AnimatePresence>
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-2 text-[var(--text-secondary)]"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[var(--accent-primary)] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[var(--accent-primary)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-[var(--accent-primary)] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
              <span>TechnicIA is typing...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Suggestions */}
      {messages.length === 0 && (
        <div className="px-4">
          <QuickSuggestions
            suggestions={quickSuggestions}
            onSelect={handleSendMessage}
          />
        </div>
      )}

      {/* Chat Input */}
      <div className="p-4 border-t border-[var(--text-secondary)]/10">
        <ChatInput
          onSendMessage={handleSendMessage}
          onUploadImage={handleImageUpload}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
}