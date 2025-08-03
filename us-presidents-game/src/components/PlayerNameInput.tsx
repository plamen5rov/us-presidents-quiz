import React, { useState } from 'react';

const PlayerNameInput: React.FC<{ onStart: (name: string) => void }> = ({ onStart }) => {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (playerName.trim() === '') {
      setError('Please enter your name.');
    } else {
      onStart(playerName);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-white">Enter Your Name</h1>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="mt-2 p-2 rounded border border-gray-300"
        placeholder="Your Name"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={handleStart}
        className="mt-4 bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-gray-200 transition"
      >
        Start Game
      </button>
    </div>
  );
};

export default PlayerNameInput;