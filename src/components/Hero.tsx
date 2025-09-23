import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TextCursor from './TextCursor';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = '"Just A Rather Very Intelligent System"';
  const typingSpeed = 50; // milliseconds per character
  
  // Refs for GSAP animations
  const heroRef = useRef<HTMLDivElement>(null);
  const jarvisLinesRef = useRef<HTMLDivElement[]>([]);
  const taglineRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const hologramRef = useRef<HTMLDivElement>(null);


  // GSAP Animation Timeline
  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });
    
    // Set initial states - completely hidden for blank screen
    gsap.set(jarvisLinesRef.current, { 
      opacity: 0, 
      y: 100, 
      scale: 0.8,
      visibility: "hidden",
      display: "none"
    });
    gsap.set(taglineRef.current, { opacity: 0, y: 50, scale: 0.8, visibility: "hidden" });
    gsap.set(cursorRef.current, { opacity: 0, scale: 0, visibility: "hidden" });
    gsap.set(glowRef.current, { opacity: 0, scale: 1.2 });
    gsap.set(ambientGlowRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(hologramRef.current, { opacity: 0, rotationY: 180 });

    // Ambient background glow first
    tl.to(ambientGlowRef.current, {
      opacity: 0.3,
      scale: 1,
      duration: 2,
      ease: "power2.out"
    });

    // Hologram scan effect
    tl.to(hologramRef.current, {
      opacity: 0.1,
      rotationY: 0,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1.5");

    // Staggered JARVIS ASCII art reveal - simplified
    tl.to(jarvisLinesRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      visibility: "visible",
      display: "block",
      duration: 1.0,
      stagger: 0.15,
      ease: "back.out(1.4)",
      onComplete: () => {
        // Start typing effect immediately
        startTypingEffect();
      }
    });

    // Enhanced glow effects
    tl.to(jarvisLinesRef.current, {
      textShadow: "0 0 20px #9CE5E7, 0 0 40px #9CE5E7, 0 0 60px #9CE5E7, 0 0 80px #9CE5E7",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.1
    }, "-=1.0");

    // Power-on glow effect
    tl.to(glowRef.current, {
      opacity: 0.4,
      scale: 1,
      duration: 2,
      ease: "power2.out"
    }, "-=1.5");

    // Tagline reveal with bounce
    tl.to(taglineRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      visibility: "visible",
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5");

    // Cursor reveal
    tl.to(cursorRef.current, {
      opacity: 1,
      scale: 1,
      visibility: "visible",
      duration: 0.4,
      ease: "back.out(2)"
    }, "-=0.3");

    // Continuous ambient effects - simplified
    tl.to(jarvisLinesRef.current, {
      textShadow: "0 0 20px #9CE5E7, 0 0 40px #9CE5E7",
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    }, "-=0.5");

    return () => {
      tl.kill();
      // Clear any running intervals
      if (window.typeInterval) {
        clearInterval(window.typeInterval);
      }
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
        window.typeInterval = null;
      }
    }, typingSpeed);

    window.typeInterval = typeInterval;
  };

  // Enhanced cursor blinking with GSAP
  useEffect(() => {
    if (!cursorRef.current) return;

    const cursorTl = gsap.timeline({ repeat: -1 });
    cursorTl.to(cursorRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "power2.inOut"
    }).to(cursorRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.inOut"
    });

    return () => {
      cursorTl.kill();
    };
  }, []);

  // Hover effects for JARVIS lines
  const handleJarvisHover = (lineIndex: number, isHovering: boolean) => {
    const line = jarvisLinesRef.current[lineIndex];
    if (!line) return;

    if (isHovering) {
      gsap.to(line, {
        scale: 1.05,
        rotationX: 5,
        rotationY: 5,
        textShadow: "0 0 30px #9CE5E7, 0 0 60px #9CE5E7, 0 0 90px #9CE5E7, 0 0 120px #9CE5E7",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(line, {
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        textShadow: "0 0 20px #9CE5E7, 0 0 40px #9CE5E7, 0 0 60px #9CE5E7, 0 0 80px #9CE5E7",
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  return (
    <div ref={heroRef} className="h-screen flex flex-col items-center justify-center overflow-hidden relative z-10 text-center">
      {/* Ambient glow background */}
      <div ref={ambientGlowRef} className="absolute inset-0 bg-gradient-radial from-[#9CE5E7]/10 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Hologram scan effect */}
      <div ref={hologramRef} className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9CE5E7]/5 to-transparent pointer-events-none transform-gpu" 
           style={{ 
             background: 'linear-gradient(90deg, transparent 0%, rgba(156, 229, 231, 0.1) 50%, transparent 100%)',
             clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
           }}>
      </div>
      
      
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
      
      <pre className="font-mono text-[#9CE5E7] whitespace-pre text-[10px] sm:text-xs md:text-xl lg:text-2xl pb-0 md:pb-10 pl-0 text-center flex flex-col items-center justify-center relative z-10" style={{ perspective: '1000px' }}>
        {/* Empty line */}
        <div style={{textShadow: 'rgb(200, 200, 200) 0px 0px 10px'}}>
          {`                                              `}
        </div>
        
        {/* JARVIS ASCII Art with enhanced GSAP animations */}
        <div 
          ref={el => { if (el) jarvisLinesRef.current[0] = el; }}
          className="jarvis-line cursor-pointer"
          style={{ display: 'none', visibility: 'hidden', opacity: 0 }}
          onMouseEnter={() => handleJarvisHover(0, true)}
          onMouseLeave={() => handleJarvisHover(0, false)}
        >
          {`     ██╗ █████╗ ██████╗ ██╗   ██╗██╗███████╗`}
        </div>
        <div 
          ref={el => { if (el) jarvisLinesRef.current[1] = el; }}
          className="jarvis-line cursor-pointer"
          style={{ display: 'none', visibility: 'hidden', opacity: 0 }}
          onMouseEnter={() => handleJarvisHover(1, true)}
          onMouseLeave={() => handleJarvisHover(1, false)}
        >
          {`     ██║██╔══██╗██╔══██╗██║   ██║██║██╔════╝`}
        </div>
        <div 
          ref={el => { if (el) jarvisLinesRef.current[2] = el; }}
          className="jarvis-line cursor-pointer"
          style={{ display: 'none', visibility: 'hidden', opacity: 0 }}
          onMouseEnter={() => handleJarvisHover(2, true)}
          onMouseLeave={() => handleJarvisHover(2, false)}
        >
          {`     ██║███████║██████╔╝██║   ██║██║███████╗`}
        </div>
        <div 
          ref={el => { if (el) jarvisLinesRef.current[3] = el; }}
          className="jarvis-line cursor-pointer"
          style={{ display: 'none', visibility: 'hidden', opacity: 0 }}
          onMouseEnter={() => handleJarvisHover(3, true)}
          onMouseLeave={() => handleJarvisHover(3, false)}
        >
          {`██   ██║██╔══██║██╔══██╗╚██╗ ██╔╝██║╚════██║`}
        </div>
        <div 
          ref={el => { if (el) jarvisLinesRef.current[4] = el; }}
          className="jarvis-line cursor-pointer"
          style={{ display: 'none', visibility: 'hidden', opacity: 0 }}
          onMouseEnter={() => handleJarvisHover(4, true)}
          onMouseLeave={() => handleJarvisHover(4, false)}
        >
          {`╚█████╔╝██║  ██║██║  ██║ ╚████╔╝ ██║███████║`}
        </div>
        <div 
          ref={el => { if (el) jarvisLinesRef.current[5] = el; }}
          className="jarvis-line cursor-pointer"
          style={{ display: 'none', visibility: 'hidden', opacity: 0 }}
          onMouseEnter={() => handleJarvisHover(5, true)}
          onMouseLeave={() => handleJarvisHover(5, false)}
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
        <div ref={taglineRef} className="text-white font-techmono text-[11px] sm:text-xs md:text-lg text-center p-1 md:p-2 relative" style={{ visibility: 'hidden', opacity: 0 }}>
          <span className="animate-flicker">{typedText}</span>
          <span ref={cursorRef} className="ml-1 text-[#9CE5E7] font-bold" style={{ visibility: 'hidden', opacity: 0 }}>|</span>
        </div>
      </pre>
      
      {/* Enhanced Power-on glow effect with multiple layers */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9CE5E7]/8 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-radial from-[#9CE5E7]/5 via-transparent to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;
