import React from "react";
// import { Button } from "@mui/material";

import styles from "./CutsomButton.module.css";

class CustomButton extends React.Component {
  // constructor() {}
  render() {
    return (
      <div className={this.props.underline ? styles.underline : styles.normal}>
        {this.props.text}
        {this.props.underline ? <div className={styles.underlineBar} /> : null}
        {this.props.logo ? (
          <img
            alt="lim"
            src={this.props.source}
            className={styles.logoButton}
          />
        ) : null}
      </div>
    );
  }
}

export default CustomButton;
