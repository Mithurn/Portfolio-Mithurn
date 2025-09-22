import React from 'react';
import JarvisHologram from './JarvisHologram';

const WhoAmI = () => (
  <div id="about" className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 py-8 md:py-16 px-4 sm:px-6 md:px-8 bg-black relative overflow-hidden">
    {/* Subtle Background Animations */}
    <div className="absolute inset-0 pointer-events-none">
      {/* Floating Data Points */}
      <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-jarvis-accent/20 rounded-full animate-float" style={{animationDelay: '0s', animationDuration: '4s'}}></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-jarvis-accent/15 rounded-full animate-float" style={{animationDelay: '2s', animationDuration: '6s'}}></div>
      <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-jarvis-accent/25 rounded-full animate-float" style={{animationDelay: '4s', animationDuration: '5s'}}></div>
      
      {/* Subtle Grid Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <defs>
          <pattern id="aboutGrid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#9CE5E7" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#aboutGrid)" />
      </svg>
    </div>
    <div className="w-full md:w-[45%] h-96 md:h-[40rem] mb-6 md:mb-0 flex items-center justify-center animate-fade-in-up relative">
      <JarvisHologram />
    </div>
    <div className="w-full md:w-[55%] space-y-4 md:space-y-6 font-techmono px-2 md:px-4 text-left animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <h1 className="font-orbitron capitalize text-jarvis-accent text-shadow-neon text-2xl md:text-3xl font-bold text-center mb-6 animate-fade-in">
        Who am i
      </h1>
      <div className="space-y-3 md:space-y-4">
        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-techmono mx-auto transition-colors duration-300 hover:text-white animate-fade-in" style={{ animationDelay: '400ms' }}>
          I&apos;m <span className="text-jarvis-accent font-semibold">Mithurn Jeromme</span> — a full-stack developer and AI engineer who bridges the gap between cutting-edge technology and real-world impact. I specialize in building intelligent systems that don&apos;t just work, but transform how people interact with technology.
        </p>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-techmono mx-auto transition-colors duration-300 hover:text-white animate-fade-in" style={{ animationDelay: '500ms' }}>
          With expertise spanning <span className="text-jarvis-accent">AI/ML, embedded systems, and modern web development</span>, I&apos;ve delivered solutions that range from autonomous medical robots to AI-powered productivity platforms. My approach combines technical excellence with user-centered design.
        </p>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-techmono mx-auto transition-colors duration-300 hover:text-white animate-fade-in" style={{ animationDelay: '600ms' }}>
          As a <span className="text-jarvis-accent">freelance developer on Upwork</span>, I&apos;ve helped clients scale their digital presence and streamline operations. My projects consistently achieve high client satisfaction through clean code, robust architecture, and intuitive user experiences.
        </p>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-techmono mx-auto transition-colors duration-300 hover:text-white animate-fade-in" style={{ animationDelay: '700ms' }}>
          I&apos;m passionate about <span className="text-jarvis-accent">solving complex problems</span> and believe that the best code is the one that makes someone&apos;s life easier. Whether it&apos;s reducing hospital delivery times by 60% or helping farmers make data-driven decisions, I focus on measurable impact.
        </p>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-techmono mx-auto transition-colors duration-300 hover:text-white animate-fade-in" style={{ animationDelay: '800ms' }}>
          <span className="text-jarvis-accent font-semibold">I don&apos;t just write code.</span><br />
          I architect solutions, optimize performance, and create experiences that users love.
        </p>
      </div>
      <div className="animate-fade-in" style={{ animationDelay: '900ms' }}>
        <a 
          href="/resume/Mithurn_s_Resume.pdf" 
          target="_blank"
          className="inline-block w-auto px-3 py-2 md:px-4 md:py-2 bg-transparent text-jarvis-accent border border-jarvis-accent font-orbitron 
                   hover:bg-jarvis-accent hover:text-jarvis-bg2 hover:shadow-[0_0_20px_rgba(156,229,231,0.6)] hover:scale-105 focus:scale-105 transition-all transition-transform duration-300 rounded-md text-[9px] sm:text-xs md:text-base shadow-neon text-left focus-visible:ring-2 focus-visible:ring-jarvis-accent min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          Download Resume
        </a>
      </div>
    </div>
  </div>
);

export default WhoAmI; 