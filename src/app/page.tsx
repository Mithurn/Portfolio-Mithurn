'use client';

import JarvisHologram from '../components/JarvisHologram';
import { User, Settings, Briefcase, FolderOpen } from 'lucide-react';
import Hero from '../components/Hero';
import WhoAmI from '../components/WhoAmI';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Footer from '../components/Footer';
import { SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiPostgresql, SiPython, SiHuggingface, SiCplusplus, SiArduino, SiEspressif, SiGit, SiVercel, SiPandas, SiReact, SiExpress, SiOpencv, SiVsco, SiPostman, SiLinux, SiFirebase, SiFigma, SiCodesandbox } from 'react-icons/si';
import PlatformIOIcon from '../components/PlatformIOIcon';
import VSCodeIcon from '../components/VSCodeIcon';
import React, { useRef, useEffect, useState } from 'react';
import SectionFadeIn from '../components/SectionFadeIn';

/** Add this to the top of the file or in your global CSS for flicker/scanline effect */
const navTooltipClass = `
  absolute left-1/2 -translate-x-1/2 bottom-12 px-3 py-1 rounded bg-black/90 border border-[#9CE5E7] text-[#9CE5E7] font-orbitron text-xs
  opacity-0 pointer-events-none group-hover:opacity-100 group-hover:animate-flicker group-hover:animate-glow
  transition-all duration-200 shadow-lg z-20
`;

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const copyrightRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);

  // Enhanced scroll-based navigation detection
  useEffect(() => {
    const sections = ['about', 'skills', 'history', 'projects'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (sections.includes(sectionId)) {
            // Set active section when it's mostly visible
            if (entry.intersectionRatio > 0.3) {
              setActiveSection(sectionId);
            }
          }
        });
      },
      { 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // More granular thresholds for smooth progress
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    // Observe all sections
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!copyrightRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(copyrightRef.current);
    return () => observer.disconnect();
  }, []);

  const skills = {
    fullstack: [
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'React', icon: <SiReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Express.js', icon: <SiExpress /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'SQL', icon: 'SQL' },
    ],
    aiml: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'Hugging Face', icon: <SiHuggingface /> },
      { name: 'Pandas', icon: <SiPandas /> },
      { name: 'OpenCV', icon: <SiOpencv /> },
    ],
    embedded: [
      { name: 'C++', icon: <SiCplusplus /> },
      { name: 'Arduino', icon: <SiArduino /> },
      { name: 'ESP32', icon: <SiEspressif /> },
      { name: 'PlatformIO', icon: <PlatformIOIcon className="w-8 h-8" /> },
    ],
    tools: [
      { name: 'Git', icon: <SiGit /> },
      { name: 'Vercel', icon: <SiVercel /> },
      { name: 'VS Code', icon: <VSCodeIcon className="w-8 h-8" /> },
      { name: 'Postman', icon: <SiPostman /> },
      { name: 'Linux', icon: <SiLinux /> },
      { name: 'Firebase', icon: <SiFirebase /> },
      { name: 'Arduino IDE', icon: <SiArduino /> },
      { name: 'Figma', icon: <SiFigma /> },
      { name: 'CodeSandbox', icon: <SiCodesandbox /> },
    ],
  };

  const workHistory = [
    {
      company: <span className="font-bold text-sm sm:text-base md:text-lg">Upwork</span>,
      role: <span className="font-bold text-sm sm:text-base md:text-lg">Freelance Full-Stack Developer</span>,
      period: '2023 – Present',
      location: 'Remote',
      image: '/images/upwork.png',
      achievements: [
        'Developed and deployed custom full-stack web applications with modern design and strong focus on user experience.',
        'Implemented robust backend systems using Node.js and PostgreSQL, integrated with responsive frontend interfaces built with Next.js and Tailwind CSS.',
        'Delivered highly functional, visually appealing websites tailored to client needs, improving their online presence and operational workflows.'
      ],
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS']
    },
    {
      company: <span className="font-bold text-sm sm:text-base md:text-lg">Pearl Thoughts</span>,
      role: <span className="font-bold text-sm sm:text-base md:text-lg">Frontend Developer Intern</span>,
      period: '2025',
      location: 'Remote',
      image: '/images/pearlthoughts.jpeg',
      achievements: [
        'Built core frontend features for Schedula – a revolutionary healthcare practice management platform that streamlines appointment scheduling and patient engagement.',
        'Developed responsive UI components and dashboards using Next.js and Tailwind CSS, ensuring accessibility and smooth experience across devices.',
        'Integrated booking APIs with frontend workflows to enable real-time schedule updates, multi-location management, and intelligent appointment alignment.',
        'Contributed to a platform that reduces patient wait times by 40% and increases patient satisfaction scores by 25% according to client feedback.'
      ],
      technologies: ['Next.js', 'Tailwind CSS', 'Node.js', 'Healthcare APIs'],
      projectLink: 'https://pearlthoughts.com/portfolio/schedula/'
    }
  ];
  

  const projects = [
    {
      name: 'RAKT-RADAR',
      description: 'AI-powered system to revolutionize blood management by predicting expiries and enabling smart redistribution across hospitals.',
      technologies: ['Python', 'Next.js', 'Node.js', 'FastAPI', 'PostgreSQL'],
      image: '/images/rakt-radar.png',
      link: 'https://www.youtube.com/watch?v=cMqdMMDhR3Q',
      github: 'https://github.com/Mithurn/RAKT-RADAR'
    },
    {
      name: 'Krishi Rakshak',
      description: 'AI-based solution to reduce farmer suicides using intelligent systems for healthcare, prediction, and diagnostics. Built in 36 hours at HackOrbit 2025.',
      technologies: ['Python', 'Hugging Face', 'NLP', 'Computer Vision'],
      image: '/images/farmer-bot.JPG',
      link: 'https://www.youtube.com/watch?v=mbrtD78GHZs',
      github: 'https://github.com/Mithurn/F22-Raptors-Saving-lifes-with-AI'
    },
    {
      name: 'Prompter AI',
      description: 'AI-powered productivity web app that converts natural language into structured task plans with secure authentication and dynamic UI.',
      technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      image: '/images/prompter-ai.png',
      link: 'https://prompter-ai-rev.vercel.app',
      github: 'https://github.com/Mithurn/Prompter-AI'
    },
    {
      name: 'Tamizh Kanini – Grammarly for Tamil',
      description: 'Chrome extension that works across all websites, offering instant grammar, spelling, and sentence corrections in Tamil — like Grammarly, but for Tamil.',
      technologies: ['React.js', 'Tailwind CSS', 'Python', 'FastAPI', 'Tamil LLaMA'],
      image: '/images/tamil-chrome.png',
      link: '',
      github: 'https://github.com/Mithurn/Tamizhathon-'
    }
  ];
  

  const navIcons = [
    { section: 'about', icon: <User size={24} /> },
    { section: 'skills', icon: <Settings size={24} /> },
    { section: 'history', icon: <Briefcase size={24} /> },
    { section: 'projects', icon: <FolderOpen size={24} /> },
  ];

  return (
    <div className="bg-black overflow-hidden relative">
      {/* Animated HUD Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial HUD Overlays */}
        <svg className="absolute top-1/4 left-1/4 w-96 h-96 opacity-20">
          <defs>
            <radialGradient id="hudGradient1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9CE5E7" stopOpacity="0.3"/>
              <stop offset="70%" stopColor="#9CE5E7" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="#9CE5E7" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="50%" cy="50%" r="45%" fill="none" stroke="url(#hudGradient1)" strokeWidth="1" opacity="0.6">
            <animate attributeName="r" values="45%;50%;45%" dur="4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0.3;0.6" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#9CE5E7" strokeWidth="0.5" opacity="0.4">
            <animate attributeName="r" values="35%;40%;35%" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="50%" cy="50%" r="25%" fill="none" stroke="#9CE5E7" strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" values="25%;30%;25%" dur="2s" repeatCount="indefinite"/>
          </circle>
        </svg>
        
        <svg className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-15">
          <defs>
            <radialGradient id="hudGradient2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9CE5E7" stopOpacity="0.2"/>
              <stop offset="70%" stopColor="#9CE5E7" stopOpacity="0.05"/>
              <stop offset="100%" stopColor="#9CE5E7" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="50%" cy="50%" r="40%" fill="none" stroke="url(#hudGradient2)" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="40%;45%;40%" dur="5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="50%" cy="50%" r="30%" fill="none" stroke="#9CE5E7" strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" values="30%;35%;30%" dur="4s" repeatCount="indefinite"/>
          </circle>
        </svg>
        
        {/* Radar Sweep Animation */}
        <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-10">
          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9CE5E7" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#9CE5E7" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#9CE5E7" strokeWidth="1" opacity="0.3"/>
          <circle cx="50%" cy="50%" r="30%" fill="none" stroke="#9CE5E7" strokeWidth="0.5" opacity="0.2"/>
          <circle cx="50%" cy="50%" r="15%" fill="none" stroke="#9CE5E7" strokeWidth="0.5" opacity="0.1"/>
          <line x1="50%" y1="50%" x2="50%" y2="5%" stroke="url(#radarGradient)" strokeWidth="2" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="8s" repeatCount="indefinite"/>
          </line>
        </svg>
        
                 {/* Particle System */}
         <div className="absolute inset-0">
           {/* REMOVED: Particle System */}
         </div>
         
         {/* Data Stream Lines */}
         <div className="absolute inset-0">
           {/* REMOVED: Data Stream Lines */}
         </div>
        
        {/* Grid Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#9CE5E7" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
        
                 {/* Corner HUD Elements */}
         {/* REMOVED: Corner HUD Elements (SVGs in all four corners) */}
        
        {/* Status Indicators */}
        {/* REMOVED: Status indicators for a cleaner look */}
        
        {/* Bottom Status Bar */}
        {/* REMOVED: Status bar for cleaner UI */}
      </div>

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <SectionFadeIn><WhoAmI /></SectionFadeIn>
      
      {/* Section Divider with Navigation Hint */}
      <div className="relative py-8">
        <div className="flex justify-center items-center">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-jarvis-accent/40 to-transparent"></div>
        </div>
      </div>
      
      <SectionFadeIn><Skills skills={skills} /></SectionFadeIn>
      
      {/* Section Divider with Navigation Hint */}
      <div className="relative py-8">
        <div className="flex justify-center items-center">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-jarvis-accent/40 to-transparent"></div>
        </div>
      </div>
      
      <SectionFadeIn><Experience workHistory={workHistory} /></SectionFadeIn>
      
      {/* Section Divider with Navigation Hint */}
      <div className="relative py-8">
        <div className="flex justify-center items-center">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-jarvis-accent/40 to-transparent"></div>
        </div>
      </div>
      
      <SectionFadeIn><Projects projects={projects} /></SectionFadeIn>
      <div className="section-divider mx-auto my-8 md:my-12" />

      {/* Navigation Dock (pios-eight.vercel.app style) */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 ${footerVisible ? 'hidden' : ''}`}>
        <div className="mx-2 flex max-w-full items-center" style={{height: '64px'}}>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-4 rounded-2xl border-jarvis-accent/30 border-2 pb-2 px-4 shadow-lg bg-black/40 backdrop-blur-lg" role="toolbar" aria-label="Application dock" style={{height: '64px'}}>
            {/* Tooltip Container - Positioned above the dock */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-jarvis-accent rounded-lg text-jarvis-accent text-xs font-techmono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[60] shadow-[0_0_20px_rgba(156,229,231,0.3)]">
              <span id="tooltip-text">About Me</span>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
            </div>
            {navIcons.map(({ section, icon }) => (
              <div
                key={section}
                tabIndex={0}
                className="relative inline-flex items-center justify-center rounded-2xl bg-[#060606] border-[#9CE5E7] border-2 shadow-md cursor-pointer transition-all duration-300 w-[50px] h-[50px] overflow-hidden min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-jarvis-accent focus:ring-offset-2 focus:ring-offset-black group"
                onClick={() => {
                  setActiveSection(section);
                  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={() => {
                  const tooltipText = document.getElementById('tooltip-text');
                  const tooltip = tooltipText?.parentElement;
                  if (tooltipText && tooltip) {
                    tooltipText.textContent = 
                      section === 'about' ? 'About Me' :
                      section === 'skills' ? 'Skills & Tech' :
                      section === 'history' ? 'Experience' :
                      section === 'projects' ? 'Projects' : '';
                    tooltip.classList.remove('opacity-0');
                    tooltip.classList.add('opacity-100');
                  }
                }}
                onMouseLeave={() => {
                  const tooltip = document.getElementById('tooltip-text')?.parentElement;
                  if (tooltip) {
                    tooltip.classList.remove('opacity-100');
                    tooltip.classList.add('opacity-0');
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveSection(section);
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <span className="transition-all duration-200" style={{color: activeSection === section ? '#9CE5E7' : '#fff'}}>
                    {icon}
                  </span>
                </div>
                
                {/* Animated HUD ring for active icon */}
                {activeSection === section && (
                  <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <svg width="48" height="48" className="animate-spin-slow" style={{filter: 'drop-shadow(0 0 8px #9CE5E7)'}}>
                      <circle cx="24" cy="24" r="20" fill="none" stroke="#9CE5E7" strokeWidth="2" strokeDasharray="8 8" opacity="0.5" />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Overall Progress Bar */}
        {/* REMOVED: Overall Progress Bar */}
      </div>

      {/* Footer */}
      <Footer copyrightRef={copyrightRef} />
    </div>
  );
}

// Animated Terminal Footer Component
function AnimatedFooterTerminal() {
  const commands = [
    { cmd: 'whoami', out: 'Mithurn Jeromme' },
    { cmd: 'about', out: 'Full-Stack Dev | AI/ML | Embedded' },
    { cmd: 'skills', out: 'JS, Python, C++, Next.js, ML, CV' },
    { cmd: 'projects', out: 'AI Medical Car, Krishi Rakshak, Prompter AI' },
    { cmd: 'mywork', out: 'Upwork, HackOrbit Finalist' },
    { cmd: 'contact', out: 'mithurnjeromme172@email.com' },
  ];
  const [index, setIndex] = useState(0);
  const [typedCmd, setTypedCmd] = useState('');
  const [typedOut, setTypedOut] = useState('');
  const [phase, setPhase] = useState('cmd'); // 'cmd' | 'out' | 'wait'

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    if (phase === 'cmd') {
      if (typedCmd.length < commands[index].cmd.length) {
        timeout = setTimeout(() => {
          setTypedCmd(commands[index].cmd.slice(0, typedCmd.length + 1));
        }, 50);
      } else {
        setPhase('out');
      }
    } else if (phase === 'out') {
      if (typedOut.length < commands[index].out.length) {
        timeout = setTimeout(() => {
          setTypedOut(commands[index].out.slice(0, typedOut.length + 1));
        }, 30);
      } else {
        timeout = setTimeout(() => {
          setPhase('wait');
        }, 2000);
      }
    } else if (phase === 'wait') {
      timeout = setTimeout(() => {
        setTypedCmd('');
        setTypedOut('');
        setPhase('cmd');
        setIndex((prev) => (prev + 1) % commands.length);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [typedCmd, typedOut, phase, index, commands]);

  return (
    <div className="font-techmono text-jarvis-accent text-base w-full h-full flex flex-col justify-center items-center">
      <span className="w-full text-left">&gt; <span className="text-jarvis-accent">{typedCmd}</span><span className="text-jarvis-accent animate-blink">{phase === 'cmd' && '_'}</span></span>
      <span className="text-gray-300 w-full text-left">{typedOut}{phase === 'out' && <span className="text-jarvis-accent animate-blink">_</span>}</span>
    </div>
  );
}
