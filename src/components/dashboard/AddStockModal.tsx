import React, { useState, useEffect } from "react";
import { HiX, HiSearch } from "react-icons/hi";
import type { StockSearchResult } from "../../types"; // Assuming this type exists

// Hardcoded data for the search results, as requested.
const mockSearchResults: StockSearchResult[] = [
  {
    id: "1",
    ticker: "BBCA",
    name: "Bank Central Asia",
    logoUrl: "/logos/bbca.png"
  },
  {
    id: "2",
    ticker: "GOTO",
    name: "GoTo Gojek Tokopedia",
    logoUrl: "/logos/goto.png"
  },
  {
    id: "3",
    ticker: "UNVR",
    name: "Unilever Indonesia",
    logoUrl: "/logos/unvr.png"
  },
  { id: "4", ticker: "BUKA", name: "Bukalapak", logoUrl: "/logos/buka.png" },
  { id: "5", ticker: "TSLA", name: "Tesla, Inc.", logoUrl: "/logos/tsla.png" }
];

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStock: (stock: StockSearchResult) => void;
}

export const AddStockModal: React.FC<AddStockModalProps> = ({
  isOpen,
  onClose,
  onAddStock
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StockSearchResult[]>([]);

  // Filter results when query changes
  useEffect(() => {
    if (query.length > 0) {
      const filteredResults = mockSearchResults.filter(
        (stock) =>
          stock.ticker.toLowerCase().includes(query.toLowerCase()) ||
          stock.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) {
    return null;
  }

  const handleSelect = (stock: StockSearchResult) => {
    onAddStock(stock);
    onClose();
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Modal Panel */}
      <div
        className="relative bg-dark-secondary rounded-2xl shadow-lg z-50 w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing on panel click
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Add to Watchlist</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <HiX size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <HiSearch size={20} />
          </span>
          <input
            type="text"
            placeholder="Search Stocks (e.g., BBCA)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-dark-tertiary rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-purple"
          />
        </div>

        {/* Results List */}
        <div className="max-h-60 overflow-y-auto">
          {results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="flex items-center gap-3 p-3 cursor-pointer rounded-lg hover:bg-dark-tertiary"
                >
                  <img
                    src={result.logoUrl}
                    alt={result.ticker}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-white">{result.ticker}</p>
                    <p className="text-sm text-gray-400">{result.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            query.length > 0 && (
              <p className="p-4 text-gray-400 text-center">No results found</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};
