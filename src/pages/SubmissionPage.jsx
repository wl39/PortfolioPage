import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./SubmissionPage.module.css";
import axios from "axios";
import Submission from "../components/Submission/Submission";

function SubmissionPage() {
  const { studentsName } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const pageParams = {
    page: 0,
    size: 100,
    sortType: "desc",
    sortParam: "id",
  };

  const emptyQuestion = {
    id: 0,
    title: "There is no submission!",
    question: "Comeback after you finished to answer the questions.",
    type: "m",
    candidates: [],
    hint: "Please, comeback after you finished to answer the questions.",
    studentsFor: [],
    answer: "a",
    explanation: "",
    generatedDate: "",
    targetDate: "",
    minAgo: 430,
    hourAgo: 7,
    dayAgo: 0,
    minLeft: 0,
    hourLeft: 0,
    dayLeft: 0,
  };

  const [totalQuestions, setTotalQuestions] = useState(1);
  const [totalCorrectQuestions, setTotalCorrectQuestions] = useState(1);

  const localUrl =
    "http://localhost:8080/api/v1/submissions?studentName=" +
    studentsName +
    "&";
  //   const localUrl = "http://91b.co.uk/api/v1/questions/" + studentsName + "&";

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
    axios.get(localUrl + pageParam).then((response) => {
      setTotalQuestions(response.data.numberOfElements);
      setSubmissionComponents(response.data.content);
    });
  }, []);

  const setSubmissionComponents = (data) => {
    let submissionComponents = [];
    let correctQuestions = 0;
    data.map((value, index) => {
      if (value.studentAnswer === value.question.answer) correctQuestions++;
      submissionComponents = [
        ...submissionComponents,
        <Submission
          key={index}
          question={value.question}
          studentAnswer={value.studentAnswer}
          submitDate={value.submitDate}
          id={value.id}
        />,
      ];
    });
    setTotalCorrectQuestions(correctQuestions);
    setSubmissions(submissionComponents);
  };
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.h1}>
          {studentsName[0].toUpperCase() + studentsName.slice(1)}
        </h1>
        <Link to={"/tutoring/" + studentsName} style={{ marginTop: "22px" }}>
          <button className={styles.button}>Questions</button>
        </Link>
      </div>
      {!totalQuestions ? null : (
        <div className={styles.score}>
          Score{": "}
          {((totalCorrectQuestions / totalQuestions) * 100).toFixed(2)}% (
          {totalCorrectQuestions} / {totalQuestions}){" "}
        </div>
      )}
      {submissions.length === 0 ? (
        <Submission
          question={emptyQuestion}
          studentAnswer={""}
          submitDate={""}
          id={0}
        />
      ) : (
        submissions
      )}
    </div>
  );
}

export default SubmissionPage;
