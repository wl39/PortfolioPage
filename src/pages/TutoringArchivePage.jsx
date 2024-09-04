import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styles from "./TutoringArchivePage.module.css";
import SelectableTutoringQuestions from "../components/SelectableTutoringQuestions/SelectableTutoringQuestions";

// Once pageParams needs to change it suppose to change to state.
const pageParams = {
  page: 0,
  size: 100,
  sortType: "desc",
  sortParam: "id",
};

// const localUrl = "http://localhost:8080/api/v1/questions";
const localUrl = "https://91b.co.uk/api/v1/questions/";

function TutoringArchivePage() {
  const [questions, setQuestions] = useState();

  const setQuestionComponents = useCallback((data) => {
    let newQuestions = [];

    data.map((value, index) => {
      newQuestions = [
        ...newQuestions,
        <SelectableTutoringQuestions data={value} key={index} />,
      ];

      return null;
    });

    setQuestions(newQuestions);
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
      setQuestionComponents(response.data.content);
    });
  }, [setQuestionComponents]);
  return (
    <div className={styles.main}>
      <h1>Archive</h1>
      {questions}
    </div>
  );
}

export default TutoringArchivePage;
