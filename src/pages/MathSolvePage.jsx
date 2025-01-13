import React, { useEffect, useState } from "react";
import MathQuestion from "../components/MathQuestion/MathQuestion";
import RobuxAdder from "../components/RobuxAdder/RobuxAdder";

const MathSolvePage = () => {
  const [time, setTime] = useState(3);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [questions, setQuestions] = useState(50);
  const [wrongAnswer, setWrongAnswer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        fontSize: "200px",
        fontWeight: "900",
        margin: "auto",
        textAlign: "center",
      }}
    >
      {time > 0 ? (
        time
      ) : (
        <>
          <MathQuestion setCorrectAnswer={setCorrectAnswer} />
          <RobuxAdder correctAnswer={correctAnswer} />
        </>
      )}
    </div>
  );
};

export default MathSolvePage;
