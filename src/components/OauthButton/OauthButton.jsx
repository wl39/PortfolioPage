// import Button from '../Button/Button';
// import CardButton from '../CardButton/CardButton';

import styles from './OauthButton.module.css';

const OauthButton = ({ provider, svg, color, textColor, text }) => {
  const redirect = () => {
    window.location.href = process.env.REACT_APP_OAUTH_URL + provider;
  };
  return (
    <button
      className={styles.container}
      style={{ backgroundColor: color, color: textColor }}
      onClick={() => redirect()}
    >
      <div className={styles.icon}>{svg}</div>
      <div className={styles.text}>{text}</div>
    </button>
  );
};

export default OauthButton;
