import React from 'react';
import Dropdown from '../Dropdown/Dropdown';

const PageParameterController = ({ pageParams, setPageParams }) => {
  const changeSize = (value) => {
    let newPageParams = { ...pageParams, size: value, page: 0 };

    setPageParams(newPageParams);
  };

  return (
    <>
      <Dropdown
        list={[1, 2, 5, 10, 25, 50, 100]}
        select={changeSize}
        value={pageParams.size}
      />
    </>
  );
};

export default PageParameterController;
