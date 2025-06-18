import { classnames } from '../../utils/classnames';
import styles from './Button.module.css';

const Button = ({ propStyles, value, onclick, disabled, children }) => {
  return (
    <>
      <button
        value={value}
        className={`${styles.button} ${classnames(propStyles)}`}
        onClick={onclick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
