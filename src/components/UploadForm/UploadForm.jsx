import React from 'react';
import Submission from '../Submission/Submission';
import TutoringQuestions from '../TutoringQuestions/TutoringQuestions';

import styles from './UploadForm.module.css';
import { formatToISO } from '../../utils/dateFormat';

const UploadForm = ({
  inputHandler,
  select,
  questions,
  setQuestions,
  candidates,
  updateCandidates,
  isAnswerCode,
  setIsAnswerCode,
  target,
}) => {
  return (
    <div style={{ display: 'flex' }}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <input
            className={styles.title}
            placeholder="Title"
            onChange={(e) => inputHandler(e, 'title')}
            value={questions.title}
          />
        </div>
        <div className={styles.radioContainer}>
          <input
            id="SAQ"
            type="radio"
            name="type"
            checked={questions.type === 's'}
            value="s"
            onChange={(e) => select(e)}
          />
          <label htmlFor="SAQ">Short Answer Question</label>
          <input
            id="MAQ"
            type="radio"
            name="type"
            checked={questions.type === 'M'}
            value="M"
            onChange={(e) => select(e)}
          />
          <label htmlFor="MAQ">Multiple Answers Question</label>
          <input
            id="MCQ"
            type="radio"
            name="type"
            checked={questions.type === 'm'}
            value="m"
            onChange={(e) => select(e)}
          />
          <label htmlFor="MCQ">Multiple Choice Question</label>
        </div>
        <input
          placeholder="Question"
          onChange={(e) => inputHandler(e, 'question')}
          className={styles.input}
          value={questions.question.split('&code:')[0]}
        />
        <textarea
          className={styles.textfield}
          placeholder="Code for the question?"
          onChange={(e) => inputHandler(e, 'code')}
          value={
            questions.question.includes('&code:')
              ? questions.question.split('&code:')[1]
              : ''
          }
        />
        {questions.type === 'm' && (
          <input
            placeholder="Number of Candidates"
            type="number"
            min="2"
            max="5"
            onChange={(e) => inputHandler(e, 'can')}
            className={styles.input}
          />
        )}
        {questions.candidates.map((_, index) => (
          <div key={index} className={styles.candidateContainer}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id={'candidate' + index}
              onChange={(e) => updateCandidates(index)}
            />
            <label className={styles.label} htmlFor={'candidate' + index}>
              Code
            </label>
            <textarea
              className={styles.candidateInput}
              placeholder={'Candidate ' + (index + 1)}
              value={
                questions.candidates[index].includes('&code:')
                  ? questions.candidates[index].split('&code:')[1]
                  : questions.candidates[index]
              }
              onChange={(e) => {
                const updatedCandidates = [...questions.candidates];
                updatedCandidates[index] = candidates[index]
                  ? '&code:' + e.target.value
                  : e.target.value;
                setQuestions({
                  ...questions,
                  candidates: updatedCandidates,
                });
              }}
            />
          </div>
        ))}
        <textarea
          style={{ height: '200px' }}
          placeholder="Hints"
          className={styles.input}
          onChange={(e) => inputHandler(e, 'hint')}
          value={questions.hint}
        />
        <input
          placeholder="Students For"
          className={styles.input}
          onChange={(e) => inputHandler(e, 'for')}
          value={questions.studentsForString}
        />
        <input
          placeholder="Topics ..."
          className={styles.input}
          onChange={(e) => inputHandler(e, 'topic')}
          value={questions.topcisForString}
        />
        <div className={styles.candidateContainer}>
          <input
            className={styles.checkbox}
            type="checkbox"
            id={'Answer'}
            value={isAnswerCode}
            onChange={(e) => {
              // console.log(isAnswerCode);
              setIsAnswerCode(!isAnswerCode);
              setQuestions({
                ...questions,
                answer: !isAnswerCode
                  ? '&code:' + questions.answer
                  : questions.answer.replace('&code:', ''),
              });
            }}
          />
          <label className={styles.label} htmlFor={'Answer'}>
            Code
          </label>
          <textarea
            className={styles.candidateInput}
            placeholder={'Answer'}
            value={
              questions.answer.includes('&code:')
                ? questions.answer.split('&code:')[1]
                : questions.answer
            }
            onChange={(e) => {
              setQuestions({
                ...questions,
                answer: isAnswerCode
                  ? '&code:' + e.target.value
                  : e.target.value,
              });
            }}
          />
        </div>
        <textarea
          style={{ height: '200px' }}
          placeholder="Explanation"
          className={styles.input}
          onChange={(e) => inputHandler(e, 'exp')}
          value={questions.explanation}
        />
        <input
          placeholder="Target Date"
          className={styles.input}
          type="datetime-local"
          min={formatToISO(Date.now()).slice(0, 16)}
          max={target}
          onChange={(e) => inputHandler(e, 'target')}
          value={questions.targetDate}
        />
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          paddingLeft: '10px',
        }}
      >
        <h3 style={{ fontSize: '30px' }}>Expected Result For The Question</h3>
        <TutoringQuestions question={questions} />
        <Submission
          question={questions}
          studentAnswer={questions.answer}
          isMarked={true}
        />
      </div>
    </div>
  );
};

export default UploadForm;
