import React from 'react';
import TopImpactingNewsCard from '../components/news/TopImpactingNewsCard';
import CompactNewsCard from '../components/news/CompactNewsCard';
import { mockDomesticNews, mockWatchlistNews } from '../data/mockData';

const News: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Card */}
      <TopImpactingNewsCard />

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CompactNewsCard title="Domestic News" items={mockDomesticNews} />
        <CompactNewsCard title="Watchlist News" items={mockWatchlistNews} />
      </div>
    </div>
  );
};

export default News;