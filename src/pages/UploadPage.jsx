import React, { useState } from "react";
import CustomSelect from "../components/CustomSelect/CustomSelect";

import axios from "axios";

import styles from "./UploadPage.module.css";
import TutoringQuestions from "../components/TutoringQuestions/TutoringQuestions";

function UploadPage() {
  const [questions, setQuestions] = useState({
    title: "",
    question: "",
    type: "",
    candidates: [],
    hint: "",
    studentsFor: [],
    answer: "",
    explanation: "",
    generatedDate: new Date(Date.now()).toISOString().slice(0, 19),
    targetDate: "",
  });
  const [question, setQuestion] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [isAnswerCode, setIsAnswerCode] = useState(false);
  const localUrl = "http://localhost:8080/api/v1/questions";
  //   const localUrl = "http://91b.co.uk/api/v1/questions";

  const today = new Date(Date.now());
  today.setDate(today.getDate() + 14);
  const target = today.toISOString().slice(0, 19);

  const inputHandler = (event, type) => {
    switch (type) {
      case "title":
        setQuestions({ ...questions, title: event.target.value });
        break;
      case "question":
        setQuestion(event.target.value);
        setQuestions({
          ...questions,
          question: event.target.value,
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
        setQuestions({ ...questions, studentsFor: [event.target.value] });
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
    switch (value) {
      case "Multiple Answers":
        setQuestions({ ...questions, type: "M" });
        break;
      case "Multiple Choice Question":
        setQuestions({ ...questions, type: "m" });
        break;
      case "Short Answer":
      default:
        setQuestions({ ...questions, type: "s" });
        break;
    }
  };

  const uploadQuestions = () => {
    console.log(questions);
    axios
      .post(localUrl, questions)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <div style={{ display: "flex" }}>
          <div className={styles.container}>
            <div className={styles.titleContainer}>
              <input
                className={styles.title}
                placeholder="Title"
                onChange={(e) => inputHandler(e, "title")}
              />
              <div style={{ marginTop: "auto" }}>
                <CustomSelect
                  title={"Type"}
                  select={select}
                  candidates={[
                    "Short Answer",
                    "Multiple Answers",
                    "Multiple Choice Question",
                  ]}
                />
              </div>
            </div>
            <input
              placeholder="Question"
              onChange={(e) => inputHandler(e, "question")}
              className={styles.input}
            />
            <textarea
              className={styles.textfield}
              placeholder="Code for the question?"
              onChange={(e) => inputHandler(e, "code")}
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
            />
            <input
              placeholder="Students For"
              className={styles.input}
              onChange={(e) => inputHandler(e, "for")}
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
            />
            <input
              placeholder="Target Date"
              className={styles.input}
              type="datetime-local"
              min={new Date(Date.now()).toISOString().slice(0, 16)}
              max={target}
              onChange={(e) => inputHandler(e, "target")}
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
      </div>
    </>
  );
}

export default UploadPage;
