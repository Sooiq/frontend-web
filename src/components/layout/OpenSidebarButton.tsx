import React from 'react';
import { HiMenu } from 'react-icons/hi';

interface OpenSidebarButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

export const OpenSidebarButton: React.FC<OpenSidebarButtonProps> = ({ onClick, isVisible }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed top-6 left-0 z-20 
        bg-dark-secondary text-gray-400 hover:text-white
        p-2 rounded-r-lg shadow-lg 
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none -translate-x-full'}`}
      // We move it off-screen too, just to be safe
    >
      <HiMenu size={26} />
    </button>
  );
};