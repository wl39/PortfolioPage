import React from "react";
import styles from "./ScrollTo.module.css";
import ScrollToTop from "./ScrollToTop";
import ScrollToBottom from "./ScrollToBottom";

const ScrollTo = () => {
  return (
    <div className={styles.box}>
      <ScrollToTop />
      <ScrollToBottom />
    </div>
  );
};

export default ScrollTo;
