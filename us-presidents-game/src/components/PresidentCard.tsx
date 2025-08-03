import React from 'react';
import { President } from '../types/game';

interface PresidentCardProps {
  president: President;
  onClick: () => void;
}

const PresidentCard: React.FC<PresidentCardProps> = ({ president, onClick }) => {
  return (
    <div
      className="border rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
      onClick={onClick}
    >
      <img
        src={president.imageUrl}
        alt={president.name}
        className="w-full h-auto"
        onError={(e) => {
          e.currentTarget.src = '/path/to/fallback-image.jpg'; // Fallback image
        }}
      />
      <div className="p-4">
        <h4 className="font-bold text-center">{president.name}</h4>
      </div>
    </div>
  );
};

export default PresidentCard;