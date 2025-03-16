import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrainCog, ChevronDown, ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasTriggeredTransition, setHasTriggeredTransition] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Initial animation with GSAP
  useGSAP(() => {
    if (prefersReducedMotion) {
      // Simplified animation for reduced motion preference
      const simpleTl = gsap.timeline();
      simpleTl.from(logoRef.current, {
        opacity: 0,
        duration: 0.5
      })
      .from(contentRef.current?.children || [], {
        opacity: 0,
        duration: 0.5,
        stagger: 0.1
      }, "-=0.3");
      
      return;
    }

    // Create sophisticated animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Logo appearance with 3D effect
    tl.from(logoRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 1.5,
      rotationY: 180,
      transformOrigin: "center center",
      ease: "elastic.out(1, 0.5)"
    })
    .from('.logo-ring', {
      scale: 0,
      opacity: 0, 
      stagger: 0.1,
      duration: 0.5
    }, "-=1")
    .to('.logo-ring', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    }, "-=0.5");

    // Content animation with staggered reveal
    tl.from(contentRef.current?.children || [], {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8
    }, "-=0.8");

    // Scroll indicator with attention-grabbing animation
    tl.from(scrollIndicatorRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5
    }, "-=0.3")
    .to('.scroll-arrow', {
      y: 10,
      opacity: [0.5, 1, 0.5],
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Animate particles floating in the background
    gsap.utils.toArray('.intro-particle').forEach((particle: any) => {
      gsap.to(particle, {
        x: `random(-${window.innerWidth * 0.1}, ${window.innerWidth * 0.1})`,
        y: `random(-${window.innerHeight * 0.1}, ${window.innerHeight * 0.1})`,
        rotation: 'random(-15, 15)',
        scale: 'random(0.8, 1.2)',
        opacity: 'random(0.05, 0.2)',
        duration: 'random(3, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

  }, [prefersReducedMotion]);

  // Handle scroll-based transition
  useEffect(() => {
    if (!containerRef.current || hasTriggeredTransition) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const threshold = windowHeight * 0.25; // Trigger after 25% scroll
      
      // Calculate progress as percentage
      const progress = Math.min(scrollY / threshold, 1);
      setScrollProgress(progress);
      
      // Trigger transition when threshold is reached
      if (scrollY > threshold && !hasTriggeredTransition) {
        setHasTriggeredTransition(true);
        handleTransitionOut();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggeredTransition]);

  // Sophisticated transition out animation
  const handleTransitionOut = () => {
    if (!containerRef.current || !overlayRef.current || !logoRef.current) return;

    // Get navbar position for logo animation
    const navbarLogoPosition = {
      x: -window.innerWidth / 2 + 100,
      y: -window.innerHeight / 2 + 32
    };

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 100);
      }
    });

    // Fade out scroll indicator first
    tl.to(scrollIndicatorRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3
    })
    // Create interesting mask transition with the logo
    .to(logoRef.current, {
      scale: 0.3,
      y: navbarLogoPosition.y,
      x: navbarLogoPosition.x,
      duration: 0.8,
      ease: "power2.inOut"
    })
    // Use overlay for dramatic effect
    .to(overlayRef.current, {
      opacity: 0.5,
      duration: 0.4
    }, "-=0.6")
    // Fade out content with staggered effect
    .to(contentRef.current?.children || [], {
      y: -30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.4
    }, "-=0.6")
    // Create a wipe effect with the overlay
    .to(overlayRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.5
    })
    // Fade out overlay
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.5
    })
    // Finally fade out the container
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.3
    }, "-=0.3");
  };

  return (
    <AnimatePresence>
      <motion.div 
        ref={containerRef}
        className="fixed inset-0 z-50 bg-[var(--background-primary)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="min-h-[200vh]">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background with Depth */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Particles Layer 1 (Far) */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={`far-${i}`}
                  className="intro-particle absolute rounded-full opacity-10"
                  style={{
                    width: `${Math.random() * 2 + 1}px`,
                    height: `${Math.random() * 2 + 1}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: 'var(--accent-primary)',
                    zIndex: 1
                  }}
                />
              ))}
              
              {/* Particles Layer 2 (Mid) */}
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={`mid-${i}`}
                  className="intro-particle absolute rounded-full opacity-15"
                  style={{
                    width: `${Math.random() * 3 + 2}px`,
                    height: `${Math.random() * 3 + 2}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: 'var(--accent-primary)',
                    zIndex: 2
                  }}
                />
              ))}
              
              {/* Particles Layer 3 (Near) */}
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={`near-${i}`}
                  className="intro-particle absolute rounded-full opacity-20"
                  style={{
                    width: `${Math.random() * 4 + 3}px`,
                    height: `${Math.random() * 4 + 3}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: 'var(--accent-primary)',
                    zIndex: 3,
                    filter: 'blur(1px)'
                  }}
                />
              ))}
              
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0 bg-gradient-radial from-transparent to-[var(--background-primary)] opacity-80"
                style={{
                  background: `radial-gradient(circle, rgba(15,23,42,0) 0%, rgba(15,23,42,1) 80%)`,
                  zIndex: 4
                }}
              />
            </div>

            {/* Main Content with Parallax Effects */}
            <div 
              ref={contentRef} 
              className="relative text-center z-10"
              style={{
                transform: `translateY(${scrollProgress * -50}px)`,
                opacity: 1 - scrollProgress * 0.8
              }}
            >
              {/* Enhanced Logo Container */}
              <div ref={logoRef} className="mb-16">
                <div className="relative w-48 h-48 mx-auto">
                  {/* Rotating Rings */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="logo-ring absolute inset-0"
                        style={{
                          border: '1px solid var(--accent-primary)',
                          borderRadius: '50%',
                          rotate: `${i * 60}deg`,
                          opacity: 0.15
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Glowing Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, rgba(96,165,250,0.15) 0%, rgba(15,23,42,0) 70%)`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Logo Icon with 3D Effect */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(96,165,250,0.3))'
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                      rotateY: [0, 5, 0],
                      rotateX: [0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <BrainCog className="w-28 h-28 text-[var(--accent-primary)]" />
                  </motion.div>
                </div>
              </div>

              {/* Company Name with Modern Typography Effects */}
              <motion.h1
                className="text-6xl font-bold mb-6"
                style={{ 
                  opacity: 1 - scrollProgress,
                  filter: `blur(${scrollProgress * 4}px)`
                }}
              >
                <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                  TechnicIA
                </span>
              </motion.h1>
              
              {/* Tagline with Dynamic Fade based on Scroll */}
              <motion.p
                className="text-xl text-[var(--text-secondary)] mb-8 max-w-lg mx-auto"
                style={{ 
                  opacity: 1 - scrollProgress * 1.5,
                  transform: `translateY(${scrollProgress * 30}px)`
                }}
              >
                {t('description')}
              </motion.p>
              
              {/* CTA Button with Hover Effects */}
              <motion.button
                className="px-8 py-3 bg-[var(--accent-primary)] text-white rounded-lg font-medium hover:bg-[var(--accent-secondary)] transition-colors duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{ 
                  opacity: 1 - scrollProgress * 2,
                  transform: `translateY(${scrollProgress * 50}px)`
                }}
                onClick={() => handleTransitionOut()}
              >
                {t('explore')}
              </motion.button>

              {/* Enhanced Scroll Indicator */}
              <motion.div
                ref={scrollIndicatorRef}
                className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
                style={{ opacity: 1 - scrollProgress * 3 }}
              >
                <motion.p
                  className="text-[var(--text-secondary)] text-sm mb-4"
                >
                  {t('scroll')}
                </motion.p>
                <div className="relative flex justify-center">
                  <motion.div
                    className="scroll-arrow"
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowDown className="w-6 h-6 text-[var(--accent-primary)]" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Transition Overlay with Enhanced Effects */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-40 pointer-events-none opacity-0 bg-[var(--accent-primary)]"
        style={{
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
        }}
      />
      
      {/* Add CSS for custom effects */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
          100% { opacity: 0.2; transform: scale(1); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </AnimatePresence>
  );
}