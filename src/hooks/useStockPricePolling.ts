import { useEffect, useRef } from 'react';
import { useDashboardStore } from '../store/useDashboardStore';

const POLLING_INTERVAL = 30 * 1000; // 30 secs in milliseconds

/**
 * Custom hook that polls stock prices every 5 minutes
 * Automatically starts when component mounts and cleans up on unmount
 */
export const useStockPricePolling = () => {
  const fetchStockPrices = useDashboardStore((state) => state.fetchStockPrices);
  const watchlist = useDashboardStore((state) => state.watchlist);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Only start polling if there's a watchlist
    if (!watchlist || watchlist.stocks.length === 0) {
      return;
    }

    // Fetch prices immediately on mount
    fetchStockPrices();

    // Set up polling interval
    intervalRef.current = setInterval(() => {
      console.log('Fetching stock prices...', new Date().toISOString());
      fetchStockPrices();
    }, POLLING_INTERVAL);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [fetchStockPrices, watchlist]);

  // Manual refresh function
  const refresh = () => {
    fetchStockPrices();
  };

  return { refresh };
};

