import React from 'react';
import { GameAnswer } from '../types/game';

interface GameResultsProps {
  score: number;
  answers: GameAnswer[];
}

const GameResults: React.FC<GameResultsProps> = ({ score, answers }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Your Score: {score}</h2>
      <h3 className="text-lg mt-4">Answer Review:</h3>
      <ul className="mt-2">
        {answers.map((answer, index) => (
          <li key={index} className="flex justify-between p-2 border-b">
            <span>{answer.targetPresident.name}</span>
            <span className={answer.isCorrect ? 'text-green-500' : 'text-red-500'}>
              {answer.isCorrect ? '✓' : '✗'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameResults;