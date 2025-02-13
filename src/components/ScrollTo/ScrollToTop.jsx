import React from "react";
import styles from "./ScrollTo.module.css";

const ScrollToTop = () => {
  const handleClick = () => {
    window.scrollTo({
      top: document.body,
      behavior: "smooth", // This will enable smooth scrolling
    });
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.upward} />
    </div>
  );
};

export default ScrollToTop;
