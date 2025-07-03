import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getAllSubmissionDayCountsByName,
  getAllSubscriptions,
  getTotalAssignmentCountsByName,
  getTotalSubmissionCountsByName,
  getLatestSimpleMathSubmissionDayCountsByName,
  getLatestSubmissionDayCountsByName,
} from '../../services/api/HMSService';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Accordion from '../../components/Accordion/Accordion';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import PieCahrtCard from '../../components/PieChartCard/PieChartCard';

import styles from './StudentPage.module.css';
import Calendar from '../../components/Calendar/Calendar';
import { classnames } from '../../utils/classnames';
import UserPageCard from '../../components/UserPageCard/UserPageCard';

const StudentPage = () => {
  const windowWidth = useRef(0);
  const isMobile = windowWidth.current <= 480;

  const containerWidth = isMobile
    ? windowWidth.current - 40
    : (windowWidth.current - 200) / 2 + 40;

  const pieChartSize = isMobile
    ? (windowWidth.current - 60) / 2
    : (windowWidth.current - 200) / 4;

  const navigate = useNavigate();
  const location = useLocation();

  const { studentName } = useParams();

  const studentArray = useMemo(() => [studentName], [studentName]);

  const dispatch = useDispatch();

  const [services, setServices] = useState([]);

  const [userDate, setUserData] = useState({
    totalQuestions: 0,
    totalSubmissions: 0,
    toSolve: 0,
    averageScore: 0,
  });

  useEffect(() => {
    windowWidth.current = window.innerWidth;
  }, []);

  useEffect(() => {
    const fetchAllSubscriptions = async () => {
      try {
        const result = await Promise.all([
          getAllSubscriptions(studentName),
          getTotalAssignmentCountsByName(studentName),
          getTotalSubmissionCountsByName(studentName),
        ]);

        setServices(result[0]);

        setUserData((prevData) => ({
          ...prevData,
          totalQuestions: result[1] + result[2],
          totalSubmissions: result[2],
          toSolve: result[1],
        }));
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
      {/* <UserPageCard username={studentName} userData={userDate} /> */}
      <h1 className={styles.title}>{studentName || 'Login First'}</h1>
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
                      className={styles.link}
                    >
                      <Button>Questions</Button>
                    </Link>

                    <Link to={'/review/' + studentName} className={styles.link}>
                      <Button>Review</Button>
                    </Link>
                    <Link
                      to={'/submission/' + studentName}
                      className={styles.link}
                    >
                      <Button>Submissions</Button>
                    </Link>
                  </>
                }
                onLoad={async () =>
                  Promise.all([
                    getLatestSubmissionDayCountsByName(studentName),
                    getAllSubmissionDayCountsByName(studentName),
                  ])
                }
              >
                {(data) => (
                  <>
                    <Card
                      propStyles={classnames([
                        styles.card,
                        styles.tutoringContainer,
                      ])}
                    >
                      {console.log(containerWidth)}
                      <div
                        style={{
                          width: `${containerWidth}px`,
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        {generatePieChart(
                          data[0].correctCounts,
                          data[0].wrongCounts,
                          data[0].date.replaceAll('-', '.'),
                          pieChartSize
                        )}
                        {generatePieChart(
                          data[1].reduce(
                            (acc, value) => (acc += value.correctCounts),
                            0
                          ),
                          data[1].reduce(
                            (acc, value) => (acc += value.wrongCounts),
                            0
                          ),
                          `${data[1][0].date.replaceAll('-', '.')}
                           - 
                          ${data[1][data[1].length - 1].date.replaceAll(
                            '-',
                            '.'
                          )}`,
                          pieChartSize
                        )}
                      </div>

                      <Calendar
                        propStyles={styles.calendar}
                        students={studentArray}
                        isStudent={true}
                      />
                    </Card>
                  </>
                )}
              </Accordion>
            );
          case 'Simple Math Question':
            return (
              <Accordion
                key={value + '.' + index}
                title={value}
                rightHeader={
                  <>
                    <Link
                      to={'/math/start'}
                      state={{ name: studentName }}
                      style={{ marginRight: '8px' }}
                    >
                      <Button>Start</Button>
                    </Link>

                    <Link
                      to={'/math/result/' + studentName}
                      style={{ marginRight: '8px' }}
                    >
                      <Button>Result</Button>
                    </Link>
                  </>
                }
                onLoad={async () =>
                  getLatestSimpleMathSubmissionDayCountsByName(studentName)
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
          default:
            return null;
        }
      })}
    </>
  );
};

export default StudentPage;
