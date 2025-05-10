import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from './SubmissionPage.module.css';
import Submission from '../../components/Submission/Submission';
import { getAllSubmissions } from '../../services/api/HMSService';
import { PageableContext } from '../../layouts/Pageable/PageableContext';

function SubmissionPage() {
  const { setPageable, pageParams } = useContext(PageableContext);
  const { studentsName } = useParams();
  const [submissions, setSubmissions] = useState([]);

  const emptyQuestion = {
    id: 0,
    title: 'Oops! It appears there are no submissions at the moment.',
    question: "Please come back after you've finished answering the questions.",
    type: 'm',
    candidates: [],
    hint: 'Remember to return after completing the questions!',
    studentsFor: [],
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

  const setSubmissionComponents = useCallback((data, searched) => {
    let submissionComponents = [];
    let totalQuestions = 0;
    let correctQuestions = 0;
    let localQuestions = [];

    data.map((value, index) => {
      totalQuestions++;
      localQuestions = [...localQuestions, value];

      if (value.studentAnswer === value.question.answer) correctQuestions++;
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

    setTotalQuestions(totalQuestions);
    setTotalCorrectQuestions(correctQuestions);
    setSubmissions(submissionComponents);
  }, []);

  useEffect(() => {
    const fetchAllSubmissions = async () => {
      const response = await getAllSubmissions(studentsName, pageParams);

      try {
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
        console.error(error);

        window.alert('There is an issue...');
      }
    };

    fetchAllSubmissions();
  }, [setSubmissionComponents, studentsName, pageParams, setPageable]);

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
      <div className={styles.header}>
        <h1 className={styles.h1}>
          {studentsName[0].toUpperCase() + studentsName.slice(1)}
        </h1>
        <div className={styles.linkContainer}>
          <Link to={'/user'} style={{ marginTop: '22px' }}>
            <button className={styles.button}>Details...</button>
          </Link>
          <Link to={'/tutoring/' + studentsName} style={{ marginTop: '22px' }}>
            <button className={styles.button}>Questions</button>
          </Link>
        </div>
      </div>
      {!totalQuestions ? null : (
        <div className={styles.score}>
          Score{': '}
          {((totalCorrectQuestions / totalQuestions) * 100).toFixed(2)}% (
          {totalCorrectQuestions} / {totalQuestions}){' '}
        </div>
      )}
      <div className={styles.searchContainer}>
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
      </div>

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
