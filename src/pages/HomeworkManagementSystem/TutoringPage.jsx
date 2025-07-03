import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import styles from './TutoringPage.module.css';
import TutoringQuestions from '../../components/TutoringQuestions/TutoringQuestions';
import {
  getAllQuestionIdsByStudentName,
  getQuestionsWithStudentName,
} from '../../services/api/HMSService';
import { formatToISO } from '../../utils/dateFormat';
import { PageableContext } from '../../layouts/Pageable/PageableContext';
import Cross from '../../components/Cross/Cross';
import Card from '../../components/Card/Card';
import { AnswerCheckerContext } from '../../context/AnswerCheckerContext';
import { isNonEmptyObject } from '../../utils/emptyObjectChecker';

const mockQuestion = {
  id: 0,
  title: "Oops! It seems there's no question for today's session.",
  question:
    'Looks like Lim is really putting in the effort to come up with a new one!',
  type: 'm',
  candidates: [],
  hint: "You've stumbled upon something interesting!",
  studentsFor: [],
  topics: [],
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
  // Params, Router, Context
  const { studentsName } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const date = searchParams.get('date');

  const studentArray = useMemo(() => [studentsName], [studentsName]);
  const { pageParams, setPageable } = useContext(PageableContext);
  const { contextAnswers, setContextAnswers, setNoQuestion, setIndices } =
    useContext(AnswerCheckerContext);

  // Local State
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  // Helpers
  const getParsedItem = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  };

  const filterValidAnswers = (answers, validIds) => {
    const result = { ...answers };
    for (const key in result) {
      if (!validIds.includes(Number(key))) delete result[key];
    }
    return result;
  };

  // 1. 초기 로딩: 로컬스토리지에 저장된 답변 가져오기
  useEffect(() => {
    const rawAnswers = getParsedItem('answers');
    if (isNonEmptyObject(rawAnswers)) {
      setAnswers(rawAnswers);
      setContextAnswers(rawAnswers);
    }
  }, [setContextAnswers]);

  // 2. 문제 ID와 유효한 답변 필터링
  useEffect(() => {
    const fetchAndCleanAnswers = async () => {
      try {
        const ids = await getAllQuestionIdsByStudentName(studentsName);
        setIndices(ids);

        const rawAnswers = getParsedItem('answers');

        if (isNonEmptyObject(rawAnswers)) {
          const cleanedAnswers = filterValidAnswers(rawAnswers, ids);

          setAnswers(cleanedAnswers);
          setContextAnswers(cleanedAnswers);

          localStorage.setItem('answers', JSON.stringify(cleanedAnswers));
        }
      } catch (error) {
        const status = error.response?.status;
        if (status === 401) return navigate('/login');
        if (status === 403) {
          alert('Access Denied!');
          return navigate(`/tutoring/${studentsName}`);
        }
        console.error('Failed to fetch questions', error);
        alert('There is an issue on the server...!');
      }
    };

    fetchAndCleanAnswers();
  }, [setContextAnswers, setIndices, studentsName]);

  // 3. 문제 가져오기
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestionsWithStudentName(
          studentsName,
          pageParams,
          date
        );
        const contents = data.content || [];

        setQuestions(contents);
        setNoQuestion(contents.length === 0);
        setPageable({
          numberOfElements: data.numberOfElements ?? 1,
          size: data.size ?? 1,
          totalElements: data.totalElements ?? 1,
          totalPages: data.totalPages ?? 1,
          pageNumber: data.pageable?.pageNumber ?? 1,
        });
      } catch (error) {
        const status = error.response?.status;
        if (status === 401) return navigate('/login');
        if (status === 403) {
          alert('Access Denied!');
          return navigate(`/tutoring/${studentsName}`);
        }
        console.error('Failed to fetch questions', error);
        alert('There is an issue on the server...!');
      }
    };

    fetchQuestions();
  }, [studentsName, pageParams, date, navigate, setNoQuestion, setPageable]);

  // 4. 답변 선택 핸들러
  const selectAnswer = useCallback(
    (questionID, answerValue) => {
      const updated = {
        ...answers,
        [questionID]: {
          answer: answerValue,
          studentName: studentsName,
          submitDate: formatToISO(Date.now()),
        },
      };
      setAnswers(updated);
    },
    [answers, studentsName]
  );

  // 6. 답변 상태 저장
  useEffect(() => {
    setContextAnswers(answers);
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [answers, setContextAnswers]);

  const displayQuestions = questions.length > 0 ? questions : [mockQuestion];

  // Render
  return (
    <div className={styles.page}>
      <div className={styles.header}></div>

      {date && (
        <div
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          onClick={() => navigate(`/tutoring/${studentsName}`)}
        >
          <Card propStyles={styles.dateSelected}>
            {date} <Cross propStyles={styles.cross} size={16} line={4} />
          </Card>
        </div>
      )}

      {displayQuestions.map((question, idx) => (
        <TutoringQuestions
          key={question.id || idx}
          question={question}
          selectAnswer={selectAnswer}
          index={pageParams.size * pageParams.page + idx + 1}
          localIndex={idx}
          contextAnswer={contextAnswers[question.id]?.answer || null}
        />
      ))}

      <div className={styles.buttonContainer}>{/* Submit 버튼 */}</div>
    </div>
  );
}

export default TutoringPage;
