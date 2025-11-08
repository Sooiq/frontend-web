import React, { useState, useEffect } from 'react';
import { HiSearch } from 'react-icons/hi';
import { mockSearchResults } from '../../data/mockData';
import { StockSearchResult, StockDetail } from '../../types';
import { mockStockDetail } from '../../data/mockData'; // We'll use this to "select"

interface StockSearchBarProps {
  onStockSelect: (stock: StockDetail | null) => void;
}

export const StockSearchBar: React.FC<StockSearchBarProps> = ({ onStockSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StockSearchResult[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      // In a real app, you'd fetch this. We'll filter mock data.
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

  const handleSelect = (result: StockSearchResult) => {
    // In a real app, you'd now fetch the *details* for this result.
    // For now, we'll just return the full mockStockDetail.
    console.log(result);
    onStockSelect(mockStockDetail);
    setQuery('');
    setResults([]);
    setIsFocused(false);
  };

  return (
    <div className="relative w-full">
      {/* The Search Input */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <HiSearch size={20} />
        </span>
        <input
          type="text"
          placeholder="Search Stocks (e.g., BBCA or Bank Central Asia)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow click
          className="w-full bg-dark-secondary rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-purple"
        />
      </div>

      {/* The Results Dropdown */}
      {isFocused && (query.length > 0 || results.length > 0) && (
        <div className="absolute top-full mt-2 w-full bg-dark-secondary rounded-lg shadow-lg z-10 overflow-hidden">
          {results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-dark-tertiary"
                >
                  <img src={result.logoUrl} alt={result.ticker} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-semibold text-white">{result.ticker}</p>
                    <p className="text-sm text-gray-400">{result.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-gray-400">No results found for "{query}"</p>
          )}
        </div>
      )}
    </div>
  );
};