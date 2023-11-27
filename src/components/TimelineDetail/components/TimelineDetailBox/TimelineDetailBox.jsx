import React from "react";
import styles from "./TimelineDetailBox.module.css";
import PropTypes from "prop-types";

class TimelineDetailBox extends React.Component {
  constructor(props) {
    super(props);

    let contents = [];

    this.props.contents.forEach((value) => {
      contents.push(<li key={value}>{value}</li>);
    });

    let container = <ul>{contents}</ul>;

    this.state = {
      contents: container,
    };
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.period}>{this.props.period}</div>
          <div className={styles.title}>{this.props.title}</div>
        </div>

        <div className={styles.paragraph}>{this.state.contents}</div>
      </div>
    );
  }
}

TimelineDetailBox.propTypes = {
  period: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  contents: PropTypes.array.isRequired,
};

export default TimelineDetailBox;
