import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './TutoringPage.module.css';
import TutoringQuestions from '../../components/TutoringQuestions/TutoringQuestions';
import {
  getQuestionsWithStudentName,
  postAnswers,
} from '../../services/api/HMSService';
import { formatToISO } from '../../utils/dateFormat';
import { PageableContext } from '../../layouts/Pageable/PageableContext';
import Button from '../../components/Button/Button';
import { useSelector } from 'react-redux';

const mockQuestion = {
  id: 0,
  title: "Oops! It seems there's no question for today's session.",
  question:
    'Looks like Lim is really putting in the effort to come up with a new one!',
  type: 'm',
  candidates: [],
  hint: "You've stumbled upon something interesting!",
  studentsFor: [],
  answer: 'a',
  explanation: '',
  generatedDate: '',
  targetDate: '',
  minAgo: 0,
  hourAgo: 0,
  dayAgo: 0,
  minLeft: 0,
  hourLeft: 0,
  dayLeft: 0,
};

function TutoringPage() {
  const { studentsName } = useParams();

  const { pageParams, setPageable } = useContext(PageableContext);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const navigate = useNavigate();

  // Fetch questions on mount or when studentsName changes
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionData = await getQuestionsWithStudentName(
          studentsName,
          pageParams
        );

        setQuestions(questionData.content);
        setPageable({
          numberOfElements: questionData.numberOfElements,
          size: questionData.size,
          totalElements: questionData.totalElements,
          totalPages: questionData.totalPages,
          pageNumber: questionData.pageable.pageNumber,
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // 401 에러이면 로그인 페이지로 이동
          navigate('/login');
        } else {
          console.error('Failed to fetch questions', error);
          alert('There is an issue on the server...!');
        }
      }
    };

    fetchQuestions();
  }, [studentsName, pageParams, setPageable, navigate]);

  // Update answers in state
  const selectAnswer = useCallback(
    (questionID, answerValue) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionID]: {
          answer: answerValue,
          studentName: studentsName,
          submitDate: formatToISO(Date.now()),
        },
      }));
    },
    [studentsName]
  );

  // Submit answers
  const handleSubmit = () => {
    if (!window.confirm('Are you sure to submit?')) {
      return;
    }

    const finalizedAnswers = Object.entries(answers).map(
      ([questionId, data]) => ({
        questionId,
        studentAnswer: data.answer,
        studentName: data.studentName.toLowerCase(),
        submitDate: data.submitDate,
      })
    );

    const sendAnswers = async () => {
      try {
        const response = await postAnswers(finalizedAnswers);
        console.log(response);
      } catch (error) {
        console.error(error);
        window.alert('There is an issue...');
      } finally {
        window.location.reload();
      }
    };

    sendAnswers();
  };

  // Use `mockQuestion` if no actual questions are returned
  const displayQuestions = questions.length > 0 ? questions : [mockQuestion];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.h1}>
          {studentsName[0].toUpperCase() + studentsName.slice(1)}
        </h1>
        <div className={styles.linkContainer}>
          <Link to={`/user`} style={{ marginTop: '22px' }}>
            <button className={styles.button}>Details...</button>
          </Link>
          <Link
            to={`/submission/${studentsName}`}
            style={{ marginTop: '22px' }}
          >
            <button className={styles.button}>Submissions</button>
          </Link>
        </div>
      </div>

      {/* Render questions */}
      {displayQuestions.map((question, idx) => (
        <TutoringQuestions
          key={question.id || idx}
          question={question}
          selectAnswer={selectAnswer}
        />
      ))}

      <div className={styles.buttonContainer}>
        <Button onclick={handleSubmit} disabled={questions.length === 0}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default TutoringPage;
