import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import JarvisHologram from './JarvisHologram';

gsap.registerPlugin(ScrollTrigger);

const WhoAmI = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const textElementsRef = useRef<HTMLParagraphElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%',
        end: 'bottom 10%',
        once: true
      }
    });

    // Title animation - slower and smoother
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
    );

    // Content animations - slower and smoother
    tl.fromTo(leftContentRef.current, 
      { opacity: 0, x: -60, rotationY: -10, scale: 0.9 },
      { opacity: 1, x: 0, rotationY: 0, scale: 1, duration: 1.0, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(rightContentRef.current, 
      { opacity: 0, x: 60, scale: 0.85, rotationY: 10 },
      { opacity: 1, x: 0, scale: 1, rotationY: 0, duration: 1.0, ease: 'power3.out' },
      '-=0.8'
    );

    // Text reveal - scroll-triggered with typewriter effect
    textElementsRef.current.forEach((textElement, index) => {
      if (!textElement) return;
      
      gsap.fromTo(textElement, 
        { 
          opacity: 0, 
          y: 30, 
          scale: 0.95,
          clipPath: "inset(0 100% 0 0)"
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 1.0, 
          delay: index * 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textElement,
            start: 'top 80%',
            end: 'bottom 20%',
            once: true
          }
        }
      );
    });



    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} id="about" className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 py-8 md:py-16 px-4 sm:px-6 md:px-8 bg-black relative overflow-hidden">
    <div ref={rightContentRef} className="w-full md:w-[45%] h-96 md:h-[40rem] mb-6 md:mb-0 flex items-center justify-center relative">
      <JarvisHologram />
    </div>
    <div ref={leftContentRef} className="w-full md:w-[55%] space-y-4 md:space-y-6 font-techmono px-2 md:px-4 text-left">
      <h1 ref={titleRef} className="font-orbitron capitalize text-jarvis-accent text-shadow-neon text-2xl md:text-3xl font-bold text-center mb-6">
        Who am i
      </h1>
      <div className="space-y-3 md:space-y-4">
        <p 
          ref={el => { if (el) textElementsRef.current[0] = el; }}
          className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-techmono mx-auto transition-colors duration-300 hover:text-white"
        >
          I&apos;m <span className="text-jarvis-accent font-semibold">Mithun Jeromme</span> — a full-stack developer, AI engineer, and relentless creator who thrives on crafting cool, impactful stuff. From Chrome extensions that streamline my own workflow to AI-powered bots that empower farmers with data-driven decisions, I build products that spark joy, solve problems, and leave a lasting impression.
        </p>
        <p 
          ref={el => { if (el) textElementsRef.current[1] = el; }}
          className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-techmono mx-auto transition-colors duration-300 hover:text-white"
        >
          My expertise lies at the intersection of <span className="text-jarvis-accent">AI/ML, embedded systems, and modern web development</span>. I don&apos;t just write code—I architect intelligent systems that transform how people live and work.
        </p>
        <p 
          ref={el => { if (el) textElementsRef.current[2] = el; }}
          className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-techmono mx-auto transition-colors duration-300 hover:text-white"
        >
          My work is driven by a passion for <span className="text-jarvis-accent">measurable impact and user-centered design</span>. I&apos;m obsessed with building products that make life easier, smarter, and more exciting.
        </p>
        <p 
          ref={el => { if (el) textElementsRef.current[3] = el; }}
          className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-techmono mx-auto transition-colors duration-300 hover:text-white"
        >
          Every line of code I write is a step toward <span className="text-jarvis-accent">solving complex challenges</span> and creating experiences that stick with users long after they&apos;ve logged off.
        </p>
        <p 
          ref={el => { if (el) textElementsRef.current[4] = el; }}
          className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-techmono mx-auto transition-colors duration-300 hover:text-white"
        >
          <span className="text-jarvis-accent font-semibold">Let&apos;s build something unforgettable together.</span>
        </p>
      </div>
      <div className="animate-fade-in" style={{ animationDelay: '900ms' }}>
        <a 
          href="/resume/mithurn resume.pdf" 
          target="_blank"
          className="inline-block w-auto px-3 py-2 md:px-4 md:py-2 bg-transparent text-jarvis-accent border border-jarvis-accent font-orbitron 
                   hover:bg-jarvis-accent hover:text-jarvis-bg2 hover:shadow-[0_0_20px_rgba(156,229,231,0.6)] hover:scale-105 focus:scale-105 transition-all transition-transform duration-300 rounded-md text-[9px] sm:text-xs md:text-base shadow-neon text-left focus-visible:ring-2 focus-visible:ring-jarvis-accent min-h-[44px] min-w-[44px] flex items-center justify-center hoverable"
        >
          Download Resume
        </a>
      </div>
    </div>
  </div>
  );
};

export default WhoAmI; 