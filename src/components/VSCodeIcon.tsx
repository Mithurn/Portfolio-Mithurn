import React from 'react';

const VSCodeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline', verticalAlign: 'middle' }}
  >
    <path d="M22.548 2.246a1.5 1.5 0 0 0-1.637-.217L6.98 8.98l-3.13-2.6a.75.75 0 0 0-.97.04l-2.25 2.25a.75.75 0 0 0 0 1.06l3.47 3.47-3.47 3.47a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 0 0 .97.04l3.13-2.6 13.93 6.95A1.5 1.5 0 0 0 24 21.25V2.75a1.5 1.5 0 0 0-1.452-.504zM22.5 21.25a.5.5 0 0 1-.727.447l-13.93-6.95a.75.75 0 0 0-.73.06l-3.13 2.6-2.25-2.25 3.47-3.47a.75.75 0 0 0 0-1.06l-3.47-3.47 2.25-2.25 3.13 2.6a.75.75 0 0 0 .73.06l13.93-6.95A.5.5 0 0 1 22.5 2.75v18.5z" fill="currentColor"/>
  </svg>
);

export default VSCodeIcon; 