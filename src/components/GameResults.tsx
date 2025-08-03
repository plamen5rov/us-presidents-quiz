'use client';

import React from 'react';
import { GameAnswer } from '../types/game';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';

interface GameResultsProps {
  score: number;
  answers: GameAnswer[];
  totalLevels: number;
  onPlayAgain: () => void;
}

const GameResults: React.FC<GameResultsProps> = ({ score, answers, totalLevels, onPlayAgain }) => {
  const percentage = Math.round((score / (totalLevels * 10)) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-2xl border border-white/20"
    >
      {/* Score Section */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
        >
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-2" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white/80">Game Over!</h2>
        <p className="text-5xl md:text-6xl font-bold text-white my-2">{score}</p>
        <p className="text-xl text-blue-300">{percentage}% Correct</p>
      </div>

      {/* Answer Review */}
      <h3 className="text-xl font-bold text-white mb-4 text-center">Answer Review</h3>
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {answers.map((answer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            className={`p-3 rounded-lg flex items-center gap-4 ${
              answer.isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}
          >
            <div className="flex-shrink-0">
              {answer.isCorrect ? (
                <CheckCircle className="w-6 h-6 text-green-400" />
              ) : (
                <XCircle className="w-6 h-6 text-red-400" />
              )}
            </div>
            <div className="flex-shrink-0 relative w-12 h-16 rounded-md overflow-hidden">
              <Image
                src={answer.targetPresident.imageUrl}
                alt={answer.targetPresident.name}
                fill
                sizes="50px"
                className="object-cover"
              />
            </div>
            <div className="flex-grow text-white">
              <p className="font-semibold">{answer.targetPresident.name}</p>
              {!answer.isCorrect && (
                <p className="text-sm text-white/80">
                  Your pick: {answer.selectedPresident?.name || 'None'}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Play Again Button */}
      <motion.button
        onClick={onPlayAgain}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="
          w-full mt-8 bg-blue-500 text-white font-bold py-3 px-4 rounded-lg 
          hover:bg-blue-600 transition-colors duration-300
          shadow-lg hover:shadow-blue-500/50
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900
        "
      >
        Play Again
      </motion.button>
    </motion.div>
  );
};

export default GameResults;
