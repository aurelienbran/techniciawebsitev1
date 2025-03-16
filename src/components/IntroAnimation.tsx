import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BrainCog, ChevronDown } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const { t } = useTranslation('intro');
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  
  // Handle skip button click
  const handleSkip = () => {
    onComplete();
  };

  // Check for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      // Skip animation for users who prefer reduced motion
      setTimeout(onComplete, 500);
    }
  }, [onComplete]);

  // Main animation sequence using GSAP
  useGSAP(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      }
    });

    // Logo animation
    tl.from(logoRef.current, {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    });

    // Text animation
    tl.from(textRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, "-=0.3");

    // Typing effect
    tl.to('.typing-text', {
      width: '100%',
      duration: 1.5,
      ease: 'steps(30)'
    });

    // Skip button fade in
    tl.from(skipButtonRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.5
    }, "-=1.5");

    // Add some subtle background particle animation
    gsap.to('.intro-particle', {
      x: 'random(-50, 50)',
      y: 'random(-50, 50)',
      opacity: 'random(0.1, 0.3)',
      duration: 'random(3, 5)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.1
    });

  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[var(--background-primary)] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Simple Background Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="intro-particle absolute bg-[var(--accent-primary)] rounded-full opacity-0"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative text-center z-10 px-4">
        {/* Logo */}
        <div ref={logoRef} className="mb-8">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-[var(--accent-primary)] rounded-full opacity-10"></div>
            <BrainCog className="w-full h-full text-[var(--accent-primary)]" />
          </div>
        </div>

        {/* Text Content */}
        <div ref={textRef}>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            TechnicIA
          </h1>
          <div className="h-8 overflow-hidden flex justify-center">
            <div className="relative">
              <p className="typing-text w-0 whitespace-nowrap overflow-hidden inline-block">
                {t('slogan')}
              </p>
              <span className="cursor inline-block w-2 h-5 bg-[var(--accent-primary)] ml-1 align-middle"></span>
            </div>
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="mt-10">
          <div className="w-40 h-1 mx-auto bg-[var(--background-secondary)] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[var(--accent-primary)] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 3,
                ease: "linear"
              }}
            />
          </div>
        </div>
        
        {/* Skip Button */}
        <button
          ref={skipButtonRef}
          onClick={handleSkip}
          className="absolute bottom-6 right-6 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors flex items-center text-sm opacity-70 hover:opacity-100"
          aria-label="Skip animation"
        >
          {t('skip')} <ChevronDown className="ml-1 w-4 h-4" />
        </button>
      </div>
      
      {/* Simple animation styles */}
      <style jsx>{`
        .typing-text {
          border-right: 2px solid var(--accent-primary);
          white-space: nowrap;
          overflow: hidden;
          animation: blinkCursor 0.8s step-end infinite;
        }
        
        @keyframes blinkCursor {
          from, to { border-color: transparent; }
          50% { border-color: var(--accent-primary); }
        }
      `}</style>
    </motion.div>
  );
}