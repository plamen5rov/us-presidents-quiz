'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { President } from '../types/game';

interface PresidentCardProps {
  president: President;
  onClick: (president: President) => void;
  disabled?: boolean;
}

const PresidentCard: React.FC<PresidentCardProps> = ({ president, onClick, disabled }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    // Ripple effect
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);

    onClick(president);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError(true);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const fallbackImageUrl = '/presidents/fallback.jpg'; // A generic fallback image

  return (
    <div className="relative w-full h-full aspect-[4/5] min-h-[120px]">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse"></div>
      )}
      {error && (
        <div className="absolute inset-0 bg-red-100 rounded-lg flex items-center justify-center">
          <span className="text-red-500 text-xs text-center">Image not available</span>
        </div>
      )}
      <button
        onClick={handleClick}
        disabled={disabled || error}
        className={`
          relative w-full h-full rounded-lg overflow-hidden 
          shadow-md hover:shadow-xl focus:outline-none 
          transition-all duration-300 ease-in-out
          transform hover:scale-105 focus:scale-105
          border-2 border-transparent hover:border-blue-500 focus:border-blue-500
          ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
          ${error ? 'hidden' : 'block'}
        `}
      >
        <Image
          src={president.imageUrl}
          alt={president.name}
          fill
          sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
          unoptimized={process.env.NODE_ENV === 'development'} // To prevent issues with local image paths
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-all duration-300"></div>
        <span className="ripple-container"></span>
      </button>
    </div>
  );
};

export default PresidentCard;
