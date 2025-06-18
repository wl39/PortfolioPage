import React, { useEffect, useState } from 'react';
import styles from '../Submission/Submission.module.css';
import mStyles from './ModifiableSubmission.module.css';
import SyntaxHighlight from '../SyntaxHighlight/SyntaxHighlight';
import { dateOptions } from '../../utils/dateFormat';
import { classnames } from '../../utils/classnames';

import Input from '../Input/Input';
import Cross from '../Cross/Cross';
import Card from '../Card/Card';

const defaultQuestion = {
  title: '',
  question: '',
  type: '',
  candidates: [],
  hint: '',
  students: [],
  topics: [],
  answer: '',
  explanation: '',
  generatedDate: '',
  targetDate: '',
};

function ModifiableSubmission({
  question,
  submitDate,
  id,
  modify,
  index,
  unique,
}) {
  const [newQuestion, setNewQuestion] = useState(question || defaultQuestion);
  const [showHint, setShowHint] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    setNewQuestion(question);
  }, [question]);

  const changeValue = (value, type, reload = false, index) => {
    setIsChanged(true);
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion, // Spread the previous state
      [type]: value, // Update the specific property
    }));

    if (reload) {
      let localNewQuestion = { ...newQuestion, [type]: value };

      console.log(localNewQuestion);

      modify(localNewQuestion, index);
    }
  };

  const changeValueAndModify = (value, type, index) => {
    setIsChanged(true);
    let prevQuestion = newQuestion;

    prevQuestion = {
      ...prevQuestion,
      [type]: value,
    };

    modify(prevQuestion, index);
    setNewQuestion(prevQuestion);
  };

  const candidateChange = (checked, value, index, isAnswer) => {
    value = value.replaceAll('&code:', '');

    if (checked) {
      value = '&code:' + value;
    }

    setIsChanged(true);
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion, // Preserve the other properties
      candidates: prevQuestion.candidates.map((candidate, i) =>
        i === index ? value : candidate
      ), // Update the specific index
      answer: isAnswer ? value : prevQuestion.answer,
    }));
  };

  const changeCandidatesSize = (value) => {
    if (value < 4) {
      return;
    }
    let newCandidates = new Array(parseInt(value)).fill('');

    let newQuestionWithCandidates = {};

    newQuestion.candidates.forEach((v, index) => {
      if (index >= value) {
        return;
      }
      newCandidates[index] = newQuestion.candidates[index];
    });

    setIsChanged(true);

    newQuestionWithCandidates = {
      ...newQuestion,
      candidates: newCandidates,
    };

    setNewQuestion((prevQuestion) => ({
      ...prevQuestion, // Preserve the other properties
      candidates: newCandidates,
    }));

    modify(newQuestionWithCandidates, index);
  };

  useEffect(() => {
    if (!isModifying && isChanged) {
      modify(newQuestion, index);
      setIsChanged(false);
    }
  }, [isModifying, index, modify, newQuestion, isChanged]);

  return (
    <>
      <div>
        {isModifying ? (
          <input
            className={classnames([mStyles.inputTitle, styles.title])}
            id={'m.' + newQuestion.title + index}
            value={newQuestion.title}
            onChange={(e) => changeValue(e.target.value, 'title')}
          />
        ) : (
          <h1 className={styles.title}>
            {question.id ? question.id : 0}. {question.title}
          </h1>
        )}

        <fieldset className={styles.correctQuestionContainer}>
          <button
            className={mStyles.modifyButton}
            onClick={() =>
              setIsModifying((prev) => {
                return !prev;
              })
            }
          />

          {isModifying ? (
            <div>
              <input
                className={mStyles.question}
                id={'m.' + newQuestion.question}
                value={newQuestion.question.split('&code:')[0]}
                onChange={(e) =>
                  changeValue(
                    e.target.value +
                      (newQuestion.question.split('&code:')[1]
                        ? '&code:' + newQuestion.question.split('&code:')[1]
                        : ''),
                    'question'
                  )
                }
              />
              <textarea
                className={mStyles.code}
                id={
                  'm.code.' +
                  (newQuestion.question.includes('&code:')
                    ? newQuestion.question.split('&code:')[1]
                    : index)
                }
                value={newQuestion.question.split('&code:')[1]}
                placeholder="code for"
                onChange={(e) =>
                  changeValue(
                    newQuestion.question.split('&code:')[0] +
                      '&code:' +
                      e.target.value,
                    'question'
                  )
                }
              />
            </div>
          ) : (
            question.question.split('&code:').map((value, qIndex) =>
              qIndex === 1 ? (
                <SyntaxHighlight code={value} key={qIndex} />
              ) : (
                <div
                  key={index + ':' + qIndex}
                  className={styles.questionHeader}
                >
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
            )
          )}

          {isModifying ? (
            <div className={mStyles.candidate_number}>
              <label className={mStyles.label} htmlFor={`c_n${index}`}>
                Number of Candidates:
              </label>
              <input
                id={`c_n${index}`}
                type="number"
                onChange={(e) => changeCandidatesSize(e.target.value)}
                value={
                  question.candidates.length < 4
                    ? 4
                    : question.candidates.length
                }
              />
            </div>
          ) : (
            <></>
          )}

          {isModifying
            ? question.candidates.map((element, cIndex) => (
                <div
                  style={{ padding: '8px 4px 8px 0px' }}
                  className={
                    element === question.answer
                      ? styles.answerContainer
                      : styles.inputContainer
                  }
                  key={element + ':' + cIndex}
                >
                  <input
                    id={'checkbox.' + index + '.' + cIndex}
                    type="checkbox"
                    onChange={(e) =>
                      candidateChange(
                        e.target.checked,
                        newQuestion.candidates[cIndex],
                        cIndex
                      )
                    }
                    checked={
                      newQuestion.candidates[cIndex]
                        ? newQuestion.candidates[cIndex].includes('&code:')
                        : false
                    }
                  />
                  <label
                    className={mStyles.code_label}
                    htmlFor={'checkbox.' + index + '.' + cIndex}
                  >
                    Code
                  </label>
                  <textarea
                    style={{
                      margin: 'auto 4px',
                      resize: 'vertical',
                      width: 'calc(100% - 175px)',
                    }}
                    id={'mc' + index + '.' + cIndex}
                    value={
                      newQuestion.candidates[cIndex].includes('&code:')
                        ? newQuestion.candidates[cIndex].split('&code:')[1]
                        : newQuestion.candidates[cIndex]
                    }
                    onChange={(e) =>
                      candidateChange(
                        false,
                        e.target.value,
                        cIndex,
                        newQuestion.answer === newQuestion.candidates[cIndex]
                      )
                    }
                  />
                  <input
                    id={'radio.c' + index + '.' + cIndex}
                    name={'radio.c.' + index}
                    type="radio"
                    value={newQuestion.candidates[cIndex]}
                    checked={
                      newQuestion.answer === newQuestion.candidates[cIndex]
                    }
                    onChange={(e) => {
                      changeValueAndModify(e.target.value, 'answer', index);
                    }}
                  />
                  <label
                    className={mStyles.answer_label}
                    htmlFor={'radio.c' + index + '.' + cIndex}
                  >
                    ANSWER
                  </label>
                </div>
              ))
            : question.candidates.map((element, qIndex) => (
                <div
                  className={
                    element === question.answer
                      ? styles.answerContainer
                      : styles.inputContainer
                  }
                  key={'D:' + qIndex}
                >
                  <input
                    style={{ margin: 'auto 4px' }}
                    type="radio"
                    name={id ? id : 'test'}
                    value={element}
                    disabled={true}
                    id={index + ':' + qIndex + ':' + element + unique}
                  />
                  <label
                    className={styles.candidates}
                    htmlFor={index + ':' + qIndex + ':' + element + unique}
                  >
                    {element.includes('&code:') ? (
                      <SyntaxHighlight
                        code={element.split('&code:')[1]}
                        key={'syntax' + element.id}
                      />
                    ) : (
                      <div key={element + ':' + qIndex}>{element}</div>
                    )}
                  </label>
                </div>
              ))}

          {isModifying ? (
            <div>
              <Input
                propStyles={mStyles.topic_input}
                placeholder={'Topic to add (Press Enter Key to add...)'}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
                    changeValue(
                      [...question.topics, event.target.value],
                      'topics',
                      true,
                      index
                    );

                    event.target.value = '';
                  }
                }}
              />

              <div className={mStyles.topic_card_container}>
                {question.topics.map((value, topicIndex) => (
                  <Card
                    propStyles={mStyles.topic_card}
                    key={'T.' + value + '.' + topicIndex}
                  >
                    <div>{value}</div>
                    <Cross
                      size={24}
                      line={5}
                      onClick={() =>
                        changeValue(
                          question.topics.filter((topic) => topic !== value),
                          'topics',
                          true,
                          index
                        )
                      }
                    />
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className={mStyles.topic_card_container}>
              {question.topics.map((value, topicIndex) => (
                <Card
                  propStyles={mStyles.topic_card}
                  key={'t.' + value + '.' + topicIndex}
                >
                  <div>{value}</div>
                </Card>
              ))}
            </div>
          )}

          {isModifying ? (
            <textarea
              id={'m.exp' + index}
              value={newQuestion.explanation}
              style={{ height: '250px', resize: 'vertical' }}
              onChange={(e) => changeValue(e.target.value, 'explanation')}
            />
          ) : (
            <div className={styles.explanationContainer}>
              <div className={styles.explanationHeader}>Explanation</div>
              <div className={styles.explanationDetails}>
                {question.explanation}
              </div>
            </div>
          )}

          {/* {isModifying ? : <></>} */}
        </fieldset>
      </div>
    </>
  );
}

export default ModifiableSubmission;
