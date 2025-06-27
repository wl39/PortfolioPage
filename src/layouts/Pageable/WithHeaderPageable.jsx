import React, { useRef, useState } from 'react';
import { PageableContext } from './PageableContext';

import styles from './Pageable.module.css';
import Card from '../../components/Card/Card';
import PageParameterControllerWithHeader from '../../components/PageParameterController/PageParameterControllerWithHeader';
import IndexController from '../../components/IndexController/IndexController';
import { AnswerCheckerContext } from '../../context/AnswerCheckerContext';

function WithHeaderPageable({
  children,
  title,
  propStyles,
  isFixed = true,
  hasScroll = true,
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
            {children}
            <IndexController
              propStyles={styles.indexController}
              pageable={pageable}
              pageParams={pageParams}
              setPageParams={setPageParams}
            />
          </AnswerCheckerContext.Provider>
        </div>
      </div>
    </PageableContext.Provider>
  );
}

export default WithHeaderPageable;
