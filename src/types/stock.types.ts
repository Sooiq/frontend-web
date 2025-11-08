// Stock price data from Yahoo Finance API
export interface StockPriceData {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  lastUpdated: string;
}

