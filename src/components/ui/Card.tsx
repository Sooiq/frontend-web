// src/components/ui/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string; // To allow for extra custom classes
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-dark-secondary rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
};