import { classnames } from '../../utils/classnames';
import styles from './CardButton.module.css';
const CardButton = ({ children, color, disabled, onClick, propStyles }) => {
  const colorMap = {
    green: styles.green,
    blue: styles.blue,
    yellow: styles.yellow,
    red: styles.red,
    gray: styles.gray,
  };

  const propColor = colorMap[color] || styles.green;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classnames([styles.button, propColor, propStyles])}
    >
      {children}
    </button>
  );
};

export default CardButton;
