import React from 'react';

const PlatformIOIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline', verticalAlign: 'middle' }}
  >
    {/* Alien head */}
    <ellipse cx="16" cy="20.5" rx="7.5" ry="4.5" fill="currentColor" />
    <ellipse cx="16" cy="14" rx="5" ry="5" fill="currentColor" />
    {/* Eyes */}
    <ellipse cx="13.5" cy="13.5" rx="1.5" ry="2" fill="#fff" />
    <ellipse cx="18.5" cy="13.5" rx="1.5" ry="2" fill="#fff" />
    <ellipse cx="13.5" cy="13.5" rx="0.7" ry="1" fill="currentColor" />
    <ellipse cx="18.5" cy="13.5" rx="0.7" ry="1" fill="currentColor" />
    {/* Antennae */}
    <rect x="10.7" y="7" width="1.2" height="7" rx="0.6" fill="currentColor" />
    <rect x="20.1" y="7" width="1.2" height="7" rx="0.6" fill="currentColor" />
    <circle cx="11.3" cy="7" r="1" fill="currentColor" />
    <circle cx="20.7" cy="7" r="1" fill="currentColor" />
  </svg>
);

export default PlatformIOIcon; 