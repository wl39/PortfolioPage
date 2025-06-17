import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './StatsPage.module.css';
import { useEffect, useRef, useState } from 'react';
import {
  getAllSubmissionDayCountsByName,
  getLatestSubmissionDayCountsByName,
  getSutdentTopicStats,
} from '../../../services/api/HMSService';
import { generatePieChart } from '../../../utils/generatePieChart';
import RadarChart from '../../../components/RadarChart/RadarChart';
import RadarChartCard from '../../../components/RadarChartCard/RadarChartCard';

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
    ? ((windowWidth.current - 60) / 5) * 2
    : (windowWidth.current - 200) / 4;

  const { studentName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    windowWidth.current = window.innerWidth;

    const getUserData = async () => {
      try {
        const data = await Promise.all([
          getLatestSubmissionDayCountsByName(studentName),
          getAllSubmissionDayCountsByName(studentName),
          getSutdentTopicStats(pageParams, studentName),
        ]);

        setUserData(data);
      } catch (error) {
        if (error && error.response && error.response.status === 401) {
          navigate('/login', { state: { from: location }, replace: true });
        }
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <h1 className={styles.title}>{studentName}</h1>
      <div>
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
              userData[1].reduce((acc, value) => {
                return (acc += value.correctCounts);
              }, 0),
              userData[1].reduce((acc, value) => {
                return (acc += value.wrongCounts);
              }, 0),
              `${userData[1][0].date.replaceAll('-', '.')} - ${userData[1][
                userData[1].length - 1
              ].date.replaceAll('-', '.')}`,
              chartSize
            )
          : null}
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
    </>
  );
}

export default StatsPage;
