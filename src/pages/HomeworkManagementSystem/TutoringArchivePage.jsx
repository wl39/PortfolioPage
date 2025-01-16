import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styles from "./TutoringArchivePage.module.css";
import SelectableTutoringQuestions from "../../components/SelectableTutoringQuestions/SelectableTutoringQuestions";
import { Link } from "react-router-dom";

const URL = process.env.REACT_APP_API_URL;

// Once pageParams needs to change it suppose to change to state.
const pageParams = {
  page: 0,
  size: 100,
  sortType: "desc",
  sortParam: "id",
};

// const localUrl = URL + "questions";
const localUrl = URL + "questions";

function TutoringArchivePage() {
  const today = new Date(Date.now());
  today.setDate(today.getDate() + 14);
  const target = today.toISOString().slice(0, 19);

  const [questions, setQuestions] = useState();
  const [targetDate, setTargetDate] = useState();
  const [students, setLocalStudents] = useState([]);
  const [studentsString, setStudentsString] = useState("");

  const [searchParameter, setSearchParameter] = useState("Question");
  const [questionsData, setQuestionsData] = useState([]);
  const [isSearchParamterClicked, setIsSearchParamterClicked] = useState(false);

  const [questionsCopy, setQuestionsCopy] = useState([]);

  const addQuestion = (value) => {
    setQuestionsCopy((prev) => {
      // Check if the value exists in the current state
      if (prev.includes(value)) {
        // If it exists, remove it
        return prev.filter((question) => question !== value);
      } else {
        // If it doesn't exist, add it
        return [...prev, value];
      }
    });
  };

  const setQuestionComponents = useCallback((data, searched) => {
    let newQuestions = [];
    let localQuestions = [];

    data.map((value, index) => {
      localQuestions = [...localQuestions, value];
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

    if (!searched) {
      setQuestionsData(localQuestions);
    }

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

  const changeDropdown = () => {
    setIsSearchParamterClicked(!isSearchParamterClicked);
  };

  const closeDropdown = () => {
    setIsSearchParamterClicked(false);
  };

  const inputHandler = (event) => {
    if (event.target.value === null || event.target.value === "") {
      setQuestionComponents(questionsData, false);
    } else {
      search(event.target.value);
    }
  };

  const selectSearchParameter = (paramter) => {
    closeDropdown();
    setSearchParameter(paramter);
  };

  const search = (text) => {
    let localQuestions = [];

    questionsData.forEach((value) => {
      console.log(value);
      switch (searchParameter) {
        case "Question":
          if (value.question.toLowerCase().includes(text.toLowerCase())) {
            localQuestions = [...localQuestions, value];
          }
          break;
        case "Answer":
          if (value.answer.toLowerCase().includes(text.toLowerCase())) {
            localQuestions = [...localQuestions, value];
          }
          break;
        case "Title":
          if (value.title.toLowerCase().includes(text.toLowerCase())) {
            localQuestions = [...localQuestions, value];
          }
          break;
        case "Explanation":
          if (value.explanation.toLowerCase().includes(text.toLowerCase())) {
            localQuestions = [...localQuestions, value];
          }
          break;
        case "Choice":
          for (let choice of value.candidates) {
            if (choice.toLowerCase().includes(text.toLowerCase())) {
              localQuestions = [...localQuestions, value];
              break;
            }
          }
          break;
        case "Hint":
          if (value.hint.toLowerCase().includes(text.toLowerCase())) {
            localQuestions = [...localQuestions, value];
          }
          break;
        default:
          if (value.question.toLowerCase().includes(text.toLowerCase())) {
            localQuestions = [...localQuestions, value];
          } else if (value.answer.toLowerCase().includes(text.toLowerCase())) {
            localQuestions = [...localQuestions, value];
          } else if (value.title.toLowerCase().includes(text.toLowerCase())) {
            localQuestions = [...localQuestions, value];
          } else if (
            value.explanation.toLowerCase().includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          } else if (value.hint.toLowerCase().includes(text.toLowerCase())) {
            localQuestions = [...localQuestions, value];
          } else {
            for (let choice of value.candidates) {
              if (choice.toLowerCase().includes(text.toLowerCase())) {
                localQuestions = [...localQuestions, value];
                break;
              }
            }
          }
          break;
      }
    });

    setQuestionComponents(localQuestions, true);
  };

  const submit = () => {
    if (window.confirm("This will be the question info: " + questionsCopy)) {
      let pageStudents = studentsString
        .toLowerCase()
        .trimStart()
        .replace(/,\s+/g, ",")
        .split(",");

      pageStudents = pageStudents.filter((value) => value);

      console.log(questionsCopy + " " + pageStudents);
      if (questionsCopy && pageStudents && targetDate)
        axios
          .post(localUrl + "/multiples", {
            questionIds: questionsCopy, // Array of question IDs
            studentsFor: pageStudents,
            targetDate: targetDate, // Array of student names
          })
          .then((response) => {
            window.alert("Successfully uploaded!");
            setStudents(); // Assuming this resets your student list
            console.log(response.data);
          })
          .catch((error) => {
            if (error.response) {
              console.log(
                "Server responded with:",
                error.response.status,
                error.response.data
              );
            } else if (error.request) {
              console.log("No response received:", error.request);
            } else {
              console.log("Axios error:", error.message);
            }
          });
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.linkContainer}>
        <Link className={styles.linkButton} to={"/questions"}>
          Archive
        </Link>
        <Link className={styles.linkButton} to={"/teacher"}>
          Teacher
        </Link>
      </div>
      <h1>Archive</h1>
      <div className={styles.searchContainer}>
        <input
          placeholder="Search"
          className={styles.input}
          onChange={(e) => inputHandler(e)}
        />
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
      </div>
      {questions}
      <div className={styles.modal}>
        <input
          value={studentsString}
          onChange={(event) => change(event)}
          placeholder="Students for..."
        />
        <input
          placeholder="Target Date"
          className={styles.input}
          type="datetime-local"
          min={new Date(Date.now()).toISOString().slice(0, 16)}
          max={target}
          onChange={(e) => setTargetDate(e.target.value)}
          value={targetDate}
        />
        <button onClick={submit} className={styles.button}>
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default TutoringArchivePage;
