import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WatchlistResDto, WatchlistStocksResDto } from '../types/watchlist.types';
import type { StockPriceData } from '../types/stock.types';
import { watchlistService } from '../services';
import { stockService } from '../services/stock.service';

interface WatchlistState {
  watchlist: WatchlistResDto | null;
  stockPrices: Record<string, StockPriceData>; // ticker -> price data
  isLoading: boolean;
  isPricesLoading: boolean;
  error: string | null;
  lastPriceUpdate: string | null;
  
  // Actions
  setWatchlist: (watchlist: WatchlistResDto) => void;
  fetchWatchlist: () => Promise<void>;
  fetchStockPrices: () => Promise<void>;
  clearWatchlist: () => void;
  addStock: (stock: WatchlistStocksResDto) => void;
  removeStock: (stockId: number) => void;
  updatePriceAlert: (stockId: number, priceAlert: number) => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: null,
      stockPrices: {},
      isLoading: false,
      isPricesLoading: false,
      error: null,
      lastPriceUpdate: null,

      setWatchlist: (watchlist) => 
        set({ watchlist, error: null }),

      fetchWatchlist: async () => {
        set({ isLoading: true, error: null });
        try {
          const watchlist = await watchlistService.getWatchlist();
          set({ watchlist, isLoading: false, error: null });
          
          // Automatically fetch prices after getting watchlist
          get().fetchStockPrices();
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch watchlist',
            isLoading: false 
          });
        }
      },

      fetchStockPrices: async () => {
        const { watchlist } = get();
        if (!watchlist || watchlist.stocks.length === 0) return;

        set({ isPricesLoading: true });
        try {
          const tickers = watchlist.stocks.map(s => s.stock.ticker);
          const prices = await stockService.getPrices(tickers);
          
          // Convert array to record for easy lookup
          const pricesRecord = prices.reduce((acc, price) => {
            acc[price.ticker] = price;
            return acc;
          }, {} as Record<string, StockPriceData>);

          set({ 
            stockPrices: pricesRecord, 
            isPricesLoading: false,
            lastPriceUpdate: new Date().toISOString()
          });
        } catch (error) {
          console.error('Failed to fetch stock prices:', error);
          set({ isPricesLoading: false });
          // Don't set error state for price fetching to avoid disrupting UI
        }
      },

      clearWatchlist: () => 
        set({ watchlist: null, stockPrices: {}, error: null, lastPriceUpdate: null }),

      addStock: (stock) => {
        const { watchlist } = get();
        if (watchlist) {
          set({
            watchlist: {
              ...watchlist,
              stocks: [...watchlist.stocks, stock]
            }
          });
        }
      },

      removeStock: (stockId) => {
        const { watchlist } = get();
        if (watchlist) {
          set({
            watchlist: {
              ...watchlist,
              stocks: watchlist.stocks.filter(s => s.id !== stockId)
            }
          });
        }
      },

      updatePriceAlert: (stockId, priceAlert) => {
        const { watchlist } = get();
        if (watchlist) {
          set({
            watchlist: {
              ...watchlist,
              stocks: watchlist.stocks.map(s => 
                s.id === stockId ? { ...s, price_alert: priceAlert } : s
              )
            }
          });
        }
      },
    }),
    {
      name: 'watchlist-storage', // localStorage key
    }
  )
);

