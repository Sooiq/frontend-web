export interface StockForecastResDto {
  id: string;
  stock_id: string;
  ticker: string;
  company_name: string;
  return_forecast_percentage: number;
  reason?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SectorForecastResDto {
  id: string;
  sector_id: string;
  sector_name: string;
  return_forecast_percentage: number;
  reason?: string | null;
  created_at: string;
  updated_at: string;
}

export interface StockForecastApiResponse {
  message: string;
  result: StockForecastResDto[];
}

export interface SectorForecastApiResponse {
  message: string;
  result: SectorForecastResDto[];
}
