import React, { useState } from "react";
import styles from "./Submission.module.css";
import SyntaxHighlight from "../SyntaxHighlight/SyntaxHighlight";

function Submission({ question, studentAnswer, submitDate, id }) {
  const [showHint, setShowHint] = useState(false);
  return (
    <>
      <div>
        <h1 className={styles.title}>
          {question.id ? question.id : 0}. {question.title}
        </h1>
        <fieldset
          className={
            studentAnswer === question.answer
              ? styles.correctQuestionContainer
              : styles.wrongQuestionContainer
          }
        >
          {question.question.split("&code:").map((value, index) =>
            index === 1 ? (
              <SyntaxHighlight code={value} key={index} />
            ) : (
              <div key={index} className={styles.questionHeader}>
                <h2 className={styles.question}>{value}</h2>
                <div className={styles.dueDateContainer}>
                  <div>
                    {submitDate === ""
                      ? null
                      : "Submitted at " +
                        new Date(submitDate).toUTCString().substring(0, 22)}
                  </div>
                  <div></div>
                </div>
                <hr
                  style={{
                    width: "100%",
                    borderTop: "1px solid #cfcfcf",
                  }}
                />
                <div style={{ marginBottom: "15px" }}>
                  <div
                    className={styles.hintButtonContainer}
                    onClick={() => {
                      setShowHint(!showHint);
                    }}
                  >
                    <div>Hint </div>
                    {showHint ? (
                      <div className={styles.upArrow} />
                    ) : (
                      <div className={styles.downArrow} />
                    )}
                  </div>
                  {showHint ? (
                    <div className={styles.hint}>{question.hint}</div>
                  ) : null}
                </div>
              </div>
            )
          )}
          {question.candidates.map((value, index) => (
            <div
              className={
                value === question.answer
                  ? styles.answerContainer
                  : value === studentAnswer
                  ? styles.wrongAnswerContainer
                  : styles.inputContainer
              }
              key={"D:" + index}
            >
              <input
                style={{ margin: "auto 4px" }}
                type="radio"
                id={
                  id
                    ? id + ":" + index + ":" + value
                    : "test:" + index + ":" + value
                }
                name={id ? id : "test"}
                checked={value === studentAnswer}
                value={value}
                disabled={true}
              />
              <label
                className={styles.candidates}
                htmlFor={
                  id
                    ? id + ":" + index + ":" + value
                    : "test:" + index + ":" + value
                }
              >
                {value
                  .split("&code:")
                  .map((value, index) =>
                    index === 1 ? (
                      <SyntaxHighlight code={value} key={"syntax" + index} />
                    ) : (
                      <div key={value + ":" + index}> {value} </div>
                    )
                  )}
              </label>
            </div>
          ))}
          <div className={styles.explanationContainer}>
            <div className={styles.explanationHeader}>Explanation</div>
            <div className={styles.explanationDetails}>
              {question.explanation}
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default Submission;
