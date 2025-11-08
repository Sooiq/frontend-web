import type { StockPriceData } from '../types/stock.types';
import type { StockResDto } from '../types/watchlist.types';
import BaseHttpService from './base-http.service';

class StockService extends BaseHttpService {
  // Using CORS proxy to bypass CORS restrictions
  private readonly CORS_PROXY = 'https://corsproxy.io/?';
  private readonly YAHOO_FINANCE_API = 'https://query1.finance.yahoo.com/v8/finance/chart';

  /**
   * Get all available stocks from backend
   */
  async getAllStocks(): Promise<StockResDto[]> {
    const response = await this.get<{ message: string; result: StockResDto[] }>('stocks');
    return response.result;
  }

  /**
   * Fetch current prices for multiple stock tickers from Yahoo Finance
   * @param tickers Array of stock ticker symbols (e.g., ['AAPL', 'MSFT', 'GOOGL'])
   */
  async getPrices(tickers: string[]): Promise<StockPriceData[]> {
    const promises = tickers.map(ticker => this.getPrice(ticker));
    const results = await Promise.allSettled(promises);
    
    // Filter out failed requests and return successful ones
    return results
      .filter((result): result is PromiseFulfilledResult<StockPriceData> => result.status === 'fulfilled')
      .map(result => result.value);
  }

  /**
   * Fetch price for a single stock ticker from Yahoo Finance
   */
  async getPrice(ticker: string): Promise<StockPriceData> {
    try {
      const yahooUrl = `${this.YAHOO_FINANCE_API}/${ticker}?interval=1d&range=1d`;
      const url = `${this.CORS_PROXY}${encodeURIComponent(yahooUrl)}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${ticker}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Extract data from Yahoo Finance response
      const result = data.chart.result[0];
      const meta = result.meta;
      const quote = result.indicators.quote[0];
      
      const currentPrice = meta.regularMarketPrice;
      const previousClose = meta.chartPreviousClose;
      const change = currentPrice - previousClose;
      const changePercent = (change / previousClose) * 100;

      return {
        ticker: ticker,
        price: currentPrice,
        change: change,
        changePercent: changePercent,
        volume: quote.volume?.[quote.volume.length - 1] || 0,
        marketCap: meta.marketCap || 0,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error fetching price for ${ticker}:`, error);
      throw error;
    }
  }
}

export const stockService = new StockService();

