import React, { useRef, useState } from 'react';
import { PageableContext } from './PageableContext';

import styles from './Pageable.module.css';
import Card from '../../components/Card/Card';
import PageParameterControllerWithHeader from '../../components/PageParameterController/PageParameterControllerWithHeader';
import IndexController from '../../components/IndexController/IndexController';
import { AnswerCheckerContext } from '../../context/AnswerCheckerContext';
import CardButton from '../../components/CardButton/CardButton';

function WithHeaderPageable({
  children,
  title,
  isSubmission = false,
  sortTypes,
  sortParams,
}) {
  const [pageable, setPageable] = useState({
    numberOfElements: 5,
    size: 5,
    totalElements: 5,
    totalPages: 1,
    pageNumber: 0,
  });
  const [pageParams, setPageParams] = useState({
    page: 0,
    size: 5,
    sortTypes: [...sortTypes, 'asc'],
    sortParams: [...sortParams, 'id'],
  });

  const [contextAnswers, setContextAnswers] = useState({});
  const [indexAnswers, setIndexAnswers] = useState([]);
  const [noQuestion, setNoQuestion] = useState(true);

  return (
    <PageableContext.Provider
      value={{
        pageable,
        setPageable,
        pageParams,
        setPageParams,
      }}
    >
      <div className={styles.headerContainer}>
        <AnswerCheckerContext.Provider
          value={{
            contextAnswers,
            setContextAnswers,
            indexAnswers,
            setIndexAnswers,
            noQuestion,
            setNoQuestion,
          }}
        >
          <Card propStyles={styles.card}>
            <div className={styles.title}>{title}</div>
            <div className={styles.perPageContainer}>
              <PageParameterControllerWithHeader
                pageParams={pageParams}
                setPageParams={setPageParams}
                header={'Questions per page:'}
              />
            </div>
          </Card>
          {/* <br /> */}
          {/* <PageHandler pageable={pageable} changePage={changePage} /> */}
          <div className={styles.contentContainer}>
            {children}
            <IndexController
              propStyles={styles.indexController}
              pageable={pageable}
              pageParams={pageParams}
              setPageParams={setPageParams}
              isSubmission={isSubmission}
            />
          </div>
          <Card propStyles={styles.footer}>
            <CardButton
              disabled={!pageable.pageNumber}
              color={'gray'}
              onClick={() => {
                if (pageable.pageNumber >= 0) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });

                  setPageParams((prev) => ({
                    ...prev,
                    page: prev.page - 1,
                  }));
                }
              }}
            >
              Previous
            </CardButton>
            <div>{`Page ${pageable.pageNumber + 1} of ${
              pageable.totalPages
            }`}</div>
            <CardButton
              disabled={pageable.pageNumber + 1 >= pageable.totalPages}
              color={'green'}
              onClick={() => {
                if (pageable.pageNumber < pageable.totalPages) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });

                  setPageParams((prev) => ({
                    ...prev,
                    page: prev.page + 1,
                  }));
                }
              }}
            >
              Next
            </CardButton>
          </Card>
        </AnswerCheckerContext.Provider>
      </div>
    </PageableContext.Provider>
  );
}

export default WithHeaderPageable;
