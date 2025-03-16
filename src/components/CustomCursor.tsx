import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        cursorRef.current?.classList.add('cursor-hover');
        cursorOuterRef.current?.classList.add('cursor-hover');
      }
    };

    const handleMouseOut = () => {
      cursorRef.current?.classList.remove('cursor-hover');
      cursorOuterRef.current?.classList.remove('cursor-hover');
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="custom-cursor"
        animate={{
          x: x - 5,
          y: y - 5,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        ref={cursorOuterRef}
        className="custom-cursor-outer"
        animate={{
          x: x - 20,
          y: y - 20,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </>
  );
}