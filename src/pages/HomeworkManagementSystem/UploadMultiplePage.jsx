import React, { useState } from 'react';
import styles from './UploadMultiplePage.module.css';
import ModifiableTutoringQuestion from '../../components/ModifiableTutoringQuestion/ModifiableTutoringQuestion';
import ModifiableSubmission from '../../components/ModifiableSubmission/ModifiableSubmission';
import { postQuestions } from '../../services/api/HMSService';

const UploadMultiplePage = () => {
  const [questions, setQuestions] = useState('');
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

    if (!questionsToPost.length) {
      try {
        questionsToPost = JSON.parse(questions);
        setQuestionsJSON(questionsToPost);
      } catch (error) {
        window.alert(error);
        return;
      }
    }

    if (checkValidity(questionsToPost)) {
      postQuestions(questionsToPost)
        .then((value) => {
          window.alert(value.data + ' questions uploaded Successfully');
        })
        .catch((error) => {
          console.error(error);

          window.alert(error);
        });
    }

    // .finally(window.location.reload());
  };

  const checkValidity = (questionsToPost) => {
    for (const question of questionsToPost) {
      if (!question.title) {
        alert('Title is missing');
        return false;
      }
      if (!question.question) {
        alert('Question is missing');
        return false;
      }
      if (!question.type || !['m', 'M', 's'].includes(question.type)) {
        alert('Type is missing or incorrect');
        return false;
      }
      if (!question.candidates) {
        alert("'candidates' are missing");
        return false;
      }
      if (!question.students) {
        alert("'students' header is missing");
        return false;
      }
      if (!question.answer) {
        alert('Answer is missing');
        return false;
      }
      if (!question.explanation) {
        alert('Explanation is missing');
        return false;
      }
      if (!question.generatedDate) {
        alert('Generated date is missing');
        return false;
      }
      if (!question.targetDate) {
        alert('Target date is missing');
        return false;
      }
    }

    return true;
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
      <button disabled={!questionsJSON.length} onClick={submitQuestion}>
        submit
      </button>
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
