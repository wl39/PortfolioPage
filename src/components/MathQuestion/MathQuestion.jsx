import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "./MathQuestion.module.css";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;
const localUrl = URL + "simple_math";

const MathQuestion = ({
  setCorrectAnswer,
  studentName,
  showedQuestionsParent,
}) => {
  const max_questions = 100;
  const milliSeconds = 1000;

  const [showedQuestions, setShowedQuestions] = useState(showedQuestionsParent);
  const counter = useRef(10);

  const [studentAnswer, setStudentAnswer] = useState("");
  const [timer, setTimer] = useState(counter.current * milliSeconds);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [answer, setAnswer] = useState(0);

  const leftRef = useRef(left);
  const rightRef = useRef(right);
  const showedQuestionsRef = useRef(showedQuestions);

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

    setShowedQuestions((prev) => prev + 1);
  }, []);

  useEffect(() => {
    leftRef.current = left;
    rightRef.current = right;
    showedQuestionsRef.current = showedQuestions;
  }, [left, right, showedQuestions]);

  useEffect(() => {
    setNumber();

    const intervalId = setInterval(() => {
      if (showedQuestionsRef.current > max_questions) {
        clearInterval(intervalId);
      }

      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          const date = new Date();
          const koreaTime = new Date(
            date.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
          );
          const formattedDate = koreaTime.toISOString();

          axios.post(localUrl, {
            name: studentName,
            answer: -1,
            question: `${leftRef.current} + ${rightRef.current}`,
            submitDate: formattedDate,
          });

          setNumber();
          setStudentAnswer("");
          counter.current += 0.02;

          return counter.current * milliSeconds;
        }
        return prevTimer - 10;
      });
    }, 10);

    return () => clearInterval(intervalId);
  }, [setNumber, studentName]);

  const resetTimer = () => {
    setTimer(counter.current * milliSeconds);
    setNumber();
    setStudentAnswer("");
  };

  const inputHandler = (e) => {
    if (e.target.value) {
      setStudentAnswer(parseInt(e.target.value));

      if (parseInt(e.target.value) === answer) {
        const date = new Date();
        const koreaTime = new Date(
          date.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
        );
        const formattedDate = koreaTime.toISOString();

        axios.post(localUrl, {
          name: studentName,
          answer: answer,
          question: `${left} + ${right}`,
          submitDate: formattedDate,
        });

        setCorrectAnswer((prev) => prev + 1);
        counter.current = counter.current - 0.1;
        resetTimer();
      }
    } else {
      setStudentAnswer("");
    }
  };

  return showedQuestions <= max_questions ? (
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
        <div className={styles.timerText}>{(timer / 1000).toFixed(2)}</div>
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
  ) : (
    <div className={styles.doneMessage}>
      {console.log(showedQuestions)}
      <h1>100 Questions DONE</h1>
      <p>Try again later.</p>
    </div>
  );
};

export default MathQuestion;
