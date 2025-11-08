import React from 'react';
import { FaBell } from 'react-icons/fa';

interface HeaderProps {
  title: string;
  onNotificationClick: () => void;
  isSidebarOpen: boolean; // <-- Add this prop
}

export const Header: React.FC<HeaderProps> = ({ title, onNotificationClick, isSidebarOpen }) => {
  return (
    <header 
      className={`sticky top-0 z-10 flex justify-between items-center 
        bg-dark-primary/90 backdrop-blur-sm
        py-6 pr-6 transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'pl-8' : 'pl-16'}`} // <-- This is the logic
    >
      {/* - When sidebar is OPEN: 'pl-6' (normal padding)
        - When sidebar is CLOSED: 'pl-20' (extra padding to clear the button)
      */}
      
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-white truncate">
        {title}
      </h1>
      
      {/* Notification Button */}
      <button 
        onClick={onNotificationClick} 
        className="text-gray-400 hover:text-white relative"
      >
        <FaBell size={20} />
        <span className="absolute top-0 right-0 w-2 h-2 bg-accent-purple rounded-full"></span>
      </button>
    </header>
  );
};