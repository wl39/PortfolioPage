import React from "react";
import styles from "./MainPage.module.css";
import logo from "../assets/logo512.png";
import Slider from "../components/Slider/Slider";

import image1 from "../images/1651807930774_Original-modified.jpg";
import image2 from "../images/1645053171211_Original-modified.jpg";
import image3 from "../images/1600685054178_Original-modified.jpg";
import image4 from "../images/20191018_2120280_Original-modified.jpg";
import image5 from "../images/IMG_1339-modified.JPG";
import image6 from "../images/IMG_2131-modified.JPG";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstContentStyles: styles.mainContainer,
      secondContentStyles: styles.detailsContainer,
      thirdContentStyles: styles.thirdContent,
      fourthContentStyles: styles.fourthContent,
      fifthContentStyles: styles.fifthContent,
      skills1: styles.skills1,
      skills2: styles.skills2,
      skills3: styles.skills3,
      skills4: styles.skills4,
      skills5: styles.skills5,
      skills6: styles.skills6,
      skills7: styles.skills7,
      skills8: styles.skills8,
      skillsTitle: "Skills",
    };
  }

  componentDidMount() {
    let observer = new IntersectionObserver((e) => {
      e.forEach((components) => {
        if (components.isIntersecting) {
          switch (components.target.id) {
            case "firstContent":
              this.setState({
                firstContentStyles: styles.mainContainer,
              });
              break;
            case "secondContent":
              this.setState({
                secondContentStyles: styles.detailsContainer,
                skills1: styles.skills1,
                skills2: styles.skills2,
                skills3: styles.skills3,
                skills4: styles.skills4,
                skills5: styles.skills5,
                skills6: styles.skills6,
                skills7: styles.skills7,
                skills8: styles.skills8,
                skillsTitle: "Skills",
              });
              break;
            case "thirdContent":
              this.setState({
                thirdContentStyles: styles.thirdContent,
              });
              break;
            case "fourthContent":
              this.setState({
                fourthContentStyles: styles.fourthContent,
              });
              break;
            case "fifthContent":
              this.setState({
                fifthContentStyles: styles.fifthContent,
              });
              break;
            default:
              break;
          }
        } else {
          switch (components.target.id) {
            case "firstContent":
              this.setState({
                firstContentStyles: styles.mainContainerMoved,
              });
              break;
            case "secondContent":
              this.setState({
                secondContentStyles: styles.detailsContainerMoved,
                skills1: styles.skills1Moved,
                skills2: styles.skills2Moved,
                skills3: styles.skills3Moved,
                skills4: styles.skills4Moved,
                skills5: styles.skills5Moved,
                skills6: styles.skills6Moved,
                skills7: styles.skills7Moved,
                skills8: styles.skills8Moved,
                skillsTitle: "Skills",
              });
              break;
            case "thirdContent":
              this.setState({
                thirdContentStyles: styles.thirdContentMoved,
              });
              break;
            case "fourthContent":
              this.setState({
                fourthContentStyles: styles.fourthContentMoved,
              });
              break;
            case "fifthContent":
              this.setState({
                fifthContentStyles: styles.fifthContentMoved,
              });
              break;
            default:
              break;
          }
        }
      });
    });

    let firstContent = document.getElementById("firstContent");
    let secondContent = document.getElementById("secondContent");
    // let thirdContent = document.getElementById("thirdContent");
    // let fourthContent = document.getElementById("fourthContent");
    // let fifthContent = document.getElementById("fifthContent");

    observer.observe(firstContent);
    observer.observe(secondContent);
    // observer.observe(thirdContent);
    // observer.observe(fourthContent);
    // observer.observe(fifthContent);
  }

  skillsDetailHandler = (contentsNo) => {
    switch (contentsNo) {
      case 1:
        this.setState({
          skillsTitle: "React",
          skills1: styles.skills1Focused,
          skills2: styles.skills2,
          skills3: styles.skills3,
          skills4: styles.skills4,
          skills5: styles.skills5,
          skills6: styles.skills6,
          skills7: styles.skills7,
          skills8: styles.skills8,
        });
        break;
      case 2:
        this.setState({
          skillsTitle: "Java",
          skills1: styles.skills1,
          skills2: styles.skillsLeftFocused,
          skills3: styles.skills3,
          skills4: styles.skills4,
          skills5: styles.skills5,
          skills6: styles.skills6,
          skills7: styles.skills7,
          skills8: styles.skills8,
        });
        break;
      case 3:
        this.setState({
          skillsTitle: "Javascript",
          skills1: styles.skills1,
          skills2: styles.skills2,
          skills3: styles.skillsLeftFocused,
          skills4: styles.skills4,
          skills5: styles.skills5,
          skills6: styles.skills6,
          skills7: styles.skills7,
          skills8: styles.skills8,
        });
        break;
      case 4:
        this.setState({
          skillsTitle: "MariaDB",
          skills1: styles.skills1,
          skills2: styles.skills2,
          skills3: styles.skills3,
          skills4: styles.skillsLeftFocused,
          skills5: styles.skills5,
          skills6: styles.skills6,
          skills7: styles.skills7,
          skills8: styles.skills8,
        });
        break;
      case 5:
        this.setState({
          skillsTitle: "Git",
          skills1: styles.skills1,
          skills2: styles.skills2,
          skills3: styles.skills3,
          skills4: styles.skills4,
          skills5: styles.skillsRightFocused,
          skills6: styles.skills6,
          skills7: styles.skills7,
          skills8: styles.skills8,
        });
        break;
      case 6:
        this.setState({
          skillsTitle: "Spring",
        });
        break;
      case 7:
        this.setState({
          skillsTitle: "Node.js",
        });
        break;
      case 8:
        this.setState({
          skillsTitle: "Processing4",
        });
        break;
      default:
        this.setState({
          skillsTitle: "Skills",
          skills1: styles.skills1,
          skills2: styles.skills2,
          skills3: styles.skills3,
          skills4: styles.skills4,
          skills5: styles.skills5,
          skills6: styles.skills6,
          skills7: styles.skills7,
          skills8: styles.skills8,
        });
        break;
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={this.state.firstContentStyles}>
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
              <div className={styles.personalInfoTextBox}>
                iwg6852@gmail.com
              </div>
              <div className={styles.personalInfoTextBox}>linked.in/wl39</div>
              <div className={styles.personalInfoTextBox}>+44 7707 903700</div>
            </div>
          </div>
          <Slider
            images={[image1, image2, image3, image4, image5, image6]}
            height="638px"
            time={4000}
          />
        </div>
        <div className={this.state.secondContentStyles}>
          <div
            onClick={() => this.skillsDetailHandler(0)}
            className={styles.title}
          >
            <div
              className={
                this.state.skillsTitle === "Skills"
                  ? styles.skillTitle
                  : styles.skillTitleClicked
              }
            >
              {this.state.skillsTitle}
            </div>
            <div
              className={
                this.state.skillsTitle === "Skills"
                  ? styles.hideDeco
                  : styles.deco
              }
            />
          </div>

          <div className={styles.skillsContainer}>
            <div
              className={this.state.skills1}
              onClick={() => this.skillsDetailHandler(1)}
            >
              <div className={styles.skillsTitle}>React</div>
            </div>
            <div
              className={this.state.skills2}
              onClick={() => this.skillsDetailHandler(2)}
            >
              <div className={styles.skillsTitle}>Java</div>
            </div>
            <div
              className={this.state.skills3}
              onClick={() => this.skillsDetailHandler(3)}
            >
              <div className={styles.skillsTitle}>Javascript</div>
            </div>
            <div
              className={this.state.skills4}
              onClick={() => this.skillsDetailHandler(4)}
            >
              <div className={styles.skillsTitle}>MariaDB</div>
            </div>
            <div
              className={this.state.skills5}
              onClick={() => this.skillsDetailHandler(5)}
            >
              <div className={styles.skillsTitle}>Git</div>
            </div>
            <div
              className={this.state.skills6}
              onClick={() => this.skillsDetailHandler(6)}
            >
              <div className={styles.skillsTitle}>Spring</div>
            </div>
            <div
              className={this.state.skills7}
              onClick={() => this.skillsDetailHandler(7)}
            >
              <div className={styles.skillsTitle}>Node.js</div>
            </div>
            <div
              className={this.state.skills8}
              onClick={() => this.skillsDetailHandler(8)}
            >
              <div className={styles.skillsTitle}>Processing4</div>
            </div>
          </div>
        </div>
        <div id="firstContent" className={styles.bar} />
        <div id="secondContent" className={styles.bar} />

        <div />
      </div>
    );
  }
}

export default MainPage;
