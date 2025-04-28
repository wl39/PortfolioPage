import React from 'react';
import { classnames } from '../../utils/classnames';

const Input = ({ placeholder, type = "text", value, onChange, propStyles }) => {
    return (
        <input
            className={classnames(propStyles)}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
        />
    );
};

export default React.memo(Input);
