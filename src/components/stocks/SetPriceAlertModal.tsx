import React, { useState } from 'react';
import { HiX } from 'react-icons/hi';
import { StockDetail } from '../../types';

interface SetPriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: StockDetail;
}

export const SetPriceAlertModal: React.FC<SetPriceAlertModalProps> = ({ isOpen, onClose, stock }) => {
  const [targetPrice, setTargetPrice] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    const price = parseFloat(targetPrice);
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price greater than 0.');
      return;
    }
    if (price > 1000000) {
      setError('Price must be less than $1,000,000.');
      return;
    }
    // In a real app, you'd save this alert
    console.log(`Alert set for ${stock.ticker} at ${price}`);
    setError('');
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(''); // Clear error on change
    setTargetPrice(e.target.value);
  };

  return (
    // 1. Backdrop Overlay
    <div 
      className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center"
      onClick={onClose}
    >
      {/* 2. Modal Panel */}
      <div
        className="relative bg-dark-primary rounded-2xl shadow-lg z-50 w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()} // Prevent click-through
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <HiX size={24} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-white text-center mb-4">
          Set Price Alert
        </h2>

        {/* Stock Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={stock.logoUrl} alt={stock.ticker} className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-lg font-semibold text-white">{stock.ticker}</p>
              <p className="text-sm text-gray-400">{stock.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-white">{stock.price.toLocaleString()}</p>
            <p className="text-sm text-accent-green">+{stock.changePercent}%</p>
          </div>
        </div>

        {/* Price Input */}
        <div className="mb-6">
          <input
            type="number"
            value={targetPrice}
            onChange={handleChange}
            placeholder={stock.price.toLocaleString()} // Use dynamic placeholder
            min="0" // Set min value
            step="0.01"
            className="w-full text-center text-4xl font-bold text-white bg-transparent 
              border-b-2 border-gray-700 focus:border-accent-purple 
              focus:outline-none focus:ring-0"
          />
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full bg-accent-purple text-white font-semibold py-3 rounded-lg 
            hover:bg-opacity-80 transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};