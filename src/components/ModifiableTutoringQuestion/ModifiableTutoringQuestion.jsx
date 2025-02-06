import React, { useState } from "react";
import styles from "../TutoringQuestions/TutoringQuestions.module.css";
import SyntaxHighlight from "../SyntaxHighlight/SyntaxHighlight";
import { dateOptions } from "../../utils/dateFormat";

function ModifiableTutoringQuestion({ question, modify, index }) {
  const [showHint, setShowHint] = useState(false);
  return (
    <>
      <div>
        <h1 className={styles.title}>
          {question.id ? question.id : 0}. {question.title}
        </h1>
        <fieldset className={styles.questionContainer}>
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
          {question.type === "m" ? (
            question.candidates.map((element, cIndex) => (
              <div className={styles.inputContainer} key={"D:" + cIndex}>
                <input
                  style={{ margin: "auto 4px" }}
                  type="radio"
                  id={index + ":" + cIndex + ":" + element}
                  value={element}
                  name={question.question}
                />
                <label
                  className={styles.candidates}
                  htmlFor={index + ":" + cIndex + ":" + element}
                >
                  {element.includes("&code:") ? (
                    <SyntaxHighlight
                      code={element.split("&code:")[1]}
                      key={"syntax" + element.id}
                    />
                  ) : (
                    <div key={element + ":" + cIndex}>{element}</div>
                  )}
                </label>
              </div>
            ))
          ) : question.type === "s" ? (
            <div>
              <textarea />
            </div>
          ) : null}
        </fieldset>
      </div>
    </>
  );
}

export default ModifiableTutoringQuestion;
