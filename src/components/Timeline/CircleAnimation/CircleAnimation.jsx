import React from "react";
import styles from "./CircleAnimation.module.css";
import PropTypes from "prop-types";

class CircleAnimation extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div
          className={styles.blinking}
          style={{
            display: this.props.end
              ? this.props.clicked
                ? "none"
                : ""
              : "none",
          }}
        />
        <div className={styles.timelineInnerCircleWrapperRight}>
          <div
            style={{
              animationDelay: this.props.end ? "0s" : this.props.delay,
              animationDuration: this.props.end ? "0s" : "",
            }}
            className={
              this.props.active
                ? styles.circleWholeRight
                : this.props.end
                ? styles.circleWholeRight
                : styles.circleWholeNoneRight
            }
          ></div>
        </div>
        <div className={styles.timelineInnerCircleWrapperLeft}>
          <div
            style={{
              animationDelay: this.props.end ? "0s" : this.props.delay,
              animationDuration: this.props.end ? "0s" : "",
            }}
            className={
              this.props.active
                ? styles.circleWholeLeft
                : this.props.end
                ? styles.circleWholeLeft
                : styles.circleWholeNoneLeft
            }
          ></div>
        </div>
      </div>
    );
  }
}

CircleAnimation.propTypes = {
  active: PropTypes.bool.isRequired,
  delay: PropTypes.string.isRequired,
  end: PropTypes.bool.isRequired,
  clicked: PropTypes.bool.isRequired,
};

export default CircleAnimation;
