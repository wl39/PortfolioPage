import React, { useEffect, useState } from "react";
import MathQuestion from "../components/MathQuestion/MathQuestion";
import RobuxAdder from "../components/RobuxAdder/RobuxAdder";

import { useLocation } from "react-router-dom";
import styles from "./MathSolvePage.module.css";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const MathSolvePage = () => {
  const location = useLocation();
  const localURL = URL + "simple_math/count?name=";

  const { name } = location.state || {};

  const [showedQuestions, setShowedQuestions] = useState(100);

  const [time, setTime] = useState(3);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  useEffect(() => {
    if (name) {
      axios
        .get(localURL + name)
        .then((res) => {
          setShowedQuestions(res.data);

          if (res.data < 100) {
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
          }
        })
        .catch((err) => {
          console.log(err);
          window.alert("There is something wrong with the server");
        });
    }
  }, [name]);

  return name ? (
    <div
      style={{
        fontSize: "200px",
        fontWeight: "900",
        margin: "auto",
        textAlign: "center",
      }}
      className={styles.font}
    >
      {time > 0 ? (
        time
      ) : (
        <div>
          <MathQuestion
            setCorrectAnswer={setCorrectAnswer}
            studentName={name}
            showedQuestionsParent={showedQuestions}
          />
          <RobuxAdder correctAnswer={correctAnswer} />
        </div>
      )}
    </div>
  ) : null;
};

export default MathSolvePage;
