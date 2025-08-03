import React from 'react';
import { HallOfFameEntry } from '../types/game';

interface HallOfFameProps {
  entries: HallOfFameEntry[];
  currentPlayer: string;
}

const HallOfFame: React.FC<HallOfFameProps> = ({ entries, currentPlayer }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Hall of Fame</h2>
      <ul className="mt-4">
        {entries.map((entry, index) => (
          <li key={index} className={`flex justify-between p-2 border-b ${entry.playerName === currentPlayer ? 'font-bold' : ''}`}> 
            <span>{entry.playerName}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HallOfFame;