import type { UserResDto } from './user.types';

export interface SectorResDto {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IndustryResDto {
  id: string;
  name: string;
  sector: SectorResDto;
  created_at: string;
  updated_at: string;
}

export interface StockResDto {
  id: string;
  ticker: string;
  company_name: string;
  country: string;
  industry: IndustryResDto;
  description: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
}

export interface WatchlistStocksResDto {
  id: number;
  stock: StockResDto;
  watchlist_name: string;
  price_alert: number;
  created_at: string;
  updated_at: string;
}

export interface WatchlistResDto {
  user: UserResDto;
  stocks: WatchlistStocksResDto[];
}

export interface WatchlistApiResponse {
  message: string;
  result: WatchlistResDto;
}

export interface PriceAlertReqDto {
  stock_id: string;
  price_alert?: number | null;
}
