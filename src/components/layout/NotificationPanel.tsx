import React from 'react';
import { HiX } from 'react-icons/hi';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications = [
  {
    id: '1',
    logoUrl: '/logos/bbca.png',
    ticker: 'BBCA',
    headline: 'BBCA hits 9.000 price alert',
    time: '10.05 AM',
  },
  {
    id: '2',
    logoUrl: '/logos/bbca.png',
    ticker: 'BBCA',
    headline: 'BBCA sets to buy back 5 Bill. of its shares',
    time: '03/01',
  },
];

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
        className={`fixed top-0 right-0 w-80 h-screen z-40 
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          bg-[#332982] rounded-l-2xl`} // <-- Changed to rounded-l-2xl
      >
        {/* Panel Header */}
        <div className="flex justify-between items-center p-6">
          <h2 className="text-2xl font-bold text-white">Notification</h2>
          <button onClick={onClose} className="text-gray-200 hover:text-white">
            <HiX size={22} />
          </button>
        </div>
        
        {/* Panel Content */}
        <div className="p-6 pt-0">
          <div className="space-y-3">
            {mockNotifications.map((notif) => (
              <div 
                key={notif.id}
                className="flex items-start gap-3 p-4 rounded-2xl bg-[#1E2241]/70 
                  shadow-lg shadow-black/20" // <-- Changed to rounded-2xl
              >
                {/* Column 1: Logo */}
                <img 
                  src={notif.logoUrl} 
                  alt={notif.ticker} 
                  className="w-8 h-8 rounded-full bg-blue-500 mt-0.5"
                />
                
                {/* Column 2: Content Block */}
                <div className="flex-1 min-w-0"> 
                  
                  {/* Row 1: [Ticker] [Time] */}
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-white truncate">{notif.ticker}</p>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {notif.time}
                    </span>
                  </div>
                  
                  {/* Row 2: [Headline] */}
                  <p className="text-sm text-gray-300 mt-1">
                    {notif.headline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};