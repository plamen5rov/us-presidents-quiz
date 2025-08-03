import React from 'react';
import PresidentCard from './PresidentCard';
import { President } from '../types/game';

interface GameBoardProps {
  presidents: President[];
  targetPresident: President;
  onSelect: (president: President) => void;
  currentLevel: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ presidents, targetPresident, onSelect, currentLevel }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold">Level {currentLevel}</h2>
      <h3 className="text-lg">Find: {targetPresident.name} ({targetPresident.yearsInService})</h3>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {presidents.map((president) => (
          <PresidentCard
            key={president.id}
            president={president}
            onClick={() => onSelect(president)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;