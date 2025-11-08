// src/data/mockData.ts
import { NewsItem, WatchlistItem, Recommendation } from '../types';

export const mockNews: NewsItem[] = [
  { id: '1', date: '2025.03.02', time: '14:58', title: 'BBCA Buyback', tags: [{ text: 'BBCA', bg: 'bg-red-500' }] },
  { id: '2', date: '2025.03.02', time: '13:00', title: 'Russia attacked Ukraine', tags: [{ text: 'ANTM', bg: 'bg-green-500' }, { text: 'TINS', bg: 'bg-gray-500' }] },
  { id: '3', date: '2025.03.02', time: '13:00', title: 'Trump Announced Higher Tariff Rate', tags: [{ text: 'BBCA', bg: 'bg-red-500' }, { text: 'TINS', bg: 'bg-gray-500' }] },
];

// Note: You'll need to add placeholder images to /public/logos/bbca.png etc.
export const mockWatchlist: WatchlistItem[] = [
  { id: '1', ticker: 'BBCA', name: 'Bank Central Asia', logoUrl: '/logos/bbca.png', price: 9000, change: 0.2, changePercent: 5.2 },
  { id: '2', ticker: 'BBCA', name: 'Bank Central Asia', logoUrl: '/logos/bbca.png', price: 9000, change: 0.2, changePercent: 5.2 },
  { id: '3', ticker: 'BBCA', name: 'Bank Central Asia', logoUrl: '/logos/bbca.png', price: 9000, change: 0.2, changePercent: 5.2 },
];

export const mockBuys: Recommendation[] = [
  { id: '1', ticker: 'BBCA', returnForecast: 10.5, reason: 'Strong public sentiment from buyback news, double bottom candle pattern detected' },
  { id: '2', ticker: 'BBCA', returnForecast: 10.5, reason: 'Strong public sentiment from buyback news, double bottom candle pattern detected' },
];

export const mockSells: Recommendation[] = [
  { id: '1', ticker: 'GOTO', returnForecast: -15.5, reason: 'Low profit news gives strong negative sentiment, double top candle pattern detected' },
  { id: '2', ticker: 'UNVR', returnForecast: -20.5, reason: 'Strong negative public sentiment from boycott news, double top candle pattern detected' },
  { id: '3', ticker: 'BUKA', returnForecast: -4.5, reason: 'Failure to break resistance, low volume, high foreign outflow' },
];