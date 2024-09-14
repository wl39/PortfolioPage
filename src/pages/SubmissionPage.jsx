import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./SubmissionPage.module.css";
import axios from "axios";
import Submission from "../components/Submission/Submission";

// Once pageParams needs to change it suppose to change to state.
const pageParams = {
  page: 0,
  size: 100,
  sortType: "desc",
  sortParam: "id",
};

function SubmissionPage() {
  const { studentsName } = useParams();
  const [submissions, setSubmissions] = useState([]);

  const emptyQuestion = {
    id: 0,
    title: "Oops! It appears there are no submissions at the moment.",
    question: "Please come back after you've finished answering the questions.",
    type: "m",
    candidates: [],
    hint: "Remember to return after completing the questions!",
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

  const [searchParameter, setSearchParameter] = useState("Question");
  const [isSearchParamterClicked, setIsSearchParamterClicked] = useState(false);
  const [searchedQuestionsData, setSearchedQuestionsData] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(1);
  const [totalCorrectQuestions, setTotalCorrectQuestions] = useState(1);

  const localUrl =
    "http://localhost:8080/api/v1/submissions?studentName=" +
    studentsName +
    "&";
  // const localUrl =
  //   "https://91b.co.uk/api/v1/submissions?studentName=" + studentsName + "&";

  const setSubmissionComponents = useCallback((data, searched) => {
    let submissionComponents = [];
    let correctQuestions = 0;
    let localQuestions = [];

    data.map((value, index) => {
      localQuestions = [...localQuestions, value];

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
      return null;
    });

    if (!searched) {
      setQuestionsData(localQuestions);
    }

    console.log(localQuestions);
    setSearchedQuestionsData(localQuestions);
    setTotalCorrectQuestions(correctQuestions);
    setSubmissions(submissionComponents);
  }, []);

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
      setSubmissionComponents(response.data.content, false);
    });
  }, [localUrl, setSubmissionComponents]);

  const inputHandler = (event) => {
    if (event.target.value === null || event.target.value === "") {
      setSubmissionComponents(questionsData, false);
    } else {
      search(event.target.value);
    }
  };

  const search = (text, type) => {
    let localQuestions = [];

    searchedQuestionsData.map((value) => {
      console.log(value);
    });
  };

  const changeDropdown = () => {
    setIsSearchParamterClicked(!isSearchParamterClicked);
  };

  const closeDropdown = () => {
    setIsSearchParamterClicked(false);
  };

  const selectSearchParameter = (paramter) => {
    closeDropdown();
    setSearchParameter(paramter);
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
      <div className={styles.searchContainer}>
        <div className={styles.searchDropdownContainer}>
          <button
            className={styles.searchDropdownButton}
            onClick={changeDropdown}
          >
            {searchParameter}
          </button>
          {isSearchParamterClicked ? (
            <div className={styles.upward} />
          ) : (
            <div className={styles.downward} />
          )}
          {isSearchParamterClicked ? (
            <div className={styles.searchDropdown}>
              <button onClick={() => selectSearchParameter("Question")}>
                Question
              </button>
              <button onClick={() => selectSearchParameter("Answer")}>
                Answer
              </button>
              <button onClick={() => selectSearchParameter("Title")}>
                Title
              </button>
              <button onClick={() => selectSearchParameter("Explanation")}>
                Explanation
              </button>
              <button onClick={() => selectSearchParameter("Choice")}>
                Choice
              </button>
              <button onClick={() => selectSearchParameter("Hint")}>
                Hint
              </button>
              <button onClick={() => selectSearchParameter("All")}>All</button>
            </div>
          ) : null}
        </div>
        <input
          placeholder="Search"
          className={styles.input}
          onChange={(e) => inputHandler(e)}
        />
      </div>

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
