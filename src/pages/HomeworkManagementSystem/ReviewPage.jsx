import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Submission from "../../components/Submission/Submission";
import styles from "./SubmissionPage.module.css";
import TutoringQuestions from "../../components/TutoringQuestions/TutoringQuestions";
import { getReviewQuestions } from "../../services/api/HMSService";

const pageParams = {
  page: 0,
  size: 10,
  sortType: "desc",
  sortParam: "id",
};

const emptyQuestion = {
  id: 0,
  title: "Oops! It appears there are no incorrect answers at the moment.",
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

const ReviewPage = () => {
  const { studentsName } = useParams();

  const [data, setData] = useState();
  const [submissions, setSubmissions] = useState([]);
  const [searchParameter, setSearchParameter] = useState("Question");
  const [isSearchParamterClicked, setIsSearchParamterClicked] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);
  const [answers, setAnswers] = useState({});

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

  const setSubmissionComponents = useCallback(
    (data, searched) => {
      let submissionComponents = [];
      let localQuestions = [];

      data.map((value, index) => {
        localQuestions = [...localQuestions, value];

        submissionComponents = [
          ...submissionComponents,
          <TutoringQuestions
            key={index}
            question={value.question}
            selectAnswer={selectAnswer}
          />,
        ];
        return null;
      });

      if (!searched) {
        setQuestionsData(localQuestions);
      }

      setSubmissions(submissionComponents);
    },
    [selectAnswer]
  );

  const setTemp = useCallback((data, searched, userAnswers) => {
    let submissionComponents = [];
    let localQuestions = [];

    console.log(data);
    console.log(userAnswers);

    data.map((value, index) => {
      localQuestions = [...localQuestions, value];

      submissionComponents = [
        ...submissionComponents,
        <Submission
          key={index}
          question={value.question}
          studentAnswer={userAnswers[value.question.id].answer}
          isMarked={1}
        />,
      ];
      return null;
    });

    if (!searched) {
      setQuestionsData(localQuestions);
    }

    setSubmissions(submissionComponents);
  }, []);

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

  const inputHandler = (event) => {
    if (event.target.value === null || event.target.value === "") {
      setSubmissionComponents(questionsData, false);
    } else {
      search(event.target.value);
    }
  };

  const submit = () => {
    console.log(Object.keys(answers).length);
    console.log(data.length);
    if (Object.keys(answers).length !== data.length) {
      window.alert("You should solve all questions");
    } else {
      setTemp(data, false, answers);
    }
  };
  const search = (text) => {
    let localQuestions = [];

    questionsData.forEach((value) => {
      switch (searchParameter) {
        case "Question":
          if (
            value.question.question.toLowerCase().includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          }
          break;
        case "Answer":
          if (
            value.question.answer.toLowerCase().includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          }
          break;
        case "Title":
          if (value.question.title.toLowerCase().includes(text.toLowerCase())) {
            localQuestions = [...localQuestions, value];
          }
          break;
        case "Explanation":
          if (
            value.question.explanation
              .toLowerCase()
              .includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          }
          break;
        case "Choice":
          for (let choice of value.question.candidates) {
            if (choice.toLowerCase().includes(text.toLowerCase())) {
              localQuestions = [...localQuestions, value];
              break;
            }
          }
          break;
        case "Hint":
          if (value.question.hint.toLowerCase().includes(text.toLowerCase())) {
            localQuestions = [...localQuestions, value];
          }
          break;
        default:
          if (
            value.question.question.toLowerCase().includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          } else if (
            value.question.answer.toLowerCase().includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          } else if (
            value.question.title.toLowerCase().includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          } else if (
            value.question.explanation
              .toLowerCase()
              .includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          } else if (
            value.question.hint.toLowerCase().includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          } else {
            for (let choice of value.question.candidates) {
              if (choice.toLowerCase().includes(text.toLowerCase())) {
                localQuestions = [...localQuestions, value];
                break;
              }
            }
          }
          break;
      }
    });

    setSubmissionComponents(localQuestions, true);
  };

  useEffect(() => {
    const fetchReviewQuestions = async (name, pageParams) => {
      try {
        const response = await getReviewQuestions(name, pageParams);

        setData(response);
        setSubmissionComponents(response, false);
      } catch (error) {
        console.error(error);

        window.alert("There is an issue...");
      }
    };

    fetchReviewQuestions(studentsName, pageParams);
  }, [setSubmissionComponents, studentsName]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.h1}>
          {studentsName[0].toUpperCase() + studentsName.slice(1)}
        </h1>
        <Link
          to={"/tutoring/" + studentsName}
          style={{ marginTop: "22px", marginRight: "15px" }}
        >
          <button className={styles.button}>Questions</button>
        </Link>
        <Link to={"/submission/" + studentsName} style={{ marginTop: "22px" }}>
          <button className={styles.button}>Submissions</button>
        </Link>
      </div>

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

      {submissions.length === 0 ? (
        <TutoringQuestions
          question={emptyQuestion}
          studentAnswer={""}
          submitDate={""}
          isMarked={true}
          id={0}
        />
      ) : (
        submissions
      )}
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={submit}
          disabled={submissions.length === 0}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;
