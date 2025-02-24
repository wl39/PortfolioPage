import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "./MathQuestion.module.css";

import { postMathAnswer } from "../../services/api/SimpleMathQuestionService";
import { formatToISO } from "../../utils/dateFormat";

const MathQuestion = ({
  setCorrectAnswer,
  setWrongAnswer,
  studentName,
  showedQuestionsParent,
  correctEvent,
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

  const [isWrong, setIsWrong] = useState(false);
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

  const fetchMathAnswer = async (name, question, answer, submitDate) => {
    try {
      await postMathAnswer(name, question, answer, submitDate);
    } catch (error) {
      console.error(error);

      window.alert("There is an issue...");
    }
  };

  useEffect(() => {
    leftRef.current = left;
    rightRef.current = right;
    showedQuestionsRef.current = showedQuestions;
  }, [left, right, showedQuestions]);

  useEffect(() => {
    setNumber(); // 문제를 설정하는 함수 호출

    const intervalId = setInterval(() => {
      if (showedQuestionsRef.current > max_questions) {
        clearInterval(intervalId); // 문제 수가 최대를 넘으면 타이머 종료
      }

      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          const formattedDate = formatToISO(Date.now());

          fetchMathAnswer(
            studentName,
            `${leftRef.current} + ${rightRef.current}`,
            -1,
            formattedDate
          );

          setNumber();
          setStudentAnswer("");

          setIsWrong(true);
          counter.current += 0.02;

          return counter.current * milliSeconds; // 타이머 리셋
        }
        return prevTimer - 10;
      });
    }, 10);

    return () => clearInterval(intervalId); // cleanup: 컴포넌트가 언마운트될 때 interval을 정리
  }, [setNumber, studentName, setWrongAnswer]);

  useEffect(() => {
    if (isWrong) {
      setWrongAnswer((prev) => prev + 1);
      setIsWrong(false);
    }
  }, [isWrong, setWrongAnswer]);

  const resetTimer = () => {
    setTimer(counter.current * milliSeconds);
    setNumber();
    setStudentAnswer("");
  };

  const inputHandler = (e) => {
    if (e.target.value) {
      setStudentAnswer(parseInt(e.target.value));

      if (parseInt(e.target.value) === answer) {
        const formattedDate = formatToISO(Date.now());

        fetchMathAnswer(
          studentName,
          `${left} + ${right}`,
          answer,
          formattedDate
        );

        setCorrectAnswer((prev) => prev + 1); // 정답 개수 증가
        counter.current = counter.current - 0.1; // 타이머 속도 증가
        resetTimer();
        correctEvent("Good job!");
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
      <h1>100 Questions DONE</h1>
      <p>Try again later.</p>
    </div>
  );
};

export default MathQuestion;
