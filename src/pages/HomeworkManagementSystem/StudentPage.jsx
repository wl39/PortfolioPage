import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllSubscriptions,
  getLatestSubmissionDayCountsByName,
} from '../../services/api/HMSService';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { setUsername } from '../../features/user/userSlice';
import Accordion from '../../components/Accordion/Accordion';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import PieCahrtCard from '../../components/PieChartCard/PieChartCard';

import styles from './StudentPage.module.css';

const StudentPage = () => {
  // const [username, setUsername] = useState('');
  const username = useSelector((state) => state.user.username);

  const navigate = useNavigate();
  const location = useLocation();
  const { studentName } = useParams();

  const dispatch = useDispatch();

  const userRef = useRef();

  const [services, setServices] = useState([]);

  const redirectionMap = {
    'Simple Math Question': '/math/result/',
    Tutoring: '/tutoring/',
  };

  useEffect(() => {
    const savedUsername = sessionStorage.getItem('username');
    if (savedUsername) {
      userRef.current = savedUsername;
      dispatch(setUsername(savedUsername));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchAllSubscriptions = async () => {
      try {
        let localUsername =
          userRef.current || studentName || sessionStorage.getItem('username');

        const result = await getAllSubscriptions(localUsername);

        console.log(result);
        setServices(result);
      } catch (error) {
        if (error && error.response && error.response.status === 401) {
          navigate('/login', { state: { from: location }, replace: true });
        }
      }
    };

    fetchAllSubscriptions();
  }, [dispatch, location, navigate, studentName]); // username 변경되면 다시 호출

  const generatePieChart = (
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

  return (
    <>
      <h1>
        {studentName || sessionStorage.getItem('username') || 'Login First'}
      </h1>
      {services.map((value, index) => {
        switch (value) {
          case 'Tutoring':
            return (
              <Accordion
                key={value + '.' + index}
                title={value}
                rightHeader={
                  <>
                    <Link
                      to={'/tutoring/' + studentName}
                      style={{ marginRight: '8px' }}
                    >
                      <Button>Questions</Button>
                    </Link>

                    <Link
                      to={'/review/' + studentName}
                      style={{ marginRight: '8px' }}
                    >
                      <Button>Review</Button>
                    </Link>
                    <Link
                      to={'/submissions/' + studentName}
                      style={{ marginRight: '8px' }}
                    >
                      <Button>Submissions</Button>
                    </Link>
                  </>
                }
                onLoad={async () =>
                  getLatestSubmissionDayCountsByName(studentName)
                }
              >
                {(data) => (
                  <Card propStyles={styles.card}>
                    <div style={{ width: '300px' }}>
                      {generatePieChart(
                        data.correctCounts,
                        data.wrongCounts,
                        data.date.replaceAll('-', '.'),
                        300
                      )}
                    </div>
                  </Card>
                )}
              </Accordion>
            );
          case 'Simple Math Question':
            return <></>;
          default:
            return null;
        }
      })}
    </>
  );
};

export default StudentPage;
