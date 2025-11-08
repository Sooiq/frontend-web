import React, {useState} from 'react';
import { StockDetail } from '../../types';
import { HiPlus, HiOutlineBell } from 'react-icons/hi';
import { Card } from '../ui/Card'; // Re-using our base card
import { SetPriceAlertModal } from './SetPriceAlertModal';

// Sub-components for clarity
const StockHeaderCard: React.FC<{ stock: StockDetail }> = ({ stock }) => (
  <Card className="flex flex-col md:flex-row items-center justify-between p-4">
    <div className="flex items-center gap-4">
      <img src={stock.logoUrl} alt={stock.ticker} className="w-12 h-12 rounded-full" />
      <div>
        <h2 className="text-2xl font-bold text-white">{stock.ticker}</h2>
        <p className="text-sm text-gray-400">{stock.name}</p>
      </div>
    </div>
    <div className="flex items-center gap-4 mt-4 md:mt-0">
      <div className="text-right">
        <p className="text-2xl font-bold text-white">{stock.price.toLocaleString()}</p>
        <p className="text-sm text-accent-green">+{stock.changePercent}%</p>
      </div>
      <div className="hidden md:block w-px h-10 bg-gray-700 mx-2"></div>
      <div className="text-left">
        <p className="text-sm font-semibold text-white">Return Forecast</p>
        <div className="flex gap-4 text-xs">
          {stock.returnForecasts.map((item) => (
            <div key={item.period} className="text-center">
              <span className="text-accent-green">+{item.change}%</span>
              <span className="block text-gray-500">{item.period}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Card>
);

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
export const StockDetailView: React.FC<{ stock: StockDetail }> = ({ stock }) => {
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            {/* Row 1: Header Card */}
            <StockHeaderCard stock={stock} />

            {/* Row 2: Buttons */}
            <div className="flex gap-4">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-dark-tertiary text-white px-4 py-2 rounded-lg hover:bg-opacity-80">
                <HiPlus size={20} /> Add to Watchlist
                </button>
                <button onClick={() => setIsAlertModalOpen(true)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-dark-tertiary text-white px-4 py-2 rounded-lg hover:bg-opacity-80">
                <HiOutlineBell size={20} /> Add Alert
                </button>
            </div>

            {/* Row 3: Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                <CandlestickChart />
                </div>
                <div className="lg:col-span-1 space-y-6">
                <KeyInsightsCard insights={stock.keyInsights} />
                <AnalysisCard analysis={stock.analysis} />
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