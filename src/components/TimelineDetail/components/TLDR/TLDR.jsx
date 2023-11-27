import React, { Component } from "react";
import styles from "./TLDR.module.css";
class TLDR extends Component {
  constructor(props) {
    super(props);

    let contents = [];

    this.props.contents.forEach((value) => {
      let title = value.split(":")[0];
      let content = value.split(":")[1];
      contents.push(
        <li key={value}>
          <b>{title}:</b>
          <br />
          {content}
        </li>
      );
    });

    let container = <ol>{contents}</ol>;

    this.state = {
      contents: container,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.contents !== this.props.contents) {
      let contents = [];

      this.props.contents.forEach((value) => {
        let title = value.split(":")[0];
        let content = value.split(":")[1];
        contents.push(
          <li key={value}>
            <b>{title}:</b>
            <br />
            {content}
          </li>
        );
      });

      let container = <ol>{contents}</ol>;

      this.setState({
        contents: container,
      });
    }
  }

  render() {
    return (
      <div>
        <div className={styles.title}>TL;DR</div>
        <div className={styles.paragraph}>{this.state.contents}</div>
      </div>
    );
  }
}

export default TLDR;
