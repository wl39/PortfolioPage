import React, { useState, useEffect } from "react";
import styles from "./Calendar.module.css";
// Utility to generate the days for a month
const generateCalendarDays = (year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in the month
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Get the first day of the month (0 = Sunday, 6 = Saturday)

  let daysArray = [];

  // Fill in the empty days before the 1st of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    daysArray.push(null);
  }

  // Add the days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  return daysArray;
};

const Calendar = ({ data }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCalendarDays(generateCalendarDays(year, month));
  }, [currentDate]);

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
        <button onClick={handlePreviousMonth}>{"<"}</button>
        <span>
          {getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
        </span>
        <button onClick={handleNextMonth}>{">"}</button>
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
          <div key={index} className={styles.day}>
            <div>{day || ""}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
