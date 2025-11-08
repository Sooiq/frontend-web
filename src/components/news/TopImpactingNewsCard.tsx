import React from 'react';
import { Card } from '../ui/Card';
import { mockTopNews } from '../../data/mockData';
import { HiOutlineChevronDown } from 'react-icons/hi';
import NewsTag from './NewsTag';

const TopImpactingNewsCard: React.FC = () => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Top Impacting News</h2>
        <div className="flex gap-4">
          <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
            Sector <HiOutlineChevronDown />
          </button>
          <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
            Industry <HiOutlineChevronDown />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {mockTopNews.map((item) => (
          <article key={item.id} className="border-b border-gray-700 pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-center text-sm text-gray-400 mb-2">
              <span>{item.date} | {item.time}</span>
              <span className="mx-2">|</span>
              <span className={item.sentiment === 'Positive' ? 'text-green-400' : 'text-red-400'}>
                Sentiment: {item.sentiment} ({item.sentimentScore}%)
              </span>
            </div>
            <a href="/newsarticle" className="group">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:underline">
                {item.title}
              </h3>
            </a>
            <p className="text-sm text-gray-300 mb-4">{item.body}</p>
            <div className="flex gap-2">
              {item.tags.map((tag) => <NewsTag key={tag.text} tag={tag} />)}
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
};

export default TopImpactingNewsCard;