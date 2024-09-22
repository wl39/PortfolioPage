import React, { useState, useEffect } from "react";

const TeacherPage = () => {
  const [studentComponents, setStudentComponents] = useState([]);

  useEffect(() => {
    let students = localStorage.getItem("students").split(",");
    let studentComponents = [];

    students.forEach((value) => {
      studentComponents.push(<div key={value}>{value}</div>);
    });

    setStudentComponents(studentComponents);
  }, []);

  return <div>{studentComponents}</div>;
};

export default TeacherPage;
