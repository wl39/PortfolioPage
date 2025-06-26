import React, { useState } from 'react';
import styles from './TutoringQuestions.module.css';
import SyntaxHighlight from '../SyntaxHighlight/SyntaxHighlight';
import { dateOptions } from '../../utils/dateFormat';
import Card from '../Card/Card';

function TutoringQuestions({ question, selectAnswer }) {
  const [showHint, setShowHint] = useState(false);
  return (
    <>
      <div>
        <fieldset className={styles.questionContainer}>
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
                  {!question.targetDate ? null : (
                    <div>
                      Due at{' '}
                      {new Date(question.targetDate).toLocaleString(
                        'en-US',
                        dateOptions
                      )}
                      {'  ('}
                      {question.dayLeft > 0
                        ? question.dayLeft +
                          (question.dayLeft > 1 ? ' days left' : ' day Left')
                        : question.hourLeft > 0
                        ? question.hourLeft +
                          (question.hourLeft > 1 ? ' hours left' : ' hour Left')
                        : question.minLeft > 0
                        ? question.minLeft +
                          (question.minLeft > 1 ? ' mins left' : ' min Left')
                        : 'OMG'}
                      {')'}
                    </div>
                  )}
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
          {question.type === 'm' ? (
            question.candidates.map((element, index) =>
              element.id ? (
                <label
                  key={'D:' + element.id}
                  className={styles.inputContainer}
                  htmlFor={
                    question.id
                      ? question.id + ':' + element.id + ':' + element.value
                      : 'test:' + element.id + ':' + element.value
                  }
                >
                  <input
                    style={{ margin: 'auto 12px auto 4px' }}
                    type="radio"
                    id={
                      question.id
                        ? question.id + ':' + element.id + ':' + element.value
                        : 'test:' + element.id + ':' + element.value
                    }
                    name={question.id ? question.id : 'test'}
                    value={element.value}
                    onChange={() => selectAnswer(question.id, element.value)}
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
                <div className={styles.inputContainer} key={'D:' + index}>
                  <input
                    style={{ margin: 'auto 4px' }}
                    type="radio"
                    id={index + ':' + element}
                    value={element}
                    onChange={() => selectAnswer(question.id, element)}
                  />
                  <label
                    className={styles.candidates}
                    htmlFor={index + ':' + element}
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
            )
          ) : question.type === 's' ? (
            <div>
              <textarea
                onChange={(e) => selectAnswer(question.id, e.target.value)}
              />
            </div>
          ) : null}
        </fieldset>
      </div>
    </>
  );
}

export default TutoringQuestions;
