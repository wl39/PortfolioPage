import { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { classnames } from '../../utils/classnames';
import Card from '../Card/Card';
import styles from './IndexController.module.css';
import { AnswerCheckerContext } from '../../context/AnswerCheckerContext';
import CardButton from '../CardButton/CardButton';
import { postAnswers } from '../../services/api/HMSService';
import { useLocation, useNavigate } from 'react-router-dom';
import Triangle from '../Triganle/Triangle';

function IndexController({
  propStyles,
  isSubmission,
  pageable,
  pageParams,
  setPageParams,
}) {
  const [hide, setHide] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  const { contextAnswers, noQuestion, indices } =
    useContext(AnswerCheckerContext);

  const navigate = useNavigate();
  const location = useLocation();

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
          className={
            isSubmission
              ? i <= pageParams.size * (pageParams.page + 1) &&
                i > pageParams.size * pageParams.page
                ? contextAnswers[i - pageParams.size * pageParams.page - 1]
                    ?.marked === 1
                  ? styles.solved
                  : styles.wrong
                : styles.item
              : contextAnswers[indices[i - 1]]
              ? styles.solved
              : styles.item
          }
        >
          {i}
        </div>
      );
    }

    return list;
  }, [pageable, changePage, contextAnswers, isSubmission, pageParams]);

  useEffect(() => {}, [contextAnswers]);

  const handleSubmit = () => {
    if (Object.keys(contextAnswers).length === 0) {
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

        localStorage.setItem('answers', '');
        localStorage.setItem('indexAnswers', '');
        console.log(response);
      } catch (error) {
        console.error(error);
        if (
          error.response &&
          error.response.status &&
          error.response.status === 401
        ) {
          alert('Your seession is expired. You have to login first.');

          navigate('/login', { state: { from: location }, replace: true });
        } else {
          window.alert('There is an issue...');
        }
      } finally {
        window.location.reload();
      }
    };

    sendAnswers();
  };

  useEffect(() => {
    let lastY = window.scrollY;

    const handleResize = () => setIsMobile(window.innerWidth <= 480);

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastY && currentY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      lastY = currentY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        top: isMobile ? undefined : showHeader ? '84px' : '10px',
        bottom: isMobile ? '0px' : 0,
      }}
      className={styles.container}
    >
      {isMobile && hide ? (
        <div className={styles.opener} onClick={() => setHide(false)}>
          <Triangle direction={'up'} onClick={() => setHide(false)} />
        </div>
      ) : (
        <Card propStyles={classnames([propStyles])}>
          {window.innerWidth <= 480 ? (
            <div className={styles.closer} onClick={() => setHide(true)}>
              <Triangle direction={'down'} onClick={() => setHide(true)} />
            </div>
          ) : null}
          <div className={styles.header}>
            {isSubmission ? 'Check' : ''} Your Answers
          </div>
          <div className={styles.jump}>Jump to Question</div>
          {noQuestion ? (
            <div>Hello, there</div>
          ) : (
            <>
              <div className={styles.itemContainer}>{items}</div>

              {isSubmission ? (
                <div className={styles.colorContainer}>
                  <div className={styles.color}>
                    <div className={classnames([styles.box, styles.solved])} />
                    <div>Correct</div>
                  </div>
                  <div className={styles.color}>
                    <div className={classnames([styles.box, styles.wrong])} />
                    <div>Wrong</div>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.colorContainer}>
                    <div className={styles.color}>
                      <div
                        className={classnames([styles.box, styles.solved])}
                      />
                      <div>Answered</div>
                    </div>
                    <div className={styles.color}>
                      <div className={classnames([styles.box])} />
                      <div>Unanswered</div>
                    </div>
                  </div>
                  <div className={styles.progress}>
                    <div className={styles.progressText}>Progress</div>
                    <div className={styles.progressStat}>{`${
                      Object.keys(contextAnswers).length
                    }/${pageable.totalElements}`}</div>
                    <div className={styles.progressText}>
                      Questions Answered
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {isSubmission ? null : (
            <CardButton
              propStyles={styles.button}
              disabled={Object.keys(contextAnswers).length === 0}
              color={'green'}
              onClick={handleSubmit}
            >
              Submit All
            </CardButton>
          )}
        </Card>
      )}
    </div>
  );
}

export default IndexController;
