import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserResDto } from '../types/user.types';
import type { SectorForecastResDto, StockForecastResDto } from '../types/forecast.types';
import { userService } from '../services/user.service';
import { forecastService } from '../services/forecast.service';
import type { StockPriceData } from '../types/stock.types';
import type { WatchlistResDto } from '../types/watchlist.types';
import { watchlistService } from '../services/watchlist.service';
import { stockService } from '../services/stock.service';

interface DashboardState {
  user: UserResDto;
  stockForecast: StockForecastResDto[];
  sectorForecast: SectorForecastResDto[];
  isLoading: boolean;
  watchlist: WatchlistResDto;
  stockPrices: Record<string, StockPriceData>; // ticker -> price data
  isPricesLoading: boolean;
  lastPriceUpdate: string | null;
  error: string | null;
  postLogin: () => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: UserResDto) => void;
  clearUser: () => void;
  setStockForecast: (stockForecast: StockForecastResDto[]) => void;
  setSectorForecast: (sectorForecast: SectorForecastResDto[]) => void;
  clearStockForecast: () => void;
  clearSectorForecast: () => void;
  fetchStockForecast: () => Promise<void>;
  fetchSectorForecast: () => Promise<void>;
  fetchUser: () => Promise<void>;
  setWatchlist: (watchlist: WatchlistResDto) => void;
  fetchWatchlist: () => Promise<void>;
  fetchStockPrices: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      user: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        country_of_residence: '',
        is_noti_agreed: false,
        play_noti_sound: false,
        created_at: '',
        updated_at: '',
      },
      stockForecast: [],
      sectorForecast: [],
      isLoading: false,
      watchlist: {
        user: {
          id: '',
          first_name: '',
          last_name: '',
          email: '',
          username: '',
          country_of_residence: '',
          is_noti_agreed: false,
          play_noti_sound: false,
          created_at: '',
          updated_at: '',
        },
        stocks: [],
      },
      stockPrices: {},
      isPricesLoading: false,
      lastPriceUpdate: null,
      error: null,
      postLogin: async () => {
        set({ isLoading: true });
        const user = await userService.getMe();
        set({ user });
        const watchlist = await watchlistService.getWatchlist();
        set({ watchlist });
        await get().fetchStockPrices();
        await get().fetchStockForecast();
        await get().fetchSectorForecast();
        set({ isLoading: false });
      },
      setWatchlist: (watchlist) => 
        set({ watchlist }),
      fetchWatchlist: async () => {
        set({ isLoading: true, error: null });
        try {
          const watchlist = await watchlistService.getWatchlist();
          set({ watchlist, isLoading: false });
          
          // Automatically fetch prices after getting watchlist
          get().fetchStockPrices();
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch watchlist', isLoading: false });
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
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        country_of_residence: '',
        is_noti_agreed: false,
        play_noti_sound: false,
        created_at: '',
        updated_at: '',
      }}),
      setStockForecast: (stockForecast: StockForecastResDto[]) => set({ stockForecast }),
      setSectorForecast: (sectorForecast: SectorForecastResDto[]) => set({ sectorForecast }),
      clearStockForecast: () => set({ stockForecast: [] }),
      clearSectorForecast: () => set({ sectorForecast: [] }),
      fetchStockForecast: async () => {
        const stockForecast = await forecastService.getAllStockForecasts();
        set({ stockForecast });
      },
      fetchSectorForecast: async () => {
        const sectorForecast = await forecastService.getAllSectorForecasts();
        set({ sectorForecast });
      },
      fetchUser: async () => {
        const user = await userService.getMe();
        set({ user });
      },
    }),
    {
      name: 'dashboard-storage', // name of item in localStorage
    }
  )
);

