import type { PriceAlertReqDto, WatchlistApiResponse, WatchlistResDto } from '../types/watchlist.types';
import BaseHttpService from './base-http.service';

const PATH = 'watchlists';

class WatchlistService extends BaseHttpService {
  async getWatchlist(): Promise<WatchlistResDto> {
    const response = await this.get<WatchlistApiResponse>(`${PATH}`);
    return response.result;
  }

  async setPriceAlert(stockId: string, priceAlert: number): Promise<void> {
    await this.patch<void>(`${PATH}/price-alert`, { stock_id: stockId, price_alert: priceAlert });
  }

  async addStockToWatchlist(priceAlerts: PriceAlertReqDto[]): Promise<void> {
    await this.post<void>(`${PATH}`, { price_alerts: priceAlerts });
  }
}

export const watchlistService = new WatchlistService();
