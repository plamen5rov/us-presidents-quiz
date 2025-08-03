import React, { useState, useEffect } from 'react';
import PlayerNameInput from '../components/PlayerNameInput';
import GameBoard from '../components/GameBoard';
import GameResults from '../components/GameResults';
import HallOfFame from '../components/HallOfFame';
import { GameState, HallOfFameEntry, President } from '../types/game';

const allPresidents: President[] = [
  // Placeholder data for presidents
  { id: 1, name: 'George Washington', yearsInService: '1789-1797', imageUrl: '/presidents/washington.jpg', order: 1 },
  { id: 2, name: 'John Adams', yearsInService: '1797-1801', imageUrl: '/presidents/adams.jpg', order: 2 },
  // Add more presidents here
];

const HomePage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [hallOfFame, setHallOfFame] = useState<HallOfFameEntry[]>([]);

  const startGame = (playerName: string) => {
    setGameState({
      currentLevel: 1,
      score: 0,
      answers: [],
      playerName,
      gameStarted: true,
      gameCompleted: false,
    });
  };

  const handleSelect = (selectedPresident: President) => {
    if (!gameState) return;
    const isCorrect = selectedPresident.id === getTargetPresident().id;
    const newAnswer = {
      level: gameState.currentLevel,
      targetPresident: getTargetPresident(),
      selectedPresident,
      isCorrect,
    };

    const newScore = isCorrect ? gameState.score + 10 : gameState.score;
    const nextLevel = gameState.currentLevel + 1;

    if (nextLevel > 10) {
      setGameState({ ...gameState, gameCompleted: true, answers: [...gameState.answers, newAnswer], score: newScore });
    } else {
      setGameState({ ...gameState, currentLevel: nextLevel, answers: [...gameState.answers, newAnswer], score: newScore });
    }
  };

  const getTargetPresident = () => {
    // Logic to get the target president for the current level
    return allPresidents[0]; // Placeholder
  };

  return (
    <div className="container mx-auto p-4">
      {!gameState ? (
        <PlayerNameInput onStart={startGame} />
      ) : gameState.gameCompleted ? (
        <GameResults score={gameState.score} answers={gameState.answers} />
      ) : (
        <GameBoard
          presidents={allPresidents}
          targetPresident={getTargetPresident()}
          onSelect={handleSelect}
          currentLevel={gameState.currentLevel}
        />
      )}
      <HallOfFame entries={hallOfFame} currentPlayer={gameState?.playerName || ''} />
    </div>
  );
};

export default HomePage;