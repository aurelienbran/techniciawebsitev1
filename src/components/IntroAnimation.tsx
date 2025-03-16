import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const particlesRef = useRef<HTMLDivElement>(null);
  const gearsRef = useRef<HTMLDivElement>(null);
  const neuralRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Skip intro if user has seen it before
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro === 'true' && !window.location.hash.includes('force-intro')) {
      onComplete();
    }
  }, [onComplete]);

  const handleSkip = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    onComplete();
  };

  // Main animation sequence
  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Create main timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          localStorage.setItem('hasSeenIntro', 'true');
          onComplete();
        }, 500);
      }
    });

    // Shorter animation for reduced motion preference
    if (prefersReducedMotion) {
      tl.from(logoRef.current, {
        scale: 0.8, 
        opacity: 0, 
        duration: 0.5
      })
      .to('.typing-text', {
        width: '100%',
        duration: 0.5
      });
      return;
    }

    // Phase 1: Logo Animation with fragments
    const fragments = gsap.utils.toArray('.logo-fragment');
    tl.from(fragments, {
      opacity: 0,
      scale: 0,
      x: 'random(-100, 100)',
      y: 'random(-100, 100)',
      rotation: 'random(-90, 90)',
      stagger: 0.02,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to('.logo-core', {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
      }
    })
    .from('.logo-pulse', {
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'sine.out'
    }, '-=0.3')
    .to('.logo-ring', {
      rotation: 360,
      duration: 15,
      repeat: -1,
      ease: 'none'
    }, '-=0.5');

    // Phase 2: Industrial Elements with 3D effect
    tl.from('.gear', {
      scale: 0,
      opacity: 0,
      rotation: -180,
      transformOrigin: 'center center',
      stagger: 0.1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.5')
    .from('.gear-shadow', {
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      stagger: 0.1
    }, '-=0.5')
    .to('.gear', {
      rotation: '+=360',
      duration: 8,
      repeat: -1,
      ease: 'none',
      stagger: {
        each: 0.5,
        from: 'start'
      }
    }, '-=0.5');

    // Phase 3: Neural Network with pulsing connections
    tl.from('.neural-node', {
      scale: 0,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, '-=1')
    .from('.neural-connection', {
      attr: { 'stroke-dashoffset': 100 },
      opacity: 0,
      stagger: 0.03,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.5')
    .to('.neural-pulse', {
      opacity: 0.8,
      scale: 1.2,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.2,
        repeat: -1
      }
    }, '-=0.3');

    // Phase 4: Sophisticated Typing Effect
    tl.to('.typing-text', {
      width: '100%',
      duration: 1.2,
      ease: 'steps(28)'
    }, '-=1')
    .to('.cursor', {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.4
    }, '-=1');

    // Continuous particle animation
    const particles = gsap.utils.toArray('.intro-particle');
    particles.forEach((particle: any) => {
      gsap.to(particle, {
        x: 'random(-120, 120)',
        y: 'random(-120, 120)',
        opacity: 'random(0.1, 0.5)',
        scale: 'random(0.8, 1.5)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    // Skip button fade in
    gsap.from(skipButtonRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.5,
      delay: 1
    });

    // Mouse interaction with neural network
    if (neuralRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = neuralRef.current!.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const deltaX = (e.clientX - centerX) / (width / 2);
        const deltaY = (e.clientY - centerY) / (height / 2);
        
        gsap.to('.neural-node', {
          x: (i) => Math.sin(i * 0.5) * deltaX * 10,
          y: (i) => Math.cos(i * 0.5) * deltaY * 10,
          duration: 0.5
        });
      };

      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-50 bg-[var(--background-primary)] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background Particles */}
        <div ref={particlesRef} className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="intro-particle absolute bg-[var(--accent-primary)] rounded-full opacity-0"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative text-center z-10">
          {/* Logo */}
          <div ref={logoRef} className="mb-8 relative">
            <div className="relative w-40 h-40 mx-auto">
              {/* Logo Fragments */}
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="logo-fragment absolute bg-[var(--accent-primary)] opacity-60"
                  style={{
                    width: '12px',
                    height: '12px',
                    left: '50%',
                    top: '50%',
                    borderRadius: '2px',
                    transform: 'translate(-50%, -50%)',
                    clipPath: `polygon(${Math.random() * 50}% ${Math.random() * 50}%, ${50 + Math.random() * 50}% ${Math.random() * 50}%, ${50 + Math.random() * 50}% ${50 + Math.random() * 50}%, ${Math.random() * 50}% ${50 + Math.random() * 50}%)`
                  }}
                />
              ))}
              
              {/* Logo Pulses */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`logo-pulse absolute inset-0 rounded-full opacity-0 bg-[var(--accent-primary)]`}
                  style={{
                    opacity: 0.05 - i * 0.01,
                    transform: `scale(${1.2 + i * 0.2})`,
                    animation: `pulse 2s infinite ${i * 0.7}s`
                  }}
                />
              ))}
              
              {/* Rotating Rings */}
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className={`logo-ring absolute inset-0 opacity-10`}
                  style={{
                    border: '1px solid var(--accent-primary)',
                    borderRadius: '50%',
                    transform: `rotate(${i * 45}deg)`
                  }}
                />
              ))}
              
              {/* Core Logo */}
              <div className="logo-core absolute inset-0 flex items-center justify-center opacity-0 scale-0">
                <BrainCog className="w-full h-full text-[var(--accent-primary)]" />
              </div>
            </div>
          </div>

          {/* Industrial Gears with 3D effect */}
          <div ref={gearsRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="gear absolute"
                style={{
                  width: `${90 - i * 12}px`,
                  height: `${90 - i * 12}px`,
                  left: `${Math.cos(i * Math.PI / 2.5) * 120}px`,
                  top: `${Math.sin(i * Math.PI / 2.5) * 120}px`,
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))',
                  transformStyle: 'preserve-3d',
                  perspective: '500px'
                }}
              >
                <svg viewBox="0 0 100 100" className="text-[var(--accent-primary)] opacity-20">
                  <path d="M50 0 L60 10 L90 10 L100 20 L90 30 L90 50 L100 60 L90 70 L70 70 L60 80 L50 100 L40 80 L10 80 L0 70 L10 60 L10 40 L0 30 L10 20 L40 20 Z" fill="currentColor" />
                  <circle cx="50" cy="50" r="15" fill="var(--background-primary)" />
                  <circle cx="50" cy="50" r="5" fill="currentColor" />
                </svg>
                <div
                  className="gear-shadow absolute inset-0 opacity-10"
                  style={{
                    transform: 'translateZ(-5px)',
                    filter: 'blur(5px)',
                    background: 'var(--accent-primary)'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Enhanced Neural Network */}
          <div ref={neuralRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg width="340" height="340" className="opacity-30">
              {/* Generate nodes with interactive elements */}
              {Array.from({ length: 18 }).map((_, i) => {
                const angle = (i * Math.PI / 9);
                const distance = 120 + Math.sin(i * 0.5) * 30;
                const x = 170 + Math.cos(angle) * distance;
                const y = 170 + Math.sin(angle) * distance;
                
                return (
                  <g key={i}>
                    <circle
                      className="neural-node"
                      cx={x}
                      cy={y}
                      r="4"
                      fill="var(--accent-primary)"
                    />
                    <circle
                      className="neural-pulse"
                      cx={x}
                      cy={y}
                      r="8"
                      fill="var(--accent-primary)"
                      opacity="0.2"
                    />
                  </g>
                );
              })}
              
              {/* Generate dynamic connections */}
              {Array.from({ length: 30 }).map((_, i) => {
                const startNode = i % 18;
                const endNode = (i + 5) % 18;
                const startAngle = (startNode * Math.PI / 9);
                const endAngle = (endNode * Math.PI / 9);
                const startDistance = 120 + Math.sin(startNode * 0.5) * 30;
                const endDistance = 120 + Math.sin(endNode * 0.5) * 30;
                
                const x1 = 170 + Math.cos(startAngle) * startDistance;
                const y1 = 170 + Math.sin(startAngle) * startDistance;
                const x2 = 170 + Math.cos(endAngle) * endDistance;
                const y2 = 170 + Math.sin(endAngle) * endDistance;
                
                return (
                  <line
                    key={i}
                    className="neural-connection"
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="var(--accent-primary)"
                    strokeWidth="1"
                    strokeDasharray="5,3"
                    strokeDashoffset="0"
                  />
                );
              })}
              
              {/* Data pulses along connections */}
              {Array.from({ length: 10 }).map((_, i) => {
                const pathIndex = i % 30;
                const startNode = pathIndex % 18;
                const endNode = (pathIndex + 5) % 18;
                const startAngle = (startNode * Math.PI / 9);
                const endAngle = (endNode * Math.PI / 9);
                const startDistance = 120 + Math.sin(startNode * 0.5) * 30;
                const endDistance = 120 + Math.sin(endNode * 0.5) * 30;
                
                const x1 = 170 + Math.cos(startAngle) * startDistance;
                const y1 = 170 + Math.sin(startAngle) * startDistance;
                const x2 = 170 + Math.cos(endAngle) * endDistance;
                const y2 = 170 + Math.sin(endAngle) * endDistance;
                
                return (
                  <circle
                    key={i}
                    className={`data-pulse-${i}`}
                    cx={x1}
                    cy={y1}
                    r="2"
                    fill="#fff"
                    opacity="0.8"
                    style={{
                      animation: `moveAlongPath${i} ${2 + i * 0.2}s infinite linear`,
                    }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Enhanced Typing Effect */}
          <div ref={textRef} className="relative z-10">
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
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="w-40 h-1 bg-[var(--background-secondary)] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[var(--accent-primary)] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 4,
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
        
        {/* Additional styles for animations */}
        <style jsx>{`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.5); opacity: 0.1; }
            100% { transform: scale(1); opacity: 0.2; }
          }
          
          ${Array.from({ length: 10 }).map((_, i) => {
            const pathIndex = i % 30;
            const startNode = pathIndex % 18;
            const endNode = (pathIndex + 5) % 18;
            const startAngle = (startNode * Math.PI / 9);
            const endAngle = (endNode * Math.PI / 9);
            const startDistance = 120 + Math.sin(startNode * 0.5) * 30;
            const endDistance = 120 + Math.sin(endNode * 0.5) * 30;
            
            const x1 = 170 + Math.cos(startAngle) * startDistance;
            const y1 = 170 + Math.sin(startAngle) * startDistance;
            const x2 = 170 + Math.cos(endAngle) * endDistance;
            const y2 = 170 + Math.sin(endAngle) * endDistance;
            
            return `
              @keyframes moveAlongPath${i} {
                0% { transform: translate(${x1}px, ${y1}px); }
                100% { transform: translate(${x2}px, ${y2}px); }
              }
            `;
          }).join('\n')}
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}