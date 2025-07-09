import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { UsernameContext } from '../../context/UsernameContext';
const HMSPage = ({ children }) => {
  const [username, setUsername] = useState('');
  return (
    <>
      <UsernameContext.Provider value={{ username, setUsername }}>
        <Header />
        <div style={{ paddingTop: '68px' }}>{children}</div>
      </UsernameContext.Provider>
    </>
  );
};

export default HMSPage;
