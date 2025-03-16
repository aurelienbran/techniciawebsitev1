import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    // Don't show custom cursor if user prefers reduced motion
    if (prefersReducedMotion) return;

    // Mouse move handler
    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'input' ||
        target.closest('button') || 
        target.closest('a') ||
        target.closest('input') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isInteractive);
    };

    // Mouse down/up handlers
    const mouseDown = () => setIsActive(true);
    const mouseUp = () => setIsActive(false);
    
    // Mouse leave/enter viewport
    const mouseLeave = () => setIsHidden(true);
    const mouseEnter = () => setIsHidden(false);

    // Attach event listeners
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('mouseleave', mouseLeave);
    document.addEventListener('mouseenter', mouseEnter);

    // Clean up event listeners
    return () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mousedown', mouseDown);
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mouseleave', mouseLeave);
      document.removeEventListener('mouseenter', mouseEnter);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [prefersReducedMotion]);

  // Don't render if user prefers reduced motion
  if (prefersReducedMotion) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isPointer ? 'pointer' : ''} ${isHidden ? 'hidden' : ''} ${isActive ? 'active' : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          opacity: isHidden ? 0 : 1
        }}
      />
      <style jsx>{`
        .custom-cursor {
          width: 20px;
          height: 20px;
          border: 2px solid var(--accent-primary);
          border-radius: 50%;
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9999;
          transform-origin: center;
          transition: width 0.2s, height 0.2s, border-color 0.2s, opacity 0.3s, border-width 0.2s;
          mix-blend-mode: exclusion;
        }
        
        .custom-cursor.pointer {
          width: 40px;
          height: 40px;
          border-color: var(--accent-secondary);
          margin-left: -20px;
          margin-top: -20px;
        }
        
        .custom-cursor.active {
          transform: translate(${position.x}px, ${position.y}px) scale(0.8);
          background-color: rgba(96, 165, 250, 0.15);
          width: 50px;
          height: 50px;
          margin-left: -25px;
          margin-top: -25px;
        }
        
        .custom-cursor.hidden {
          opacity: 0;
        }
        
        @media (max-width: 768px) {
          .custom-cursor {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;