import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = '"Just A Rather Very Intelligent System"';
  const typingSpeed = 100; // milliseconds per character

  useEffect(() => {
    // Start typing right after the JARVIS ASCII art animation completes
    const startTyping = setTimeout(() => {
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
    }, 3500); // Start typing after 3.5 seconds (right after ASCII art completes)

    return () => clearTimeout(startTyping);
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530); // Blink every 530ms

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center overflow-hidden relative z-10 text-center">
      {/* Scan line effect */}
      <div className="absolute inset-0 animate-scan-line pointer-events-none"></div>
      <pre className="font-mono text-[#9CE5E7] whitespace-pre text-[10px] sm:text-xs md:text-xl lg:text-2xl pb-0 md:pb-10 pl-0 text-center flex flex-col items-center justify-center">
        {/* Empty line with delay */}
        <div className="animate-boot-up boot-delay-1 opacity-0" style={{textShadow: 'rgb(200, 200, 200) 0px 0px 10px'}}>
          {`                                              `}
        </div>
        {/* JARVIS ASCII Art - Custom, piOS-style, with spacing and symbols */}
        <div className="animate-boot-up boot-delay-2 opacity-0" style={{textShadow: '0 0 10px #9CE5E7, 0 0 20px #9CE5E7'}}>
          {`     ██╗ █████╗ ██████╗ ██╗   ██╗██╗███████╗`}
        </div>
        <div className="animate-boot-up boot-delay-3 opacity-0" style={{textShadow: '0 0 10px #9CE5E7, 0 0 20px #9CE5E7'}}>
          {`     ██║██╔══██╗██╔══██╗██║   ██║██║██╔════╝`}
        </div>
        <div className="animate-boot-up boot-delay-4 opacity-0" style={{textShadow: '0 0 10px #9CE5E7, 0 0 20px #9CE5E7'}}>
          {`     ██║███████║██████╔╝██║   ██║██║███████╗`}
        </div>
        <div className="animate-boot-up boot-delay-5 opacity-0" style={{textShadow: '0 0 10px #9CE5E7, 0 0 20px #9CE5E7'}}>
          {`██   ██║██╔══██║██╔══██╗╚██╗ ██╔╝██║╚════██║`}
        </div>
        <div className="animate-boot-up boot-delay-6 opacity-0" style={{textShadow: '0 0 10px #9CE5E7, 0 0 20px #9CE5E7'}}>
          {`╚█████╔╝██║  ██║██║  ██║ ╚████╔╝ ██║███████║`}
        </div>
        <div className="animate-boot-up boot-delay-7 opacity-0" style={{textShadow: '0 0 10px #9CE5E7, 0 0 20px #9CE5E7'}}>
          {` ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚══════╝`}
        </div>
        {/* Empty line with delay */}
        <div className="animate-boot-up boot-delay-8 opacity-0" style={{textShadow: 'rgb(200, 200, 200) 0px 0px 10px'}}>
          {`                                              `}
        </div>
        <div className="animate-boot-up boot-delay-8 opacity-0" style={{textShadow: 'rgb(200, 200, 200) 0px 0px 10px'}}>
          {``}
        </div>
        {/* Tagline with typing effect and blinking cursor */}
        <div className="text-white font-techmono animate-boot-up boot-delay-8 opacity-0 text-[11px] sm:text-xs md:text-lg text-center p-1 md:p-2 relative">
          <span className="animate-flicker">{typedText}</span>
          <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
        </div>
      </pre>
      {/* Power-on glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9CE5E7]/5 to-transparent animate-power-on opacity-0 pointer-events-none"></div>
    </div>
  );
};

export default Hero;
