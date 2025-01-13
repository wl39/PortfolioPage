import React, { useEffect, useState, useCallback } from "react";
import styles from "./MathQuestion.module.css";

const MathQuestion = ({ setCorrectAnswer }) => {
  const milliSeconds = 1000;
  const [counter, setCounter] = useState(10);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [timer, setTimer] = useState(counter * milliSeconds);
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
    console.log(l + r);
  }, []);

  useEffect(() => {
    setNumber();
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          setNumber(); // Execute setNumber when timer reaches 0
          setStudentAnswer("");
          return counter * milliSeconds; // Reset the timer
        }
        return prevTimer - 10;
      });
    }, 10);

    return () => clearInterval(intervalId);
  }, [setNumber, counter]);

  const resetTimer = () => {
    setTimer(counter * milliSeconds);
    setNumber();
    setStudentAnswer("");
  };

  const inputHandler = (e) => {
    if (e.target.value) {
      setStudentAnswer(parseInt(e.target.value));

      if (parseInt(e.target.value) === answer) {
        setCorrectAnswer((prev) => {
          return prev + 1;
        });
        resetTimer();
      }
    } else {
      setStudentAnswer("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <div style={{ width: "220px" }}>{left}</div>
        <div>+</div>
        <div style={{ width: "220px" }}>{right}</div>
        <div>=</div>
      </div>
      <input
        type="number"
        placeholder="Enter your answer"
        onChange={(e) => inputHandler(e)}
        value={studentAnswer}
        className={styles.answer}
      />
      <div className={styles.timer}>
        <div>Timer: </div>
        <div style={{ width: "105px", marginLeft: "8px" }}>
          {(timer / 1000).toFixed(2)}
        </div>
        <div> seconds</div>
      </div>

      <div
        style={{
          marginTop: "20px",
          height: "40px",
          width: "inherit",
        }}
      >
        <div
          style={{
            height: "inherit",
            background: "black",
            width: `${timer / 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default MathQuestion;
