import React, { useState, useEffect, useContext } from 'react';

import styles from './UploadPage.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UploadForm from '../../components/UploadForm/UploadForm';
import UploadFixer from '../../components/UploadFixer/UploadFixer';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';
import {
  getTeacherAllStudents,
  postQuestion,
} from '../../services/api/HMSService';
import { formatToISO } from '../../utils/dateFormat';
import { UsernameContext } from '../../context/UsernameContext';

function UploadPage() {
  const [questions, setQuestions] = useState({
    title: '',
    question: '',
    type: '',
    candidates: [],
    hint: '',
    students: [],
    studentsForString: '',
    topics: [],
    topcisForString: '',
    answer: '',
    explanation: '',
    generatedDate: formatToISO(Date.now()).sli,
    targetDate: '',
  });

  const [fixed, setFixed] = useState({
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
  });

  const [question, setQuestion] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [isAnswerCode, setIsAnswerCode] = useState(false);
  const [hide, setHide] = useState(true);

  const today = new Date(Date.now());
  today.setDate(today.getDate() + 14);
  const target = today.toISOString().slice(0, 19);

  const { username } = useContext(UsernameContext);

  const location = useLocation();
  const navigate = useNavigate();

  const addStudent = (event) => {
    const id = event.target.id;
    const isChecked = event.target.checked;

    setQuestions((prev) => {
      const currentStudents = prev.students || [];

      // true면 추가, false면 제거
      const updatedStudents = isChecked
        ? [...new Set([...currentStudents, id])] // 중복 방지
        : currentStudents.filter((studentId) => studentId !== id);

      console.log(questions);
      return {
        ...prev,
        students: updatedStudents,
      };
    });
  };

  const selectAllStudents = (checked) => {
    setQuestions((prev) => {
      const updatedStudents = checked
        ? availableStudents.map((value) => {
            return value.name;
          })
        : [];

      return {
        ...prev,
        students: updatedStudents,
      };
    });
  };

  useEffect(() => {
    // Reset input value when component mounts
    const checkAuthThenStudents = async () => {
      try {
        const value = await getTeacherAllStudents(username);

        setAvailableStudents(value);
      } catch (error) {
        if (error)
          navigate('/login', {
            state: { from: 'user/' + username },
            replace: true,
          });
      }
    };

    if (username) checkAuthThenStudents();
    resetQuestions();
  }, [username]); // The empty array ensures this only runs once when the component mounts

  const resetQuestions = () => {
    setQuestions({
      title: '',
      question: '',
      type: '',
      candidates: [],
      hint: '',
      students: [],
      studentsForString: '',
      topics: [],
      topcisForString: '',
      answer: '',
      explanation: '',
      generatedDate: formatToISO(Date.now()),
      targetDate: '',
    });
  };

  const resetQuestionsOnSubmit = () => {
    setQuestions({
      title: fixed.title ? questions.title : '',
      question: fixed.question ? questions.question : '',
      type: fixed.type ? questions.type : '',
      candidates: fixed.type ? Array(questions.candidates.length).fill('') : [],
      hint: fixed.hints ? questions.hint : '',
      students: fixed.students ? questions.students : [],
      studentsForString: fixed.students ? questions.studentsForString : '',
      topics: fixed.topics ? questions.topics : [],
      topcisForString: fixed.topics ? questions.topcisForString : '',
      answer: fixed.answer ? questions.answer : '',
      explanation: fixed.explanation ? questions.explanation : '',
      generatedDate: formatToISO(Date.now()),
      targetDate: fixed.target_date ? questions.targetDate : '',
    });
  };

  const inputHandler = (event, type) => {
    const { value } = event.target;

    switch (type) {
      case 'title':
        setQuestions((prev) => ({
          ...prev,
          title: value,
        }));
        break;

      case 'question': {
        setQuestions((prev) => {
          // preserve any existing code suffix
          const [, existingCode = ''] = prev.question.split('&code:');
          return {
            ...prev,
            question: value + (existingCode ? `&code:${existingCode}` : ''),
          };
        });
        setQuestion(value);
        break;
      }

      case 'code':
        setQuestions((prev) => {
          if (!value) {
            // drop code suffix entirely
            const [textOnly] = prev.question.split('&code:');
            return { ...prev, question: textOnly };
          }
          return {
            ...prev,
            question: question + `&code:${value}`,
          };
        });
        break;

      case 'hint':
        setQuestions((prev) => ({
          ...prev,
          hint: value,
        }));
        break;

      case 'ans':
        setQuestions((prev) => ({
          ...prev,
          answer: value,
        }));
        break;

      case 'exp':
        setQuestions((prev) => ({
          ...prev,
          explanation: value,
        }));
        break;

      case 'target':
        setQuestions((prev) => ({
          ...prev,
          targetDate: value,
        }));
        break;

      case 'can': {
        const num = parseInt(value, 10) || 0;
        setQuestions((prev) => ({
          ...prev,
          candidates: num > 0 ? Array(num).fill('') : [],
        }));
        setCandidates(() => (num > 0 ? Array(num).fill(false) : []));
        break;
      }

      case 'for': {
        const list = value
          .toLowerCase()
          .trimStart()
          .replace(/,\s+/g, ',')
          .split(',')
          .filter((v) => v);
        setQuestions((prev) => ({
          ...prev,
          students: list,
          studentsForString: value,
        }));
        break;
      }

      case 'topic': {
        const list = value
          .toLowerCase()
          .trimStart()
          .replace(/,\s+/g, ',')
          .split(',')
          .filter((v) => v);
        setQuestions((prev) => ({
          ...prev,
          topics: list,
          topcisForString: value,
        }));
        break;
      }

      default:
        break;
    }
  };

  const updateCandidates = (index) => {
    const updatedCandidates = [...candidates];

    updatedCandidates[index] = !updatedCandidates[index];

    setCandidates(updatedCandidates);

    if (questions.candidates[index]) {
      const newCandidates = [...questions.candidates];

      if (updatedCandidates[index])
        newCandidates[index] = '&code:' + newCandidates[index];
      else {
        newCandidates[index] = newCandidates[index].replace('&code:', '');
      }

      setQuestions({
        ...questions,
        candidates: newCandidates,
        answer:
          questions.answer === questions.candidates[index]
            ? newCandidates[index]
            : questions.answer,
      });
    }
  };

  const select = (value) => {
    if (value && value.target && value.target.value) {
      setQuestions({ ...questions, type: value.target.value });
    }
  };

  const uploadQuestions = () => {
    if (!questions.answer) {
      window.alert('Answer is missing.');
      return;
    }

    if (!questions.title) {
      window.alert('Title is missing.');
      return;
    }

    if (!questions.type) {
      window.alert('Type is missing.');
      return;
    }

    if (!questions.explanation) {
      window.alert('Explanation is missing.');
      return;
    }

    if (!questions.question) {
      window.alert('Question is missing.');
      return;
    }

    if (!questions.targetDate) {
      window.alert('Target Date is missing.');
      return;
    }

    const result = `Assignment Title: ${questions.title}
    Question: ${questions.question}
    Answer: ${questions.answer}
    Students: ${questions.students}`;

    if (window.confirm('This will be the question info: ' + result)) {
      if (questions) {
        const fetchQuestion = async (questions) => {
          try {
            const response = await postQuestion(questions);

            window.alert('Successfully uploaded!');
            if (questions.studentsForString) setStudents();
            console.log(response.data);
            resetQuestionsOnSubmit();
          } catch (error) {
            console.error(error);

            window.alert('There is an issue...');
          }
        };

        fetchQuestion(questions);
      }
    }
  };

  const setStudents = () => {
    let storageStudents = localStorage.getItem('students');

    let pageStudents = [];

    pageStudents = questions.studentsForString
      .toLowerCase()
      .trimStart()
      .replace(/,\s+/g, ',')
      .split(',');

    if (storageStudents) {
      let array = storageStudents.split(',');
      pageStudents.forEach((element) => {
        if (!array.includes(element)) {
          array.push(element);
        }
      });

      pageStudents = array;

      console.log(pageStudents);
    }
    pageStudents = pageStudents.filter((value) => value);
    console.log(pageStudents);

    localStorage.setItem('students', pageStudents);
  };

  const fixedHandler = (event) => {
    setFixed({ ...fixed, [event.target.id]: !fixed[event.target.id] });
  };

  return (
    <>
      <div className={styles.main}>
        {/* <button className={styles.input} onClick={resetQuestionsOnSubmit}>
          TEMP
        </button> */}
        {/* <div className={styles.linkContainer}>
          <Link className={styles.linkButton} to={'/questions'}>
            Archive
          </Link>
          <Link className={styles.linkButton} to={'/teacher'}>
            Teacher
          </Link>
          <DragAndDrop x={350} y={40}>
            <UploadFixer fixedHandler={fixedHandler} fixed={fixed} />
          </DragAndDrop>
        </div> */}
        <h1 className={styles.pageTitle}>Upload New Assignment</h1>
        <p className={styles.pageDescription}>
          Create and assign homework questions to your students or assign your
          own questions.
        </p>
        <UploadForm
          availableStudents={availableStudents}
          addStudent={addStudent}
          selectAllStudents={selectAllStudents}
          fixed={fixed}
          setFixed={setFixed}
          inputHandler={inputHandler}
          select={select}
          questions={questions}
          setQuestions={setQuestions}
          candidates={candidates}
          updateCandidates={updateCandidates}
          isAnswerCode={isAnswerCode}
          setIsAnswerCode={setIsAnswerCode}
          target={target}
          uploadQuestions={uploadQuestions}
          hide={hide}
          setHide={setHide}
        />
        {/* <button className={styles.input} onClick={uploadQuestions}>
          SUBMIT
        </button> */}

        <button className={styles.input} onClick={resetQuestions}>
          Remove all
        </button>
      </div>
    </>
  );
}

export default UploadPage;
