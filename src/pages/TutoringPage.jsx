import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./TutoringPage.module.css";

import TutoringQuestions from "../components/TutoringQuestions/TutoringQuestions";
import axios from "axios";

function TutoringPage() {
  const [questions, setQuestions] = useState([]);

  const pageParams = {
    page: 0,
    size: 5,
    sortType: "desc",
    sortParam: "id",
  };

  const mockQuestion = {
    id: 0,
    title: "There is no question today!!",
    question: "Lim is hardworking for making a new question...!",
    type: "m",
    candidates: [],
    hint: "You found somthing!",
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
  // const localUrl = "http://localhost:8080/api/v1/questions/page/";
  const localUrl = "http://91b.co.uk/api/v1/questions/page/";

  // const answerUrl = "http://localhost:8080/api/v1/submission/multiples";
  const answerUrl = "http://91b.co.uk/api/v1/submission/multiples";

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
  }, []);

  const setQuestionComponents = (data) => {
    let questionComponents = [];
    data.map((value, index) => {
      questionComponents = [
        ...questionComponents,
        <TutoringQuestions
          key={index}
          question={value}
          selectAnswer={selectAnswer}
        />,
      ];
    });

    setQuestions(questionComponents);
  };

  const selectAnswer = (questionID, answer) => {
    const newAnswer = answers;

    newAnswer[questionID] = {
      answer: "",
      studentsName: "",
      submitDate: "",
    };
    newAnswer[questionID].answer = answer;
    newAnswer[questionID].studentName = studentsName;
    newAnswer[questionID].submitDate = new Date(Date.now())
      .toISOString()
      .slice(0, 19);

    setAnswers(newAnswer);
  };

  const submit = () => {
    if (window.confirm("Are you sure to submit?")) {
      const finalized = [];

      Object.keys(answers).forEach((key) => {
        const answer = {
          questionId: key,
          studentAnswer: answers[key].answer,
          studentName: answers[key].studentName,
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
