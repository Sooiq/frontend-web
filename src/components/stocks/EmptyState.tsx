import React from 'react';
import { HiSearch } from 'react-icons/hi';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-20">
      <HiSearch size={48} className="mb-4" />
      <h3 className="text-xl font-semibold text-gray-400">
        Search for a stock
      </h3>
      <p>Type in the searchbar to search for a stock!</p>
    </div>
  );
};