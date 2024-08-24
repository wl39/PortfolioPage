import React from "react";
import logo from "../../../../assets/logo512.png";
import Slider from "../../../../components/Slider/Slider";
import styles from "../../MainPage.module.css";

import image1 from "../../../../images/1651807930774_Original-modified.jpg";
import image2 from "../../../../images/1645053171211_Original-modified.jpg";
import image3 from "../../../../images/1600685054178_Original-modified.jpg";
import image4 from "../../../../images/20191018_2120280_Original-modified.jpg";
import image5 from "../../../../images/IMG_1339-modified.JPG";
import image6 from "../../../../images/IMG_2131-modified.JPG";

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
          images={[image1, image2, image3, image4, image5, image6]}
          height="100%"
          time={4000}
          isActive={props.isActive}
        />
      </div>
    </div>
  );
}

export default Main;
