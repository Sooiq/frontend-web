import React from 'react';
import { HiX } from 'react-icons/hi';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      
      {/* Panel */}
      <div 
        className={`fixed top-0 right-0 w-64 h-screen bg-dark-secondary z-40 
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Panel Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Notifications</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <HiX size={22} />
          </button>
        </div>
        
        {/* Panel Content */}
        <div className="p-6">
          <p className="text-gray-400 text-center">No new notifications.</p>
          {/* In a real app, you would map over notification items here */}
        </div>
      </div>
    </>
  );
};