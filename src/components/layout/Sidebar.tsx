// src/components/layout/Sidebar.tsx
import React from 'react';
import { 
  HiOutlineChartPie, 
  HiOutlineNewspaper, 
  HiOutlinePresentationChartLine,
  HiOutlineUserCircle,
  HiOutlineCog 
} from 'react-icons/hi';
import { FaBell } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  // In a real app, this would come from `react-router-dom`'s `useLocation`
  const activePage = 'Dashboard';

  const navItems = [
    { name: 'Dashboard', icon: HiOutlineChartPie },
    { name: 'News', icon: HiOutlineNewspaper },
    { name: 'Forecast', icon: HiOutlinePresentationChartLine },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-dark-secondary flex flex-col p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-white">Sooiq</h1>
        <button className="text-gray-400 hover:text-white relative">
          <FaBell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-accent-purple rounded-full"></span>
        </button>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 mb-10">
        <HiOutlineUserCircle size={44} className="text-gray-400" />
        <div>
          <p className="text-white font-semibold">John Doe</p>
          <p className="text-sm text-gray-400">@john.doe041</p>
        </div>
      </div>

      {/* Navigation */}
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
                <item.icon size={22} />
                <span className="font-medium">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer / Settings */}
      <div className="mt-auto">
        <a href="#" className="flex items-center gap-3 p-3 text-gray-400 hover:text-white">
          <HiOutlineCog size={22} />
          <span className="font-medium">Settings</span>
        </a>
        <p className="text-xs text-gray-500 mt-4">
          Disclaimer: This app provides data-driven market insights for informational use only. You are responsible for your own investment decisions.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;