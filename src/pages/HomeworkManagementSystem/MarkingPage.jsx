import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TutoringMarking from "../../components/TutoringMarking/TutoringMarking";
import styles from "./MarkingPage.module.css";

const URL = process.env.REACT_APP_API_URL;

const MarkingPage = () => {
  const { studentName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [mark, setMark] = useState({});

  const localUrl = URL + "submissions/saq?studentName=";

  const markUrl = URL + "submissions/marks?studentName=";

  const marks = (key, value) => {
    setMark((prevMark) => ({
      ...prevMark,
      [key]: value,
    }));
  };

  const setQuestionComponents = useCallback((data) => {
    let questionComponents = [];
    let newMark = {};

    data.map((value, index) => {
      newMark = {
        ...newMark,
        [value.question.id]: 0,
      };

      questionComponents = [
        ...questionComponents,
        <TutoringMarking
          key={index}
          question={value.question}
          submission={value.studentAnswer}
          marks={(k, v) => marks(k, v)}
        />,
      ];

      return null;
    });

    setQuestions(questionComponents);
    setMark(newMark);
  }, []);

  const markSubmissions = () => {
    if (window.confirm("Are you sure to submit?")) {
      axios
        .put(markUrl + studentName, mark)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          window.alert("There is an issue...");
        })
        .finally(() => window.location.reload());
    }
  };

  useEffect(() => {
    axios.get(localUrl + studentName).then((res) => {
      setQuestionComponents(res.data.content);
    });
  }, [studentName, setQuestionComponents]);
  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>{studentName}</h1>
      {questions}
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={markSubmissions}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default MarkingPage;
