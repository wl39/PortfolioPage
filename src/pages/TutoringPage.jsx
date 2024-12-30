import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./TutoringPage.module.css";

import TutoringQuestions from "../components/TutoringQuestions/TutoringQuestions";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

// Once pageParams needs to change it suppose to change to state.
const pageParams = {
  page: 0,
  size: 100,
  sortType: "desc",
  sortParam: "id",
};

function TutoringPage() {
  const [questions, setQuestions] = useState([]);

  const mockQuestion = {
    id: 0,
    title: "Oops! It seems there's no question for today's session.",
    question:
      "Looks like Lim is really putting in the effort to come up with a new one!",
    type: "m",
    candidates: [],
    hint: "You've stumbled upon something interesting!",
    studentsFor: [],
    answer: "a",
    explanation: "",
    generatedDate: "",
    targetDate: "",
    minAgo: 0,
    hourAgo: 0,
    dayAgo: 0,
    minLeft: 0,
    hourLeft: 0,
    dayLeft: 0,
  };

  const [answers, setAnswers] = useState({});

  const { studentsName } = useParams();

  const localUrl = URL + "questions/page/";
  const answerUrl = URL + "submissions/multiples";

  const selectAnswer = useCallback(
    (questionID, answer) => {
      const newAnswer = answers;

      newAnswer[questionID] = {
        answer: "",
        studentName: "",
        submitDate: "",
      };
      newAnswer[questionID].answer = answer;
      newAnswer[questionID].studentName = studentsName;
      newAnswer[questionID].submitDate = new Date(Date.now())
        .toISOString()
        .slice(0, 19);

      setAnswers(newAnswer);
    },
    [answers, studentsName]
  );

  const setQuestionComponents = useCallback(
    (data) => {
      let questionComponents = [];
      data.map((value, index) => {
        questionComponents = [
          <TutoringQuestions
            key={index}
            question={value}
            selectAnswer={selectAnswer}
          />,
          ...questionComponents,
        ];

        return null;
      });

      setQuestions(questionComponents);
    },
    [selectAnswer]
  );

  // const setQuestionComponents = (data) => {};
  useEffect(() => {
    const pageParam =
      "?page=" +
      pageParams.page +
      "&size=" +
      pageParams.size +
      "&sort=" +
      pageParams.sortParam +
      "," +
      pageParams.sortType;
    axios.get(localUrl + studentsName + pageParam).then((response) => {
      setQuestionComponents(response.data.content);
    });
  }, [studentsName, setQuestionComponents]);

  const submit = () => {
    if (window.confirm("Are you sure to submit?")) {
      const finalized = [];

      console.log(answers);
      Object.keys(answers).forEach((key) => {
        const answer = {
          questionId: key,
          studentAnswer: answers[key].answer,
          studentName: answers[key].studentName.toLowerCase(),
          submitDate: answers[key].submitDate,
        };

        finalized.push(answer);
      });

      console.log(finalized);

      axios
        .post(answerUrl, finalized)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          window.alert("There is an issue...");
        })
        .finally(() => {
          window.location.reload();
        });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.h1}>
          {studentsName[0].toUpperCase() + studentsName.slice(1)}
        </h1>
        <Link
          to={"/review/" + studentsName}
          style={{ marginTop: "22px", marginRight: "15px" }}
        >
          <button className={styles.button}>Review</button>
        </Link>
        <Link to={"/submission/" + studentsName} style={{ marginTop: "22px" }}>
          <button className={styles.button}>Submissions</button>
        </Link>
      </div>
      {questions.length === 0 ? (
        <TutoringQuestions question={mockQuestion} />
      ) : (
        questions
      )}
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={submit}
          disabled={questions.length === 0}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default TutoringPage;
