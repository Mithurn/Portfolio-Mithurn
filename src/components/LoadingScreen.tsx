import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const loadingSteps = [
    { text: 'INITIALIZING JARVIS INTERFACE...', duration: 800 },
    { text: 'LOADING NEURAL NETWORKS...', duration: 600 },
    { text: 'CALIBRATING PARTICLE SYSTEMS...', duration: 700 },
    { text: 'ESTABLISHING SECURE CONNECTION...', duration: 500 },
    { text: 'SYSTEM READY', duration: 400 }
  ];

  useEffect(() => {
    let currentProgress = 0;
    const totalSteps = loadingSteps.length;
    const progressPerStep = 100 / totalSteps;

    const interval = setInterval(() => {
      if (currentStep < totalSteps) {
        const step = loadingSteps[currentStep];
        
        // Update progress
        currentProgress += progressPerStep;
        setProgress(currentProgress);
        
        // Move to next step after duration
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, step.duration);
      } else {
        // Loading complete
        clearInterval(interval);
        setTimeout(() => {
          setShowContent(true);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
        }, 300);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentStep, onLoadingComplete]);

  // Keyboard shortcut to skip loading
  useEffect(() => {
    const handleKeyPress = () => {
      onLoadingComplete();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onLoadingComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-black transition-opacity duration-500 ${showContent ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(156, 229, 231, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(156, 229, 231, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center justify-center h-full">
        {/* JARVIS Logo */}
        <div className="mb-8">
          <div className="text-4xl md:text-6xl font-orbitron text-jarvis-accent text-shadow-neon mb-4 animate-pulse">
            JARVIS
          </div>
          <div className="text-sm md:text-base font-techmono text-jarvis-accent/70 text-center">
            Just A Rather Very Intelligent System
          </div>
        </div>

        {/* Loading Steps */}
        <div className="w-80 md:w-96 mb-8">
          <div className="font-techmono text-jarvis-accent text-sm md:text-base mb-4 text-center min-h-[20px]">
            {currentStep < loadingSteps.length ? loadingSteps[currentStep].text : ''}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-jarvis-bg2 border border-jarvis-accent/30 rounded-full h-2 md:h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-jarvis-accent to-jarvis-secondary rounded-full transition-all duration-300 ease-out shadow-neon"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Progress Percentage */}
          <div className="text-right mt-2">
            <span className="font-techmono text-jarvis-accent text-xs md:text-sm">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Scanning Line Effect */}
        <div className="w-80 md:w-96 h-1 bg-gradient-to-r from-transparent via-jarvis-accent to-transparent animate-pulse opacity-60" />
      </div>

      {/* Corner Elements */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-jarvis-accent opacity-60" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-jarvis-accent opacity-60" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-jarvis-accent opacity-60" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-jarvis-accent opacity-60" />

      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-jarvis-accent rounded-full animate-float opacity-40" style={{ animationDelay: '0s', animationDuration: '3s' }} />
      <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-jarvis-accent rounded-full animate-float opacity-30" style={{ animationDelay: '1s', animationDuration: '4s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-jarvis-accent rounded-full animate-float opacity-50" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />

      {/* Skip Loading Button */}
      <button
        onClick={onLoadingComplete}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-techmono text-jarvis-accent/60 hover:text-jarvis-accent transition-colors duration-300 text-sm underline"
      >
        Press any key or click to skip
      </button>
    </div>
  );
};

export default LoadingScreen; 