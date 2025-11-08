import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Header } from './Header';
import { NotificationPanel } from './NotificationPanel';
import { OpenSidebarButton } from './OpenSidebarButton'; 

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <OpenSidebarButton 
        onClick={() => setIsSidebarOpen(true)} 
        isVisible={!isSidebarOpen} 
      />

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div 
        className={`flex-1 flex flex-col max-h-screen overflow-y-auto
          transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
      >
        <Header 
          title={title} 
          onNotificationClick={() => setIsNotificationPanelOpen(true)}
          isSidebarOpen={isSidebarOpen} // <-- Pass the state down
        />
        
        <main className="p-8">
          {children}
        </main>
      </div>
      
      <NotificationPanel 
        isOpen={isNotificationPanelOpen} 
        onClose={() => setIsNotificationPanelOpen(false)} 
      />
    </div>
  );
};

export default Layout;