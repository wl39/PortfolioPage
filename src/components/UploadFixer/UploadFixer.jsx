import React from "react";
import styles from "./UploadFixer.module.css";

const UploadFixer = ({ fixedHandler, fixed }) => {
  return (
    <div className={styles.container}>
      <div className={styles.boxContainer}>
        <div className={styles.fixContainer}>
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="checkbox"
            checked={fixed.title}
            onChange={(e) => fixedHandler(e)}
          />
        </div>
        <div className={styles.fixContainer}>
          <label className={styles.label} htmlFor="type">
            Type
          </label>
          <input
            id="type"
            type="checkbox"
            checked={fixed.type}
            onChange={(e) => fixedHandler(e)}
          />
        </div>
        <div className={styles.fixContainer}>
          <label className={styles.label} htmlFor="question">
            Question
          </label>
          <input
            id="question"
            type="checkbox"
            checked={fixed.question}
            onChange={(e) => fixedHandler(e)}
          />
        </div>

        <div className={styles.fixContainer}>
          <label className={styles.label} htmlFor="hints">
            Hints
          </label>
          <input
            id="hints"
            type="checkbox"
            checked={fixed.hints}
            onChange={(e) => fixedHandler(e)}
          />
        </div>
      </div>
      <div className={styles.boxContainer}>
        <div className={styles.fixContainer}>
          <label className={styles.label} htmlFor="students">
            Students
          </label>
          <input
            id="students"
            type="checkbox"
            checked={fixed.students}
            onChange={(e) => fixedHandler(e)}
          />
        </div>
        <div className={styles.fixContainer}>
          <label className={styles.label} htmlFor="answer">
            Answer
          </label>
          <input
            id="answer"
            type="checkbox"
            checked={fixed.answer}
            onChange={(e) => fixedHandler(e)}
          />
        </div>
        <div className={styles.fixContainer}>
          <label className={styles.label} htmlFor="explanation">
            Explanation
          </label>
          <input
            id="explanation"
            type="checkbox"
            checked={fixed.explanation}
            onChange={(e) => fixedHandler(e)}
          />
        </div>
        <div className={styles.fixContainer}>
          <label className={styles.label} htmlFor="target_date">
            Target Date
          </label>
          <input
            id="target_date"
            type="checkbox"
            checked={fixed.target_date}
            onChange={(e) => fixedHandler(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadFixer;
