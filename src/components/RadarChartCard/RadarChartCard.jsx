import Card from '../Card/Card';
import RadarChart from '../RadarChart/RadarChart';

function RadarChartCard({ values, title, colors, size, fontSize }) {
  return (
    <Card>
      <div>{title}</div>
      <RadarChart
        values={values}
        colors={colors}
        size={size}
        fontSize={fontSize}
      />
    </Card>
  );
}

export default RadarChartCard;
