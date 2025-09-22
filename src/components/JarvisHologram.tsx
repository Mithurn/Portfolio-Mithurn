import React from 'react';
import ParticleSphere from './ParticleSphere';

export default function JarvisHologram() {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: 'transparent' }}>
      <ParticleSphere className="absolute inset-0 w-full h-full" />
    </div>
  );
} 