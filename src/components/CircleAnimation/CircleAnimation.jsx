import React from "react";
import styles from "./CircleAnimation.module.css";
class CircleAnimation extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.timelineInnerCircleWrapperRight}>
          <div
            style={{ animationDelay: this.props.delay }}
            className={
              this.props.active
                ? styles.circleWholeRight
                : styles.circleWholeNoneRight
            }
          ></div>
        </div>
        <div className={styles.timelineInnerCircleWrapperLeft}>
          <div
            style={{ animationDelay: this.props.delay }}
            className={
              this.props.active
                ? styles.circleWholeLeft
                : styles.circleWholeNoneLeft
            }
          ></div>
        </div>
      </div>
    );
  }
}

export default CircleAnimation;
