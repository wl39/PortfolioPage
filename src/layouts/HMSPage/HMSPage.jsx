import React from 'react';
import Header from '../../components/Header/Header';

const HMSPage = ({ children }) => {
  return (
    <>
      <Header />
      <div
      //  style={{ paddingTop: '60px' }}
      >
        {children}
      </div>
    </>
  );
};

export default HMSPage;
