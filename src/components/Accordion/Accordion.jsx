import { useState } from 'react';
import Triangle from '../Triganle/Triangle';
import styles from './Accordion.module.css';
import { classnames } from '../../utils/classnames';

export default function Accordion({
  title,
  rightHeader,
  children,
  onLoad,
  trianglePropStyles,
  isHidden = false,
}) {
  const [hide, setHide] = useState(true);
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reload = async () => {
    if (!onLoad) return;
    setIsLoading(true);
    try {
      const result = await onLoad();
      setData(result);
      setLoaded(true);
    } catch (err) {
      console.error('Accordion reload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async () => {
    setHide((prev) => !prev);
    if (hide && onLoad && !loaded) {
      await reload();
    }
  };

  const shouldRenderChildren = !hide && (!onLoad || loaded);

  return (
    <>
      <div
        onClick={handleToggle}
        style={{ borderBottom: hide ? '2px solid black' : '' }}
        className={styles.container}
      >
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.rightHeaderContainer}>
          {rightHeader}
          <Triangle
            propStyles={classnames([styles.triangle, trianglePropStyles])}
            direction={hide ? 'down' : 'up'}
            onClick={handleToggle}
          />
        </div>
      </div>

      <div
        style={{
          display: isHidden && hide ? 'none' : 'block',
        }}
      >
        {shouldRenderChildren
          ? typeof children === 'function'
            ? children(data, reload, setData)
            : children
          : null}
      </div>

      {isLoading && !hide && <div>is loading</div>}
    </>
  );
}
