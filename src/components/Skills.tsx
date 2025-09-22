import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Skill = {
  name: string;
  icon: React.ReactNode | string;
};

type SkillsCategory = {
  [category: string]: Skill[];
};

type SkillsProps = {
  skills: SkillsCategory;
};

const categoryLabels: { [key: string]: string } = {
  fullstack: 'Full Stack',
  aiml: 'AI/ML',
  embedded: 'Embedded',
  tools: 'Tools',
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillCategoriesRef = useRef<HTMLDivElement[]>([]);
  const skillItemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%',
        end: 'bottom 10%',
        scrub: 1
      }
    });

    // Super fast title animation
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 15, scale: 0.99 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
    );

    // Super fast skill categories
    tl.fromTo(skillCategoriesRef.current, 
      { opacity: 0, y: 20, scale: 0.99 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.4, 
        stagger: 0.1, 
        ease: 'power3.out' 
      },
      '-=0.2'
    );

    // Super fast skill items
    tl.fromTo(skillItemsRef.current, 
      { opacity: 0, scale: 0.9, rotation: 45 },
      { 
        opacity: 1, 
        scale: 1, 
        rotation: 0, 
        duration: 0.4, 
        stagger: 0.05, 
        ease: 'power3.out' 
      },
      '-=0.4'
    );

    // Add hover effects to skill items
    skillItemsRef.current.forEach(item => {
      if (!item) return;

      const handleMouseEnter = () => {
        gsap.to(item, {
          scale: 1.1,
          rotation: 5,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(item, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        item.removeEventListener('mouseenter', handleMouseEnter);
        item.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [skills]);

  return (
    <div ref={sectionRef} id="skills" className="relative w-full bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8">
      <div className="w-full flex flex-col items-center mb-6 md:mb-8">
        <h1 ref={titleRef} className="font-orbitron capitalize text-jarvis-accent text-shadow-neon text-2xl md:text-3xl font-bold text-center mb-6">
          Skills
        </h1>
      </div>
      <div className="flex flex-col gap-8 md:gap-12 w-full">
        {Object.entries(skills).map(([category, skillList], categoryIndex) => (
          <div 
            key={category} 
            ref={el => { if (el) skillCategoriesRef.current[categoryIndex] = el; }}
            className="w-full"
          >
            <h2 className="font-orbitron text-jarvis-accent text-lg md:text-xl font-semibold mb-4 md:mb-6 text-left tracking-wide capitalize">
              {categoryLabels[category] || category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {skillList.map((skill, index) => (
                <div 
                  key={index} 
                  ref={el => { if (el) skillItemsRef.current.push(el); }}
                  className="group flex flex-col items-center justify-center p-3 md:p-4 font-techmono transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-jarvis-bg2 border border-jarvis-accent/40 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:border-jarvis-accent group-hover:shadow-[0_0_20px_rgba(156,229,231,0.4)] transition-all duration-300 shadow-neon text-lg sm:text-xl md:text-2xl mb-2 md:mb-3">
                    {typeof skill.icon === 'string' ? (
                      <span className="font-bold text-white">{skill.icon}</span>
                    ) : (
                      skill.icon
                    )}
                  </div>
                  <p className="text-jarvis-text group-hover:text-jarvis-accent transition-colors duration-300 font-roboto text-xs sm:text-sm md:text-base text-center font-medium">
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills; 