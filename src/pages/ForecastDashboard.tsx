import React from 'react';
import StockForecastCard from '../components/dashboard/StockForecastCard';
import SectorsForecastCard from '../components/forecast/SectorsForecastCard';

const ForecastDashboard: React.FC = () => {
  return (
    // Main grid layout
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Column (Wider) */}
      <div className="lg:col-span-2">
        {/* As requested, we recycle the StockForecastCard.
          This component already contains the "Top Buy" and "Top Sell" tables.
        */}
        <StockForecastCard />
      </div>

      {/* Right Column (Narrower) */}
      <div className="lg:col-span-1">
        <SectorsForecastCard />
      </div>

    </div>
  );
};

export default ForecastDashboard;