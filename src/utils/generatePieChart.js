import PieCahrtCard from '../components/PieChartCard/PieChartCard';

export const generatePieChart = (
  correctCounts,
  wrongCounts,
  date,
  size,
  fontSize,
  gap,
  key
) => {
  const total = correctCounts + wrongCounts;
  const correctPercent = (correctCounts / total) * 100;
  const wrongPercent = (wrongCounts / total) * 100;

  const getColor = (type, isStrong) => {
    if (type === 'correct') {
      return isStrong ? 'rgba(0, 128, 0, 0.58)' : 'rgba(128, 128, 128, 0.58)';
    } else {
      return isStrong ? 'rgba(255, 0, 0, 0.58)' : 'rgba(128, 128, 128, 0.58)';
    }
  };

  const segments = [
    {
      type: 'wrong',
      percent: wrongPercent,
      value: wrongCounts,
    },
    {
      type: 'correct',
      percent: correctPercent,
      value: correctCounts,
    },
  ].sort((a, b) => a.percent - b.percent); // 작은 값이 먼저

  const pieChartValues = segments.map((segment, i) => ({
    ...segment,
    colour: getColor(segment.type, i === 1),
  }));

  return (
    <PieCahrtCard
      key={key}
      values={pieChartValues}
      date={date}
      size={size}
      fontSize={fontSize}
      gap={gap}
    />
  );
};
