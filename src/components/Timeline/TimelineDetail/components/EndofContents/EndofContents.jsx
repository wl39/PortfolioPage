import React from "react";
import styles from "./EndofContents.module.css";

class EndofContents extends React.Component {
  render() {
    return (
      <div className={styles.timelineDetailEndContainer}>
        <div className={styles.timelineDetailEndBorderLeft}></div>
        <div className={styles.timelineDetailEnds}>end of contents</div>
        <div className={styles.timelineDetailEndBorderRight}></div>
      </div>
    );
  }
}

export default EndofContents;
