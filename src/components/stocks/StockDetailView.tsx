import React, { useEffect, useState } from "react";
import { HiPlus, HiOutlineBell } from "react-icons/hi";
import { Card } from "../ui/Card"; // Re-using our base card
import { SetPriceAlertModal } from "./SetPriceAlertModal";
import type { StockResDto } from "../../types/watchlist.types";
import type { StockPriceData } from "../../types/stock.types";
import { forecastService } from "../../services/forecast.service";
import type { StockForecastResDto } from "../../types/forecast.types";
import { watchlistService } from "../../services/watchlist.service";
import { toast } from "react-toastify";

// Sub-components for clarity
const StockHeaderCard: React.FC<{
  stock: StockResDto;
  price: StockPriceData | null;
}> = ({ stock, price }) => {
  const [forecast, setForecast] = useState<StockForecastResDto[]>([]);

  useEffect(() => {
    const getForecast = async () => {
      const forecast = await forecastService.getStockForecastByTicker(
        stock.ticker
      );
      setForecast(forecast);
    };
    getForecast();
  }, [stock.ticker]);

  return (
    <Card className="flex flex-col md:flex-row items-center justify-between p-4">
      {/* Stock Info */}
      <div className="flex items-center gap-4">
        <img
          src={stock.logo_url}
          alt={stock.ticker}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold text-white">{stock.ticker}</h2>
          <p className="text-sm text-gray-400">{stock.company_name}</p>
        </div>
      </div>
      {/* Price & Forecast Info */}
      <div className="flex items-center gap-4 mt-4 md:mt-0">
        {/* Price */}
        <div className="text-right">
          <p className="text-2xl font-bold text-white">
            {price?.price.toLocaleString()}
          </p>
          <p className="text-sm text-accent-green">
            +{price?.changePercent.toFixed(2)}%
          </p>
        </div>
        {/* Divider */}
        <div className="hidden md:block w-px h-10 bg-gray-700 mx-2"></div>
        {/* Return Forecast (New Layout) */}
        <div className="flex items-center gap-8">
          <p className="text-lg font-semibold text-white">Return Forecast</p>

          <div className="flex gap-7">
            {forecast.map((item) => (
              <div key={item.id} className="text-center">
                <span className="block text-xl font-semibold text-accent-green">
                  +{item.return_forecast_percentage.toFixed(2)}%
                </span>
                <span className="block text-md text-gray-500 capitalize">
                  {item.reason}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

const KeyInsightsCard: React.FC<{ insights: string[] }> = ({ insights }) => (
  <Card className="p-6">
    <h3 className="text-xl font-semibold text-white mb-4">Key Insights</h3>
    <ul className="space-y-2">
      {insights.map((insight, index) => (
        <li key={index} className="text-gray-300 relative pl-4">
          <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-accent-purple rounded-full"></span>
          {insight}
        </li>
      ))}
    </ul>
  </Card>
);

const AnalysisCard: React.FC<{ analysis: string }> = ({ analysis }) => (
  <Card className="p-6">
    <h3 className="text-xl font-semibold text-white mb-4">Analysis</h3>
    <p className="text-gray-300 leading-relaxed">{analysis}</p>
  </Card>
);

const CandlestickChart: React.FC = () => (
  <Card className="h-96 flex items-center justify-center">
    <p className="text-gray-500">candlestick chart</p>
  </Card>
);

// The Main Detail View Component
export const StockDetailView: React.FC<{
  stock: StockResDto;
  price: StockPriceData | null;
}> = ({ stock, price }) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const handleAddToWatchlist = async () => {
    try {
      await watchlistService.addStockToWatchlist([
        { stock_id: stock.id, price_alert: price?.price ?? null },
      ]);
      toast.success("Stock added to watchlist");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : `An unknown error occurred. ${error}`
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Row 1: Header Card */}
      <StockHeaderCard stock={stock} price={price} />

      {/* Row 2: Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleAddToWatchlist}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-dark-tertiary text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
        >
          <HiPlus size={20} /> Add to Watchlist
        </button>
        <button
          onClick={() => setIsAlertModalOpen(true)}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-dark-tertiary text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
        >
          <HiOutlineBell size={20} /> Add Alert
        </button>
      </div>

      {/* Row 3: Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CandlestickChart />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <KeyInsightsCard insights={[]} />
          <AnalysisCard analysis={""} />
        </div>
      </div>
      <SetPriceAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        stock={stock}
      />
    </div>
  );
};
