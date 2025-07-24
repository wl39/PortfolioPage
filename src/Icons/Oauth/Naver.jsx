import React from 'react';

const NaverLoginButton = ({ width = 36, height = 36 }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      style={{ width: '100%', height: '100%' }}
    >
      <polygon
        fill="#1ec800"
        points="115.9,145.8 83.7,98.4 83.7,145.8 50,145.8 50,54.3 84.2,54.3 116.4,101.6 116.4,54.3 150,54.3 150,145.8 115.9,145.8"
      />
    </svg>
  );
};

export default NaverLoginButton;
