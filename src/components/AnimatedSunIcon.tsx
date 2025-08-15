import React from 'react';

interface AnimatedSunIconProps {
  className?: string;
}

const AnimatedSunIcon: React.FC<AnimatedSunIconProps> = ({ className = "w-12 h-12 sm:w-16 sm:h-16" }) => {
  return (
    <>
      <svg
        className={`${className} text-white animate-bounce drop-shadow-lg`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="m4.93 19.07 1.41-1.41" />
        <path d="M12 22v-2" />
        <path d="m19.07 19.07-1.41-1.41" />
        <path d="M22 12h-2" />
        <path d="m19.07 4.93-1.41 1.41" />
        <circle cx="12" cy="12" r="7" />
        <path d="M12 8a4 4 0 0 1 4 4c0 1.05-.2 2.04-.57 2.92-1.39 3.01-6.14 3.01-7.53 0C8.2 14.99 8 14.01 8 12a4 4 0 0 1 4-4Z" />
      </svg>
      <style>{`
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-15px);
          }
          60% {
            transform: translateY(-7px);
          }
        }
      `}</style>
    </>
  );
};

export default AnimatedSunIcon;

