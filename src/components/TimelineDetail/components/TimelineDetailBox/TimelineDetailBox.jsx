import React from "react";
import styles from "./TimelineDetailBox.module.css";
import PropTypes from "prop-types";

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

TimelineDetailBox.propTypes = {
  period: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
};

export default TimelineDetailBox;
