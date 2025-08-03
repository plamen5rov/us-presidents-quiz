import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiEffect: React.FC<{ duration?: number }> = ({ duration = 4000 }) => {
  useEffect(() => {
    const fire = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    };

    fire();
    const timer = setTimeout(() => {
      confetti.reset();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return null;
};

export default ConfettiEffect;