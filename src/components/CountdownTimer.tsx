
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center space-x-1 space-x-reverse font-tajawal">
      <span className="font-mono font-bold">{timeLeft.days}ي</span>
      <span className="text-sm">:</span>
      <span className="font-mono font-bold">{timeLeft.hours.toString().padStart(2, '0')}س</span>
      <span className="text-sm">:</span>
      <span className="font-mono font-bold">{timeLeft.minutes.toString().padStart(2, '0')}د</span>
      <span className="text-sm">:</span>
      <span className="font-mono font-bold">{timeLeft.seconds.toString().padStart(2, '0')}ث</span>
    </div>
  );
};

export default CountdownTimer;
