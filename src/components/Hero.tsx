import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TextCursor from './TextCursor';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = '"Just A Rather Very Intelligent System"';
  const typingSpeed = 100; // milliseconds per character
  
  // Refs for GSAP animations
  const heroRef = useRef<HTMLDivElement>(null);
  const jarvisLinesRef = useRef<HTMLDivElement[]>([]);
  const taglineRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // GSAP Animation Timeline
  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();
    
    // Set initial states
    gsap.set(jarvisLinesRef.current, { 
      opacity: 0, 
      y: 50, 
      rotationX: 90,
      transformOrigin: "center bottom"
    });
    gsap.set(taglineRef.current, { opacity: 0, y: 30 });
    gsap.set(cursorRef.current, { opacity: 0 });
    gsap.set(glowRef.current, { opacity: 0 });

    // Staggered JARVIS ASCII art reveal with 3D effect
    tl.to(jarvisLinesRef.current, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.7)",
      onComplete: () => {
        // Start typing effect after ASCII art completes
        startTypingEffect();
      }
    }, "-=0.3");

    // Power-on glow effect
    tl.to(glowRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }, "-=0.5");

    // Tagline reveal
    tl.to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");

    // Cursor blinking
    tl.to(cursorRef.current, {
      opacity: 1,
      duration: 0.3
    }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, []);

  const startTypingEffect = () => {
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  };

  // Enhanced cursor blinking with GSAP
  useEffect(() => {
    if (!cursorRef.current) return;

    const cursorTl = gsap.timeline({ repeat: -1 });
    cursorTl.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    }).to(cursorRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut"
    });

    return () => {
      cursorTl.kill();
    };
  }, []);

  return (
    <div ref={heroRef} className="h-screen flex flex-col items-center justify-center overflow-hidden relative z-10 text-center">
      {/* TextCursor for Hero section only - positioned absolutely */}
      <div className="absolute inset-0 z-20">
        <TextCursor
          text="●"
          delay={0.01}
          spacing={60}
          followMouseDirection={true}
          randomFloat={true}
          exitDuration={0.4}
          removalInterval={25}
          maxPoints={8}
        />
      </div>
      
      <pre className="font-mono text-[#9CE5E7] whitespace-pre text-[10px] sm:text-xs md:text-xl lg:text-2xl pb-0 md:pb-10 pl-0 text-center flex flex-col items-center justify-center relative z-10">
        {/* Empty line */}
        <div style={{textShadow: 'rgb(200, 200, 200) 0px 0px 10px'}}>
          {`                                              `}
        </div>
        
        {/* JARVIS ASCII Art with GSAP refs */}
        <div 
          ref={el => { if (el) jarvisLinesRef.current[0] = el; }}
          style={{textShadow: '0 0 10px #9CE5E7, 0 0 20px #9CE5E7'}}
        >
          {`     ██╗ █████╗ ██████╗ ██╗   ██╗██╗███████╗`}
        </div>
        <div 
          ref={el => { if (el) jarvisLinesRef.current[1] = el; }}
          style={{textShadow: '0 0 10px #9CE5E7, 0 0 20px #9CE5E7'}}
        >
          {`     ██║██╔══██╗██╔══██╗██║   ██║██║██╔════╝`}
        </div>
        <div 
          ref={el => { if (el) jarvisLinesRef.current[2] = el; }}
          style={{textShadow: '0 0 10px #9CE5E7, 0 0 20px #9CE5E7'}}
        >
          {`     ██║███████║██████╔╝██║   ██║██║███████╗`}
        </div>
        <div 
          ref={el => { if (el) jarvisLinesRef.current[3] = el; }}
          style={{textShadow: '0 0 10px #9CE5E7, 0 0 20px #9CE5E7'}}
        >
          {`██   ██║██╔══██║██╔══██╗╚██╗ ██╔╝██║╚════██║`}
        </div>
        <div 
          ref={el => { if (el) jarvisLinesRef.current[4] = el; }}
          style={{textShadow: '0 0 10px #9CE5E7, 0 0 20px #9CE5E7'}}
        >
          {`╚█████╔╝██║  ██║██║  ██║ ╚████╔╝ ██║███████║`}
        </div>
        <div 
          ref={el => { if (el) jarvisLinesRef.current[5] = el; }}
          style={{textShadow: '0 0 10px #9CE5E7, 0 0 20px #9CE5E7'}}
        >
          {` ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚══════╝`}
        </div>
        
        {/* Empty line */}
        <div style={{textShadow: 'rgb(200, 200, 200) 0px 0px 10px'}}>
          {`                                              `}
        </div>
        <div>
          {``}
        </div>
        
        {/* Enhanced Tagline with GSAP */}
        <div ref={taglineRef} className="text-white font-techmono text-[11px] sm:text-xs md:text-lg text-center p-1 md:p-2 relative">
          <span className="animate-flicker">{typedText}</span>
          <span ref={cursorRef} className="ml-1 text-[#9CE5E7]">|</span>
        </div>
      </pre>
      
      {/* Enhanced Power-on glow effect */}
      <div ref={glowRef} className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9CE5E7]/5 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Hero;
