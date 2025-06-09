import { classnames } from '../../utils/classnames';
import styles from './Triangle.module.css';

function Triangle({ direction, propStyles, onClick }) {
  if (direction === 'up') {
    return (
      <div
        onClick={() => onClick()}
        className={classnames([propStyles, styles.up])}
      />
    );
  } else if (direction === 'down') {
    return (
      <div
        onClick={() => onClick()}
        className={classnames([propStyles, styles.down])}
      />
    );
  } else if (direction === 'left') {
    return (
      <div
        onClick={() => onClick()}
        className={classnames([propStyles, styles.left])}
      />
    );
  } else {
    return (
      <div
        onClick={() => onClick()}
        className={classnames([propStyles, styles.right])}
      />
    );
  }
}

export default Triangle;
