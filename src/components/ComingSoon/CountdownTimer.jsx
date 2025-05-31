import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialDays, initialHours, initialMinutes, initialSeconds }) => {
  const [days, setDays] = useState(initialDays);
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else if (days > 0) {
        setDays(days - 1);
        setHours(23);
        setMinutes(59);
        setSeconds(59);
      } else {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [days, hours, minutes, seconds]);

  const TimeUnit = ({ value, label }) => {
    return (
      <div className="flex flex-col items-center">
        <div className="bg-[#0B1221]/80 border border-gray-800 rounded-lg w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center mb-1">
          <span className="text-2xl sm:text-3xl font-bold text-[#00FFD1]">{value}</span>
        </div>
        <span className="text-[10px] sm:text-xs text-gray-400 font-medium">{label}</span>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6">
      <TimeUnit value={days} label="DAYS" />
      <TimeUnit value={hours} label="HOURS" />
      <TimeUnit value={minutes} label="MINUTES" />
      <TimeUnit value={seconds} label="SECONDS" />
    </div>
  );
};

export default CountdownTimer;



