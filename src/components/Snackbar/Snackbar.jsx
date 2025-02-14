import React, { useEffect, useState } from "react";
import styles from "./Snackbar.module.css";

const Snackbar = ({ id, removeSnackbar, string }) => {
  const [timer, setTimer] = useState(4000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => Math.max(prev - 10, 0));
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      removeSnackbar(id); // 특정 ID만 삭제
    }
  }, [timer, id, removeSnackbar]);

  return <div className={styles.snackbar}>{string}</div>;
};

export default Snackbar;
