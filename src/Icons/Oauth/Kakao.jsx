import React from 'react';

const KakaoLoginButton = ({ width = 36, height = 36 }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      width={width}
      height={height}
      //   onClick={onClick}
      style={{ cursor: 'pointer', display: 'block' }}
    >
      {/* 중심 기준으로 배치 조정 */}
      <ellipse fill="#3c1e1e" cx="100" cy="90" rx="100" ry="80" />
      <polygon fill="#3c1e1e" points="45,145 40,190 90,155" />
    </svg>
  );
};

export default KakaoLoginButton;
