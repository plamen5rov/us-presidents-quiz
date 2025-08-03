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

// A more robust shuffle
const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const HomePage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [levelData, setLevelData] = useState<{ presidents: President[]; target: President } | null>(null);
  const [usedTargets, setUsedTargets] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const generateLevel = useCallback(() => {
    // Filter out presidents that have already been a target
    const availablePresidents = allPresidents.filter(p => !usedTargets.includes(p.id));
    const shuffled = shuffleArray(availablePresidents);

    // Select a new target
    const newTarget = shuffled.pop()!;
    setUsedTargets(prev => [...prev, newTarget.id]);

    // Get other presidents for the grid, ensuring the target is not duplicated
    const otherPresidents = allPresidents.filter(p => p.id !== newTarget.id);
    const otherShuffled = shuffleArray(otherPresidents);
    
    const levelPresidents = [newTarget, ...otherShuffled.slice(0, PRESIDENTS_PER_LEVEL - 1)];

    setLevelData({
      presidents: shuffleArray(levelPresidents),
      target: newTarget,
    });
  }, [usedTargets]);

  useEffect(() => {
    if (gameState?.gameStarted && !gameState.gameCompleted) {
      setIsTransitioning(true);
      generateLevel();
      // Let the new level data settle before enabling interaction
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [gameState?.currentLevel, gameState?.gameStarted, gameState?.gameCompleted, generateLevel]);

  const startGame = (playerName: string) => {
    setUsedTargets([]); // Reset used targets for a new game
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
    if (isTransitioning || !gameState || !levelData) return;

    setIsTransitioning(true);
    const isCorrect = selectedPresident.id === levelData.target.id;

    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }

    const newAnswer: GameAnswer = {
      level: gameState.currentLevel,
      targetPresident: levelData.target,
      selectedPresident: selectedPresident,
      isCorrect,
    };

    // Update score and answers
    const newScore = isCorrect ? gameState.score + 10 : gameState.score;
    const updatedAnswers = [...gameState.answers, newAnswer];

    // Transition to the next level or end the game
    setTimeout(() => {
      setGameState(prevState => {
        if (!prevState) return null;

        if (prevState.currentLevel >= TOTAL_LEVELS) {
          const finalState = { ...prevState, score: newScore, answers: updatedAnswers, gameCompleted: true };
          updateHallOfFame(finalState);
          return finalState;
        } else {
          return { ...prevState, score: newScore, answers: updatedAnswers, currentLevel: prevState.currentLevel + 1 };
        }
      });
      // The useEffect for gameState.currentLevel will handle the rest
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
    setLevelData(null);
    setUsedTargets([]);
    setShowConfetti(false);
  };

  const renderContent = () => {
    if (!gameState?.gameStarted) {
      return (
        <motion.div key="playerInput" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <PlayerNameInput onStart={startGame} />
        </motion.div>
      );
    }

    if (gameState.gameCompleted) {
      return (
        <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <GameResults
            score={gameState.score}
            answers={gameState.answers}
            totalLevels={TOTAL_LEVELS}
            onPlayAgain={handlePlayAgain}
          />
        </motion.div>
      );
    }

    if (levelData) {
      return (
        <motion.div key="gameboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <GameBoard
            presidents={levelData.presidents}
            targetPresident={levelData.target}
            onSelectPresident={handleSelectPresident}
            currentLevel={gameState.currentLevel}
            score={gameState.score}
            totalLevels={TOTAL_LEVELS}
            isTransitioning={isTransitioning}
          />
        </motion.div>
      );
    }

    return <div key="loading">Loading...</div>;
  };

  return (
    <main className="min-h-screen bg-gray-900 bg-gradient-to-br from-gray-900 to-purple-900/50 text-white flex flex-col items-center justify-center p-4">
      <ConfettiEffect active={showConfetti} />
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </main>
  );
};

export default HomePage;