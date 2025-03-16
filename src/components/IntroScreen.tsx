import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrainCog, ChevronDown, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const { t } = useTranslation('intro');
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasTriggeredTransition, setHasTriggeredTransition] = useState(false);

  // Simple animation with GSAP
  useGSAP(() => {
    // Create the timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Logo animation
    tl.from(logoRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)"
    })
    // Content animation
    .from(contentRef.current?.children || [], {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8
    })
    // Scroll indicator
    .from(scrollIndicatorRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.5
    }, "-=0.3")
    .to('.scroll-arrow', {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "sine.inOut"
    });

    // Simple particle animation
    gsap.utils.toArray('.intro-particle').forEach((particle: any) => {
      gsap.to(particle, {
        x: 'random(-50, 50)',
        y: 'random(-50, 50)',
        opacity: 'random(0.05, 0.2)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

  }, []);

  // Handle scroll for transition
  useEffect(() => {
    if (!containerRef.current || hasTriggeredTransition) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const threshold = windowHeight * 0.25; // 25% scroll triggers transition
      
      // Calculate progress percentage
      const progress = Math.min(scrollY / threshold, 1);
      setScrollProgress(progress);
      
      // Trigger transition when threshold reached
      if (scrollY > threshold && !hasTriggeredTransition) {
        setHasTriggeredTransition(true);
        handleTransitionOut();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggeredTransition, onComplete]);

  // Handle transition out
  const handleTransitionOut = () => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        setTimeout(onComplete, 100);
      }
    });
  };

  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[var(--background-primary)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-[200vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Simple background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Background particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="intro-particle absolute rounded-full opacity-10"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: 'var(--accent-primary)'
                }}
              />
            ))}
            
            {/* Simple gradient overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle, rgba(15,23,42,0) 0%, rgba(15,23,42,1) 80%)`,
                opacity: 0.8
              }}
            />
          </div>

          {/* Main content */}
          <div 
            ref={contentRef} 
            className="relative text-center z-10 px-4"
            style={{
              transform: `translateY(${scrollProgress * -20}px)`,
              opacity: 1 - scrollProgress * 0.5
            }}
          >
            {/* Logo */}
            <div ref={logoRef} className="mb-10">
              <div className="relative w-36 h-36 mx-auto">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: ['0 0 10px rgba(96,165,250,0.3)', '0 0 20px rgba(96,165,250,0.5)', '0 0 10px rgba(96,165,250,0.3)']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "sine.inOut"
                  }}
                />
                <BrainCog className="w-full h-full text-[var(--accent-primary)]" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                TechnicIA
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-[var(--text-secondary)] max-w-lg mx-auto mb-8">
              {t('description')}
            </p>
            
            {/* CTA Button */}
            <motion.button
              className="px-6 py-3 bg-[var(--accent-primary)] text-white rounded-lg font-medium hover:bg-[var(--accent-secondary)] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTransitionOut}
            >
              {t('explore')}
            </motion.button>

            {/* Scroll indicator */}
            <motion.div
              ref={scrollIndicatorRef}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
              style={{ opacity: 1 - scrollProgress * 2 }}
            >
              <p className="text-[var(--text-secondary)] text-sm mb-2">
                {t('scroll')}
              </p>
              <div className="flex justify-center">
                <div className="scroll-arrow">
                  <ArrowDown className="w-6 h-6 text-[var(--accent-primary)]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}