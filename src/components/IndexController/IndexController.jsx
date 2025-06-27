import { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { classnames } from '../../utils/classnames';
import Card from '../Card/Card';
import styles from './IndexController.module.css';
import { AnswerCheckerContext } from '../../context/AnswerCheckerContext';
import CardButton from '../CardButton/CardButton';
import { postAnswers } from '../../services/api/HMSService';

function IndexController({ propStyles, pageable, pageParams, setPageParams }) {
  const [showHeader, setShowHeader] = useState(true);

  const { contextAnswers, indexAnswers, noQuestion } =
    useContext(AnswerCheckerContext);

  const scrollToQuestionById = (index) => {
    const element = document.getElementById(`scroll-${index}`);
    if (element) {
      const yOffset = -90;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const changePage = useCallback(
    (value, index) => {
      let newPageParams = { ...pageParams, page: value };

      if (pageParams.page !== value) setPageParams(newPageParams);

      scrollToQuestionById((index - 1) % pageParams.size);
    },
    [pageParams, setPageParams]
  );

  // ...

  const items = useMemo(() => {
    const list = [];

    for (let i = 1; i <= pageable.totalElements; i++) {
      list.push(
        <div
          onClick={() => changePage(Math.floor((i - 1) / pageable.size), i)}
          key={i}
          className={indexAnswers.includes(i) ? styles.solved : styles.item}
        >
          {i}
        </div>
      );
    }

    return list;
  }, [pageable, changePage, indexAnswers]);

  const handleSubmit = () => {
    if (indexAnswers.length === 0) {
      return;
    }
    if (!window.confirm('Are you sure to submit?')) {
      return;
    }

    const finalizedAnswers = Object.entries(contextAnswers).map(
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

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastY && currentY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        top: showHeader ? '84px' : '10px',
      }}
      className={styles.container}
    >
      <Card propStyles={classnames([propStyles])}>
        <div className={styles.header}>Your Answers</div>
        <div className={styles.jump}>Jump to Question</div>
        {noQuestion ? (
          <div>Hello, there</div>
        ) : (
          <>
            <div className={styles.itemContainer}>{items}</div>
            <div className={styles.colorContainer}>
              <div className={styles.color}>
                <div className={classnames([styles.box, styles.solved])} />
                <div>Answered</div>
              </div>
              <div className={styles.color}>
                <div className={classnames([styles.box])} />
                <div>Unanswered</div>
              </div>
            </div>
          </>
        )}

        <CardButton
          propStyles={styles.button}
          disabled={indexAnswers.length === 0}
          color={'green'}
          onClick={handleSubmit}
        >
          Submit All
        </CardButton>
      </Card>
    </div>
  );
}

export default IndexController;
