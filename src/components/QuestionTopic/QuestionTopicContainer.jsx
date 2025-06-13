import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PageableContext } from '../../layouts/Pageable/PageableContext';
import {
  getAllTopics,
  getSimpleQuestionsWithTopics,
  patchQuestionsTopics,
  postTopic,
} from '../../services/api/HMSService';
import AssignmentBox from '../AssignmentBox/AssignmentBox';
import Input from '../Input/Input';
import { isNonEmptyObject } from '../../utils/emptyObjectChecker';

function QuestionTopicContainer({ data }) {
  const { setPageable, pageParams } = useContext(PageableContext);
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicToAdd, setTopicToAdd] = useState('');
  const [searchTitle, setSearchTitle] = useState('');

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ submit 중 여부

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

  const fetchQuestionTopics = async () => {
    setLoading(true);
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
      alert('문제 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTopic = async (topic) => {
    if (topic && window.confirm('Are you sure to add topic ' + topic + ' ?')) {
      try {
        const data = await postTopic(topic);
        setTopicToAdd('');
        alert('Successfully Uploaded!');
        fetchQuestionTopics();
      } catch (error) {
        console.error(error);
        alert('토픽 업로드 중 오류가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
    searchTitleRef.current = searchTitle;
  }, [searchTitle]);

  useEffect(() => {
    fetchQuestionTopics();
  }, [pageParams, setPageable]);

  if (loading) {
    return <div>Is Loading</div>;
  }

  // ✅ 수정된 submit 함수
  const submit = async (sourceCheck, targetCheck) => {
    if (!isNonEmptyObject(sourceCheck) || !isNonEmptyObject(targetCheck)) {
      alert('문제 또는 토픽이 선택되지 않았습니다.');
      return;
    }

    const questionsTopics = {
      questionIds: Object.keys(sourceCheck)
        .filter((key) => sourceCheck[key])
        .map((key) => parseInt(key.match(/^\d+/)[0], 10)),
      topics: Object.keys(targetCheck).filter((key) => targetCheck[key]),
    };

    try {
      setIsSubmitting(true);
      await patchQuestionsTopics(questionsTopics);
      alert('업로드가 성공적으로 완료되었습니다!');
      fetchQuestionTopics(); // 다시 불러오기
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('업로드 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Input
        placeholder={'Add topic'}
        value={topicToAdd}
        onChange={(e) => setTopicToAdd(e.target.value)}
        onKeyDown={(event) => {
          if (event.nativeEvent.isComposing) return;
          if (event.key === 'Enter') fetchTopic(topicToAdd);
        }}
      />
      <Input
        placeholder={'Search Title'}
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        onKeyDown={(event) => {
          if (event.nativeEvent.isComposing) return;
          if (event.key === 'Enter') fetchQuestionTopics();
        }}
      />
      <AssignmentBox
        source={questions.map((value) => value.id + '. ' + value.question)}
        sourceToTargets={sourceToTargets}
        target={topics.map((value) => value.title)}
        targetToSources={targetToSources}
        submit={submit}
        isSubmitting={isSubmitting} // ✅ 필요한 경우 AssignmentBox 쪽에도 넘김
      />
    </>
  );
}

export default QuestionTopicContainer;
