import React, { useState, useEffect } from "react";

import styles from "./UploadPage.module.css";
import { Link } from "react-router-dom";
import UploadForm from "../../components/UploadForm/UploadForm";
import UploadFixer from "../../components/UploadFixer/UploadFixer";
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";
import { postQuestion } from "../../services/api/HMSService";
import { formatToISO } from "../../utils/dateFormat";

function UploadPage() {
  const [questions, setQuestions] = useState({
    title: "",
    question: "",
    type: "",
    candidates: [],
    hint: "",
    students: [],
    studentsForString: "",
    answer: "",
    explanation: "",
    generatedDate: formatToISO(Date.now()).sli,
    targetDate: "",
  });

  const [fixed, setFixed] = useState({
    title: false,
    type: false,
    question: false,
    question_code: false,
    candidates: false,
    hints: false,
    students: false,
    answer: false,
    explanation: false,
    target_date: false,
  });

  const [question, setQuestion] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [isAnswerCode, setIsAnswerCode] = useState(false);

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
      students: [],
      studentsForString: "",
      answer: "",
      explanation: "",
      generatedDate: formatToISO(Date.now()),
      targetDate: "",
    });
  };

  const resetQuestionsOnSubmit = () => {
    setQuestions({
      title: fixed.title ? questions.title : "",
      question: fixed.question ? questions.question : "",
      type: fixed.type ? questions.type : "",
      candidates: fixed.type ? Array(questions.candidates.length).fill("") : [],
      hint: fixed.hints ? questions.hint : "",
      students: fixed.students ? questions.students : [],
      studentsForString: fixed.students ? questions.studentsForString : "",
      answer: fixed.answer ? questions.answer : "",
      explanation: fixed.explanation ? questions.explanation : "",
      generatedDate: formatToISO(Date.now()),
      targetDate: fixed.target_date ? questions.targetDate : "",
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
          students: pageStudents,
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
      if (questions) {
        const fetchQuestion = async (questions) => {
          try {
            const response = await postQuestion(questions);

            window.alert("Successfully uploaded!");
            if (questions.studentsForString) setStudents();
            console.log(response.data);
            resetQuestionsOnSubmit();
          } catch (error) {
            console.error(error);

            window.alert("There is an issue...");
          }
        };

        fetchQuestion(questions);
      }
    }
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

  const fixedHandler = (event) => {
    setFixed({ ...fixed, [event.target.id]: !fixed[event.target.id] });
  };

  return (
    <>
      <div>
        <button className={styles.input} onClick={resetQuestionsOnSubmit}>
          TEMP
        </button>
        <div className={styles.linkContainer}>
          <Link className={styles.linkButton} to={"/questions"}>
            Archive
          </Link>
          <Link className={styles.linkButton} to={"/teacher"}>
            Teacher
          </Link>
          <DragAndDrop x={350} y={40}>
            <UploadFixer fixedHandler={fixedHandler} fixed={fixed} />
          </DragAndDrop>
        </div>
        <UploadForm
          inputHandler={inputHandler}
          select={select}
          questions={questions}
          setQuestions={setQuestions}
          candidates={candidates}
          updateCandidates={updateCandidates}
          isAnswerCode={isAnswerCode}
          setIsAnswerCode={setIsAnswerCode}
          target={target}
        />
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
