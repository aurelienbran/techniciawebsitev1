import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BrainCog } from 'lucide-react';
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(logoRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)"
    })
    .from(contentRef.current?.children || [], {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8
    }, "-=0.5")
    .from(scrollIndicatorRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5
    });

    // Animate particles
    gsap.utils.toArray('.intro-particle').forEach((particle: any) => {
      gsap.to(particle, {
        x: 'random(-100, 100, 5)',
        y: 'random(-100, 100, 5)',
        opacity: 'random(0.1, 0.3)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, []);

  const handleTransitionOut = () => {
    if (!containerRef.current || !overlayRef.current) return;

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
    // Scale and move the logo to its final navbar position
    .to(logoRef.current, {
      scale: 0.3,
      y: -window.innerHeight / 2 + 50,
      x: -window.innerWidth / 2 + 100,
      duration: 0.8,
      ease: "power2.inOut"
    })
    // Fade out the content
    .to(contentRef.current?.children || [], {
      y: -30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5
    }, "-=0.6")
    // Fade in the overlay
    .to(overlayRef.current, {
      opacity: 1,
      duration: 0.5
    }, "-=0.3")
    // Fade out the overlay
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

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let lastScrollTop = 0;
    let scrollDirection = 0;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight / 4;

      // Determine scroll direction
      scrollDirection = scrolled > lastScrollTop ? 1 : -1;
      lastScrollTop = scrolled;

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set new timeout to check if scrolling has stopped
      scrollTimeout = setTimeout(() => {
        if (scrolled > threshold && scrollDirection > 0) {
          window.removeEventListener('scroll', handleScroll);
          handleTransitionOut();
        }
      }, 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  return (
    <>
      <motion.div 
        ref={containerRef}
        className="fixed inset-0 z-50 bg-[var(--background-primary)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="min-h-[200vh]">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="intro-particle absolute w-1 h-1 bg-[var(--accent-primary)] rounded-full opacity-0"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            {/* Main Content */}
            <div ref={contentRef} className="relative text-center">
              {/* Logo Container */}
              <div ref={logoRef} className="mb-12">
                <div className="relative w-40 h-40 mx-auto">
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0"
                        style={{
                          border: '2px solid var(--accent-primary)',
                          borderRadius: '50%',
                          rotate: `${i * 60}deg`,
                          opacity: 0.2
                        }}
                      />
                    ))}
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <BrainCog className="w-24 h-24 text-[var(--accent-primary)]" />
                  </motion.div>
                </div>
              </div>

              {/* Company Name */}
              <motion.h1
                className="text-6xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                  TechnicIA
                </span>
              </motion.h1>

              {/* Scroll Indicator */}
              <motion.div
                ref={scrollIndicatorRef}
                className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <motion.p
                  className="text-[var(--text-secondary)] text-sm mb-4"
                  animate={{
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {t('scroll')}
                </motion.p>
                <motion.div
                  className="w-1 h-12 mx-auto bg-gradient-to-b from-[var(--accent-primary)] to-transparent rounded-full"
                  animate={{
                    scaleY: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Transition Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-40 pointer-events-none opacity-0 bg-[var(--accent-primary)]"
      />
    </>
  );
}