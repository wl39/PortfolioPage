import React from 'react';
import Submission from '../Submission/Submission';
import TutoringQuestions from '../TutoringQuestions/TutoringQuestions';

import styles from './UploadForm.module.css';
import { formatToISO } from '../../utils/dateFormat';
import Card from '../Card/Card';
import CardInput from '../CardInput/CardInput';
import CardButton from '../CardButton/CardButton';
import { ReactComponent as Lock } from '../../Icons/lock.svg';
import { ReactComponent as LockOpen } from '../../Icons/lock_open.svg';
import { ReactComponent as Code } from '../../Icons/code.svg';
import { ReactComponent as CodeOff } from '../../Icons/code_off.svg';
import { ReactComponent as Check } from '../../Icons/check_circle.svg';
import { ReactComponent as CheckOutline } from '../../Icons/check_circle_outline.svg';
import { ReactComponent as Visibility } from '../../Icons/visibility.svg';
import { classnames } from '../../utils/classnames';
import Modal from '../Modal/Modal';

const UploadForm = ({
  inputHandler,
  select,
  availableStudents,
  addStudent,
  selectAllStudents,
  fixed = {
    title: false,
    type: false,
    question: false,
    question_code: false,
    candidates: false,
    hints: false,
    students: false,
    topics: false,
    answer: false,
    explanation: false,
    target_date: false,
  },
  setFixed,
  questions,
  setQuestions,
  candidates,
  updateCandidates,
  isAnswerCode,
  setIsAnswerCode,
  target,
  uploadQuestions,
  hide,
  setHide,
}) => {
  return (
    <div className={styles.main}>
      <Card propStyles={styles.questionFormCard}>
        <div className={styles.container}>
          <div className={styles.formHeader}>Question Details</div>
          <div className={styles.inputLockContainer}>
            <CardInput
              containerStyles={styles.inputContainer}
              label="Assignment Title"
              propStyles={styles.title}
              placeholder="Enter assignment Title"
              onChange={(e) => inputHandler(e, 'title')}
              value={questions.title}
            />
            <CardButton
              onClick={() => setFixed({ ...fixed, title: !fixed.title })}
              propStyles={classnames([
                styles.lockButton,
                fixed.title ? styles.lockButtonLocked : null,
              ])}
              color="yellow"
            >
              {fixed.title ? <Lock fill="black" /> : <LockOpen fill="black" />}
            </CardButton>
          </div>
          <br />
          <div className={styles.inputLockContainer}>
            <CardInput
              containerStyles={styles.inputContainer}
              label="Question Text"
              placeholder="Enter question"
              onChange={(e) => inputHandler(e, 'question')}
              className={styles.input}
              value={questions.question.split('&code:')[0]}
            />
            <CardButton
              onClick={() => setFixed({ ...fixed, question: !fixed.question })}
              propStyles={classnames([
                styles.lockButton,
                fixed.question ? styles.lockButtonLocked : null,
              ])}
              color="yellow"
            >
              {fixed.question ? (
                <Lock fill="black" />
              ) : (
                <LockOpen fill="black" />
              )}
            </CardButton>
          </div>
          <textarea
            id="code.details"
            className={styles.textfield}
            placeholder="Code or more details for the question?"
            onChange={(e) => inputHandler(e, 'code')}
            value={
              questions.question.includes('&code:')
                ? questions.question.split('&code:')[1]
                : ''
            }
          />
          <br />
          <div className={styles.labelText}>Question Type</div>
          <div className={styles.radioContainer}>
            <div className={styles.border}>
              <input
                id="SAQ"
                type="radio"
                name="type"
                checked={questions.type === 's'}
                value="s"
                onChange={(e) => select(e)}
              />
              <label htmlFor="SAQ">Short Answer Question</label>
            </div>
            <div className={styles.border}>
              <input
                id="MAQ"
                type="radio"
                name="type"
                checked={questions.type === 'M'}
                value="M"
                onChange={(e) => select(e)}
              />
              <label htmlFor="MAQ">Multiple Answers Question</label>
            </div>
            <div className={styles.border}>
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
            <CardButton
              onClick={() => setFixed({ ...fixed, type: !fixed.type })}
              propStyles={classnames([
                styles.lockButton,
                fixed.type ? styles.lockButtonLocked : null,
              ])}
              color="yellow"
            >
              {fixed.type ? <Lock fill="black" /> : <LockOpen fill="black" />}
            </CardButton>
          </div>

          {questions.type === 'm' && (
            <>
              <label className={styles.labelText} htmlFor="candidates">
                Number of Answer Options
              </label>
              <input
                id="candidates"
                placeholder="Number of Candidates"
                type="number"
                min="2"
                max="5"
                onChange={(e) => inputHandler(e, 'can')}
                className={styles.numberInput}
              />
              {/* <CardButton
              onClick={() => setFixed({ ...fixed, candidates: !fixed.candidates })}
              propStyles={classnames([
                styles.lockButton,
                fixed.candidates ? styles.lockButtonLocked : null,
              ])}
              color="yellow"
            >
              {fixed.candidates ? (
                <Lock fill="black" />
              ) : (
                <LockOpen fill="black" />
              )}
            </CardButton> */}
            </>
          )}
          {candidates.length ? (
            <label style={{ marginTop: 12 }} className={styles.labelText}>
              Options
            </label>
          ) : null}
          {questions.candidates.map((_, index) => (
            <div key={index} className={styles.candidateContainer}>
              <div style={{ marginRight: '12px' }}>{index + 1 + ') '}</div>
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

                  setQuestions((prev) => {
                    return {
                      ...prev,
                      candidates: updatedCandidates,
                      answer:
                        prev.answer === prev.candidates[index]
                          ? updatedCandidates[index]
                          : prev.answer,
                    };
                  });
                }}
              />
              {/* <input
                className={styles.checkbox}
                type="checkbox"
                id={'candidate' + index}
                onChange={(e) => {
                  updateCandidates(index);
                }}
              /> */}
              <CardButton
                propStyles={classnames([
                  styles.lockButton,
                  styles.codeButton,
                  candidates[index] ? styles.lockButtonLocked : null,
                ])}
                onClick={() => updateCandidates(index)}
                color={'blue'}
              >
                {candidates[index] ? (
                  <Code fill="white" />
                ) : (
                  <CodeOff fill="white" />
                )}
              </CardButton>

              <CardButton
                propStyles={classnames([
                  styles.lockButton,
                  styles.codeButton,
                  questions.answer === questions.candidates[index]
                    ? styles.lockButtonLocked
                    : null,
                ])}
                onClick={() =>
                  setQuestions({
                    ...questions,
                    answer: questions.candidates[index],
                  })
                }
                color={'green'}
              >
                {questions.answer === questions.candidates[index] ? (
                  <Check fill="white" />
                ) : (
                  <CheckOutline fill="white" />
                )}
              </CardButton>
              {/* <label className={styles.label} htmlFor={'candidate' + index}>
                Code
              </label> */}
              {/* <input
                id={'answer' + index}
                type="radio"
                checked={questions.answer === questions.candidates[index]}
                onChange={(e) => {
                  setQuestions({
                    ...questions,
                    answer: questions.candidates[index],
                  });
                }}
              />
              <label className={styles.labelText} htmlFor={'answer' + index}>
                ANSWER
              </label> */}
            </div>
          ))}
          <br />
          <div className={styles.labelText}>Answer</div>
          <div className={styles.candidateContainer}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id={'Answer'}
              checked={questions.answer.includes('&code:')}
              onChange={(e) => {
                setIsAnswerCode(e.target.checked);
                setQuestions({
                  ...questions,
                  answer: e.target.checked
                    ? '&code:' + questions.answer
                    : questions.answer.replace('&code:', ''),
                });
              }}
            />
            <label className={styles.label} htmlFor={'Answer'}>
              Code
            </label>
            <textarea
              className={classnames([
                styles.candidateInputAnswer,
                styles.candidateInput,
              ])}
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
            <CardButton
              onClick={() => setFixed({ ...fixed, answer: !fixed.answer })}
              propStyles={classnames([
                styles.lockButton,
                fixed.answer ? styles.lockButtonLocked : null,
              ])}
              color="yellow"
            >
              {fixed.answer ? <Lock fill="black" /> : <LockOpen fill="black" />}
            </CardButton>
          </div>
          <br />
          <div className={styles.textareaLockContainer}>
            <label className={styles.labelText}>Hints</label>
            <CardButton
              onClick={() => setFixed({ ...fixed, hints: !fixed.hints })}
              propStyles={classnames([
                styles.lockButton,
                fixed.hints ? styles.lockButtonLocked : null,
              ])}
              color="yellow"
            >
              {fixed.hints ? <Lock fill="black" /> : <LockOpen fill="black" />}
            </CardButton>
          </div>
          <textarea
            style={{ height: '200px' }}
            placeholder="Enter Hints"
            className={styles.input}
            onChange={(e) => inputHandler(e, 'hint')}
            value={questions.hint}
          />
          <br />
          {/* <div className={styles.inputLockContainer}>
            <CardInput
              containerStyles={styles.inputContainer}
              placeholder="Students For"
              label={'Students For'}
              propStyles={styles.input}
              onChange={(e) => inputHandler(e, 'for')}
              value={questions.studentsForString}
            />
            <CardButton
              onClick={() => setFixed({ ...fixed, students: !fixed.students })}
              propStyles={classnames([
                styles.lockButton,
                fixed.students ? styles.lockButtonLocked : null,
              ])}
              color="yellow"
            >
              {fixed.students ? (
                <Lock fill="black" />
              ) : (
                <LockOpen fill="black" />
              )}
            </CardButton>
          </div> */}
          <br />
          <div className={styles.inputLockContainer}>
            <CardInput
              containerStyles={styles.inputContainer}
              label={'Topics'}
              placeholder="Topics ..."
              propStyles={styles.input}
              onChange={(e) => inputHandler(e, 'topic')}
              value={questions.topcisForString}
            />
            <CardButton
              onClick={() => setFixed({ ...fixed, topics: !fixed.topics })}
              propStyles={classnames([
                styles.lockButton,
                fixed.topics ? styles.lockButtonLocked : null,
              ])}
              color="yellow"
            >
              {fixed.topics ? <Lock fill="black" /> : <LockOpen fill="black" />}
            </CardButton>
          </div>
          <br />
          <div className={styles.textareaLockContainer}>
            <label className={styles.labelText}>
              Explanation for the question
            </label>
            <CardButton
              onClick={() =>
                setFixed({ ...fixed, explanation: !fixed.explanation })
              }
              propStyles={classnames([
                styles.lockButton,
                fixed.explanation ? styles.lockButtonLocked : null,
              ])}
              color="yellow"
            >
              {fixed.explanation ? (
                <Lock fill="black" />
              ) : (
                <LockOpen fill="black" />
              )}
            </CardButton>
          </div>
          <textarea
            style={{ height: '200px' }}
            placeholder="Explanation"
            className={styles.input}
            onChange={(e) => inputHandler(e, 'exp')}
            value={questions.explanation}
          />
          <br />
          <div className={styles.inputLockContainer}>
            <div className={styles.dueDateContainer}>
              <label className={styles.labelText}>Due Date</label>
              <input
                placeholder="Target Date"
                className={classnames([
                  styles.numberInput,
                  styles.inputContainer,
                ])}
                type="datetime-local"
                min={formatToISO(Date.now()).slice(0, 16)}
                max={target}
                onChange={(e) => inputHandler(e, 'target')}
                value={questions.targetDate}
              />
            </div>
            <CardButton
              onClick={() =>
                setFixed({ ...fixed, target_date: !fixed.target_date })
              }
              propStyles={classnames([
                styles.lockButton,
                fixed.target_date ? styles.lockButtonLocked : null,
              ])}
              color="yellow"
            >
              {fixed.target_date ? (
                <Lock fill="black" />
              ) : (
                <LockOpen fill="black" />
              )}
            </CardButton>
          </div>
        </div>
      </Card>

      <div className={styles.rightPanel}>
        <Card propStyles={styles.studentCard}>
          <div className={styles.textareaLockContainer}>
            <div className={styles.labelText}>Assign to Students</div>
            <CardButton
              onClick={() => setFixed({ ...fixed, students: !fixed.students })}
              propStyles={classnames([
                styles.lockButton,
                fixed.students ? styles.lockButtonLocked : null,
              ])}
              color="yellow"
            >
              {fixed.students ? (
                <Lock fill="black" />
              ) : (
                <LockOpen fill="black" />
              )}
            </CardButton>
          </div>
          <CardInput placeholder={'Search Students...'} />
          <CardButton
            propStyles={styles.check}
            color="gray"
            onClick={() => selectAllStudents(true)}
          >
            Select All
          </CardButton>
          <CardButton
            propStyles={styles.check}
            color="gray"
            onClick={() => selectAllStudents(false)}
          >
            Deselect All
          </CardButton>

          <Card propStyles={styles.studentsContainer}>
            {availableStudents.map((value, index) => (
              <label
                className={styles.studentContainer}
                htmlFor={value.name}
                key={value.name + '.' + index}
              >
                <input
                  className={styles.checkbox}
                  id={value.name}
                  checked={questions.students.includes(value.name)}
                  type="checkbox"
                  onChange={(e) => addStudent(e)}
                />
                <img
                  className={styles.studentImage}
                  width={40}
                  height={40}
                  src={value.url}
                  alt={value.name + '.thumb'}
                />
                <div className={styles.studentDetailsContainer}>
                  <div className={styles.name}>{value.name}</div>
                  <div className={styles.email}>{value.email}</div>
                </div>
              </label>
            ))}
          </Card>
        </Card>
        {/* <h3 style={{ fontSize: '30px' }}>Expected Result For The Question</h3>
        <TutoringQuestions question={questions} />
        <Submission
          question={questions}
          studentAnswer={questions.answer}
          isMarked={true}
        /> */}
        <CardButton propStyles={styles.submitButton} onClick={uploadQuestions}>
          Assign to Students
        </CardButton>

        <CardButton
          propStyles={classnames([
            styles.visibilityButton,
            styles.submitButton,
          ])}
          onClick={() => setHide(false)}
        >
          <Visibility fill="white" style={{ marginRight: '12px' }} />
          <div>Preview Question & Submission</div>
        </CardButton>
      </div>
      <Modal cardStyles={styles.cardStyle} hide={hide}>
        <div style={{ display: 'flex', gap: '36px' }}>
          <div style={{ flex: 1, margin: '10px 0px' }}>
            <TutoringQuestions question={questions} />
          </div>
          <div style={{ flex: 1 }}>
            <Submission
              question={questions}
              studentAnswer={questions.answer}
              isMarked={true}
            />
          </div>
        </div>
        <CardButton color={'gray'} onClick={() => setHide(true)}>
          Close
        </CardButton>
      </Modal>
      {console.log('HI?')}
    </div>
  );
};

export default UploadForm;
