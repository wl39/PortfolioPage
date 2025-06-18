import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './StatsPage.module.css';
import { useEffect, useRef, useState } from 'react';
import {
  getAllSubmissionDayCountsByName,
  getLatestAssignmentDate,
  getLatestSubmissionDayCountsByName,
  getSutdentTopicStats,
} from '../../../services/api/HMSService';
import { generatePieChart } from '../../../utils/generatePieChart';
import RadarChartCard from '../../../components/RadarChartCard/RadarChartCard';
import Card from '../../../components/Card/Card';

function StatsPage() {
  const pageParams = {
    page: 0,
    size: 6,
    sortTypes: ['desc'],
    sortParams: ['totalCount'],
  };

  const windowWidth = useRef(0);
  const isMobile = windowWidth.current <= 480;

  const containerWidth = isMobile
    ? windowWidth.current - 40
    : (windowWidth.current - 200) / 2 + 40;

  const chartSize = isMobile
    ? (windowWidth.current - 60) / 2
    : (windowWidth.current - 200) / 4;

  const { studentName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState([]);

  const [totalWrongCounts, setTotalWrongCounts] = useState(0);
  const [totalCorrectCounts, setTotalCorrectCounts] = useState(0);
  const [totalCounts, setTotalCounts] = useState(0);

  const [dateFromTo, setDateFromTo] = useState('');

  useEffect(() => {
    windowWidth.current = window.innerWidth;

    const getUserData = async () => {
      try {
        const data = await Promise.all([
          getLatestSubmissionDayCountsByName(studentName),
          getAllSubmissionDayCountsByName(studentName),
          getSutdentTopicStats(pageParams, studentName),
          getLatestAssignmentDate(studentName),
        ]);

        setUserData(data);
        console.log(data);

        const totalWrong = data[1].reduce(
          (acc, value) => acc + value.wrongCounts,
          0
        );
        const totalCorrect = data[1].reduce(
          (acc, value) => acc + value.correctCounts,
          0
        );

        const date = `${data[1][0].date.replaceAll('-', '.')} - ${data[1][
          data[1].length - 1
        ].date.replaceAll('-', '.')}`;

        setTotalWrongCounts(totalWrong);
        setTotalCorrectCounts(totalCorrect);
        setTotalCounts(totalWrong + totalCorrect);
        setDateFromTo(date);
      } catch (error) {
        if (error && error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    getUserData();
  }, []);

  return (
    <div className={styles.container}>
      {userData.length ? (
        <Card>
          <pre>Student Name: {studentName}</pre>
          <pre>Latest Submissions: {userData[0].date.replaceAll('-', '.')}</pre>
          {userData[3] ? (
            <pre>Latest Assignments: {userData[3]}</pre>
          ) : (
            <pre>{studentName} solved all assigned questions.</pre>
          )}
        </Card>
      ) : null}
      <div>
        <Card>
          <div className={styles.pieChartContainer}>
            {userData.length
              ? generatePieChart(
                  userData[0].correctCounts,
                  userData[0].wrongCounts,
                  userData[0].date.replaceAll('-', '.'),
                  chartSize
                )
              : null}
            {userData.length
              ? generatePieChart(
                  totalCorrectCounts,
                  totalWrongCounts,
                  dateFromTo,
                  chartSize
                )
              : null}
          </div>
          <pre>
            {`${studentName} solved ${
              totalCorrectCounts + totalWrongCounts
            } questions.`}
          </pre>
          <pre>
            Latest Score: {userData[0].correctCounts} /{' '}
            {userData[0].wrongCounts + userData[0].correctCounts}
          </pre>
          <pre>
            Accumulated Score: {totalCorrectCounts} /{' '}
            {totalCorrectCounts + totalWrongCounts}
          </pre>
          <pre>
            Correct Rate:{' '}
            {(
              (totalCorrectCounts / (totalCorrectCounts + totalWrongCounts)) *
              100
            ).toFixed(2)}
            %
          </pre>
        </Card>
        {userData.length ? (
          <RadarChartCard
            size={windowWidth.current}
            values={[
              {
                name: studentName,
                data: userData[2].content.reduce((acc, value) => {
                  acc.push({
                    label: value.topic,
                    value: value.correctCount / value.totalCount,
                  });

                  return acc;
                }, []),
              },
            ]}
            fontSize={10}
          />
        ) : null}
      </div>
      {/* <footer>hi</footer> */}
    </div>
  );
}

export default StatsPage;
