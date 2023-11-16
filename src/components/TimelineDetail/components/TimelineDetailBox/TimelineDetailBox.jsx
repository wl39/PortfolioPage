import React from "react";
import styles from "./TimelineDetailBox.module.css";

class TimelineDetailBox extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.period}>{this.props.period}</div>
          <div className={styles.title}>{this.props.title}</div>
        </div>

        <div className={styles.paragraph}>{this.props.paragraph}</div>
      </div>
    );
  }
}

export default TimelineDetailBox;
