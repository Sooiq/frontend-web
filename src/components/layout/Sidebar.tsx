import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HiOutlineChartPie, 
  HiOutlineNewspaper, 
  HiOutlinePresentationChartLine,
  HiOutlineUserCircle,
  HiOutlineCog,
  HiMenu, // We still use this for the *close* button
  HiChevronDown, // For the dropdown
  HiOutlineViewGrid, // For the sub-menu
  HiOutlineChartBar, // For the sub-menu
  HiOutlineLogout
} from 'react-icons/hi';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// This component is now MUCH simpler
const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const pathname = location.pathname;

  // State to manage the dropdown
  const [isForecastOpen, setIsForecastOpen] = useState(false);

  // Check if a parent route is active
  const isForecastParentActive = pathname.startsWith('/forecast');

  // New nav items structure
  const topNavItems = [
    { name: 'Dashboard', icon: HiOutlineChartPie, path: '/dashboard' },
    { name: 'News', icon: HiOutlineNewspaper, path: '/news' },
  ];

  const forecastSubNav = [
    { name: 'Dashboard', icon: HiOutlineViewGrid, path: '/forecast/dashboard' },
    { name: 'Stocks', icon: HiOutlineChartBar, path: '/forecast/stocks' },
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

      {/* Navigation */}
      <nav className="flex-grow">
        <ul>
          {/* Top Level Links */}
          {topNavItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name} className="mb-2">
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-dark-tertiary text-white'
                      : 'text-gray-400 hover:bg-dark-tertiary hover:text-white'
                  }`}
                >
                  <item.icon size={22} className="flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}

          {/* Forecast Collapsible Section */}
          <li className="mb-2">
            <button
              onClick={() => setIsForecastOpen(!isForecastOpen)}
              className={`flex items-center justify-between w-full gap-3 p-3 rounded-lg transition-colors ${
                isForecastParentActive
                  ? 'text-white' // Parent is active, but maybe not the BG
                  : 'text-gray-400'
              } hover:bg-dark-tertiary hover:text-white`}
            >
              <div className="flex items-center gap-3">
                <HiOutlinePresentationChartLine size={22} className="flex-shrink-0" />
                <span className="font-medium">Forecast</span>
              </div>
              <HiChevronDown 
                className={`transition-transform duration-200 ${isForecastOpen ? 'rotate-180' : ''}`} 
                size={20} 
              />
            </button>
            
            {/* Sub-menu */}
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isForecastOpen ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <ul className="pl-8 pt-2 space-y-1">
                {forecastSubNav.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-colors text-sm ${
                          isActive
                            ? 'text-white font-medium'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <item.icon size={18} />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        </ul>
      </nav>

      {/* Footer / Settings */}
      <div className="mt-auto overflow-hidden">
        {/* You can also make Settings a Link */}
        <Link
          to="/settings" // Assuming you'll add this route
          className="flex items-center gap-3 p-3 text-gray-400 hover:text-white"
        >
          <HiOutlineCog size={22} className="flex-shrink-0" />
          <span className="font-medium">
            Settings
          </span>
        </Link>
        <button
          onClick={() => {
            // In a real app, you'd call your auth context here
            console.log("Logging out...");
            // e.g., navigate('/login');
          }}
          className="flex items-center gap-3 p-3 text-gray-400 hover:text-white w-full"
        >
          <HiOutlineLogout size={22} className="flex-shrink-0" />
          <span className="font-medium">
            Logout
          </span>
        </button>
        <p className="text-xs text-gray-500 mt-4">
          Disclaimer: This app provides data-driven market insights for informational use only. You are responsible for your own investment decisions.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;