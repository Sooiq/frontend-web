import React from 'react';
import { 
  HiOutlineChartPie, 
  HiOutlineNewspaper, 
  HiOutlinePresentationChartLine,
  HiOutlineUserCircle,
  HiOutlineCog,
  HiMenu // We still use this for the *close* button
} from 'react-icons/hi';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// This component is now MUCH simpler
const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const activePage = 'Dashboard';

  const navItems = [
    { name: 'Dashboard', icon: HiOutlineChartPie },
    { name: 'News', icon: HiOutlineNewspaper },
    { name: 'Forecast', icon: HiOutlinePresentationChartLine },
  ];

  return (
    <div 
      className={`w-64 h-screen fixed left-0 top-0 flex flex-col p-6 
        transition-transform duration-300 ease-in-out z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        bg-linear-140 from-[#04050D] to-[#16133c]`}
    >
      {/* Header: Logo and *Close* Button */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-white">
          Sooiq
        </h1>
        <button 
          onClick={() => setIsOpen(false)} // <-- This button now *only* closes
          className="text-gray-400 hover:text-white"
        >
          <HiMenu size={26} />
        </button>
      </div>

      {/* User Info (No opacity logic needed) */}
      <div className="flex items-center gap-3 mb-10 overflow-hidden">
        <HiOutlineUserCircle size={44} className="text-gray-400 flex-shrink-0" />
        <div>
          <p className="text-white font-semibold whitespace-nowrap">John Doe</p>
          <p className="text-sm text-gray-400 whitespace-nowrap">@john.doe041</p>
        </div>
      </div>

      {/* Navigation (No opacity logic needed) */}
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <a
                href="#"
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activePage === item.name
                    ? 'bg-dark-tertiary text-white'
                    : 'text-gray-400 hover:bg-dark-tertiary hover:text-white'
                }`}
              >
                <item.icon size={22} className="flex-shrink-0" />
                <span className="font-medium">
                  {item.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer / Settings (No opacity logic needed) */}
      <div className="mt-auto overflow-hidden">
        <a 
          href="#" 
          className="flex items-center gap-3 p-3 text-gray-400 hover:text-white"
        >
          <HiOutlineCog size={22} className="flex-shrink-0" />
          <span className="font-medium">
            Settings
          </span>
        </a>
        <p className="text-xs text-gray-500 mt-4">
          Disclaimer: This app provides data for informational use only...
        </p>
      </div>
    </div>
  );
};

export default Sidebar;