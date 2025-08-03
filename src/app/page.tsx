'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { GameState, President, GameAnswer, HallOfFameEntry } from '../types/game';
import { presidents as allPresidents } from '../data/presidents';
import PlayerNameInput from '../components/PlayerNameInput';
import GameBoard from '../components/GameBoard';
import GameResults from '../components/GameResults';
import ConfettiEffect from '../components/ConfettiEffect';
import { motion, AnimatePresence } from 'framer-motion';

const TOTAL_LEVELS = 10;
const PRESIDENTS_PER_LEVEL = 12;

const HomePage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [levelPresidents, setLevelPresidents] = useState<President[]>([]);
  const [targetPresident, setTargetPresident] = useState<President | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const generateLevel = useCallback(() => {
    const shuffledPresidents = shuffleArray([...allPresidents]);
    const selectedPresidents = shuffledPresidents.slice(0, PRESIDENTS_PER_LEVEL);
    const target = selectedPresidents[Math.floor(Math.random() * selectedPresidents.length)];
    
    setLevelPresidents(shuffleArray(selectedPresidents));
    setTargetPresident(target);
  }, []);

  useEffect(() => {
    if (gameState?.gameStarted && !gameState.gameCompleted) {
      setIsTransitioning(true);
      generateLevel();
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [gameState?.currentLevel, gameState?.gameStarted, gameState?.gameCompleted, generateLevel]);

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

  const handleSelectPresident = (selectedPresident: President) => {
    if (!gameState || isTransitioning || !targetPresident) return;

    const isCorrect = selectedPresident.id === targetPresident.id;

    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }

    const newAnswer: GameAnswer = {
      level: gameState.currentLevel,
      targetPresident: targetPresident,
      selectedPresident: selectedPresident,
      isCorrect,
    };

    const newScore = isCorrect ? gameState.score + 10 : gameState.score;
    
    setIsTransitioning(true);

    setTimeout(() => {
      setGameState(prevState => {
        if (!prevState) return null;
        const nextState = { ...prevState, score: newScore, answers: [...prevState.answers, newAnswer] };

        if (prevState.currentLevel >= TOTAL_LEVELS) {
          const finalState = { ...nextState, gameCompleted: true };
          updateHallOfFame(finalState);
          return finalState;
        } else {
          return { ...nextState, currentLevel: prevState.currentLevel + 1 };
        }
      });
      setIsTransitioning(false);
    }, isCorrect ? 2000 : 1000);
  };
  
  const updateHallOfFame = (finalGameState: GameState) => {
    try {
      const newEntry: HallOfFameEntry = {
        playerName: finalGameState.playerName,
        score: finalGameState.score,
        totalLevels: TOTAL_LEVELS,
        date: new Date().toISOString(),
      };
      const storedData = localStorage.getItem('hallOfFame');
      const hallOfFame = storedData ? JSON.parse(storedData) : [];
      hallOfFame.push(newEntry);
      localStorage.setItem('hallOfFame', JSON.stringify(hallOfFame));
    } catch (error) {
      console.error("Failed to update Hall of Fame in localStorage", error);
    }
  };

  const handlePlayAgain = () => {
    setGameState(null);
    setShowConfetti(false);
  };

  return (
    <main className="min-h-screen bg-gray-900 bg-gradient-to-br from-gray-900 to-purple-900/50 text-white flex flex-col items-center justify-center p-4">
      <ConfettiEffect active={showConfetti} />
      <AnimatePresence mode="wait">
        {!gameState?.gameStarted ? (
          <motion.div key="playerInput" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PlayerNameInput onStart={startGame} />
          </motion.div>
        ) : gameState.gameCompleted ? (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GameResults
              score={gameState.score}
              answers={gameState.answers}
              totalLevels={TOTAL_LEVELS}
              onPlayAgain={handlePlayAgain}
            />
          </motion.div>
        ) : targetPresident ? (
          <motion.div key="gameboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GameBoard
              presidents={levelPresidents}
              targetPresident={targetPresident}
              onSelectPresident={handleSelectPresident}
              currentLevel={gameState.currentLevel}
              score={gameState.score}
              totalLevels={TOTAL_LEVELS}
              isTransitioning={isTransitioning}
            />
          </motion.div>
        ) : (
          <div key="loading">Loading...</div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default HomePage;
