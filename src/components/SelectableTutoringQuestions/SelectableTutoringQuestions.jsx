import React from "react";
import Submission from "../Submission/Submission";

function SelectableTutoringQuestions(props) {
  console.log(props.data);
  return (
    <>
      <div>
        <input type="checkbox" />
        <Submission
          question={props.data}
          studentAnswer={props.data.answer}
          submitDate={props.data.generatedDate}
          id={props.data.id}
        />
      </div>
    </>
  );
}

export default SelectableTutoringQuestions;
