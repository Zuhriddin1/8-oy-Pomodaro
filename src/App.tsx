import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Timer = styled.div<{ isSession: boolean }>`
  font-size: 3rem;
  font-weight: bold;
  color: ${(props) =>
    props.isSession ? "green" : "red"}; /* Change color based on session */
`;
const TimerType = styled.div`
  font-size: 1.5rem;
  margin-top: 0.5rem;
`;
const Controls = styled.div`
  display: flex;
  margin-top: 2rem;
  button {
    background: none;
    border: none;
    font-size: 2rem;
    margin: 0 1rem;
    cursor: pointer;
  }
`;
const App: React.FC = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [isSession, setIsSession] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  useEffect(() => {
    if (timeLeft === 0) {
      setIsSession((prevIsSession) => !prevIsSession);
      setTimeLeft((prevTimeLeft) =>
        isSession ? breakLength * 60 : sessionLength * 60
      );
    }
  }, [timeLeft, sessionLength, breakLength, isSession]);
  useEffect(() => {
    if (!isRunning) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };
  const handleReset = () => {
    setIsRunning(false);
    setIsSession(true);
    setTimeLeft(sessionLength * 60);
  };
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <Container>
      <TimerContainer>
        <Timer isSession={isSession}>{formatTime(timeLeft)}</Timer>
        <TimerType>{isSession ? "Work time" : "Break time"}</TimerType>
      </TimerContainer>
      <Controls>
        <button onClick={handleStartStop}>
          {isRunning ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleReset} title="Reset">
          <FaRedo />
        </button>
      </Controls>
    </Container>
  );
};
export default App;
