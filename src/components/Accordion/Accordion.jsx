import { useState } from 'react';

import Triangle from '../Triganle/Triangle';
import styles from './Accordion.module.css';
import { classnames } from '../../utils/classnames';

function Accordion({
  title,
  rightHeader,
  children,
  onLoad,
  trianglePropStyles,
}) {
  const [hide, setHide] = useState(true);
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const handleToggle = async () => {
    if (hide && onLoad && !loaded) {
      try {
        const result = await onLoad();
        setData(result);
        setLoaded(true);
      } catch (err) {
        console.error('Accordion onLoad error:', err);
      }
    }

    setHide((prev) => !prev);
  };

  const shouldRenderChildren = !hide && (!onLoad || loaded);

  return (
    <>
      <div
        onClick={handleToggle}
        style={{ borderBottom: hide ? '2px solid black' : '' }}
        className={styles.container}
      >
        <h2 style={{ fontSize: '32px' }} onClick={handleToggle}>
          {title}
        </h2>
        <div className={styles.rightHeaderContainer}>
          {rightHeader}
          <Triangle
            propStyles={classnames([styles.triangle, trianglePropStyles])}
            direction={hide ? 'down' : 'up'}
            onClick={handleToggle}
          />
        </div>
      </div>

      {shouldRenderChildren &&
        (onLoad && typeof children === 'function' ? children(data) : children)}
    </>
  );
}

export default Accordion;
