import React, { useState, useEffect } from 'react';

const Footer = ({ copyrightRef }: { copyrightRef: React.Ref<HTMLParagraphElement> }) => {
  return (
    <div className="relative w-full mt-8 md:mt-0">
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-left">
          <div className="space-y-4">
            <h3 className="font-orbitron text-jarvis-accent text-[8px] sm:text-xs md:text-base mb-4 text-left font-bold tracking-wide uppercase text-shadow-neon">Navigation</h3>
            <div className="flex flex-col space-y-2 gap-2 text-left">
              {['about', 'skills', 'history', 'projects'].map((section) => (
                <button
                  key={section}
                  className="font-techmono font-bold uppercase text-body hover:text-jarvis-accent hover:text-shadow-neon hover:scale-105 transition-all duration-200 text-left text-xs sm:text-sm md:text-xl tracking-wide focus:outline-none focus:text-jarvis-accent"
                  onClick={() => {
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-orbitron text-jarvis-accent text-[8px] sm:text-xs md:text-base mb-4 -ml-1 text-left font-bold tracking-wide uppercase text-shadow-neon">Contact</h3>
            <div className="space-y-3 gap-2 text-left">
              <a href="https://www.linkedin.com/in/mithurn-jeromme-s-k" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-white transition-all duration-200 justify-start group hover:text-jarvis-accent hover:text-shadow-neon hover:scale-105 focus:text-jarvis-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="font-techmono text-body text-xs sm:text-sm md:text-base tracking-wide">Mithurn Jeromme</span>
              </a>

              <a href="https://github.com/Mithurn" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-white transition-all duration-200 justify-start group hover:text-jarvis-accent hover:text-shadow-neon hover:scale-105 focus:text-jarvis-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                <span className="font-techmono text-body group-hover:text-jarvis-accent group-hover:text-shadow-neon group-hover:scale-105 transition-all duration-200 text-xs sm:text-sm md:text-base tracking-wide lowercase">github.com/Mithurn</span>
              </a>
              <a href="mailto:mithurnjeromme172@email.com" className="flex items-center space-x-2 text-white transition-all duration-200 justify-start group hover:text-jarvis-accent hover:text-shadow-neon hover:scale-105 focus:text-jarvis-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span className="font-techmono text-body group-hover:text-jarvis-accent group-hover:text-shadow-neon group-hover:scale-105 transition-all duration-200 text-xs sm:text-sm md:text-base tracking-wide lowercase">mithurnjeromme172@email.com</span>
              </a>
            </div>
          </div>
          <div className="flex items-start md:justify-end">
            <div className="md:w-64 w-52 h-52 md:shadow-[0_0_15px_0_rgba(156,229,231,0.3)] backdrop-blur-sm p-4 transition-colors relative flex flex-col justify-center items-start font-techmono">
              <AnimatedFooterTerminal />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-[#9CE5E7]/20">
          <p ref={copyrightRef} className="text-center text-white/40 font-orbitron text-[4px] sm:text-[7px] md:text-xs leading-none">© 2025 Mithurn Jeromme. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

function AnimatedFooterTerminal() {
  const commands = [
    { cmd: 'whoami', out: 'Mithurn Jeromme' },
    { cmd: 'about', out: 'Full-Stack Dev | AI/ML | I build cool stuff' },
    { cmd: 'skills', out: 'JS, Python, C++, Next.js, ML, CV' },
    { cmd: 'projects', out: 'RAKT-RADAR, Krishi Rakshak, Prompter AI' },
    { cmd: 'mywork', out: 'Upwork, Schedula' },
    { cmd: 'contact', out: 'mithurnjeromme172@email.com' },
  ];
  const [index, setIndex] = useState(0);
  const [typedCmd, setTypedCmd] = useState('');
  const [typedOut, setTypedOut] = useState('');
  const [phase, setPhase] = useState('cmd'); // 'cmd' | 'out' | 'wait'

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
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
    <div className="font-techmono text-jarvis-accent text-base w-full h-full flex flex-col justify-center items-start">
      <span className="w-full text-left">&gt; <span className="text-jarvis-accent">{typedCmd}</span><span className="text-jarvis-accent animate-blink">{phase === 'cmd' && '_'}</span></span>
      <span className="text-jarvis-text w-full text-left">{typedOut}{phase === 'out' && <span className="text-jarvis-accent animate-blink">_</span>}</span>
    </div>
  );
}

export default Footer; 