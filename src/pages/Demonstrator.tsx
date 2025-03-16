import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BrainCog,
  Send,
  CheckCircle2,
  Brain,
  Eye,
  MessageSquare,
  Languages,
  FileText,
  Factory,
  ArrowRight,
  ChevronDown,
  Tablet,
  Power,
  VolumeX,
  Volume2
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function Demonstrator() {
  const { t } = useTranslation('demo');
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth * 5;
      const y = (clientY - innerHeight / 2) / innerHeight * 5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: t('chat.aiResponse'),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-primary)] to-black"></div>
        
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="animate-bounce mt-12">
            <ChevronDown className="h-8 w-8 mx-auto text-[var(--accent-primary)]" />
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div 
              className="max-w-2xl mx-auto transform perspective-1000"
              style={{
                transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
              }}
            >
              <div className="relative bg-black rounded-[2rem] p-4 shadow-2xl">
                <div className="absolute top-1/2 right-2 space-y-4">
                  <Power className="h-4 w-4 text-gray-600" />
                  <Volume2 className="h-4 w-4 text-gray-600" />
                  <VolumeX className="h-4 w-4 text-gray-600" />
                </div>
                
                <div className="bg-[var(--background-primary)] rounded-[1.5rem] p-4 h-[600px] relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--text-secondary)]/10">
                    <div className="flex items-center">
                      <BrainCog className="h-8 w-8 text-[var(--accent-primary)]" />
                      <span className="ml-2 font-bold">{t('chat.title')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-[var(--text-secondary)]">{t('chat.status')}</span>
                    </div>
                  </div>

                  <div 
                    ref={chatRef}
                    className="h-[calc(100%-8rem)] overflow-y-auto space-y-4 mb-4"
                  >
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === 'user'
                              ? 'bg-[var(--accent-primary)] text-white'
                              : 'bg-[var(--background-secondary)] text-[var(--text-primary)]'
                          }`}
                        >
                          <p className="whitespace-pre-line">{message.text}</p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-[var(--background-secondary)] rounded-lg p-3">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={t('chat.placeholder')}
                        className="flex-1 bg-[var(--background-secondary)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-[var(--accent-primary)] text-white rounded-lg p-2 hover:bg-[var(--accent-secondary)] transition-colors duration-300"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--background-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('features.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="glass-card p-6 fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-12 w-12 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center mb-4">
                  {index === 0 && <MessageSquare className="h-6 w-6" />}
                  {index === 1 && <Brain className="h-6 w-6" />}
                  {index === 2 && <Eye className="h-6 w-6" />}
                  {index === 3 && <Languages className="h-6 w-6" />}
                  {index === 4 && <FileText className="h-6 w-6" />}
                  {index === 5 && <Factory className="h-6 w-6" />}
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(`features.items.${index}.title`)}</h3>
                <p className="text-[var(--text-secondary)]">{t(`features.items.${index}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-primary)] to-[var(--background-secondary)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            {t('cta.subtitle')}
          </p>
          <button className="btn-primary flex items-center justify-center mx-auto group">
            {t('cta.button')}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>
    </div>
  );
}