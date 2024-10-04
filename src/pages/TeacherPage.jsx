import React, { useState, useEffect } from "react";
import Calendar from "../components/Calendar/Calendar";

import styles from "./TeacherPage.module.css";
import { Link } from "react-router-dom";

const TeacherPage = () => {
  const [studentComponents, setStudentComponents] = useState([]);

  useEffect(() => {
    let storage = localStorage.getItem("students");
    let students = storage === null ? [] : storage.split(",");
    let studentComponents = [];

    students.forEach((value) => {
      studentComponents.push(
        <Link
          className={styles.studentLink}
          to={"/submission/" + value}
          key={value}
        >
          {value}
        </Link>
      );
    });

    setStudentComponents(studentComponents);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.studentContainer}>
          <div>
            <Link>Archive</Link>
            <Link to={"/upload"}>Upload</Link>
          </div>
          <div className={styles.studentsTitle}>Students</div>
          <div className={styles.studentsContainer}>{studentComponents}</div>
        </div>
        <div className={styles.calendarContainer}>
          <Calendar />
        </div>
      </div>
    </>
  );
};

export default TeacherPage;
