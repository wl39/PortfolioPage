import React, { useState } from 'react';
import PageHandler from '../../components/PageHandler/PageHandler';
import ScrollTo from '../../components/ScrollTo/ScrollTo';
import PageParameterController from '../../components/PageParameterController/PageParameterController';
import { PageableContext } from './PageableContext';

import styles from './Pageable.module.css';
import { classnames } from '../../utils/classnames';

function Pageable({
  children,
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

  const changePage = (page) => {
    setPageParams((prev) => ({ ...prev, page: page }));
  };

  return (
    <PageableContext.Provider
      value={{ pageable, setPageable, pageParams, setPageParams }}
    >
      <div className={classnames([styles.main, propStyles])}>
        <div
          className={
            isFixed ? styles.fixedParamContainer : styles.paramContainer
          }
        >
          <PageParameterController
            pageParams={pageParams}
            setPageParams={setPageParams}
          />
        </div>
        {children}
        <br />
        <PageHandler pageable={pageable} changePage={changePage} />

        {hasScroll ? <ScrollTo /> : null}
      </div>
    </PageableContext.Provider>
  );
}

export default Pageable;
