import React from 'react';
import { Card } from '../ui/Card';
import type { CompactNewsItem } from '../../types';
import NewsTag from './NewsTag';

interface CompactNewsCardProps {
  title: string;
  items: CompactNewsItem[];
}

const CompactNewsCard: React.FC<CompactNewsCardProps> = ({ title, items }) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <article key={item.id} className="border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
            <a href="/newsarticle" className="group">
              <h3 className="text-md font-medium text-white mb-1.5 group-hover:underline">
                {item.title}
              </h3>
            </a>
            <p className="text-xs text-gray-400 mb-2">{item.date} | {item.time}</p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => <NewsTag key={tag.text} tag={tag} />)}
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
};

export default CompactNewsCard;