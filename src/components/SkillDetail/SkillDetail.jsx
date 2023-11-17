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
              <div className={styles.emptyBox} />
              <div className={styles.textContainer}>
                <div className={styles.title}>Title</div>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </div>
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
            <div>HELLO?</div>
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
};

export default SkillDetail;
