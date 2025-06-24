import React, { useEffect, useState } from 'react';
import styles from './Dropdown.module.css';
import { classnames } from '../../utils/classnames';

const Dropdown = ({ list, select, value, propStyles, buttonPropStyles }) => {
  const [open, setOpen] = useState(false);

  const selectValue = (value) => {
    setOpen(false);
    select(value);
  };

  return (
    <div className={classnames([propStyles, styles.dropdownContainer])}>
      <button
        className={classnames([buttonPropStyles, styles.dropdownButton])}
        onClick={() =>
          setOpen((prev) => {
            return !prev;
          })
        }
      >
        {value}
      </button>
      <div
        onClick={() =>
          setOpen((prev) => {
            return !prev;
          })
        }
      >
        {open ? (
          <div className={styles.upward} />
        ) : (
          <div className={styles.downward} />
        )}
      </div>
      {list && open ? (
        <div className={styles.dropdown}>
          {list.map((value) => (
            <button key={value} onClick={() => selectValue(value)}>
              {value}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
