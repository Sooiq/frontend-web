// src/components/dashboard/StockForecastCard.tsx
import React from "react";
import { Card } from "../ui/Card";
import { HiOutlineChevronDown } from "react-icons/hi";
import { useDashboardStore } from "../../store/useDashboardStore";
import type { StockForecastResDto } from "../../types/forecast.types";

// Sub-component to render the recommendation tables
const RecommendationTable: React.FC<{
  title: string;
  items: StockForecastResDto[];
  type: "buy" | "sell";
}> = ({ title, items, type }) => {
  const isBuy = type === "buy";
  const apyColor = isBuy ? "text-accent-green" : "text-accent-red";

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="py-2 pr-4">Ticker</th>
              <th className="py-2 pr-4">Return Forecast</th>
              <th className="py-2">Reason</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-700 last:border-b-0"
              >
                <td className="py-3 pr-4 font-medium text-white">
                  {item.ticker}
                </td>
                <td className={`py-3 pr-4 font-semibold ${apyColor}`}>
                  {isBuy ? "+" : ""}
                  {item.return_forecast_percentage.toFixed(2)}%
                </td>
                <td className="py-3 text-gray-300">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StockForecastCard: React.FC = () => {
  const stockForecast = useDashboardStore((state) => state.stockForecast);
  const buyRecommendations = stockForecast.filter(
    (item) => item.return_forecast_percentage > 0
  );
  const sellRecommendations = stockForecast.filter(
    (item) => item.return_forecast_percentage < 0
  );

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          Stock Forecast Summary
        </h2>
        <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
          7 Days <HiOutlineChevronDown />
        </button>
      </div>

      <RecommendationTable
        title="Top Buy Recommendation"
        items={buyRecommendations}
        type="buy"
      />
      <RecommendationTable
        title="Top Sell Recommendation"
        items={sellRecommendations}
        type="sell"
      />
    </Card>
  );
};

export default StockForecastCard;
