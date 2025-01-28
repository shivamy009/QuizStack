import React, { useState, useEffect } from "react";

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Get the stored start time from localStorage
    const storedStartTime = localStorage.getItem("testStartTime");
    if (storedStartTime) {
      const elapsedTime = Math.floor((Date.now() - parseInt(storedStartTime, 10)) / 1000);
      const remainingTime = duration * 60 - elapsedTime;
      return Math.max(remainingTime, 0); // Ensure it doesn't go negative
    } else {
      // If no start time is stored, set it as the current time
      const startTime = Date.now();
      localStorage.setItem("testStartTime", startTime.toString());
      return duration * 60; // Full duration in seconds
    }
  });

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(interval);
          localStorage.removeItem("testStartTime"); // Clean up localStorage
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return <div className="timer">Time Left: {formatTime(timeLeft)}</div>;
};

export default Timer;
