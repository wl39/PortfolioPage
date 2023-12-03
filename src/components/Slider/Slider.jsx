import React from "react";
import style from "./Slider.module.css";
import PropTypes from "prop-types";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      timerValue: 0,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isActive !== this.props.isActive) {
      if (this.props.isActive) {
        this.timer = setInterval(() => {
          this.setState((prevState) => ({
            timerValue: prevState.timerValue + 1,
          }));
        }, this.props.time); // Set the interval to 1000ms (1 second)
      } else {
        clearInterval(this.timer);
      }
    }
  }

  render() {
    return (
      <div
        className={this.props.styles}
        style={{
          height: this.props.height,
          position: "relative",
          width: this.props.width,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${
              this.props.images[
                this.state.timerValue % this.props.images.length
              ]
            })`,
          }}
          className={style.blur}
        />
        <div
          style={{
            backgroundImage: `url(${
              this.props.images[
                this.state.timerValue % this.props.images.length
              ]
            })`,
          }}
          className={style.image}
        />
        {/* <div>{this.state.timerValue % this.props.images.length}</div> */}
      </div>
    );
  }
}

Slider.propTypes = {
  images: PropTypes.array.isRequired,
  height: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Slider;
