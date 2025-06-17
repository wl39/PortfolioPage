import React from 'react';
import { classnames } from '../../utils/classnames';
import styles from './Card.module.css';

const Card = ({ children, propStyles, fit = false }) => {
  return (
    <>
      <div
        className={`${styles.container} ${classnames([
          propStyles,
          fit ? styles.fit : null,
        ])}`}
      >
        {children}
      </div>
    </>
  );
};

export default React.memo(Card);
