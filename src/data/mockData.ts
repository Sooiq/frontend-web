// src/data/mockData.ts
import type { NewsItem, WatchlistItem, Recommendation, TopNewsItem, CompactNewsItem, SectorForecast, StockSearchResult, StockDetail } from '../types';

export const mockNews: NewsItem[] = [
  { id: '1', date: '2025.03.02', time: '14:58', title: 'BBCA Buyback', tags: [{ text: 'BBCA', color: 'green' }] },
  { id: '2', date: '2025.03.02', time: '13:00', title: 'Russia attacked Ukraine', tags: [{ text: 'ANTM', color: 'green' }, { text: 'TINS', color: 'green' }] },
  { id: '3', date: '2025.03.02', time: '13:00', title: 'Trump Announced Higher Tariff Rate', tags: [{ text: 'BBCA', color: 'red' }, { text: 'TINS', color: 'green' }] },
];

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

export const mockTopNews: TopNewsItem[] = [
  {
    id: '1',
    date: '2025.03.02',
    time: '13.00',
    sentiment: 'Positive',
    sentimentScore: 70,
    title: 'Russia attacked Ukraine',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac diam sed purus iaculis mollis. Nulla maximus libero ac eros vestibulum congue.',
    tags: [
      { text: 'ANTM', color: 'green' },
      { text: 'TINS', color: 'green' },
    ],
  },
  {
    id: '2',
    date: '2025.03.01',
    time: '12.58',
    sentiment: 'Positive',
    sentimentScore: 70,
    title: "Protest on Indonesia's Parliament Rising Heat",
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac diam sed purus iaculis mollis. Nulla maximus libero ac eros vestibulum congue.',
    tags: [
      { text: 'ANTM', color: 'green' },
      { text: 'BBCA', color: 'red' },
    ],
  },
  {
    id: '3',
    date: '2025.03.02',
    time: '11.00',
    sentiment: 'Positive',
    sentimentScore: 70,
    title: 'Trump Tariff War',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac diam sed purus iaculis mollis. Nulla maximus libero ac eros vestibulum congue.',
    tags: [
      { text: 'ANTM', color: 'green' },
      { text: 'TINS', color: 'green' },
    ],
  },
];

export const mockDomesticNews: CompactNewsItem[] = [
  { id: '1', title: 'Protest on Indonesian Parliament Resumes', date: '2025.03.02', time: '11.00', tags: [{ text: 'BBCA', color: 'red' }, { text: 'BBRI', color: 'red' }, { text: 'ANTM', color: 'green' }] },
  { id: '2', title: 'Protest on Indonesian Parliament Resumes', date: '2025.03.02', time: '11.00', tags: [{ text: 'BBCA', color: 'red' }, { text: 'BBRI', color: 'red' }, { text: 'ANTM', color: 'green' }] },
  { id: '3', title: 'Protest on Indonesian Parliament Resumes', date: '2025.03.02', time: '11.00', tags: [{ text: 'BBCA', color: 'red' }, { text: 'BBRI', color: 'red' }, { text: 'ANTM', color: 'green' }] },
];

export const mockWatchlistNews: CompactNewsItem[] = [
  { id: '1', title: 'Protest on Indonesian Parliament Resumes', date: '2025.03.02', time: '11.00', tags: [{ text: 'BBCA', color: 'red' }, { text: 'BBRI', color: 'red' }, { text: 'ANTM', color: 'green' }] },
  { id: '2', title: 'Protest on Indonesian Parliament Resumes', date: '2025.03.02', time: '11.00', tags: [{ text: 'BBCA', color: 'red' }, { text: 'BBRI', color: 'red' }, { text: 'ANTM', color: 'green' }] },
  { id: '3', title: 'Protest on Indonesian Parliament Resumes', date: '2025.03.02', time: '11.00', tags: [{ text: 'BBCA', color: 'red' }, { text: 'BBRI', color: 'red' }, { text: 'ANTM', color: 'green' }] },
];

export const mockSectorForecasts: SectorForecast[] = [
  { id: '1', sector: 'Industrials', returnForecast: 15.4, sentimentScore: 70, reason: 'Global instability and pessimistic public reaction' },
  { id: '2', sector: 'Financials', returnForecast: 10.4, sentimentScore: 65, reason: '200 billions investment on national banks' },
  { id: '3', sector: 'Healthcare', returnForecast: 10.4, sentimentScore: 68, reason: '200 billions investment on national banks' },
  { id: '4', sector: 'Energy', returnForecast: 10.4, sentimentScore: 62, reason: '200 billions investment on national banks' },
  { id: '5', sector: 'Energy', returnForecast: 10.4, sentimentScore: 62, reason: '200 billions investment on national banks' },
  { id: '6', sector: 'Industrials', returnForecast: 15.4, sentimentScore: 70, reason: 'Global instability and pessimistic public reaction' },
  { id: '7', sector: 'Financials', returnForecast: 10.4, sentimentScore: 65, reason: '200 billions investment on national banks' },
  { id: '8', sector: 'Healthcare', returnForecast: 10.4, sentimentScore: 68, reason: '200 billions investment on national banks' },
];

export const mockSearchResults: StockSearchResult[] = [
  { id: '1', ticker: 'BBCA', name: 'Bank Central Asia', logoUrl: '/logos/bbca.png' },
  { id: '2', ticker: 'GOTO', name: 'GoTo Gojek Tokopedia', logoUrl: '/logos/goto.png' },
  { id: '3', ticker: 'UNVR', name: 'Unilever Indonesia', logoUrl: '/logos/unvr.png' },
  { id: '4DEMO', ticker: 'BUKA', name: 'Bukalapak', logoUrl: '/logos/buka.png' },
];

// Mock data for the selected stock detail
export const mockStockDetail: StockDetail = {
  id: '1',
  ticker: 'BBCA',
  name: 'Bank Central Asia',
  logoUrl: '/logos/bbca.png',
  price: 9000,
  changePercent: 5.2,
  returnForecasts: [
    { period: '1 Week', change: 5.2 },
    { period: '1 Month', change: 7.5 },
    { period: '1 Year', change: 19.8 },
  ],
  keyInsights: [
    '200T Buyback news',
    'Strong breakout from 8.900 resistance',
    'Strong public sentiment on Q4 results',
  ],
  analysis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac diam sed purus iaculis mollis. Nulla maximus libero ac eros vestibulum congue.'
};