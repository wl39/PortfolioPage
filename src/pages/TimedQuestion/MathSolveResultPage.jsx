import React, { useContext, useEffect, useState } from 'react';
import { PageableContext } from '../../layouts/Pageable/PageableContext';
import { useParams } from 'react-router-dom';
import { getSimpleMathCounts } from '../../services/api/SimpleMathQuestionService';
// import Bar from '../../components/Bar/Bar';

import styles from './MathSolveResultPage.module.css';
import PieChart from '../../components/PieChart/PieChart';

const MathSolveResultPage = () => {
  const { setPageable, setPageParams, pageParams } =
    useContext(PageableContext);
  const { studentName } = useParams();
  const [pieCharts, setPieCharts] = useState([]);
  const [totalPieChart, setTotalPieChart] = useState();
  const [totalCounts, setTotalCounts] = useState(0);

  const generatePieChart = (
    correctCounts,
    wrongCounts,
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
      <PieChart
        key={key}
        values={pieChartValues}
        size={size}
        fontSize={fontSize}
        gap={gap}
      />
    );
  };

  useEffect(() => {
    setPageParams({
      page: 0,
      size: 5,
      sortType: 'desc',
      sortParam: 'submitDate',
    });
  }, [setPageParams]);

  useEffect(() => {
    if (pageParams.sortParam === 'submitDate') {
      getSimpleMathCounts(studentName, pageParams)
        .then((response) => {
          setPageable({
            numberOfElements: response.numberOfElements,
            size: response.size,
            totalElements: response.totalElements,
            totalPages: response.totalPages,
            pageNumber: response.pageable.pageNumber,
          });

          let pieCharts = [];
          let localCounts = 0;

          let localTotalCounts = 0;
          let localCorrectTotalCounts = 0;
          let localWrongTotalCounts = 0;

          response.content.forEach((value, index) => {
            localCounts += value.correctCounts - value.wrongCounts;
            localCorrectTotalCounts += value.correctCounts;
            localWrongTotalCounts += value.wrongCounts;

            const pieChart = generatePieChart(
              value.correctCounts,
              value.wrongCounts,
              150,
              13,
              1,
              index + value.date
            );

            pieCharts = [...pieCharts, pieChart];
          });

          setTotalPieChart(
            generatePieChart(
              localCorrectTotalCounts,
              localWrongTotalCounts,
              400,
              20,
              4,
              'total'
            )
          );
          setTotalCounts(localCounts);
          setPieCharts(pieCharts);
        })
        .catch((err) => {
          console.error(err);

          window.alert('There is an issue...');
        });
    }
  }, [pageParams, setPageable, studentName]);

  return (
    <>
      <h1 className={styles.studentName}>{studentName}</h1>
      {totalPieChart}
      <div>{totalCounts}</div>
      <div className={styles.barContainer}>{pieCharts}</div>
    </>
  );
};

export default MathSolveResultPage;
