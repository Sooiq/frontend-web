// src/components/dashboard/WatchlistCard.tsx
import React, {useState} from "react";
import { Card } from "../ui/Card";
import { HiPlus, HiRefresh } from "react-icons/hi";
import { useDashboardStore } from "../../store/useDashboardStore";

const WatchlistCard: React.FC = () => {
  const {
    watchlist,
    stockPrices,
    isPricesLoading,
    fetchStockPrices,
    lastPriceUpdate,
  } = useDashboardStore();
  const stocks = watchlist?.stocks ?? [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleRefresh = () => {
    fetchStockPrices();
  };

  const formatTime = (isoString: string | null) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAddStock = (stock: StockSearchResult) => {
    // In a real app, you'd call your zustand store here:
    // e.g., addStockToWatchlist(stock.id);
    console.log("Adding stock:", stock.ticker);
  };

  return (
    <>
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">My Watchlist</h2>
          {lastPriceUpdate && (
            <p className="text-xs text-gray-500 mt-1">
              Updated: {formatTime(lastPriceUpdate)}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            disabled={isPricesLoading}
            className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh prices"
          >
            <HiRefresh
              size={20}
              className={isPricesLoading ? "animate-spin" : ""}
            />
          </button>
          <button onClick={() => setIsModalOpen(true)} 
          className="text-gray-400 hover:text-white" title="Add stock">
            <HiPlus size={20} />
          </button>
        </div>
      </div>

      {stocks.length === 0 ? (
        <p className="text-gray-400 text-center py-4">No stocks in watchlist</p>
      ) : (
        <ul className="space-y-4">
          {stocks.map((item) => {
            const priceData = stockPrices[item.stock.ticker];
            const hasPrice = priceData !== undefined;

            return (
              <li key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Placeholder for logo */}
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {item.stock.ticker.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.stock.ticker}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.stock.company_name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {hasPrice ? (
                    <>
                      <p className="text-sm font-semibold text-white">
                        $
                        {priceData.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <p
                        className={`text-xs ${
                          priceData.change >= 0
                            ? "text-accent-green"
                            : "text-red-400"
                        }`}
                      >
                        {priceData.change >= 0 ? "+" : ""}
                        {priceData.change.toFixed(2)} (
                        {priceData.changePercent >= 0 ? "+" : ""}
                        {priceData.changePercent.toFixed(2)}%)
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400">Loading...</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
    {/* --- 7. Render the modal --- */}
      <AddStockModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddStock={handleAddStock}
      />
      {/* --------------------------- */}
    </>
  );
};

export default WatchlistCard;
