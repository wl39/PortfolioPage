import { useEffect } from 'react';
import PieChart from '../PieChart/PieChart';

import styles from './PieChartCard.module.css';

function PieCahrtCard({ values, date, size, fontSize, gap }) {
  const clampedSize = Math.max(size, 40);
  const isCorrect = values[0].type === 'wrong';
  return (
    <div className={styles.container}>
      <div
        className={styles.title}
        style={{ fontSize: `${clampedSize / 20}px` }}
      >
        {date}
      </div>
      <div
        className={isCorrect ? styles.correct : styles.wrong}
        style={{
          fontSize: `${(clampedSize / 30) * 4}px`,
          marginBottom: `${clampedSize / 10}px`,
          fontWeight: 'bold',
        }}
      >
        {(isCorrect ? '+' : '-') + (values[1].value - values[0].value)}
      </div>
      <PieChart
        values={values}
        size={(clampedSize / 5) * 4}
        fontSize={fontSize}
        gap={gap}
        propStyles={styles.canvas}
      />
      <div
        className={styles.answerCountContainer}
        style={{
          fontSize: `${clampedSize / 20}px`,
          height: `${clampedSize / 20}px`,
          lineHeight: `${clampedSize / 20}px`,
          marginTop: `${clampedSize / 10}px`,
        }}
      >
        <div className={styles.answerCountHeader}>
          <div
            className={styles.circle}
            style={{ backgroundColor: isCorrect ? '#8BB479' : '#F6B89C' }}
          />
          <div>{`${isCorrect ? 'C' : 'Inc'}orrect Answer`}</div>
        </div>
        <div>{values[1].value}</div>
      </div>
      <div
        className={styles.answerCountContainer}
        style={{
          fontSize: `${clampedSize / 20}px`,
          height: `${clampedSize / 20}px`,
          lineHeight: `${clampedSize / 20}px`,
          marginBottom: `${clampedSize / 20}px`,
          marginTop: `${clampedSize / 40}px`,
        }}
      >
        <div className={styles.answerCountHeader}>
          <div
            className={styles.circle}
            style={{ backgroundColor: '#888888' }}
          />
          <div>{`${isCorrect ? 'Inc' : 'C'}orrect Answer`}</div>
        </div>
        <div>{values[0].value}</div>
      </div>
    </div>
  );
}

export default PieCahrtCard;
