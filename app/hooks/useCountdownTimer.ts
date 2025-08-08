import { useEffect, useState } from 'react';
import { formatTimeRemaining } from '../utils';

export const useCountdownTimer = (deadline: string) => {
  const [timeRemaining, setTimeRemaining] = useState(new Date(deadline));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => new Date(prev.getTime() - 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return timeRemaining.toISOString();
};
