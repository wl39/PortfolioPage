import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import TutoringMarking from "../../components/TutoringMarking/TutoringMarking";
import styles from "./MarkingPage.module.css";

import {
  getUnmarkedSubmissions,
  putSubmissions,
} from "../../services/api/HMSService";

const MarkingPage = () => {
  const { studentName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [mark, setMark] = useState({});

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
          id={value.id}
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
      const fetchMarkSubmissions = async () => {
        try {
          const res = await putSubmissions(mark);

          console.log(res);
        } catch (error) {
          console.log(error);
          window.alert("There is an issue...");
        } finally {
          // window.location.reload();
        }
      };

      fetchMarkSubmissions();
    }
  };

  useEffect(() => {
    const fetchUnmarkedSubmissions = async (studentName) => {
      try {
        const submissions = await getUnmarkedSubmissions(studentName);

        setQuestionComponents(submissions);
      } catch (error) {
        console.log(error);

        window.alert("There is an issue...");
      }
    };

    fetchUnmarkedSubmissions(studentName);
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
