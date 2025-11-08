import type { SectorForecastApiResponse, SectorForecastResDto, StockForecastApiResponse, StockForecastResDto } from '../types/forecast.types';
import BaseHttpService from './base-http.service';

const PATH = 'forecasts';

class ForecastService extends BaseHttpService {
  async getStockForecastByTicker(ticker: string): Promise<StockForecastResDto[]> {
    const body = await this.get<StockForecastApiResponse>(`${PATH}/stocks/${ticker}`);
    return body.result;
  }

  async getAllStockForecasts(): Promise<StockForecastResDto[]> {
    const body = await this.get<StockForecastApiResponse>(`${PATH}/stocks`);
    return body.result;
  }

  async getAllSectorForecasts(): Promise<SectorForecastResDto[]> {
    const body = await this.get<SectorForecastApiResponse>(`${PATH}/sectors`);
    return body.result;
  }
}

export const forecastService = new ForecastService();
