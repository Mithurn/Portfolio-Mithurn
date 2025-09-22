import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type WorkHistory = {
  company: React.ReactNode;
  role: React.ReactNode;
  period: string;
  location: string;
  image?: string;
  achievements: string[];
  technologies: string[];
  projectLink?: string;
};

type ExperienceProps = {
  workHistory: WorkHistory[];
};

const Experience: React.FC<ExperienceProps> = ({ workHistory }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const experienceCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none none'
      }
    });

    // Title animation - simple fade + slideUp
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    // Experience cards - simple fade + slideUp (staggered)
    tl.fromTo(experienceCardsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      '-=0.3'
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [workHistory]);

  return (
    <div ref={sectionRef} id="history" className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 md:px-8 bg-black relative overflow-hidden">
    <h1 ref={titleRef} className="font-orbitron text-jarvis-accent text-shadow-neon text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
      History
    </h1>
    
    {/* Scroll Indicator */}
    <div className="flex justify-center mb-8 animate-bounce">
      <div className="flex flex-col items-center text-jarvis-accent/60 text-sm font-techmono">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className="animate-pulse"
        >
          <path d="M7 13l5 5 5-5"/>
          <path d="M7 6l5 5 5-5"/>
        </svg>
        <span className="mt-1 opacity-70 text-xs">Scroll to explore experience</span>
      </div>
    </div>
    
    <div className="w-full max-w-7xl space-y-8 md:space-y-16">
      {workHistory.map((job, index) => (
        <div 
          key={index} 
          ref={el => { if (el) experienceCardsRef.current[index] = el; }}
          className="flex flex-col lg:flex-row gap-6 md:gap-10 items-center justify-center font-techmono mx-1 sm:mx-4 relative"
        >
          {/* Timeline Connector Line */}
          {index < workHistory.length - 1 && (
            <div 
              className="absolute left-1/2 top-full w-px h-8 bg-gradient-to-b from-jarvis-accent/40 to-transparent hidden lg:block"
              style={{
                boxShadow: '0px 0px 5px rgba(156, 229, 231, 0.3)',
                animation: 'pulse 2s ease-in-out infinite'
              }}
            />
          )}
          
          <div className={`w-full md:w-[200px] lg:w-[500px] ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}> 
            {job.projectLink ? (
              <a
                href={job.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full min-h-[60px] md:h-64 bg-jarvis-bg2 border border-jarvis-accent/30 rounded-xl flex flex-col items-center justify-center p-2 md:p-6 gap-1 md:gap-3 shadow-neon font-techmono transition-all duration-300 hover:border-jarvis-accent/50 hover:shadow-[0_0_20px_rgba(156,229,231,0.3)] hover:scale-105 cursor-pointer group"
              >
                {job.image && (
                  <img src={job.image} alt={typeof job.company === 'string' ? job.company : undefined} className="h-10 md:h-24 w-auto object-contain mb-1 md:mb-2 rounded shadow transition-transform duration-300 group-hover:scale-110" />
                )}
                <div className="text-jarvis-accent font-orbitron text-center text-shadow-neon w-full">
                  <div className="font-semibold text-base sm:text-lg md:text-xl font-orbitron text-jarvis-accent text-shadow-neon text-center w-full group-hover:text-jarvis-accent transition-colors duration-300">{job.company}</div>
                  <div className="font-semibold text-base sm:text-lg md:text-xl font-orbitron text-jarvis-text text-center w-full group-hover:text-white transition-colors duration-300">{job.role}</div>
                </div>
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-jarvis-accent text-xs font-techmono">View Project →</span>
                </div>
              </a>
            ) : (
              <div className="w-full min-h-[60px] md:h-64 bg-jarvis-bg2 border border-jarvis-accent/30 rounded-xl flex flex-col items-center justify-center p-2 md:p-6 gap-1 md:gap-3 shadow-neon font-techmono transition-all duration-300 hover:border-jarvis-accent/50 hover:shadow-[0_0_20px_rgba(156,229,231,0.3)]">
                {job.image && (
                  <img src={job.image} alt={typeof job.company === 'string' ? job.company : undefined} className="h-10 md:h-24 w-auto object-contain mb-1 md:mb-2 rounded shadow transition-transform duration-300 hover:scale-105" />
                )}
                <div className="text-jarvis-accent font-orbitron text-center text-shadow-neon w-full">
                  <div className="font-semibold text-base sm:text-lg md:text-xl font-orbitron text-jarvis-accent text-shadow-neon text-center w-full">{job.company}</div>
                  <div className="font-semibold text-base sm:text-lg md:text-xl font-orbitron text-jarvis-text text-center w-full">{job.role}</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Center Timeline Dot - REMOVED */}
          {/* <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 w-3 h-3 bg-jarvis-accent rounded-full border-2 border-black shadow-neon hidden lg:block z-10" /> */}
          
          <div className={`flex-1 p-3 sm:p-4 md:p-6 cursor-default ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} font-techmono text-left bg-jarvis-bg2 rounded-xl shadow-neon transition-all duration-300 hover:shadow-[0_0_25px_rgba(156,229,231,0.2)]`}>
            <div className="mb-2 md:mb-4">
              <h2 className="text-base sm:text-lg md:text-2xl font-orbitron font-bold text-jarvis-accent mb-2 md:mb-3 text-shadow-neon text-left uppercase transition-colors duration-300 hover:text-jarvis-secondary">
                {job.company}
              </h2>
              <h3 className="text-sm sm:text-base md:text-xl font-orbitron font-bold text-jarvis-text mb-2 md:mb-3 text-left transition-colors duration-300 hover:text-white">
                {job.role}
              </h3>
              <p className="font-techmono text-gray-300 font-light leading-relaxed text-left text-xs sm:text-sm md:text-lg mb-2 md:mb-4">
                {job.period} | {job.location}
              </p>
            </div>
            <div className="space-y-4 md:space-y-8">
              <div className="mt-2 md:mt-4">
                <h4 className="font-techmono text-jarvis-accent text-xs sm:text-sm md:text-base capitalize mb-2 md:mb-3 text-left leading-none">
                  Achievements
                </h4>
                <ul className="list-disc list-outside ml-4 space-y-1 md:space-y-2 font-techmono text-left">
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-gray-300 font-techmono leading-relaxed text-left text-xs sm:text-sm md:text-base transition-colors duration-300 hover:text-white">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2 md:mt-4">
                <h4 className="font-techmono cursor-default text-jarvis-accent text-xs sm:text-sm md:text-base capitalize mb-2 md:mb-3 text-left leading-none">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1 md:gap-2 text-left mt-2 md:mt-2">
                  {job.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="px-1.5 sm:px-2 md:px-4 py-0.5 md:py-1.5 rounded-full cursor-default font-techmono bg-jarvis-bg2 border border-jarvis-accent/40 text-jarvis-accent text-xs sm:text-sm md:text-base shadow-neon text-left transition-all duration-300 hover:border-jarvis-accent hover:shadow-[0_0_15px_rgba(156,229,231,0.6)] hover:scale-105 animate-fade-in"
                      style={{ animationDelay: `${(index * 200) + (techIndex * 30)}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Experience; 