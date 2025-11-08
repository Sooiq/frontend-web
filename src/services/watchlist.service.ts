import type { WatchlistApiResponse, WatchlistResDto } from '../types/watchlist.types';
import BaseHttpService from './base-http.service';

const PATH = 'watchlists';

class WatchlistService extends BaseHttpService {
  async getWatchlist(): Promise<WatchlistResDto> {
    const response = await this.get<WatchlistApiResponse>(`${PATH}`);
    return response.result;
  }
}

export const watchlistService = new WatchlistService();
