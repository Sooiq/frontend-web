import React from 'react';
import type { NewsTag as NewsTagType } from '../../types';

interface NewsTagProps {
  tag: NewsTagType;
}

const NewsTag: React.FC<NewsTagProps> = ({ tag }) => {
  const colorClasses = tag.color === 'green' 
    ? 'bg-green-500/30 text-green-400' 
    : 'bg-red-500/30 text-red-400';

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${colorClasses}`}>
      {tag.text}
    </span>
  );
};

export default NewsTag;