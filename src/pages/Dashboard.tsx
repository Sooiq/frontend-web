// src/pages/Dashboard.tsx
import React from 'react';
import NewsCard from '../components/dashboard/NewsCard';
import WatchlistCard from '../components/dashboard/WatchlistCard';
import StockForecastCard from '../components/dashboard/StockForecastCard';

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <NewsCard />
          <WatchlistCard />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          <StockForecastCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;