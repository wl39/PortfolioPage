import { useEffect, useState } from 'react';

import Button from '../Button/Button';
import Submission from '../Submission/Submission';

import styles from './ModifyQuestionCandidate.module.css';
import { getChangedValues } from '../../utils/objectExtractor';
import ModifiableSubmission from '../ModifiableSubmission/ModifiableSubmission';
import { patchQuestions } from '../../services/api/HMSService';

const ModifyQuestionCandidate = ({
  modifiedQuestion,
  toModifyQuestion,
  modify,
  index,
}) => {
  const [hide, setHide] = useState(true);

  const patchQuestion = () => {
    const fetchPatchQuestions = async () => {
      let toPatchValue = getChangedValues(toModifyQuestion, modifiedQuestion);

      toPatchValue.id = toModifyQuestion.id;

      try {
        const response = await patchQuestions([toPatchValue]);

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatchQuestions();
  };

  useEffect(() => {
    if (hide) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [hide]);
  return (
    <div>
      {!hide ? (
        <div className={styles.modal}>
          <div className={styles.questionsContainer}>
            <div className={styles.submissionContainer}>
              <Submission
                question={toModifyQuestion}
                isMarked={1}
                studentAnswer={toModifyQuestion.answer}
                unique={'.original'}
              />
            </div>
            <div className={styles.submissionContainer}>
              <ModifiableSubmission
                question={modifiedQuestion}
                isMarked={1}
                studentAnswer={toModifyQuestion.answer}
                unique={'.modified'}
                modify={modify}
                index={index}
              />
            </div>
          </div>
          <div>
            {JSON.stringify(
              getChangedValues(toModifyQuestion, modifiedQuestion)
            )}
          </div>
          <Button onclick={() => setHide(true)}>Close</Button>
          <Button onclick={() => patchQuestion()}>Modify</Button>
        </div>
      ) : null}
      <div>{`${toModifyQuestion.id}. ${toModifyQuestion.title}`}</div>
      <Button onclick={() => setHide(false)}>hide</Button>
    </div>
  );
};

export default ModifyQuestionCandidate;
