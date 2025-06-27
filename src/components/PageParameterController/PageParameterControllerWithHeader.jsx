import React from 'react';
import PageParameterController from './PageParameterController';

const PageParameterControllerWithHeader = ({
  pageParams,
  setPageParams,
  header,
}) => {
  return (
    <>
      <div style={{ marginRight: '5px' }}>{header}</div>
      <PageParameterController
        pageParams={pageParams}
        setPageParams={setPageParams}
      />
    </>
  );
};

export default PageParameterControllerWithHeader;
