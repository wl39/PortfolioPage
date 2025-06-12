import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PageableContext } from '../../layouts/Pageable/PageableContext';
import {
  getAllTopics,
  getSimpleQuestionsWithTopics,
} from '../../services/api/HMSService';
import AssignmentBox from '../AssignmentBox/AssignmentBox';
import Input from '../Input/Input';

function QuestionTopicContainer({ data }) {
  const { setPageable, pageParams } = useContext(PageableContext);
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');

  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const searchTitleRef = useRef('');

  const sourceToTargets = useMemo(() => {
    return questions.reduce((acc, question) => {
      acc[question.id + '. ' + question.question] = question.topics;

      return acc;
    }, {});
  }, [questions, topics]);

  const targetToSources = useMemo(() => {
    return topics.reduce((acc, topic) => {
      acc[topic.title] = questions.reduce((arr, question) => {
        for (const title of question.topics) {
          if (title === topic.title) {
            arr.push(question.id + '. ' + question.question);
            break;
          }
        }

        return arr;
      }, []);
      return acc;
    }, {});
  }, [questions, topics]);

  const getQuestionTopics = async () => {
    console.log(searchTitleRef.current);
    setLoading(true); // 요청 시작 시 로딩 true
    try {
      const data = await Promise.all([
        getSimpleQuestionsWithTopics(pageParams, searchTitleRef.current),
        getAllTopics(),
      ]);
      setQuestions(data[0].content);

      setPageable({
        numberOfElements: data[0].numberOfElements,
        size: data[0].size,
        totalElements: data[0].totalElements,
        totalPages: data[0].totalPages,
        pageNumber: data[0].pageable.pageNumber,
      });

      setTopics(data[1]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // 완료 시 로딩 false
    }
  };

  useEffect(() => {
    searchTitleRef.current = searchTitle;
  }, [searchTitle]);

  useEffect(() => {
    getQuestionTopics();
  }, [pageParams, setPageable]);

  if (loading) {
    return <div>Is Loading</div>;
  }

  const submit = (sourceCheck, targetCheck) => {};

  return (
    <>
      <Input
        placeholder={'Title'}
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') getQuestionTopics();
        }}
      />
      <AssignmentBox
        source={questions.map((value) => value.id + '. ' + value.question)}
        sourceToTargets={sourceToTargets}
        target={topics.map((value) => value.title)}
        targetToSources={targetToSources}
        submit={(sourceCheck, targetCheck) => submit(sourceCheck, targetCheck)}
      />
    </>
  );
}

export default QuestionTopicContainer;
