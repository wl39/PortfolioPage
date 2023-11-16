import React from "react";
import styles from "./TimelineFurtherInformation.module.css";

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

export default TimelineFurtherInformation;
