import React from "react";
import styles from "./TimelineFurtherInformation.module.css";
import PropTypes from "prop-types";

class TimelineFurtherInformation extends React.Component {
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
      <div>
        <div className={styles.title}>{this.props.title}</div>
        {this.state.contents}
      </div>
    );
  }
}

TimelineFurtherInformation.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.array.isRequired,
};

export default TimelineFurtherInformation;
