import React, { useState, useEffect, useCallback } from "react";
import styles from "./Calendar.module.css";

import { useNavigate } from "react-router-dom";
import { getCalendarData } from "../../services/api/HMSService";

const Calendar = ({ students }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  const generateCalendarDays = useCallback(
    (year, month, data) => {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      let daysArray = [];

      for (let i = 0; i < firstDayOfMonth; i++) {
        daysArray.push(null);
      }

      for (let i = 1; i <= daysInMonth; i++) {
        if (data[i]) {
          let div = [
            <div key={`${i}-header`} className={styles.dayText}>
              {i}
            </div>,
          ];
          data[i].forEach((e, j) => {
            let name = Object.keys(e)[0];
            div.push(
              <div
                key={`${i}-${j}`}
                className={
                  e[name]["unmarked"] > 0 ? styles.toCheck : styles.mark
                }
                onClick={() =>
                  e[name]["unmarked"] > 0 ? navigate("/marking/" + name) : null
                }
              >
                <div>{name}</div>
                <div
                  className={
                    e[name]["solved"] / e[name]["questions"] >= 0.9
                      ? styles.green
                      : styles.red
                  }
                >
                  {e[name]["solved"]}/{e[name]["questions"]}
                  {e[name]["unmarked"] > 0 ? (
                    <div className={styles.unmarked}>
                      {e[name]["unmarked"]}*
                    </div>
                  ) : null}
                </div>
              </div>
            );
          });
          daysArray.push(div);
        } else {
          daysArray.push(
            <div key={`${i}-empty`} className={styles.dayText}>
              {i}
            </div>
          );
        }
      }

      return daysArray;
    },
    [navigate]
  ); // No dependencies because it doesn't rely on external variables

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCalendarDays(generateCalendarDays(year, month, {}));

    if (students) {
      const transformedData = {};

      const fetchCalendarData = async (year, month, students) => {
        try {
          const calendars = await getCalendarData(year, month, students);

          calendars.forEach((element) => {
            const stringDate = `${element.year}-${element.month}-${element.day}`;
            const date = new Date(stringDate).getDate();
            const studentName = element.student.name;

            const studentEntry = {
              [studentName]: {
                solved: element.solved - element.toMark,
                unmarked: element.toMark, // Change this if you want to use a different value for "marked"
                questions: element.unsolved + element.solved,
              },
            };

            // Initialize the date entry if it doesn't exist
            if (!transformedData[date]) {
              transformedData[date] = [];
            }

            // Push the student entry into the corresponding date array
            transformedData[date].push(studentEntry);
          });

          setCalendarDays(generateCalendarDays(year, month, transformedData));
        } catch (error) {
          console.error(error);

          window.alert("There is an issue...");
        }
      };

      fetchCalendarData(year, month, students);
    }
  }, [currentDate, students, generateCalendarDays]);

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
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthIndex];
  };

  return (
    <div>
      <div className={styles["calendar-header"]}>
        <button className={styles.button} onClick={handlePreviousMonth}>
          {"⯇"}
        </button>
        <span className={styles.span}>
          {currentDate.getFullYear()} {getMonthName(currentDate.getMonth())}
        </span>
        <button className={styles.button} onClick={handleNextMonth}>
          {"⯈"}
        </button>
      </div>
      <div className={styles["calendar-grid"]}>
        <div className={styles["day-name"]}>Sun</div>
        <div className={styles["day-name"]}>Mon</div>
        <div className={styles["day-name"]}>Tue</div>
        <div className={styles["day-name"]}>Wed</div>
        <div className={styles["day-name"]}>Thu</div>
        <div className={styles["day-name"]}>Fri</div>
        <div className={styles["day-name"]}>Sat</div>

        {calendarDays.map((day, index) => (
          <div key={`day-${index}`} className={styles.day}>
            {" "}
            {/* Use a unique key for each day */}
            <div className={styles.dayContainer}>{day || ""}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
