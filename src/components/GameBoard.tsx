'use client';

import React from 'react';
import { President } from '../types/game';
import PresidentCard from './PresidentCard';
import { motion } from 'framer-motion';

interface GameBoardProps {
  presidents: President[];
  targetPresident: President;
  onSelectPresident: (president: President) => void;
  currentLevel: number;
  score: number;
  totalLevels: number;
  isTransitioning?: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  presidents,
  targetPresident,
  onSelectPresident,
  currentLevel,
  score,
  totalLevels,
  isTransitioning,
}) => {
  const progressPercentage = (currentLevel / totalLevels) * 100;

  return (
    <motion.div
      key={currentLevel}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-4 md:p-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm md:text-base text-white/80">Level</p>
          <p className="text-2xl md:text-3xl font-bold text-white">
            {currentLevel}
            <span className="text-lg text-white/60">/{totalLevels}</span>
          </p>
        </div>
        <div>
          <p className="text-sm md:text-base text-white/80 text-right">Score</p>
          <p className="text-2xl md:text-3xl font-bold text-white">{score}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/20 rounded-full h-2.5 mb-6">
        <motion.div
          className="bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      {/* Target President */}
      <div className="text-center mb-6 bg-white/10 p-4 rounded-lg shadow-lg">
        <p className="text-lg md:text-xl text-white/80">Find:</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {targetPresident.name}
        </h2>
        <p className="text-md md:text-lg text-white/70">{targetPresident.yearsInService}</p>
      </div>

      {/* Presidents Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
        {presidents.map((president) => (
          <motion.div
            key={president.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: Math.random() * 0.5 }}
          >
            <PresidentCard
              president={president}
              onClick={onSelectPresident}
              disabled={isTransitioning}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GameBoard;
