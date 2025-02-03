import React, { useState } from "react";
import SyntaxHighlight from "../SyntaxHighlight/SyntaxHighlight";
import styles from "../TutoringQuestions/TutoringQuestions.module.css";
import newStyles from "./TutoringMarking.module.css";
import { dateOptions } from "../../utils/dateFormat";

const TutoringMarking = ({ question, submission, id, marks }) => {
  let [mark, setMark] = useState(0);

  const unmarked = () => {
    marks(id, 0);
    setMark(0);
  };

  const setCorrect = () => {
    marks(id, 1);
    setMark(1);
  };

  const setWrong = () => {
    marks(id, -1);
    setMark(-1);
  };
  return (
    <>
      <div>
        <h1 className={styles.title}>
          {question.id ? question.id : 0}. {question.title}
        </h1>
        <fieldset
          className={
            mark === 0
              ? newStyles.unMarkedContainer
              : mark === 1
              ? newStyles.correctQuestionContainer
              : newStyles.wrongQuestionContainer
          }
        >
          {question.question.split("&code:").map((value, index) =>
            index === 1 ? (
              <SyntaxHighlight code={value} key={index} />
            ) : (
              <div key={index} className={styles.questionHeader}>
                <h2 className={styles.question}>{value}</h2>
                <div className={styles.dueDateContainer}>
                  {!question.targetDate ? null : (
                    <div>
                      Due at{" "}
                      {new Date(question.targetDate).toLocaleString(
                        "en-US",
                        dateOptions
                      )}
                      {"  ("}
                      {question.dayLeft > 0
                        ? question.dayLeft +
                          (question.dayLeft > 1 ? " days left" : " day Left")
                        : question.hourLeft > 0
                        ? question.hourLeft +
                          (question.hourLeft > 1 ? " hours left" : " hour Left")
                        : question.minLeft > 0
                        ? question.minLeft +
                          (question.minLeft > 1 ? " mins left" : " min Left")
                        : "OMG"}
                      {")"}
                    </div>
                  )}
                </div>
                <hr
                  style={{
                    width: "100%",
                    borderTop: "1px solid #cfcfcf",
                  }}
                />
              </div>
            )
          )}

          <div>
            <textarea value={submission} disabled={true} />
          </div>
          <div className={newStyles.buttonContainer}>
            <button onClick={unmarked} className={newStyles.button}>
              Unmarked
            </button>
            <button onClick={setCorrect} className={newStyles.button}>
              Correct
            </button>
            <button onClick={setWrong} className={newStyles.button}>
              Wrong
            </button>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default TutoringMarking;
