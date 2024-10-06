import React, { useState, useEffect } from "react";
import styles from "./Calendar.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Calendar = ({ students }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  // Utility to generate the days for a month
  const generateCalendarDays = (year, month, data) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in the month
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Get the first day of the month (0 = Sunday, 6 = Saturday)

    let daysArray = [];

    // Fill in the empty days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null);
    }

    // Add the days of the current month
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
              className={e[name]["unmarked"] > 0 ? styles.toCheck : styles.mark}
              onClick={() =>
                e[name]["unmarked"] > 0 ? navigate("/marking/" + name) : null
              }
            >
              {" "}
              {/* Use i and j to create a unique key */}
              <div>{name}</div>{" "}
              <div
                className={
                  e[name]["solved"] / e[name]["questions"] >= 0.9
                    ? styles.green
                    : styles.red
                }
              >
                {e[name]["solved"]}/{e[name]["questions"]}
                {e[name]["unmarked"] > 0 ? (
                  <div className={styles.unmarked}>{e[name]["unmarked"]}*</div>
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
        ); // Added a unique key for empty days as well
      }
    }

    return daysArray;
  };

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCalendarDays(generateCalendarDays(year, month, {}));

    let localUrl =
      "http://localhost:8080/api/v1/calendar/" +
      year +
      "/" +
      (month + 1) +
      "?students=" +
      students;

    if (students) {
      const transformedData = {};

      axios.get(localUrl).then((res) => {
        res.data.forEach((element) => {
          const date = new Date(element.calendarID.date).getDate();
          const studentName = element.calendarID.studentName;

          const studentEntry = {
            [studentName]: {
              solved: element.solved,
              unmarked: element.unmarked, // Change this if you want to use a different value for "marked"
              questions: element.questions,
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
      });
    }
  }, [currentDate, students]);

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
