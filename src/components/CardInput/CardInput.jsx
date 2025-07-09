import { classnames } from '../../utils/classnames';
import styles from './CardInput.module.css';

const CardInput = ({
  containerStyles,
  value,
  placeholder,
  onChange,
  label,
}) => {
  return (
    <div className={classnames([containerStyles, styles.container])}>
      <label className={styles.label} htmlFor={label}>
        {label}
      </label>
      <input
        id={label}
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default CardInput;
