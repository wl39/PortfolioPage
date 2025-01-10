import React, { useEffect, useState, useCallback } from "react";

const MathQuestion = () => {
  const [counter, setCounter] = useState(30);
  const [timer, setTimer] = useState(3000);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [answer, setAnswer] = useState(0);

  const min = 99;
  const max = 999;

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const setNumber = useCallback(() => {
    const l = getRandomInt(min, max);
    const r = getRandomInt(min, max);
    setLeft(l);
    setRight(r);
    setAnswer(l + r);
  }, []);

  useEffect(() => {
    setNumber();
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          setNumber(); // Execute setNumber when timer reaches 0
          return 3000; // Reset the timer
        }
        return prevTimer - 100;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [setNumber]);

  return (
    <div>
      <div>
        {left} + {right}
      </div>
      <input type="number" placeholder="Enter your answer" />
      <div>Timer: {timer / 1000} seconds</div>
    </div>
  );
};

export default MathQuestion;
