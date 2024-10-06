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

const localUrl = "http://localhost:8080/api/v1/questions";
// const localUrl = "https://91b.co.uk/api/v1/questions/";

function TutoringArchivePage() {
  const [questions, setQuestions] = useState();
  const [students, setLocalStudents] = useState([]);
  const [studentsString, setStudentsString] = useState("");

  const [questionsCopy, setQuestionsCopy] = useState([]);

  const addQuestion = (value) => {
    console.log(value);
    setQuestionsCopy((prev) => [...prev, value]);
    console.log(questionsCopy);
  };

  const setQuestionComponents = useCallback((data) => {
    let newQuestions = [];

    data.map((value, index) => {
      newQuestions = [
        ...newQuestions,
        <SelectableTutoringQuestions
          addQuestion={(value) => addQuestion(value)}
          data={value}
          key={index}
        />,
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

  const setStudents = () => {
    let storageStudents = localStorage.getItem("students");

    let pageStudents = [];

    pageStudents = studentsString
      .toLowerCase()
      .trimStart()
      .replace(/,\s+/g, ",")
      .split(",");

    if (storageStudents) {
      let array = storageStudents.split(",");
      pageStudents.forEach((element) => {
        if (!array.includes(element)) {
          array.push(element);
        }
      });

      pageStudents = array;
    }
    pageStudents = pageStudents.filter((value) => value);

    localStorage.setItem("students", pageStudents);
  };

  const change = (event) => {
    let pageStudents = [];
    let string = event.target.value;

    pageStudents = string
      .toLowerCase()
      .trimStart()
      .replace(/,\s+/g, ",")
      .split(",");
    pageStudents = pageStudents.filter((value) => value);

    setStudentsString(event.target.value);
    setLocalStudents(pageStudents);
  };

  const submit = () => {
    setStudents();
  };

  return (
    <div className={styles.main}>
      <h1>Archive</h1>
      {questions}
      <div className={styles.modal}>
        <input
          value={studentsString}
          onChange={(event) => change(event)}
          placeholder="Students for..."
        />
        <button onClick={submit} className={styles.button}>
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default TutoringArchivePage;
