// src/pages/Dashboard.tsx
import React, { useEffect } from "react";
import NewsCard from "../components/dashboard/NewsCard";
import WatchlistCard from "../components/dashboard/WatchlistCard";
import StockForecastCard from "../components/dashboard/StockForecastCard";
import { useWatchlistStore } from "../store/useWatchlistStore";
import { useStockPricePolling } from "../hooks/useStockPricePolling";

const Dashboard: React.FC = () => {
  const { fetchWatchlist, isLoading, error } = useWatchlistStore();

  // Set up automatic price polling every 5 minutes
  useStockPricePolling();

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-400">
          Error loading watchlist: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <NewsCard />
          {isLoading ? (
            <div className="text-gray-400 text-center py-8">
              Loading watchlist...
            </div>
          ) : (
            <WatchlistCard />
          )}
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
