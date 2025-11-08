// src/components/dashboard/NewsCard.tsx
import React from 'react';
import { Card } from '../ui/Card';
import { mockNews } from '../../data/mockData';
import { HiOutlineChevronDown } from 'react-icons/hi';
import NewsTag from '../news/NewsTag';

const NewsCard: React.FC = () => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">News</h2>
        <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
          Global <HiOutlineChevronDown />
        </button>
      </div>
      
      <div className="space-y-4">
        {mockNews.map((item) => (
          <div key={item.id} className="border-b border-gray-700 pb-3 last:border-b-0">
            <p className="text-xs text-gray-500">{item.date} | {item.time}</p>
            <h3 className="text-md font-medium text-white my-1">{item.title}</h3>
            <div className="flex gap-2 mt-1">
              {item.tags.map((tag) => (
                <NewsTag key={tag.text} tag={tag} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NewsCard;