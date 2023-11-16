import React from "react";
import styles from "./SkillDetail.module.css";
import Slider from "../Slider/Slider";
import PropTypes from "prop-types";

class SkillDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className={styles.container}>
        {this.props.isActive ? (
          <div className={styles.isActive}>
            <div>
              <Slider
                images={this.props.images}
                height={this.props.height}
                time={this.props.time}
              />
            </div>
            <div></div>
          </div>
        ) : (
          <div>World</div>
        )}
      </div>
    );
  }
}

SkillDetail.propTypes = {
  images: PropTypes.array.isRequired,
  height: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

export default SkillDetail;
