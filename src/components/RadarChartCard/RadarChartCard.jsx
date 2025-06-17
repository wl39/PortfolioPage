import Card from '../Card/Card';
import RadarChart from '../RadarChart/RadarChart';

import styles from './RadarChartCard.module.css';

function RadarChartCard({ values, title, colors, size, fontSize }) {
  return (
    <Card fit={true} propStyles={styles.container}>
      <div>{title}</div>
      <RadarChart
        values={values}
        colors={colors}
        size={(size / 5) * 4}
        fontSize={fontSize}
      />
    </Card>
  );
}

export default RadarChartCard;
