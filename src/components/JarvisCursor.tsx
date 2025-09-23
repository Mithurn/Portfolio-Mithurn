'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const JarvisCursor = () => {
  const bigBallRef = useRef<HTMLDivElement>(null);
  const smallBallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bigBall = bigBallRef.current;
    const smallBall = smallBallRef.current;

    if (!bigBall || !smallBall) return;

    // Get all hoverable elements
    const hoverables = document.querySelectorAll('.hoverable, a, button, [role="button"]');

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(bigBall, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.4,
        ease: 'power2.out'
      });

      gsap.to(smallBall, {
        x: e.clientX - 5,
        y: e.clientY - 5,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    // Mouse enter handler for hoverables
    const handleMouseEnter = () => {
      gsap.to(bigBall, {
        scale: 2.5,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Add glow effect
      gsap.to(bigBall, {
        boxShadow: '0 0 20px #9CE5E7, 0 0 40px #9CE5E7',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    // Mouse leave handler for hoverables
    const handleMouseLeave = () => {
      gsap.to(bigBall, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Remove glow effect
      gsap.to(bigBall, {
        boxShadow: '0 0 5px #9CE5E7',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    
    hoverables.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      hoverables.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="jarvis-cursor">
      <div 
        ref={bigBallRef}
        className="cursor__ball cursor__ball--big"
      >
        <svg height="30" width="30">
          <circle 
            cx="15" 
            cy="15" 
            r="12" 
            strokeWidth="0"
            fill="#9CE5E7"
            opacity="0.8"
          />
        </svg>
      </div>
      
      <div 
        ref={smallBallRef}
        className="cursor__ball cursor__ball--small"
      >
        <svg height="10" width="10">
          <circle 
            cx="5" 
            cy="5" 
            r="4" 
            strokeWidth="0"
            fill="#9CE5E7"
            opacity="0.9"
          />
        </svg>
      </div>
    </div>
  );
};

export default JarvisCursor;
