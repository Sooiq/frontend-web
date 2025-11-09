import React, { useState } from "react";
import { StockSearchBar } from "../components/stocks/StockSearchBar";
import { EmptyState } from "../components/stocks/EmptyState";
import { StockDetailView } from "../components/stocks/StockDetailView";
import type { StockResDto } from "../types/watchlist.types";
import type { StockPriceData } from "../types/stock.types";



const Stocks: React.FC = () => {
  // This state is the key: it tracks which stock (if any) is selected
  const [selectedStock, setSelectedStock] = useState<StockResDto | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<StockPriceData | null>(null);

  return (
    <div className="space-y-6">
      {/* 1. The Search Bar is always visible */}
      <StockSearchBar
        onStockSelect={setSelectedStock}
        onPriceSelect={setSelectedPrice}
      />

      {/* 2. The Content Area is conditional */}
      <div>
        {!selectedStock ? (
          // State 1: No stock selected, show empty state
          <EmptyState />
        ) : (
          // State 2: A stock is selected, show the detail view
          <StockDetailView stock={selectedStock} price={selectedPrice ?? null} />
        )}
      </div>
    </div>
  );
};

export default Stocks;
