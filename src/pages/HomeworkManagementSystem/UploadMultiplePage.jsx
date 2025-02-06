import React, { useState } from "react";
import styles from "./UploadMultiplePage.module.css";
import ModifiableTutoringQuestion from "../../components/ModifiableTutoringQuestion/ModifiableTutoringQuestion";
import ModifiableSubmission from "../../components/ModifiableSubmission/ModifiableSubmission";
import { postQuestions } from "../../services/api/HMSService";

const UploadMultiplePage = () => {
  const [questions, setQuestions] = useState("");
  const [questionsJSON, setQuestionsJSON] = useState([]);

  const parseQuestionsToJSON = () => {
    let json = {};

    try {
      json = JSON.parse(questions);

      setQuestionsJSON(json);
    } catch (error) {
      window.alert(error);
    }
  };

  const modify = (newQuestion, index) => {
    let q = questionsJSON;

    q[index] = newQuestion;

    setQuestionsJSON(q);
    setQuestions(JSON.stringify(q));
  };

  const submitQuestion = () => {
    let questionsToPost = questionsJSON;

    if (!questionsToPost) {
      try {
        questionsToPost = JSON.parse(questions);
      } catch (error) {
        window.alert(error);
        return;
      }
    }

    postQuestions(questionsToPost)
      .then((value) => {
        window.alert(value.data + " questions uploaded Successfully");
      })
      .catch((error) => {
        console.error(error);

        window.alert(error);
      });
    // .finally(window.location.reload());
  };

  return (
    <div>
      <textarea
        id="upload.multiples"
        className={styles.jsonArea}
        placeholder="Write questions in here"
        value={questions}
        onChange={(e) => setQuestions(e.target.value)}
      />
      <button onClick={parseQuestionsToJSON}>PARSE</button>
      <button onClick={submitQuestion}>submit</button>
      {questionsJSON.map((element, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.question}>
            <ModifiableTutoringQuestion
              key={index}
              question={element}
              modify={modify}
              index={index}
            />
          </div>

          <div className={styles.submission}>
            <ModifiableSubmission
              question={element}
              studentAnswer={element.answer}
              isMarked={1}
              modify={modify}
              index={index}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadMultiplePage;
