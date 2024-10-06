import React, { useEffect } from "react";
import Submission from "../Submission/Submission";

function SelectableTutoringQuestions(props) {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <>
      <div>
        <Submission
          question={props.data}
          studentAnswer={props.data.answer}
          submitDate={props.data.generatedDate}
          id={props.data.id}
          isMarked={1}
        />
        <button onClick={() => props.addQuestion(props.data.id)}>
          Duplicate
        </button>
      </div>
    </>
  );
}

export default SelectableTutoringQuestions;
