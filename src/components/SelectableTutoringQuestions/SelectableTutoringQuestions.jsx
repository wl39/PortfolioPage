import React, { useEffect, useState } from "react";
import Submission from "../Submission/Submission";
import styles from "./SelectableTutoringQuestions.module.css";
function SelectableTutoringQuestions(props) {
  const [checked, setChecked] = useState(false);

  const addQuestion = () => {
    props.addQuestion(props.data.id);
    setChecked(!checked);
    console.log(checked);
  };
  return (
    <div className={styles.page}>
      <div>
        <Submission
          question={props.data}
          studentAnswer={props.data.answer}
          submitDate={props.data.generatedDate}
          id={props.data.id}
          isMarked={1}
        />
        <div className={styles.buttonContainer} onClick={addQuestion}>
          <div className={styles.text}>Duplicate</div>
          <div className={styles.checkboxContianer}>
            <div className={checked ? styles.checked : null} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectableTutoringQuestions;
