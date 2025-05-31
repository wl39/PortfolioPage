import React, { useState } from 'react';
import styles from './Submission.module.css';
import SyntaxHighlight from '../SyntaxHighlight/SyntaxHighlight';
import { dateOptions } from '../../utils/dateFormat';

function Submission({
  question,
  studentAnswer,
  submitDate,
  isMarked,
  id,
  unique,
}) {
  const [showHint, setShowHint] = useState(false);
  return (
    <>
      <div>
        <h1 className={styles.title}>
          {question.id ? question.id : 0}. {question.title}
        </h1>
        <fieldset
          className={
            isMarked
              ? isMarked === 1
                ? studentAnswer === question.answer || question.type === 's'
                  ? styles.correctQuestionContainer
                  : styles.wrongQuestionContainer
                : styles.wrongQuestionContainer
              : styles.unMarkedContainer
          }
        >
          {question.question.split('&code:').map((value, index) =>
            index === 1 ? (
              <SyntaxHighlight code={value} key={index} />
            ) : (
              <div key={index} className={styles.questionHeader}>
                <h2 className={styles.question}>{value}</h2>
                <div className={styles.dueDateContainer}>
                  <div>
                    {submitDate === ''
                      ? null
                      : 'Submitted at ' +
                        new Date(submitDate).toLocaleString(
                          'en-US',
                          dateOptions
                        )}
                  </div>
                  <div></div>
                </div>
                <hr
                  style={{
                    width: '100%',
                    borderTop: '1px solid #cfcfcf',
                  }}
                />
                <div style={{ marginBottom: '15px' }}>
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
          {question.candidates.map((element, index) =>
            element.id ? (
              <div
                className={
                  element.value === question.answer
                    ? styles.answerContainer
                    : element.value === studentAnswer
                    ? styles.wrongAnswerContainer
                    : styles.inputContainer
                }
                key={'D:' + element.id}
              >
                <input
                  style={{ margin: 'auto 4px' }}
                  type="radio"
                  id={
                    id
                      ? id + ':' + element.id + ':' + element.value + unique
                      : 'test:' + element.id + ':' + element.value + unique
                  }
                  name={id ? id : 'test'}
                  checked={element.value === studentAnswer}
                  value={element.value}
                  disabled={true}
                />
                <label
                  className={styles.candidates}
                  htmlFor={
                    id
                      ? id + ':' + element.id + ':' + element.value + unique
                      : 'test:' + element.id + ':' + element.value + unique
                  }
                >
                  {element.value.includes('&code:') ? (
                    <SyntaxHighlight
                      code={element.value.split('&code:')[1]}
                      key={'syntax' + element.id}
                    />
                  ) : (
                    <div key={element.value + ':' + element.id}>
                      {element.value}
                    </div>
                  )}
                </label>
              </div>
            ) : (
              <div
                className={
                  element === question.answer
                    ? styles.answerContainer
                    : element === studentAnswer
                    ? styles.wrongAnswerContainer
                    : styles.inputContainer
                }
                key={'D:' + index}
              >
                <input
                  style={{ margin: 'auto 4px' }}
                  type="radio"
                  id={index + ':' + element + unique}
                  name={id ? id : 'test'}
                  checked={element === studentAnswer}
                  value={element}
                  disabled={true}
                />
                <label
                  className={styles.candidates}
                  htmlFor={index + ':' + element + unique}
                >
                  {element.includes('&code:') ? (
                    <SyntaxHighlight
                      code={element.split('&code:')[1]}
                      key={'syntax' + element.id}
                    />
                  ) : (
                    <div key={element + ':' + index}>{element}</div>
                  )}
                </label>
              </div>
            )
          )}
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
