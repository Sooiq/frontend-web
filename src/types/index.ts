// src/types/index.ts
export interface NewsItem {
  id: string;
  date: string;
  time: string;
  title: string;
  tags: { text: string; bg: string; }[];
}

export interface WatchlistItem {
  id: string;
  ticker: string;
  name: string;
  logoUrl: string; // URL to the image
  price: number;
  change: number; // The absolute change (e.g., +0.2)
  changePercent: number; // The percentage (e.g., +5.2)
}

export interface Recommendation {
  id: string;
  ticker: string;
  returnForecast: number; // As a percentage (e.g., 10.5)
  reason: string;
}

export interface NewsTag {
  text: string;
  color: 'green' | 'red';
}

export interface TopNewsItem {
  id: string;
  date: string;
  time: string;
  sentiment: 'Positive' | 'Negative';
  sentimentScore: number;
  title: string;
  body: string;
  tags: NewsTag[];
}

export interface CompactNewsItem {
  id: string;
  title: string;
  date: string;
  time: string;
  tags: NewsTag[];
}