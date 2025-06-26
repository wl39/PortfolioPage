import React, { useState } from 'react';
import styles from './Submission.module.css';
import SyntaxHighlight from '../SyntaxHighlight/SyntaxHighlight';
import { dateOptions } from '../../utils/dateFormat';
import Card from '../Card/Card';

function Submission({
  question,
  studentAnswer,
  submitDate,
  isMarked,
  id,
  unique = 'uniq',
}) {
  const [showHint, setShowHint] = useState(false);
  return (
    <>
      <div>
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
          <h2 className={styles.title}>
            {question.id ? question.id : 0}. {question.title}
          </h2>
          {question.question.split('&code:').map((value, index) =>
            index === 1 ? (
              <SyntaxHighlight code={value} key={index} />
            ) : (
              <div key={index} className={styles.questionHeader}>
                <p className={styles.question}>{value}</p>
                {question.topics.length ? (
                  <div className={styles.topic_card_container}>
                    {question.topics.map((topicValue, topicIndex) => (
                      <Card
                        propStyles={styles.topic_card}
                        key={'t.' + value + '.' + topicIndex}
                      >
                        <div>{topicValue}</div>
                      </Card>
                    ))}
                  </div>
                ) : null}
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

                {question.hint ? (
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
                ) : null}
              </div>
            )
          )}

          {question.type === 's' ? (
            <div
              className={
                isMarked === 1
                  ? styles.answerContainer
                  : styles.wrongAnswerContainer
              }
            >
              <div style={{ margin: 'auto 0px' }}>{studentAnswer}</div>
            </div>
          ) : null}
          {question.candidates.map((element, index) =>
            element.id ? (
              <label
                className={
                  element.value === question.answer
                    ? styles.answerContainer
                    : element.value === studentAnswer
                    ? styles.wrongAnswerContainer
                    : styles.inputContainer
                }
                htmlFor={
                  id
                    ? id + ':' + element.id + ':' + element.value + unique
                    : 'test:' + element.id + ':' + element.value + unique
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
