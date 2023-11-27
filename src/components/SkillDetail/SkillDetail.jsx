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
        <div className={this.props.isActive ? styles.active : styles.deactive}>
          <div
            className={
              this.props.isActive
                ? styles.detailsContainerActive
                : styles.detailsContainerDeactive
            }
          >
            <div className={styles.sliderContainer}>
              <Slider
                images={this.props.images}
                height={this.props.height}
                time={this.props.time}
                isActive={this.props.isActive}
              />
            </div>
            <div className={styles.titleContainer}>
              <div className={styles.textContainer}>
                <div className={styles.title}>{this.props.title}</div>
                <div>{this.props.paragraph}</div>
              </div>
            </div>
          </div>
          <div
            className={
              !this.props.isActive
                ? styles.infoContainerActive
                : styles.infoContainerDeactive
            }
          >
            <div className={styles.logoContainer}>
              <div
                className={styles.logo}
                style={{
                  backgroundImage: `url(${this.props.logo})`,
                }}
              />
            </div>
            <div>Logo details</div>
          </div>
        </div>
      </div>
    );
  }
}

SkillDetail.propTypes = {
  images: PropTypes.array.isRequired,
  height: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};

export default SkillDetail;
