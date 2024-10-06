import React, { useState, useEffect, useCallback } from "react";
import Calendar from "../components/Calendar/Calendar";

import styles from "./TeacherPage.module.css";
import { Link } from "react-router-dom";

const TeacherPage = () => {
  const [studentComponents, setStudentComponents] = useState([]);
  const [students, setStudents] = useState("");
  const [newStudent, setStudent] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false); // State to trigger re-running useEffect

  const removeStudent = useCallback(
    (studentToRemove) => {
      // Step 1: Get the existing students from local storage
      let storageStudents = localStorage.getItem("students");

      if (storageStudents) {
        // Step 2: Convert the string back into an array
        let studentsArray = storageStudents.split(",");

        // Step 3: Filter out the student to remove
        studentsArray = studentsArray.filter(
          (student) =>
            student.toLowerCase().trim() !==
            studentToRemove.toLowerCase().trim()
        );

        // Step 4: Update the local storage with the new array
        localStorage.setItem("students", studentsArray.join(","));
      }
      setUpdateFlag(!updateFlag); // Toggle updateFlag to trigger useEffect
    },
    [updateFlag]
  );

  const addNewStudents = () => {
    let storageStudents = localStorage.getItem("students");

    let pageStudents = [];

    pageStudents = newStudent
      .toLowerCase()
      .trimStart()
      .replace(/,\s+/g, ",")
      .split(",");

    if (storageStudents) {
      let array = storageStudents.split(",");
      pageStudents.forEach((element) => {
        if (!array.includes(element)) {
          array.push(element);
        }
      });

      pageStudents = array;
    }
    pageStudents = pageStudents.filter((value) => value);

    localStorage.setItem("students", pageStudents);
    setStudent("");
    setUpdateFlag(!updateFlag); // Toggle updateFlag to trigger useEffect
  };

  useEffect(() => {
    let storage = localStorage.getItem("students");
    let students = storage === null ? [] : storage.split(",");
    let studentComponents = [];

    students.forEach((value) => {
      studentComponents.push(
        <div className={styles.link} key={value}>
          <Link
            className={styles.studentLink}
            to={"/submission/" + value}
            key={value}
          >
            {value}
          </Link>
          <button onClick={() => removeStudent(value)}>REMOVE</button>
        </div>
      );
    });

    setStudents(storage);
    setStudentComponents(studentComponents);
  }, [updateFlag, removeStudent]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.studentContainer}>
          <div className={styles.linkContainer}>
            <Link className={styles.linkButton} to={"/questions"}>
              Archive
            </Link>
            <Link className={styles.linkButton} to={"/upload"}>
              Upload
            </Link>
          </div>
          <div className={styles.studentsTitle}>Students</div>
          <div className={styles.link}>
            <input
              value={newStudent}
              onChange={(e) => setStudent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // Check if Enter key is pressed
                  addNewStudents(); // Call the addNewStudents method
                }
              }}
              placeholder="Add a new student..."
            />
            <button className={styles.button} onClick={addNewStudents}>
              Add
            </button>
          </div>
          <div className={styles.studentsContainer}>{studentComponents}</div>
        </div>
        <div className={styles.calendarContainer}>
          <Calendar students={students} />
        </div>
      </div>
    </>
  );
};

export default TeacherPage;
