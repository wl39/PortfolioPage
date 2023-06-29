import React from "react";
// import { Button } from "@mui/material";

import styles from "./Header.module.css";
import CustomButton from "../CustomButton/CustomButton";

import limLogo from "../../assets/logo512.png";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerStyle: styles.header,
    };
  }

  componentDidMount() {
    let observer = new IntersectionObserver((e) => {
      e.forEach((component) => {
        if (component.isIntersecting) {
          this.setState({
            headerStyle: styles.header,
          });
        } else {
          this.setState({
            headerStyle: styles.headerMoved,
          });
        }
      });
    });

    let intersectionBox = document.getElementById("intersectionBox");
    observer.observe(intersectionBox);
  }

  render() {
    return (
      <div>
        <div className={styles.intersectionBox} id="intersectionBox" />
        <div className={this.state.headerStyle}>
          <CustomButton logo={true} source={limLogo} />
          <div>
            <CustomButton underline={true} text="Projects" />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
