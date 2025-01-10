import React from "react";
import { Link } from "react-router-dom";
import styles from "./MathSolvePage.module.css";
const MathSolveMainPage = () => {
  return (
    <div>
      <Link to={"/math/start"}>
        <button className={styles.button}>Start</button>
      </Link>
    </div>
  );
};

export default MathSolveMainPage;
