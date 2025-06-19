import React, { useState, useEffect, useCallback } from 'react';
import styles from './Calendar.module.css';

import { useNavigate } from 'react-router-dom';
import {
  getCalendarData,
  getStudentCalendarData,
} from '../../services/api/HMSService';
import Triangle from '../Triganle/Triangle';
import Card from '../Card/Card';
import { classnames } from '../../utils/classnames';

const Calendar = ({ propStyles, students, isStudent = false }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  const generateCalendarDays = useCallback(
    (year, month, data) => {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      let daysArray = [];

      for (let i = 0; i < firstDayOfMonth; i++) {
        daysArray.push(<div key={`blank-${i}`} />);
      }

      for (let i = 1; i <= daysInMonth; i++) {
        const dayContent = [];

        dayContent.push(
          <div key={`${i}-header`} className={styles.dayText}>
            {i}
          </div>
        );

        if (data[i]) {
          data[i].forEach((e, j) => {
            const name = Object.keys(e)[0];
            dayContent.push(
              <div
                key={`${i}-${j}`}
                className={
                  e[name]['unmarked'] && !isStudent
                    ? styles.toCheck
                    : styles.mark
                }
                onClick={() =>
                  e[name]['unmarked'] && !isStudent
                    ? navigate('/marking/' + name)
                    : null
                }
              >
                {isStudent ? (
                  <div style={{ height: '6px' }} />
                ) : (
                  <div>{name}</div>
                )}
                <div
                  className={
                    e[name]['solved'] / e[name]['questions'] >= 0.9
                      ? styles.green
                      : styles.red
                  }
                >
                  {e[name]['solved']}/{e[name]['questions']}
                  {e[name]['unmarked'] && !isStudent ? (
                    <div className={styles.unmarked}>
                      {e[name]['unmarked']}*
                    </div>
                  ) : null}
                </div>
              </div>
            );
          });
        }

        daysArray.push(
          <div key={`${i}-container`} className={styles.dayContentWrapper}>
            {dayContent}
          </div>
        );
      }

      return daysArray;
    },
    [navigate, isStudent]
  );

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (!students) return;

    const transformedData = {};

    const fetchCalendarData = async () => {
      try {
        const calendars = isStudent
          ? await getStudentCalendarData(year, month, students[0])
          : await getCalendarData(year, month, students);

        calendars.forEach((element) => {
          const date = element.day;
          const studentName = element.student.name;

          const studentEntry = {
            [studentName]: {
              solved: element.solved,
              unmarked: element.toMark,
              questions: element.unsolved + element.solved,
            },
          };

          if (!transformedData[date]) {
            transformedData[date] = [];
          }

          transformedData[date].push(studentEntry);
        });

        setCalendarDays(generateCalendarDays(year, month, transformedData));
      } catch (error) {
        console.error(error);
        window.alert('There is an issue...');
      }
    };

    fetchCalendarData();
  }, [currentDate, students, generateCalendarDays, isStudent]);

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const getMonthName = (monthIndex) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[monthIndex];
  };

  return (
    <Card propStyles={classnames([propStyles, styles.card])}>
      <div className={styles['calendar-header']}>
        <button className={styles.button} onClick={handlePreviousMonth}>
          <Triangle
            onClick={handlePreviousMonth}
            direction={'left'}
            propStyles={styles.left}
          />
        </button>
        <span className={styles.span}>
          {currentDate.getFullYear()} {getMonthName(currentDate.getMonth())}
        </span>
        <button className={styles.button} onClick={handleNextMonth}>
          <Triangle
            onClick={handleNextMonth}
            direction={'right'}
            propStyles={styles.right}
          />
        </button>
      </div>
      <div className={styles['calendar-grid']}>
        <div className={styles['day-name']}>Sun</div>
        <div className={styles['day-name']}>Mon</div>
        <div className={styles['day-name']}>Tue</div>
        <div className={styles['day-name']}>Wed</div>
        <div className={styles['day-name']}>Thu</div>
        <div className={styles['day-name']}>Fri</div>
        <div className={styles['day-name']}>Sat</div>

        {calendarDays.map((day, index) => (
          <div key={`day-${index}`} className={styles.day}>
            <div className={styles.dayContainer}>{day || ''}</div>
          </div>
        ))}
        {console.log('hi')}
      </div>
    </Card>
  );
};

export default Calendar;
