import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function Timer({ totalSeconds = 1200, onTimeUp, isRunning = true }) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, onTimeUp]);

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const isLow = secondsLeft < 120;

  return (
    <div className={`flex items-center gap-2 font-mono text-2xl font-bold ${
      isLow ? "text-red-400" : "text-white"
    }`}>
      <Clock className="w-6 h-6" />
      <span>{String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}</span>
    </div>
  );
}