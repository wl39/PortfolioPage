import { useContext, useEffect, useRef, useState } from 'react';
import { PageableContext } from '../../layouts/Pageable/PageableContext';
import { getAllQuestions } from '../../services/api/HMSService';
import { useLocation, useNavigate } from 'react-router-dom';

import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';
import ModifiableSubmission from '../../components/ModifiableSubmission/ModifiableSubmission';
import Card from '../../components/Card/Card';

import styles from './ModifyQuestionPage.module.css';
import ModifyQuestionCandidate from '../../components/ModifyQuestionCandidate/ModifyQuestionCandidate';

const ModifyQuestionPage = () => {
  const [originalQuestionsJSON, setOriginalQuestionsJSON] = useState([]);
  const [toModifyQuestions, setToModifyQuestions] = useState([]);
  const [modifiedQuestions, setModifiedQuestions] = useState([]);
  const [questionsJSON, setQuestionsJSON] = useState([]);
  const { setPageable, pageParams } = useContext(PageableContext);

  const modifiedQuestionsRef = useRef(modifiedQuestions);

  const location = useLocation();
  const navigate = useNavigate();

  const modify = (newQuestion, index) => {
    const updated = [...questionsJSON]; // 새로운 배열 생성
    updated[index] = newQuestion;

    let localModifiedQuestions = [...modifiedQuestions];
    let localToModifyQuestions = [...toModifyQuestions];

    if (
      JSON.stringify(originalQuestionsJSON[index]) !==
      JSON.stringify(updated[index])
    ) {
      const existingIndex = localModifiedQuestions.findIndex(
        (localModifiedQuestion) =>
          localModifiedQuestion.id === updated[index].id
      );

      if (existingIndex !== -1) {
        localModifiedQuestions[existingIndex] = updated[index];
      } else {
        localModifiedQuestions = [...localModifiedQuestions, updated[index]];
        localToModifyQuestions = [
          ...localToModifyQuestions,
          originalQuestionsJSON[index],
        ];
      }
    } else {
      localModifiedQuestions = localModifiedQuestions.filter(
        (v) => v.id !== originalQuestionsJSON[index].id
      );

      localToModifyQuestions = localToModifyQuestions.filter(
        (v) => v.id !== originalQuestionsJSON[index].id
      );
    }

    console.log(localModifiedQuestions);

    setQuestionsJSON(updated);
    setModifiedQuestions(localModifiedQuestions);
    setToModifyQuestions(localToModifyQuestions);
  };

  useEffect(() => {
    modifiedQuestionsRef.current = modifiedQuestions;
  }, [modifiedQuestions]);

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        let data = await getAllQuestions(pageParams);

        setPageable({
          numberOfElements: data.numberOfElements,
          size: data.size,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
          pageNumber: data.pageable.pageNumber,
        });

        data.content.forEach((element, index) => {
          const matched = modifiedQuestionsRef.current.find(
            (q) => q.id === element.id
          );

          if (matched) {
            data.content[index] = matched;
            return;
          }

          // 후보 값만 value 배열로 변환
          data.content[index].candidates = data.content[index].candidates.map(
            (c) => c.value
          );
        });

        setQuestionsJSON(data.content);
        setOriginalQuestionsJSON(data.content);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            navigate('/login', { state: { from: location }, replace: true });
          }

          if (error.response.status === 403) {
            navigate('/login', { replace: true });
          }
        }

        console.error(error);
      }
    };

    fetchAllQuestions();
  }, [pageParams, setPageable, location, navigate]); // eslint-disable-next-line

  return (
    <div>
      <DragAndDrop x={100}>
        <Card propStyles={styles.modifyCandidates}>
          {modifiedQuestions.map((value, index) => (
            <ModifyQuestionCandidate
              key={value.id + '.' + index}
              modifiedQuestion={value}
              toModifyQuestion={toModifyQuestions[index]}
              modify={modify}
              index={index}
            />
          ))}
        </Card>
      </DragAndDrop>
      {questionsJSON.map((element, index) => (
        <ModifiableSubmission
          key={index}
          question={element}
          studentAnswer={element.answer}
          modify={modify}
          index={index}
        />
      ))}
    </div>
  );
};

export default ModifyQuestionPage;
