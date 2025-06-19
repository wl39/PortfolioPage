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
import { monthDayYear } from '../../../utils/dateFormat';
import RadarChart from '../../../components/RadarChart/RadarChart';
import { capitalizeFirstLetter } from '../../../utils/textHelper';
import Calendar from '../../../components/Calendar/Calendar';

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

  return userData.length ? (
    <div className={styles.container}>
      <Card propStyles={styles.card}>
        <p>Learner: {capitalizeFirstLetter(studentName)}</p>
        <p>Most Recent Submission: {monthDayYear(userData[0].date)}</p>
        {userData[3] ? (
          <p>Last Assignment Assigned: {monthDayYear(userData[3])}</p>
        ) : (
          <p>All assigned tasks have been completed.</p>
        )}
      </Card>

      <div className={styles.cardContainer}>
        <Card propStyles={styles.card}>
          <h2 className={styles.subTitle}>Performance Overview</h2>
          <div className={styles.pieChartContainer}>
            {generatePieChart(
              userData[0].correctCounts,
              userData[0].wrongCounts,
              userData[0].date.replaceAll('-', '.'),
              chartSize
            )}

            {generatePieChart(
              totalCorrectCounts,
              totalWrongCounts,
              dateFromTo,
              chartSize
            )}
          </div>

          <p>
            {`${capitalizeFirstLetter(studentName)} solved ${
              totalCorrectCounts + totalWrongCounts
            } questions.`}
          </p>
          <p>
            Recent Score: {userData[0].correctCounts} correct /{' '}
            {userData[0].wrongCounts + userData[0].correctCounts} attempts
          </p>
          <p>
            Cumulative Score: {totalCorrectCounts} correct /{' '}
            {totalCorrectCounts + totalWrongCounts} attempts
          </p>
          <p>
            Overall Accuracy:{' '}
            {(
              (totalCorrectCounts / (totalCorrectCounts + totalWrongCounts)) *
              100
            ).toFixed(2)}
            %
          </p>
        </Card>
        <Card propStyles={styles.card}>
          <h2 className={styles.subTitle}>Topic Mastery</h2>
          <p>
            Only the top six subjects with the highest accuracy are displayed.
            You can click on each topic to view the exact percentage reflecting
            the learner’s level of understanding.
          </p>
          <RadarChart
            size={windowWidth.current - 30}
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

          <p>
            Each axis reflects the student's accuracy per subject area. Higher
            values indicate stronger understanding.
          </p>
        </Card>
      </div>
      <Card propStyles={styles.card}>
        <h2 className={styles.subTitle}>Assignment Calendar</h2>
        <p>
          This calendar provides an overview of scheduled assignments and the
          number of questions to be completed on each day. It helps learners
          track their daily workload and manage time effectively.
        </p>
        <Calendar
          propStyles={styles.calendar}
          students={[studentName]}
          isStudent={true}
        />
      </Card>
      {/* <footer>hi</footer> */}
    </div>
  ) : null;
}

export default StatsPage;
