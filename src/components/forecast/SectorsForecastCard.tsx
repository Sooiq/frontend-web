import React from 'react';
import { Card } from '../ui/Card';
import { mockSectorForecasts } from '../../data/mockData';

const SectorsForecastCard: React.FC = () => {
  return (
    <Card className="p-6 h-full">
      <h2 className="text-xl font-semibold text-white mb-4">Sectors Forecast</h2>
      
      {/* Container to make the list scrollable */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto no-scrollbar">
        
        {mockSectorForecasts.map((item) => (
          <div key={item.id} className="border-b border-gray-700 pb-3 last:border-b-0">
            <p className="text-lg font-semibold text-white">{item.sector}</p>
            
            <p className="text-sm text-gray-300 mt-1">
              Return Forecast: 
              <span className={item.returnForecast > 0 ? 'text-accent-green' : 'text-accent-red'}>
                {item.returnForecast > 0 ? '+' : ''}{item.returnForecast}%
              </span>
            </p>
            
            {/* New Sentiment Score line as requested */}
            <p className="text-sm text-gray-300 mt-1">
              Sentiment score: 
              {/* I've used a yellow color as a placeholder */}
              <span className="text-yellow-400 font-medium">
                {item.sentimentScore}%
              </span>
            </p>

            <p className="text-sm text-gray-400 mt-1">{item.reason}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SectorsForecastCard;