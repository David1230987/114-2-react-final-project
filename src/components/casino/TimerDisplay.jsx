import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useData } from "../../Context";
import "./TimerDisplay.css";

export default function TimerDisplay() {
  const { isGambling, setIsGambling } = useData();
  const [seconds, setSeconds] = useState(180);

  const intervalRef = useRef(null);

  function handleStart() {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
  }

  function timeDisplay(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min.toString()}:${sec.toString().padStart(2, "0")}`;
  }

  function handleTimesUp() {
    clearInterval(intervalRef.current);
    setSeconds(180);
    setIsGambling(false);
  }

  useEffect(() => {
    if (isGambling) {
      handleStart();
    }
  }, [isGambling]);

  const navigate = useNavigate();

  useEffect(() => {
    if (seconds <= 0) {
      handleTimesUp();
      navigate("/casino", { replace: true });
    }
  }, [seconds, navigate]);

  return (
    <div>
      <p className="timer">
        剩餘時間 <span className="clock-digits">{timeDisplay(seconds)}</span>
      </p>

      <div className="timer-controls">
        <button className="timer-btn exit" onClick={() => setSeconds(0)}>EXIT</button>
        <button className="timer-btn adjust" onClick={() => setSeconds((sec) => sec + 10)}>+10</button>
        <button className="timer-btn adjust" onClick={() => setSeconds((sec) => sec - 10)}>-10</button>
      </div>
    </div>
  );
}
