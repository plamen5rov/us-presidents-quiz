import React, { useState } from 'react';
import PlayerNameInput from '../components/PlayerNameInput';
import GameBoard from '../components/GameBoard';
import GameResults from '../components/GameResults';
import HallOfFame from '../components/HallOfFame';
import { GameState, HallOfFameEntry } from '../types/game';

const HomePage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [hallOfFame, setHallOfFame] = useState<HallOfFameEntry[]>([]);

  const startGame = (playerName: string) => {
    // Initialize game state
    setGameState({
      currentLevel: 1,
      score: 0,
      answers: [],
      playerName,
      gameStarted: true,
      gameCompleted: false,
    });
  };

  return (
    <div className="container mx-auto p-4">
      {!gameState ? (
        <PlayerNameInput onStart={startGame} />
      ) : gameState.gameCompleted ? (
        <GameResults score={gameState.score} answers={gameState.answers} />
      ) : (
        <GameBoard
          presidents={[]} // Placeholder for president data
          targetPresident={{ id: 0, name: '', yearsInService: '', imageUrl: '', order: 0 }} // Placeholder
          onSelect={() => {}} // Placeholder for selection handler
          currentLevel={gameState.currentLevel}
        />
      )}
      <HallOfFame entries={hallOfFame} currentPlayer={gameState?.playerName || ''} />
    </div>
  );
};

export default HomePage;