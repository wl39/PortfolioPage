import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import styles from './SubmissionPage.module.css';
import Submission from '../../components/Submission/Submission';
import { getAllSubmissions } from '../../services/api/HMSService';
import { PageableContext } from '../../layouts/Pageable/PageableContext';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';
import Calendar from '../../components/Calendar/Calendar';
import { toUSFormatDate } from '../../utils/dateFormat';

function SubmissionPage() {
  const { setPageable, pageParams } = useContext(PageableContext);
  const { studentsName } = useParams();
  const studentArray = useMemo(() => [studentsName], [studentsName]);

  const [submissions, setSubmissions] = useState([]);
  const [searchParams] = useSearchParams();

  const date = searchParams.get('date');
  const navigate = useNavigate();

  const emptyQuestion = {
    id: 0,
    title: 'Oops! It appears there are no submissions at the moment.',
    question: "Please come back after you've finished answering the questions.",
    type: 'm',
    candidates: [],
    hint: 'Remember to return after completing the questions!',
    studentsFor: [],
    topics: [],
    answer: 'a',
    explanation: '',
    generatedDate: '',
    targetDate: '',
    minAgo: 430,
    hourAgo: 7,
    dayAgo: 0,
    minLeft: 0,
    hourLeft: 0,
    dayLeft: 0,
  };

  const [searchParameter, setSearchParameter] = useState('Question');
  const [isSearchParamterClicked, setIsSearchParamterClicked] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(1);
  const [totalCorrectQuestions, setTotalCorrectQuestions] = useState(1);
  const [targetDates, setTargetDates] = useState([]);

  const setSubmissionComponents = useCallback((data, searched) => {
    let submissionComponents = [];
    let totalQuestions = 0;
    let correctQuestions = 0;
    let localQuestions = [];

    let oldestDate = null;
    let newestDate = null;

    data.map((value, index) => {
      const currentDate = new Date(value.targetDate);

      if (!oldestDate || currentDate < oldestDate) {
        oldestDate = currentDate;
      }
      if (!newestDate || currentDate > newestDate) {
        newestDate = currentDate;
      }

      totalQuestions++;
      localQuestions = [...localQuestions, value];

      if (value.marked === 1) correctQuestions++;

      submissionComponents = [
        ...submissionComponents,
        <Submission
          key={index}
          question={value.question}
          studentAnswer={value.studentAnswer}
          submitDate={value.submitDate}
          isMarked={value.marked}
          id={value.id}
        />,
      ];
      return null;
    });

    if (!searched) {
      setQuestionsData(localQuestions);
    }

    const uniqueDates =
      oldestDate.getTime() === newestDate.getTime()
        ? [oldestDate]
        : [oldestDate, newestDate];

    setTotalQuestions(totalQuestions);
    setTotalCorrectQuestions(correctQuestions);
    setTargetDates(uniqueDates);
    setSubmissions(submissionComponents);
  }, []);

  useEffect(() => {
    const fetchAllSubmissions = async () => {
      try {
        const response = await getAllSubmissions(
          studentsName,
          pageParams,
          date
        );

        setTotalQuestions(response.numberOfElements);
        setSubmissionComponents(response.content, false);
        setPageable({
          numberOfElements: response.numberOfElements,
          size: response.size,
          totalElements: response.totalElements,
          totalPages: response.totalPages,
          pageNumber: response.pageable.pageNumber,
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // 401 에러이면 로그인 페이지로 이동
          navigate('/login');
        } else {
          console.error(error);

          window.alert('There is an issue...');
        }
      }
    };

    fetchAllSubmissions();
  }, [
    setSubmissionComponents,
    studentsName,
    pageParams,
    setPageable,
    navigate,
  ]);

  const inputHandler = (event) => {
    if (event.target.value === null || event.target.value === '') {
      setSubmissionComponents(questionsData, false);
    } else {
      search(event.target.value);
    }
  };

  const search = (text) => {
    let localQuestions = [];

    questionsData.forEach((value) => {
      switch (searchParameter) {
        case 'Question':
          if (
            value.question.question.toLowerCase().includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          }
          break;
        case 'Answer':
          if (
            value.question.answer.toLowerCase().includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          }
          break;
        case 'Title':
          if (value.question.title.toLowerCase().includes(text.toLowerCase())) {
            localQuestions = [...localQuestions, value];
          }
          break;
        case 'Explanation':
          if (
            value.question.explanation
              .toLowerCase()
              .includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          }
          break;
        case 'Choice':
          for (let choice of value.question.candidates) {
            if (choice.toLowerCase().includes(text.toLowerCase())) {
              localQuestions = [...localQuestions, value];
              break;
            }
          }
          break;
        case 'Hint':
          if (value.question.hint.toLowerCase().includes(text.toLowerCase())) {
            localQuestions = [...localQuestions, value];
          }
          break;
        default:
          if (
            value.question.question.toLowerCase().includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          } else if (
            value.question.answer.toLowerCase().includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          } else if (
            value.question.title.toLowerCase().includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          } else if (
            value.question.explanation
              .toLowerCase()
              .includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          } else if (
            value.question.hint.toLowerCase().includes(text.toLowerCase())
          ) {
            localQuestions = [...localQuestions, value];
          } else {
            for (let choice of value.question.candidates) {
              if (choice.toLowerCase().includes(text.toLowerCase())) {
                localQuestions = [...localQuestions, value];
                break;
              }
            }
          }
          break;
      }
    });

    setSubmissionComponents(localQuestions, true);
  };

  const changeDropdown = () => {
    setIsSearchParamterClicked(!isSearchParamterClicked);
  };

  const closeDropdown = () => {
    setIsSearchParamterClicked(false);
  };

  const selectSearchParameter = (paramter) => {
    closeDropdown();
    setSearchParameter(paramter);
  };

  return (
    <div className={styles.page}>
      <DragAndDrop x={100}>
        <Calendar
          propStyles={styles.calendar}
          isStudent={true}
          students={studentArray}
        />
      </DragAndDrop>
      <div className={styles.headerCard}>
        <div className={styles.header}>
          <h1 className={styles.h1}>Results</h1>
          {!totalQuestions ? null : (
            <div className={styles.score}>
              <div className={styles.scoreText}>Score</div>
              <div
                className={
                  totalCorrectQuestions / totalQuestions > 0.5
                    ? styles.scoreValueGreen
                    : styles.scoreValueRed
                }
              >
                {totalCorrectQuestions} / {totalQuestions}{' '}
              </div>
              <div className={styles.scorePercent}>
                {((totalCorrectQuestions / totalQuestions) * 100).toFixed(2)}%
              </div>
            </div>
          )}
        </div>
        <div>
          {targetDates.length > 1
            ? `${toUSFormatDate(targetDates[0])} - ${toUSFormatDate(
                targetDates[1]
              )}`
            : targetDates.length === 1
            ? toUSFormatDate(targetDates[0])
            : ''}
        </div>
      </div>
      {/* <div className={styles.searchContainer}>
        <input
          placeholder="Search"
          className={styles.input}
          onChange={(e) => inputHandler(e)}
        />
        <div className={styles.searchDropdownContainer}>
          <button
            className={styles.searchDropdownButton}
            onClick={changeDropdown}
          >
            {searchParameter}
          </button>
          {isSearchParamterClicked ? (
            <div className={styles.upward} />
          ) : (
            <div className={styles.downward} />
          )}
          {isSearchParamterClicked ? (
            <div className={styles.searchDropdown}>
              <button onClick={() => selectSearchParameter('Question')}>
                Question
              </button>
              <button onClick={() => selectSearchParameter('Answer')}>
                Answer
              </button>
              <button onClick={() => selectSearchParameter('Title')}>
                Title
              </button>
              <button onClick={() => selectSearchParameter('Explanation')}>
                Explanation
              </button>
              <button onClick={() => selectSearchParameter('Choice')}>
                Choice
              </button>
              <button onClick={() => selectSearchParameter('Hint')}>
                Hint
              </button>
              <button onClick={() => selectSearchParameter('All')}>All</button>
            </div>
          ) : null}
        </div>
      </div> */}

      {submissions.length === 0 ? (
        <Submission
          question={emptyQuestion}
          studentAnswer={''}
          submitDate={''}
          isMarked={true}
          id={0}
        />
      ) : (
        submissions
      )}
    </div>
  );
}

export default SubmissionPage;
