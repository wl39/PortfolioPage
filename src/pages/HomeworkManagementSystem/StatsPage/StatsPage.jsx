import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './StatsPage.module.css';
import { useEffect, useRef, useState } from 'react';
import {
  getAllSubmissionDayCountsByName,
  getLatestSubmissionDayCountsByName,
  getSutdentTopicStats,
} from '../../../services/api/HMSService';
import { generatePieChart } from '../../../utils/generatePieChart';

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

  useEffect(() => {
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
      {userData.length
        ? generatePieChart(
            userData[0].correctCounts,
            userData[0].wrongCounts,
            userData[0].date.replaceAll('-', '.'),
            300
          )
        : null}
    </>
  );
}

export default StatsPage;
