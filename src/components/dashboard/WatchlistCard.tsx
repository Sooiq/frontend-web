// src/components/dashboard/WatchlistCard.tsx
import React from 'react';
import { Card } from '../ui/Card';
import { mockWatchlist } from '../../data/mockData';
import { HiPlus } from 'react-icons/hi';

const WatchlistCard: React.FC = () => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">My Watchlist</h2>
        <button className="text-gray-400 hover:text-white">
          <HiPlus size={20} />
        </button>
      </div>

      <ul className="space-y-4">
        {mockWatchlist.map((item) => (
          <li key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Placeholder for logo */}
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {item.ticker.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.ticker}</p>
                <p className="text-xs text-gray-400">{item.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-white">{item.price.toLocaleString()}</p>
              <p className="text-xs text-accent-green">
                +{item.change} (+{item.changePercent}%)
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default WatchlistCard;