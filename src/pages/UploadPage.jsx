import React, { useState, useEffect } from "react";

import axios from "axios";

import styles from "./UploadPage.module.css";
import TutoringQuestions from "../components/TutoringQuestions/TutoringQuestions";
import { Link } from "react-router-dom";

function UploadPage() {
  const [questions, setQuestions] = useState({
    title: "",
    question: "",
    type: "",
    candidates: [],
    hint: "",
    studentsFor: [],
    studentsForString: "",
    answer: "",
    explanation: "",
    generatedDate: new Date(Date.now()).toISOString().slice(0, 19),
    targetDate: "",
  });
  const [question, setQuestion] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [isAnswerCode, setIsAnswerCode] = useState(false);
  const localUrl = "http://localhost:8080/api/v1/questions";
  // const localUrl = "https://91b.co.uk/api/v1/questions";

  const today = new Date(Date.now());
  today.setDate(today.getDate() + 14);
  const target = today.toISOString().slice(0, 19);

  useEffect(() => {
    // Reset input value when component mounts
    resetQuestions();
  }, []); // The empty array ensures this only runs once when the component mounts

  const resetQuestions = () => {
    setQuestions({
      title: "",
      question: "",
      type: "",
      candidates: [],
      hint: "",
      studentsFor: [],
      studentsForString: "",
      answer: "",
      explanation: "",
      generatedDate: new Date(Date.now()).toISOString().slice(0, 19),
      targetDate: "",
    });
  };

  const inputHandler = (event, type) => {
    switch (type) {
      case "title":
        setQuestions({ ...questions, title: event.target.value });
        break;
      case "question":
        let code = "";
        if (questions.question.includes("&code:")) {
          code = "&code:" + questions.question.split("&code:")[1];
        }
        setQuestion(event.target.value);
        setQuestions({
          ...questions,
          question: event.target.value + code,
        });
        break;
      case "code":
        if (!event.target.value) {
          setQuestions({
            ...questions,
            question: question,
          });
        } else {
          setQuestions({
            ...questions,
            question: question + "&code:" + event.target.value,
          });
        }
        break;
      case "hint":
        setQuestions({ ...questions, hint: event.target.value });
        break;
      case "ans":
        setQuestions({ ...questions, answer: event.target.value });
        break;
      case "exp":
        setQuestions({ ...questions, explanation: event.target.value });
        break;
      case "target":
        setQuestions({ ...questions, targetDate: event.target.value });
        break;
      case "can":
        const numCandidates = parseInt(event.target.value);
        if (numCandidates) {
          let newCandidates = Array(numCandidates).fill("");
          let candidates = Array(numCandidates).fill(false);
          setQuestions({
            ...questions,
            candidates: newCandidates,
          });

          setCandidates(candidates);
        } else {
          setQuestions({
            ...questions,
            candidates: [],
          });
          setCandidates({
            candidates: [],
          });
        }
        break;
      case "for":
        let pageStudents = [];
        let string = event.target.value;

        pageStudents = string
          .toLowerCase()
          .trimStart()
          .replace(/,\s+/g, ",")
          .split(",");
        pageStudents = pageStudents.filter((value) => value);

        setQuestions({
          ...questions,
          studentsFor: pageStudents,
          studentsForString: event.target.value,
        });
        break;
      default:
        break;
    }
  };

  const updateCandidates = (index) => {
    const updatedCandidates = [...candidates];

    updatedCandidates[index] = !updatedCandidates[index];

    setCandidates(updatedCandidates);

    if (questions.candidates[index]) {
      const newCandidates = [...questions.candidates];

      console.log(updatedCandidates[index]);
      if (updatedCandidates[index])
        newCandidates[index] = "&code:" + newCandidates[index];
      else {
        newCandidates[index] = newCandidates[index].replace("&code:", "");
      }

      setQuestions({
        ...questions,
        candidates: newCandidates,
      });
    }
  };

  const select = (value) => {
    if (value && value.target && value.target.value) {
      setQuestions({ ...questions, type: value.target.value });
    }
  };

  const uploadQuestions = () => {
    if (!questions.answer) {
      window.alert("Answer is missing.");
      return;
    }

    if (!questions.title) {
      window.alert("Title is missing.");
      return;
    }

    if (!questions.type) {
      window.alert("Type is missing.");
      return;
    }

    if (!questions.explanation) {
      window.alert("Explanation is missing.");
      return;
    }

    if (!questions.question) {
      window.alert("Question is missing.");
      return;
    }

    if (!questions.targetDate) {
      window.alert("Target Date is missing.");
      return;
    }

    if (window.confirm("This will be the question info: " + questions)) {
      if (questions)
        axios
          .post(localUrl, questions)
          .then((response) => {
            window.alert("Successfully uploaded!");
            setStudents();
            console.log(response.data);
            resetQuestions();
          })
          .catch((error) => {
            console.log(error);
          });
    }
  };

  const getStudents = () => {
    let students = localStorage.getItem("students");
    console.log(students);
  };

  const setStudents = () => {
    let storageStudents = localStorage.getItem("students");

    let pageStudents = [];

    pageStudents = questions.studentsForString
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

      console.log(pageStudents);
    }
    pageStudents = pageStudents.filter((value) => value);
    console.log(pageStudents);

    localStorage.setItem("students", pageStudents);
  };

  return (
    <>
      <div>
        <div className={styles.linkContainer}>
          <Link className={styles.linkButton} to={"/questions"}>
            Archive
          </Link>
          <Link className={styles.linkButton} to={"/teacher"}>
            Teacher
          </Link>
        </div>
        <div style={{ display: "flex" }}>
          <div className={styles.container}>
            <div className={styles.titleContainer}>
              <input
                className={styles.title}
                placeholder="Title"
                onChange={(e) => inputHandler(e, "title")}
                value={questions.title}
              />
            </div>
            <div className={styles.radioContainer}>
              <input
                id="SAQ"
                type="radio"
                name="type"
                value="s"
                onChange={(e) => select(e)}
              />
              <label htmlFor="SAQ">Short Answer Question</label>
              <input
                id="MAQ"
                type="radio"
                name="type"
                value="M"
                onChange={(e) => select(e)}
              />
              <label htmlFor="MAQ">Multiple Answers Question</label>
              <input
                id="MCQ"
                type="radio"
                name="type"
                value="m"
                onChange={(e) => select(e)}
              />
              <label htmlFor="MCQ">Multiple Choice Question</label>
            </div>
            <input
              placeholder="Question"
              onChange={(e) => inputHandler(e, "question")}
              className={styles.input}
              value={questions.question.split("&code:")[0]}
            />
            <textarea
              className={styles.textfield}
              placeholder="Code for the question?"
              onChange={(e) => inputHandler(e, "code")}
              value={
                questions.question.includes("&code:")
                  ? questions.question.split("&code:")[1]
                  : ""
              }
            />
            {questions.type === "m" && (
              <input
                placeholder="Number of Candidates"
                type="number"
                min="2"
                max="5"
                onChange={(e) => inputHandler(e, "can")}
                className={styles.input}
              />
            )}
            {questions.candidates.map((_, index) => (
              <div key={index} className={styles.candidateContainer}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id={"candidate" + index}
                  onChange={(e) => updateCandidates(index)}
                />
                <label className={styles.label} htmlFor={"candidate" + index}>
                  Code
                </label>
                <input
                  className={styles.candidateInput}
                  placeholder={"Candidate " + (index + 1)}
                  value={
                    questions.candidates[index].includes("&code:")
                      ? questions.candidates[index].split("&code:")[1]
                      : questions.candidates[index]
                  }
                  onChange={(e) => {
                    const updatedCandidates = [...questions.candidates];
                    updatedCandidates[index] = candidates[index]
                      ? "&code:" + e.target.value
                      : e.target.value;
                    setQuestions({
                      ...questions,
                      candidates: updatedCandidates,
                    });
                  }}
                />
              </div>
            ))}
            <input
              placeholder="Hints"
              className={styles.input}
              onChange={(e) => inputHandler(e, "hint")}
              value={questions.hint}
            />
            <input
              placeholder="Students For"
              className={styles.input}
              onChange={(e) => inputHandler(e, "for")}
              value={questions.studentsForString}
            />

            <div className={styles.candidateContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                id={"Answer"}
                value={isAnswerCode}
                onChange={(e) => {
                  // console.log(isAnswerCode);
                  setIsAnswerCode(!isAnswerCode);
                  setQuestions({
                    ...questions,
                    answer: !isAnswerCode
                      ? "&code:" + questions.answer
                      : questions.answer.replace("&code:", ""),
                  });
                }}
              />
              <label className={styles.label} htmlFor={"Answer"}>
                Code
              </label>
              <input
                className={styles.candidateInput}
                placeholder={"Answer"}
                value={
                  questions.answer.includes("&code:")
                    ? questions.answer.split("&code:")[1]
                    : questions.answer
                }
                onChange={(e) => {
                  setQuestions({
                    ...questions,
                    answer: isAnswerCode
                      ? "&code:" + e.target.value
                      : e.target.value,
                  });
                }}
              />
            </div>
            <input
              placeholder="Explanation"
              className={styles.input}
              onChange={(e) => inputHandler(e, "exp")}
              value={questions.explanation}
            />
            <input
              placeholder="Target Date"
              className={styles.input}
              type="datetime-local"
              min={new Date(Date.now()).toISOString().slice(0, 16)}
              max={target}
              onChange={(e) => inputHandler(e, "target")}
              value={questions.targetDate}
            />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              paddingLeft: "10px",
            }}
          >
            <h3 style={{ fontSize: "30px" }}>
              Expected Result For The Question
            </h3>
            <TutoringQuestions question={questions} />
          </div>
        </div>
        <button className={styles.input} onClick={uploadQuestions}>
          SUBMIT
        </button>

        <button className={styles.input} onClick={resetQuestions}>
          Remove all
        </button>
      </div>
    </>
  );
}

export default UploadPage;
