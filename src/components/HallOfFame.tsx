'use client';

import React from 'react';
import { HallOfFameEntry } from '../types/game';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface HallOfFameProps {
  entries: HallOfFameEntry[];
  currentPlayerName?: string;
}

const HallOfFame: React.FC<HallOfFameProps> = ({ entries, currentPlayerName }) => {
  const sortedEntries = [...entries]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20"
    >
      <h2 className="text-2xl font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
        <Trophy className="text-yellow-400" /> Hall of Fame
      </h2>
      
      <ul className="space-y-3">
        {sortedEntries.map((entry, index) => {
          const isCurrentPlayer = entry.playerName === currentPlayerName;
          return (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className={`
                flex items-center justify-between p-3 rounded-lg transition-all
                ${isCurrentPlayer 
                  ? 'bg-blue-500/40 ring-2 ring-blue-400' 
                  : 'bg-white/10'}
              `}
            >
              <div className="flex items-center gap-3">
                <span className={`font-bold text-lg ${
                  index < 3 ? 'text-yellow-300' : 'text-white/70'
                }`}>
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-white">{entry.playerName}</p>
                  <p className="text-sm text-white/60">{new Date(entry.date).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="font-bold text-xl text-white">{entry.score} <span className="text-sm text-white/70">pts</span></p>
            </motion.li>
          );
        })}
        {sortedEntries.length === 0 && (
          <p className="text-center text-white/70 py-4">No scores yet. Be the first!</p>
        )}
      </ul>
    </motion.div>
  );
};

export default HallOfFame;
