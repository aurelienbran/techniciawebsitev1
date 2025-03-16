import React, { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const particles = gsap.utils.toArray('.particle');
    
    particles.forEach((particle: any) => {
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
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 bg-[var(--accent-primary)] rounded-full opacity-0"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}