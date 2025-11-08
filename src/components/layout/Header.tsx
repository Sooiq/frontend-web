import React from 'react';
import { FaBell } from 'react-icons/fa';

interface HeaderProps {
  onNotificationClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNotificationClick }) => {
  return (
    <header className="sticky top-0 z-10 flex justify-end items-center p-6 bg-dark-primary/90 backdrop-blur-sm">
      {/* This header is sticky. We use justify-end to push the button to the right.
        p-6 matches the padding from the sidebar for visual consistency.
      */}
      <button 
        onClick={onNotificationClick} 
        className="text-gray-400 hover:text-white relative"
      >
        <FaBell size={20} />
        {/* Notification dot */}
        <span className="absolute top-0 right-0 w-2 h-2 bg-accent-purple rounded-full"></span>
      </button>
    </header>
  );
};