import React from "react";
import styles from "./TimelineDetail.module.css";
import TimelineFurtherInformation from "./components/TimelineFurherInformation/TimelineFurtherInformation";
import TimelineDetailBox from "./components/TimelineDetailBox/TimelineDetailBox";
import EndofContents from "./components/EndofContents/EndofContents";
import PropTypes from "prop-types";

class TimelineDetail extends React.Component {
  constructor(props) {
    super(props);

    let details = [];
    let furtherInformation = [];

    this.props.details.forEach((value) => {
      details.push(
        <TimelineDetailBox
          key={value.title}
          title={value.title}
          period={value.period}
          paragraph={value.paragraph}
        />
      );
    });

    this.props.furtherInformation.forEach((value) => {
      furtherInformation.push(
        <TimelineFurtherInformation
          key={value.title}
          title={value.title}
          contents={value.contents}
        />
      );
    });

    let contents = (
      <div className={styles.TimelineDetailBox}>
        {details}
        {furtherInformation}
        <EndofContents />
      </div>
    );

    this.state = {
      contents: contents,
    };
  }
  render() {
    return <div>{this.state.contents}</div>;
  }
}

TimelineDetail.propTypes = {
  details: PropTypes.array.isRequired,
  furtherInformation: PropTypes.array.isRequired,
};

export default TimelineDetail;
