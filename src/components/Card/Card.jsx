import React from 'react';
import { classnames } from '../../utils/classnames';
import styles from './Card.module.css';

const Card = ({ children, propStyles }) => {
    return <>
        <div className={`${styles.container} ${classnames(propStyles)}`}>
            {children}
        </div>
    </>
}

export default React.memo(Card);