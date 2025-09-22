import React, { useRef, useEffect, useState } from 'react';

interface SectionFadeInProps {
  children: React.ReactNode;
  className?: string;
}

const SectionFadeIn: React.FC<SectionFadeInProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={
        `${className} transition-opacity duration-700 ${visible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`
      }
    >
      {children}
    </div>
  );
};

export default SectionFadeIn; 