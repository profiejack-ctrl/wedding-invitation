import React from 'react';

export const FloralCorner: React.FC<{ className?: string; position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({
  className = '',
  position = 'top-left',
}) => {
  const getRotation = () => {
    switch (position) {
      case 'top-right':
        return 'scale-x-[-1]';
      case 'bottom-left':
        return 'scale-y-[-1]';
      case 'bottom-right':
        return 'scale-x-[-1] scale-y-[-1]';
      default:
        return '';
    }
  };

  return (
    <div className={`pointer-events-none absolute z-10 ${getRotation()} ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 h-24 sm:w-32 sm:h-32 opacity-85 select-none"
      >
        {/* Soft botanical background glow */}
        <path
          d="M10 10C40 30 80 40 150 20C130 90 120 130 140 160C100 130 60 110 10 150C30 90 20 40 10 10Z"
          fill="url(#floral-gradient-sage)"
          opacity="0.16"
        />
        {/* Botanical stem line */}
        <path
          d="M15 15Q55 35 115 15Q85 75 115 135Q55 105 15 135Q45 75 15 15Z"
          stroke="#B29C7D"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.75"
        />
        {/* Sage green botanical leaves */}
        <path d="M40 30C55 20 65 35 50 45C35 45 35 35 40 30Z" fill="#819F80" opacity="0.65" />
        <path d="M85 20C100 12 110 25 98 35C85 35 80 25 85 20Z" fill="#5F7F5E" opacity="0.55" />
        <path d="M25 85C15 100 28 110 38 98C38 85 28 80 25 85Z" fill="#A6BEA5" opacity="0.7" />

        {/* Old Pink delicate flower petals */}
        <circle cx="35" cy="42" r="11" fill="#C0827F" opacity="0.6" />
        <circle cx="46" cy="32" r="8" fill="#E8C9C7" opacity="0.8" />
        <circle cx="32" cy="55" r="9" fill="#A75F5C" opacity="0.5" />

        {/* Warm beige / champagne accent buds */}
        <circle cx="108" cy="38" r="6" fill="#DDD0BB" opacity="0.85" />
        <circle cx="38" cy="115" r="7" fill="#E8C9C7" opacity="0.65" />

        <defs>
          <linearGradient id="floral-gradient-sage" x1="10" y1="10" x2="150" y2="160" gradientUnits="userSpaceOnUse">
            <stop stopColor="#819F80" />
            <stop offset="0.5" stopColor="#C0827F" />
            <stop offset="1" stopColor="#DDD0BB" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const FloralDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center space-x-3 my-6 select-none ${className}`} aria-hidden="true">
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-beige-400 to-sage-400" />
      <div className="flex items-center space-x-1.5 text-sage-600">
        <span className="w-1.5 h-1.5 rotate-45 bg-beige-500 inline-block" />
        <svg className="w-5 h-5 text-oldpink-500 animate-pulse-slow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="w-1.5 h-1.5 rotate-45 bg-sage-500 inline-block" />
      </div>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-beige-400 to-sage-400" />
    </div>
  );
};

export const FloralOrnamentRing: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg className={`select-none ${className}`} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="100" cy="100" r="92" stroke="#B29C7D" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.8" />
      <circle cx="100" cy="100" r="84" stroke="#819F80" strokeWidth="1" opacity="0.6" />
      {/* Botanical leaves & Old pink buds at top and bottom */}
      <g transform="translate(100, 8) scale(0.65)">
        <path d="M0 0C-10 -15 -25 -5 -15 10C-5 25 0 20 0 0Z" fill="#5F7F5E" opacity="0.85" />
        <path d="M0 0C10 -15 25 -5 15 10C5 25 0 20 0 0Z" fill="#819F80" opacity="0.85" />
        <circle cx="0" cy="5" r="5" fill="#C0827F" />
      </g>
      <g transform="translate(100, 192) rotate(180) scale(0.65)">
        <path d="M0 0C-10 -15 -25 -5 -15 10C-5 25 0 20 0 0Z" fill="#5F7F5E" opacity="0.85" />
        <path d="M0 0C10 -15 25 -5 15 10C5 25 0 20 0 0Z" fill="#819F80" opacity="0.85" />
        <circle cx="0" cy="5" r="5" fill="#C0827F" />
      </g>
    </svg>
  );
};
