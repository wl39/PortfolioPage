import React from "react";
import styles from "./TimelineDetail.module.css";
import TimelineFurtherInformation from "./components/TimelineFurherInformation/TimelineFurtherInformation";
import TimelineDetailBox from "./components/TimelineDetailBox/TimelineDetailBox";
import EndofContents from "./components/EndofContents/EndofContents";
import PropTypes from "prop-types";
import TLDR from "./components/TLDR/TLDR";

class TimelineDetail extends React.Component {
  constructor(props) {
    super(props);

    let details = [];
    let furtherInformation = [];

    if (this.props.tldr.length > 0)
      details.push(<TLDR key={this.props.tldr} contents={this.props.tldr} />);

    this.props.details.forEach((value) => {
      details.push(
        <TimelineDetailBox
          key={"tdb." + value.title}
          title={value.title}
          period={value.period}
          contents={value.contents}
        />
      );
    });

    if (this.props.furtherInformation.length > 0)
      this.props.furtherInformation.forEach((value) => {
        furtherInformation.push(
          <TimelineFurtherInformation
            key={"tfi." + value.title}
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

  componentDidUpdate(prevProps) {
    if (prevProps.details !== this.props.details) {
      let details = [];
      let furtherInformation = [];

      if (this.props.tldr.length > 0)
        details.push(<TLDR key={this.props.tldr} contents={this.props.tldr} />);

      this.props.details.forEach((value) => {
        details.push(
          <TimelineDetailBox
            key={value.title}
            title={value.title}
            period={value.period}
            contents={value.contents}
          />
        );
      });

      if (this.props.furtherInformation.length > 0)
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

      this.setState({
        contents: contents,
      });
    }
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
