import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BrainCog } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const { t } = useTranslation('intro');
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const gearsRef = useRef<HTMLDivElement>(null);
  const neuralRef = useRef<HTMLDivElement>(null);

  const handleSkip = () => {
    onComplete();
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      }
    });

    // Phase 1: Logo Animation
    tl.from(logoRef.current, {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)'
    });

    // Phase 2: Industrial Elements
    tl.from('.gear', {
      scale: 0,
      opacity: 0,
      rotation: -180,
      stagger: 0.1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });

    // Phase 3: Neural Network
    tl.from('.neural-node', {
      scale: 0,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5
    })
    .from('.neural-connection', {
      strokeDashoffset: 100,
      opacity: 0,
      stagger: 0.03,
      duration: 0.3
    }, '-=0.5');

    // Phase 4: Typing Effect
    tl.to('.typing-text', {
      width: '100%',
      duration: 1,
      ease: 'none'
    });

    // Continuous Animations
    gsap.to('.gear', {
      rotation: '+=360',
      duration: 8,
      repeat: -1,
      ease: 'none'
    });

    gsap.to('.neural-node', {
      scale: 1.2,
      duration: 1,
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.2,
        from: 'random'
      }
    });

    // Particle Animation
    const particles = gsap.utils.toArray('.intro-particle');
    particles.forEach((particle: any) => {
      gsap.to(particle, {
        x: 'random(-100, 100)',
        y: 'random(-100, 100)',
        opacity: 'random(0.1, 0.3)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'none'
      });
    });
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[var(--background-primary)] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Particles */}
      <div ref={particlesRef} className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="intro-particle absolute w-1 h-1 bg-[var(--accent-primary)] rounded-full opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative text-center">
        {/* Logo */}
        <div ref={logoRef} className="mb-8">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-[var(--accent-primary)] rounded-full opacity-10 animate-pulse"></div>
            <BrainCog className="w-full h-full text-[var(--accent-primary)]" />
          </div>
        </div>

        {/* Industrial Gears */}
        <div ref={gearsRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="gear absolute"
              style={{
                width: `${80 - i * 10}px`,
                height: `${80 - i * 10}px`,
                left: `${Math.cos(i * Math.PI / 2.5) * 100}px`,
                top: `${Math.sin(i * Math.PI / 2.5) * 100}px`
              }}
            >
              <svg viewBox="0 0 100 100" className="text-[var(--accent-primary)] opacity-20">
                <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="currentColor" />
              </svg>
            </div>
          ))}
        </div>

        {/* Neural Network */}
        <div ref={neuralRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg width="300" height="300" className="opacity-20">
            {/* Generate nodes */}
            {Array.from({ length: 15 }).map((_, i) => (
              <circle
                key={i}
                className="neural-node"
                cx={150 + Math.cos(i * Math.PI / 7.5) * 100}
                cy={150 + Math.sin(i * Math.PI / 7.5) * 100}
                r="4"
                fill="var(--accent-primary)"
              />
            ))}
            {/* Generate connections */}
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={i}
                className="neural-connection"
                x1={150 + Math.cos(i * Math.PI / 10) * 100}
                y1={150 + Math.sin(i * Math.PI / 10) * 100}
                x2={150 + Math.cos((i + 1) * Math.PI / 10) * 100}
                y2={150 + Math.sin((i + 1) * Math.PI / 10) * 100}
                stroke="var(--accent-primary)"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            ))}
          </svg>
        </div>

        {/* Typing Text */}
        <div className="relative">
          <h1 className="text-3xl font-bold mb-4 gradient-text">TechnicIA</h1>
          <div className="h-8 overflow-hidden">
            <p className="typing-text w-0 whitespace-nowrap overflow-hidden border-r-2 border-[var(--accent-primary)]">
              {t('slogan')}
            </p>
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-1 bg-[var(--background-secondary)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--accent-primary)] rounded-full loading-progress"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}