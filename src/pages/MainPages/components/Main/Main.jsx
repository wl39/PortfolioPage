import React from "react";
import logo from "../../../../assets/logo512.png";
import Slider from "../../../../components/Slider/Slider";
import styles from "../../MainPage.module.css";

import image1 from "../../../../images/main1.webp";
import image2 from "../../../../images/main2.webp";
import image4 from "../../../../images/main4.webp";
import image5 from "../../../../images/main5.webp";
import image6 from "../../../../images/main6.webp";
import image7 from "../../../../images/main7.webp";

function Main(props) {
  return (
    <div
      className={
        props.isActive ? styles.mainContainer : styles.mainContainerMoved
      }
    >
      <div className={styles.top}>
        <div className={styles.logoContainer}>
          <img alt="logo" className={styles.logo} src={logo} />
        </div>
        <div className={styles.nameContainer}>
          <div className={styles.name}>WANKYU LIM </div>
          <div className={styles.job}>SOFTWARE ENGINEER</div>
        </div>
        <div className={styles.personalInfo}>
          <div className={styles.personalInfoContact}>CONTACT ME</div>
          <div className={styles.personalInfoTextBox}>iwg6852@gmail.com</div>
          <div className={styles.personalInfoTextBox}>linked.in/wl39</div>
          <div className={styles.personalInfoTextBox}>+82 10 5068 6852</div>
        </div>
      </div>
      <div className={styles.slider}>
        <Slider
          images={[image1, image2, image4, image5, image6, image7]}
          height="100%"
          time={4000}
          isActive={props.isActive}
        />
      </div>
    </div>
  );
}

export default Main;
