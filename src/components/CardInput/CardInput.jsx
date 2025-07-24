import { useEffect, useState } from 'react';
import { classnames } from '../../utils/classnames';

import { ReactComponent as Visibility } from '../../Icons/visibility.svg';
import { ReactComponent as VisibilityOff } from '../../Icons/visibility_off.svg';

import styles from './CardInput.module.css';

const CardInput = ({
  containerStyles,
  type = 'text',
  value,
  placeholder,
  onChange,
  onKeyDown,
  label,
}) => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <div className={classnames([containerStyles, styles.container])}>
      <label className={styles.label} htmlFor={label}>
        {label}
      </label>
      <input
        type={isPassword ? type : 'text'}
        id={label}
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onKeyDown={(e) => onKeyDown(e)}
        onChange={(e) => onChange(e)}
      />

      {type === 'password' ? (
        <>
          <div
            className={styles.visibilityButton}
            onClick={() => setIsPassword(!isPassword)}
          >
            {isPassword ? <Visibility /> : <VisibilityOff />}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CardInput;
