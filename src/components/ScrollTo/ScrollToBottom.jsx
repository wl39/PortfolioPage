import React from "react";
import styles from "./ScrollTo.module.css";

const ScrollToBottom = () => {
  const handleClick = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // This will enable smooth scrolling
    });
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.downward} />
    </div>
  );
};

export default ScrollToBottom;
