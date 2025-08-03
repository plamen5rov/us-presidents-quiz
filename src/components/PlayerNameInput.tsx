'use client';

import React, { useState, useEffect } from 'react';
import { HallOfFameEntry } from '../types/game';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface PlayerNameInputProps {
  onStart: (name: string) => void;
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({ onStart }) => {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [hallOfFame, setHallOfFame] = useState<HallOfFameEntry[]>([]);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('hallOfFame');
      if (storedData) {
        setHallOfFame(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Failed to read from localStorage", error);
    }
  }, []);

  const handleStart = () => {
    if (playerName.trim().length < 2) {
      setError('Please enter a name with at least 2 characters.');
      return;
    }
    setError('');
    onStart(playerName.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          US Presidents Quiz
        </h2>
        <p className="text-center text-white/80 mb-6">
          Test your knowledge of American history.
        </p>
        
        <div className="relative">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`
              w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 
              border ${error ? 'border-red-500/80' : 'border-white/30'}
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
              transition-all duration-300
            `}
            placeholder="Enter your name"
            aria-label="Player name"
            aria-describedby="name-error"
          />
          {error && (
            <p id="name-error" className="text-red-400 text-sm mt-2 absolute -bottom-6 left-0">
              {error}
            </p>
          )}
        </div>

        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            w-full mt-8 bg-blue-500 text-white font-bold py-3 px-4 rounded-lg 
            hover:bg-blue-600 transition-colors duration-300
            shadow-lg hover:shadow-blue-500/50
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900
          "
        >
          Start Game
        </motion.button>
      </motion.div>

      {hallOfFame.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20"
        >
          <h3 className="text-xl font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
            <Trophy className="text-yellow-400" /> Hall of Fame
          </h3>
          <ul className="space-y-2">
            {hallOfFame.slice(0, 5).map((entry, index) => (
              <li key={index} className="flex justify-between items-center text-white/90 bg-white/10 px-4 py-2 rounded-md">
                <span className="font-semibold">{index + 1}. {entry.playerName}</span>
                <span className="font-bold">{entry.score} pts</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default PlayerNameInput;
